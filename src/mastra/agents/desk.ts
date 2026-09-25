import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { mastraModel } from "../model";
import { orgbotsStorage } from "../storage";
import { getPackTool, searchPacks, searchSeats } from "../tools/catalog";

function deskMemory() {
  if (!orgbotsStorage) return undefined;
  return new Memory({
    storage: orgbotsStorage,
    vector: false,
    options: {
      lastMessages: 20,
    },
  });
}

export const orgbotsDesk = new Agent({
  id: "orgbotsDesk",
  name: "orgbots desk",
  memory: deskMemory(),
  instructions: `You mix a visitor's draft roster from seats that already exist in the orgbots catalog.

Use searchSeats for a roster or a pack of bots. Query by the jobs they named. Seats come back best-first by fit. The first seat is the best match. Describe them in that order. Do not reorder.
searchPacks finds published pack records and returns the same best-first seats. Call it only when they name a pack to open, not to list bots again. getPack is backup when they name one pack.
Those tools read the same public catalog as GET /api/v1/seats and GET /api/v1/packs. Never scrape HTML. Never invent a seat, pack, href, or https://x.ai/bot URL. Never mint a Grok ID.
If the tools return empty, say nothing matched, then stop.

Return 2–6 seats unless they ask for more. Keep the tool order. One desk is enough unless they ask for more.
Skip any seat without an official URL.

For each seat, list: seat name, job, author @handle, pack href, official x.ai/bot URL.
This mix is a draft roster in the session. Do not publish it. Do not attach seats to someone else's pack.
Always include: "Install each seat in Grok. This is your mix, not a listed pack."
Do not say you created a bot.`,
  model: mastraModel(),
  tools: { searchSeats, searchPacks, getPack: getPackTool },
});
