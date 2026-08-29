import assert from "node:assert/strict";
import { test } from "node:test";
import { looksLikeSecret, parseGrokTemplateUrl } from "./grok-url.ts";

test("accepts official x.ai bot URLs", () => {
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/93gOz3op1UQdBdbekQFLK"),
    "https://x.ai/bot/93gOz3op1UQdBdbekQFLK"
  );
  assert.equal(
    parseGrokTemplateUrl("https://www.x.ai/bot/s/PFD95widaEeqjkYLLUZmD/"),
    "https://x.ai/bot/s/PFD95widaEeqjkYLLUZmD"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/fcJJMM58AdXSTBdW3xWyW"),
    "https://x.ai/bot/fcJJMM58AdXSTBdW3xWyW"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/ph5mcXqVy2p176Br7BJYi"),
    "https://x.ai/bot/ph5mcXqVy2p176Br7BJYi"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/FU-Ev6_Ju4lFGWwWRD0GD"),
    "https://x.ai/bot/FU-Ev6_Ju4lFGWwWRD0GD"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/o4gWkNGmffEaVtOhaEsA7"),
    "https://x.ai/bot/o4gWkNGmffEaVtOhaEsA7"
  );
});

test("rejects unofficial or unsafe install targets", () => {
  assert.equal(parseGrokTemplateUrl("http://x.ai/bot/93gOz3op1UQdBdbekQFLK"), null);
  assert.equal(parseGrokTemplateUrl("https://grokbot.dev/bot/93gOz3op1UQdBdbekQFLK"), null);
  assert.equal(parseGrokTemplateUrl("https://x.ai/marketplace/foo"), null);
  assert.equal(parseGrokTemplateUrl("https://x.ai/bot/93gOz3op1UQdBdbekQFLK?key=1"), null);
  assert.equal(parseGrokTemplateUrl("https://user:pass@x.ai/bot/93gOz3op1UQdBdbekQFLK"), null);
  assert.equal(parseGrokTemplateUrl("https://127.0.0.1/bot/93gOz3op1UQdBdbekQFLK"), null);
});

test("rejects secret-shaped strings", () => {
  assert.equal(looksLikeSecret("sk-live-secret"), true);
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/93gOz3op1UQdBdbekQFLK#api_key=1"),
    null
  );
});
