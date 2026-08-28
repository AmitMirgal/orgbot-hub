import { CatalogOffline } from "@/components/catalog-offline";
import { PackGrid } from "@/components/pack-grid";
import { CatalogUnavailableError, listPacks } from "@/lib/catalog";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export default async function OfficialPage() {
  if (!isSupabaseConfigured()) {
    return (
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10">
        <Header />
        <CatalogOffline />
      </main>
    );
  }

  try {
    const packs = await listPacks({ official: true });
    return (
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10">
        <Header />
        <PackGrid packs={packs} />
      </main>
    );
  } catch (error) {
    const message =
      error instanceof CatalogUnavailableError ? error.message : undefined;
    return (
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10">
        <Header />
        <CatalogOffline message={message} />
      </main>
    );
  }
}

function Header() {
  return (
    <section className="flex max-w-2xl flex-col gap-2">
      <p className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
        Official
      </p>
      <h1 className="text-2xl font-medium tracking-tight">Maintained example packs</h1>
      <p className="text-[14px] text-muted-foreground">
        Canonical rosters for the directory. Community packs live on the homepage.
      </p>
    </section>
  );
}
