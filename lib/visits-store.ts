import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import {
  addVisitCount,
  addVisitRow,
  applyVisitCounts,
  emptyVisitCounts,
  type VisitCounts,
} from "@/lib/visits-count";

async function loadVisitCountsFromSupabase(): Promise<VisitCounts | null> {
  const supabase = await createClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("pack_visits")
    .select("pack_id, pack_owner, pack_slug");
  if (error || !data) return null;
  const counts = emptyVisitCounts();
  for (const row of data) {
    addVisitRow(
      counts,
      String(row.pack_id),
      String(row.pack_owner),
      String(row.pack_slug)
    );
  }
  return counts;
}

async function loadVisitCounts(): Promise<VisitCounts> {
  if (prisma) {
    try {
      const groups = await prisma.packVisit.groupBy({
        by: ["packId", "packOwner", "packSlug"],
        _count: { _all: true },
      });
      const counts = emptyVisitCounts();
      for (const row of groups) {
        addVisitCount(
          counts,
          row.packId,
          row.packOwner,
          row.packSlug,
          row._count._all
        );
      }
      return counts;
    } catch {
      // Pooler/schema miss — still try the public table via supabase-js.
    }
  }
  return (await loadVisitCountsFromSupabase()) ?? emptyVisitCounts();
}

export async function withVisitCounts<T extends {
  id: string;
  owner: { githubLogin: string };
  slug: string;
  visitsCount: number;
}>(packs: T[]): Promise<T[]> {
  if (packs.length === 0) return packs;
  return applyVisitCounts(packs, await loadVisitCounts());
}
