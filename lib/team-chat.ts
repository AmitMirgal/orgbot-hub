import { rateLimitAgent, streamAgent } from "@/lib/agent-http";
import { getSessionUserId } from "@/lib/supabase/server";
import { consumeTeamChatTurn, refundTeamChatTurn } from "@/lib/team-quota-store";
import { estimatePromptTokens } from "@/lib/team-quota";
import { agentRuntimeStatus } from "@/src/mastra/model";

export async function streamTeamDesk(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json({ error: "method_not_allowed" }, { status: 405 });
  }

  const { userId } = await getSessionUserId();
  if (!userId) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const limited = rateLimitAgent(request);
  if (limited) return limited;

  const status = agentRuntimeStatus();
  if (!status.modelReady) {
    return Response.json(
      { error: "Agent model env is missing. Set SARVAM_API_KEY." },
      { status: 503 }
    );
  }

  const params = await request.json();
  const tokens = estimatePromptTokens(params);
  const consumed = await consumeTeamChatTurn(userId, tokens);
  if (consumed && !consumed.allowed) {
    return Response.json(
      {
        error: "quota",
        remaining: 0,
        reset_at: consumed.reset_at,
        token_blocked: consumed.token_blocked,
      },
      { status: 429 }
    );
  }

  try {
    return await streamAgent("orgbotsDesk", request, {
      params,
      skipRateLimit: true,
    });
  } catch {
    if (consumed) await refundTeamChatTurn(userId, tokens);
    return Response.json({ error: "mix_failed" }, { status: 503 });
  }
}
