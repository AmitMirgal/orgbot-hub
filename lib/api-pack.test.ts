import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { getFallbackPack } from "./fallback-catalog.ts";
import {
  assertNoInstallsCount,
  seatsFromPacks,
  toPublicPack,
  visitsLabel,
} from "./api-pack.ts";
import {
  addVisitCount,
  applyVisitCounts,
  emptyVisitCounts,
} from "./visits-count.ts";

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

test("seats serializer omits invalid grokTemplateUrl", () => {
  const lauren = getFallbackPack("poteto", "lauren");
  const krista = getFallbackPack("kristaletz", "krista");
  assert.ok(lauren);
  assert.ok(krista);
  const broken = {
    ...lauren,
    seats: [
      ...lauren.seats,
      {
        id: "seat-invalid",
        name: "Ghost",
        job: "Should be omitted",
        repeatsWhen: null,
        isDesk: false,
        sortOrder: 9,
        grokTemplateUrl: "https://example.com/bot/nope",
      },
    ],
  };
  const seats = seatsFromPacks([broken, krista]);
  assert.ok(seats.every((seat) => seat.grokTemplateUrl.startsWith("https://x.ai/bot/")));
  assert.ok(seats.every((seat) => seat.grokTemplateUrl !== null));
  assert.equal(
    seats.some((seat) => seat.id === "seat-invalid"),
    false
  );
  assert.ok(seats.some((seat) => seat.pack.owner === "poteto"));
  assert.ok(seats.some((seat) => seat.pack.owner === "kristaletz"));
  assert.ok(seats.some((seat) => seat.author.xHandle === "poteto"));
  assert.ok(seats.some((seat) => seat.author.githubLogin === "kristaletz"));
});

test("card visits come from pack_visits owner/slug counts", () => {
  const lauren = getFallbackPack("poteto", "lauren");
  assert.ok(lauren);
  const counts = emptyVisitCounts();
  addVisitCount(counts, lauren.id, "poteto", "lauren", 3);
  const [overlaid] = applyVisitCounts([{ ...lauren, visitsCount: 0 }], counts);
  assert.equal(overlaid.visitsCount, 3);
});

test("prisma pack_visits uses enum, timestamptz, and named indexes", () => {
  const schema = readFileSync(
    fileURLToPath(new URL("../prisma/schema.prisma", import.meta.url)),
    "utf8"
  );
  const store = readFileSync(
    fileURLToPath(new URL("./visits-store.ts", import.meta.url)),
    "utf8"
  );
  const visits = readFileSync(
    fileURLToPath(new URL("./visits.ts", import.meta.url)),
    "utf8"
  );
  assert.match(schema, /enum VisitSource/);
  assert.match(schema, /@db\.Timestamptz/);
  assert.match(schema, /pack_visits_pack_id_idx/);
  assert.match(schema, /pack_visits_owner_slug_idx/);
  assert.match(schema, /@@map\("visit_source"\)/);
  assert.match(schema, /model Profile/);
  assert.match(schema, /model Pack/);
  assert.match(schema, /model Seat/);
  assert.match(schema, /model Like/);
  assert.match(store, /packVisit\.groupBy/);
  assert.doesNotMatch(store, /createClient/);
  assert.doesNotMatch(store, /\.from\(/);
  assert.match(visits, /from "@\/generated\/prisma\/enums"/);
});

test("visitsLabel formats visits, never installs", () => {
  assert.equal(visitsLabel(0), "0 visits");
  assert.equal(visitsLabel(12), "12 visits");
  assert.equal(visitsLabel(Number.NaN), "0 visits");
  assert.doesNotMatch(visitsLabel(Number.NaN), /NaN/);
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
  assert.match(src, /source = "add_to_grok"/);
  assert.match(src, /recordVisit\(packId, owner, slug, source/);
  assert.doesNotMatch(src, /onCopy[\s\S]*recordVisit/);
});

test("pack filters are one row, not two All groups", () => {
  const src = readFileSync(
    fileURLToPath(new URL("../components/filter-chips.tsx", import.meta.url)),
    "utf8"
  );
  assert.match(src, /aria-label="Filter packs"/);
  assert.match(src, /label="All"/);
  assert.match(src, /label="Featured"/);
  assert.doesNotMatch(src, /All topics/);
  assert.doesNotMatch(src, /All packs/);
});

test("author profile card is an X identity card", () => {
  const src = readFileSync(
    fileURLToPath(new URL("../components/author-profile-card.tsx", import.meta.url)),
    "utf8"
  );
  assert.match(src, /network="x"/);
  assert.match(src, /authorHref/);
  assert.match(src, /authorAvatarSrc/);
  assert.match(src, /publicXHandle/);
});

test("home lists packs and does not embed chat", () => {
  const src = readFileSync(
    fileURLToPath(new URL("../app/page.tsx", import.meta.url)),
    "utf8"
  );
  assert.match(src, /HeroBanner/);
  assert.doesNotMatch(src, /CatalogChat/);
  assert.doesNotMatch(src, /HomeCatalogChat/);
  assert.doesNotMatch(src, /getSessionUserId/);
  assert.doesNotMatch(src, /redirect\("\/login/);
});

test("catalog chat uses shadcn Message, Bubble, and Streamdown", () => {
  const src = readFileSync(
    fileURLToPath(new URL("../components/catalog-chat.tsx", import.meta.url)),
    "utf8"
  );
  assert.match(src, /title = "Chat"/);
  assert.match(src, /role="log"/);
  assert.match(src, /Send message/);
  assert.match(src, /from "@\/components\/ui\/message"/);
  assert.match(src, /from "@\/components\/ui\/bubble"/);
  assert.match(src, /from "@\/components\/ui\/input-group"/);
  assert.match(src, /MessageScroller/);
  assert.match(src, /ChatTranscript/);
  assert.match(src, /InputGroupTextarea/);
  assert.match(src, /surface = "card"/);
  assert.match(src, /desk_mix/);
  assert.match(src, /ChatMarkdown/);
  assert.match(src, /<Bubble variant="default"/);
  assert.match(src, /variant="secondary"/);
  assert.match(src, /AuthorProfileCard/);
  assert.match(src, /authorsFromSeats/);
  assert.match(src, /CatalogThreadMessage/);
  assert.match(src, /Nothing matched in the catalog/);
  assert.match(src, /The mix did not go through/);
  assert.doesNotMatch(src, /<Bubble variant="ghost"/);
  assert.doesNotMatch(src, /Ask the catalog/);
});

test("catalog chat lets MessageScroller own overflow", () => {
  const scroller = readFileSync(
    fileURLToPath(new URL("../components/ui/message-scroller.tsx", import.meta.url)),
    "utf8"
  );
  const chat = readFileSync(
    fileURLToPath(new URL("../components/catalog-chat.tsx", import.meta.url)),
    "utf8"
  );
  const preview = readFileSync(
    fileURLToPath(new URL("../components/chat-thread-preview.tsx", import.meta.url)),
    "utf8"
  );
  assert.match(scroller, /\[&::-webkit-scrollbar\]:hidden/);
  assert.doesNotMatch(scroller, /scrollbar-thin/);
  assert.match(chat, /overflow-x-hidden/);
  assert.match(chat, /h-\[calc\(100dvh-3\.5rem\)\]/);
  assert.match(chat, /scrollAnchor=\{isUser\}/);
  assert.doesNotMatch(chat, /from "@\/components\/ui\/scroll-area"/);
  assert.doesNotMatch(chat, /<ScrollArea/);
  assert.doesNotMatch(chat, /overflow-visible/);
  assert.doesNotMatch(chat, /scrollIntoView/);
  assert.doesNotMatch(preview, /from "@\/components\/ui\/scroll-area"/);
  assert.doesNotMatch(preview, /overflow-visible/);
});

test("dark theme lifts agent bubble off the card", () => {
  const src = readFileSync(
    fileURLToPath(new URL("../app/globals.css", import.meta.url)),
    "utf8"
  );
  assert.match(src, /--secondary: oklch\(0\.38/);
  assert.match(src, /streamdown\/dist\/\*\.js/);
});

test("home keyword search links to Describe a team", () => {
  const src = readFileSync(
    fileURLToPath(new URL("../components/search-hero.tsx", import.meta.url)),
    "utf8"
  );
  assert.match(src, /Describe a team/);
  assert.match(src, /href="\/team"/);
  assert.doesNotMatch(src, /href="\/search"/);
});

test("home hero uses particle text instead of the halftone banner", () => {
  const page = readFileSync(fileURLToPath(new URL("../app/page.tsx", import.meta.url)), "utf8");
  const hero = readFileSync(
    fileURLToPath(new URL("../components/hero-banner.tsx", import.meta.url)),
    "utf8"
  );
  assert.match(page, /HeroBanner/);
  assert.doesNotMatch(page, /HeroCopy/);
  assert.doesNotMatch(page, /SearchHero/);
  assert.match(hero, /ParticleText/);
  assert.match(hero, /SearchHero/);
  assert.match(hero, /AuthorMarquee/);
  assert.match(page, /topAuthors/);
  assert.doesNotMatch(hero, /HalftoneReveal/);
});

test("search is catalog browse and team is the chat builder", () => {
  const search = readFileSync(
    fileURLToPath(new URL("../app/search/page.tsx", import.meta.url)),
    "utf8"
  );
  const team = readFileSync(
    fileURLToPath(new URL("../app/team/page.tsx", import.meta.url)),
    "utf8"
  );
  const header = readFileSync(
    fileURLToPath(new URL("../components/site-header.tsx", import.meta.url)),
    "utf8"
  );
  const chat = readFileSync(
    fileURLToPath(new URL("../components/catalog-chat.tsx", import.meta.url)),
    "utf8"
  );
  assert.match(search, /CatalogBrowse/);
  assert.doesNotMatch(search, /CatalogChat/);
  assert.match(team, /surface="page"/);
  assert.match(team, /authors=\{authors\}/);
  assert.match(team, /topAuthors/);
  assert.match(team, /api="\/api\/v1\/agent\/search"/);
  assert.doesNotMatch(team, /CatalogBrowse/);
  assert.doesNotMatch(team, /PackGrid/);
  assert.doesNotMatch(team, /HeroBanner/);
  assert.match(header, /href: "\/team", label: "Team"/);
  assert.match(header, /AuthNav/);
  const authNav = readFileSync(
    fileURLToPath(new URL("../components/auth-nav.tsx", import.meta.url)),
    "utf8"
  );
  assert.match(authNav, /from "@\/components\/ui\/dropdown-menu"/);
  assert.match(authNav, /DropdownMenuTrigger/);
  assert.match(authNav, /account menu/);
  assert.match(authNav, /variant="destructive"/);
  assert.match(authNav, /requestSubmit/);
  assert.doesNotMatch(authNav, /flex items-center gap-2/);
  assert.doesNotMatch(team, /redirect\("\/login\?next=\/team"\)/);
  assert.match(team, /signedIn=\{signedIn\}/);
  assert.match(team, /readTeamChatQuotaForUser/);
  assert.doesNotMatch(team, /from "@\/lib\/team-chat"/);
  assert.match(chat, /Sign in to mix a team/);
  assert.match(chat, /login\?next=\/team/);
  assert.match(chat, /quotaMeterText/);
  assert.match(chat, /Mix \(/);
  assert.match(chat, /Your mix/);
  assert.match(chat, /from "@\/components\/ui\/sheet"/);
  assert.match(chat, /AuthorMarquee/);
  const marquee = readFileSync(
    fileURLToPath(new URL("../components/author-marquee.tsx", import.meta.url)),
    "utf8"
  );
  assert.match(marquee, /from "@\/components\/ui\/marquee"/);
  assert.match(marquee, /sm:max-w-lg md:max-w-xl/);
});

test("team mixer requires auth and consumes daily quota before the model", () => {
  const login = readFileSync(
    fileURLToPath(new URL("../components/login-form.tsx", import.meta.url)),
    "utf8"
  );
  const callback = readFileSync(
    fileURLToPath(new URL("../app/auth/callback/route.ts", import.meta.url)),
    "utf8"
  );
  const proxy = readFileSync(
    fileURLToPath(new URL("../proxy.ts", import.meta.url)),
    "utf8"
  );
  const search = readFileSync(
    fileURLToPath(new URL("../app/api/v1/agent/search/route.ts", import.meta.url)),
    "utf8"
  );
  const teamChat = readFileSync(
    fileURLToPath(new URL("./team-chat.ts", import.meta.url)),
    "utf8"
  );
  const schema = readFileSync(
    fileURLToPath(new URL("../prisma/schema.prisma", import.meta.url)),
    "utf8"
  );
  const store = readFileSync(
    fileURLToPath(new URL("./team-quota-store.ts", import.meta.url)),
    "utf8"
  );
  const catalog = readFileSync(
    fileURLToPath(new URL("./catalog.ts", import.meta.url)),
    "utf8"
  );
  const actions = readFileSync(
    fileURLToPath(new URL("./actions.ts", import.meta.url)),
    "utf8"
  );
  assert.match(login, /oauth\("github"\)/);
  assert.match(login, /oauth\("x"\)/);
  assert.match(login, /signInWithOAuth/);
  assert.match(login, /signInWithOtp/);
  assert.doesNotMatch(login, /password|forgot/i);
  assert.match(callback, /\/login/);
  assert.match(callback, /error/);
  assert.match(callback, /exchangeCodeForSession/);
  assert.match(callback, /createRouteHandlerClient/);
  assert.doesNotMatch(callback, /\/\?auth=error/);
  assert.match(callback, /verifyOtp/);
  assert.match(proxy, /authCallbackBounceUrl/);
  assert.doesNotMatch(proxy, /path === "\/team"/);
  assert.match(search, /streamTeamDesk/);
  assert.match(teamChat, /getSessionUserId/);
  assert.match(teamChat, /consumeTeamChatTurn/);
  assert.match(teamChat, /refundTeamChatTurn/);
  assert.doesNotMatch(teamChat, /quota_unavailable/);
  assert.doesNotMatch(teamChat, /\.rpc\(/);
  assert.match(store, /prisma\.teamChatUsage/);
  assert.doesNotMatch(store, /\$transaction/);
  assert.match(schema, /model TeamChatUsage/);
  assert.match(store, /return emptyTeamChatQuota\(\);/);
  assert.match(catalog, /prisma\.pack/);
  assert.doesNotMatch(catalog, /createClient/);
  assert.doesNotMatch(catalog, /\.from\(/);
  assert.doesNotMatch(catalog, /\.rpc\(/);
  assert.match(actions, /prisma\.packVisit\.create/);
  assert.doesNotMatch(actions, /createClient/);
  assert.doesNotMatch(actions, /\.rpc\(/);
  assert.doesNotMatch(actions, /\.from\(/);
});

test("submit page keeps the agent chat and marks it coming soon", () => {
  const page = readFileSync(
    fileURLToPath(new URL("../app/submit/page.tsx", import.meta.url)),
    "utf8"
  );
  const panel = readFileSync(
    fileURLToPath(new URL("../components/submit-agent-panel.tsx", import.meta.url)),
    "utf8"
  );
  const route = readFileSync(
    fileURLToPath(new URL("../app/api/v1/agent/submit/route.ts", import.meta.url)),
    "utf8"
  );
  assert.match(page, /SubmitAgentPanel/);
  assert.match(page, /Coming soon/);
  assert.doesNotMatch(page, /SubmitForm/);
  assert.match(panel, /api="\/api\/v1\/agent\/submit"/);
  assert.match(panel, /comingSoon/);
  assert.match(route, /Submit is coming soon/);
});

test("dev chat thread preview is hidden in production", () => {
  const src = readFileSync(
    fileURLToPath(new URL("../app/internal/chat-thread/page.tsx", import.meta.url)),
    "utf8"
  );
  assert.match(src, /NODE_ENV === "production"/);
  assert.match(src, /notFound/);
  assert.match(src, /ChatThreadPreview/);
  assert.match(src, /tool-searchSeats/);
});

test("dev account menu preview is hidden in production", () => {
  const src = readFileSync(
    fileURLToPath(new URL("../app/internal/account-menu/page.tsx", import.meta.url)),
    "utf8"
  );
  assert.match(src, /NODE_ENV === "production"/);
  assert.match(src, /notFound/);
  assert.match(src, /AuthNav/);
  assert.match(src, /Account menu preview/);
});

test("pack page and mix add one bot at a time", () => {
  const pack = readFileSync(
    fileURLToPath(new URL("../app/[owner]/[slug]/page.tsx", import.meta.url)),
    "utf8"
  );
  const mix = readFileSync(
    fileURLToPath(new URL("../components/team-mix.tsx", import.meta.url)),
    "utf8"
  );
  const chat = readFileSync(
    fileURLToPath(new URL("../components/catalog-chat.tsx", import.meta.url)),
    "utf8"
  );
  assert.doesNotMatch(pack, /AddEveryBot/);
  assert.doesNotMatch(pack, /Add every bot/);
  assert.doesNotMatch(mix, /Add to Grok/);
  assert.doesNotMatch(mix, /Add all/);
  assert.match(mix, /PlusIcon/);
  assert.match(mix, /Add \$\{seat\.name\} to Grok/);
  assert.doesNotMatch(chat, /Add all/);
});
