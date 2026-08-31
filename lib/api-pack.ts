import { z } from "zod";
import { parseGrokTemplateUrl } from "@/lib/grok-url";
import {
  formatCount,
  installableUrl,
  packHref,
  type Pack,
  type PackCard,
} from "@/lib/pack";

export type PublicSeat = {
  name: string;
  job: string;
  isDesk: boolean;
  sortOrder: number;
  grokTemplateUrl: string | null;
};

export type CatalogSeatPack = {
  owner: string;
  slug: string;
  name: string;
  href: string;
};

export type CatalogAuthor = {
  githubLogin: string;
  name: string | null;
  avatarUrl: string | null;
  xHandle: string | null;
};

export type CatalogSeat = {
  id: string;
  name: string;
  job: string;
  isDesk: boolean;
  grokTemplateUrl: string;
  packId: string;
  pack: CatalogSeatPack;
  author: CatalogAuthor;
};

export type PublicPack = {
  owner: string;
  slug: string;
  name: string;
  description: string;
  githubUrl: string | null;
  official: boolean;
  featured: boolean;
  topics: string[];
  href: string;
  visitsCount: number;
  seats: PublicSeat[];
};

export const publicSeatSchema = z.object({
  name: z.string(),
  job: z.string(),
  isDesk: z.boolean(),
  sortOrder: z.number(),
  grokTemplateUrl: z.string().nullable(),
});

export const publicPackSchema = z.object({
  owner: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  githubUrl: z.string().nullable(),
  official: z.boolean(),
  featured: z.boolean(),
  topics: z.array(z.string()),
  href: z.string(),
  visitsCount: z.number().int().nonnegative(),
  seats: z.array(publicSeatSchema),
});

export const catalogAuthorSchema = z.object({
  githubLogin: z.string(),
  name: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  xHandle: z.string().nullable(),
});

export const catalogSeatSchema = z.object({
  id: z.string(),
  name: z.string(),
  job: z.string(),
  isDesk: z.boolean(),
  grokTemplateUrl: z.string(),
  packId: z.string(),
  pack: z.object({
    owner: z.string(),
    slug: z.string(),
    name: z.string(),
    href: z.string(),
  }),
  author: catalogAuthorSchema.optional(),
});

export function catalogAuthorFromOwner(
  owner: {
    githubLogin: string;
    name?: string | null;
    avatarUrl?: string | null;
    xHandle?: string | null;
  },
  author?: Partial<CatalogAuthor> | null
): CatalogAuthor {
  return {
    githubLogin: author?.githubLogin ?? owner.githubLogin,
    name: author?.name ?? owner.name ?? null,
    avatarUrl: author?.avatarUrl ?? owner.avatarUrl ?? null,
    xHandle: author?.xHandle ?? owner.xHandle ?? null,
  };
}

export function authorAvatarSrc(author: CatalogAuthor): string {
  return author.avatarUrl ?? `https://github.com/${author.githubLogin}.png`;
}

export function publicXHandle(handle: string | null | undefined): string | null {
  if (!handle) return null;
  const trimmed = handle.trim().replace(/^@+/, "");
  return trimmed.length > 0 ? trimmed : null;
}

export function toPublicPack(pack: Pack | PackCard): PublicPack {
  return {
    owner: pack.owner.githubLogin,
    slug: pack.slug,
    name: pack.name,
    description: pack.description,
    githubUrl: pack.githubUrl,
    official: pack.official,
    featured: pack.featured,
    topics: pack.topics,
    href: packHref(pack),
    visitsCount: pack.visitsCount,
    seats: pack.seats.map((seat) => ({
      name: seat.name,
      job: seat.job,
      isDesk: seat.isDesk,
      sortOrder: seat.sortOrder,
      grokTemplateUrl: installableUrl(seat.grokTemplateUrl),
    })),
  };
}

export function toCatalogSeat(
  pack: Pack | PackCard,
  seat: Pack["seats"][number]
): CatalogSeat | null {
  const grokTemplateUrl = parseGrokTemplateUrl(seat.grokTemplateUrl);
  if (!grokTemplateUrl) return null;
  return {
    id: seat.id,
    name: seat.name,
    job: seat.job,
    isDesk: seat.isDesk,
    grokTemplateUrl,
    packId: pack.id,
    pack: {
      owner: pack.owner.githubLogin,
      slug: pack.slug,
      name: pack.name,
      href: packHref(pack),
    },
    author: catalogAuthorFromOwner(pack.owner),
  };
}

export function parseCatalogSeat(value: unknown): CatalogSeat | null {
  const parsed = catalogSeatSchema.safeParse(value);
  if (!parsed.success) return null;
  const grokTemplateUrl = parseGrokTemplateUrl(parsed.data.grokTemplateUrl);
  if (!grokTemplateUrl) return null;
  const { author: rawAuthor, ...rest } = parsed.data;
  return {
    ...rest,
    grokTemplateUrl,
    author: catalogAuthorFromOwner(
      { githubLogin: rest.pack.owner },
      rawAuthor
    ),
  };
}

export function seatsFromPacks(packs: Array<Pack | PackCard>): CatalogSeat[] {
  const seats: CatalogSeat[] = [];
  for (const pack of packs) {
    for (const seat of pack.seats) {
      const catalogSeat = toCatalogSeat(pack, seat);
      if (catalogSeat) seats.push(catalogSeat);
    }
  }
  return seats;
}

export function visitsLabel(visitsCount: number): string {
  return `${formatCount(visitsCount)} visits`;
}

export function assertNoInstallsCount(value: unknown): void {
  if (!value || typeof value !== "object") return;
  if ("installsCount" in value) {
    throw new Error("public pack must not include installsCount");
  }
}
