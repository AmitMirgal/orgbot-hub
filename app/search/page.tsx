import { CatalogBrowse } from "@/components/catalog-browse";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; topic?: string; featured?: string; seats?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim();
  return (
    <CatalogBrowse
      pathname="/search"
      searchParams={params}
      eyebrow="Search"
      title={q ? "Results" : "Search packs"}
      empty="No packs match that search."
    />
  );
}
