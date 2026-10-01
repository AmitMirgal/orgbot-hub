import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { getPublicPack } from "@/lib/public-catalog";

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
