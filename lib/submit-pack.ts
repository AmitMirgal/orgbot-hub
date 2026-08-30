import { listPacksByOwner } from "@/lib/catalog";
import { openPackPr, packFileJson, type OpenPrResult, type PackFileDraft } from "@/lib/pack-pr";
import {
  ownerPackConflict,
  validateDraft,
  type SubmitDraftInput,
  type SubmitRefusal,
  type SubmitRefusalCode,
} from "@/lib/submit-draft";

export type { PackFileDraft, SubmitDraftInput, SubmitRefusalCode };
export { validateGrokUrl } from "@/lib/submit-draft";

export type SubmitOutcome =
  | { status: "opened"; prUrl: string; branch: string }
  | { status: "paste_ready"; json: string; reason: "missing_token" | "github_error"; detail: string }
  | SubmitRefusal;

export async function lookupOwnerPacks(owner: string) {
  return listPacksByOwner(owner.trim());
}

export function toPackFileJson(draft: PackFileDraft): string {
  return packFileJson(draft);
}

export async function proposePack(input: SubmitDraftInput): Promise<SubmitOutcome> {
  const validated = validateDraft(input);
  if (!validated.ok) return validated.refusal;

  const existing = await listPacksByOwner(validated.draft.owner);
  const conflict = ownerPackConflict(validated.draft.owner, existing);
  if (conflict) return conflict;

  const opened: OpenPrResult = await openPackPr(validated.draft);
  if (opened.kind === "opened") {
    return { status: "opened", prUrl: opened.url, branch: opened.branch };
  }
  return {
    status: "paste_ready",
    json: opened.json,
    reason: opened.reason,
    detail: opened.detail,
  };
}
