#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PGREST_DIR="$ROOT/.local/postgrest"
PGREST_BIN="$PGREST_DIR/postgrest"
JWT_SECRET='{"alg":"HS256","kty":"oct","k":"c3VwZXItc2VjcmV0LWp3dC10b2tlbi13aXRoLWF0LWxlYXN0LTMyLWNoYXJhY3RlcnMtbG9uZw"}'
ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiaWF0IjoxNjQxNzY5MjAwLCJleHAiOjE5Mzg0MzU2MDB9.64vQF5Dd1lKFd_hIhS1XkQnmbLIweg-dVk6E_a2wNZE"
SERVICE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJpYXQiOjE2NDE3NjkyMDAsImV4cCI6MTkzODQzNTYwMH0.-hgMHjkQm4dJ59gt-kEZIpxWUIElFclJAO4KK5H3UrU"

sudo pg_ctlcluster 16 main start >/dev/null 2>&1 || true

sudo -u postgres psql -v ON_ERROR_STOP=1 <<'SQL'
select 'ok';
SQL

if ! sudo -u postgres psql -tAc "select 1 from pg_database where datname='orgbots'" | grep -q 1; then
  sudo -u postgres createdb orgbots
fi

sudo -u postgres psql -d orgbots -v ON_ERROR_STOP=1 -f "$ROOT/supabase/stub-auth.sql"

if ! sudo -u postgres psql -d orgbots -tAc "select 1 from information_schema.tables where table_schema='public' and table_name='packs'" | grep -q 1; then
  sudo -u postgres psql -d orgbots -v ON_ERROR_STOP=1 -f "$ROOT/supabase/migrations/20260828021918_catalog.sql"
fi

if ! sudo -u postgres psql -d orgbots -tAc "select 1 from information_schema.columns where table_schema='public' and table_name='seats' and column_name='grok_template_url'" | grep -q 1; then
  sudo -u postgres psql -d orgbots -v ON_ERROR_STOP=1 -f "$ROOT/supabase/migrations/20260829065540_pack_first.sql"
fi

if ! sudo -u postgres psql -d orgbots -tAc "select 1 from information_schema.tables where table_schema='public' and table_name='pack_visits'" | grep -q 1; then
  sudo -u postgres psql -d orgbots -v ON_ERROR_STOP=1 -f "$ROOT/supabase/migrations/20260830114800_pack_visits.sql"
fi

if sudo -u postgres psql -d orgbots -tAc "select data_type from information_schema.columns where table_schema='public' and table_name='pack_visits' and column_name='source'" | grep -qx text; then
  sudo -u postgres psql -d orgbots -v ON_ERROR_STOP=1 -f "$ROOT/supabase/migrations/20260830145609_pack_visits_visit_source.sql"
fi

if ! sudo -u postgres psql -d orgbots -tAc "select 1 from information_schema.tables where table_schema='public' and table_name='team_chat_usage'" | grep -q 1; then
  sudo -u postgres psql -d orgbots -v ON_ERROR_STOP=1 -f "$ROOT/supabase/migrations/20260831053203_team_chat_usage.sql"
fi

sudo -u postgres psql -d orgbots -v ON_ERROR_STOP=1 -f "$ROOT/supabase/migrations/20260831184500_team_chat_usage_server_owned.sql"

sudo -u postgres psql -d orgbots -v ON_ERROR_STOP=1 -f "$ROOT/supabase/migrations/20260831192000_pack_visits_server_owned.sql"

sudo -u postgres psql -d orgbots -v ON_ERROR_STOP=1 -f "$ROOT/supabase/seed.sql"

sudo -u postgres psql -d orgbots -v ON_ERROR_STOP=1 <<'SQL'
grant connect on database orgbots to authenticator, anon, authenticated, service_role;
SQL

sudo -u postgres psql -d orgbots -v ON_ERROR_STOP=1 <<'SQL'
alter user postgres with password 'postgres';
grant usage on schema public to anon, authenticated, service_role;
grant select on all tables in schema public to anon, authenticated, service_role;
grant insert, update, delete on public.packs to authenticated;
grant insert, update, delete on public.seats to authenticated;
grant insert, delete on public.likes to authenticated;
grant insert, update on public.profiles to authenticated;
grant usage, select on all sequences in schema public to anon, authenticated, service_role;
grant execute on function public.increment_clones(uuid) to anon, authenticated;
grant execute on function public.increment_installs(uuid) to anon, authenticated;
alter default privileges in schema public grant select on tables to anon, authenticated, service_role;
SQL

mkdir -p "$PGREST_DIR"
if [ ! -x "$PGREST_BIN" ]; then
  curl -fsSL "https://github.com/PostgREST/postgrest/releases/download/v14.17/postgrest-v14.17-linux-static-x86-64.tar.xz" \
    | tar -xJ -C "$PGREST_DIR"
fi

cat > "$ROOT/.env.local" <<EOF
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=$ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=$SERVICE_KEY
NEXT_PUBLIC_SITE_URL=http://127.0.0.1:43147
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/orgbots
DIRECT_URL=postgresql://postgres:postgres@127.0.0.1:5432/orgbots
EOF

(cd "$ROOT" && corepack pnpm exec prisma generate)

pkill -f "$PGREST_BIN" 2>/dev/null || true
pkill -f "scripts/catalog-proxy.mjs" 2>/dev/null || true
sleep 0.4

nohup env \
  PGRST_DB_URI="postgres://authenticator:postgres@127.0.0.1:5432/orgbots" \
  PGRST_DB_SCHEMAS="public" \
  PGRST_DB_ANON_ROLE="anon" \
  PGRST_JWT_SECRET="$JWT_SECRET" \
  PGRST_JWT_AUD="authenticated" \
  PGRST_SERVER_PORT="54324" \
  PGRST_SERVER_HOST="127.0.0.1" \
  "$PGREST_BIN" >"$PGREST_DIR/postgrest.log" 2>&1 &
echo $! > "$PGREST_DIR/postgrest.pid"

nohup node "$ROOT/scripts/catalog-proxy.mjs" >"$PGREST_DIR/proxy.log" 2>&1 &
echo $! > "$PGREST_DIR/proxy.pid"

for _ in $(seq 1 40); do
  if curl -sf "http://127.0.0.1:54321/rest/v1/packs?select=slug" \
    -H "apikey: $ANON_KEY" \
    -H "Authorization: Bearer $ANON_KEY" >/dev/null; then
    echo "Catalog API http://127.0.0.1:54321"
    exit 0
  fi
  sleep 0.3
done
echo "Catalog API failed to start. See $PGREST_DIR/postgrest.log and $PGREST_DIR/proxy.log"
exit 1
