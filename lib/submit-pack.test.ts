import assert from "node:assert/strict";
import { test } from "node:test";
import {
  ownerPackConflict,
  validateDraft,
  validateGrokUrl,
} from "./submit-draft.ts";

const desk = {
  name: "Desk",
  job: "Routes the work",
  grokTemplateUrl: "https://x.ai/bot/93gOz3op1UQdBdbekQFLK",
};

test("validateGrokUrl accepts official x.ai URLs only", () => {
  assert.equal(validateGrokUrl("https://x.ai/bot/93gOz3op1UQdBdbekQFLK").ok, true);
  assert.equal(validateGrokUrl("https://grokbot.dev/bot/93gOz3op1UQdBdbekQFLK").ok, false);
  assert.equal(validateGrokUrl("sk-live-secret").ok, false);
});

test("submit refuses non-x.ai URLs", () => {
  const result = validateDraft({
    owner: "newowner",
    name: "Clinic",
    description: "Clinic front desk",
    desk: { ...desk, grokTemplateUrl: "https://example.com/bot/nope" },
  });
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.refusal.code, "invalid_grok_url");
  }
});

test("submit refuses a second pack for the same owner", () => {
  const conflict = ownerPackConflict("poteto", [
    { owner: { githubLogin: "poteto" }, slug: "lauren" },
  ]);
  assert.ok(conflict);
  assert.equal(conflict.code, "owner_already_has_pack");
});

test("submit refuses a missing desk URL", () => {
  const result = validateDraft({
    owner: "newowner",
    name: "Clinic",
    description: "Clinic front desk",
    desk: { ...desk, grokTemplateUrl: "" },
  });
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.refusal.code, "missing_desk_url");
  }
});
