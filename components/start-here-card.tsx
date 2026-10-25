import Link from "next/link";
import { AddToGrok } from "@/components/add-to-grok";
import { CopyFirstMessage } from "@/components/copy-first-message";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFallbackPack } from "@/lib/fallback-catalog";
import {
  SAMPLE_FAKE_DATA_LABEL,
  startHerePackIdentity,
  type StartCard,
  type StartPersonaSlug,
} from "@/lib/start-here";

export function StartHereCard({
  card,
  persona,
}: {
  card: StartCard;
  persona: StartPersonaSlug;
}) {
  const identity = startHerePackIdentity(card.packPath);
  const pack = identity ? getFallbackPack(identity.owner, identity.slug) : null;

  return (
    <Card size="sm" className="rounded-lg bg-card py-0 ring-1 ring-border">
      <CardHeader className="gap-1.5 border-b border-border px-6 py-5">
        {identity ? (
          <Link href={card.packPath ?? `/${identity.owner}/${identity.slug}`} className="group">
            <CardTitle className="text-lg font-bold tracking-tight group-hover:underline">
              {card.botName}{" "}
              <span className="font-medium text-muted-foreground">by {card.byline}</span>
            </CardTitle>
          </Link>
        ) : (
          <CardTitle className="text-lg font-bold tracking-tight">
            {card.botName}{" "}
            <span className="font-medium text-muted-foreground">by {card.byline}</span>
          </CardTitle>
        )}
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-5 px-6 py-5">
        <section className="flex flex-col gap-2">
          <h3 className="text-xs font-bold tracking-[0.16em] text-muted-foreground uppercase">
            First message
          </h3>
          <p className="text-sm leading-relaxed text-foreground">{card.firstMessage}</p>
        </section>
        <section className="flex flex-col gap-2">
          <h3 className="text-xs font-bold tracking-[0.16em] text-muted-foreground uppercase">
            Safety
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{card.safety.line}</p>
        </section>
        <section className="flex flex-col gap-2">
          <h3 className="text-xs font-medium text-muted-foreground">
            {SAMPLE_FAKE_DATA_LABEL}
          </h3>
          {card.sample.map((line) => (
            <blockquote
              key={line}
              className="border-l-2 border-border pl-3 text-sm leading-relaxed text-muted-foreground"
            >
              {line}
            </blockquote>
          ))}
        </section>
        <div className="mt-auto flex flex-col gap-2 pt-1">
          {pack && identity ? (
            <AddToGrok
              url={card.grokTemplateUrl}
              label="Add in Grok"
              packId={pack.id}
              owner={identity.owner}
              slug={identity.slug}
              seatName={card.botName}
              source="start_here"
              persona={persona}
            />
          ) : null}
          <CopyFirstMessage text={card.firstMessage} />
        </div>
      </CardContent>
    </Card>
  );
}
