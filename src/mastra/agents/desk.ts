import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { mastraModel } from "../model";
import { orgbotsStorage } from "../storage";

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
  instructions: `You describe a draft roster that is already ranked in the user message.

Seats are best-first. The first seat is the best match. Describe them in that order. Do not reorder.
Do not invent a seat, pack, href, or https://x.ai/bot URL. Never mint a Grok ID.
If no ranked seats are listed, say nothing matched, then stop.

For each seat, list: seat name, job, author @handle, pack href, official x.ai/bot URL.
This mix is a draft roster in the session. Do not publish it. Do not attach seats to someone else's pack.
Always include: "Install each seat in Grok. This is your mix, not a listed pack."
Do not say you created a bot.`,
  model: mastraModel(),
});
