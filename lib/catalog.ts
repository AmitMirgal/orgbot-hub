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
import { matchesSeatBand, type SeatBand } from "@/lib/topics";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient, getSessionUserId } from "@/lib/supabase/server";
import { withVisitCounts } from "@/lib/visits-store";

type ProfileRow = {
  id: string;
  github_login: string;
  name: string | null;
  avatar_url: string | null;
  x_handle: string | null;
};

type SeatRow = {
  id: string;
  name: string;
  job: string;
  repeats_when: string | null;
  is_desk: boolean;
  sort_order: number;
  grok_template_url: string | null;
};

type PackRow = {
  id: string;
  slug: string;
  name: string;
  description: string;
  github_url: string | null;
  official: boolean;
  featured: boolean;
  topics: string[] | null;
  likes_count: number;
  installs_count: number;
  readme_md: string | null;
  routing_rule: string;
  owner: ProfileRow | ProfileRow[] | null;
  seats: SeatRow[] | null;
};

export type CatalogQuery = FallbackQuery;

export class CatalogUnavailableError extends Error {
  constructor(message = "Catalog is not reachable.") {
    super(message);
    this.name = "CatalogUnavailableError";
  }
}

function asOwner(owner: PackRow["owner"]): ProfileRow | null {
  if (!owner) return null;
  return Array.isArray(owner) ? (owner[0] ?? null) : owner;
}

function mapProfile(row: ProfileRow): Profile {
  return {
    id: row.id,
    githubLogin: row.github_login,
    name: row.name,
    avatarUrl: row.avatar_url,
    xHandle: row.x_handle,
  };
}

function mapSeat(row: SeatRow): Seat {
  return {
    id: row.id,
    name: row.name,
    job: row.job,
    repeatsWhen: row.repeats_when,
    isDesk: row.is_desk,
    sortOrder: row.sort_order,
    grokTemplateUrl: parseGrokTemplateUrl(row.grok_template_url),
  };
}

function mapPack(row: PackRow): Pack | null {
  const owner = asOwner(row.owner);
  if (!owner) return null;
  const seats = (row.seats ?? [])
    .slice()
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(mapSeat);
  return {
    id: row.id,
    owner: mapProfile(owner),
    slug: row.slug,
    name: row.name,
    description: row.description,
    githubUrl: row.github_url,
    official: row.official,
    featured: row.featured,
    topics: row.topics ?? [],
    likesCount: row.likes_count,
    installsCount: row.installs_count,
    visitsCount: Number.isFinite(row.installs_count) ? row.installs_count : 0,
    readmeMd: row.readme_md,
    routingRule: row.routing_rule,
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

const packSelect = `
  id, slug, name, description, github_url, official, featured,
  topics, likes_count, installs_count, readme_md, routing_rule,
  owner:profiles!owner_id (id, github_login, name, avatar_url, x_handle),
  seats (id, name, job, repeats_when, is_desk, sort_order, grok_template_url)
`;

function escapeIlike(value: string): string {
  return value.replace(/[%_,()]/g, " ").trim();
}

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

async function fromSupabaseOrFallback<T>(
  live: () => Promise<T>,
  fallback: () => T | Promise<T>
): Promise<T> {
  if (!isSupabaseConfigured()) return fallback();
  try {
    return await live();
  } catch {
    return fallback();
  }
}

export async function listPacks(query: CatalogQuery = {}): Promise<PackCard[]> {
  return fromSupabaseOrFallback(async () => {
  const supabase = await createClient();
  if (!supabase) throw new CatalogUnavailableError();

  let request = supabase.from("packs").select(packSelect);

  if (query.featured) request = request.eq("featured", true);
  if (query.topic) request = request.contains("topics", [query.topic]);

  if (query.q) {
    const q = escapeIlike(query.q);
    if (q) {
      const { data: seatHits, error: seatError } = await supabase
        .from("seats")
        .select("pack_id")
        .ilike("name", `%${q}%`);
      if (seatError) throw new CatalogUnavailableError(seatError.message);
      const seatPackIds = [...new Set((seatHits ?? []).map((row) => row.pack_id))];
      const parts = [
        `name.ilike.%${q}%`,
        `description.ilike.%${q}%`,
        `slug.ilike.%${q}%`,
      ];
      if (seatPackIds.length > 0) {
        parts.push(`id.in.(${seatPackIds.join(",")})`);
      }
      request = request.or(parts.join(","));
    }
  }

  const { data, error } = await request;
  if (error) throw new CatalogUnavailableError(error.message);
  const packs = applySeatBand(
    sortPacks(
      (data as PackRow[])
        .map(mapPack)
        .filter((pack): pack is Pack => pack !== null)
    ),
    query.seatBand
  );
  return packs.map(toCard);
  }, () => listFallbackPacks(query)).then((packs) =>
    withVisitCounts(packs.length > 0 ? packs : listFallbackPacks(query))
  );
}

export async function getPack(owner: string, slug: string): Promise<Pack | null> {
  return fromSupabaseOrFallback(async () => {
  const supabase = await createClient();
  if (!supabase) throw new CatalogUnavailableError();

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id")
    .eq("github_login", owner)
    .maybeSingle();
  if (profileError) throw new CatalogUnavailableError(profileError.message);
  if (!profile) return null;

  const { data, error } = await supabase
    .from("packs")
    .select(packSelect)
    .eq("owner_id", profile.id)
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new CatalogUnavailableError(error.message);
  if (!data) return null;
  return mapPack(data as PackRow);
  }, () => getFallbackPack(owner, slug)).then(async (pack) => {
    const resolved = pack ?? getFallbackPack(owner, slug);
    if (!resolved) return null;
    const [overlaid] = await withVisitCounts([resolved]);
    return overlaid;
  });
}

export async function getProfile(login: string): Promise<Profile | null> {
  return fromSupabaseOrFallback(async () => {
  const supabase = await createClient();
  if (!supabase) throw new CatalogUnavailableError();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, github_login, name, avatar_url, x_handle")
    .eq("github_login", login)
    .maybeSingle();
  if (error) throw new CatalogUnavailableError(error.message);
  if (!data) return null;
  return mapProfile(data as ProfileRow);
  }, () => getFallbackProfile(login)).then(
    (profile) => profile ?? getFallbackProfile(login)
  );
}

export async function listPacksByOwner(login: string): Promise<PackCard[]> {
  return fromSupabaseOrFallback(async () => {
  const profile = await getProfile(login);
  if (!profile) return [];
  const supabase = await createClient();
  if (!supabase) throw new CatalogUnavailableError();
  const { data, error } = await supabase
    .from("packs")
    .select(packSelect)
    .eq("owner_id", profile.id);
  if (error) throw new CatalogUnavailableError(error.message);
  return sortPacks(
    (data as PackRow[])
      .map(mapPack)
      .filter((pack): pack is Pack => pack !== null)
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
  const { supabase, userId } = await getSessionUserId();
  if (!supabase || !userId) return null;
  const { data } = await supabase
    .from("profiles")
    .select("id, github_login, name, avatar_url, x_handle")
    .eq("id", userId)
    .maybeSingle();
  if (!data) return null;
  return mapProfile(data as ProfileRow);
}

export async function hasLiked(packId: string, userId: string | null): Promise<boolean> {
  if (!userId) return false;
  const supabase = await createClient();
  if (!supabase) return false;
  const { data } = await supabase
    .from("likes")
    .select("pack_id")
    .eq("pack_id", packId)
    .eq("user_id", userId)
    .maybeSingle();
  return Boolean(data);
}
