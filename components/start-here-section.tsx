import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { START_PERSONAS } from "@/lib/start-here";

export function StartHereSection() {
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
          <Link
            key={persona.slug}
            href={`/start/${persona.slug}`}
            className="inline-flex min-h-11 items-center"
          >
            <Badge variant="outline" className="rounded-md px-2.5 py-1 font-normal">
              {persona.label}
            </Badge>
          </Link>
        ))}
      </nav>
    </section>
  );
}
