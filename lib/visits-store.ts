import { prisma } from "@/lib/prisma";
import {
  addVisitCount,
  applyVisitCounts,
  emptyVisitCounts,
  type VisitCounts,
} from "@/lib/visits-count";

async function loadVisitCounts(): Promise<VisitCounts | null> {
  if (!prisma) return null;
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
    return null;
  }
}

export async function withVisitCounts<T extends {
  id: string;
  owner: { githubLogin: string };
  slug: string;
  visitsCount: number;
}>(packs: T[]): Promise<T[]> {
  if (packs.length === 0) return packs;
  const counts = await loadVisitCounts();
  if (!counts) return packs;
  return applyVisitCounts(packs, counts);
}
