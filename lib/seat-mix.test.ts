import assert from "node:assert/strict";
import { test } from "node:test";
import type { CatalogSeat } from "./api-pack.ts";
import { parseRequirementJobs, selectMix } from "./seat-mix.ts";

function seat(
  partial: Omit<CatalogSeat, "pack"> & { owner: string; slug?: string; packName?: string }
): CatalogSeat {
  return {
    id: partial.id,
    name: partial.name,
    job: partial.job,
    isDesk: partial.isDesk,
    grokTemplateUrl: partial.grokTemplateUrl,
    packId: partial.packId,
    pack: {
      owner: partial.owner,
      slug: partial.slug ?? partial.owner,
      name: partial.packName ?? partial.owner,
      href: `/${partial.owner}/${partial.slug ?? partial.owner}`,
    },
  };
}

const catalog: CatalogSeat[] = [
  seat({
    id: "a-desk",
    name: "Front Desk",
    job: "Clinic front desk",
    isDesk: true,
    grokTemplateUrl: "https://x.ai/bot/93gOz3op1UQdBdbekQFLK",
    packId: "pack-a",
    owner: "authorA",
  }),
  seat({
    id: "a-billing",
    name: "Billing",
    job: "Clinic billing",
    isDesk: false,
    grokTemplateUrl: "https://x.ai/bot/fcJJMM58AdXSTBdW3xWyW",
    packId: "pack-a",
    owner: "authorA",
  }),
  seat({
    id: "b-qa",
    name: "QA",
    job: "QA reviewer",
    isDesk: false,
    grokTemplateUrl: "https://x.ai/bot/ph5mcXqVy2p176Br7BJYi",
    packId: "pack-b",
    owner: "authorB",
  }),
  seat({
    id: "ghost",
    name: "Ghost",
    job: "Should never appear",
    isDesk: false,
    grokTemplateUrl: "https://example.com/bot/nope",
    packId: "pack-b",
    owner: "authorB",
  }),
];

test("parseRequirementJobs splits jobs", () => {
  assert.deepEqual(parseRequirementJobs("front desk plus billing plus QA"), [
    "front desk",
    "billing",
    "QA",
  ]);
});

test("mixer can return seats from two authors", () => {
  const mixed = selectMix(catalog, ["front desk", "billing", "QA"]);
  const authors = new Set(mixed.map((item) => item.pack.owner));
  assert.ok(authors.has("authorA"));
  assert.ok(authors.has("authorB"));
  assert.ok(mixed.some((item) => item.id === "a-desk"));
  assert.ok(mixed.some((item) => item.id === "a-billing"));
  assert.ok(mixed.some((item) => item.id === "b-qa"));
  assert.ok(mixed.filter((item) => item.pack.owner === "authorA").length >= 1);
  assert.ok(mixed.filter((item) => item.pack.owner === "authorB").length >= 1);
});

test("mixer never returns a URL not in the catalog", () => {
  const allowed = new Set(
    catalog
      .filter((item) => item.grokTemplateUrl.startsWith("https://x.ai/bot/"))
      .map((item) => item.grokTemplateUrl)
  );
  const mixed = selectMix(catalog, ["front desk", "billing", "QA"]);
  for (const item of mixed) {
    assert.ok(allowed.has(item.grokTemplateUrl));
    assert.notEqual(item.grokTemplateUrl, null);
    assert.ok(item.grokTemplateUrl.startsWith("https://x.ai/bot/"));
  }
  assert.equal(
    mixed.some((item) => item.grokTemplateUrl === "https://example.com/bot/nope"),
    false
  );
  assert.equal(
    mixed.some((item) => item.id === "ghost"),
    false
  );
});

test("mixer never returns a seat with a null grokTemplateUrl", () => {
  const withNull = [
    ...catalog,
    seat({
      id: "null-url",
      name: "Null",
      job: "front desk",
      isDesk: false,
      grokTemplateUrl: null as unknown as string,
      packId: "pack-c",
      owner: "authorC",
    }),
  ];
  const mixed = selectMix(withNull, ["front desk"]);
  assert.ok(mixed.length > 0);
  assert.ok(mixed.every((item) => typeof item.grokTemplateUrl === "string"));
  assert.ok(mixed.every((item) => item.grokTemplateUrl));
  assert.equal(
    mixed.some((item) => item.id === "null-url"),
    false
  );
});
