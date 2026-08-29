export const TOPICS = [
  "founder",
  "clinic",
  "saas",
  "agency",
  "developer",
  "media",
] as const;

export type Topic = (typeof TOPICS)[number];

export type SeatBand = "1" | "2-3" | "4+";

export function isTopic(value: string): value is Topic {
  return (TOPICS as readonly string[]).includes(value);
}

export function matchesSeatBand(count: number, band?: SeatBand): boolean {
  if (!band) return true;
  if (band === "1") return count === 1;
  if (band === "2-3") return count === 2 || count === 3;
  return count >= 4;
}

export function parseSeatBand(value: string | undefined): SeatBand | undefined {
  if (value === "1" || value === "2-3" || value === "4+") return value;
  return undefined;
}
