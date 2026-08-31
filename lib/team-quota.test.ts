import assert from "node:assert/strict";
import { test } from "node:test";
import {
  TEAM_CHAT_QUOTA_HEADER,
  estimatePromptTokens,
  parseTeamChatQuota,
  quotaFromResponse,
  quotaFromUsage,
  quotaMeterText,
  serializeTeamChatQuota,
  utcDay,
  utcDayKey,
} from "./team-quota.ts";

test("quotaMeterText hides the token cap unless it blocked the turn", () => {
  const base = {
    allowed: true,
    messages: 8,
    tokens: 120,
    limit_messages: 20,
    limit_tokens: 50_000,
    remaining_messages: 12,
    remaining_tokens: 49_880,
    reset_at: "2026-09-01T00:00:00.000Z",
    token_blocked: false,
  };
  assert.equal(quotaMeterText(base), "12 / 20 left today");
  assert.equal(
    quotaMeterText({ ...base, allowed: false, remaining_messages: 0 }),
    "0 / 20 messages left today. Resets 00:00 UTC."
  );
  assert.equal(
    quotaMeterText({ ...base, allowed: false, token_blocked: true }),
    "Token limit reached today. Resets 00:00 UTC."
  );
  assert.doesNotMatch(quotaMeterText(base), /50000|50,000|50k/i);
});

test("parseTeamChatQuota marks token_blocked when messages remain", () => {
  const quota = parseTeamChatQuota({
    allowed: false,
    messages: 3,
    tokens: 50000,
    limit_messages: 20,
    limit_tokens: 50000,
    remaining_messages: 17,
    remaining_tokens: 0,
    reset_at: "2026-09-01T00:00:00+00:00",
  });
  assert.ok(quota);
  assert.equal(quota.token_blocked, true);
  assert.equal(quota.remaining_messages, 17);
});

test("quotaFromUsage ranks a Prisma usage row", () => {
  const quota = quotaFromUsage({ messages: 19, tokens: 100 }, false);
  assert.equal(quota.remaining_messages, 1);
  assert.equal(quota.allowed, false);
  assert.equal(quota.token_blocked, true);
});

test("utcDay is the UTC calendar day, not the local clock", () => {
  const from = new Date("2026-08-31T22:15:00.000-07:00");
  assert.equal(utcDayKey(from), "2026-09-01");
  assert.equal(utcDay(from).toISOString(), "2026-09-01T00:00:00.000Z");
});

test("quotaFromResponse reads the server meter header", () => {
  const quota = quotaFromUsage({ messages: 3, tokens: 40 });
  const response = new Response(null, {
    headers: { [TEAM_CHAT_QUOTA_HEADER]: serializeTeamChatQuota(quota) },
  });
  const parsed = quotaFromResponse(response);
  assert.ok(parsed);
  assert.equal(parsed.messages, 3);
  assert.equal(parsed.remaining_messages, 17);
  assert.equal(quotaFromResponse(new Response(null)), null);
});

test("estimatePromptTokens counts request text", () => {
  assert.ok(
    estimatePromptTokens({
      messages: [{ role: "user", parts: [{ type: "text", text: "a".repeat(40) }] }],
    }) >= 10
  );
});
