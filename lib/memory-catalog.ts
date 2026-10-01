import { seatsFromPacks, toPublicPack, type CatalogSeat, type PublicPack } from "@/lib/api-pack";
import { listFallbackPacks, listFallbackPacksByOwner } from "@/lib/fallback-catalog";

export type MemoryPackQuery = {
  owner?: string;
  featured?: true;
};

export function listMemoryPacks(query: MemoryPackQuery = {}): PublicPack[] {
  const packs = query.owner
    ? listFallbackPacksByOwner(query.owner)
    : listFallbackPacks();
  const visible = query.featured ? packs.filter((pack) => pack.featured) : packs;
  return visible.map((pack) => toPublicPack(pack));
}

export function listMemorySeats(): CatalogSeat[] {
  return seatsFromPacks(listFallbackPacks());
}
