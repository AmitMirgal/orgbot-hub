import { toAISdkMessages } from "@mastra/ai-sdk/ui";
import type { UIMessage } from "ai";
import { teamDeskThreadId } from "@/lib/team-desk-thread";
import { mastra } from "@/src/mastra";

export { deskStreamParams, teamDeskMemoryOption, teamDeskThreadId } from "@/lib/team-desk-thread";

export async function readTeamDeskMessages(userId: string): Promise<UIMessage[]> {
  try {
    const agent = mastra.getAgentById("orgbotsDesk");
    const memory = await agent.getMemory();
    if (!memory) return [];
    const threadId = teamDeskThreadId(userId);
    const thread = await memory.getThreadById({ threadId });
    if (!thread) return [];
    const { messages } = await memory.recall({
      threadId,
      resourceId: userId,
      perPage: false,
    });
    return toAISdkMessages(messages, { version: "v7" });
  } catch (error) {
    console.error("[mastra] readTeamDeskMessages failed", error);
    return [];
  }
}
