import { CatalogChat } from "@/components/catalog-chat";

export function SubmitAgentPanel({
  modelReady,
  githubReady,
}: {
  modelReady: boolean;
  githubReady: boolean;
}) {
  const disabled = !modelReady;
  const reason = !modelReady
    ? "Set MASTRA_MODEL or a provider key to run submit. Install happens in Grok. We never invent IDs."
    : !githubReady
      ? "ORGBOTS_GITHUB_TOKEN is missing. The agent can still return paste-ready JSON. It will not write the live catalog."
      : undefined;

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-medium tracking-tight">Propose a pack as a PR</h2>
        <p className="text-[14px] text-muted-foreground">
          Paste official https://x.ai/bot/… URLs plus the roster. We open a GitHub PR.
          Amit must merge. Install happens in Grok. We never invent IDs.
        </p>
      </div>
      <CatalogChat
        api="/api/v1/agent/submit"
        eyebrow="Submit agent"
        placeholder="Owner, pack name, desk URL, seats…"
        disabled={disabled}
        disabledReason={reason}
      />
    </section>
  );
}