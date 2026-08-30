import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { getPublicPack, listPublicPacks } from "@/lib/public-catalog";

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