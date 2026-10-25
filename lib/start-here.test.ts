import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { getFallbackPack } from "./fallback-catalog.ts";
import { parseGrokTemplateUrl } from "./grok-url.ts";
import {
  SAMPLE_FAKE_DATA_LABEL,
  START_PERSONAS,
  START_PERSONA_SLUGS,
  getStartPersona,
  isStartPersonaSlug,
  listStartHereCards,
  startHerePackIdentity,
} from "./start-here.ts";

function read(rel: string): string {
  return readFileSync(new URL(`../${rel}`, import.meta.url), "utf8");
}

test("Start Here personas are the five approved slugs", () => {
  assert.deepEqual(
    START_PERSONAS.map((persona) => persona.slug),
    ["parent", "realtor", "shop", "founder", "developer"]
  );
  assert.equal(START_PERSONAS[2]?.label, "Shopify shop owner");
  assert.match(START_PERSONAS[2]?.blurb ?? "", /Shopify/);
  assert.equal(getStartPersona("parent")?.title, "A parent who runs a household");
  assert.equal(getStartPersona("unknown"), null);
  assert.equal(isStartPersonaSlug("realtor"), true);
  assert.equal(isStartPersonaSlug("clinic"), false);
});

test("every Start Here URL and pack path exists in seed and fallback, and by-lines match pack owners", () => {
  const seed = read("supabase/seed.sql");
  const catalog = read("lib/fallback-catalog.ts");
  for (const { persona, card } of listStartHereCards()) {
    const url = parseGrokTemplateUrl(card.grokTemplateUrl);
    assert.equal(url, card.grokTemplateUrl, `${card.botName} URL must parse`);
    const identity = startHerePackIdentity(card.packPath);
    assert.ok(identity, `${persona.slug} ${card.botName} needs a pack path`);
    const pack = getFallbackPack(identity.owner, identity.slug);
    assert.ok(pack, `fallback missing ${identity.owner}/${identity.slug}`);
    const seat = pack.seats.find((item) => item.grokTemplateUrl === card.grokTemplateUrl);
    assert.ok(seat, `${card.botName} URL missing on ${identity.owner}/${identity.slug}`);
    assert.equal(seat.name, card.botName, `${card.botName} seat name must match`);
    assert.equal(
      pack.name,
      card.byline,
      `${card.botName} by-line must match pack owner name ${pack.name}`
    );
    assert.ok(
      pack.owner.name?.includes(card.byline) || pack.owner.githubLogin.includes(card.byline),
      `${card.botName} by-line must appear on the pack owner`
    );
    assert.ok(seed.includes(card.grokTemplateUrl), `seed missing ${card.grokTemplateUrl}`);
    assert.ok(seed.includes(pack.id), `seed missing pack ${pack.id}`);
    assert.ok(seed.includes(identity.owner), `seed missing owner ${identity.owner}`);
    assert.ok(seed.includes(`'${identity.slug}'`), `seed missing slug ${identity.slug}`);
    assert.ok(catalog.includes(card.grokTemplateUrl), `fallback missing ${card.grokTemplateUrl}`);
    assert.ok(catalog.includes(identity.owner), `fallback missing owner ${identity.owner}`);
  }
});

test("every Start Here card has a first message, safety line, and Sample, fake data label", () => {
  const cardView = read("components/start-here-card.tsx");
  const personaPage = read("app/start/[persona]/page.tsx");
  assert.match(cardView, /SAMPLE_FAKE_DATA_LABEL/);
  assert.doesNotMatch(cardView, /visitsLabel|likesCount|installsCount|visitsCount/);
  assert.doesNotMatch(personaPage, /visitsLabel|likesCount|installsCount|visitsCount|sortPacksByVisits/);
  for (const { card } of listStartHereCards()) {
    assert.ok(card.firstMessage.trim().length > 0, `${card.botName} first message`);
    assert.ok(card.safety.line.trim().length > 0, `${card.botName} safety line`);
    assert.ok(card.sample.length > 0, `${card.botName} sample`);
    assert.ok(card.sample.every((line) => line.trim().length > 0));
  }
  assert.equal(SAMPLE_FAKE_DATA_LABEL, "Sample, fake data");
  assert.match(cardView, /Sample, fake data|SAMPLE_FAKE_DATA_LABEL/);
});

test("Start Here pages show no popularity, install, like, or visit counts", () => {
  const files = [
    "app/start/page.tsx",
    "app/start/[persona]/page.tsx",
    "components/start-here-card.tsx",
    "components/start-here-section.tsx",
    "lib/start-here.ts",
  ];
  for (const rel of files) {
    const src = read(rel);
    assert.doesNotMatch(src, /visitsLabel/);
    assert.doesNotMatch(src, /likesCount/);
    assert.doesNotMatch(src, /installsCount/);
    assert.doesNotMatch(src, /visitsCount/);
    assert.doesNotMatch(src, /sortPacksByVisits/);
    assert.doesNotMatch(src, /number of installs/i);
    assert.doesNotMatch(src, /getSessionUserId/);
    assert.doesNotMatch(src, /redirect\("\/login/);
  }
});

test("each persona has at most 3 cards and fewer than 3 shows the missing note", () => {
  const page = read("app/start/[persona]/page.tsx");
  assert.match(page, /Third bot missing/);
  assert.match(page, /persona\.missing/);
  assert.match(page, /notFound/);
  assert.match(page, /generateStaticParams/);
  assert.doesNotMatch(page, /force-dynamic/);
  assert.doesNotMatch(page, /dynamicParams/);
  for (const persona of START_PERSONAS) {
    assert.ok(persona.cards.length <= 3, `${persona.slug} has more than 3 cards`);
    if (persona.cards.length < 3) {
      assert.ok(persona.missing && persona.missing.trim().length > 0, `${persona.slug} missing note`);
    } else {
      assert.equal(persona.missing, null, `${persona.slug} should not show a missing note`);
    }
  }
  const realtor = getStartPersona("realtor");
  assert.equal(realtor?.cards.length, 2);
  assert.match(
    realtor?.missing ?? "",
    /No bot in the catalog yet drafts lead follow-ups for agents and tracks showing feedback and offer or closing deadlines/
  );
});

test("Start Here Add in Grok clicks use source start_here and the persona slug", () => {
  const schema = read("prisma/schema.prisma");
  const actions = read("lib/actions.ts");
  const add = read("components/add-to-grok.tsx");
  const card = read("components/start-here-card.tsx");
  const record = read("lib/visits-record.ts");
  const capture = read("lib/visits-client.ts");
  const visits = read("lib/visits.ts");
  const supabase = read("supabase/migrations/20261025060000_pack_visits_start_here.sql");
  const prismaSql = read("prisma/migrations/20261025060000_pack_visits_start_here/migration.sql");
  assert.match(schema, /start_here/);
  assert.match(schema, /persona\s+String\?/);
  assert.match(actions, /persona: persona \?\? null/);
  assert.match(actions, /source: VisitSource = "add_to_grok"/);
  assert.match(add, /persona\?: string/);
  assert.match(add, /seatName, persona/);
  assert.match(card, /source="start_here"/);
  assert.match(card, /persona=\{persona\}/);
  assert.match(card, /Add in Grok/);
  assert.match(record, /persona: input\.persona/);
  assert.match(capture, /persona: event\.persona/);
  assert.match(visits, /persona\?: string/);
  assert.match(supabase, /add value if not exists 'start_here'/);
  assert.match(supabase, /add column if not exists persona text/);
  assert.doesNotMatch(supabase, /drop /i);
  assert.doesNotMatch(supabase, /delete from/i);
  assert.match(prismaSql, /ADD VALUE IF NOT EXISTS 'start_here'/);
  assert.match(prismaSql, /ADD COLUMN IF NOT EXISTS "persona" TEXT/);
});

test("Start Here data is hand-curated and unknown slugs 404", () => {
  const data = read("lib/start-here.ts");
  const page = read("app/start/[persona]/page.tsx");
  const home = read("app/page.tsx");
  const hero = read("components/hero-banner.tsx");
  const picker = read("app/start/page.tsx");
  const workflow = read(".github/workflows/start-here-links.yml");
  const checker = read("scripts/check-start-here-links.ts");
  assert.match(
    data,
    /v1 picks are hand-curated and reviewed in PRs, may later be reordered within a persona using click data, and unreviewed bots are never auto-added/
  );
  assert.match(page, /notFound\(\)/);
  assert.match(page, /generateStaticParams/);
  assert.deepEqual([...START_PERSONA_SLUGS], START_PERSONAS.map((persona) => persona.slug));
  assert.match(home, /StartHereSection/);
  assert.match(hero, /New to Grok Bot\? Start here\./);
  assert.match(picker, /Who are you\?/);
  assert.match(picker, /href=\{`\/start\/\$\{persona\.slug\}`\}/);
  assert.match(picker, /START_PERSONAS\.map/);
  assert.match(workflow, /cron:/);
  assert.match(workflow, /check-start-here-links\.ts/);
  assert.doesNotMatch(workflow, /git commit|git push| stefanzweifel|peter-evans/);
  assert.match(checker, /report only/);
  assert.doesNotMatch(checker, /writeFile|writeFileSync|mkdirSync/);
  assert.match(checker, /listStartHereCards/);
});
