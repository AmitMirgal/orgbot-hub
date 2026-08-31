import { Mastra } from "@mastra/core";
import { orgbotsDesk } from "./agents/desk";
import { orgbotsSubmit } from "./agents/submit";
import { orgbotsStorage } from "./storage";

export const mastra = new Mastra({
  agents: { orgbotsDesk, orgbotsSubmit },
  ...(orgbotsStorage ? { storage: orgbotsStorage } : {}),
});
