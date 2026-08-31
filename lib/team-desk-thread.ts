export function teamDeskThreadId(userId: string): string {
  return `team-desk:${userId}`;
}

export function teamDeskMemoryOption(userId: string) {
  return {
    thread: teamDeskThreadId(userId),
    resource: userId,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

export function deskStreamParams(userId: string, params: unknown) {
  const body = isRecord(params) ? params : {};
  const messages = Array.isArray(body.messages) ? body.messages : [];
  const last = messages.at(-1);
  const lastRole =
    isRecord(last) && typeof last.role === "string" ? last.role : undefined;
  const trigger = body.trigger;
  const outgoing =
    trigger === "regenerate-message" || lastRole === "assistant"
      ? messages
      : last !== undefined
        ? [last]
        : messages;
  return {
    ...body,
    messages: outgoing,
    memory: teamDeskMemoryOption(userId),
  };
}
