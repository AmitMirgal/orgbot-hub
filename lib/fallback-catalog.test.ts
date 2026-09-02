import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import {
  fallbackStats,
  getFallbackPack,
  getFallbackProfile,
  listFallbackPacks,
  listFallbackPacksByOwner,
} from "./fallback-catalog.ts";
import { parseGrokTemplateUrl } from "./grok-url.ts";

const seedSql = readFileSync(
  fileURLToPath(new URL("../supabase/seed.sql", import.meta.url)),
  "utf8"
);

test("catalog includes existing packs plus the new verified shares", () => {
  const stats = fallbackStats();
  assert.equal(stats.packs, 128);
  assert.equal(stats.seats, 166);
  assert.ok(getFallbackPack("poteto", "lauren"));
  assert.ok(getFallbackPack("cjblev", "corey"));
  assert.ok(getFallbackPack("MaiYangAI", "mai"));
  assert.ok(getFallbackPack("farzyness", "farzad"));
  assert.ok(getFallbackPack("naoufalelh", "nao"));
  assert.ok(getFallbackPack("Teslaconomics", "teslaconomics"));
  assert.ok(getFallbackPack("kentcdodds", "kent"));
  assert.ok(getFallbackPack("abdshomad", "abd"));
  assert.ok(getFallbackPack("brstorrie", "ben"));
  assert.ok(getFallbackPack("beaudenison", "beau"));
  assert.ok(getFallbackPack("jennananpei", "jenna"));
  assert.ok(getFallbackPack("funkii", "funkii"));
  assert.ok(getFallbackPack("SumoSign", "keith"));
  assert.ok(getFallbackPack("bfrench", "bill-french"));
  assert.ok(getFallbackPack("herdrdev", "can"));
  assert.ok(getFallbackPack("andreleibovici", "andre"));
  assert.ok(getFallbackPack("randywhitepdx", "randy"));
  assert.ok(getFallbackPack("pohlipit", "pete"));
  assert.ok(getFallbackPack("akshaybhopani", "akshay"));
  assert.ok(getFallbackProfile("examples"));
  assert.equal(getFallbackPack("examples", "stencil"), null);
  assert.ok(!listFallbackPacks().some((pack) => pack.owner.githubLogin === "examples"));
});

test("Hiten keeps Pitch Deck Coach desk and four named seats including When It Matters", () => {
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
      {
        id: "20000000-0000-0000-0000-000000000111",
        name: "When It Matters",
        isDesk: false,
        sortOrder: 4,
        grokTemplateUrl: "https://x.ai/bot/BqrH8_GNQvSYV-gcmJnd8",
      },
    ]
  );
  assert.match(hiten.routingRule, /Pitch Deck Coach/);
  assert.match(hiten.routingRule, /It's Britney only for Britney/);
  assert.match(hiten.routingRule, /Product Idea Stress Test only for idea and assumption testing/);
  assert.match(hiten.routingRule, /The Page only for public-page change watches/);
  assert.match(hiten.routingRule, /When It Matters only for watches that should message when the answer actually changes/);
  assert.match(hiten.readmeMd ?? "", /Do not add Box Inspector/);
  assert.ok(!hiten.seats.some((item) => /box inspector/i.test(item.name)));
  assert.match(hiten.seats[4]?.job ?? "", /when it matters/i);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/BqrH8_GNQvSYV-gcmJnd8/);
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
    if (item.slug === "mai") {
      assert.equal(pack.seats.length, 2);
    } else {
      assert.equal(pack.seats.length, 1);
    }
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

test("Farzad keeps Claudey as desk and adds Shorty and Researchy", () => {
  const farzad = getFallbackPack("farzyness", "farzad");
  assert.ok(farzad);
  assert.equal(farzad.seats[0]?.name, "Claudey");
  assert.equal(farzad.seats[0]?.isDesk, true);
  assert.equal(farzad.seats[0]?.grokTemplateUrl, "https://x.ai/bot/OR72i4SNc0_F1IzbCfg-D");
  assert.deepEqual(
    farzad.seats.map((item) => ({
      name: item.name,
      isDesk: item.isDesk,
      sortOrder: item.sortOrder,
      grokTemplateUrl: item.grokTemplateUrl,
    })),
    [
      {
        name: "Claudey",
        isDesk: true,
        sortOrder: 0,
        grokTemplateUrl: "https://x.ai/bot/OR72i4SNc0_F1IzbCfg-D",
      },
      {
        name: "Shorty",
        isDesk: false,
        sortOrder: 1,
        grokTemplateUrl: "https://x.ai/bot/32fHIBw9Yz-s_o35KycGX",
      },
      {
        name: "Researchy",
        isDesk: false,
        sortOrder: 2,
        grokTemplateUrl: "https://x.ai/bot/rQt4W2zO2Gx9lfcBjd1lj",
      },
    ]
  );
  assert.match(farzad.routingRule, /Claudey/);
  assert.match(farzad.routingRule, /Shorty only for YouTube Shorts clipping/);
  assert.match(farzad.routingRule, /Researchy only for Grok Build CLI at max thinking/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/32fHIBw9Yz-s_o35KycGX/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/rQt4W2zO2Gx9lfcBjd1lj/);
});

test("Nao keeps Rutin as desk and adds Chieeeeefy", () => {
  const nao = getFallbackPack("naoufalelh", "nao");
  assert.ok(nao);
  assert.equal(nao.seats[0]?.name, "Rutin");
  assert.equal(nao.seats[0]?.isDesk, true);
  assert.deepEqual(
    nao.seats.map((item) => ({
      name: item.name,
      isDesk: item.isDesk,
      sortOrder: item.sortOrder,
      grokTemplateUrl: item.grokTemplateUrl,
    })),
    [
      {
        name: "Rutin",
        isDesk: true,
        sortOrder: 0,
        grokTemplateUrl: "https://x.ai/bot/o4gWkNGmffEaVtOhaEsA7",
      },
      {
        name: "Chieeeeefy",
        isDesk: false,
        sortOrder: 1,
        grokTemplateUrl: "https://x.ai/bot/GiBPBQR2WrHNul4k9Tz6Q",
      },
    ]
  );
  assert.match(nao.routingRule, /Rutin/);
  assert.match(nao.routingRule, /Chieeeeefy only for chief-of-staff work/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/GiBPBQR2WrHNul4k9Tz6Q/);
});

test("Jenna keeps Trendspotter as desk and adds Bing Bong and Event Producer", () => {
  const jenna = getFallbackPack("jennananpei", "jenna");
  assert.ok(jenna);
  assert.equal(jenna.official, false);
  assert.equal(jenna.featured, false);
  assert.equal(jenna.owner.avatarUrl, null);
  assert.deepEqual(
    jenna.seats.map((item) => ({
      id: item.id,
      name: item.name,
      isDesk: item.isDesk,
      sortOrder: item.sortOrder,
      grokTemplateUrl: item.grokTemplateUrl,
    })),
    [
      {
        id: "20000000-0000-0000-0000-000000000035",
        name: "Trendspotter",
        isDesk: true,
        sortOrder: 0,
        grokTemplateUrl: "https://x.ai/bot/nnDL-hclNLB8SkJvcVtwr",
      },
      {
        id: "20000000-0000-0000-0000-000000000036",
        name: "Bing Bong",
        isDesk: false,
        sortOrder: 1,
        grokTemplateUrl: "https://x.ai/bot/BjzK0lRsgxuLSsQIsnI3E",
      },
      {
        id: "20000000-0000-0000-0000-000000000037",
        name: "Event Producer",
        isDesk: false,
        sortOrder: 2,
        grokTemplateUrl: "https://x.ai/bot/5gyGG-rnVsQVTLWAfki1u",
      },
    ]
  );
  assert.match(jenna.routingRule, /Trendspotter/);
  assert.match(jenna.routingRule, /Bing Bong only for sports marketing partnership ops/);
  assert.match(jenna.routingRule, /Event Producer only for VIP and field event production/);
});

test("Mai keeps Grok Deck as desk and adds the Chinese tweet-scanner seat", () => {
  const mai = getFallbackPack("MaiYangAI", "mai");
  assert.ok(mai);
  assert.equal(mai.official, false);
  assert.equal(mai.featured, false);
  assert.deepEqual(
    mai.seats.map((item) => ({
      id: item.id,
      name: item.name,
      isDesk: item.isDesk,
      sortOrder: item.sortOrder,
      grokTemplateUrl: item.grokTemplateUrl,
    })),
    [
      {
        id: "20000000-0000-0000-0000-000000000018",
        name: "Grok Deck",
        isDesk: true,
        sortOrder: 0,
        grokTemplateUrl: "https://x.ai/bot/Ja9NzNTRz2ozzQLNfrJwI",
      },
      {
        id: "20000000-0000-0000-0000-000000000019",
        name: "最值得关注的Grok Bot 推文？",
        isDesk: false,
        sortOrder: 1,
        grokTemplateUrl: "https://x.ai/bot/lFDR77qKaT3Iglzv9pUac",
      },
    ]
  );
  assert.match(mai.routingRule, /Grok Deck/);
  assert.match(mai.routingRule, /最值得关注的Grok Bot 推文？/);
  assert.match(mai.seats[1]?.job ?? "", /Chinese/);
  assert.match(mai.seats[1]?.job ?? "", /Does not post/);
});

test("new packs are unofficial, unfeatured, and keep one desk per author", () => {
  const expected = [
    {
      owner: "shanemac",
      slug: "shane",
      name: "Shane",
      desk: "Librarian",
      url: "https://x.ai/bot/suKVjDAR-hSr_PTBxgdRw",
      seatId: "20000000-0000-0000-0000-000000000020",
      packId: "10000000-0000-0000-0000-000000000024",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "a-makelky",
      slug: "aaron",
      name: "Aaron",
      desk: "Set Up",
      url: "https://x.ai/bot/BsExflSUXpW0hs21OTBzu",
      seatId: "20000000-0000-0000-0000-000000000021",
      packId: "10000000-0000-0000-0000-000000000025",
      seats: 3,
      topic: "founder",
    },
    {
      owner: "LeTerryBZH",
      slug: "thierry",
      name: "Thierry",
      desk: "2nd Brain",
      url: "https://x.ai/bot/c4fYduVVic2YtbcjXquD0",
      seatId: "20000000-0000-0000-0000-000000000024",
      packId: "10000000-0000-0000-0000-000000000026",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "ahalvor",
      slug: "andy",
      name: "Andy",
      desk: "Homeroom",
      url: "https://x.ai/bot/IciOb-9jMtlkc1RJj6MQe",
      seatId: "20000000-0000-0000-0000-000000000025",
      packId: "10000000-0000-0000-0000-000000000027",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "amberdawn1786",
      slug: "amber",
      name: "Amber",
      desk: "Sous Chef",
      url: "https://x.ai/bot/RuCu3IpKAvrx00H0MDI0t",
      seatId: "20000000-0000-0000-0000-000000000026",
      packId: "10000000-0000-0000-0000-000000000028",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "NicoChauvin74",
      slug: "nicolas",
      name: "Nicolas",
      desk: "BeTree",
      url: "https://x.ai/bot/2PSNlIROOJPj9qZlfRy0w",
      seatId: "20000000-0000-0000-0000-000000000027",
      packId: "10000000-0000-0000-0000-000000000029",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "JordanHall_dev",
      slug: "jordan",
      name: "Jordan",
      desk: "Usage-pool orchestrator",
      url: "https://x.ai/bot/Nx4wpKeM_NYx577xlJFMD",
      seatId: "20000000-0000-0000-0000-000000000028",
      packId: "10000000-0000-0000-0000-000000000030",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "mdafanulh",
      slug: "md",
      name: "Md",
      desk: "Lumos",
      url: "https://x.ai/bot/SwTxLoOaIwDqTSvhTIhrK",
      seatId: "20000000-0000-0000-0000-000000000029",
      packId: "10000000-0000-0000-0000-000000000031",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "rrrkren",
      slug: "eric-ren",
      name: "Eric Ren",
      desk: "unifi AQ trmnl integration",
      url: "https://x.ai/bot/NU02qQ9iahZtAM0i0x1KT",
      seatId: "20000000-0000-0000-0000-000000000030",
      packId: "10000000-0000-0000-0000-000000000032",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "billzanetti",
      slug: "bill",
      name: "Bill",
      desk: "Grok Build",
      url: "https://x.ai/bot/eydijdzrfgtnmlnUyPSI-",
      seatId: "20000000-0000-0000-0000-000000000031",
      packId: "10000000-0000-0000-0000-000000000033",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "abdshomad",
      slug: "abd",
      name: "Abd",
      desk: "Bot Father",
      url: "https://x.ai/bot/dVQjvC6c-sMhtgVskciBH",
      seatId: "20000000-0000-0000-0000-000000000032",
      packId: "10000000-0000-0000-0000-000000000034",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "brstorrie",
      slug: "ben",
      name: "Ben",
      desk: "The Accountant",
      url: "https://x.ai/bot/Y_R1Ya9SIzQZguGTV5NCX",
      seatId: "20000000-0000-0000-0000-000000000033",
      packId: "10000000-0000-0000-0000-000000000035",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "beaudenison",
      slug: "beau",
      name: "Beau",
      desk: "Grok Build",
      url: "https://x.ai/bot/iwa3WaHZn385jfZrsQngL",
      seatId: "20000000-0000-0000-0000-000000000034",
      packId: "10000000-0000-0000-0000-000000000036",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "jennananpei",
      slug: "jenna",
      name: "Jenna",
      desk: "Trendspotter",
      url: "https://x.ai/bot/nnDL-hclNLB8SkJvcVtwr",
      seatId: "20000000-0000-0000-0000-000000000035",
      packId: "10000000-0000-0000-0000-000000000037",
      seats: 3,
      topic: "founder",
    },
    {
      owner: "funkii",
      slug: "funkii",
      name: "funkii",
      desk: "t2000",
      url: "https://x.ai/bot/eXQt5VUovcU0HMj_b-CDY",
      seatId: "20000000-0000-0000-0000-000000000038",
      packId: "10000000-0000-0000-0000-000000000038",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "SumoSign",
      slug: "keith",
      name: "Keith",
      desk: "SumoSign",
      url: "https://x.ai/bot/Uicr9Dc3FKOmsMfbN_NHB",
      seatId: "20000000-0000-0000-0000-000000000039",
      packId: "10000000-0000-0000-0000-000000000039",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "bfrench",
      slug: "bill-french",
      name: "Bill French",
      desk: "STEER",
      url: "https://x.ai/bot/mhzjt-Pa01Ds8EJ0zJrcz",
      seatId: "20000000-0000-0000-0000-000000000040",
      packId: "10000000-0000-0000-0000-000000000040",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "herdrdev",
      slug: "can",
      name: "Can",
      desk: "Shepherd",
      url: "https://x.ai/bot/i5YF8f-zdcR76uKPrqg3J",
      seatId: "20000000-0000-0000-0000-000000000041",
      packId: "10000000-0000-0000-0000-000000000041",
      seats: 1,
      topic: "developer",
    },
  ] as const;

  for (const item of expected) {
    const pack = getFallbackPack(item.owner, item.slug);
    assert.ok(pack, `${item.owner}/${item.slug}`);
    assert.equal(pack.id, item.packId);
    assert.equal(pack.name, item.name);
    assert.equal(pack.official, false);
    assert.equal(pack.featured, false);
    assert.deepEqual(pack.topics, [item.topic]);
    assert.equal(pack.seats.length, item.seats);
    assert.equal(pack.seats[0]?.name, item.desk);
    assert.equal(pack.seats[0]?.isDesk, true);
    assert.equal(pack.seats[0]?.sortOrder, 0);
    assert.equal(pack.seats[0]?.id, item.seatId);
    assert.equal(pack.seats[0]?.grokTemplateUrl, item.url);
    assert.equal(parseGrokTemplateUrl(pack.seats[0]?.grokTemplateUrl), item.url);
    assert.match(seedSql, new RegExp(item.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(seedSql, new RegExp(item.packId));
  }

  const aaron = getFallbackPack("a-makelky", "aaron");
  assert.ok(aaron);
  assert.deepEqual(
    aaron.seats.map((item) => ({
      name: item.name,
      isDesk: item.isDesk,
      sortOrder: item.sortOrder,
      grokTemplateUrl: item.grokTemplateUrl,
    })),
    [
      {
        name: "Set Up",
        isDesk: true,
        sortOrder: 0,
        grokTemplateUrl: "https://x.ai/bot/BsExflSUXpW0hs21OTBzu",
      },
      {
        name: "Overwatch",
        isDesk: false,
        sortOrder: 1,
        grokTemplateUrl: "https://x.ai/bot/HtClSXO_AmiQoyYH9aXV9",
      },
      {
        name: "CoS",
        isDesk: false,
        sortOrder: 2,
        grokTemplateUrl: "https://x.ai/bot/eiVFbd0nIdH2gzSwHOs0D",
      },
    ]
  );
  assert.match(aaron.routingRule, /Set Up/);
  assert.match(aaron.routingRule, /Overwatch only for multi-bot workspace organization/);
  assert.match(aaron.routingRule, /CoS only for chief-of-staff work/);

  const eric = getFallbackPack("ericzakariasson", "eric");
  const ericRen = getFallbackPack("rrrkren", "eric-ren");
  assert.ok(eric);
  assert.ok(ericRen);
  assert.equal(eric.slug, "eric");
  assert.equal(ericRen.slug, "eric-ren");
  assert.equal(ericRen.name, "Eric Ren");
  assert.notEqual(eric.id, ericRen.id);
  assert.equal(getFallbackPack("rrrkren", "eric"), null);
  assert.equal(getFallbackProfile("ericren"), null);
  assert.ok(getFallbackProfile("rrrkren"));
  assert.ok(getFallbackProfile("a-makelky"));
  assert.equal(getFallbackProfile("theaaron"), null);
  assert.equal(getFallbackProfile("ShaneMac"), null);
  assert.ok(getFallbackProfile("shanemac"));

  const bill = getFallbackPack("billzanetti", "bill");
  assert.ok(bill);
  assert.ok(!bill.seats.some((item) => /steer/i.test(item.name)));
  assert.match(bill.readmeMd ?? "", /Do not add STEER/);
  assert.match(bill.readmeMd ?? "", /Do not add Beau's Grok Build/);
  assert.equal(bill.seats[0]?.grokTemplateUrl, "https://x.ai/bot/eydijdzrfgtnmlnUyPSI-");

  const teslaconomics = getFallbackPack("Teslaconomics", "teslaconomics");
  assert.ok(teslaconomics);
  assert.equal(teslaconomics.name, "Teslaconomics");
  assert.equal(teslaconomics.slug, "teslaconomics");
  assert.equal(teslaconomics.seats[0]?.name, "Grok Build");
  assert.equal(teslaconomics.seats[0]?.grokTemplateUrl, "https://x.ai/bot/ZRxm1O9tmizOhriV7GiWL");
  assert.notEqual(bill.seats[0]?.grokTemplateUrl, teslaconomics.seats[0]?.grokTemplateUrl);
  assert.match(teslaconomics.readmeMd ?? "", /not Bill Zanetti's Grok Build/);
  assert.match(teslaconomics.readmeMd ?? "", /not Beau's Grok Build/);
  assert.ok(!bill.seats.some((item) => item.grokTemplateUrl === "https://x.ai/bot/ZRxm1O9tmizOhriV7GiWL"));
  assert.ok(!bill.seats.some((item) => item.grokTemplateUrl === "https://x.ai/bot/iwa3WaHZn385jfZrsQngL"));

  const beau = getFallbackPack("beaudenison", "beau");
  assert.ok(beau);
  assert.equal(beau.seats[0]?.grokTemplateUrl, "https://x.ai/bot/iwa3WaHZn385jfZrsQngL");
  assert.notEqual(beau.seats[0]?.grokTemplateUrl, bill.seats[0]?.grokTemplateUrl);
  assert.notEqual(beau.seats[0]?.grokTemplateUrl, teslaconomics.seats[0]?.grokTemplateUrl);
  assert.match(beau.readmeMd ?? "", /not Bill Zanetti's Grok Build/);
  assert.match(beau.readmeMd ?? "", /not Teslaconomics' Grok Build/);

  const billFrench = getFallbackPack("bfrench", "bill-french");
  assert.ok(billFrench);
  assert.equal(billFrench.seats[0]?.name, "STEER");
  assert.equal(billFrench.seats[0]?.grokTemplateUrl, "https://x.ai/bot/mhzjt-Pa01Ds8EJ0zJrcz");
  assert.equal(getFallbackPack("bfrench", "bill"), null);
  assert.equal(getFallbackPack("billzanetti", "bill-french"), null);

  assert.ok(!aaron.seats.some((item) => /accountant/i.test(item.name)));
  const ben = getFallbackPack("brstorrie", "ben");
  assert.ok(ben);
  assert.match(ben.readmeMd ?? "", /do not add it to Aaron/);

  const lauren = getFallbackPack("poteto", "lauren");
  assert.equal(lauren?.seats.length, 2);
  assert.equal(lauren?.seats[0]?.name, "Dr Eggbot");
  assert.equal(lauren?.seats[0]?.isDesk, true);
  assert.equal(lauren?.seats[0]?.grokTemplateUrl, "https://x.ai/bot/93gOz3op1UQdBdbekQFLK");
  assert.equal(lauren?.seats[1]?.name, "tinkabot");
  assert.equal(lauren?.seats[1]?.isDesk, false);
  assert.equal(lauren?.seats[1]?.id, "20000000-0000-0000-0000-000000000157");
  assert.equal(lauren?.seats[1]?.grokTemplateUrl, "https://x.ai/bot/br5f3C4mc75QCMEHaszXd");
  assert.ok(!lauren?.seats.some((item) => /peddler/i.test(item.name)));
  assert.ok(!lauren?.seats.some((item) => /box inspector/i.test(item.name)));
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
    "20000000-0000-0000-0000-000000000019",
    "20000000-0000-0000-0000-000000000020",
    "20000000-0000-0000-0000-000000000021",
    "20000000-0000-0000-0000-000000000022",
    "20000000-0000-0000-0000-000000000023",
    "20000000-0000-0000-0000-000000000024",
    "20000000-0000-0000-0000-000000000025",
    "20000000-0000-0000-0000-000000000026",
    "20000000-0000-0000-0000-000000000027",
    "20000000-0000-0000-0000-000000000028",
    "20000000-0000-0000-0000-000000000029",
    "20000000-0000-0000-0000-000000000030",
    "20000000-0000-0000-0000-000000000031",
    "20000000-0000-0000-0000-000000000032",
    "20000000-0000-0000-0000-000000000033",
    "20000000-0000-0000-0000-000000000034",
    "20000000-0000-0000-0000-000000000035",
    "20000000-0000-0000-0000-000000000036",
    "20000000-0000-0000-0000-000000000037",
    "20000000-0000-0000-0000-000000000038",
    "20000000-0000-0000-0000-000000000039",
    "20000000-0000-0000-0000-000000000040",
    "20000000-0000-0000-0000-000000000041",
    "20000000-0000-0000-0000-000000000042",
    "20000000-0000-0000-0000-000000000043",
    "20000000-0000-0000-0000-000000000044",
    "20000000-0000-0000-0000-000000000102",
    "20000000-0000-0000-0000-000000000103",
    "20000000-0000-0000-0000-000000000110",
    "20000000-0000-0000-0000-000000000111",
    "20000000-0000-0000-0000-000000000112",
    "20000000-0000-0000-0000-000000000113",
    "20000000-0000-0000-0000-000000000114",
    "20000000-0000-0000-0000-000000000115",
    "20000000-0000-0000-0000-000000000116",
    "20000000-0000-0000-0000-000000000117",
    "20000000-0000-0000-0000-000000000118",
    "20000000-0000-0000-0000-000000000119",
    "20000000-0000-0000-0000-000000000120",
    "20000000-0000-0000-0000-000000000121",
    "20000000-0000-0000-0000-000000000122",
    "20000000-0000-0000-0000-000000000123",
    "20000000-0000-0000-0000-000000000124",
  ]) {
    assert.match(seedSql, new RegExp(id));
  }
  assert.match(seedSql, /talsiach@orgbots\.dev/);
  assert.match(seedSql, /thesmitpatel@orgbots\.dev/);
  assert.match(seedSql, /dannylimanseta@orgbots\.dev/);
  assert.match(seedSql, /massimodeluisa@orgbots\.dev/);
  assert.match(seedSql, /MaiYangAI@orgbots\.dev/);
  assert.match(seedSql, /shanemac@orgbots\.dev/);
  assert.match(seedSql, /a-makelky@orgbots\.dev/);
  assert.match(seedSql, /LeTerryBZH@orgbots\.dev/);
  assert.match(seedSql, /ahalvor@orgbots\.dev/);
  assert.match(seedSql, /amberdawn1786@orgbots\.dev/);
  assert.match(seedSql, /NicoChauvin74@orgbots\.dev/);
  assert.match(seedSql, /JordanHall_dev@orgbots\.dev/);
  assert.match(seedSql, /mdafanulh@orgbots\.dev/);
  assert.match(seedSql, /rrrkren@orgbots\.dev/);
  assert.match(seedSql, /billzanetti@orgbots\.dev/);
  assert.match(seedSql, /abdshomad@orgbots\.dev/);
  assert.match(seedSql, /brstorrie@orgbots\.dev/);
  assert.match(seedSql, /beaudenison@orgbots\.dev/);
  assert.match(seedSql, /jennananpei@orgbots\.dev/);
  assert.match(seedSql, /funkii@orgbots\.dev/);
  assert.match(seedSql, /SumoSign@orgbots\.dev/);
  assert.match(seedSql, /bfrench@orgbots\.dev/);
  assert.match(seedSql, /herdrdev@orgbots\.dev/);
  assert.match(seedSql, /arthurmacwaters@orgbots\.dev/);
  assert.match(seedSql, /kentcdodds@orgbots\.dev/);
  assert.match(seedSql, /Teslaconomics@orgbots\.dev/);
  assert.match(seedSql, /10000000-0000-0000-0000-000000000023/);
  assert.match(seedSql, /10000000-0000-0000-0000-000000000033/);
  assert.match(seedSql, /10000000-0000-0000-0000-000000000034/);
  assert.match(seedSql, /10000000-0000-0000-0000-000000000041/);
  assert.match(seedSql, /10000000-0000-0000-0000-000000000042/);
  assert.match(seedSql, /10000000-0000-0000-0000-000000000091/);
  assert.match(seedSql, /10000000-0000-0000-0000-000000000097/);
  assert.match(seedSql, /tpgoebel@orgbots\.dev/);
  assert.match(seedSql, /johnbai@orgbots\.dev/);
  assert.match(seedSql, /ZenSched@orgbots\.dev/);
  assert.match(seedSql, /MSaintjour@orgbots\.dev/);
  assert.match(seedSql, /NikolaFYI@orgbots\.dev/);
  assert.match(seedSql, /benngarnish@orgbots\.dev/);
  assert.match(seedSql, /OTNworld@orgbots\.dev/);
  assert.match(seedSql, /HenryLeeBauta@orgbots\.dev/);
  assert.match(seedSql, /inqusit@orgbots\.dev/);
  assert.match(seedSql, /adgapar@orgbots\.dev/);
  assert.match(seedSql, /minebotcoin@orgbots\.dev/);
  assert.match(seedSql, /dennisonbertram@orgbots\.dev/);
  assert.match(seedSql, /adamlowisz@orgbots\.dev/);
  assert.match(seedSql, /chasemc67@orgbots\.dev/);
  assert.match(seedSql, /10000000-0000-0000-0000-000000000098/);
  assert.match(seedSql, /10000000-0000-0000-0000-000000000103/);
  assert.match(seedSql, /10000000-0000-0000-0000-000000000108/);
  assert.match(seedSql, /'bill-french'/);
  assert.match(seedSql, /'eric-ren'/);
  assert.match(seedSql, /'teslaconomics'/);
  assert.match(seedSql, /'daniel-farinax'/);
  assert.match(seedSql, /'daniel-mac'/);
  assert.match(seedSql, /'daniel-zambrini'/);
  assert.doesNotMatch(seedSql, /'Box Inspector'/);
  assert.doesNotMatch(seedSql, /https:\/\/github\.com\/maiyang[^-A-Z]/i);
  assert.doesNotMatch(seedSql, /https:\/\/x\.ai\/bot\/plugin\//);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/mhzjt-Pa01Ds8EJ0zJrcz/);
  assert.doesNotMatch(seedSql, /https:\/\/x\.ai\/bot\/AY2y4oPL_VgcttCt8OFqm/);
  assert.doesNotMatch(seedSql, /https:\/\/x\.ai\/bot\/PFD95widaEeqjkYLLUZmD/);
  assert.doesNotMatch(seedSql, /https:\/\/x\.ai\/bot\/Yf3pOvZQ0B_9DDcCzuhDG/);
  assert.doesNotMatch(seedSql, /https:\/\/x\.ai\/bot\/pImOOCvE7uB1SXENOI9Ng/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/i5YF8f-zdcR76uKPrqg3J/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/iwa3WaHZn385jfZrsQngL/);
  assert.match(seedSql, /andreleibovici@orgbots\.dev/);
  assert.match(seedSql, /randywhitepdx@orgbots\.dev/);
  assert.match(seedSql, /pohlipit@orgbots\.dev/);
  assert.match(seedSql, /akshaybhopani@orgbots\.dev/);
  assert.match(seedSql, /'Dead Man''s Bot'/);
  assert.doesNotMatch(seedSql, /https:\/\/x\.ai\/bot\/NuFI0dF9FgvO8FfMPHKzx/);
  assert.doesNotMatch(seedSql, /https:\/\/x\.ai\/bot\/-CjM4_uRs6sEGdfZfC5gv/);
});

test("grokbots.best gap-fill packs are unofficial with one desk and dual-written URLs", () => {
  const expected = [
    {
      owner: "arthurmacwaters",
      slug: "arthur",
      name: "Arthur",
      desk: "Research Bot",
      url: "https://x.ai/bot/Nn0ykGa3vJ6YS7ib7F6yH",
      seats: 1,
    },
    {
      owner: "Av1dlive",
      slug: "av1d",
      name: "Av1d",
      desk: "loops",
      url: "https://x.ai/bot/Ub3T7usX-c6yRQibQq83P",
      seats: 5,
    },
    {
      owner: "kentcdodds",
      slug: "kent",
      name: "Kent",
      desk: "Kody",
      url: "https://x.ai/bot/yTSGElYcIjFW_5IXu2I-e",
      seats: 2,
    },
    {
      owner: "lennysan",
      slug: "lenny",
      name: "Lenny",
      desk: "Be Happier",
      url: "https://x.ai/bot/0VC1XzREXRFGe0hVo-JEG",
      seats: 3,
    },
    {
      owner: "lingxi",
      slug: "lingxi",
      name: "Lingxi",
      desk: "Lingxi's Engineer Bot",
      url: "https://x.ai/bot/fY1xWwCLzDDGVe3GwH78j",
      seats: 2,
    },
    {
      owner: "waynesutton",
      slug: "wayne",
      name: "Wayne",
      desk: "Apps",
      url: "https://x.ai/bot/OPLop__-mqSsyQheR5JYv",
      seats: 2,
    },
    {
      owner: "tpgoebel",
      slug: "tobias-goebel",
      name: "Tobias Goebel",
      desk: "Melissa",
      url: "https://x.ai/bot/3foGoeh6ksDhD4jTxYjyE",
      seats: 1,
    },
    {
      owner: "imshiv6t9",
      slug: "shiv",
      name: "Shiv",
      desk: "Learning Assistant",
      url: "https://x.ai/bot/yE46R6j5vNPhd92fGxZRu",
      seats: 1,
    },
    {
      owner: "data_nexus",
      slug: "data-nexus",
      name: "Data Nexus",
      desk: "Blockchain Data Expert",
      url: "https://x.ai/bot/xqZS2HUq3XEoQ8oaH0LnA",
      seats: 2,
    },
    {
      owner: "darylbleach",
      slug: "daryl",
      name: "Daryl",
      desk: "Porter",
      url: "https://x.ai/bot/cl7kIRbcIuP6jj2Zt8z5K",
      seats: 1,
    },
    {
      owner: "johnbai",
      slug: "john",
      name: "John",
      desk: "figma bro",
      url: "https://x.ai/bot/VHMdjIGjGpgDSJR7dW6Gz",
      seats: 1,
    },
    {
      owner: "ZenSched",
      slug: "zensched",
      name: "ZenSched",
      desk: "ZenSched",
      url: "https://x.ai/bot/LK0rEXJnnD1qpEISXd7Ix",
      seats: 1,
    },
    {
      owner: "Daniel_Farinax",
      slug: "daniel-farinax",
      name: "Daniel Farinax",
      desk: "freebots.lol",
      url: "https://x.ai/bot/ndOGeXyjkQLdceRlk7JP4",
      seats: 1,
    },
    {
      owner: "daniel_mac8",
      slug: "daniel-mac",
      name: "Daniel Mac",
      desk: "X Brief",
      url: "https://x.ai/bot/GkX6X536UK2MlbkfGLQnb",
      seats: 1,
    },
    {
      owner: "DanielZambrini",
      slug: "daniel-zambrini",
      name: "Daniel Zambrini",
      desk: "Claude Code",
      url: "https://x.ai/bot/71PSQ4KBs-hNYBsH05X_n",
      seats: 1,
    },
  ] as const;

  for (const item of expected) {
    const pack = getFallbackPack(item.owner, item.slug);
    assert.ok(pack, `${item.owner}/${item.slug}`);
    assert.equal(pack.name, item.name);
    assert.equal(pack.official, false);
    assert.equal(pack.featured, false);
    assert.equal(pack.seats.length, item.seats);
    assert.equal(pack.seats[0]?.name, item.desk);
    assert.equal(pack.seats[0]?.isDesk, true);
    assert.equal(pack.seats[0]?.grokTemplateUrl, item.url);
    assert.equal(parseGrokTemplateUrl(pack.seats[0]?.grokTemplateUrl), item.url);
    assert.match(seedSql, new RegExp(item.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  const kent = getFallbackPack("kentcdodds", "kent");
  assert.ok(kent);
  assert.equal(kent.seats[1]?.name, "Imogen");
  assert.equal(kent.seats[1]?.grokTemplateUrl, "https://x.ai/bot/9y2GcFkKMAUhYlMxRUS0X");
  assert.equal(kent.owner.githubLogin, "kentcdodds");
  assert.ok(kent.owner.avatarUrl);

  const av1d = getFallbackPack("Av1dlive", "av1d");
  assert.ok(av1d);
  assert.equal(av1d.owner.avatarUrl, null);
  assert.deepEqual(
    av1d.seats.map((item) => item.name),
    ["loops", "Master", "Chief of Staff", "Growth Desk", "Grok Bot Coach"]
  );

  const dataNexus = getFallbackPack("data_nexus", "data-nexus");
  assert.ok(dataNexus);
  assert.deepEqual(
    dataNexus.seats.map((item) => item.name),
    ["Blockchain Data Expert", "Blockchain Data Expert 2"]
  );
  assert.equal(dataNexus.seats[1]?.grokTemplateUrl, "https://x.ai/bot/eyFr_G8h9UmrQHNpZpNfx");

  const john = getFallbackPack("johnbai", "john");
  assert.ok(john);
  assert.equal(john.seats.length, 1);
  assert.equal(john.seats[0]?.name, "figma bro");
  assert.match(john.readmeMd ?? "", /Do not add SEO\/GEO Specialist/);
  assert.ok(!john.seats.some((item) => item.grokTemplateUrl === "https://x.ai/bot/pImOOCvE7uB1SXENOI9Ng"));

  const tobias = getFallbackPack("tobias_pfuetze", "tobias");
  const tobiasGoebel = getFallbackPack("tpgoebel", "tobias-goebel");
  assert.ok(tobias);
  assert.ok(tobiasGoebel);
  assert.notEqual(tobias.id, tobiasGoebel.id);
  assert.equal(tobiasGoebel.seats[0]?.name, "Melissa");

  const fallbackUrls = new Set(
    listFallbackPacks()
      .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
      .map((seat) => seat.grokTemplateUrl)
      .filter((url): url is string => Boolean(url))
  );
  const seedUrls = new Set(
    [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map((match) => match[0])
  );
  for (const url of fallbackUrls) {
    assert.ok(seedUrls.has(url), `seed missing ${url}`);
  }
});

test("Scott and DogecoinNorway keep their desks and add named extra seats", () => {
  const scott = getFallbackPack("scottxmetcalf", "scott");
  assert.ok(scott);
  assert.equal(scott.official, false);
  assert.equal(scott.featured, false);
  assert.equal(scott.seats[0]?.name, "Leader 1:1 Bot");
  assert.equal(scott.seats[0]?.isDesk, true);
  assert.deepEqual(
    scott.seats.map((item) => ({
      id: item.id,
      name: item.name,
      isDesk: item.isDesk,
      sortOrder: item.sortOrder,
      grokTemplateUrl: item.grokTemplateUrl,
    })),
    [
      {
        id: "20000000-0000-0000-0000-000000000091",
        name: "Leader 1:1 Bot",
        isDesk: true,
        sortOrder: 0,
        grokTemplateUrl: "https://x.ai/bot/eZhKhPkfxxFSml18TS2X8",
      },
      {
        id: "20000000-0000-0000-0000-000000000112",
        name: "SE call bot",
        isDesk: false,
        sortOrder: 1,
        grokTemplateUrl: "https://x.ai/bot/9wmmsO_xoeLPeGEqjWLzE",
      },
      {
        id: "20000000-0000-0000-0000-000000000125",
        name: "Cookie Monster",
        isDesk: false,
        sortOrder: 2,
        grokTemplateUrl: "https://x.ai/bot/55t0IuxxlT7BWffNVOKai",
      },
    ]
  );
  assert.match(scott.routingRule, /Leader 1:1 Bot/);
  assert.match(scott.routingRule, /SE call bot only for SE and sales-engineer call work/);
  assert.match(scott.routingRule, /Cookie Monster only for Chrome cookie-sync work/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/9wmmsO_xoeLPeGEqjWLzE/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/55t0IuxxlT7BWffNVOKai/);

  const doge = getFallbackPack("dogecoinnorway", "dogecoinnorway");
  assert.ok(doge);
  assert.equal(doge.id, "10000000-0000-0000-0000-000000000051");
  assert.equal(doge.official, false);
  assert.equal(doge.featured, false);
  assert.equal(doge.seats[0]?.name, "Chef");
  assert.equal(doge.seats[0]?.isDesk, true);
  assert.equal(doge.seats.length, 2);
  assert.equal(doge.seats[1]?.name, "Review This");
  assert.equal(doge.seats[1]?.isDesk, false);
  assert.equal(doge.seats[1]?.sortOrder, 1);
  assert.equal(doge.seats[1]?.id, "20000000-0000-0000-0000-000000000113");
  assert.equal(doge.seats[1]?.grokTemplateUrl, "https://x.ai/bot/g4hvAEhebCPzqwsdPBGu4");
  assert.match(doge.routingRule, /Chef/);
  assert.match(doge.routingRule, /Review This only for named-product reviews/);
  assert.match(doge.seats[1]?.job ?? "", /buy, skip, or wait/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/g4hvAEhebCPzqwsdPBGu4/);
  assert.equal(listFallbackPacksByOwner("dogecoinnorway").length, 1);
});

test("catalog watch adds six unofficial one-desk packs with live x.ai URLs", () => {
  const expected = [
    {
      owner: "MSaintjour",
      slug: "marc",
      name: "Marc",
      desk: "Copay Compass",
      url: "https://x.ai/bot/ehxj2Wdxq9M04jvaAqyBD",
      seatId: "20000000-0000-0000-0000-000000000114",
      packId: "10000000-0000-0000-0000-000000000098",
      topic: "founder",
      avatar: null as string | null,
    },
    {
      owner: "NikolaFYI",
      slug: "nikola",
      name: "Nikola",
      desk: "Nom Nom",
      url: "https://x.ai/bot/bdcSxv_pSQEH0E571N_fC",
      seatId: "20000000-0000-0000-0000-000000000115",
      packId: "10000000-0000-0000-0000-000000000099",
      topic: "founder",
      avatar: null,
    },
    {
      owner: "benngarnish",
      slug: "benn",
      name: "Benn",
      desk: "Patch",
      url: "https://x.ai/bot/mZM210IvFxqswc9eaLjQa",
      seatId: "20000000-0000-0000-0000-000000000116",
      packId: "10000000-0000-0000-0000-000000000100",
      topic: "founder",
      avatar: "https://avatars.githubusercontent.com/u/1122587?v=4",
    },
    {
      owner: "OTNworld",
      slug: "paul",
      name: "Paul",
      desk: "Workshop Facilitator",
      url: "https://x.ai/bot/EJTJEGbRPXlSppzFk8ETH",
      seatId: "20000000-0000-0000-0000-000000000117",
      packId: "10000000-0000-0000-0000-000000000101",
      topic: "founder",
      avatar: "https://avatars.githubusercontent.com/u/228165969?v=4",
    },
    {
      owner: "HenryLeeBauta",
      slug: "henry",
      name: "Henry",
      desk: "Artifact Share",
      url: "https://x.ai/bot/u3jfM8xk_CixZJYKQ0S7u",
      seatId: "20000000-0000-0000-0000-000000000118",
      packId: "10000000-0000-0000-0000-000000000102",
      topic: "developer",
      avatar: null,
    },
    {
      owner: "inqusit",
      slug: "ashish",
      name: "Ashish",
      desk: "Tech Lead",
      url: "https://x.ai/bot/RfFPxQ_rfEGcUncrJ6g_W",
      seatId: "20000000-0000-0000-0000-000000000119",
      packId: "10000000-0000-0000-0000-000000000103",
      topic: "developer",
      avatar: null,
    },
  ] as const;

  for (const item of expected) {
    const pack = getFallbackPack(item.owner, item.slug);
    assert.ok(pack, `${item.owner}/${item.slug}`);
    assert.equal(pack.id, item.packId);
    assert.equal(pack.name, item.name);
    assert.equal(pack.official, false);
    assert.equal(pack.featured, false);
    assert.equal(pack.githubUrl, null);
    assert.deepEqual(pack.topics, [item.topic]);
    assert.equal(pack.likesCount, 0);
    assert.equal(pack.installsCount, 0);
    assert.equal(pack.visitsCount, 0);
    assert.equal(pack.seats.length, "seats" in item ? item.seats : 1);
    assert.equal(pack.seats[0]?.name, item.desk);
    assert.equal(pack.seats[0]?.isDesk, true);
    assert.equal(pack.seats[0]?.sortOrder, 0);
    assert.equal(pack.seats[0]?.id, item.seatId);
    assert.equal(pack.seats[0]?.grokTemplateUrl, item.url);
    assert.equal(parseGrokTemplateUrl(pack.seats[0]?.grokTemplateUrl), item.url);
    assert.equal(pack.owner.avatarUrl, item.avatar);
    assert.match(seedSql, new RegExp(item.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(seedSql, new RegExp(item.packId));
    assert.match(seedSql, new RegExp(item.seatId));
  }

  const benn = getFallbackPack("benngarnish", "benn");
  const ben = getFallbackPack("brstorrie", "ben");
  assert.ok(benn);
  assert.ok(ben);
  assert.notEqual(benn.id, ben.id);
  assert.equal(benn.slug, "benn");
  assert.equal(ben.slug, "ben");
  assert.equal(getFallbackPack("benngarnish", "ben"), null);
  assert.equal(getFallbackPack("brstorrie", "benn"), null);
  assert.match(benn.readmeMd ?? "", /not Ben Storrie's The Accountant/);
  assert.ok(!benn.seats.some((item) => /accountant/i.test(item.name)));
  assert.ok(!ben.seats.some((item) => /patch/i.test(item.name)));

  const marc = getFallbackPack("MSaintjour", "marc");
  assert.ok(marc);
  assert.equal(marc.seats.length, 1);
  assert.equal(marc.seats[0]?.name, "Copay Compass");
  assert.equal(marc.seats[0]?.isDesk, true);
  assert.match(marc.seats[0]?.job ?? "", /copay assistance/i);
  assert.match(marc.seats[0]?.job ?? "", /does not give medical advice/);
  assert.ok(!marc.seats.some((item) => item.grokTemplateUrl === "https://x.ai/bot/M9c2tC_-mwY8XNTmSbkUY"));

  assert.equal(getFallbackProfile("msaintjour"), null);
  assert.ok(getFallbackProfile("MSaintjour"));
  assert.ok(getFallbackProfile("NikolaFYI"));
  assert.ok(getFallbackProfile("benngarnish"));
  assert.ok(getFallbackProfile("OTNworld"));
  assert.ok(getFallbackProfile("HenryLeeBauta"));
  assert.ok(getFallbackProfile("inqusit"));
});

test("catalog watch adds five unofficial one-desk packs with live x.ai URLs", () => {
  const expected = [
    {
      owner: "adgapar",
      slug: "adi",
      name: "Adi",
      desk: "Token Ops",
      url: "https://x.ai/bot/4mCuSlW34n6l3aYxYJCdj",
      seatId: "20000000-0000-0000-0000-000000000120",
      packId: "10000000-0000-0000-0000-000000000104",
      topic: "developer",
      avatar: "https://avatars.githubusercontent.com/u/3167828?v=4" as string | null,
      job: /live routine/i,
    },
    {
      owner: "minebotcoin",
      slug: "botcoin",
      name: "BOTCOIN",
      desk: "BOTOSHI",
      url: "https://x.ai/bot/29XazZFrrsJyI8LUnExDD",
      seatId: "20000000-0000-0000-0000-000000000121",
      packId: "10000000-0000-0000-0000-000000000105",
      topic: "founder",
      avatar: null,
      job: /Zero ETH BOTCOIN mining-rig onboarding miner/,
    },
    {
      owner: "dennisonbertram",
      slug: "dennison",
      name: "Dennison",
      desk: "NYC Parent",
      url: "https://x.ai/bot/DiNI489Qte5ryNvZjOROb",
      seatId: "20000000-0000-0000-0000-000000000122",
      packId: "10000000-0000-0000-0000-000000000106",
      topic: "founder",
      avatar: "https://avatars.githubusercontent.com/u/228482372?v=4",
      job: /family chief of staff for New York City parents/i,
    },
    {
      owner: "adamlowisz",
      slug: "adam",
      name: "Adam",
      desk: "X Top 100 Fans Weekly",
      url: "https://x.ai/bot/HU7XArfGhUgLnzVcr7neB",
      seatId: "20000000-0000-0000-0000-000000000123",
      packId: "10000000-0000-0000-0000-000000000107",
      topic: "media",
      avatar: null,
      job: /top 100 X fans each week/i,
    },
    {
      owner: "chasemc67",
      slug: "chase",
      name: "Chase",
      desk: "Situation monitor",
      url: "https://x.ai/bot/lkHayxdQjNzVVJIDh7qaF",
      seatId: "20000000-0000-0000-0000-000000000124",
      packId: "10000000-0000-0000-0000-000000000108",
      topic: "media",
      avatar: "https://avatars.githubusercontent.com/u/6922982?v=4",
      job: /never posts until they say so/i,
    },
  ] as const;

  for (const item of expected) {
    const pack = getFallbackPack(item.owner, item.slug);
    assert.ok(pack, `${item.owner}/${item.slug}`);
    assert.equal(pack.id, item.packId);
    assert.equal(pack.name, item.name);
    assert.equal(pack.official, false);
    assert.equal(pack.featured, false);
    assert.equal(pack.githubUrl, null);
    assert.deepEqual(pack.topics, [item.topic]);
    assert.equal(pack.likesCount, 0);
    assert.equal(pack.installsCount, 0);
    assert.equal(pack.visitsCount, 0);
    assert.equal(pack.seats.length, 1);
    assert.equal(pack.seats[0]?.name, item.desk);
    assert.equal(pack.seats[0]?.isDesk, true);
    assert.equal(pack.seats[0]?.sortOrder, 0);
    assert.equal(pack.seats[0]?.id, item.seatId);
    assert.equal(pack.seats[0]?.grokTemplateUrl, item.url);
    assert.equal(parseGrokTemplateUrl(pack.seats[0]?.grokTemplateUrl), item.url);
    assert.match(pack.seats[0]?.job ?? "", item.job);
    assert.equal(pack.owner.avatarUrl, item.avatar);
    assert.match(seedSql, new RegExp(item.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(seedSql, new RegExp(item.packId));
    assert.match(seedSql, new RegExp(item.seatId));
    assert.equal(listFallbackPacksByOwner(item.owner).length, 1);
  }

  assert.ok(getFallbackProfile("adgapar"));
  assert.ok(getFallbackProfile("minebotcoin"));
  assert.ok(getFallbackProfile("dennisonbertram"));
  assert.ok(getFallbackProfile("adamlowisz"));
  assert.ok(getFallbackProfile("chasemc67"));
  assert.equal(getFallbackProfile("MineBotcoin"), null);
  assert.equal(getFallbackProfile("AdamLowisz"), null);
  assert.equal(getFallbackPack("examples", "stencil"), null);

  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url): url is string => Boolean(url));
  const uniqueFallbackUrls = new Set(fallbackUrls);
  assert.equal(fallbackUrls.length, 166);
  assert.equal(uniqueFallbackUrls.size, 166);

  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  const seedUrls = new Set(seedUrlMatches);
  for (const url of uniqueFallbackUrls) {
    assert.ok(seedUrls.has(url), `seed missing ${url}`);
  }
  for (const url of expected.map((item) => item.url)) {
    assert.equal(
      fallbackUrls.filter((item) => item === url).length,
      1,
      `catalog should include ${url} exactly once`
    );
    assert.equal(
      seedUrlMatches.filter((item) => item === url).length,
      1,
      `seed should include ${url} exactly once`
    );
  }
});

test("catalog watch adds Andrew AvatarMaker, Scott Cookie Monster, and 14 more packs", () => {
  const expected = [
    {
      owner: "Andrew51786",
      slug: "andrew",
      name: "Andrew",
      desk: "AvatarMaker",
      url: "https://x.ai/bot/EfBhh8nwpuGD0XNfl0eBI",
      seatId: "20000000-0000-0000-0000-000000000126",
      packId: "10000000-0000-0000-0000-000000000109",
      topic: "media",
      avatar: null as string | null,
      job: /matching square avatars/i,
      seats: 1,
    },
    {
      owner: "SEOAgent_",
      slug: "seoagent",
      name: "SEOAgent",
      desk: "SEOAgent",
      url: "https://x.ai/bot/scYgD9jdFhooaSHihRzy7",
      seatId: "20000000-0000-0000-0000-000000000127",
      packId: "10000000-0000-0000-0000-000000000110",
      topic: "developer",
      avatar: null,
      job: /autonomous SEO engineer/i,
      seats: 1,
    },
    {
      owner: "AhuraDeus",
      slug: "ahura",
      name: "Ahura",
      desk: "Steve J",
      url: "https://x.ai/bot/cuEYUcYmz-497oKWVfWX2",
      seatId: "20000000-0000-0000-0000-000000000128",
      packId: "10000000-0000-0000-0000-000000000111",
      topic: "founder",
      avatar: null,
      job: /Quality-bar CEO/i,
      seats: 1,
    },
    {
      owner: "richsilver",
      slug: "rich",
      name: "Rich",
      desk: "Flora",
      url: "https://x.ai/bot/HC7kphHSxDzb639YlmI6O",
      seatId: "20000000-0000-0000-0000-000000000129",
      packId: "10000000-0000-0000-0000-000000000112",
      topic: "founder",
      avatar: "https://avatars.githubusercontent.com/u/139979523?v=4",
      job: /houseplant care log/i,
      seats: 1,
    },
    {
      owner: "KdJadeja911",
      slug: "krushnasinh",
      name: "Krushnasinh",
      desk: "Demo Video",
      url: "https://x.ai/bot/htSXUJUQlVr60m9L_unBa",
      seatId: "20000000-0000-0000-0000-000000000130",
      packId: "10000000-0000-0000-0000-000000000113",
      topic: "media",
      avatar: null,
      job: /narrated 1080p product demo/i,
      seats: 1,
    },
    {
      owner: "joseamijares",
      slug: "jose",
      name: "Jose",
      desk: "Harry Dry",
      url: "https://x.ai/bot/tr-3hPrAG7_LeSzKZ5_vu",
      seatId: "20000000-0000-0000-0000-000000000131",
      packId: "10000000-0000-0000-0000-000000000114",
      topic: "media",
      avatar: "https://avatars.githubusercontent.com/u/6046480?v=4",
      job: /copy chief trained on Harry Dry/i,
      seats: 1,
    },
    {
      owner: "maxjean__",
      slug: "max",
      name: "Max",
      desk: "Usage Auditor",
      url: "https://x.ai/bot/M5vd5Dp9Et4EZQ3Ik3Hn2",
      seatId: "20000000-0000-0000-0000-000000000132",
      packId: "10000000-0000-0000-0000-000000000115",
      topic: "developer",
      avatar: null,
      job: /weekly usage auditor/i,
      seats: 1,
    },
    {
      owner: "tylernishida",
      slug: "tyler",
      name: "Tyler",
      desk: "Fantasy GM",
      url: "https://x.ai/bot/vmQChAUGO26cUDqdSqYlH",
      seatId: "20000000-0000-0000-0000-000000000133",
      packId: "10000000-0000-0000-0000-000000000116",
      topic: "founder",
      avatar: "https://avatars.githubusercontent.com/u/49229588?v=4",
      job: /fantasy football GM/i,
      seats: 1,
    },
    {
      owner: "gambrill",
      slug: "dave",
      name: "Dave",
      desk: "Pain in the Task",
      url: "https://x.ai/bot/yztAMds3EQ2J5OjG_tBgw",
      seatId: "20000000-0000-0000-0000-000000000134",
      packId: "10000000-0000-0000-0000-000000000117",
      topic: "founder",
      avatar: "https://avatars.githubusercontent.com/u/80799824?v=4",
      job: /repetitive work/i,
      seats: 1,
    },
    {
      owner: "old-pgmrs-will",
      slug: "will",
      name: "Will",
      desk: "Grok VM maintenance",
      url: "https://x.ai/bot/9UZp5k0Fp0LYmkyos5swQ",
      seatId: "20000000-0000-0000-0000-000000000135",
      packId: "10000000-0000-0000-0000-000000000118",
      topic: "developer",
      avatar: "https://avatars.githubusercontent.com/u/102408514?v=4",
      job: /Linux VM maintenance/i,
      seats: 1,
    },
    {
      owner: "m_check1B",
      slug: "matej",
      name: "Matej",
      desk: "TOP G",
      url: "https://x.ai/bot/0fYZ_kKkiXNbLn_KBD3f3",
      seatId: "20000000-0000-0000-0000-000000000136",
      packId: "10000000-0000-0000-0000-000000000119",
      topic: "developer",
      avatar: null,
      job: /Jack-land development partner/i,
      seats: 1,
    },
    {
      owner: "majdkaid",
      slug: "majd",
      name: "Majd",
      desk: "Zeus",
      url: "https://x.ai/bot/ehQNQQR9apvhVcmxFiFyP",
      seatId: "20000000-0000-0000-0000-000000000137",
      packId: "10000000-0000-0000-0000-000000000120",
      topic: "founder",
      avatar: "https://avatars.githubusercontent.com/u/65400078?v=4",
      job: /single HQ chat/i,
      seats: 1,
    },
    {
      owner: "MGallmur",
      slug: "mauricio",
      name: "Mauricio",
      desk: "Hermes SDR",
      url: "https://x.ai/bot/EAlUWK8yH_xfsBcpdu7e_",
      seatId: "20000000-0000-0000-0000-000000000138",
      packId: "10000000-0000-0000-0000-000000000121",
      topic: "founder",
      avatar: null,
      job: /outbound SDR/i,
      seats: 1,
    },
    {
      owner: "MarcusRamsey",
      slug: "marcus",
      name: "Marcus",
      desk: "Dan Patrick",
      url: "https://x.ai/bot/hlQhxsU-pqQEkimm0it4V",
      seatId: "20000000-0000-0000-0000-000000000142",
      packId: "10000000-0000-0000-0000-000000000123",
      topic: "media",
      avatar: "https://avatars.githubusercontent.com/u/3101699?v=4",
      job: /SportsCenter-style scores/i,
      seats: 1,
    },
  ] as const;

  for (const item of expected) {
    const pack = getFallbackPack(item.owner, item.slug);
    assert.ok(pack, `${item.owner}/${item.slug}`);
    assert.equal(pack.id, item.packId);
    assert.equal(pack.name, item.name);
    assert.equal(pack.official, false);
    assert.equal(pack.featured, false);
    assert.equal(pack.githubUrl, null);
    assert.deepEqual(pack.topics, [item.topic]);
    assert.equal(pack.likesCount, 0);
    assert.equal(pack.installsCount, 0);
    assert.equal(pack.visitsCount, 0);
    assert.equal(pack.seats.length, item.seats);
    assert.equal(pack.seats[0]?.name, item.desk);
    assert.equal(pack.seats[0]?.isDesk, true);
    assert.equal(pack.seats[0]?.sortOrder, 0);
    assert.equal(pack.seats[0]?.id, item.seatId);
    assert.equal(pack.seats[0]?.grokTemplateUrl, item.url);
    assert.equal(parseGrokTemplateUrl(pack.seats[0]?.grokTemplateUrl), item.url);
    assert.match(pack.seats[0]?.job ?? "", item.job);
    assert.equal(pack.owner.avatarUrl, item.avatar);
    assert.match(seedSql, new RegExp(item.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(seedSql, new RegExp(item.packId));
    assert.match(seedSql, new RegExp(item.seatId));
    assert.equal(listFallbackPacksByOwner(item.owner).length, 1);
  }

  const zach = getFallbackPack("zachmllr", "zach");
  assert.ok(zach);
  assert.equal(zach.id, "10000000-0000-0000-0000-000000000122");
  assert.equal(zach.official, false);
  assert.equal(zach.featured, false);
  assert.deepEqual(zach.topics, ["founder"]);
  assert.deepEqual(
    zach.seats.map((item) => ({
      id: item.id,
      name: item.name,
      isDesk: item.isDesk,
      sortOrder: item.sortOrder,
      grokTemplateUrl: item.grokTemplateUrl,
    })),
    [
      {
        id: "20000000-0000-0000-0000-000000000139",
        name: "Errol",
        isDesk: true,
        sortOrder: 0,
        grokTemplateUrl: "https://x.ai/bot/mQoLg90Pj5Cn2Gso4AkoQ",
      },
      {
        id: "20000000-0000-0000-0000-000000000140",
        name: "Collins",
        isDesk: false,
        sortOrder: 1,
        grokTemplateUrl: "https://x.ai/bot/D6lddHs6lfM0k7Cj3P6j3",
      },
      {
        id: "20000000-0000-0000-0000-000000000141",
        name: "Keach",
        isDesk: false,
        sortOrder: 2,
        grokTemplateUrl: "https://x.ai/bot/sAxCT93K8i7gwctmtAroD",
      },
    ]
  );
  assert.match(zach.routingRule, /Errol/);
  assert.match(zach.routingRule, /Collins only for Hercules Collins catechism drills/);
  assert.match(zach.routingRule, /Keach only for Keach's Baptist Catechism drills/);
  assert.match(zach.seats[0]?.job ?? "", /Catechism for Boys and Girls/);
  assert.match(zach.seats[1]?.job ?? "", /Orthodox Catechism/);
  assert.match(zach.seats[2]?.job ?? "", /Baptist Catechism/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/mQoLg90Pj5Cn2Gso4AkoQ/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/D6lddHs6lfM0k7Cj3P6j3/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/sAxCT93K8i7gwctmtAroD/);
  assert.equal(listFallbackPacksByOwner("zachmllr").length, 1);

  assert.ok(getFallbackProfile("Andrew51786"));
  assert.ok(getFallbackProfile("SEOAgent_"));
  assert.ok(getFallbackProfile("old-pgmrs-will"));
  assert.ok(getFallbackProfile("MarcusRamsey"));
  assert.equal(getFallbackProfile("old_pgmrs_will"), null);
  assert.equal(getFallbackProfile("marcusramsey"), null);
  assert.equal(getFallbackPack("examples", "stencil"), null);
  assert.ok(!listFallbackPacks().some((pack) => pack.owner.githubLogin === "examples"));

  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url): url is string => Boolean(url));
  const uniqueFallbackUrls = new Set(fallbackUrls);
  assert.equal(fallbackUrls.length, 166);
  assert.equal(uniqueFallbackUrls.size, 166);

  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  const seedUrls = new Set(seedUrlMatches);
  for (const url of uniqueFallbackUrls) {
    assert.ok(seedUrls.has(url), `seed missing ${url}`);
  }
  const newUrls = [
    ...expected.map((item) => item.url),
    "https://x.ai/bot/55t0IuxxlT7BWffNVOKai",
    "https://x.ai/bot/mQoLg90Pj5Cn2Gso4AkoQ",
    "https://x.ai/bot/D6lddHs6lfM0k7Cj3P6j3",
    "https://x.ai/bot/sAxCT93K8i7gwctmtAroD",
  ];
  for (const url of newUrls) {
    assert.equal(
      fallbackUrls.filter((item) => item === url).length,
      1,
      `catalog should include ${url} exactly once`
    );
    assert.equal(
      seedUrlMatches.filter((item) => item === url).length,
      1,
      `seed should include ${url} exactly once`
    );
  }
});

test("catalog adds ten unofficial packs plus Lauren tinkabot", () => {
  const expected = [
    {
      owner: "RustamAtuev",
      slug: "rustam",
      name: "Rustam",
      desk: "Repo Engineer",
      url: "https://x.ai/bot/iXfxVelc85rIxgZ9hLeXD",
      seatId: "20000000-0000-0000-0000-000000000143",
      packId: "10000000-0000-0000-0000-000000000124",
      topic: "developer",
      avatar: "https://avatars.githubusercontent.com/u/288767497?v=4" as string | null,
      job: /manager-facing engineer bot/i,
      seats: 1,
    },
    {
      owner: "dankillenberger",
      slug: "daniel",
      name: "Daniel",
      desk: "Forge",
      url: "https://x.ai/bot/7GgZtqkhyLzKKMNUa7dhd",
      seatId: "20000000-0000-0000-0000-000000000144",
      packId: "10000000-0000-0000-0000-000000000125",
      topic: "developer",
      avatar: null,
      job: /Factory manager for flow-next specs/i,
      seats: 1,
    },
    {
      owner: "suddenlyjon",
      slug: "knock",
      name: "Knock",
      desk: "Token Accountant",
      url: "https://x.ai/bot/zdnVIfLkNmRwZqqogojuc",
      seatId: "20000000-0000-0000-0000-000000000145",
      packId: "10000000-0000-0000-0000-000000000126",
      topic: "founder",
      avatar: null,
      job: /Cursor spending dashboard/i,
      seats: 4,
    },
    {
      owner: "joepro",
      slug: "joseph",
      name: "Joseph",
      desk: "MadMax Mode",
      url: "https://x.ai/bot/pTe8gpPc_5SuwKkEszn18",
      seatId: "20000000-0000-0000-0000-000000000147",
      packId: "10000000-0000-0000-0000-000000000127",
      topic: "founder",
      avatar: "https://avatars.githubusercontent.com/u/1109367?v=4",
      job: /Grok Bot inventor/i,
      seats: 1,
    },
    {
      owner: "zeuuss_01",
      slug: "zeus",
      name: "ZEU$",
      desk: "Scout",
      url: "https://x.ai/bot/ywADCWWZP0Bcq6bOeQpGt",
      seatId: "20000000-0000-0000-0000-000000000148",
      packId: "10000000-0000-0000-0000-000000000128",
      topic: "media",
      avatar: null,
      job: /Weekly client research packs/i,
      seats: 5,
    },
    {
      owner: "useprismnetwork",
      slug: "prism",
      name: "Prism",
      desk: "Private Desk",
      url: "https://x.ai/bot/Tgl3sxrTsuAYL7MN8S3UT",
      seatId: "20000000-0000-0000-0000-000000000149",
      packId: "10000000-0000-0000-0000-000000000129",
      topic: "founder",
      avatar: null,
      job: /confidential GPU enclaves/i,
      seats: 1,
    },
    {
      owner: "haseebmir91",
      slug: "haseeb",
      name: "Haseeb",
      desk: "Poteto-style Chief of Staff",
      url: "https://x.ai/bot/Nk-vzuWqTvqSed-G8-Za5",
      seatId: "20000000-0000-0000-0000-000000000150",
      packId: "10000000-0000-0000-0000-000000000130",
      topic: "founder",
      avatar: null,
      job: /runs a small Grok Bot team the way @poteto recommends/i,
      seats: 3,
    },
    {
      owner: "ryangbsystems",
      slug: "ryan",
      name: "Ryan",
      desk: "Maskoff",
      url: "https://x.ai/bot/39x_3B9P5HBl-MpK1xGzP",
      seatId: "20000000-0000-0000-0000-000000000153",
      packId: "10000000-0000-0000-0000-000000000131",
      topic: "media",
      avatar: null,
      job: /Defensive briefings on X accounts/i,
      seats: 1,
    },
    {
      owner: "MaheshtheDev",
      slug: "mahesh",
      name: "Mahesh",
      desk: "Memento",
      url: "https://x.ai/bot/_xZZE41svJdcq2w6ZWJan",
      seatId: "20000000-0000-0000-0000-000000000154",
      packId: "10000000-0000-0000-0000-000000000132",
      topic: "founder",
      avatar: "https://avatars.githubusercontent.com/u/38828053?v=4",
      job: /Second-brain coworker/i,
      seats: 1,
    },
    {
      owner: "jaybuidl",
      slug: "jaybuidl",
      name: "jaybuidl",
      desk: "Grokleros",
      url: "https://x.ai/bot/vsCDaIn2Od_BkfWp0Vehm",
      seatId: "20000000-0000-0000-0000-000000000155",
      packId: "10000000-0000-0000-0000-000000000133",
      topic: "developer",
      avatar: "https://avatars.githubusercontent.com/u/22213980?v=4",
      job: /Kleros V2 juror/i,
      seats: 1,
    },
    {
      owner: "andreleibovici",
      slug: "andre",
      name: "Andre",
      desk: "Engineering QA",
      url: "https://x.ai/bot/b2tS8BNj8BhoQNDcB081S",
      seatId: "20000000-0000-0000-0000-000000000161",
      packId: "10000000-0000-0000-0000-000000000134",
      topic: "developer",
      avatar: null,
      job: /pull-request quality gates/i,
      seats: 1,
    },
    {
      owner: "randywhitepdx",
      slug: "randy",
      name: "Randall",
      desk: "Lite Intel Fetch",
      url: "https://x.ai/bot/FQRA5tERWsasaQGIZmBl_",
      seatId: "20000000-0000-0000-0000-000000000162",
      packId: "10000000-0000-0000-0000-000000000135",
      topic: "founder",
      avatar: null,
      job: /buy_intel_pack \$5 HTTP 402/i,
      seats: 1,
    },
    {
      owner: "pohlipit",
      slug: "pete",
      name: "Pete",
      desk: "Zettelkasten",
      url: "https://x.ai/bot/35ZO_vGqk_ch51C9qPX1c",
      seatId: "20000000-0000-0000-0000-000000000163",
      packId: "10000000-0000-0000-0000-000000000136",
      topic: "founder",
      avatar: "https://avatars.githubusercontent.com/u/1668364?v=4",
      job: /Obsidian vault/i,
      seats: 1,
    },
    {
      owner: "akshaybhopani",
      slug: "akshay",
      name: "Akshay",
      desk: "My Krishna",
      url: "https://x.ai/bot/Mf2MLqJRCmz8sSjFmYedG",
      seatId: "20000000-0000-0000-0000-000000000166",
      packId: "10000000-0000-0000-0000-000000000137",
      topic: "media",
      avatar: "https://avatars.githubusercontent.com/u/28391021?v=4",
      job: /first person from the Gita/i,
      seats: 1,
    },
  ] as const;

  for (const item of expected) {
    const pack = getFallbackPack(item.owner, item.slug);
    assert.ok(pack, `${item.owner}/${item.slug}`);
    assert.equal(pack.id, item.packId);
    assert.equal(pack.name, item.name);
    assert.equal(pack.official, false);
    assert.equal(pack.featured, false);
    assert.equal(pack.githubUrl, null);
    assert.deepEqual(pack.topics, [item.topic]);
    assert.equal(pack.likesCount, 0);
    assert.equal(pack.installsCount, 0);
    assert.equal(pack.visitsCount, 0);
    assert.equal(pack.seats.length, item.seats);
    assert.equal(pack.seats[0]?.name, item.desk);
    assert.equal(pack.seats[0]?.isDesk, true);
    assert.equal(pack.seats[0]?.sortOrder, 0);
    assert.equal(pack.seats[0]?.id, item.seatId);
    assert.equal(pack.seats[0]?.grokTemplateUrl, item.url);
    assert.equal(parseGrokTemplateUrl(pack.seats[0]?.grokTemplateUrl), item.url);
    assert.match(pack.seats[0]?.job ?? "", item.job);
    assert.equal(pack.owner.avatarUrl, item.avatar);
    assert.match(seedSql, new RegExp(item.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(seedSql, new RegExp(item.packId));
    assert.match(seedSql, new RegExp(item.seatId));
    assert.equal(listFallbackPacksByOwner(item.owner).length, 1);
  }

  const knock = getFallbackPack("suddenlyjon", "knock");
  assert.ok(knock);
  assert.deepEqual(
    knock.seats.map((item) => ({
      id: item.id,
      name: item.name,
      isDesk: item.isDesk,
      sortOrder: item.sortOrder,
      grokTemplateUrl: item.grokTemplateUrl,
    })),
    [
      {
        id: "20000000-0000-0000-0000-000000000145",
        name: "Token Accountant",
        isDesk: true,
        sortOrder: 0,
        grokTemplateUrl: "https://x.ai/bot/zdnVIfLkNmRwZqqogojuc",
      },
      {
        id: "20000000-0000-0000-0000-000000000146",
        name: "Code Red",
        isDesk: false,
        sortOrder: 1,
        grokTemplateUrl: "https://x.ai/bot/4y3jlvwxFNqcP76eJgpuD",
      },
      {
        id: "20000000-0000-0000-0000-000000000164",
        name: "Likeness",
        isDesk: false,
        sortOrder: 2,
        grokTemplateUrl: "https://x.ai/bot/-h0DhS9ty87dr0UGXLjDD",
      },
      {
        id: "20000000-0000-0000-0000-000000000165",
        name: "Dead Man's Bot",
        isDesk: false,
        sortOrder: 3,
        grokTemplateUrl: "https://x.ai/bot/XCaz2bKzsJ4J1DmkaYyc4",
      },
    ]
  );
  assert.match(knock.routingRule, /Token Accountant/);
  assert.match(knock.routingRule, /Code Red only for the kill-switch/);
  assert.match(knock.routingRule, /Likeness only for named-person or animal stills and clips/);
  assert.match(knock.routingRule, /Dead Man's Bot only for the dead-man's switch/);
  assert.match(knock.readmeMd ?? "", /Box Inspector/);
  assert.match(knock.readmeMd ?? "", /4 Panez/);
  assert.match(knock.seats[2]?.job ?? "", /Imagine stills and clips keep looking like them/);
  assert.match(knock.seats[3]?.job ?? "", /does not start armed/);

  const haseeb = getFallbackPack("haseebmir91", "haseeb");
  assert.ok(haseeb);
  assert.deepEqual(
    haseeb.seats.map((item) => ({
      id: item.id,
      name: item.name,
      isDesk: item.isDesk,
      sortOrder: item.sortOrder,
      grokTemplateUrl: item.grokTemplateUrl,
    })),
    [
      {
        id: "20000000-0000-0000-0000-000000000150",
        name: "Poteto-style Chief of Staff",
        isDesk: true,
        sortOrder: 0,
        grokTemplateUrl: "https://x.ai/bot/Nk-vzuWqTvqSed-G8-Za5",
      },
      {
        id: "20000000-0000-0000-0000-000000000151",
        name: "Daily Easy Apply Digest",
        isDesk: false,
        sortOrder: 1,
        grokTemplateUrl: "https://x.ai/bot/uVNOsoe-iWf4ZOUdfgo5R",
      },
      {
        id: "20000000-0000-0000-0000-000000000152",
        name: "Easy Apply Queue",
        isDesk: false,
        sortOrder: 2,
        grokTemplateUrl: "https://x.ai/bot/5RXN9P3CxnIIwgcmvVWEp",
      },
    ]
  );

  const zeus = getFallbackPack("zeuuss_01", "zeus");
  assert.ok(zeus);
  assert.deepEqual(
    zeus.seats.map((item) => ({
      id: item.id,
      name: item.name,
      isDesk: item.isDesk,
      sortOrder: item.sortOrder,
      grokTemplateUrl: item.grokTemplateUrl,
    })),
    [
      {
        id: "20000000-0000-0000-0000-000000000148",
        name: "Scout",
        isDesk: true,
        sortOrder: 0,
        grokTemplateUrl: "https://x.ai/bot/ywADCWWZP0Bcq6bOeQpGt",
      },
      {
        id: "20000000-0000-0000-0000-000000000156",
        name: "Writer",
        isDesk: false,
        sortOrder: 1,
        grokTemplateUrl: "https://x.ai/bot/38UdPemBuZb9USs_0HAES",
      },
      {
        id: "20000000-0000-0000-0000-000000000158",
        name: "Art",
        isDesk: false,
        sortOrder: 2,
        grokTemplateUrl: "https://x.ai/bot/yE1-m0X2okSxFsvjScxy0",
      },
      {
        id: "20000000-0000-0000-0000-000000000159",
        name: "Editor",
        isDesk: false,
        sortOrder: 3,
        grokTemplateUrl: "https://x.ai/bot/wxFNc5b_yBkJraLqZXvI7",
      },
      {
        id: "20000000-0000-0000-0000-000000000160",
        name: "Desk",
        isDesk: false,
        sortOrder: 4,
        grokTemplateUrl: "https://x.ai/bot/WdQtoljjNUJ_-mX6B6SRL",
      },
    ]
  );
  assert.match(zeus.routingRule, /Writer only for studio copy/);
  assert.match(zeus.routingRule, /Art only for on-brand visuals/);
  assert.match(zeus.routingRule, /Editor only for the quality gate/);
  assert.match(zeus.routingRule, /Desk only for calendar, client pack, and weekly report/);
  assert.match(zeus.seats[1]?.job ?? "", /never publishes or sends work out/);
  assert.match(zeus.seats[2]?.job ?? "", /on-brand visuals/);
  assert.match(zeus.seats[3]?.job ?? "", /quality gate/);
  assert.match(zeus.seats[4]?.job ?? "", /weekly calendar/);

  const marc = getFallbackPack("MSaintjour", "marc");
  assert.ok(marc);
  assert.equal(marc.seats.length, 1);
  assert.equal(marc.seats[0]?.name, "Copay Compass");
  assert.equal(marc.seats[0]?.isDesk, true);
  assert.ok(!marc.seats.some((item) => item.name === "Medical Bill Review"));
  assert.ok(!marc.seats.some((item) => item.grokTemplateUrl === "https://x.ai/bot/M9c2tC_-mwY8XNTmSbkUY"));

  const joseph = getFallbackPack("joepro", "joseph");
  assert.ok(joseph);
  assert.equal(joseph.seats.length, 1);
  assert.ok(!joseph.seats.some((item) => item.grokTemplateUrl === "https://x.ai/bot/5hqR_5PVUy7WMbNaXPJ8s"));

  const lauren = getFallbackPack("poteto", "lauren");
  assert.ok(lauren);
  assert.equal(lauren.seats.length, 2);
  assert.equal(lauren.seats[0]?.name, "Dr Eggbot");
  assert.equal(lauren.seats[0]?.isDesk, true);
  assert.equal(lauren.seats[1]?.name, "tinkabot");
  assert.equal(lauren.seats[1]?.isDesk, false);
  assert.equal(lauren.seats[1]?.grokTemplateUrl, "https://x.ai/bot/br5f3C4mc75QCMEHaszXd");
  assert.match(lauren.routingRule, /tinkabot only for wrapping an API/);
  assert.match(lauren.readmeMd ?? "", /Do not add Box Inspector or Point peddler/);
  assert.ok(!lauren.seats.some((item) => /peddler/i.test(item.name)));
  assert.ok(!lauren.seats.some((item) => /box inspector/i.test(item.name)));

  assert.ok(getFallbackProfile("RustamAtuev"));
  assert.ok(getFallbackProfile("dankillenberger"));
  assert.ok(getFallbackProfile("suddenlyjon"));
  assert.ok(getFallbackProfile("joepro"));
  assert.ok(getFallbackProfile("zeuuss_01"));
  assert.ok(getFallbackProfile("useprismnetwork"));
  assert.ok(getFallbackProfile("haseebmir91"));
  assert.ok(getFallbackProfile("ryangbsystems"));
  assert.ok(getFallbackProfile("MaheshtheDev"));
  assert.ok(getFallbackProfile("jaybuidl"));
  assert.ok(getFallbackProfile("andreleibovici"));
  assert.ok(getFallbackProfile("randywhitepdx"));
  assert.ok(getFallbackProfile("pohlipit"));
  assert.ok(getFallbackProfile("akshaybhopani"));
  assert.equal(getFallbackProfile("RandyWhitePDX"), null);
  assert.equal(getFallbackProfile("rustamatuev"), null);
  assert.equal(getFallbackProfile("mahesh"), null);
  assert.equal(getFallbackPack("examples", "stencil"), null);
  assert.ok(!listFallbackPacks().some((pack) => pack.owner.githubLogin === "examples"));

  const skipped = [
    "https://x.ai/bot/ny02y0VWgzWSSFlXgpWVZ",
    "https://x.ai/bot/vYIAB3Z6V8gEERewymcw1",
    "https://x.ai/bot/UWNGpcghM9H79JCb4of5Q",
    "https://x.ai/bot/Z0Faxo9DTX0KL7j7OHTWJ",
    "https://x.ai/bot/3n26nkAkMjk5EZcKJlo9w",
    "https://x.ai/bot/Abz5txK3unOkm5ZxCGGX-",
    "https://x.ai/bot/5hqR_5PVUy7WMbNaXPJ8s",
    "https://x.ai/bot/dep-tU0gmIPgiqNsvS4N4",
    "https://x.ai/bot/M9c2tC_-mwY8XNTmSbkUY",
    "https://x.ai/bot/NuFI0dF9FgvO8FfMPHKzx",
    "https://x.ai/bot/-CjM4_uRs6sEGdfZfC5gv",
  ];
  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url): url is string => Boolean(url));
  const uniqueFallbackUrls = new Set(fallbackUrls);
  assert.equal(fallbackUrls.length, 166);
  assert.equal(uniqueFallbackUrls.size, 166);
  for (const url of skipped) {
    assert.ok(!uniqueFallbackUrls.has(url), `catalog should skip ${url}`);
    assert.ok(!seedSql.includes(url), `seed should skip ${url}`);
  }

  const addedUrls = [
    ...expected.map((item) => item.url),
    "https://x.ai/bot/4y3jlvwxFNqcP76eJgpuD",
    "https://x.ai/bot/uVNOsoe-iWf4ZOUdfgo5R",
    "https://x.ai/bot/5RXN9P3CxnIIwgcmvVWEp",
    "https://x.ai/bot/br5f3C4mc75QCMEHaszXd",
    "https://x.ai/bot/38UdPemBuZb9USs_0HAES",
    "https://x.ai/bot/yE1-m0X2okSxFsvjScxy0",
    "https://x.ai/bot/wxFNc5b_yBkJraLqZXvI7",
    "https://x.ai/bot/WdQtoljjNUJ_-mX6B6SRL",
    "https://x.ai/bot/-h0DhS9ty87dr0UGXLjDD",
    "https://x.ai/bot/XCaz2bKzsJ4J1DmkaYyc4",
    "https://x.ai/bot/Mf2MLqJRCmz8sSjFmYedG",
  ];
  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  for (const url of addedUrls) {
    assert.equal(
      fallbackUrls.filter((item) => item === url).length,
      1,
      `catalog should include ${url} exactly once`
    );
    assert.equal(
      seedUrlMatches.filter((item) => item === url).length,
      1,
      `seed should include ${url} exactly once`
    );
  }
});

