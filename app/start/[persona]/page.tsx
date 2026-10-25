import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StartHereCard } from "@/components/start-here-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  START_PERSONA_SLUGS,
  getStartPersona,
} from "@/lib/start-here";

export function generateStaticParams() {
  return START_PERSONA_SLUGS.map((persona) => ({ persona }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ persona: string }>;
}): Promise<Metadata> {
  const { persona: slug } = await params;
  const persona = getStartPersona(slug);
  if (!persona) return { title: "Start here" };
  return {
    title: persona.title,
    description: persona.blurb,
  };
}

export default async function StartPersonaPage({
  params,
}: {
  params: Promise<{ persona: string }>;
}) {
  const { persona: slug } = await params;
  const persona = getStartPersona(slug);
  if (!persona) notFound();

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10">
      <section className="flex flex-col gap-2">
        <p className="text-xs font-bold tracking-[0.18em] text-muted-foreground uppercase">
          <Link href="/start" className="hover:text-foreground">
            Start here
          </Link>
        </p>
        <h1 className="text-3xl font-bold tracking-tight">{persona.title}</h1>
        <p className="max-w-2xl text-base text-muted-foreground">{persona.blurb}</p>
      </section>
      <div className="grid gap-6 lg:grid-cols-3">
        {persona.cards.map((card) => (
          <StartHereCard key={card.grokTemplateUrl} card={card} persona={persona.slug} />
        ))}
        {persona.missing ? (
          <Alert>
            <AlertTitle>Third bot missing</AlertTitle>
            <AlertDescription>{persona.missing}</AlertDescription>
          </Alert>
        ) : null}
      </div>
    </main>
  );
}
