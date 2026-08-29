import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddEveryBot } from "@/components/add-every-bot";
import { AddToGrok } from "@/components/add-to-grok";
import { CatalogOffline } from "@/components/catalog-offline";
import { MarkdownCard } from "@/components/markdown-card";
import { NetworkHandle } from "@/components/network-handle";
import { PackGrid } from "@/components/pack-grid";
import { RosterList } from "@/components/roster-list";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  getPack,
  readCatalog,
  relatedPacks,
} from "@/lib/catalog";
import { deskOf, formatCount, namedSeats, ownerHandle } from "@/lib/pack";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ owner: string; slug: string }>;
}): Promise<Metadata> {
  const { owner, slug } = await params;
  try {
    const pack = await getPack(owner, slug);
    if (!pack) return { title: `${owner}/${slug}` };
    return {
      title: pack.name,
      description: pack.description,
    };
  } catch {
    return { title: `${owner}/${slug}` };
  }
}

export default async function PackPage({
  params,
}: {
  params: Promise<{ owner: string; slug: string }>;
}) {
  const { owner, slug } = await params;
  const packResult = await readCatalog(() => getPack(owner, slug));
  if (packResult.status === "offline") {
    return (
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10">
        <CatalogOffline message={packResult.message} />
      </main>
    );
  }
  if (!packResult.data) notFound();
  const pack = packResult.data;
  const related = await relatedPacks(pack).catch(() => []);
  const desk = deskOf(pack);
  const seats = namedSeats(pack);
  const multiSeat = pack.seats.length > 1;

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="flex flex-col gap-8">
          <header className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex min-w-0 flex-col gap-3">
              <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
                Pack
              </p>
              <h1 className="text-3xl font-bold tracking-tight">{pack.name}</h1>
              <div className="flex flex-wrap gap-1.5">
                {pack.topics.map((topic) => (
                  <Link key={topic} href={`/topics/${topic}`}>
                    <Badge variant="accent" className="rounded-md font-normal">
                      {topic}
                    </Badge>
                  </Link>
                ))}
              </div>
              <p className="font-mono text-xs text-muted-foreground">
                shared by{" "}
                <Link href={`/${pack.owner.githubLogin}`} className="hover:text-foreground">
                  {ownerHandle(pack)}
                </Link>
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 lg:w-auto">
              <AddToGrok
                url={desk?.grokTemplateUrl ?? null}
                label={multiSeat ? "add desk to grok bot" : "add to grok bot"}
                packId={pack.id}
                owner={pack.owner.githubLogin}
                slug={pack.slug}
              />
              <p className="font-mono text-xs text-muted-foreground">
                {formatCount(pack.installsCount)} installs
              </p>
            </div>
          </header>

          <AddEveryBot
            seats={pack.seats}
            packId={pack.id}
            owner={pack.owner.githubLogin}
            slug={pack.slug}
          />

          <Alert>
            <AlertTitle>Before you install</AlertTitle>
            <AlertDescription>
              These are third-party instructions. Read the template on x.ai before you add it.
              Never paste an API key. We do not upload a bot for you.
            </AlertDescription>
          </Alert>

          <section className="flex flex-col gap-3">
            <h2 className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
              What it includes
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {desk ? (
                <Badge variant="accent" className="rounded-md font-normal">
                  Desk · {desk.name}
                </Badge>
              ) : null}
              {seats.map((seat) => (
                <Badge key={seat.id} variant="outline" className="rounded-md font-normal">
                  {seat.name}
                </Badge>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
              What it does
            </h2>
            <p className="text-base text-muted-foreground">{pack.description}</p>
            <p className="text-[13px] text-muted-foreground">{pack.routingRule}</p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
              Roster
            </h2>
            <RosterList
              seats={pack.seats}
              packId={pack.id}
              owner={pack.owner.githubLogin}
              slug={pack.slug}
            />
          </section>

          {pack.readmeMd ? (
            <section className="flex flex-col gap-3">
              <h2 className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
                Notes
              </h2>
              <MarkdownCard markdown={pack.readmeMd} />
            </section>
          ) : null}

          {related.length > 0 ? (
            <section className="flex flex-col gap-3">
              <h2 className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
                Related
              </h2>
              <PackGrid packs={related} />
            </section>
          ) : null}
        </div>

        <aside className="flex flex-col gap-4 lg:pt-10">
          <Card className="rounded-lg bg-card py-0 ring-1 ring-border">
            <CardHeader className="px-4 py-3">
              <CardTitle className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
                Source
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 px-4 pb-4 text-[13px]">
              <p>
                Author{" "}
                <Link href={`/${pack.owner.githubLogin}`} className="font-mono hover:underline">
                  {ownerHandle(pack)}
                </Link>
              </p>
              {pack.owner.name ? (
                <p className="text-muted-foreground">{pack.owner.name}</p>
              ) : null}
              {pack.owner.xHandle ? (
                <p>
                  <NetworkHandle
                    network="x"
                    handle={pack.owner.xHandle}
                    personName={pack.owner.name ?? pack.owner.githubLogin}
                  />
                </p>
              ) : null}
              {pack.githubUrl ? (
                <p>
                  <NetworkHandle
                    network="github"
                    url={pack.githubUrl}
                    personName={pack.owner.name ?? pack.owner.githubLogin}
                  />
                </p>
              ) : (
                <p className="text-muted-foreground">No git source listed.</p>
              )}
              {pack.official ? (
                <p className="text-muted-foreground">Marked official by its publisher, not by xAI.</p>
              ) : null}
            </CardContent>
          </Card>
          <Separator className="lg:hidden" />
        </aside>
      </div>
    </main>
  );
}
