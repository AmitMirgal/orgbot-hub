import { looksLikeSecret, parseGrokTemplateUrl } from "@/lib/grok-url";
import { slugify } from "@/lib/pack";
import type { PackFileDraft } from "@/lib/pack-pr";

export type SubmitDraftInput = {
  owner: string;
  slug?: string;
  name: string;
  description: string;
  githubUrl?: string | null;
  desk: { name: string; job: string; grokTemplateUrl: string };
  seats?: Array<{ name: string; job: string; grokTemplateUrl: string }>;
};

export type SubmitRefusalCode =
  | "invalid_grok_url"
  | "secret_shaped"
  | "missing_desk_url"
  | "owner_already_has_pack"
  | "invalid_owner"
  | "invalid_name";

export type SubmitRefusal = {
  status: "refused";
  code: SubmitRefusalCode;
  message: string;
};

export function refuse(code: SubmitRefusalCode, message: string): SubmitRefusal {
  return { status: "refused", code, message };
}

export function validateGrokUrl(raw: string): { ok: true; url: string } | { ok: false; message: string } {
  if (looksLikeSecret(raw)) {
    return { ok: false, message: "Remove API keys, tokens, and secret-shaped text." };
  }
  const url = parseGrokTemplateUrl(raw);
  if (!url) {
    return {
      ok: false,
      message: "Install links must be official https://x.ai/bot/… URLs. Nothing else is accepted.",
    };
  }
  return { ok: true, url };
}

function parseGithubSource(raw: string | null | undefined): { url: string | null; error?: string } {
  const value = raw?.trim() ?? "";
  if (!value) return { url: null };
  if (looksLikeSecret(value)) return { url: null, error: "Remove API keys, tokens, and secret-shaped text." };
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.hostname !== "github.com") {
      return { url: null, error: "Source git URL must be https://github.com/…" };
    }
    return { url: url.toString() };
  } catch {
    return { url: null, error: "Source git URL must be https://github.com/…" };
  }
}

export function ownerPackConflict(
  owner: string,
  existing: Array<{ owner: { githubLogin: string }; slug: string }>
): SubmitRefusal | null {
  if (existing.length === 0) return null;
  return refuse(
    "owner_already_has_pack",
    `@${owner} already has a pack at /${existing[0].owner.githubLogin}/${existing[0].slug}. Edit that pack. One pack per owner.`
  );
}

export function validateDraft(
  input: SubmitDraftInput
): { ok: true; draft: PackFileDraft } | { ok: false; refusal: SubmitRefusal } {
  const owner = input.owner.trim();
  const name = input.name.trim();
  const description = input.description.trim();
  const slug = slugify(input.slug?.trim() || name);

  if (!owner) return { ok: false, refusal: refuse("invalid_owner", "GitHub owner login is required.") };
  if (!name || !slug || !description) {
    return { ok: false, refusal: refuse("invalid_name", "Pack name, slug, and one-line job are required.") };
  }
  if (looksLikeSecret(`${owner} ${name} ${slug} ${description}`)) {
    return {
      ok: false,
      refusal: refuse("secret_shaped", "Remove API keys, tokens, and secret-shaped text."),
    };
  }

  const deskUrl = validateGrokUrl(input.desk.grokTemplateUrl);
  if (!deskUrl.ok) {
    if (looksLikeSecret(input.desk.grokTemplateUrl)) {
      return { ok: false, refusal: refuse("secret_shaped", deskUrl.message) };
    }
    if (!input.desk.grokTemplateUrl.trim()) {
      return { ok: false, refusal: refuse("missing_desk_url", "At least one desk URL is required.") };
    }
    return { ok: false, refusal: refuse("invalid_grok_url", deskUrl.message) };
  }
  if (!input.desk.name.trim() || !input.desk.job.trim()) {
    return { ok: false, refusal: refuse("invalid_name", "The desk needs a name and a job.") };
  }

  const seats: PackFileDraft["seats"] = [
    {
      name: input.desk.name.trim(),
      job: input.desk.job.trim(),
      isDesk: true,
      grokTemplateUrl: deskUrl.url,
    },
  ];

  for (const seat of input.seats ?? []) {
    if (!seat.name.trim() && !seat.job.trim() && !seat.grokTemplateUrl.trim()) continue;
    const parsed = validateGrokUrl(seat.grokTemplateUrl);
    if (!parsed.ok) {
      if (looksLikeSecret(seat.grokTemplateUrl)) {
        return { ok: false, refusal: refuse("secret_shaped", parsed.message) };
      }
      return { ok: false, refusal: refuse("invalid_grok_url", parsed.message) };
    }
    if (!seat.name.trim() || !seat.job.trim()) {
      return { ok: false, refusal: refuse("invalid_name", "Each named seat needs a name and a job.") };
    }
    seats.push({
      name: seat.name.trim(),
      job: seat.job.trim(),
      isDesk: false,
      grokTemplateUrl: parsed.url,
    });
  }

  const github = parseGithubSource(input.githubUrl);
  if (github.error) return { ok: false, refusal: refuse("invalid_grok_url", github.error) };

  return {
    ok: true,
    draft: {
      owner,
      slug,
      name,
      description,
      githubUrl: github.url,
      official: false,
      featured: false,
      seats,
    },
  };
}
