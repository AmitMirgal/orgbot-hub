import type { PublicPack } from "@/lib/api-pack";
import { rerankPacksWithJev } from "@/lib/jev-rerank";

export type PackSearchQuery = {
  q?: string;
  owner?: string;
  featured?: true;
};

export const PACK_SHORTLIST_LIMIT = 20;
export const PACK_SEARCH_LIMIT = 8;

const STOP = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "plus",
  "with",
  "for",
  "need",
  "want",
  "my",
  "our",
  "team",
  "bot",
  "bots",
  "pack",
  "packs",
  "grok",
  "help",
  "find",
  "looking",
  "someone",
  "i",
  "to",
  "of",
  "me",
]);

export type SearchPacksOptions = {
  listPacks?: (query: PackSearchQuery) => Promise<PublicPack[]>;
  rerank?: typeof rerankPacksWithJev;
  signal?: AbortSignal;
};

function tokens(value: string): string[] {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 1 && !STOP.has(token));
}

export function packKey(pack: { owner: string; slug: string }): string {
  return `${pack.owner.trim().toLowerCase()}/${pack.slug.trim().toLowerCase()}`;
}

export function packTokenScore(pack: PublicPack, query: string): number {
  const queryTokens = tokens(query);
  if (queryTokens.length === 0) return 0;
  const hayTokens = tokens(
    [
      pack.name,
      pack.description,
      pack.slug,
      pack.owner,
      ...pack.topics,
      ...pack.seats.map((seat) => `${seat.name} ${seat.job}`),
    ].join(" ")
  );
  const hay = hayTokens.join(" ");
  const haySet = new Set(hayTokens);
  let score = 0;
  const phrase = queryTokens.join(" ");
  if (hay.includes(phrase)) score += 4 + queryTokens.length;
  for (const token of queryTokens) {
    if (haySet.has(token)) score += 2;
    else if ([...haySet].some((item) => item.includes(token) || token.includes(item))) {
      score += 1;
    }
  }
  return score;
}

export function shortlistPacks(
  keywordHits: PublicPack[],
  catalog: PublicPack[],
  query: string,
  limit = PACK_SHORTLIST_LIMIT
): PublicPack[] {
  const seen = new Set<string>();
  const out: PublicPack[] = [];
  for (const pack of keywordHits) {
    const key = packKey(pack);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(pack);
    if (out.length >= limit) return out;
  }
  const q = query.trim();
  if (!q) return out;
  const ranked = catalog
    .map((pack) => ({ pack, score: packTokenScore(pack, q) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.pack.name.localeCompare(b.pack.name));
  for (const { pack } of ranked) {
    const key = packKey(pack);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(pack);
    if (out.length >= limit) break;
  }
  return out;
}

async function defaultListPacks(query: PackSearchQuery): Promise<PublicPack[]> {
  const { listPublicPacks } = await import("@/lib/public-catalog");
  return listPublicPacks(query);
}

export async function searchAndRerankPacks(
  query: PackSearchQuery = {},
  options: SearchPacksOptions = {}
): Promise<{ empty: boolean; packs: PublicPack[] }> {
  const listPacks = options.listPacks ?? defaultListPacks;
  const rerank = options.rerank ?? rerankPacksWithJev;
  const q = query.q?.trim();
  const filters = { owner: query.owner, featured: query.featured };

  if (!q) {
    const packs = await listPacks(filters);
    return { empty: packs.length === 0, packs };
  }

  const [keywordHits, catalog] = await Promise.all([
    listPacks({ ...filters, q }),
    listPacks(filters),
  ]);
  const shortlist = shortlistPacks(keywordHits, catalog, q);
  if (shortlist.length === 0) return { empty: true, packs: [] };

  const ranked =
    shortlist.length < 2
      ? shortlist
      : await rerank(q, shortlist, { signal: options.signal });
  const packs = ranked.slice(0, PACK_SEARCH_LIMIT);
  return { empty: packs.length === 0, packs };
}
