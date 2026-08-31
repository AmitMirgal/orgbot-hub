import assert from "node:assert/strict";
import { test } from "node:test";
import { authCallbackUrl, safeNextPath } from "./auth-path.ts";

test("safeNextPath only allows same-origin relative paths", () => {
  assert.equal(safeNextPath("/team"), "/team");
  assert.equal(safeNextPath("/search?q=desk"), "/search?q=desk");
  assert.equal(safeNextPath("https://evil.example/team"), "/team");
  assert.equal(safeNextPath("//evil.example"), "/team");
  assert.equal(safeNextPath("/login"), "/team");
  assert.equal(safeNextPath("/login?next=/team"), "/team");
  assert.equal(safeNextPath(null, "/"), "/");
});

test("authCallbackUrl keeps the next path on the callback", () => {
  assert.equal(
    authCallbackUrl("http://127.0.0.1:43147", "/team"),
    "http://127.0.0.1:43147/auth/callback?next=%2Fteam"
  );
});
