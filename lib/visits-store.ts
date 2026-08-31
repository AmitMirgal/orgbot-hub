import { logPrismaFailure, prisma } from "@/lib/prisma";
import {
  addVisitCount,
  applyVisitCounts,
  emptyVisitCounts,
  type VisitCounts,
} from "@/lib/visits-count";

async function loadVisitCounts(): Promise<VisitCounts> {
  if (!prisma) return emptyVisitCounts();
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
  } catch (error) {
    logPrismaFailure("withVisitCounts", error);
    return emptyVisitCounts();
  }
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
