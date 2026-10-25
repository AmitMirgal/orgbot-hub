import type { Metadata } from "next";
import { StartHereCategoryLink } from "@/components/start-here-category-link";
import { START_PERSONAS } from "@/lib/start-here";
import { getSessionUser } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Start here",
  description: "Pick who you are and get your first Grok bots.",
};

export default async function StartPage() {
  const { user } = await getSessionUser();

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10">
      <section className="flex flex-col gap-2">
        <p className="text-xs font-bold tracking-[0.18em] text-muted-foreground uppercase">
          Start here
        </p>
        <h1 className="text-3xl font-bold tracking-tight">Who are you?</h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          Pick a seat. Each page has up to three live official Grok bots you can add
          today. No sign-in.
        </p>
      </section>
      <nav aria-label="Start here personas" className="grid gap-4 md:grid-cols-2">
        {START_PERSONAS.map((persona) => (
          <StartHereCategoryLink
            key={persona.slug}
            category={persona.slug}
            userId={user?.userId ?? null}
            className="flex min-h-11 flex-col gap-2 rounded-lg bg-card px-6 py-5 ring-1 ring-border transition-colors hover:bg-accent/40"
          >
            <h2 className="text-lg font-bold tracking-tight">{persona.label}</h2>
            <p className="text-sm text-muted-foreground">{persona.blurb}</p>
          </StartHereCategoryLink>
        ))}
      </nav>
    </main>
  );
}
