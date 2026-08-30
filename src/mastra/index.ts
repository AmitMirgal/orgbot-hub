import { Mastra } from "@mastra/core";
import { orgbotsDesk } from "./agents/desk";
import { orgbotsSubmit } from "./agents/submit";

export const mastra = new Mastra({
  agents: { orgbotsDesk, orgbotsSubmit },
});