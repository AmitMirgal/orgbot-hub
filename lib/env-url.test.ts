import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { httpUrl, isPostgresConnectionString, mastraPostgresUrl, postgresConnectionString, postgresUrl, prismaPostgresUrl, unwrapMarkdownUrl } from "./env-url.ts";

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
  const direct = "postgresql://u:p@127.0.0.1:5432/orgbots";
  const pooler =
    "postgresql://u:p@aws-0-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true";
  assert.equal(postgresUrl(leftover), leftover);
  assert.equal(isPostgresConnectionString(leftover), false);
  assert.equal(postgresConnectionString(leftover), undefined);
  assert.equal(mastraPostgresUrl(leftover), undefined);
  assert.equal(mastraPostgresUrl(direct), direct);
  assert.equal(
    postgresConnectionString(leftover) ?? postgresConnectionString(direct),
    direct
  );
  assert.equal(
    postgresConnectionString(direct) ?? postgresConnectionString(pooler),
    direct
  );
  const prismaUrl = prismaPostgresUrl();
  if (prismaUrl) assert.equal(isPostgresConnectionString(prismaUrl), true);
});

test("mastra prefers DIRECT_URL; prisma prefers DATABASE_URL; leftover hrefs fall through", () => {
  const prevDirect = process.env.DIRECT_URL;
  const prevDb = process.env.DATABASE_URL;
  const leftover =
    "http://aws-0-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true";
  const direct = "postgresql://u:p@127.0.0.1:5432/orgbots";
  const pooler =
    "postgresql://u:p@aws-0-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true";
  try {
    process.env.DIRECT_URL = direct;
    process.env.DATABASE_URL = pooler;
    assert.equal(mastraPostgresUrl(), direct);
    assert.equal(prismaPostgresUrl(), pooler);

    process.env.DATABASE_URL = leftover;
    assert.equal(mastraPostgresUrl(), direct);
    assert.equal(prismaPostgresUrl(), direct);

    process.env.DIRECT_URL = leftover;
    process.env.DATABASE_URL = leftover;
    assert.equal(mastraPostgresUrl(), undefined);
    assert.equal(prismaPostgresUrl(), undefined);
  } finally {
    if (prevDirect === undefined) delete process.env.DIRECT_URL;
    else process.env.DIRECT_URL = prevDirect;
    if (prevDb === undefined) delete process.env.DATABASE_URL;
    else process.env.DATABASE_URL = prevDb;
  }
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
  assert.match(prisma, /prismaPostgresUrl/);
  assert.doesNotMatch(prisma, /createClient/);
  assert.match(config, /postgresConnectionString\(process\.env\.DATABASE_URL\)/);
  assert.match(config, /postgresConnectionString\(process\.env\.DIRECT_URL\)/);
  const mastraStore = readFileSync(
    fileURLToPath(new URL("../src/mastra/storage.ts", import.meta.url)),
    "utf8"
  );
  const envUrl = readFileSync(fileURLToPath(new URL("./env-url.ts", import.meta.url)), "utf8");
  assert.match(mastraStore, /mastraPostgresUrl/);
  assert.match(mastraStore, /DIRECT_URL/);
  assert.match(envUrl, /process\.env\.DIRECT_URL/);
  assert.match(envUrl, /function prismaPostgresUrl/);
});
