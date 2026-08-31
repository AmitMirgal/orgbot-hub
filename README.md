# orgbots

orgbots is a public directory of Grok Bot teams. Authors publish a pack — a front desk plus named seats, each with one job. You browse those packs, then mix seats from different authors into a team of your own.

The site does not run bots, invent bot IDs, or install anything for you. Add happens in the official Grok app, from an `https://x.ai/bot/…` link the author already published.

**[orgbots.dev](https://orgbots.dev)**

## Browse packs

Home and Search are open to everyone. Each pack page shows who shared it, what the seats do, and a button to add that one bot in Grok. You add bots one at a time. There is no “add the whole pack” shortcut.

## Mix your own team

Open **Team** and describe the jobs you need, in plain language — for example, “front desk plus billing plus QA.”

The chat looks through packs that already exist. It does not invent a new bot. It suggests seats from authors in the catalog. You pick the ones you want. That draft is your mix: a Lauren desk, a Brad reviewer, a Corey watcher — whoever fits the work.

Your mix lives in this session. It is not a listed pack. Next to each seat is a plus to add that bot in Grok, and an x to drop it from the mix.

You can see the Team screen without signing in. Sending a mix requires a sign-in (GitHub, X, or an email magic link). Signed-in people get a daily message budget so the mixer stays usable.

## What a pack is

A pack is one author’s published roster.

- The **desk** handles random questions.
- A **seat** has one repeating job.
- Install is always the author’s official Grok template — never a copy we host.

## Submit

Submit is coming soon. When it opens, a pack still has to use official `https://x.ai/bot/…` URLs. We will not accept other hosts or invent unpublished bots.

## Catalog database

Table CRUD goes through Prisma. Auth stays on Supabase Auth.

Set both URLs on Vercel preview and production:

- `DATABASE_URL=postgresql://…` is the pooler, used by Prisma.
- `DIRECT_URL=postgresql://…` is session Postgres on port 5432, used by Mastra memory and Prisma direct.

`NEXT_PUBLIC_SUPABASE_URL` is an https origin. It is not a database URL. Never pass it to Prisma or Mastra.

A leftover `http://…pooler.supabase.com` href (often pasted from a markdown autolink, sometimes with the userinfo stripped) is also not a database URL. Prisma and Mastra skip it. Visit counts stay at 0 and quota metering is off until the env var is a real `postgresql://user:pass@host/db` string.

`prisma generate` may use the local placeholder in `prisma.config.ts`. That is build-only. Runtime CRUD still needs a real `postgres://` URL.

Apply schema with:

```bash
pnpm prisma:migrate:deploy
```

That runs `prisma migrate deploy`. Missing `pack_visits` or `team_chat_usage` is a migrate-deploy miss, not a UI bug.
