# orgbots

An open directory of org-bot packs. A pack is a roster. Front desk plus named seats. Git is the source of truth. This app is the catalog.

It is not a skill store, a model hub, or a chatbot host.

## Pack format

A cloned repo looks like this.

```
orgbots.yaml
README.md
seats/<slug>.md
```

`orgbots.yaml` names the desk and the seats. Random questions stay at the desk. A seat exists when the same job keeps coming back.

See `examples/` for three seeded packs. Founder desk. Clinic QA. Empty stencil.

## Run locally

Needs pnpm 10 and Node 22. Docker is preferred for auth. Native Postgres is enough to browse the catalog.

```bash
pnpm install
```

### Catalog with Docker (preferred)

```bash
export SUPABASE_AUTH_GITHUB_CLIENT_ID="${SUPABASE_AUTH_GITHUB_CLIENT_ID:-disabled}"
export SUPABASE_AUTH_GITHUB_SECRET="${SUPABASE_AUTH_GITHUB_SECRET:-disabled}"
pnpm exec supabase start
pnpm exec supabase status -o env
```

Copy `API_URL` into `NEXT_PUBLIC_SUPABASE_URL` and `ANON_KEY` into `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Put them in `.env.local`. `SUPABASE_SERVICE_ROLE_KEY` is server-only.

### Catalog without Docker

If `supabase start` cannot run, use the local PostgREST fallback. It serves the same schema and seed data.

```bash
bash scripts/start-local-catalog.sh
```

That writes `.env.local` and serves the catalog at `http://127.0.0.1:54321`. GitHub sign-in returns 501 until you switch to `supabase start` with OAuth secrets.

```bash
pnpm dev
```

The app listens on `http://127.0.0.1:43147`.

GitHub sign-in needs an OAuth app whose callback is `http://127.0.0.1:54321/auth/v1/callback`. Set `SUPABASE_AUTH_GITHUB_CLIENT_ID` and `SUPABASE_AUTH_GITHUB_SECRET` before `supabase start`. Browse and clone work without it.

## Publish

Sign in. Paste a GitHub URL that contains `orgbots.yaml`, or paste the yaml and README. The server validates the file, then upserts the catalog row. The live agents never run here.

Clone lines are copy-paste.

```
npx orgbots add owner/pack
git clone <repo>
```

## Stack

Next.js App Router. TypeScript. Tailwind. Geist. shadcn/ui. Local Supabase with RLS.
