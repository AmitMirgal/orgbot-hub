export const TEAM_CHAT_MESSAGE_LIMIT = 20;
export const TEAM_CHAT_TOKEN_LIMIT = 50_000;

export type TeamChatQuota = {
  allowed: boolean;
  messages: number;
  tokens: number;
  limit_messages: number;
  limit_tokens: number;
  remaining_messages: number;
  remaining_tokens: number;
  reset_at: string;
  token_blocked: boolean;
};

function asInt(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value)
    ? Math.max(0, Math.trunc(value))
    : fallback;
}

function asIso(value: unknown): string {
  if (typeof value === "string" && value.length > 0) return value;
  const next = new Date();
  next.setUTCHours(24, 0, 0, 0);
  return next.toISOString();
}

export const TEAM_CHAT_QUOTA_HEADER = "x-team-chat-quota";

export function utcDayKey(from = new Date()): string {
  return from.toISOString().slice(0, 10);
}

export function utcDay(from = new Date()): Date {
  return new Date(`${utcDayKey(from)}T00:00:00.000Z`);
}

export function utcResetAt(from = new Date()): Date {
  return new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate() + 1));
}

export function quotaFromUsage(
  row: { messages: number; tokens: number } | null,
  allowedOverride?: boolean
): TeamChatQuota {
  const messages = row?.messages ?? 0;
  const tokens = row?.tokens ?? 0;
  const remaining_messages = Math.max(TEAM_CHAT_MESSAGE_LIMIT - messages, 0);
  const remaining_tokens = Math.max(TEAM_CHAT_TOKEN_LIMIT - tokens, 0);
  const allowed =
    allowedOverride ??
    (remaining_messages > 0 && remaining_tokens > 0);
  return {
    allowed,
    messages,
    tokens,
    limit_messages: TEAM_CHAT_MESSAGE_LIMIT,
    limit_tokens: TEAM_CHAT_TOKEN_LIMIT,
    remaining_messages,
    remaining_tokens,
    reset_at: utcResetAt().toISOString(),
    token_blocked: remaining_messages > 0 && !allowed,
  };
}

export function emptyTeamChatQuota(): TeamChatQuota {
  return quotaFromUsage(null);
}

export type TeamDeskConsumeGate =
  | { kind: "unreachable" }
  | { kind: "exhausted"; quota: TeamChatQuota }
  | { kind: "ok"; quota: TeamChatQuota };

export function teamDeskConsumeGate(
  consumed: TeamChatQuota | null
): TeamDeskConsumeGate {
  if (!consumed) return { kind: "unreachable" };
  if (!consumed.allowed) return { kind: "exhausted", quota: consumed };
  return { kind: "ok", quota: consumed };
}

export function parseTeamChatQuota(raw: unknown): TeamChatQuota | null {
  if (!raw || typeof raw !== "object") return null;
  const row = raw as Record<string, unknown>;
  const messages = asInt(row.messages);
  const tokens = asInt(row.tokens);
  const limit_messages = asInt(row.limit_messages, TEAM_CHAT_MESSAGE_LIMIT);
  const limit_tokens = asInt(row.limit_tokens, TEAM_CHAT_TOKEN_LIMIT);
  const remaining_messages = asInt(
    row.remaining_messages,
    Math.max(limit_messages - messages, 0)
  );
  const remaining_tokens = asInt(
    row.remaining_tokens,
    Math.max(limit_tokens - tokens, 0)
  );
  const allowed =
    typeof row.allowed === "boolean"
      ? row.allowed
      : remaining_messages > 0 && remaining_tokens > 0;
  return {
    allowed,
    messages,
    tokens,
    limit_messages,
    limit_tokens,
    remaining_messages,
    remaining_tokens,
    reset_at: asIso(row.reset_at),
    token_blocked: remaining_messages > 0 && !allowed,
  };
}

export function quotaMeterText(quota: TeamChatQuota): string {
  if (quota.token_blocked) {
    return "Token limit reached today. Resets 00:00 UTC.";
  }
  if (quota.remaining_messages <= 0) {
    return "0 / 20 messages left today. Resets 00:00 UTC.";
  }
  return `${quota.remaining_messages} / 20 left today`;
}

export function serializeTeamChatQuota(quota: TeamChatQuota): string {
  return JSON.stringify(quota);
}

export function quotaFromResponse(response: Response): TeamChatQuota | null {
  const raw = response.headers.get(TEAM_CHAT_QUOTA_HEADER);
  if (!raw) return null;
  try {
    return parseTeamChatQuota(JSON.parse(raw) as unknown);
  } catch {
    return null;
  }
}

export function estimatePromptTokens(params: unknown): number {
  const text = collectText(params);
  return Math.max(1, Math.ceil(text.length / 4));
}

function collectText(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(collectText).join(" ");
  if (!value || typeof value !== "object") return "";
  return Object.values(value).map(collectText).join(" ");
}
