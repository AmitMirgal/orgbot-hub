import { rateLimitAgent, streamAgent } from "@/lib/agent-http";
import { getSessionUserId } from "@/lib/supabase/server";
import { deskStreamParams } from "@/lib/team-desk-thread";
import {
  TEAM_CHAT_QUOTA_HEADER,
  estimatePromptTokens,
  serializeTeamChatQuota,
  teamDeskConsumeGate,
  type TeamChatQuota,
} from "@/lib/team-quota";
import { consumeTeamChatTurn, refundTeamChatTurn } from "@/lib/team-quota-store";
import { agentRuntimeStatus } from "@/src/mastra/model";
import { orgbotsStorage } from "@/src/mastra/storage";

function withQuotaHeader(response: Response, quota: TeamChatQuota): Response {
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
    Boolean(orgbotsStorage)
  );
  const tokens = estimatePromptTokens(params);
  const gate = teamDeskConsumeGate(await consumeTeamChatTurn(userId, tokens));
  switch (gate.kind) {
    case "unreachable":
      return Response.json({ error: "catalog_unreachable" }, { status: 503 });
    case "exhausted":
      return withQuotaHeader(
        Response.json(
          {
            error: "quota",
            remaining: 0,
            reset_at: gate.quota.reset_at,
            token_blocked: gate.quota.token_blocked,
          },
          { status: 429 }
        ),
        gate.quota
      );
    case "ok":
      try {
        return withQuotaHeader(
          await streamAgent("orgbotsDesk", request, {
            params,
            skipRateLimit: true,
          }),
          gate.quota
        );
      } catch {
        await refundTeamChatTurn(userId, tokens);
        return Response.json({ error: "mix_failed" }, { status: 503 });
      }
    default: {
      const _exhaustive: never = gate;
      return _exhaustive;
    }
  }
}
