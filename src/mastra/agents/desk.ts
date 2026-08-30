import { Agent } from "@mastra/core/agent";
import { mastraModel } from "../model";
import { getPackTool, searchPacks } from "../tools/catalog";

export const orgbotsDesk = new Agent({
  id: "orgbotsDesk",
  name: "orgbots desk",
  instructions: `You search the orgbots pack catalog.

Use searchPacks and getPack only. Those tools read the same public catalog as GET /api/v1/packs. Never scrape HTML. Never invent a pack, seat, href, or https://x.ai/bot URL.
If the tools return empty, say the catalog is empty or nothing matched, then stop.
Answer with pack name, one-line job, site href, official x.ai/bot links that already exist on seats, and visitsCount.
Do not say you created a bot.
Do not scrape HTML.`,
  model: mastraModel(),
  tools: { searchPacks, getPack: getPackTool },
});