import { logPrismaFailure, prisma } from "@/lib/prisma";
import {
  START_PERSONA_SLUGS,
  isStartPersonaSlug,
  type StartPersonaSlug,
} from "@/lib/start-here";

const USER_ID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type StartHereCategoryCount = {
  category: StartPersonaSlug;
  clicks: number;
};

export function categoryClickRow(
  category: string,
  userId: string | null
): { category: StartPersonaSlug; userId: string | null } | null {
  if (!isStartPersonaSlug(category)) return null;
  const signedIn = userId && USER_ID.test(userId) ? userId : null;
  return { category, userId: signedIn };
}

export function rankStartHereCategories(
  groups: ReadonlyArray<{ category: string; clicks: number }>
): StartHereCategoryCount[] {
  const totals = new Map<StartPersonaSlug, number>();
  for (const slug of START_PERSONA_SLUGS) totals.set(slug, 0);
  for (const group of groups) {
    if (!isStartPersonaSlug(group.category)) continue;
    if (!Number.isInteger(group.clicks) || group.clicks < 0) continue;
    totals.set(group.category, group.clicks);
  }
  return [...totals.entries()]
    .map(([category, clicks]) => ({ category, clicks }))
    .sort((a, b) => b.clicks - a.clicks || a.category.localeCompare(b.category));
}

export async function insertStartHereCategoryClick(
  category: StartPersonaSlug,
  userId: string | null
): Promise<boolean> {
  const row = categoryClickRow(category, userId);
  if (!row || !prisma) return false;
  try {
    await prisma.startHereClick.create({ data: row });
    return true;
  } catch (error) {
    logPrismaFailure("insertStartHereCategoryClick", error);
    return false;
  }
}

export async function loadStartHereCategoryCounts(): Promise<StartHereCategoryCount[]> {
  if (!prisma) return rankStartHereCategories([]);
  try {
    const groups = await prisma.startHereClick.groupBy({
      by: ["category"],
      _count: { _all: true },
    });
    return rankStartHereCategories(
      groups.map((row) => ({ category: row.category, clicks: row._count._all }))
    );
  } catch (error) {
    logPrismaFailure("loadStartHereCategoryCounts", error);
    return rankStartHereCategories([]);
  }
}
