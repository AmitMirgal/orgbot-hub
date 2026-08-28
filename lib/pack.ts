export const DEFAULT_RULE =
  "spawn a seat when the job repeats; random stays at the desk";

export type Profile = {
  id: string;
  githubLogin: string;
  name: string | null;
  avatarUrl: string | null;
};

export type Seat = {
  id: string;
  name: string;
  job: string;
  repeatsWhen: string | null;
  isDesk: boolean;
  sortOrder: number;
};

export type Pack = {
  id: string;
  owner: Profile;
  slug: string;
  name: string;
  description: string;
  githubUrl: string | null;
  license: string | null;
  official: boolean;
  topics: string[];
  runtimes: string[];
  likesCount: number;
  clonesCount: number;
  readmeMd: string | null;
  rule: string;
  seats: Seat[];
};

export type PackCard = Omit<Pack, "readmeMd" | "rule">;

export function deskOf(pack: { seats: Seat[] }): Seat | undefined {
  return pack.seats.find((seat) => seat.isDesk);
}

export function namedSeats(pack: { seats: Seat[] }): Seat[] {
  return pack.seats
    .filter((seat) => !seat.isDesk)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function botCount(pack: { seats: Seat[] }): number {
  return pack.seats.length;
}

export function packHref(pack: { owner: { githubLogin: string }; slug: string }): string {
  return `/${pack.owner.githubLogin}/${pack.slug}`;
}

export function authorHref(login: string): string {
  return `/${login}`;
}

export function slugifySeat(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function cloneNpx(owner: string, slug: string): string {
  return `npx orgbots add ${owner}/${slug}`;
}

export function cloneGit(githubUrl: string): string {
  return `git clone ${githubUrl}`;
}

export function packFiles(pack: { seats: Seat[] }): string[] {
  const seatFiles = [...pack.seats]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((seat) => `seats/${slugifySeat(seat.name)}.md`);
  return ["orgbots.yaml", "README.md", ...seatFiles];
}

export function formatCount(n: number): string {
  if (n < 1000) return String(n);
  if (n < 10_000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  if (n < 1_000_000) return `${Math.round(n / 1000)}k`;
  return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}m`;
}
