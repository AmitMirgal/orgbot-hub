import {
  getFallbackPack,
  getFallbackProfile,
  listFallbackPacks,
  listFallbackPacksByOwner,
  listFallbackTopics,
  fallbackStats,
  type FallbackQuery,
} from "@/lib/fallback-catalog";
import { parseGrokTemplateUrl } from "@/lib/grok-url";
import {
  type Pack,
  type PackCard,
  type Profile,
  type Seat,
} from "@/lib/pack";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/supabase/server";
import { matchesSeatBand, type SeatBand } from "@/lib/topics";
import { withVisitCounts } from "@/lib/visits-store";

type ProfileRow = {
  id: string;
  githubLogin: string;
  name: string | null;
  avatarUrl: string | null;
  xHandle: string | null;
};

type SeatRow = {
  id: string;
  name: string;
  job: string;
  repeatsWhen: string | null;
  isDesk: boolean;
  sortOrder: number;
  grokTemplateUrl: string | null;
};

type PackRow = {
  id: string;
  slug: string;
  name: string;
  description: string;
  githubUrl: string | null;
  official: boolean;
  featured: boolean;
  topics: string[];
  likesCount: number;
  installsCount: number;
  readmeMd: string | null;
  routingRule: string;
  owner: ProfileRow | null;
  seats: SeatRow[];
};

export type CatalogQuery = FallbackQuery;

export class CatalogUnavailableError extends Error {
  constructor(message = "Catalog is not reachable.") {
    super(message);
    this.name = "CatalogUnavailableError";
  }
}

function mapProfile(row: ProfileRow): Profile {
  return {
    id: row.id,
    githubLogin: row.githubLogin,
    name: row.name,
    avatarUrl: row.avatarUrl,
    xHandle: row.xHandle,
  };
}

function mapSeat(row: SeatRow): Seat {
  return {
    id: row.id,
    name: row.name,
    job: row.job,
    repeatsWhen: row.repeatsWhen,
    isDesk: row.isDesk,
    sortOrder: row.sortOrder,
    grokTemplateUrl: parseGrokTemplateUrl(row.grokTemplateUrl),
  };
}

function mapPack(row: PackRow): Pack | null {
  if (!row.owner) return null;
  const seats = row.seats
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(mapSeat);
  const installs = Number.isFinite(row.installsCount) ? row.installsCount : 0;
  return {
    id: row.id,
    owner: mapProfile(row.owner),
    slug: row.slug,
    name: row.name,
    description: row.description,
    githubUrl: row.githubUrl,
    official: row.official,
    featured: row.featured,
    topics: row.topics ?? [],
    likesCount: row.likesCount,
    installsCount: installs,
    visitsCount: installs,
    readmeMd: row.readmeMd,
    routingRule: row.routingRule,
    seats,
  };
}

function toCard(pack: Pack): PackCard {
  const { readmeMd: _readme, routingRule: _rule, ...card } = pack;
  return card;
}

export type CatalogRead<T> =
  | { status: "ok"; data: T }
  | { status: "offline"; message?: string };

export async function readCatalog<T>(load: () => Promise<T>): Promise<CatalogRead<T>> {
  try {
    return { status: "ok", data: await load() };
  } catch (error) {
    const message =
      error instanceof CatalogUnavailableError ? error.message : undefined;
    return { status: "offline", message };
  }
}

const packInclude = {
  owner: true,
  seats: { orderBy: { sortOrder: "asc" as const } },
};

function applySeatBand(packs: Pack[], seatBand?: SeatBand): Pack[] {
  if (!seatBand) return packs;
  return packs.filter((pack) => matchesSeatBand(pack.seats.length, seatBand));
}

function sortPacks(packs: Pack[]): Pack[] {
  return packs.slice().sort((a, b) => {
    if (a.featured !== b.featured) return Number(b.featured) - Number(a.featured);
    if (a.installsCount !== b.installsCount) return b.installsCount - a.installsCount;
    return a.name.localeCompare(b.name);
  });
}

async function fromPrismaOrFallback<T>(
  live: () => Promise<T>,
  fallback: () => T | Promise<T>
): Promise<T> {
  if (!prisma) return fallback();
  try {
    return await live();
  } catch {
    return fallback();
  }
}

export async function listPacks(query: CatalogQuery = {}): Promise<PackCard[]> {
  return fromPrismaOrFallback(async () => {
    if (!prisma) throw new CatalogUnavailableError();
    const q = query.q?.trim();
    const rows = await prisma.pack.findMany({
      where: {
        ...(query.featured ? { featured: true } : {}),
        ...(query.topic ? { topics: { has: query.topic } } : {}),
        ...(q
          ? {
              OR: [
                { name: { contains: q, mode: "insensitive" } },
                { description: { contains: q, mode: "insensitive" } },
                { slug: { contains: q, mode: "insensitive" } },
                { seats: { some: { name: { contains: q, mode: "insensitive" } } } },
              ],
            }
          : {}),
      },
      include: packInclude,
    });
    const packs = applySeatBand(
      sortPacks(rows.map(mapPack).filter((pack): pack is Pack => pack !== null)),
      query.seatBand
    );
    return packs.map(toCard);
  }, () => listFallbackPacks(query)).then((packs) =>
    withVisitCounts(packs.length > 0 ? packs : listFallbackPacks(query))
  );
}

export async function getPack(owner: string, slug: string): Promise<Pack | null> {
  return fromPrismaOrFallback(async () => {
    if (!prisma) throw new CatalogUnavailableError();
    const row = await prisma.pack.findFirst({
      where: { slug, owner: { githubLogin: owner } },
      include: packInclude,
    });
    if (!row) return null;
    return mapPack(row);
  }, () => getFallbackPack(owner, slug)).then(async (pack) => {
    const resolved = pack ?? getFallbackPack(owner, slug);
    if (!resolved) return null;
    const [overlaid] = await withVisitCounts([resolved]);
    return overlaid;
  });
}

export async function getProfile(login: string): Promise<Profile | null> {
  return fromPrismaOrFallback(async () => {
    if (!prisma) throw new CatalogUnavailableError();
    const row = await prisma.profile.findUnique({
      where: { githubLogin: login },
    });
    if (!row) return null;
    return mapProfile(row);
  }, () => getFallbackProfile(login)).then(
    (profile) => profile ?? getFallbackProfile(login)
  );
}

export async function listPacksByOwner(login: string): Promise<PackCard[]> {
  return fromPrismaOrFallback(async () => {
    if (!prisma) throw new CatalogUnavailableError();
    const rows = await prisma.pack.findMany({
      where: { owner: { githubLogin: login } },
      include: packInclude,
    });
    return sortPacks(
      rows.map(mapPack).filter((pack): pack is Pack => pack !== null)
    ).map(toCard);
  }, () => listFallbackPacksByOwner(login)).then((packs) =>
    withVisitCounts(packs.length > 0 ? packs : listFallbackPacksByOwner(login))
  );
}

export async function listTopics(): Promise<{ topic: string; count: number }[]> {
  const packs = await listPacks();
  if (packs.length === 0) return listFallbackTopics();
  const counts = new Map<string, number>();
  for (const pack of packs) {
    for (const topic of pack.topics) {
      counts.set(topic, (counts.get(topic) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([topic, count]) => ({ topic, count }))
    .sort((a, b) => b.count - a.count || a.topic.localeCompare(b.topic));
}

export async function catalogStats(): Promise<{ packs: number; seats: number }> {
  const packs = await listPacks();
  if (packs.length === 0) return fallbackStats();
  return {
    packs: packs.length,
    seats: packs.reduce((sum, pack) => sum + pack.seats.length, 0),
  };
}

export async function relatedPacks(pack: Pack, limit = 3): Promise<PackCard[]> {
  const all = await listPacks();
  return all
    .filter((item) => item.id !== pack.id)
    .filter((item) => item.topics.some((topic) => pack.topics.includes(topic)))
    .slice(0, limit);
}

export async function currentProfile(): Promise<Profile | null> {
  const { userId } = await getSessionUserId();
  if (!userId || !prisma) return null;
  try {
    const row = await prisma.profile.findUnique({ where: { id: userId } });
    if (!row) return null;
    return mapProfile(row);
  } catch {
    return null;
  }
}

export async function hasLiked(packId: string, userId: string | null): Promise<boolean> {
  if (!userId || !prisma) return false;
  try {
    const row = await prisma.like.findUnique({
      where: { userId_packId: { userId, packId } },
    });
    return Boolean(row);
  } catch {
    return false;
  }
}
