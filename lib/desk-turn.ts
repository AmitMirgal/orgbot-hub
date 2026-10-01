import { createUIMessageStream, createUIMessageStreamResponse, type UIMessage } from "ai";
import type { CatalogSeat } from "@/lib/api-pack";
import { searchCatalogSeats } from "@/src/mastra/tools/catalog";
import { orgbotsDesk } from "@/src/mastra/agents/desk";

export type RankedSeats = {
  empty: boolean;
  seats: CatalogSeat[];
};

export type DeskProseInput = {
  query: string;
  seats: CatalogSeat[];
  signal?: AbortSignal;
};

export type DeskProse = (input: DeskProseInput) => AsyncIterable<string>;

type DeskMemory = {
  thread: string;
  resource?: string;
};

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

function deskMemory(params: unknown): DeskMemory | undefined {
  if (!isRecord(params) || !isRecord(params.memory)) return undefined;
  const thread = params.memory.thread;
  if (typeof thread !== "string" || thread.length === 0) return undefined;
  const resource = params.memory.resource;
  return {
    thread,
    ...(typeof resource === "string" ? { resource } : {}),
  };
}

function uiMessages(params: unknown): UIMessage[] {
  if (!isRecord(params) || !Array.isArray(params.messages)) return [];
  return params.messages.filter((message): message is UIMessage => {
    return isRecord(message) && typeof message.id === "string" && typeof message.role === "string";
  });
}

function rosterText(seats: CatalogSeat[]): string {
  return seats
    .map((seat, index) => {
      const handle = seat.author.xHandle ?? seat.pack.owner;
      return `${index + 1}. ${seat.name} | ${seat.job} | @${handle} | ${seat.pack.href} | ${seat.grokTemplateUrl}`;
    })
    .join("\n");
}

export async function rankDeskSeats(query: string, signal?: AbortSignal): Promise<RankedSeats> {
  return searchCatalogSeats({ q: query }, signal);
}

async function* sarvamDeskProse(
  input: DeskProseInput,
  memory: DeskMemory | undefined
): AsyncGenerator<string> {
  const result = await orgbotsDesk.stream(
    [
      {
        role: "user",
        content: `${input.query}\n\nRanked seats, best first:\n${rosterText(input.seats)}`,
      },
    ],
    {
      toolChoice: "none",
      maxSteps: 1,
      activeTools: [],
      ...(memory ? { memory } : {}),
      ...(input.signal ? { abortSignal: input.signal } : {}),
    }
  );
  for await (const delta of result.textStream) {
    if (delta) yield delta;
  }
}

function releaseQueuedCards(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

export function createDeskCardStream(options: {
  query: string;
  rankSeats: (query: string, signal?: AbortSignal) => Promise<RankedSeats>;
  prose: DeskProse;
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
        let open = false;
        try {
          for await (const delta of options.prose({
            query: options.query,
            seats: ranked.seats,
            signal: options.signal,
          })) {
            if (!delta) continue;
            if (!open) {
              writer.write({ type: "text-start", id: textId });
              open = true;
            }
            writer.write({ type: "text-delta", id: textId, delta });
          }
        } catch (error) {
          console.error("[mix] desk prose failed", error);
        }
        if (open) writer.write({ type: "text-end", id: textId });
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
    prose: (input) => sarvamDeskProse(input, deskMemory(params)),
    signal,
    originalMessages: uiMessages(params),
  });
  return createUIMessageStreamResponse({ stream });
}
