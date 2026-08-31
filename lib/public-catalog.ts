import { seatsFromPacks, toPublicPack, type CatalogSeat, type PublicPack } from "@/lib/api-pack";
import {
  getPack,
  listPacks,
  listPacksByOwner,
  type CatalogQuery,
} from "@/lib/catalog";

export type PublicPackQuery = {
  q?: string;
  owner?: string;
  featured?: true;
};

function matchesQuery(
  pack: { name: string; description: string; slug: string; featured: boolean; seats: { name: string }[] },
  query: PublicPackQuery
): boolean {
  if (query.featured && !pack.featured) return false;
  if (!query.q) return true;
  const q = query.q.toLowerCase();
  const haystack = [pack.name, pack.description, pack.slug, ...pack.seats.map((seat) => seat.name)]
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
}

export async function listPublicPacks(query: PublicPackQuery = {}): Promise<PublicPack[]> {
  const catalogQuery: CatalogQuery = {
    q: query.owner ? undefined : query.q,
    featured: query.featured,
  };
  const packs = query.owner
    ? (await listPacksByOwner(query.owner)).filter((pack) => matchesQuery(pack, query))
    : await listPacks(catalogQuery);
  return packs.map((pack) => toPublicPack(pack));
}

export async function getPublicPack(owner: string, slug: string): Promise<PublicPack | null> {
  const pack = await getPack(owner, slug);
  if (!pack) return null;
  return toPublicPack(pack);
}

export type PublicSeatQuery = {
  q?: string;
};

function seatMatchesQuery(seat: CatalogSeat, q: string): boolean {
  const haystack = [seat.name, seat.job, seat.pack.name, seat.pack.owner]
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
}

export async function listPublicSeats(query: PublicSeatQuery = {}): Promise<CatalogSeat[]> {
  const packs = await listPacks();
  const seats = seatsFromPacks(packs);
  const q = query.q?.trim().toLowerCase();
  if (!q) return seats;
  return seats.filter((seat) => seatMatchesQuery(seat, q));
}
