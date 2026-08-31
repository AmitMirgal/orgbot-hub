import { CatalogChat } from "@/components/catalog-chat";
import { SUBMIT_STATUS } from "@/lib/submit-status";

export function SubmitAgentPanel({
  modelReady,
  githubReady,
}: {
  modelReady: boolean;
  githubReady: boolean;
}) {
  const comingSoon = SUBMIT_STATUS === "coming-soon";
  const disabled = comingSoon || !modelReady;
  const reason = comingSoon
    ? "Coming soon. The agent will open a GitHub PR. It will not write the live catalog."
    : !modelReady
      ? "Set SARVAM_API_KEY to chat. Install happens in Grok. We never invent IDs."
      : !githubReady
        ? "ORGBOTS_GITHUB_TOKEN is missing. The agent can still return paste-ready JSON. It will not open a PR."
        : undefined;

  return (
    <CatalogChat
      api="/api/v1/agent/submit"
      title="Chat"
      badge={comingSoon ? "Coming soon" : undefined}
      description="Tell the agent the owner, pack name, desk URL, and seats. It drafts the PR. It does not write the live catalog."
      placeholder="Owner, pack name, desk URL, seats…"
      prompts={
        comingSoon
          ? undefined
          : ["I have official https://x.ai/bot/… URLs and a roster"]
      }
      disabled={disabled}
      disabledReason={reason}
    />
  );
}
