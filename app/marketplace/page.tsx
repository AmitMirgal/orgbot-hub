import { CatalogBrowse } from "@/components/catalog-browse";

export const dynamic = "force-dynamic";

export default async function MarketplacePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; topic?: string; featured?: string; seats?: string }>;
}) {
  const params = await searchParams;
  return (
    <CatalogBrowse
      pathname="/marketplace"
      searchParams={params}
      eyebrow="Marketplace"
      title="Browse packs"
    />
  );
}
