import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { listPublicPacks } from "@/lib/public-catalog";
import { proposePack, validateGrokUrl } from "@/lib/submit-pack";

export const validateGrokUrlTool = createTool({
  id: "validateGrokUrl",
  description: "Parse an official https://x.ai/bot/… URL. Rejects anything else and secret-shaped text.",
  inputSchema: z.object({
    url: z.string(),
  }),
  execute: async ({ url }) => validateGrokUrl(url),
});

export const lookupOwnerPacksTool = createTool({
  id: "lookupOwnerPacks",
  description: "List existing packs for a GitHub owner. One pack per owner is allowed.",
  inputSchema: z.object({
    owner: z.string(),
  }),
  execute: async ({ owner }) => {
    const packs = await listPublicPacks({ owner });
    return {
      owner,
      count: packs.length,
      packs: packs.map((pack) => ({
        owner: pack.owner,
        slug: pack.slug,
        name: pack.name,
        href: pack.href,
      })),
    };
  },
});

export const openPackPrTool = createTool({
  id: "openPackPr",
  description:
    "Validate a pack draft and open a GitHub PR. Never writes the live catalog. Never sets featured or official true.",
  inputSchema: z.object({
    owner: z.string(),
    name: z.string(),
    slug: z.string().optional(),
    description: z.string(),
    githubUrl: z.string().optional(),
    desk: z.object({
      name: z.string(),
      job: z.string(),
      grokTemplateUrl: z.string(),
    }),
    seats: z
      .array(
        z.object({
          name: z.string(),
          job: z.string(),
          grokTemplateUrl: z.string(),
        })
      )
      .optional(),
  }),
  execute: async (input) => proposePack(input),
});