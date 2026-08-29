import type { ReactNode } from "react";
import Link from "next/link";
import { CatalogOffline } from "@/components/catalog-offline";
import { Leaderboard } from "@/components/leaderboard";
import { PackCardView } from "@/components/pack-card";
import { PackGrid } from "@/components/pack-grid";
import { SearchHero } from "@/components/search-hero";
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
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10">
        <Hero />
        <CatalogOffline message={packsResult.message} />
      </main>
    );
  }

  const packs = packsResult.data;
  const featured = packs.find((pack) => pack.featured) ?? packs[0];
  const rest = packs.filter((pack) => pack.id !== featured?.id);
  const stats = statsResult.status === "ok" ? statsResult.data : { packs: packs.length, seats: 0 };

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10">
      <Hero />
      <section className="flex flex-wrap gap-6 text-[13px] text-muted-foreground">
        <p>
          <span className="font-mono text-foreground">{formatCount(stats.packs)}</span> packs
        </p>
        <p>
          <span className="font-mono text-foreground">{formatCount(stats.seats)}</span> seats
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
      <section className="flex flex-col gap-3">
        <HeaderLabel href="/marketplace">Packs</HeaderLabel>
        <PackGrid packs={rest.length > 0 ? rest : packs} />
      </section>
    </main>
  );
}

function Hero() {
  return (
    <section className="flex max-w-2xl flex-col gap-4">
      <p className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
        Packs
      </p>
      <h1 className="font-pixel text-3xl leading-tight tracking-wide sm:text-4xl">
        company of bots you can install
      </h1>
      <p className="max-w-xl text-[15px] leading-6 text-muted-foreground">
        Front desk plus named seats. Random questions stay at the desk. Official Grok
        install only.
      </p>
      <SearchHero />
    </section>
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
      <h2 className="text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
        {children}
      </h2>
      <Link href={href} className="text-[12px] text-muted-foreground hover:text-foreground">
        View
      </Link>
    </div>
  );
}
