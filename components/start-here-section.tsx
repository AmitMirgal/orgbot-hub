import Link from "next/link";
import { StartHereCategoryLink } from "@/components/start-here-category-link";
import { Badge } from "@/components/ui/badge";
import { START_PERSONAS } from "@/lib/start-here";
import { getSessionUser } from "@/lib/supabase/server";

export async function StartHereSection() {
  const { user } = await getSessionUser();

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold tracking-[0.16em] text-muted-foreground uppercase">
          Start here
        </h2>
        <Link href="/start" className="text-xs text-muted-foreground hover:text-foreground">
          View
        </Link>
      </div>
      <p className="text-sm text-muted-foreground">
        New to Grok Bot? Pick who you are and get your first bots.
      </p>
      <nav aria-label="Start here personas" className="flex flex-wrap gap-1.5">
        {START_PERSONAS.map((persona) => (
          <StartHereCategoryLink
            key={persona.slug}
            category={persona.slug}
            userId={user?.userId ?? null}
            className="inline-flex min-h-11 items-center"
          >
            <Badge variant="accent" className="rounded-md px-2.5 py-1 font-normal">
              {persona.label}
            </Badge>
          </StartHereCategoryLink>
        ))}
      </nav>
    </section>
  );
}
