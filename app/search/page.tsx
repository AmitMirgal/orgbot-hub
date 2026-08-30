import { CatalogBrowse } from "@/components/catalog-browse";
import { CatalogChat } from "@/components/catalog-chat";
import { agentRuntimeStatus } from "@/src/mastra/model";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; topic?: string; featured?: string; seats?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim();
  const { modelReady } = agentRuntimeStatus();
  return (
    <>
      <CatalogBrowse
        pathname="/search"
        searchParams={params}
        eyebrow="Search"
        title={q ? "Results" : "Search packs"}
        empty="No packs match that search."
      />
      <div className="mx-auto w-full max-w-6xl px-4 pb-10">
        <CatalogChat
          api="/api/v1/agent/search"
          placeholder="clinic front desk"
          disabled={!modelReady}
          disabledReason="Set MASTRA_MODEL or a provider key to ask the catalog."
        />
      </div>
    </>
  );
}
