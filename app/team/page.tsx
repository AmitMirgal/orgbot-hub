import { CatalogChat } from "@/components/catalog-chat";
import { listPacks, readCatalog } from "@/lib/catalog";
import { getSessionUserId } from "@/lib/supabase/server";
import { readTeamChatQuota } from "@/lib/team-chat";
import { topAuthors } from "@/lib/top-authors";
import { agentRuntimeStatus } from "@/src/mastra/model";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Team",
};

export default async function TeamPage() {
  const { userId } = await getSessionUserId();
  const signedIn = Boolean(userId);

  const { modelReady } = agentRuntimeStatus();
  const catalog = await readCatalog(() => listPacks());
  const authors = catalog.status === "ok" ? topAuthors(catalog.data) : [];
  const quota = signedIn ? await readTeamChatQuota() : undefined;
  return (
    <CatalogChat
      surface="page"
      mix
      authors={authors}
      quota={quota}
      signedIn={signedIn}
      api="/api/v1/agent/search"
      title="Team"
      description="Describe the jobs you need. The desk mixes seats that already exist. This is your draft, not a listed pack."
      placeholder="I need a front desk plus billing plus QA"
      prompts={[
        "Front desk plus billing plus QA",
        "A desk plus a coder",
        "Front desk plus QA",
        "lauren",
      ]}
      disabled={!modelReady}
      disabledReason="Set SARVAM_API_KEY to chat."
    />
  );
}
