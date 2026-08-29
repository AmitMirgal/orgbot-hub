# orgbot-hub

A pack is a tiny company of named chats. Front desk plus seats with one job each. Random questions stay at the desk. Install is official Grok only.

This app is the catalog. It does not run bots, re-export them, or invent `https://x.ai/bot/…` IDs.

## Install

A public template is `https://x.ai/bot/<id>`. Preview it on x.ai. Add it in the Grok app. We never POST to Grok for you.

## Run locally

Needs pnpm 10 and Node 22. Docker is preferred for auth. Native Postgres is enough to browse the catalog.

```bash
pnpm install
```

### Catalog with Docker

```bash
export SUPABASE_AUTH_GITHUB_CLIENT_ID="${SUPABASE_AUTH_GITHUB_CLIENT_ID:-disabled}"
export SUPABASE_AUTH_GITHUB_SECRET="${SUPABASE_AUTH_GITHUB_SECRET:-disabled}"
pnpm exec supabase start
pnpm exec supabase status -o env
```

Copy `API_URL` into `NEXT_PUBLIC_SUPABASE_URL` and `ANON_KEY` into `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Put them in `.env.local`. `SUPABASE_SERVICE_ROLE_KEY` is server-only.

### Catalog without Docker

```bash
bash scripts/start-local-catalog.sh
```

That writes `.env.local` and serves the catalog at `http://127.0.0.1:54321`. GitHub sign-in returns 501 until you switch to `supabase start` with OAuth secrets.

```bash
pnpm dev
```

The app listens on `http://127.0.0.1:43147`. If those env vars are unset, the bundled seed still renders Lauren, Krista, Eric, and Nao.

## Submit

Sign in if GitHub auth is wired. Paste official `https://x.ai/bot/…` URLs plus pack metadata. Other hosts are rejected. Secrets and internal URLs are rejected.

## Seed

The featured pack is Lauren (`/poteto/lauren`). Desk is Dr Eggbot at `https://x.ai/bot/93gOz3op1UQdBdbekQFLK`. `official` is false. Krista (`/kristaletz/krista`), Eric (`/ericzakariasson/eric`), and Nao (`/naoufalelh/nao`) are also seeded, all `official` false and `featured` false. `examples/stencil/` stays in git as a blank roster example and is not in the public catalog.
