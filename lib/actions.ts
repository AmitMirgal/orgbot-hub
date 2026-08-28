"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { fetchPackFiles } from "@/lib/github";
import { parseOrgbotYaml, type OrgbotManifest } from "@/lib/orgbot-yaml";

async function requireUser() {
  const supabase = await createClient();
  if (!supabase) {
    return { supabase: null, userId: null as string | null, error: "Supabase is not configured." };
  }
  const { data } = await supabase.auth.getClaims();
  const userId = typeof data?.claims?.sub === "string" ? data.claims.sub : null;
  return { supabase, userId, error: userId ? null : "Sign in with GitHub to publish." };
}

async function upsertManifest(
  manifest: OrgbotManifest,
  readme: string | null,
  githubUrl: string | null
) {
  const { supabase, userId, error } = await requireUser();
  if (!supabase || !userId) return { error: error ?? "Not signed in." };

  const { error: packError, data: pack } = await supabase
    .from("packs")
    .upsert(
      {
        owner_id: userId,
        slug: manifest.slug,
        name: manifest.name,
        description: manifest.description,
        github_url: githubUrl,
        license: manifest.license ?? null,
        topics: manifest.topics,
        runtimes: manifest.runtimes,
        readme_md: readme,
        rule: manifest.rule,
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

  const seats = [
    {
      pack_id: pack.id,
      name: manifest.desk.name,
      job: manifest.desk.job,
      repeats_when: null,
      is_desk: true,
      sort_order: 0,
    },
    ...manifest.seats.map((seat, index) => ({
      pack_id: pack.id,
      name: seat.name,
      job: seat.job,
      repeats_when: seat.repeats_when ?? null,
      is_desk: false,
      sort_order: index + 1,
    })),
  ];

  const { error: seatError } = await supabase.from("seats").insert(seats);
  if (seatError) return { error: seatError.message };

  const { data: profile } = await supabase
    .from("profiles")
    .select("github_login")
    .eq("id", userId)
    .single();

  const owner = profile?.github_login;
  if (!owner) return { error: "Profile is missing a GitHub login." };

  revalidatePath("/");
  revalidatePath(`/${owner}`);
  revalidatePath(`/${owner}/${manifest.slug}`);
  redirect(`/${owner}/${manifest.slug}`);
}

export async function publishFromGithub(formData: FormData) {
  const url = String(formData.get("githubUrl") ?? "").trim();
  if (!url) return { error: "Paste a GitHub repo URL." };
  try {
    const files = await fetchPackFiles(url);
    const manifest = parseOrgbotYaml(files.yaml);
    return await upsertManifest(manifest, files.readme, files.githubUrl);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Publish failed." };
  }
}

export async function publishFromUpload(formData: FormData) {
  const yaml = String(formData.get("yaml") ?? "").trim();
  const readme = String(formData.get("readme") ?? "").trim() || null;
  if (!yaml) return { error: "Paste an orgbots.yaml." };
  try {
    const manifest = parseOrgbotYaml(yaml);
    return await upsertManifest(manifest, readme, null);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Publish failed." };
  }
}

export async function toggleLike(packId: string, owner: string, slug: string) {
  const { supabase, userId, error } = await requireUser();
  if (!supabase || !userId) return { error: error ?? "Sign in to like." };

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

export async function recordClone(packId: string, owner: string, slug: string) {
  const supabase = await createClient();
  if (!supabase) return { error: "Catalog is not reachable." };
  const { error } = await supabase.rpc("increment_clones", { p_pack_id: packId });
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath(`/${owner}`);
  revalidatePath(`/${owner}/${slug}`);
  return { error: null };
}
