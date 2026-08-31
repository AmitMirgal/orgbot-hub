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
