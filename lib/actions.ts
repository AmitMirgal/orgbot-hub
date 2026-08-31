"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { looksLikeSecret, parseGrokTemplateUrl } from "@/lib/grok-url";
import { DEFAULT_ROUTING_RULE, slugify } from "@/lib/pack";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/supabase/server";
import { SUBMIT_STATUS } from "@/lib/submit-status";
import { isTopic } from "@/lib/topics";
import type { VisitSource } from "@/lib/visits";

async function requireUser() {
  const { userId } = await getSessionUserId();
  if (!prisma) {
    return { userId: null as string | null, error: "Catalog is not reachable." };
  }
  return { userId, error: userId ? null : "Sign in with GitHub to submit." };
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

  const { userId, error } = await requireUser();
  if (!prisma || !userId) return { error: error ?? "Not signed in." };

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

  let pack: { id: string };
  try {
    pack = await prisma.pack.upsert({
      where: { ownerId_slug: { ownerId: userId, slug } },
      create: {
        ownerId: userId,
        slug,
        name,
        description,
        githubUrl,
        official: false,
        featured: false,
        topics,
        readmeMd,
        routingRule,
      },
      update: {
        name,
        description,
        githubUrl,
        topics,
        readmeMd,
        routingRule,
      },
      select: { id: true },
    });
    await prisma.seat.deleteMany({ where: { packId: pack.id } });
    await prisma.seat.createMany({
      data: seats.map((item) => ({
        packId: pack.id,
        name: item.name,
        job: item.job,
        repeatsWhen: item.repeatsWhen,
        isDesk: item.isDesk,
        sortOrder: item.sortOrder,
        grokTemplateUrl: item.grokTemplateUrl,
      })),
    });
  } catch {
    return { error: "Could not save pack." };
  }

  const profile = await prisma.profile.findUnique({
    where: { id: userId },
    select: { githubLogin: true },
  });
  const owner = profile?.githubLogin;
  if (!owner) return { error: "Profile is missing a GitHub login." };

  revalidatePath("/");
  revalidatePath("/marketplace");
  revalidatePath("/search");
  revalidatePath(`/${owner}`);
  revalidatePath(`/${owner}/${slug}`);
  redirect(`/${owner}/${slug}`);
}

export async function toggleLike(packId: string, owner: string, slug: string) {
  const { userId, error } = await requireUser();
  if (!prisma || !userId) return { error: error ?? "Sign in to upvote." };

  try {
    const existing = await prisma.like.findUnique({
      where: { userId_packId: { userId, packId } },
    });
    if (existing) {
      await prisma.like.delete({
        where: { userId_packId: { userId, packId } },
      });
    } else {
      await prisma.like.create({ data: { packId, userId } });
    }
  } catch {
    return { error: "Could not update like." };
  }

  revalidatePath("/");
  revalidatePath(`/${owner}`);
  revalidatePath(`/${owner}/${slug}`);
  return { error: null };
}

export async function recordVisit(
  packId: string,
  owner: string,
  slug: string,
  source: VisitSource = "add_to_grok",
  seatName?: string
) {
  if (!prisma) return { error: "Catalog is not reachable." };
  try {
    await prisma.packVisit.create({
      data: {
        packId,
        packOwner: owner,
        packSlug: slug,
        source,
        seatName: seatName ?? null,
      },
    });
  } catch {
    return { error: "Catalog is not reachable." };
  }

  try {
    await prisma.pack.update({
      where: { id: packId },
      data: { installsCount: { increment: 1 } },
    });
  } catch {
    // Fallback catalog packs are not rows in packs.
  }

  revalidatePath("/");
  revalidatePath(`/${owner}`);
  revalidatePath(`/${owner}/${slug}`);
  return { error: null };
}
