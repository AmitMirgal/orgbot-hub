import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { catalogSeatSchema } from "@/lib/api-pack";
import { getPublicPack, listPublicPacks, listPublicSeats } from "@/lib/public-catalog";
import { parseRequirementJobs, selectMix } from "@/lib/seat-mix";

export const searchSeats = createTool({
  id: "searchSeats",
  description:
    "Search installable catalog seats by job. Uses the same list as GET /api/v1/seats. Never invent a seat or URL.",
  inputSchema: z.object({
    q: z.string().optional().describe("Job or keyword, e.g. front desk, billing, QA"),
    jobs: z.array(z.string()).optional().describe("Named jobs to mix across authors"),
  }),
  outputSchema: z.object({
    empty: z.boolean(),
    seats: z.array(catalogSeatSchema),
  }),
  execute: async ({ q, jobs }) => {
    const catalog = await listPublicSeats();
    const requirement = jobs?.length ? jobs : q ? parseRequirementJobs(q) : [];
    if (requirement.length > 0) {
      const mixed = selectMix(catalog, requirement);
      if (mixed.length > 0) return { empty: false, seats: mixed };
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
  description: "Search the orgbots catalog. Returns packs from the catalog only. Never invent a pack or URL.",
  inputSchema: z.object({
    q: z.string().optional().describe("Keyword query"),
    owner: z.string().optional().describe("GitHub owner login"),
    featured: z.boolean().optional().describe("If true, only featured packs"),
  }),
  outputSchema: z.object({
    empty: z.boolean(),
    packs: z.array(z.unknown()),
  }),
  execute: async ({ q, owner, featured }) => {
    const packs = await listPublicPacks({
      q,
      owner,
      featured: featured ? true : undefined,
    });
    return { empty: packs.length === 0, packs };
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