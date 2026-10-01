import assert from "node:assert/strict";
import { performance } from "node:perf_hooks";
import { after, test } from "node:test";
import { TypeSafeClient } from "@typesafe-ai/sdk";
import { catalogThreadRender } from "./chat-seats.ts";
import { listMemorySeats } from "./memory-catalog.ts";
import { prisma } from "./prisma.ts";
import { createDeskCardStream, streamDeskSearchResponse, type RankedSeats } from "./desk-turn.ts";
import { resetJevClientForTests } from "./jev-rerank.ts";
import { clearSeatRankReuseForTests } from "../src/mastra/tools/catalog.ts";
import { orgbotsDesk } from "../src/mastra/agents/desk.ts";

const ROSTER_LINE = "Install each seat in Grok. This is your mix, not a listed pack.";

const QUERY = "give me the product manager bot";

type RankState = {
  pack?: { slug?: string };
  bot?: { name?: string };
};

const counts = { packFindMany: 0, packFindFirst: 0, packVisitGroupBy: 0 };

function watch(target: object, key: "findMany" | "findFirst" | "groupBy", bucket: keyof typeof counts) {
  const current = (target as Record<string, unknown>)[key];
  if (typeof current !== "function") return;
  const original = current.bind(target);
  (target as Record<string, unknown>)[key] = async (...args: unknown[]) => {
    counts[bucket] += 1;
    return original(...args);
  };
}

if (prisma) {
  watch(prisma.pack, "findMany", "packFindMany");
  watch(prisma.pack, "findFirst", "packFindFirst");
  watch(prisma.packVisit, "groupBy", "packVisitGroupBy");
}

after(async () => {
  await prisma?.$disconnect();
});

function blockDeskModel(): { calls: () => number; restore: () => void } {
  const agent = orgbotsDesk as unknown as {
    stream: (...args: unknown[]) => Promise<unknown>;
  };
  const original = agent.stream;
  let calls = 0;
  agent.stream = async () => {
    calls += 1;
    throw new Error("desk model must not run");
  };
  return {
    calls: () => calls,
    restore: () => {
      agent.stream = original;
    },
  };
}

test("roster search writes one static line and does not call Sarvam", async () => {
  const previousKey = process.env.TYPESAFE_API_KEY;
  process.env.TYPESAFE_API_KEY = "test-key";
  resetJevClientForTests();
  clearSeatRankReuseForTests();
  const states: RankState[] = [];
  const original = TypeSafeClient.prototype.systemOne;
  TypeSafeClient.prototype.systemOne = async function (request: { state?: RankState }) {
    states.push(request.state ?? {});
    return { answers: { relevant: { noul: 0.91 } } };
  };
  const deskModel = blockDeskModel();
  const started = performance.now();
  const catalogUrls = new Set(listMemorySeats().map((seat) => seat.grokTemplateUrl));

  try {
    const response = streamDeskSearchResponse({
      messages: [{ id: "1", role: "user", parts: [{ type: "text", text: QUERY }] }],
    });
    const reader = response.body?.getReader();
    assert.ok(reader);
    const decoder = new TextDecoder();
    let buffer = "";
    let cardsAt = 0;
    let textAt = 0;
    const chunks: Array<{ type?: string; delta?: string; output?: { seats?: unknown[] } }> = [];
    while (true) {
      const next = await reader.read();
      if (next.done) break;
      buffer += decoder.decode(next.value, { stream: true });
      const blocks = buffer.split("\n\n");
      buffer = blocks.pop() ?? "";
      for (const block of blocks) {
        for (const line of block.split("\n")) {
          if (!line.startsWith("data: ") || line === "data: [DONE]") continue;
          const chunk = JSON.parse(line.slice(6)) as {
            type?: string;
            delta?: string;
            output?: { seats?: unknown[] };
          };
          chunks.push(chunk);
          if (chunk.type === "tool-output-available" && !cardsAt) cardsAt = performance.now();
          if (chunk.type === "text-delta" && !textAt) textAt = performance.now();
        }
      }
    }

    const text = chunks
      .filter((chunk) => chunk.type === "text-delta")
      .map((chunk) => chunk.delta ?? "")
      .join("");
    const output = chunks.find((chunk) => chunk.type === "tool-output-available")?.output;
    const view = catalogThreadRender({
      role: "assistant",
      parts: [
        { type: "tool-searchSeats", state: "output-available", output },
        { type: "text", text },
      ],
      last: true,
      mix: true,
      waiting: false,
    });
    const packCalls = states.filter((state) => state.pack).length;
    const seatCalls = states.filter((state) => state.bot).length;
    const paintedUrls =
      view.kind === "assistant" ? view.seats.map((seat) => seat.grokTemplateUrl) : [];
    const report = {
      liveSarvam: Boolean(process.env.SARVAM_API_KEY?.trim()),
      liveJev: false,
      stubbedJev: true,
      deskModelCalls: deskModel.calls(),
      cardsAtMs: cardsAt ? Math.round(cardsAt - started) : null,
      textAtMs: textAt ? Math.round(textAt - started) : null,
      elapsedMs: Math.round(performance.now() - started),
      jevPackCalls: packCalls,
      jevSeatCalls: seatCalls,
      catalogSeats: catalogUrls.size,
      paintedSeats: paintedUrls.length,
      text,
    };
    console.log(JSON.stringify(report));

    assert.equal(deskModel.calls(), 0);
    assert.equal(view.kind, "assistant");
    if (view.kind === "assistant") {
      assert.equal(view.text, ROSTER_LINE);
      assert.ok(view.seats.length >= 1);
      assert.ok(view.seats.length <= 6);
    }
    assert.ok(cardsAt > 0);
    assert.ok(textAt > cardsAt);
    assert.equal(packCalls, 0);
    assert.ok(seatCalls >= 2);
    assert.ok(seatCalls <= 12);
    assert.ok(seatCalls < catalogUrls.size);
    for (const url of paintedUrls) {
      assert.equal(catalogUrls.has(url), true);
      assert.equal(url.startsWith("https://x.ai/bot/"), true);
    }
    assert.equal(counts.packFindMany, 0);
    assert.equal(counts.packFindFirst, 0);
    assert.equal(counts.packVisitGroupBy, 0);
  } finally {
    deskModel.restore();
    TypeSafeClient.prototype.systemOne = original;
    resetJevClientForTests();
    clearSeatRankReuseForTests();
    if (previousKey === undefined) delete process.env.TYPESAFE_API_KEY;
    else process.env.TYPESAFE_API_KEY = previousKey;
  }
});

test("an empty shortlist writes no text and does not call Sarvam", async () => {
  const deskModel = blockDeskModel();
  try {
    const stream = createDeskCardStream({
      query: "zzzz-no-match",
      rankSeats: async (): Promise<RankedSeats> => ({ empty: true, seats: [] }),
    });
    const chunks = [];
    const reader = stream.getReader();
    while (true) {
      const next = await reader.read();
      if (next.done) break;
      chunks.push(next.value.type);
    }
    assert.equal(deskModel.calls(), 0);
    assert.equal(chunks.includes("tool-output-available"), true);
    assert.equal(chunks.includes("text-delta"), false);
  } finally {
    deskModel.restore();
  }
});
