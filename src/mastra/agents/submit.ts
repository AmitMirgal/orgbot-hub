import { Agent } from "@mastra/core/agent";
import { mastraModel } from "../model";
import { lookupOwnerPacksTool, openPackPrTool, validateGrokUrlTool } from "../tools/submit";

export const orgbotsSubmit = new Agent({
  id: "orgbotsSubmit",
  name: "orgbots submit",
  instructions: `You help a human propose a pack as a GitHub PR.

Collect owner GitHub login, pack name/slug, one-line job, desk name/job/url, named seats with official URLs, optional GitHub source.
Every install URL must pass validateGrokUrl. At least one desk URL is required.
If lookupOwnerPacks shows they already have a pack, refuse and tell them to edit that pack.
Never set featured or official to true.
Never write to the live catalog.
Call openPackPr to open a PR. If the tool returns paste_ready, show the JSON so the human can paste it.
Install happens in Grok. We never invent IDs.`,
  model: mastraModel(),
  tools: {
    validateGrokUrl: validateGrokUrlTool,
    lookupOwnerPacks: lookupOwnerPacksTool,
    openPackPr: openPackPrTool,
  },
});