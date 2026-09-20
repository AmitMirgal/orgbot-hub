import { noul, TypeSafeClient } from "@typesafe-ai/sdk";

export const JEV_RERANK_CONCURRENCY = 8;
export const JEV_MIN_TOP_NOUL = 0.4;

const PACK_MATCH = noul("This Grok Bot pack matches what the user is looking for", {
  true: "The pack's name, description, topics, or seats cover the jobs, roles, or problems in the search query. Synonyms and closely related work count as a match.",
  false: "The pack is only loosely related, is about a different job, or would not help with the search query.",
});

export type RankablePack = {
  owner: string;
  slug: string;
  name: string;
  description: string;
  topics: string[];
  seats: Array<{ name: string; job: string; isDesk: boolean }>;
};

export type ScorePackFn<T extends RankablePack> = (
  query: string,
  pack: T,
  signal?: AbortSignal
) => Promise<number | null>;

export type RerankOptions<T extends RankablePack> = {
  scorePack?: ScorePackFn<T>;
  signal?: AbortSignal;
  minTopNoul?: number;
  concurrency?: number;
};

let cachedClient: TypeSafeClient | undefined;

export function jevModel(): string {
  return process.env.TYPESAFE_JEV_MODEL?.trim() || "jev-latest";
}

export function typesafeApiKey(): string | undefined {
  const key = process.env.TYPESAFE_API_KEY?.trim();
  return key ? key : undefined;
}

export function resetJevClientForTests() {
  cachedClient = undefined;
}

function getClient(): TypeSafeClient | null {
  const apiKey = typesafeApiKey();
  if (!apiKey) {
    cachedClient = undefined;
    return null;
  }
  if (cachedClient) return cachedClient;
  try {
    cachedClient = new TypeSafeClient({
      apiKey,
      defaultModel: jevModel(),
      timeout: 12_000,
      logLevel: "error",
    });
    return cachedClient;
  } catch {
    return null;
  }
}

function clip(value: string, max: number): string {
  const trimmed = value.trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max - 1).trimEnd()}…`;
}

export function packRerankState(query: string, pack: RankablePack) {
  return {
    query,
    pack: {
      owner: pack.owner,
      slug: pack.slug,
      name: pack.name,
      description: clip(pack.description, 400),
      topics: pack.topics,
      seats: pack.seats.slice(0, 8).map((seat) => ({
        name: seat.name,
        job: clip(seat.job, 180),
        isDesk: seat.isDesk,
      })),
    },
  };
}

async function scorePackWithJev<T extends RankablePack>(
  query: string,
  pack: T,
  signal?: AbortSignal
): Promise<number | null> {
  const client = getClient();
  if (!client) return null;
  try {
    const response = await client.systemOne(
      {
        model: jevModel(),
        state: packRerankState(query, pack),
        questions: { relevant: PACK_MATCH },
      },
      { signal }
    );
    const value = response.answers.relevant.noul;
    return typeof value === "number" && Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}

async function mapPool<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T, index: number) => Promise<R>,
  signal?: AbortSignal
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      if (signal?.aborted) return;
      const index = next++;
      results[index] = await fn(items[index], index);
    }
  }
  const workers = Math.max(1, Math.min(concurrency, items.length));
  await Promise.all(Array.from({ length: workers }, () => worker()));
  return results;
}

export async function rerankPacksWithJev<T extends RankablePack>(
  query: string,
  packs: T[],
  options: RerankOptions<T> = {}
): Promise<T[]> {
  if (packs.length < 2) return packs;
  const scorePack = options.scorePack ?? scorePackWithJev;
  const minTopNoul = options.minTopNoul ?? JEV_MIN_TOP_NOUL;
  const concurrency = options.concurrency ?? JEV_RERANK_CONCURRENCY;
  let scores: Array<number | null>;
  try {
    scores = await mapPool(
      packs,
      concurrency,
      (pack) => scorePack(query, pack, options.signal),
      options.signal
    );
  } catch {
    return packs;
  }
  if (options.signal?.aborted) return packs;
  const valid = scores.filter((value): value is number => value != null);
  if (valid.length * 2 < packs.length) return packs;
  const top = Math.max(...valid);
  if (top < minTopNoul) return packs;
  return packs
    .map((pack, index) => ({ pack, index, noul: scores[index] ?? -1 }))
    .sort((a, b) => b.noul - a.noul || a.index - b.index)
    .map((item) => item.pack);
}
