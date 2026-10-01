import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { catalogSeatSchema, type CatalogSeat } from "@/lib/api-pack";
import { rankSeatsByFit } from "@/lib/bot-rank";
import { listMemorySeats } from "@/lib/memory-catalog";
import { searchAndRerankPacks } from "@/lib/pack-search";
import { parseRequirementJobs } from "@/lib/seat-mix";

const SEAT_RANK_REUSE_MS = 60_000;

const seatRanks = new Map<string, { at: number; pending: Promise<CatalogSeat[]> }>();

export function clearSeatRankReuseForTests(): void {
  seatRanks.clear();
}

function seatRankKey(jobs: string[], seats: CatalogSeat[]): string {
  const jobsKey = jobs.map((job) => job.trim().toLowerCase()).join("\n");
  const urls = seats.map((seat) => seat.grokTemplateUrl).join("\n");
  return `${jobsKey}\n${urls}`;
}

function rankSeatsOnce(
  seats: CatalogSeat[],
  jobs: string[],
  signal?: AbortSignal
): Promise<CatalogSeat[]> {
  const key = seatRankKey(jobs, seats);
  const now = Date.now();
  const hit = seatRanks.get(key);
  if (hit && now - hit.at < SEAT_RANK_REUSE_MS) return hit.pending;
  const pending = rankSeatsByFit(seats, jobs, { signal });
  seatRanks.set(key, { at: now, pending });
  return pending;
}

export async function searchCatalogSeats(
  input: { q?: string; jobs?: string[] },
  signal?: AbortSignal
): Promise<{ empty: boolean; seats: CatalogSeat[] }> {
  const catalog = listMemorySeats();
  const requirement = input.jobs?.length ? input.jobs : input.q ? parseRequirementJobs(input.q) : [];
  if (requirement.length > 0) {
    const ranked = await rankSeatsOnce(catalog, requirement, signal);
    if (ranked.length > 0) return { empty: false, seats: ranked };
  }
  const needle = input.q?.trim().toLowerCase();
  const matched = needle
    ? catalog.filter((seat) =>
        [seat.name, seat.job, seat.pack.name, seat.pack.owner].join(" ").toLowerCase().includes(needle)
      )
    : [];
  return { empty: matched.length === 0, seats: matched.slice(0, 6) };
}

export const searchSeats = createTool({
  id: "searchSeats",
  description:
    "Search installable catalog seats by job. Returns seats best-first by Jev fit. Uses the same list as GET /api/v1/seats. Never invent a seat or URL.",
  inputSchema: z.object({
    q: z.string().optional().describe("Job or keyword, e.g. front desk, billing, QA"),
    jobs: z.array(z.string()).optional().describe("Named jobs to mix across authors"),
  }),
  outputSchema: z.object({
    empty: z.boolean(),
    seats: z.array(catalogSeatSchema),
  }),
  execute: async ({ q, jobs }, context) => searchCatalogSeats({ q, jobs }, context?.abortSignal),
});

export const searchPacks = createTool({
  id: "searchPacks",
  description:
    "Search published Grok Bot packs. Catalog keyword/token shortlist, then TypeSafe Jev re-rank. Also returns seats best-first by Jev fit. Never invent a pack or URL.",
  inputSchema: z.object({
    q: z.string().optional().describe("Natural-language or keyword query"),
    owner: z.string().optional().describe("GitHub owner login"),
    featured: z.boolean().optional().describe("If true, only featured packs"),
  }),
  outputSchema: z.object({
    empty: z.boolean(),
    packs: z.array(z.unknown()),
    seats: z.array(catalogSeatSchema),
  }),
  execute: async ({ q, owner, featured }, context) => {
    const packs = await searchAndRerankPacks(
      { q, owner, featured: featured ? true : undefined },
      { signal: context?.abortSignal }
    );
    const queryText = q?.trim();
    if (!queryText) return { ...packs, seats: [] };
    const catalog = listMemorySeats();
    const ownerLogin = owner?.trim().toLowerCase();
    const allowed = featured
      ? new Set(packs.packs.map((pack) => `${pack.owner.toLowerCase()}/${pack.slug.toLowerCase()}`))
      : null;
    const scoped = catalog.filter((seat) => {
      if (ownerLogin && seat.pack.owner.toLowerCase() !== ownerLogin) return false;
      if (allowed && !allowed.has(`${seat.pack.owner.toLowerCase()}/${seat.pack.slug.toLowerCase()}`)) {
        return false;
      }
      return true;
    });
    const seats = await rankSeatsOnce(scoped, [queryText], context?.abortSignal);
    return { ...packs, seats };
  },
});