import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CatalogOffline } from "@/components/catalog-offline";
import { PackGrid } from "@/components/pack-grid";
import {
  CatalogUnavailableError,
  getProfile,
  listPacksByOwner,
} from "@/lib/catalog";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ owner: string }>;
}) {
  const { owner } = await params;

  if (!isSupabaseConfigured()) {
    return (
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10">
        <CatalogOffline />
      </main>
    );
  }

  try {
    const profile = await getProfile(owner);
    if (!profile) notFound();
    const packs = await listPacksByOwner(owner);
    const initials = (profile.name ?? profile.githubLogin).slice(0, 1).toUpperCase();

    return (
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10">
        <section className="flex items-center gap-4">
          <Avatar className="size-12">
            {profile.avatarUrl ? (
              <AvatarImage src={profile.avatarUrl} alt={profile.githubLogin} />
            ) : null}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-medium tracking-tight">
              {profile.name ?? profile.githubLogin}
            </h1>
            <p className="font-mono text-[13px] text-muted-foreground">
              {profile.githubLogin}
            </p>
          </div>
        </section>
        <section className="flex flex-col gap-3">
          <h2 className="text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
            Packs
          </h2>
          <PackGrid packs={packs} />
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
