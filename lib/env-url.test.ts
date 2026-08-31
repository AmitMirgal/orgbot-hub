import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { httpUrl, isPostgresConnectionString, mastraPostgresUrl, postgresUrl, unwrapMarkdownUrl } from "./env-url.ts";

test("unwrapMarkdownUrl restores URLs autolinked by rich-text secret pastes", () => {
  assert.equal(
    unwrapMarkdownUrl("[https://abc.supabase.co](https://abc.supabase.co)"),
    "https://abc.supabase.co"
  );
  assert.equal(
    unwrapMarkdownUrl(
      "postgresql://u:p@[aws-0-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true](http://aws-0-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true)"
    ),
    "postgresql://u:p@aws-0-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true"
  );
  assert.equal(
    unwrapMarkdownUrl("https://abc.supabase.co"),
    "https://abc.supabase.co"
  );
  assert.equal(
    unwrapMarkdownUrl("postgresql://u:p@[::1]:5432/db"),
    "postgresql://u:p@[::1]:5432/db"
  );
});

test("httpUrl only returns http(s) after unwrap", () => {
  assert.equal(
    httpUrl("[https://abc.supabase.co](https://abc.supabase.co)"),
    "https://abc.supabase.co"
  );
  assert.equal(httpUrl("postgresql://u:p@localhost/db"), undefined);
  assert.equal(httpUrl("not a url"), undefined);
});

test("postgresUrl unwraps then encodes userinfo", () => {
  assert.equal(
    postgresUrl(
      "postgresql://u:p@w@[host:6543/postgres](http://host:6543/postgres)"
    ),
    "postgresql://u:p%40w@host:6543/postgres"
  );
});

test("mastra storage ignores leftover http pooler URLs", () => {
  const leftover =
    "http://aws-0-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true";
  assert.equal(postgresUrl(leftover), leftover);
  assert.equal(isPostgresConnectionString(leftover), false);
  assert.equal(mastraPostgresUrl(leftover), undefined);
  assert.equal(
    mastraPostgresUrl("postgresql://u:p@127.0.0.1:5432/orgbots"),
    "postgresql://u:p@127.0.0.1:5432/orgbots"
  );
});

test("catalog env and prisma parse URLs at the process boundary", () => {
  const env = readFileSync(fileURLToPath(new URL("./supabase/env.ts", import.meta.url)), "utf8");
  const prisma = readFileSync(fileURLToPath(new URL("./prisma.ts", import.meta.url)), "utf8");
  const config = readFileSync(
    fileURLToPath(new URL("../prisma.config.ts", import.meta.url)),
    "utf8"
  );
  assert.match(env, /parseSupabaseUrl\(process\.env\.NEXT_PUBLIC_SUPABASE_URL\)/);
  assert.match(env, /return httpUrl\(value\)/);
  assert.match(prisma, /postgresUrl\(process\.env\.DATABASE_URL\)/);
  assert.match(config, /from "\.\/lib\/env-url"/);
});
