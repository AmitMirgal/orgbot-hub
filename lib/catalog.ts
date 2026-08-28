import { createClient, getSessionUserId } from "@/lib/supabase/server";
import {
  type Pack,
  type PackCard,
  type Profile,
  type Seat,
} from "@/lib/pack";

type ProfileRow = {
  id: string;
  github_login: string;
  name: string | null;
  avatar_url: string | null;
};

type SeatRow = {
  id: string;
  name: string;
  job: string;
  repeats_when: string | null;
  is_desk: boolean;
  sort_order: number;
};

type PackRow = {
  id: string;
  slug: string;
  name: string;
  description: string;
  github_url: string | null;
  license: string | null;
  official: boolean;
  topics: string[] | null;
  runtimes: string[] | null;
  likes_count: number;
  clones_count: number;
  readme_md: string | null;
  rule: string;
  owner: ProfileRow | ProfileRow[] | null;
  seats: SeatRow[] | null;
};

export type CatalogQuery = {
  q?: string;
  topic?: string;
  official?: boolean;
};

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
    license: row.license,
    official: row.official,
    topics: row.topics ?? [],
    runtimes: row.runtimes ?? [],
    likesCount: row.likes_count,
    clonesCount: row.clones_count,
    readmeMd: row.readme_md,
    rule: row.rule,
    seats,
  };
}

function toCard(pack: Pack): PackCard {
  return {
    id: pack.id,
    owner: pack.owner,
    slug: pack.slug,
    name: pack.name,
    description: pack.description,
    githubUrl: pack.githubUrl,
    license: pack.license,
    official: pack.official,
    topics: pack.topics,
    runtimes: pack.runtimes,
    likesCount: pack.likesCount,
    clonesCount: pack.clonesCount,
    seats: pack.seats,
  };
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
  id, slug, name, description, github_url, license, official,
  topics, runtimes, likes_count, clones_count, readme_md, rule,
  owner:profiles!owner_id (id, github_login, name, avatar_url),
  seats (id, name, job, repeats_when, is_desk, sort_order)
`;

export async function listPacks(query: CatalogQuery = {}): Promise<PackCard[]> {
  const supabase = await createClient();
  if (!supabase) throw new CatalogUnavailableError();

  let request = supabase
    .from("packs")
    .select(packSelect)
    .order("clones_count", { ascending: false })
    .order("name", { ascending: true });

  if (query.official) {
    request = request.eq("official", true);
  }
  if (query.topic) {
    request = request.contains("topics", [query.topic]);
  }
  if (query.q) {
    const q = query.q.replace(/[%_,()]/g, " ").trim();
    if (q) {
      request = request.or(
        `name.ilike.%${q}%,description.ilike.%${q}%,slug.ilike.%${q}%`
      );
    }
  }

  const { data, error } = await request;
  if (error) throw new CatalogUnavailableError(error.message);
  return (data as PackRow[]).map(mapPack).filter((pack): pack is Pack => pack !== null).map(toCard);
}

export async function getPack(owner: string, slug: string): Promise<Pack | null> {
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
}

export async function getProfile(login: string): Promise<Profile | null> {
  const supabase = await createClient();
  if (!supabase) throw new CatalogUnavailableError();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, github_login, name, avatar_url")
    .eq("github_login", login)
    .maybeSingle();
  if (error) throw new CatalogUnavailableError(error.message);
  if (!data) return null;
  return mapProfile(data as ProfileRow);
}

export async function listPacksByOwner(login: string): Promise<PackCard[]> {
  const profile = await getProfile(login);
  if (!profile) return [];
  const supabase = await createClient();
  if (!supabase) throw new CatalogUnavailableError();
  const { data, error } = await supabase
    .from("packs")
    .select(packSelect)
    .eq("owner_id", profile.id)
    .order("clones_count", { ascending: false })
    .order("name", { ascending: true });
  if (error) throw new CatalogUnavailableError(error.message);
  return (data as PackRow[]).map(mapPack).filter((pack): pack is Pack => pack !== null).map(toCard);
}

export async function listTopics(): Promise<{ topic: string; count: number }[]> {
  const packs = await listPacks();
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

export async function currentProfile(): Promise<Profile | null> {
  const { supabase, userId } = await getSessionUserId();
  if (!supabase || !userId) return null;
  const { data } = await supabase
    .from("profiles")
    .select("id, github_login, name, avatar_url")
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
