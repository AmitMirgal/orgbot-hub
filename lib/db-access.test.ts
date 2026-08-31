import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import { postgresConnectionString } from "./env-url.ts";
import { utcDay, quotaFromUsage } from "./team-quota.ts";
import {
  applyVisitCounts,
  emptyVisitCounts,
  addVisitCount,
} from "./visits-count.ts";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

function catalogPrisma(): PrismaClient | null {
  let raw: string | undefined;
  try {
    raw = readFileSync(join(ROOT, ".env.local"), "utf8").match(
      /^DATABASE_URL=(.*)$/m
    )?.[1];
  } catch {
    raw = process.env.DATABASE_URL;
  }
  const url = postgresConnectionString(raw);
  if (!url) return null;
  try {
    const host = new URL(url).hostname;
    if (host !== "127.0.0.1" && host !== "localhost") return null;
    return new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) });
  } catch {
    return null;
  }
}

const prisma = catalogPrisma();

test.after(async () => {
  await prisma?.$disconnect();
});

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
    assert.doesNotMatch(src, /\.from\(\s*["'`]/, `${rel} must not query tables`);
    assert.doesNotMatch(src, /\.rpc\(/, `${rel} must not call rpcs`);
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
  assert.match(example, /DIRECT_URL=/);
  assert.match(example, /Table CRUD goes through Prisma, not Supabase PostgREST/);
  assert.match(example, /Schema changes go through prisma migrate, not supabase/);
  assert.match(example, /Mastra memory uses DIRECT_URL/);
});

test("prisma client and mastra storage only open postgres URLs", () => {
  const prismaSrc = read("lib/prisma.ts");
  const mastraStore = read("src/mastra/storage.ts");
  const envUrl = read("lib/env-url.ts");
  assert.match(prismaSrc, /prismaPostgresUrl/);
  assert.doesNotMatch(prismaSrc, /createClient/);
  assert.match(mastraStore, /mastraPostgresUrl/);
  assert.match(mastraStore, /DIRECT_URL/);
  assert.match(envUrl, /function prismaPostgresUrl/);
  assert.match(envUrl, /function mastraPostgresUrl/);
});

test("prisma reads seeded packs when DATABASE_URL is set", async () => {
  if (!prisma) return;
  const pack = await prisma.pack.findFirst({
    where: { slug: "lauren", owner: { githubLogin: "poteto" } },
    select: { slug: true, owner: { select: { githubLogin: true } } },
  });
  assert.equal(pack?.slug, "lauren", "seeded poteto/lauren must exist in the Prisma tables");
  assert.equal(pack?.owner.githubLogin, "poteto");
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
  if (!prisma) return;
  const packId = "10000000-0000-0000-0000-000000000010";
  const ids = ["visit-persist-a", "visit-persist-b", "visit-persist-c"];
  await prisma.packVisit.deleteMany({ where: { id: { in: ids } } });
  try {
    await prisma.packVisit.createMany({
      data: [
        {
          id: ids[0],
          packId,
          packOwner: "poteto",
          packSlug: "lauren",
          source: "add_to_grok",
        },
        {
          id: ids[1],
          packId,
          packOwner: "poteto",
          packSlug: "lauren",
          source: "desk_mix",
        },
        {
          id: ids[2],
          packId,
          packOwner: "poteto",
          packSlug: "lauren",
          source: "add_to_grok",
        },
      ],
    });
    const first = await prisma.packVisit.groupBy({
      by: ["packId", "packOwner", "packSlug"],
      where: { id: { in: ids } },
      _count: { _all: true },
    });
    const second = await prisma.packVisit.groupBy({
      by: ["packId", "packOwner", "packSlug"],
      where: { id: { in: ids } },
      _count: { _all: true },
    });
    assert.equal(first.length, 1);
    assert.deepEqual(first[0], second[0]);
    assert.equal(first[0]._count._all, 3);
    const counts = emptyVisitCounts();
    addVisitCount(
      counts,
      first[0].packId,
      first[0].packOwner,
      first[0].packSlug,
      first[0]._count._all
    );
    const [overlaid] = applyVisitCounts(
      [
        {
          id: packId,
          owner: { githubLogin: "poteto" },
          slug: "lauren",
          visitsCount: 99,
        },
      ],
      counts
    );
    assert.equal(overlaid.visitsCount, 3);
  } finally {
    await prisma.packVisit.deleteMany({
      where: { id: { in: ["visit-persist-a", "visit-persist-b", "visit-persist-c"] } },
    });
  }
});

test("team chat usage stays on the UTC day after a second read", async () => {
  if (!prisma) return;
  const userId = "bbbbbbbb-cccc-dddd-eeee-ffffffffffff";
  const day = utcDay();
  await prisma.teamChatUsage.deleteMany({ where: { userId } });
  try {
    await prisma.teamChatUsage.create({
      data: { userId, day, messages: 3, tokens: 30 },
    });
    const first = await prisma.teamChatUsage.findUnique({
      where: { userId_day: { userId, day } },
    });
    const second = await prisma.teamChatUsage.findUnique({
      where: { userId_day: { userId, day } },
    });
    assert.ok(first);
    assert.deepEqual(
      { messages: first.messages, tokens: first.tokens },
      { messages: second?.messages, tokens: second?.tokens }
    );
    assert.equal(quotaFromUsage(first).remaining_messages, 17);
  } finally {
    await prisma.teamChatUsage.deleteMany({ where: { userId } });
  }
});

test("team_chat_usage meters JWT user ids that are not in auth.users", async () => {
  if (!prisma) return;
  const ghost = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const day = utcDay();
  try {
    const fk = await prisma.$queryRaw<Array<{ exists: number }>>`
      select 1 as exists from pg_constraint where conname = 'team_chat_usage_user_id_fkey'
    `;
    assert.equal(fk.length, 0, "quota rows must not FK auth.users");
    await prisma.teamChatUsage.upsert({
      where: { userId_day: { userId: ghost, day } },
      create: { userId: ghost, day, messages: 1, tokens: 12 },
      update: { messages: { increment: 1 }, tokens: { increment: 12 } },
    });
    const row = await prisma.teamChatUsage.findUnique({
      where: { userId_day: { userId: ghost, day } },
    });
    assert.ok(row);
    assert.ok(row.messages >= 1);
  } finally {
    await prisma.teamChatUsage.deleteMany({ where: { userId: ghost } });
  }
});
