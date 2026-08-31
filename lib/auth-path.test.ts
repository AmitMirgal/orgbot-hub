import assert from "node:assert/strict";
import { test } from "node:test";
import {
  authCallbackBounceUrl,
  authCallbackUrl,
  authRedirectOrigin,
  hasAuthReturnQuery,
  safeNextPath,
} from "./auth-path.ts";

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

test("authRedirectOrigin stays on the browser host unless it is a www/apex alias of SITE_URL", () => {
  assert.equal(
    authRedirectOrigin("https://www.orgbots.dev", "https://orgbots.dev"),
    "https://orgbots.dev"
  );
  assert.equal(
    authRedirectOrigin("https://orgbots.dev", "https://www.orgbots.dev"),
    "https://www.orgbots.dev"
  );
  assert.equal(
    authRedirectOrigin("https://www.orgbots.dev", undefined),
    "https://www.orgbots.dev"
  );
  assert.equal(
    authRedirectOrigin(
      "https://orgbots-git-preview.vercel.app",
      "https://orgbots.dev"
    ),
    "https://orgbots-git-preview.vercel.app"
  );
  assert.equal(
    authRedirectOrigin("http://127.0.0.1:43147", "http://127.0.0.1:43147"),
    "http://127.0.0.1:43147"
  );
  assert.equal(
    authRedirectOrigin("http://localhost:43147", "http://127.0.0.1:43147"),
    "http://localhost:43147"
  );
});

test("hasAuthReturnQuery accepts PKCE codes, magic-link hashes, and provider errors", () => {
  assert.equal(
    hasAuthReturnQuery(
      new URLSearchParams("code=e70545ff-309a-49e8-8a6d-7567b1b39f90")
    ),
    true
  );
  assert.equal(hasAuthReturnQuery(new URLSearchParams("token_hash=abc")), true);
  assert.equal(
    hasAuthReturnQuery(
      new URLSearchParams("error=access_denied&error_description=denied")
    ),
    true
  );
  assert.equal(hasAuthReturnQuery(new URLSearchParams("code=not-a-uuid")), false);
  assert.equal(hasAuthReturnQuery(new URLSearchParams("q=desk")), false);
});

test("authCallbackBounceUrl sends Site URL fallbacks on / to /auth/callback", () => {
  const bounced = authCallbackBounceUrl(
    new URL(
      "https://www.orgbots.dev/?code=e70545ff-309a-49e8-8a6d-7567b1b39f90"
    )
  );
  assert.equal(
    bounced?.href,
    "https://www.orgbots.dev/auth/callback?code=e70545ff-309a-49e8-8a6d-7567b1b39f90"
  );
  assert.equal(
    authCallbackBounceUrl(
      new URL(
        "https://www.orgbots.dev/auth/callback?code=e70545ff-309a-49e8-8a6d-7567b1b39f90"
      )
    ),
    null
  );
  assert.equal(
    authCallbackBounceUrl(new URL("https://www.orgbots.dev/marketplace")),
    null
  );
  assert.equal(
    authCallbackBounceUrl(new URL("https://www.orgbots.dev/?q=desk")),
    null
  );
});
