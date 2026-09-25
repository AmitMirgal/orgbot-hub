import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { catalogSeatSchema } from "@/lib/api-pack";
import { rankSeatsByFit } from "@/lib/bot-rank";
import { searchAndRerankPacks } from "@/lib/pack-search";
import { getPublicPack, listPublicSeats } from "@/lib/public-catalog";
import { parseRequirementJobs } from "@/lib/seat-mix";

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
  execute: async ({ q, jobs }, context) => {
    const catalog = await listPublicSeats();
    const requirement = jobs?.length ? jobs : q ? parseRequirementJobs(q) : [];
    if (requirement.length > 0) {
      const ranked = await rankSeatsByFit(catalog, requirement, {
        signal: context?.abortSignal,
      });
      if (ranked.length > 0) return { empty: false, seats: ranked };
    }
    const needle = q?.trim().toLowerCase();
    const matched = needle
      ? catalog.filter((seat) =>
          [seat.name, seat.job, seat.pack.name, seat.pack.owner]
            .join(" ")
            .toLowerCase()
            .includes(needle)
        )
      : [];
    return { empty: matched.length === 0, seats: matched.slice(0, 6) };
  },
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
    const catalog = await listPublicSeats();
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
    const seats = await rankSeatsByFit(scoped, [queryText], { signal: context?.abortSignal });
    return { ...packs, seats };
  },
});

export const getPackTool = createTool({
  id: "getPack",
  description: "Get one pack by owner and slug from the catalog.",
  inputSchema: z.object({
    owner: z.string(),
    slug: z.string(),
  }),
  outputSchema: z.object({
    found: z.boolean(),
    pack: z.unknown().nullable(),
  }),
  execute: async ({ owner, slug }) => {
    const pack = await getPublicPack(owner, slug);
    return { found: Boolean(pack), pack };
  },
});