import { handleChatStream } from "@mastra/ai-sdk";
import { createUIMessageStreamResponse } from "ai";
import { mastra } from "@/src/mastra";
import { agentRuntimeStatus } from "@/src/mastra/model";

const WINDOW_MS = 60_000;
const LIMIT = 10;
const buckets = new Map<string, { count: number; resetAt: number }>();

function clientKey(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local"
  );
}

export function rateLimitAgent(request: Request): Response | null {
  const key = clientKey(request);
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || now >= current.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return null;
  }
  if (current.count >= LIMIT) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }
  current.count += 1;
  return null;
}

export async function streamAgent(
  agentId: "orgbotsDesk" | "orgbotsSubmit",
  request: Request,
  options?: { params?: unknown; skipRateLimit?: boolean }
): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json({ error: "method_not_allowed" }, { status: 405 });
  }
  const limited = options?.skipRateLimit ? null : rateLimitAgent(request);
  if (limited) return limited;
  const status = agentRuntimeStatus();
  if (!status.modelReady) {
    return Response.json(
      { error: "Agent model env is missing. Set SARVAM_API_KEY." },
      { status: 503 }
    );
  }
  const params = options?.params ?? (await request.json());
  const stream = await handleChatStream({
    mastra,
    agentId,
    version: "v7",
    params,
  });
  return createUIMessageStreamResponse({ stream });
}