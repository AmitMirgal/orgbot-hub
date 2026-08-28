import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CatalogOffline } from "@/components/catalog-offline";
import { CloneLine } from "@/components/clone-line";
import { LikeButton } from "@/components/like-button";
import { MarkdownCard } from "@/components/markdown-card";
import { RosterTable } from "@/components/roster-table";
import {
  CatalogUnavailableError,
  currentProfile,
  getPack,
  hasLiked,
} from "@/lib/catalog";
import { formatCount, packFiles } from "@/lib/pack";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ owner: string; slug: string }>;
}): Promise<Metadata> {
  const { owner, slug } = await params;
  if (!isSupabaseConfigured()) {
    return { title: `${owner}/${slug}` };
  }
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

  if (!isSupabaseConfigured()) {
    return (
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10">
        <CatalogOffline />
      </main>
    );
  }

  try {
    const pack = await getPack(owner, slug);
    if (!pack) notFound();
    const profile = await currentProfile();
    const liked = await hasLiked(pack.id, profile?.id ?? null);
    const files = packFiles(pack);

    return (
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10">
        <header className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 flex-col gap-2">
            <p className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              Pack
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-medium tracking-tight">{pack.name}</h1>
              {pack.official ? (
                <Badge variant="outline" className="rounded-md font-normal">
                  Official
                </Badge>
              ) : null}
              {pack.topics.includes("example") ? (
                <Badge variant="ghost" className="rounded-md font-normal text-muted-foreground">
                  example
                </Badge>
              ) : null}
            </div>
            <p className="text-[14px] text-muted-foreground">{pack.description}</p>
            <p className="font-mono text-[12px] text-muted-foreground">
              <Link href={`/${pack.owner.githubLogin}`} className="hover:text-foreground">
                {pack.owner.githubLogin}
              </Link>
              <span>/{pack.slug}</span>
              {pack.license ? <span> · {pack.license}</span> : null}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {pack.runtimes.map((runtime) => (
                <Badge
                  key={runtime}
                  variant="secondary"
                  className="rounded-md font-mono text-[10px] font-normal"
                >
                  {runtime}
                </Badge>
              ))}
              {pack.topics.map((topic) => (
                <Link key={topic} href={`/?topic=${encodeURIComponent(topic)}`}>
                  <Badge variant="outline" className="rounded-md font-normal">
                    {topic}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 lg:w-[28rem]">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[12px] text-muted-foreground">
                {formatCount(pack.clonesCount)} clones
              </p>
              <LikeButton
                packId={pack.id}
                owner={pack.owner.githubLogin}
                slug={pack.slug}
                likes={pack.likesCount}
                liked={liked}
                signedIn={Boolean(profile)}
              />
            </div>
            <CloneLine
              packId={pack.id}
              owner={pack.owner.githubLogin}
              slug={pack.slug}
              githubUrl={pack.githubUrl}
            />
          </div>
        </header>

        <section className="flex flex-col gap-3">
          <h2 className="text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
            Roster
          </h2>
          <RosterTable seats={pack.seats} />
          <p className="text-[13px] text-muted-foreground">{pack.rule}.</p>
        </section>

        <Separator />

        <section className="flex flex-col gap-3">
          <h2 className="text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
            Card
          </h2>
          {pack.readmeMd ? (
            <MarkdownCard markdown={pack.readmeMd} />
          ) : (
            <p className="text-[13px] text-muted-foreground">No README in the catalog cache.</p>
          )}
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
            Files
          </h2>
          <ul className="rounded-lg border border-border">
            {files.map((file) => (
              <li
                key={file}
                className="border-b border-border px-3 py-2 font-mono text-[12px] last:border-b-0"
              >
                {file}
              </li>
            ))}
          </ul>
        </section>
      </main>
    );
  } catch (error) {
    if ((error as { digest?: string })?.digest === "NEXT_NOT_FOUND") throw error;
    const message =
      error instanceof CatalogUnavailableError ? error.message : undefined;
    return (
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10">
        <CatalogOffline message={message} />
      </main>
    );
  }
}
