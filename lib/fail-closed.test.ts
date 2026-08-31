import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { emptyTeamChatQuota, quotaFromUsage, quotaMeterText } from "./team-quota.ts";

function read(rel: string): string {
  return readFileSync(fileURLToPath(new URL(rel, import.meta.url)), "utf8");
}

test("streamTeamDesk fails closed when consume returns null", () => {
  const teamChat = read("./team-chat.ts");
  assert.match(teamChat, /teamDeskConsumeGate/);
  assert.match(teamChat, /catalog_unreachable/);
  assert.match(teamChat, /case "unreachable"/);
  assert.match(teamChat, /status: 503/);
  assert.doesNotMatch(teamChat, /if \(consumed && !consumed\.allowed\)/);
});

test("a missing consume must not look like an unused 20 / 20 meter", () => {
  const unused = emptyTeamChatQuota();
  assert.equal(quotaMeterText(unused), "20 / 20 left today");
  const afterOne = quotaFromUsage({ messages: 1, tokens: 8 });
  assert.equal(quotaMeterText(afterOne), "19 / 20 left today");
  assert.equal(afterOne.allowed, true);
});

test("visit refresh waits for a successful pack_visits insert", () => {
  const record = read("./visits-record.ts");
  assert.match(record, /if \(!result\.error\)/);
  assert.match(record, /router\.refresh\(\)/);
});

test("visit overlay logs Prisma failures instead of keeping installsCount", () => {
  const store = read("./visits-store.ts");
  const actions = read("./actions.ts");
  const quota = read("./team-quota-store.ts");
  assert.match(store, /logPrismaFailure/);
  assert.match(actions, /logPrismaFailure/);
  assert.match(quota, /logPrismaFailure/);
  assert.match(store, /return emptyVisitCounts\(\)/);
  assert.doesNotMatch(store, /if \(!counts\) return packs/);
});

test("assistant bubble waits for trimmed streamed text", () => {
  const chat = read("../components/catalog-chat.tsx");
  const seats = read("./chat-seats.ts");
  assert.match(seats, /catalogThreadRender/);
  assert.match(chat, /catalogThreadRender/);
  assert.doesNotMatch(chat, /const text = messageText\(parts\);/);
});

test("Mastra storage logs a missing postgres URL instead of staying silent", () => {
  const storage = read("../src/mastra/storage.ts");
  const desk = read("../src/mastra/agents/desk.ts");
  const index = read("../src/mastra/index.ts");
  assert.match(storage, /NEXT_PUBLIC_SUPABASE_URL is not a database URL/);
  assert.match(desk, /orgbotsStorage/);
  assert.match(index, /storage: orgbotsStorage/);
});
