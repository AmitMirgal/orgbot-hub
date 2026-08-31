import type { ReactNode } from "react";
import { CatalogOffline } from "@/components/catalog-offline";
import { FilterChips } from "@/components/filter-chips";
import { PackGrid } from "@/components/pack-grid";
import { listPacks, readCatalog } from "@/lib/catalog";
import { parseSeatBand } from "@/lib/topics";

export async function CatalogBrowse({
  pathname,
  searchParams,
  title,
  eyebrow,
  empty,
  lead,
}: {
  pathname: string;
  searchParams: { q?: string; topic?: string; featured?: string; seats?: string };
  title: string;
  eyebrow: string;
  empty?: string;
  lead?: ReactNode;
}) {
  const q = searchParams.q?.trim() || undefined;
  const topic = searchParams.topic?.trim() || undefined;
  const featured = searchParams.featured === "1";
  const seatBand = parseSeatBand(searchParams.seats);
  const result = await readCatalog(() => listPacks({ q, topic, featured, seatBand }));

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10">
      {lead}
      <section className="flex flex-col gap-4">
        <div className="flex max-w-2xl flex-col gap-1">
          {lead ? null : (
            <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
              {eyebrow}
            </p>
          )}
          <h1 className="text-2xl font-medium tracking-tight">{title}</h1>
          {q ? (
            <p className="font-mono text-[13px] text-muted-foreground">{q}</p>
          ) : null}
        </div>
        <FilterChips
          pathname={pathname}
          q={q}
          topic={topic}
          featured={featured}
          seatBand={seatBand}
        />
      </section>
      {result.status === "offline" ? (
        <CatalogOffline message={result.message} />
      ) : result.data.length === 0 ? (
        <p className="text-[13px] text-muted-foreground">
          {empty ?? "No packs match."}
        </p>
      ) : (
        <PackGrid packs={result.data} />
      )}
    </main>
  );
}
