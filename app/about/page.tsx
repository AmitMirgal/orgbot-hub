import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-10">
      <section className="flex flex-col gap-2">
        <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
          About
        </p>
        <h1 className="text-2xl font-medium tracking-tight">This is packs</h1>
      </section>
      <div className="flex flex-col gap-4 text-base text-muted-foreground">
        <p>
          A pack is a tiny company of named chats. Front desk first. Spawn a seat
          only when the same job keeps coming back.
        </p>
        <p>
          Install is official Grok only. A public template is{" "}
          <span className="font-mono text-foreground">https://x.ai/bot/…</span>
          . Preview it on x.ai, then add it in the Grok app. We never re-export a bot
          and we never invent an npx that bypasses Grok.
        </p>
        <p>
          Community packs are shared by other users. They are not Official xAI, even
          when a seat has a live template link.
        </p>
        <p>
          Other shelves list one bot or one prompt. We do not scrape them.{" "}
          <a
            href="https://grokbot.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline-offset-4 hover:underline"
          >
            grokbot.dev
          </a>{" "}
          is the single-bot shelf.{" "}
          <a
            href="https://botdirectory.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline-offset-4 hover:underline"
          >
            botdirectory.ai
          </a>{" "}
          is prompts.
        </p>
        <p>
          Start with the featured{" "}
          <Link href="/poteto/lauren" className="text-foreground underline-offset-4 hover:underline">
            Lauren
          </Link>{" "}
          pack.
        </p>
      </div>
    </main>
  );
}
