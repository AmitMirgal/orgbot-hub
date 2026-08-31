import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import {
  fallbackStats,
  getFallbackPack,
  getFallbackProfile,
  listFallbackPacks,
} from "./fallback-catalog.ts";
import { parseGrokTemplateUrl } from "./grok-url.ts";

const seedSql = readFileSync(
  fileURLToPath(new URL("../supabase/seed.sql", import.meta.url)),
  "utf8"
);

test("catalog includes existing packs plus Tal Smit Danny Massimo Mai", () => {
  const stats = fallbackStats();
  assert.equal(stats.packs, 14);
  assert.equal(stats.seats, 18);
  assert.ok(getFallbackPack("poteto", "lauren"));
  assert.ok(getFallbackPack("cjblev", "corey"));
  assert.ok(getFallbackProfile("examples"));
  assert.equal(getFallbackPack("examples", "stencil"), null);
  assert.ok(!listFallbackPacks().some((pack) => pack.owner.githubLogin === "examples"));
});

test("Hiten keeps Pitch Deck Coach desk, Britney, and two new named seats", () => {
  const hiten = getFallbackPack("hnshah", "hiten");
  assert.ok(hiten);
  assert.equal(hiten.id, "10000000-0000-0000-0000-000000000015");
  assert.equal(hiten.official, false);
  assert.equal(hiten.featured, false);
  assert.deepEqual(
    hiten.seats.map((item) => ({
      id: item.id,
      name: item.name,
      isDesk: item.isDesk,
      sortOrder: item.sortOrder,
      grokTemplateUrl: item.grokTemplateUrl,
    })),
    [
      {
        id: "20000000-0000-0000-0000-000000000007",
        name: "Pitch Deck Coach",
        isDesk: true,
        sortOrder: 0,
        grokTemplateUrl: "https://x.ai/bot/mqVPHm0oB3WPsnxbU1qB9",
      },
      {
        id: "20000000-0000-0000-0000-000000000008",
        name: "It's Britney",
        isDesk: false,
        sortOrder: 1,
        grokTemplateUrl: "https://x.ai/bot/pNLwpHs8rmtMzAkUi-Zu2",
      },
      {
        id: "20000000-0000-0000-0000-000000000012",
        name: "Product Idea Stress Test",
        isDesk: false,
        sortOrder: 2,
        grokTemplateUrl: "https://x.ai/bot/JeFTvcDX-7QT2evKGIb52",
      },
      {
        id: "20000000-0000-0000-0000-000000000013",
        name: "The Page",
        isDesk: false,
        sortOrder: 3,
        grokTemplateUrl: "https://x.ai/bot/uFRK1GoAsiopBLPY19QCe",
      },
    ]
  );
  assert.match(hiten.routingRule, /Pitch Deck Coach/);
  assert.match(hiten.routingRule, /It's Britney only for Britney/);
  assert.match(hiten.routingRule, /Product Idea Stress Test only for idea and assumption testing/);
  assert.match(hiten.routingRule, /The Page only for public-page change watches/);
  assert.match(hiten.readmeMd ?? "", /Do not add Box Inspector/);
  assert.ok(!hiten.seats.some((item) => /box inspector/i.test(item.name)));
});

test("new packs are unofficial, unfeatured, and use canonical x.ai/bot URLs", () => {
  const expected = [
    {
      owner: "talsiach",
      slug: "tal",
      desk: "Blunt",
      url: "https://x.ai/bot/N0J32FbnVRuetJi1oJggh",
      seatId: "20000000-0000-0000-0000-000000000014",
    },
    {
      owner: "thesmitpatel",
      slug: "smit",
      desk: "Commercial Taste",
      url: "https://x.ai/bot/vekulzIMXM8hDjkp-mDkX",
      seatId: "20000000-0000-0000-0000-000000000015",
    },
    {
      owner: "dannylimanseta",
      slug: "danny",
      desk: "Sable: Game Art",
      url: "https://x.ai/bot/oSvAMKX_ahD56ZmgwtRys",
      seatId: "20000000-0000-0000-0000-000000000016",
    },
    {
      owner: "massimodeluisa",
      slug: "massimo",
      desk: "Human Copywriter",
      url: "https://x.ai/bot/JZAccYtlRFvDSU2CnMnkZ",
      seatId: "20000000-0000-0000-0000-000000000017",
    },
    {
      owner: "MaiYangAI",
      slug: "mai",
      desk: "Grok Deck",
      url: "https://x.ai/bot/Ja9NzNTRz2ozzQLNfrJwI",
      seatId: "20000000-0000-0000-0000-000000000018",
    },
  ] as const;

  for (const item of expected) {
    const pack = getFallbackPack(item.owner, item.slug);
    assert.ok(pack, `${item.owner}/${item.slug}`);
    assert.equal(pack.official, false);
    assert.equal(pack.featured, false);
    assert.equal(pack.seats.length, 1);
    assert.equal(pack.seats[0]?.name, item.desk);
    assert.equal(pack.seats[0]?.isDesk, true);
    assert.equal(pack.seats[0]?.id, item.seatId);
    assert.equal(pack.seats[0]?.grokTemplateUrl, item.url);
    assert.equal(parseGrokTemplateUrl(pack.seats[0]?.grokTemplateUrl), item.url);
    assert.match(seedSql, new RegExp(item.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.equal(getFallbackProfile("maiyang"), null);
  assert.ok(getFallbackProfile("MaiYangAI"));
  const lauren = getFallbackPack("poteto", "lauren");
  assert.ok(!lauren?.seats.some((item) => /peddler/i.test(item.name)));
});

test("seed.sql dual-write covers Hiten seats and new owners", () => {
  for (const id of [
    "20000000-0000-0000-0000-000000000012",
    "20000000-0000-0000-0000-000000000013",
    "20000000-0000-0000-0000-000000000014",
    "20000000-0000-0000-0000-000000000015",
    "20000000-0000-0000-0000-000000000016",
    "20000000-0000-0000-0000-000000000017",
    "20000000-0000-0000-0000-000000000018",
  ]) {
    assert.match(seedSql, new RegExp(id));
  }
  assert.match(seedSql, /talsiach@orgbots\.dev/);
  assert.match(seedSql, /thesmitpatel@orgbots\.dev/);
  assert.match(seedSql, /dannylimanseta@orgbots\.dev/);
  assert.match(seedSql, /massimodeluisa@orgbots\.dev/);
  assert.match(seedSql, /MaiYangAI@orgbots\.dev/);
  assert.match(seedSql, /10000000-0000-0000-0000-000000000023/);
  assert.doesNotMatch(seedSql, /'Box Inspector'/);
  assert.doesNotMatch(seedSql, /https:\/\/github\.com\/maiyang[^-A-Z]/i);
});
