import type { ReactNode } from "react";
import Link from "next/link";
import { CatalogOffline } from "@/components/catalog-offline";
import { Leaderboard } from "@/components/leaderboard";
import { PackGrid } from "@/components/pack-grid";
import { SearchHero } from "@/components/search-hero";
import { CatalogUnavailableError, listPacks } from "@/lib/catalog";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; topic?: string; official?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim() || undefined;
  const topic = params.topic?.trim() || undefined;
  const official = params.official === "1";

  if (!isSupabaseConfigured()) {
    return (
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10">
        <Hero q={q} />
        <CatalogOffline />
      </main>
    );
  }

  let packs;
  try {
    packs = await listPacks({ q, topic, official });
  } catch (error) {
    const message =
      error instanceof CatalogUnavailableError ? error.message : undefined;
    return (
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10">
        <Hero q={q} />
        <CatalogOffline message={message} />
      </main>
    );
  }

  const trending = [...packs].sort((a, b) => b.clonesCount - a.clonesCount).slice(0, 8);
  const heading = official
    ? "Official"
    : topic
      ? `Topic · ${topic}`
      : q
        ? `Results`
        : "Trending";

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10">
      <Hero q={q} />
      <section className="flex flex-col gap-3">
        <HeaderLabel>{heading}</HeaderLabel>
        <Leaderboard packs={trending} />
      </section>
      <section className="flex flex-col gap-3">
        <HeaderLabel>Directory</HeaderLabel>
        <PackGrid packs={packs} />
      </section>
    </main>
  );
}

function Hero({ q }: { q?: string }) {
  return (
    <section className="flex max-w-2xl flex-col gap-4">
      <p className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
        Open directory
      </p>
      <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
        A company of bots.
      </h1>
      <p className="max-w-xl text-[15px] leading-6 text-muted-foreground">
        Packs are rosters, not prompts. Front desk first. Named seats for jobs that
        keep coming back. Clone them like a model.
      </p>
      <SearchHero defaultQuery={q ?? ""} />
      <p className="font-mono text-[12px] text-muted-foreground">
        npx orgbots add owner/pack
      </p>
    </section>
  );
}

function HeaderLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
        {children}
      </h2>
      <Link href="/topics" className="text-[12px] text-muted-foreground hover:text-foreground">
        Topics
      </Link>
    </div>
  );
}
