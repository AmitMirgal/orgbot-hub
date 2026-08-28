import { PublishForm } from "@/components/publish-form";
import { currentProfile } from "@/lib/catalog";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export default async function PublishPage() {
  if (!isSupabaseConfigured()) {
    return (
      <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-10">
        <Header />
        <p className="text-[14px] text-muted-foreground">
          Sign in is not configured on this deploy. Browse and clone still work.
          Add hosted Supabase with GitHub auth to enable publish.
        </p>
      </main>
    );
  }

  const profile = await currentProfile();

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-10">
      <Header />
      {profile ? (
        <PublishForm />
      ) : (
        <p className="text-[14px] text-muted-foreground">
          Sign in with GitHub to publish a pack. The catalog only caches the roster.
          Git stays the source of truth.
        </p>
      )}
    </main>
  );
}

function Header() {
  return (
    <section className="flex flex-col gap-2">
      <p className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
        Publish
      </p>
      <h1 className="text-2xl font-medium tracking-tight">Add a pack to the catalog</h1>
      <p className="text-[14px] text-muted-foreground">
        Point at a GitHub repo with orgbots.yaml, or paste the files for a demo.
        The live agents do not run here.
      </p>
    </section>
  );
}
