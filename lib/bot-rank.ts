import type { CatalogSeat } from "@/lib/api-pack";
import { rerankBotsWithJev, type ScoreBotFn } from "@/lib/jev-rerank";
import { shortlistByToken, wantsMoreThanSix, wantsMultipleDesks } from "@/lib/seat-mix";

export const BOT_JEV_SHORTLIST = 12;
export const BOT_RESULT_LIMIT = 6;

export type RankSeatsOptions = {
  scoreBot?: ScoreBotFn<CatalogSeat>;
  signal?: AbortSignal;
  limit?: number;
  shortlistLimit?: number;
};

function takeWithOneDesk(
  seats: CatalogSeat[],
  limit: number,
  allowMultipleDesks: boolean
): CatalogSeat[] {
  const picked: CatalogSeat[] = [];
  let desks = 0;
  for (const seat of seats) {
    if (picked.length >= limit) break;
    if (seat.isDesk && desks >= 1 && !allowMultipleDesks) continue;
    picked.push(seat);
    if (seat.isDesk) desks += 1;
  }
  return picked;
}

export async function rankSeatsByFit(
  seats: CatalogSeat[],
  jobs: string[],
  options: RankSeatsOptions = {}
): Promise<CatalogSeat[]> {
  const requirement = jobs.map((job) => job.trim()).filter(Boolean);
  if (requirement.length === 0) return [];
  const limit = Math.max(
    1,
    options.limit ?? (wantsMoreThanSix(requirement) ? 12 : BOT_RESULT_LIMIT)
  );
  const shortlist = shortlistByToken(
    seats,
    requirement,
    options.shortlistLimit ?? BOT_JEV_SHORTLIST
  );
  if (shortlist.length === 0) return [];
  const ranked =
    shortlist.length < 2
      ? shortlist
      : await rerankBotsWithJev(requirement.join("\n"), shortlist, {
          scoreBot: options.scoreBot,
          signal: options.signal,
        });
  return takeWithOneDesk(ranked, limit, wantsMultipleDesks(requirement));
}
