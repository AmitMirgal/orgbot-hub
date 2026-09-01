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
  assert.equal(stats.packs, 99);
  assert.equal(stats.seats, 124);
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
  assert.equal(lauren?.seats.length, 1);
  assert.equal(lauren?.seats[0]?.name, "Dr Eggbot");
  assert.equal(lauren?.seats[0]?.grokTemplateUrl, "https://x.ai/bot/93gOz3op1UQdBdbekQFLK");
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
    ]
  );
  assert.match(scott.routingRule, /Leader 1:1 Bot/);
  assert.match(scott.routingRule, /SE call bot only for SE and sales-engineer call work/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/9wmmsO_xoeLPeGEqjWLzE/);

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
    assert.equal(pack.seats.length, 1);
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
  assert.match(marc.seats[0]?.job ?? "", /copay assistance/i);
  assert.match(marc.seats[0]?.job ?? "", /does not give medical advice/);

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
  assert.equal(fallbackUrls.length, 124);
  assert.equal(uniqueFallbackUrls.size, 124);

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

