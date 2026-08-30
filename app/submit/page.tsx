import { SubmitAgentPanel } from "@/components/submit-agent-panel";
import { SubmitForm } from "@/components/submit-form";
import { Badge } from "@/components/ui/badge";
import { SUBMIT_STATUS } from "@/lib/submit-status";
import { currentProfile } from "@/lib/catalog";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { agentRuntimeStatus } from "@/src/mastra/model";

export const dynamic = "force-dynamic";

export default async function SubmitPage() {
  const profile = isSupabaseConfigured() ? await currentProfile() : null;
  const comingSoon = SUBMIT_STATUS === "coming-soon";
  const { modelReady, githubReady } = agentRuntimeStatus();

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-10">
      <section className="flex flex-col gap-2">
        <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
          Submit
        </p>
        <h1 className="text-2xl font-medium tracking-tight">Add a pack</h1>
        <p className="text-[14px] text-muted-foreground">
          Paste official https://x.ai/bot/… URLs plus the roster. We never invent an ID.
          Install still happens in Grok.
        </p>
        {comingSoon ? (
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <h2 className="text-lg font-medium tracking-tight">Coming soon</h2>
            <Badge variant="secondary">Coming soon</Badge>
          </div>
        ) : null}
      </section>
      {comingSoon ? (
        <SubmitForm disabled />
      ) : !isSupabaseConfigured() ? (
        <p className="text-[14px] text-muted-foreground">
          Sign in is not configured on this deploy. Browse still works. Add hosted
          Supabase with GitHub auth to enable submit.
        </p>
      ) : profile ? (
        <SubmitForm />
      ) : (
        <p className="text-[14px] text-muted-foreground">
          Sign in with GitHub to submit a pack. The catalog only stores the roster and
          official template links.
        </p>
      )}
      <SubmitAgentPanel modelReady={modelReady} githubReady={githubReady} />
    </main>
  );
}
