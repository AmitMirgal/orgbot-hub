import assert from "node:assert/strict";
import { test } from "node:test";
import {
  deskStreamParams,
  teamDeskMemoryOption,
  teamDeskThreadId,
} from "./team-desk-thread.ts";

test("desk stream params pin memory to the signed-in user", () => {
  const userId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const prior = { id: "1", role: "user", parts: [{ type: "text", text: "hi" }] };
  const next = { id: "2", role: "user", parts: [{ type: "text", text: "mix" }] };
  const params = deskStreamParams(userId, {
    trigger: "submit-message",
    messages: [prior, next],
  });
  assert.deepEqual(params.memory, teamDeskMemoryOption(userId));
  assert.equal(teamDeskThreadId(userId), `team-desk:${userId}`);
  assert.deepEqual(params.messages, [next]);
});

test("desk stream params omit memory when storage cannot persist", () => {
  const userId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const next = { id: "2", role: "user", parts: [{ type: "text", text: "mix" }] };
  const params = deskStreamParams(
    userId,
    {
      trigger: "submit-message",
      messages: [next],
      memory: { thread: "forged", resource: "forged" },
    },
    false
  );
  assert.equal("memory" in params, false);
  assert.deepEqual(params.messages, [next]);
});

test("desk stream params keep regenerate history", () => {
  const userId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const messages = [
    { id: "1", role: "user", parts: [{ type: "text", text: "hi" }] },
    { id: "2", role: "assistant", parts: [{ type: "text", text: "ok" }] },
  ];
  const params = deskStreamParams(userId, {
    trigger: "regenerate-message",
    messages,
  });
  assert.deepEqual(params.messages, messages);
});
