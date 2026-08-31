import { rateLimitAgent, streamAgent } from "@/lib/agent-http";
import { mastraPostgresUrl } from "@/lib/env-url";
import { getSessionUserId } from "@/lib/supabase/server";
import { deskStreamParams } from "@/lib/team-desk-thread";
import {
  TEAM_CHAT_QUOTA_HEADER,
  estimatePromptTokens,
  serializeTeamChatQuota,
  type TeamChatQuota,
} from "@/lib/team-quota";
import { consumeTeamChatTurn, refundTeamChatTurn } from "@/lib/team-quota-store";
import { agentRuntimeStatus } from "@/src/mastra/model";

function withQuotaHeader(response: Response, quota: TeamChatQuota | null): Response {
  if (!quota) return response;
  const headers = new Headers(response.headers);
  headers.set(TEAM_CHAT_QUOTA_HEADER, serializeTeamChatQuota(quota));
  const exposed = headers.get("Access-Control-Expose-Headers");
  headers.set(
    "Access-Control-Expose-Headers",
    exposed ? `${exposed}, ${TEAM_CHAT_QUOTA_HEADER}` : TEAM_CHAT_QUOTA_HEADER
  );
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

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

  const params = deskStreamParams(
    userId,
    await request.json(),
    Boolean(mastraPostgresUrl())
  );
  const tokens = estimatePromptTokens(params);
  const consumed = await consumeTeamChatTurn(userId, tokens);
  if (consumed && !consumed.allowed) {
    return withQuotaHeader(
      Response.json(
        {
          error: "quota",
          remaining: 0,
          reset_at: consumed.reset_at,
          token_blocked: consumed.token_blocked,
        },
        { status: 429 }
      ),
      consumed
    );
  }

  try {
    return withQuotaHeader(
      await streamAgent("orgbotsDesk", request, {
        params,
        skipRateLimit: true,
      }),
      consumed
    );
  } catch {
    if (consumed) await refundTeamChatTurn(userId, tokens);
    return Response.json({ error: "mix_failed" }, { status: 503 });
  }
}
