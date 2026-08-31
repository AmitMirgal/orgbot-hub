import { parseGrokTemplateUrl } from "@/lib/grok-url";
import type { CatalogSeat } from "@/lib/api-pack";

const STOP = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "plus",
  "with",
  "for",
  "need",
  "want",
  "my",
  "our",
  "team",
  "bot",
  "bots",
  "i",
  "to",
  "of",
  "me",
]);

export type MixOptions = {
  limit?: number;
  allowMultipleDesks?: boolean;
};

function tokens(value: string): string[] {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 1 && !STOP.has(token));
}

export function parseRequirementJobs(text: string): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  const parts = trimmed
    .split(/\s*(?:\+|plus|,|&|\band\b)\s*/i)
    .map((part) =>
      part
        .replace(/^(?:i\s+need|i\s+want|need|want|please|a|an|the)\s+/i, "")
        .trim()
    )
    .filter((part) => part.length > 0 && !/^(?:i|need|want|please)$/i.test(part));
  return parts.length > 0 ? parts : [trimmed];
}

function scoreSeat(seat: CatalogSeat, jobs: string[]): number {
  const hayTokens = tokens(`${seat.name} ${seat.job} ${seat.pack.name} ${seat.pack.owner}`);
  const hay = hayTokens.join(" ");
  const haySet = new Set(hayTokens);
  let score = 0;
  for (const job of jobs) {
    const jobTokens = tokens(job);
    if (jobTokens.length === 0) continue;
    const phrase = jobTokens.join(" ");
    if (hay.includes(phrase)) score += 4 + jobTokens.length;
    for (const token of jobTokens) {
      if (haySet.has(token)) score += 2;
      else if ([...haySet].some((item) => item.includes(token) || token.includes(item))) {
        score += 1;
      }
    }
    if (seat.isDesk && jobTokens.includes("desk")) score += 2;
  }
  return score;
}

function catalogOnly(seats: CatalogSeat[]): CatalogSeat[] {
  const unique = new Map<string, CatalogSeat>();
  for (const seat of seats) {
    const grokTemplateUrl = parseGrokTemplateUrl(seat.grokTemplateUrl);
    if (!grokTemplateUrl) continue;
    if (unique.has(grokTemplateUrl)) continue;
    unique.set(grokTemplateUrl, { ...seat, grokTemplateUrl });
  }
  return [...unique.values()];
}

function wantsMoreThanSix(jobs: string[]): boolean {
  return jobs.some((job) => /\b(?:more than 6|more than six|all seats|as many)\b/i.test(job));
}

function wantsMultipleDesks(jobs: string[]): boolean {
  return jobs.some((job) => /\b(?:two desks|multiple desks|both desks)\b/i.test(job));
}

export function selectMix(
  seats: CatalogSeat[],
  jobs: string[],
  options: MixOptions = {}
): CatalogSeat[] {
  const catalog = catalogOnly(seats);
  const requirement = jobs.map((job) => job.trim()).filter(Boolean);
  if (requirement.length === 0) return [];

  const defaultLimit = wantsMoreThanSix(requirement) ? 12 : 6;
  const limit = Math.max(1, options.limit ?? defaultLimit);
  const allowMultipleDesks = options.allowMultipleDesks ?? wantsMultipleDesks(requirement);

  const scored = catalog
    .map((seat) => ({ seat, score: scoreSeat(seat, requirement) }))
    .filter((item) => item.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.seat.pack.owner.localeCompare(b.seat.pack.owner) ||
        a.seat.name.localeCompare(b.seat.name)
    );

  const picked: CatalogSeat[] = [];
  let desks = 0;
  for (const { seat } of scored) {
    if (picked.length >= limit) break;
    if (seat.isDesk && desks >= 1 && !allowMultipleDesks) continue;
    picked.push(seat);
    if (seat.isDesk) desks += 1;
  }

  if (!picked.some((seat) => seat.isDesk) && !allowMultipleDesks) {
    const desk = scored.find((item) => item.seat.isDesk);
    if (desk && !picked.some((seat) => seat.id === desk.seat.id)) {
      if (picked.length < limit) picked.unshift(desk.seat);
    }
  }

  const authors = new Set(picked.map((seat) => seat.pack.owner));
  if (authors.size === 1) {
    const other = scored.find(
      (item) =>
        !authors.has(item.seat.pack.owner) &&
        !picked.some((seat) => seat.grokTemplateUrl === item.seat.grokTemplateUrl) &&
        !(item.seat.isDesk && picked.some((seat) => seat.isDesk) && !allowMultipleDesks)
    );
    if (other) {
      if (picked.length < limit) {
        picked.push(other.seat);
      } else {
        const replaceAt = [...picked]
          .map((seat, index) => ({ seat, index }))
          .reverse()
          .find((item) => item.seat.pack.owner === [...authors][0] && !item.seat.isDesk);
        if (replaceAt) picked[replaceAt.index] = other.seat;
      }
    }
  }

  return picked.slice(0, limit);
}
