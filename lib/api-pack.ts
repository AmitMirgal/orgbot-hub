import { z } from "zod";
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

export function visitsLabel(visitsCount: number): string {
  return `${formatCount(visitsCount)} visits`;
}

export function assertNoInstallsCount(value: unknown): void {
  if (!value || typeof value !== "object") return;
  if ("installsCount" in value) {
    throw new Error("public pack must not include installsCount");
  }
}
