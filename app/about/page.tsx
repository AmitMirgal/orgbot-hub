import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-10">
      <section className="flex flex-col gap-2">
        <p className="text-xs font-bold tracking-[0.18em] text-muted-foreground uppercase">
          About
        </p>
        <h1 className="text-2xl font-bold tracking-tight">
          A pack of bots to run the work
        </h1>
      </section>
      <div className="flex flex-col gap-4 text-base text-muted-foreground">
        <p>
          A pack is a small roster of named Grok bots. Desk, engineer, recruiter,
          whatever the job is. You install the seats you need and they already know
          the stack, the tone, and when to hand off.
        </p>
        <p>
          One bot is a chat. A pack is how you run a startup, a studio, or a week of
          work without re-explaining the company every time. Repeat jobs become named
          seats instead of another blank prompt.
        </p>
        <p>
          That is the engineering win. A coding seat already has your conventions. A
          desk routes the messy asks. You spend time on the work, not on teaching the
          same context to a new chat.
        </p>
        <p>
          Install is official Grok only. A public template is{" "}
          <span className="font-mono text-foreground">https://x.ai/bot/…</span>
          . Preview it on x.ai, then add it in the Grok app. We never re-export a bot.
        </p>
        <p>
          Community packs are shared by other users.
        </p>
      </div>
    </main>
  );
}
