import type { ReactNode } from "react";
import Link from "next/link";
import { CatalogOffline } from "@/components/catalog-offline";
import { HeroBanner } from "@/components/hero-banner";
import { Leaderboard } from "@/components/leaderboard";
import { PackCardView } from "@/components/pack-card";
import { PackGrid } from "@/components/pack-grid";
import { catalogStats, listPacks, readCatalog } from "@/lib/catalog";
import { formatCount } from "@/lib/pack";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [packsResult, statsResult] = await Promise.all([
    readCatalog(() => listPacks()),
    readCatalog(() => catalogStats()),
  ]);

  if (packsResult.status === "offline") {
    return (
      <>
        <HeroBanner />
        <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10">
          <CatalogOffline message={packsResult.message} />
        </main>
      </>
    );
  }

  const packs = packsResult.data;
  const featured = packs.find((pack) => pack.featured) ?? packs[0];
  const rest = packs.filter((pack) => pack.id !== featured?.id);
  const stats = statsResult.status === "ok" ? statsResult.data : { packs: packs.length };

  return (
    <>
      <HeroBanner />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10">
        <section className="flex flex-wrap gap-6 text-base text-muted-foreground">
          <p>
            <span className="font-mono text-foreground">{formatCount(stats.packs)}</span> packs
          </p>
        </section>
        {featured ? (
          <section className="flex flex-col gap-3">
            <HeaderLabel href={`/${featured.owner.githubLogin}/${featured.slug}`}>
              Featured
            </HeaderLabel>
            <div className="max-w-xl">
              <PackCardView pack={featured} />
            </div>
          </section>
        ) : null}
        <section className="flex flex-col gap-3">
          <HeaderLabel href="/marketplace">Trending</HeaderLabel>
          <Leaderboard packs={packs.slice(0, 6)} />
        </section>
        {rest.length > 0 ? (
          <section className="flex flex-col gap-3">
            <HeaderLabel href="/marketplace">Packs</HeaderLabel>
            <PackGrid packs={rest} />
          </section>
        ) : null}
      </main>
    </>
  );
}

function HeaderLabel({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
        {children}
      </h2>
      <Link href={href} className="text-xs text-muted-foreground hover:text-foreground">
        View
      </Link>
    </div>
  );
}
