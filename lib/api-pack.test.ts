import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { getFallbackPack } from "./fallback-catalog.ts";
import {
  assertNoInstallsCount,
  toPublicPack,
  visitsLabel,
} from "./api-pack.ts";

test("serializer exposes visitsCount and never installsCount", () => {
  const lauren = getFallbackPack("poteto", "lauren");
  assert.ok(lauren);
  const publicPack = toPublicPack({ ...lauren, visitsCount: 12 });
  assert.equal(publicPack.visitsCount, 12);
  assert.equal(publicPack.href, "/poteto/lauren");
  assert.equal(publicPack.owner, "poteto");
  assert.ok(publicPack.seats[0]?.grokTemplateUrl?.startsWith("https://x.ai/bot/"));
  assert.equal("installsCount" in publicPack, false);
  assert.doesNotThrow(() => assertNoInstallsCount(publicPack));
  assert.throws(() => assertNoInstallsCount({ ...publicPack, installsCount: 3 }));
});

test("visitsLabel formats visits, never installs", () => {
  assert.equal(visitsLabel(0), "0 visits");
  assert.equal(visitsLabel(12), "12 visits");
  assert.match(visitsLabel(0), /visits/);
  assert.doesNotMatch(visitsLabel(0), /installs/);
});

test("pack card formats visitsCount as visits", () => {
  const src = readFileSync(
    fileURLToPath(new URL("../components/pack-card.tsx", import.meta.url)),
    "utf8"
  );
  assert.match(src, /visitsLabel\(visitsCount\)/);
  assert.match(src, /pack\.visitsCount/);
  assert.doesNotMatch(src, /installsCount/);
  assert.doesNotMatch(src, /installs/);
  assert.doesNotMatch(src, /recordVisit/);
  assert.doesNotMatch(src, /loadVisitOverlay/);
});

test("Add to Grok increments visits and does not count Copy", () => {
  const src = readFileSync(
    fileURLToPath(new URL("../components/add-to-grok.tsx", import.meta.url)),
    "utf8"
  );
  assert.match(src, /recordVisit\(packId, owner, slug\)/);
  assert.match(src, /source: "add_to_grok"/);
  assert.doesNotMatch(src, /onCopy[\s\S]*recordVisit/);
});

test("Add every bot increments once per CTA, not per seat link", () => {
  const src = readFileSync(
    fileURLToPath(new URL("../components/add-every-bot.tsx", import.meta.url)),
    "utf8"
  );
  assert.match(src, /recordVisit\(packId, owner, slug\)/);
  assert.match(src, /source: "add_every_bot"/);
  assert.match(src, /onClick=\{trackEvery\}/);
  assert.match(src, /trackEvery\(\)/);
});
