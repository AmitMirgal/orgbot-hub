import assert from "node:assert/strict";
import { performance } from "node:perf_hooks";
import { after, test } from "node:test";
import { readUIMessageStream } from "ai";
import { TypeSafeClient } from "@typesafe-ai/sdk";
import { catalogThreadRender } from "./chat-seats.ts";
import { listMemorySeats } from "./memory-catalog.ts";
import { prisma } from "./prisma.ts";
import { createDeskCardStream, rankDeskSeats, type RankedSeats } from "./desk-turn.ts";
import { resetJevClientForTests } from "./jev-rerank.ts";
import { clearSeatRankReuseForTests } from "../src/mastra/tools/catalog.ts";

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

test("seat cards are on the stream before Sarvam prose starts", async () => {
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

  const started = performance.now();
  let proseEnteredAt = 0;
  let cardsAt = 0;
  let textAt = 0;
  let proseSeats = 0;
  const catalogUrls = new Set(listMemorySeats().map((seat) => seat.grokTemplateUrl));

  try {
    const stream = createDeskCardStream({
      query: QUERY,
      rankSeats: rankDeskSeats,
      prose: async function* (input) {
        proseEnteredAt = performance.now();
        proseSeats = input.seats.length;
        await new Promise((resolve) => setTimeout(resolve, 80));
        yield "Install each seat in Grok. This is your mix, not a listed pack.";
      },
    });

    let sawCardsWithoutText = false;
    let paintedUrls: string[] = [];
    for await (const message of readUIMessageStream({ stream })) {
      const view = catalogThreadRender({
        role: message.role,
        parts: message.parts,
        last: true,
        mix: true,
        waiting: true,
      });
      if (view.kind !== "assistant") continue;
      if (view.seats.length > 0 && !view.text && !sawCardsWithoutText) {
        sawCardsWithoutText = true;
        cardsAt = performance.now();
        paintedUrls = view.seats.map((seat) => seat.grokTemplateUrl);
      }
      if (view.text && !textAt) {
        textAt = performance.now();
      }
    }

    const packCalls = states.filter((state) => state.pack).length;
    const seatCalls = states.filter((state) => state.bot).length;
    const report = {
      liveSarvam: Boolean(process.env.SARVAM_API_KEY?.trim()),
      liveJev: false,
      stubbedJev: true,
      cardsAtMs: cardsAt ? Math.round(cardsAt - started) : null,
      proseEnteredAtMs: proseEnteredAt ? Math.round(proseEnteredAt - started) : null,
      textAtMs: textAt ? Math.round(textAt - started) : null,
      textAfterCardsMs:
        cardsAt && textAt ? Math.round(textAt - cardsAt) : null,
      jevPackCalls: packCalls,
      jevSeatCalls: seatCalls,
      catalogSeats: catalogUrls.size,
      paintedSeats: paintedUrls.length,
      packFindMany: counts.packFindMany,
      packFindFirst: counts.packFindFirst,
      packVisitGroupBy: counts.packVisitGroupBy,
    };
    console.log(JSON.stringify(report));

    assert.equal(sawCardsWithoutText, true);
    assert.ok(cardsAt > 0);
    assert.ok(proseEnteredAt > cardsAt);
    assert.ok(textAt > cardsAt);
    assert.ok((textAt - cardsAt) >= 40);
    assert.equal(packCalls, 0);
    assert.ok(seatCalls >= 2);
    assert.ok(seatCalls <= 12);
    assert.ok(seatCalls < catalogUrls.size);
    assert.ok(paintedUrls.length >= 1);
    assert.ok(paintedUrls.length <= 6);
    assert.equal(proseSeats, paintedUrls.length);
    for (const url of paintedUrls) {
      assert.equal(catalogUrls.has(url), true);
      assert.equal(url.startsWith("https://x.ai/bot/"), true);
    }
    assert.equal(counts.packFindMany, 0);
    assert.equal(counts.packFindFirst, 0);
    assert.equal(counts.packVisitGroupBy, 0);
    assert.equal(report.liveSarvam, false);
  } finally {
    TypeSafeClient.prototype.systemOne = original;
    resetJevClientForTests();
    clearSeatRankReuseForTests();
    if (previousKey === undefined) delete process.env.TYPESAFE_API_KEY;
    else process.env.TYPESAFE_API_KEY = previousKey;
  }
});

test("an empty shortlist does not start prose", async () => {
  let called = false;
  const stream = createDeskCardStream({
    query: "zzzz-no-match",
    rankSeats: async (): Promise<RankedSeats> => ({ empty: true, seats: [] }),
    prose: async function* () {
      called = true;
      yield "should not run";
    },
  });
  const chunks = [];
  const reader = stream.getReader();
  while (true) {
    const next = await reader.read();
    if (next.done) break;
    chunks.push(next.value.type);
  }
  assert.equal(called, false);
  assert.equal(chunks.includes("tool-output-available"), true);
  assert.equal(chunks.includes("text-delta"), false);
});
