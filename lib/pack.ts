import { parseGrokTemplateUrl } from "@/lib/grok-url";

export const DEFAULT_ROUTING_RULE =
  "Spawn a seat when the job repeats; random stays at the desk.";

export type Profile = {
  id: string;
  githubLogin: string;
  name: string | null;
  avatarUrl: string | null;
  xHandle: string | null;
};

export type Seat = {
  id: string;
  name: string;
  job: string;
  repeatsWhen: string | null;
  isDesk: boolean;
  sortOrder: number;
  grokTemplateUrl: string | null;
};

export type Pack = {
  id: string;
  owner: Profile;
  slug: string;
  name: string;
  description: string;
  githubUrl: string | null;
  official: boolean;
  featured: boolean;
  topics: string[];
  likesCount: number;
  installsCount: number;
  visitsCount: number;
  readmeMd: string | null;
  routingRule: string;
  seats: Seat[];
};

export type PackCard = Omit<Pack, "readmeMd" | "routingRule">;

export function deskOf(pack: { seats: Seat[] }): Seat | undefined {
  return pack.seats.find((seat) => seat.isDesk) ?? pack.seats[0];
}

export function namedSeats(pack: { seats: Seat[] }): Seat[] {
  return pack.seats
    .filter((seat) => !seat.isDesk)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function orderedSeats(pack: { seats: Seat[] }): Seat[] {
  return pack.seats.slice().sort((a, b) => a.sortOrder - b.sortOrder);
}

export function rosterNames(pack: { seats: Seat[] }): string[] {
  return orderedSeats(pack).map((item) => item.name);
}

export function packHref(pack: { owner: { githubLogin: string }; slug: string }): string {
  return `/${pack.owner.githubLogin}/${pack.slug}`;
}

export function authorHref(login: string): string {
  return `/${login}`;
}

export function ownerHandle(pack: { owner: Profile }): string {
  return `@${pack.owner.githubLogin}`;
}

export function installableUrl(raw: string | null | undefined): string | null {
  return parseGrokTemplateUrl(raw);
}

export function formatCount(n: number): string {
  if (n < 1000) return String(n);
  if (n < 10_000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  if (n < 1_000_000) return `${Math.round(n / 1000)}k`;
  return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}m`;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
