import { SubmitAgentPanel } from "@/components/submit-agent-panel";
import { Badge } from "@/components/ui/badge";
import { SUBMIT_STATUS } from "@/lib/submit-status";
import { agentRuntimeStatus } from "@/src/mastra/model";

export const dynamic = "force-dynamic";

export default async function SubmitPage() {
  const { modelReady, githubReady } = agentRuntimeStatus();

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-10">
      <section className="flex flex-col gap-2">
        <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
          Submit
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-medium tracking-tight">Add a pack</h1>
          {SUBMIT_STATUS === "coming-soon" ? (
            <Badge variant="secondary">Coming soon</Badge>
          ) : null}
        </div>
        <p className="text-[14px] text-muted-foreground">
          Chat with the agent. Paste official https://x.ai/bot/… URLs plus the
          roster. It opens a GitHub PR. Amit merges. Install still happens in
          Grok. We never invent an ID.
        </p>
      </section>
      <SubmitAgentPanel modelReady={modelReady} githubReady={githubReady} />
    </main>
  );
}
