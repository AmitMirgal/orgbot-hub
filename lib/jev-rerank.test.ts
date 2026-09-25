import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { botRerankState, rerankBotsWithJev, rerankPacksWithJev, type RankableBot, type RankablePack } from "./jev-rerank.ts";

function read(rel: string): string {
  return readFileSync(fileURLToPath(new URL(rel, import.meta.url)), "utf8");
}

function pack(partial: Partial<RankablePack> & { slug: string; name: string }): RankablePack {
  return {
    owner: partial.owner ?? "author",
    slug: partial.slug,
    name: partial.name,
    description: partial.description ?? "",
    topics: partial.topics ?? [],
    seats: partial.seats ?? [],
  };
}

const hiring = pack({
  slug: "hiring",
  name: "Hiring desk",
  description: "Source and screen engineers",
  seats: [{ name: "Recruiter", job: "Hire software engineers", isDesk: false }],
});
const billing = pack({
  slug: "billing",
  name: "Clinic billing",
  description: "Claims and invoices",
  seats: [{ name: "Billing", job: "Clinic billing", isDesk: false }],
});
const qa = pack({
  slug: "qa",
  name: "QA pack",
  description: "Review pull requests",
  seats: [{ name: "QA", job: "QA reviewer", isDesk: false }],
});

test("Jev re-rank sorts packs by noul, highest first", async () => {
  const nouls = new Map([
    ["hiring", 0.91],
    ["billing", 0.12],
    ["qa", 0.44],
  ]);
  const ranked = await rerankPacksWithJev("hire engineers", [billing, qa, hiring], {
    scorePack: async (_query, item) => nouls.get(item.slug) ?? null,
  });
  assert.deepEqual(
    ranked.map((item) => item.slug),
    ["hiring", "qa", "billing"]
  );
});

test("low top noul keeps the original shortlist order", async () => {
  const ranked = await rerankPacksWithJev("unrelated query", [billing, qa, hiring], {
    minTopNoul: 0.4,
    scorePack: async () => 0.21,
  });
  assert.deepEqual(
    ranked.map((item) => item.slug),
    ["billing", "qa", "hiring"]
  );
});

test("failed Jev scores keep the original shortlist order", async () => {
  const ranked = await rerankPacksWithJev("hire engineers", [billing, qa, hiring], {
    scorePack: async () => null,
  });
  assert.deepEqual(
    ranked.map((item) => item.slug),
    ["billing", "qa", "hiring"]
  );
});

test("a single pack is not sent to Jev", async () => {
  let called = 0;
  const ranked = await rerankPacksWithJev("hire engineers", [hiring], {
    scorePack: async () => {
      called += 1;
      return 0.9;
    },
  });
  assert.equal(called, 0);
  assert.deepEqual(
    ranked.map((item) => item.slug),
    ["hiring"]
  );
});

test("Jev re-rank sorts bots by noul, highest first", async () => {
  const echo: RankableBot = {
    name: "Echo",
    job: "Turns a customer call into slides",
    isDesk: false,
    pack: { name: "Krista" },
  };
  const egg: RankableBot = {
    name: "Dr Eggbot",
    job: "Builds other Grok bots",
    isDesk: true,
    pack: { name: "Lauren" },
  };
  const ranked = await rerankBotsWithJev("product manager", [egg, echo], {
    scoreBot: async (_query, bot) => (bot.name === "Echo" ? 0.86 : 0.31),
  });
  assert.deepEqual(
    ranked.map((bot) => bot.name),
    ["Echo", "Dr Eggbot"]
  );
});

test("bot rerank state scores the job and does not carry a bot URL", () => {
  const state = botRerankState("product manager", {
    name: "Echo",
    job: "Turns a customer call into slides",
    isDesk: false,
    pack: { name: "Krista" },
  });
  assert.equal(state.query, "product manager");
  assert.equal(state.bot.name, "Echo");
  assert.equal(state.bot.pack, "Krista");
  assert.equal(JSON.stringify(state).includes("x.ai"), false);
});

test("searchPacks re-ranks through Jev and agents do not use jev as a chat model", () => {
  const catalog = read("../src/mastra/tools/catalog.ts");
  const desk = read("../src/mastra/agents/desk.ts");
  const submit = read("../src/mastra/agents/submit.ts");
  const model = read("../src/mastra/model.ts");
  const index = read("../src/mastra/index.ts");
  assert.match(catalog, /searchAndRerankPacks/);
  assert.match(desk, /mastraModel\(\)/);
  assert.match(submit, /mastraModel\(\)/);
  assert.doesNotMatch(desk, /jev-latest/);
  assert.doesNotMatch(submit, /jev-latest/);
  assert.doesNotMatch(model, /jev-latest/);
  assert.doesNotMatch(index, /createWorkflow/);
});
