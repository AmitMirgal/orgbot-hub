import { createUIMessageStream, createUIMessageStreamResponse, type UIMessage } from "ai";
import type { CatalogSeat } from "@/lib/api-pack";
import { searchCatalogSeats } from "@/src/mastra/tools/catalog";

export type RankedSeats = {
  empty: boolean;
  seats: CatalogSeat[];
};

const ROSTER_LINE = "Install each seat in Grok. This is your mix, not a listed pack.";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

export function latestDeskQuery(params: unknown): string {
  if (!isRecord(params) || !Array.isArray(params.messages)) return "";
  for (let index = params.messages.length - 1; index >= 0; index -= 1) {
    const message = params.messages[index];
    if (!isRecord(message) || message.role !== "user") continue;
    if (typeof message.content === "string" && message.content.trim()) {
      return message.content.trim();
    }
    if (!Array.isArray(message.parts)) continue;
    const text = message.parts
      .map((part) => {
        if (!isRecord(part) || part.type !== "text" || typeof part.text !== "string") return "";
        return part.text;
      })
      .join("")
      .trim();
    if (text) return text;
  }
  return "";
}

function uiMessages(params: unknown): UIMessage[] {
  if (!isRecord(params) || !Array.isArray(params.messages)) return [];
  return params.messages.filter((message): message is UIMessage => {
    return isRecord(message) && typeof message.id === "string" && typeof message.role === "string";
  });
}

export async function rankDeskSeats(query: string, signal?: AbortSignal): Promise<RankedSeats> {
  return searchCatalogSeats({ q: query }, signal);
}

function releaseQueuedCards(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

export function createDeskCardStream(options: {
  query: string;
  rankSeats: (query: string, signal?: AbortSignal) => Promise<RankedSeats>;
  signal?: AbortSignal;
  originalMessages?: UIMessage[];
}) {
  return createUIMessageStream({
    originalMessages: options.originalMessages,
    execute: async ({ writer }) => {
      const toolCallId = crypto.randomUUID();
      const textId = crypto.randomUUID();
      writer.write({ type: "start", messageId: crypto.randomUUID() });
      writer.write({ type: "start-step" });
      writer.write({
        type: "tool-input-available",
        toolCallId,
        toolName: "searchSeats",
        input: { q: options.query },
        providerExecuted: true,
      });
      const ranked = await options.rankSeats(options.query, options.signal);
      writer.write({
        type: "tool-output-available",
        toolCallId,
        output: { empty: ranked.seats.length === 0, seats: ranked.seats },
        providerExecuted: true,
      });
      await releaseQueuedCards();
      if (ranked.seats.length > 0) {
        writer.write({ type: "text-start", id: textId });
        writer.write({ type: "text-delta", id: textId, delta: ROSTER_LINE });
        writer.write({ type: "text-end", id: textId });
      }
      writer.write({ type: "finish-step" });
      writer.write({ type: "finish", finishReason: "stop" });
    },
  });
}

export function streamDeskSearchResponse(params: unknown, signal?: AbortSignal): Response {
  const stream = createDeskCardStream({
    query: latestDeskQuery(params),
    rankSeats: rankDeskSeats,
    signal,
    originalMessages: uiMessages(params),
  });
  return createUIMessageStreamResponse({ stream });
}
