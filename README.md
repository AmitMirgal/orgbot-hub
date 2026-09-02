# orgbots

[orgbots.dev](https://orgbots.dev) is a public directory of Grok Bot teams other people already made.

Search works if you know a pack name. Most people don't. They know the work. "I need someone for random questions, someone for billing, someone for QA."

**Team** is the easier path when you know the jobs, not the pack names. You type those jobs. A chat looks through the directory. It only suggests bots that already exist in the catalog. They can come from different authors if that fits. It does not invent a bot.

You pick. That list is your pack. It is for you. It is not published on the site.

Each pick has **Add in Grok**. The button opens the author's official `https://x.ai/bot/…` link. You add them one at a time in the Grok app. We never install them for you.

You can look at Team without signing in. Sending a mix needs GitHub, X, or email. There is a daily message limit.

## If you already know the pack

**Home** and **Search** are still here. Use them when you already know the pack. Each pack page shows who shared it, what the bots do, and **Add in Grok** for that one bot. You still add bots one at a time. There is no way to add a whole pack in one go.

## What a pack is

A pack is one author's published team.

- The **desk** handles random questions.
- A **seat** has one repeating job.
- Install is always the author's official Grok template. We do not host a copy.

## Submit

Submit is coming soon. When it opens, a pack still has to use official `https://x.ai/bot/…` URLs. We will not accept other hosts or invent unpublished bots.

## Run locally

This repo is public. You can run the site yourself.

```bash
pnpm install
pnpm dev
```

The app listens on `127.0.0.1:43147`. Runtime still needs the env below.

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
