"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { looksLikeSecret, parseGrokTemplateUrl } from "@/lib/grok-url";
import { DEFAULT_ROUTING_RULE, slugify } from "@/lib/pack";
import { isTopic } from "@/lib/topics";
import { createClient, getSessionUserId } from "@/lib/supabase/server";

export type SubmitStatus = "coming-soon" | "open";
export const SUBMIT_STATUS: SubmitStatus = "coming-soon";

async function requireUser() {
  const { supabase, userId } = await getSessionUserId();
  if (!supabase) {
    return { supabase: null, userId: null as string | null, error: "Supabase is not configured." };
  }
  return { supabase, userId, error: userId ? null : "Sign in with GitHub to submit." };
}

type DraftSeat = {
  name: string;
  job: string;
  repeatsWhen: string | null;
  isDesk: boolean;
  sortOrder: number;
  grokTemplateUrl: string | null;
};

function rejectSecrets(...values: Array<string | null | undefined>): string | null {
  for (const value of values) {
    if (value && looksLikeSecret(value)) {
      return "Remove API keys, tokens, and secret-shaped text.";
    }
  }
  return null;
}

function parseSubmittedUrl(raw: string): { url: string | null; error?: string } {
  const value = raw.trim();
  if (!value) return { url: null };
  const parsed = parseGrokTemplateUrl(value);
  if (!parsed) {
    return {
      url: null,
      error: "Install links must be official https://x.ai/bot/… URLs. Nothing else is accepted.",
    };
  }
  return { url: parsed };
}

function parseTopics(formData: FormData): string[] {
  return formData
    .getAll("topics")
    .map((value) => String(value))
    .filter(isTopic);
}

export async function submitPack(formData: FormData) {
  if (SUBMIT_STATUS === "coming-soon") {
    return { error: "Submit is coming soon." };
  }

  const { supabase, userId, error } = await requireUser();
  if (!supabase || !userId) return { error: error ?? "Not signed in." };

  const name = String(formData.get("name") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const slug = slugify(slugInput || name);
  const description = String(formData.get("description") ?? "").trim();
  const routingRule =
    String(formData.get("routingRule") ?? "").trim() || DEFAULT_ROUTING_RULE;
  const readmeMd = String(formData.get("readme") ?? "").trim() || null;
  const githubUrlRaw = String(formData.get("githubUrl") ?? "").trim();
  const topics = parseTopics(formData);

  const secretError = rejectSecrets(
    name,
    slug,
    description,
    routingRule,
    readmeMd,
    githubUrlRaw
  );
  if (secretError) return { error: secretError };

  if (!name || !slug || !description) {
    return { error: "Name, slug, and one-line job are required." };
  }

  let githubUrl: string | null = null;
  if (githubUrlRaw) {
    try {
      const url = new URL(githubUrlRaw);
      if (url.protocol !== "https:" || url.hostname !== "github.com") {
        return { error: "Source git URL must be https://github.com/…" };
      }
      githubUrl = url.toString();
    } catch {
      return { error: "Source git URL must be https://github.com/…" };
    }
  }

  const deskName = String(formData.get("deskName") ?? "").trim();
  const deskJob = String(formData.get("deskJob") ?? "").trim();
  const deskUrl = parseSubmittedUrl(String(formData.get("deskUrl") ?? ""));
  if (deskUrl.error) return { error: deskUrl.error };
  if (!deskName || !deskJob) return { error: "The desk needs a name and a job." };

  const seatNames = formData.getAll("seatName").map((value) => String(value));
  const seatJobs = formData.getAll("seatJob").map((value) => String(value));
  const seatUrls = formData.getAll("seatUrl").map((value) => String(value));
  const seats: DraftSeat[] = [
    {
      name: deskName,
      job: deskJob,
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: deskUrl.url,
    },
  ];

  for (let index = 0; index < Math.max(seatNames.length, seatJobs.length, seatUrls.length); index += 1) {
    const seatName = (seatNames[index] ?? "").trim();
    const seatJob = (seatJobs[index] ?? "").trim();
    const parsed = parseSubmittedUrl(seatUrls[index] ?? "");
    if (parsed.error) return { error: parsed.error };
    if (!seatName && !seatJob && !parsed.url) continue;
    if (!seatName || !seatJob) {
      return { error: "Each named seat needs a name and a job." };
    }
    const leaked = rejectSecrets(seatName, seatJob);
    if (leaked) return { error: leaked };
    seats.push({
      name: seatName,
      job: seatJob,
      repeatsWhen: null,
      isDesk: false,
      sortOrder: seats.length,
      grokTemplateUrl: parsed.url,
    });
  }

  const { error: packError, data: pack } = await supabase
    .from("packs")
    .upsert(
      {
        owner_id: userId,
        slug,
        name,
        description,
        github_url: githubUrl,
        official: false,
        featured: false,
        topics,
        readme_md: readmeMd,
        routing_rule: routingRule,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "owner_id,slug" }
    )
    .select("id")
    .single();

  if (packError || !pack) {
    return { error: packError?.message ?? "Could not save pack." };
  }

  const { error: deleteError } = await supabase.from("seats").delete().eq("pack_id", pack.id);
  if (deleteError) return { error: deleteError.message };

  const { error: seatError } = await supabase.from("seats").insert(
    seats.map((item) => ({
      pack_id: pack.id,
      name: item.name,
      job: item.job,
      repeats_when: item.repeatsWhen,
      is_desk: item.isDesk,
      sort_order: item.sortOrder,
      grok_template_url: item.grokTemplateUrl,
    }))
  );
  if (seatError) return { error: seatError.message };

  const { data: profile } = await supabase
    .from("profiles")
    .select("github_login")
    .eq("id", userId)
    .single();

  const owner = profile?.github_login;
  if (!owner) return { error: "Profile is missing a GitHub login." };

  revalidatePath("/");
  revalidatePath("/marketplace");
  revalidatePath("/search");
  revalidatePath(`/${owner}`);
  revalidatePath(`/${owner}/${slug}`);
  redirect(`/${owner}/${slug}`);
}

export async function toggleLike(packId: string, owner: string, slug: string) {
  const { supabase, userId, error } = await requireUser();
  if (!supabase || !userId) return { error: error ?? "Sign in to upvote." };

  const { data: existing } = await supabase
    .from("likes")
    .select("pack_id")
    .eq("pack_id", packId)
    .eq("user_id", userId)
    .maybeSingle();

  if (existing) {
    const { error: deleteError } = await supabase
      .from("likes")
      .delete()
      .eq("pack_id", packId)
      .eq("user_id", userId);
    if (deleteError) return { error: deleteError.message };
  } else {
    const { error: insertError } = await supabase
      .from("likes")
      .insert({ pack_id: packId, user_id: userId });
    if (insertError) return { error: insertError.message };
  }

  revalidatePath("/");
  revalidatePath(`/${owner}`);
  revalidatePath(`/${owner}/${slug}`);
  return { error: null };
}

export async function recordInstall(packId: string, owner: string, slug: string) {
  const supabase = await createClient();
  if (!supabase) return { error: "Catalog is not reachable." };
  const { error } = await supabase.rpc("increment_installs", { p_pack_id: packId });
  if (error) {
    const fallback = await supabase.rpc("increment_clones", { p_pack_id: packId });
    if (fallback.error) return { error: error.message };
  }
  revalidatePath("/");
  revalidatePath(`/${owner}`);
  revalidatePath(`/${owner}/${slug}`);
  return { error: null };
}
