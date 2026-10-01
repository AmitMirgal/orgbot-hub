import assert from "node:assert/strict";
import { performance } from "node:perf_hooks";
import { after, test } from "node:test";
import { TypeSafeClient } from "@typesafe-ai/sdk";
import { clearSeatRankReuseForTests, searchPacks, searchSeats } from "../src/mastra/tools/catalog.ts";
import { prisma } from "./prisma.ts";

const QUERY = "give me bots pack for product manager";

type RankState = {
  pack?: { slug?: string; seats?: unknown[] };
  bot?: { name?: string; job?: string };
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

test("team chat catalog search skips prisma and sends one shortlist to Jev", async () => {
  const previousKey = process.env.TYPESAFE_API_KEY;
  process.env.TYPESAFE_API_KEY = "test-key";
  const { resetJevClientForTests } = await import("./jev-rerank.ts");
  resetJevClientForTests();
  clearSeatRankReuseForTests();
  const states: RankState[] = [];
  const original = TypeSafeClient.prototype.systemOne;
  TypeSafeClient.prototype.systemOne = async function (request: { state?: RankState }) {
    states.push(request.state ?? {});
    return { answers: { relevant: { noul: 0.91 } } };
  };

  try {
    const started = performance.now();
    const packs = await searchPacks.execute({ q: QUERY }, {});
    const packStates = states.filter((state) => state.pack);
    const seatsAfterPacks = states.filter((state) => state.bot).length;
    const seats = await searchSeats.execute({ q: QUERY }, {});
    const seatsAfterBoth = states.filter((state) => state.bot).length;
    const elapsedMs = Math.round(performance.now() - started);
    console.log(
      JSON.stringify({
        elapsedMs,
        packFindMany: counts.packFindMany,
        packFindFirst: counts.packFindFirst,
        packVisitGroupBy: counts.packVisitGroupBy,
        jevPackCalls: packStates.length,
        jevSeatCalls: seatsAfterBoth,
      })
    );

    assert.equal(counts.packFindMany, 0);
    assert.equal(counts.packFindFirst, 0);
    assert.equal(counts.packVisitGroupBy, 0);
    assert.equal(packs.empty, false);
    assert.ok(packs.packs.length >= 1);
    assert.ok(packs.packs.length <= 8);
    assert.ok(packStates.length >= 2);
    assert.ok(packStates.length <= 20);
    assert.ok(packStates.every((state) => (state.pack?.seats?.length ?? 0) <= 8));
    assert.equal(
      packStates.some((state) => state.pack?.slug === "george"),
      true
    );
    assert.ok(seatsAfterPacks >= 2);
    assert.ok(seatsAfterPacks <= 12);
    assert.equal(seatsAfterBoth, seatsAfterPacks);
    assert.equal(seats.empty, false);
    assert.deepEqual(
      seats.seats.map((seat) => seat.grokTemplateUrl),
      packs.seats.map((seat) => seat.grokTemplateUrl)
    );
  } finally {
    TypeSafeClient.prototype.systemOne = original;
    resetJevClientForTests();
    clearSeatRankReuseForTests();
    if (previousKey === undefined) delete process.env.TYPESAFE_API_KEY;
    else process.env.TYPESAFE_API_KEY = previousKey;
  }
});
