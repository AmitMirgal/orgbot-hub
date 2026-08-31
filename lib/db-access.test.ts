import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

const PRISMA_CRUD_FILES = [
  "lib/catalog.ts",
  "lib/actions.ts",
  "lib/visits-store.ts",
  "lib/team-quota-store.ts",
] as const;

const SUPABASE_CLIENT_FILES = [
  "lib/supabase/client.ts",
  "lib/supabase/server.ts",
  "lib/supabase/route-client.ts",
  "lib/supabase/proxy.ts",
  "components/login-form.tsx",
  "app/auth/callback/route.ts",
  "app/auth/sign-out/route.ts",
] as const;

const TABLE_CRUD =
  /\.from\(\s*["'](packs|seats|profiles|likes|pack_visits|team_chat_usage)["']/;
const RPC_CRUD =
  /\.rpc\(\s*["'](increment_installs|increment_clones|team_chat_quota|consume_team_chat_turn|refund_team_chat_turn)["']/;
const PRISMA_MODEL =
  /prisma\.(pack|seat|profile|like|packVisit|teamChatUsage)\b/;

const SKIP_DIRS = new Set([
  "node_modules",
  ".next",
  "generated",
  ".local",
  ".git",
  "coverage",
  "out",
  "build",
]);

function listSourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...listSourceFiles(path));
      continue;
    }
    if (!/\.(ts|tsx|js|mjs)$/.test(entry.name)) continue;
    if (/\.test\.(ts|tsx|js)$/.test(entry.name)) continue;
    out.push(relative(ROOT, path));
  }
  return out.sort();
}

function read(rel: string): string {
  return readFileSync(join(ROOT, rel), "utf8");
}

function crudHits(src: string): string[] {
  const hits: string[] = [];
  const table = src.match(TABLE_CRUD);
  if (table) hits.push(`from(${table[1]})`);
  const rpc = src.match(RPC_CRUD);
  if (rpc) hits.push(`rpc(${rpc[1]})`);
  return hits;
}

test("prisma files own table CRUD and never use the supabase client for it", () => {
  for (const rel of PRISMA_CRUD_FILES) {
    const src = read(rel);
    assert.match(src, PRISMA_MODEL, `${rel} must query through prisma`);
    assert.doesNotMatch(src, /createClient/, `${rel} must not construct a supabase client`);
    assert.equal(crudHits(src).join(","), "", `${rel} must not call supabase table CRUD`);
  }
});

test("supabase client files exist for auth and never touch catalog tables", () => {
  for (const rel of SUPABASE_CLIENT_FILES) {
    const src = read(rel);
    assert.match(
      src,
      /createBrowserClient|createServerClient|createClient|createRouteHandlerClient/,
      `${rel} is the supabase auth client`
    );
    assert.equal(crudHits(src).join(","), "", `${rel} must stay auth-only`);
    assert.doesNotMatch(src, PRISMA_MODEL, `${rel} must not mix prisma table calls`);
  }
});

test("no other app file uses supabase-js for table CRUD", () => {
  const files = listSourceFiles(ROOT);
  const offenders: string[] = [];
  for (const rel of files) {
    const hits = crudHits(read(rel));
    if (hits.length === 0) continue;
    offenders.push(`${rel}: ${hits.join(", ")}`);
  }
  assert.equal(offenders.join("\n"), "", offenders.join("\n"));
  for (const rel of [...PRISMA_CRUD_FILES, ...SUPABASE_CLIENT_FILES]) {
    assert.ok(files.includes(rel), `${rel} must still exist`);
  }
});

test("local catalog start points Prisma at Postgres", () => {
  const start = read("scripts/start-local-catalog.sh");
  const example = read(".env.example");
  assert.match(start, /DATABASE_URL=postgresql:\/\/postgres:postgres@127\.0\.0\.1:5432\/orgbots/);
  assert.match(start, /pack_visits\.sql/);
  assert.match(start, /team_chat_usage\.sql/);
  assert.match(start, /pack_visits_server_owned\.sql/);
  assert.match(start, /team_chat_usage_server_owned\.sql/);
  assert.match(example, /DATABASE_URL=/);
  assert.match(example, /Schema changes go through prisma migrate, not supabase/);
});

test("prisma reads seeded packs when DATABASE_URL is set", async () => {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) return;
  const pg = await import("pg");
  const Client = pg.Client ?? pg.default.Client;
  const client = new Client({ connectionString: url });
  await client.connect();
  try {
    const { rows } = await client.query(
      `select p.slug, pr.github_login as owner
       from packs p
       join profiles pr on pr.id = p.owner_id
       where pr.github_login = 'poteto' and p.slug = 'lauren'`
    );
    assert.equal(rows.length, 1, "seeded poteto/lauren must exist in the Prisma tables");
  } finally {
    await client.end();
  }
});

test("pack_visits is server-owned so Prisma can count visits", () => {
  const sql = read("supabase/migrations/20260831192000_pack_visits_server_owned.sql");
  const prismaSql = read(
    "prisma/migrations/20260831192000_pack_visits_server_owned/migration.sql"
  );
  assert.match(sql, /disable row level security/i);
  assert.match(sql, /no force row level security/i);
  assert.match(prismaSql, /DISABLE ROW LEVEL SECURITY/);
  assert.match(prismaSql, /NO FORCE ROW LEVEL SECURITY/);
});

test("pack visits stay on a second read", async () => {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) return;
  const { withVisitCounts } = await import("./visits-store.ts");
  const pg = await import("pg");
  const Client = pg.Client ?? pg.default.Client;
  const client = new Client({ connectionString: url });
  await client.connect();
  const packId = "10000000-0000-0000-0000-000000000010";
  try {
    const rls = await client.query(
      `select c.relforcerowsecurity
       from pg_class c
       join pg_namespace n on n.oid = c.relnamespace
       where n.nspname = 'public' and c.relname = 'pack_visits'`
    );
    assert.equal(rls.rows[0]?.relforcerowsecurity, false);
    await client.query(
      `delete from pack_visits where pack_owner = 'poteto' and pack_slug = 'lauren'`
    );
    await client.query(
      `insert into pack_visits (id, pack_id, pack_owner, pack_slug, source)
       values ($1, $2, 'poteto', 'lauren', 'add_to_grok'),
              ($3, $2, 'poteto', 'lauren', 'desk_mix'),
              ($4, $2, 'poteto', 'lauren', 'add_to_grok')`,
      [`visit-persist-a`, packId, `visit-persist-b`, `visit-persist-c`]
    );
    const first = await client.query(
      `select count(*)::int as n from pack_visits where pack_owner = 'poteto' and pack_slug = 'lauren'`
    );
    const second = await client.query(
      `select count(*)::int as n from pack_visits where pack_owner = 'poteto' and pack_slug = 'lauren'`
    );
    assert.equal(first.rows[0].n, 3);
    assert.equal(second.rows[0].n, 3);
    const [overlaid] = await withVisitCounts([
      {
        id: packId,
        owner: { githubLogin: "poteto" },
        slug: "lauren",
        visitsCount: 99,
      },
    ]);
    assert.equal(overlaid.visitsCount, 3);
  } finally {
    await client.query(`delete from pack_visits where id like 'visit-persist-%'`);
    await client.end();
  }
});

test("team chat usage stays on the UTC day after a second read", async () => {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) return;
  const { utcDayKey, quotaFromUsage } = await import("./team-quota.ts");
  const pg = await import("pg");
  const Client = pg.Client ?? pg.default.Client;
  const client = new Client({ connectionString: url });
  await client.connect();
  const userId = "bbbbbbbb-cccc-dddd-eeee-ffffffffffff";
  const day = utcDayKey();
  try {
    await client.query(`delete from team_chat_usage where user_id = $1`, [userId]);
    await client.query(
      `insert into team_chat_usage (user_id, day, messages, tokens)
       values ($1, $2::date, 3, 30)`,
      [userId, day]
    );
    const first = await client.query(
      `select messages, tokens from team_chat_usage
       where user_id = $1 and day = $2::date`,
      [userId, day]
    );
    const second = await client.query(
      `select messages, tokens from team_chat_usage
       where user_id = $1 and day = $2::date`,
      [userId, day]
    );
    assert.equal(first.rows.length, 1);
    assert.deepEqual(first.rows[0], second.rows[0]);
    assert.equal(quotaFromUsage(first.rows[0]).remaining_messages, 17);
  } finally {
    await client.query(`delete from team_chat_usage where user_id = $1`, [userId]);
    await client.end();
  }
});

test("team_chat_usage meters JWT user ids that are not in auth.users", async () => {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) return;
  const pg = await import("pg");
  const Client = pg.Client ?? pg.default.Client;
  const client = new Client({ connectionString: url });
  await client.connect();
  const ghost = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  try {
    const fk = await client.query(
      `select 1 from pg_constraint where conname = 'team_chat_usage_user_id_fkey'`
    );
    assert.equal(fk.rowCount, 0, "quota rows must not FK auth.users");
    await client.query(
      `insert into team_chat_usage (user_id, day, messages, tokens)
       values ($1, (timezone('utc', now()))::date, 1, 12)
       on conflict (user_id, day) do update
       set messages = team_chat_usage.messages + 1,
           tokens = team_chat_usage.tokens + 12`,
      [ghost]
    );
    const { rows } = await client.query(
      `select messages, tokens from team_chat_usage
       where user_id = $1 and day = (timezone('utc', now()))::date`,
      [ghost]
    );
    assert.equal(rows.length, 1);
    assert.ok(rows[0].messages >= 1);
  } finally {
    await client.query(`delete from team_chat_usage where user_id = $1`, [ghost]);
    await client.end();
  }
});
