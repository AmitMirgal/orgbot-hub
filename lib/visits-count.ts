export type VisitCounts = {
  byId: Map<string, number>;
  byOwnerSlug: Map<string, number>;
};

type PackVisits = {
  id: string;
  owner: { githubLogin: string };
  slug: string;
  visitsCount: number;
};

export function ownerSlugKey(owner: string, slug: string): string {
  return `${owner.trim().toLowerCase()}/${slug.trim().toLowerCase()}`;
}

export function emptyVisitCounts(): VisitCounts {
  return { byId: new Map(), byOwnerSlug: new Map() };
}

export function addVisitCount(
  counts: VisitCounts,
  packId: string,
  owner: string,
  slug: string,
  n: number
) {
  if (n <= 0) return;
  counts.byId.set(packId, (counts.byId.get(packId) ?? 0) + n);
  const key = ownerSlugKey(owner, slug);
  counts.byOwnerSlug.set(key, (counts.byOwnerSlug.get(key) ?? 0) + n);
}

export function addVisitRow(
  counts: VisitCounts,
  packId: string,
  owner: string,
  slug: string
) {
  addVisitCount(counts, packId, owner, slug, 1);
}

export function applyVisitCounts<T extends PackVisits>(
  packs: T[],
  counts: VisitCounts
): T[] {
  return packs.map((pack) => {
    const raw =
      counts.byOwnerSlug.get(ownerSlugKey(pack.owner.githubLogin, pack.slug)) ??
      counts.byId.get(pack.id) ??
      0;
    const visitsCount = Number.isFinite(raw) ? raw : 0;
    return { ...pack, visitsCount };
  });
}

export function sortPacksByVisits<
  T extends { featured?: boolean; visitsCount: number; name: string },
>(packs: T[]): T[] {
  return packs.slice().sort((a, b) => {
    if (Boolean(a.featured) !== Boolean(b.featured)) {
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    }
    if (a.visitsCount !== b.visitsCount) return b.visitsCount - a.visitsCount;
    return a.name.localeCompare(b.name);
  });
}
