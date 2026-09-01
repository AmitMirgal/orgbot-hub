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

test("catalog includes existing packs plus the new verified shares", () => {
  const stats = fallbackStats();
  assert.equal(stats.packs, 88);
  assert.equal(stats.seats, 110);
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
