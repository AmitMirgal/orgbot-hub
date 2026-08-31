import assert from "node:assert/strict";
import { test } from "node:test";
import { isAuthSessionCookie } from "./supabase/auth-cookie.ts";

test("isAuthSessionCookie matches chunked session cookies only", () => {
  assert.equal(isAuthSessionCookie("sb-abc-auth-token"), true);
  assert.equal(isAuthSessionCookie("sb-abc-auth-token.0"), true);
  assert.equal(isAuthSessionCookie("sb-abc-auth-token.1"), true);
  assert.equal(isAuthSessionCookie("sb-abc-auth-token-code-verifier"), false);
  assert.equal(
    isAuthSessionCookie("sb-abc-auth-token-flow-xyz-code-verifier"),
    false
  );
});
