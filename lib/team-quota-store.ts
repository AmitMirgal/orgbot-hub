import { prisma } from "@/lib/prisma";
import {
  TEAM_CHAT_MESSAGE_LIMIT,
  TEAM_CHAT_TOKEN_LIMIT,
  emptyTeamChatQuota,
  quotaFromUsage,
  utcDay,
  type TeamChatQuota,
} from "@/lib/team-quota";

const USER_ID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function usageKey(userId: string) {
  return { userId_day: { userId, day: utcDay() } };
}

export async function readTeamChatQuotaForUser(userId: string): Promise<TeamChatQuota> {
  if (!prisma || !USER_ID.test(userId)) return emptyTeamChatQuota();
  try {
    const row = await prisma.teamChatUsage.findUnique({
      where: usageKey(userId),
    });
    return quotaFromUsage(row);
  } catch {
    return emptyTeamChatQuota();
  }
}

export async function consumeTeamChatTurn(
  userId: string,
  pTokens: number
): Promise<TeamChatQuota | null> {
  if (!prisma || !USER_ID.test(userId)) return null;
  const addTokens = Math.max(0, Math.trunc(pTokens));
  const day = utcDay();
  try {
    await prisma.teamChatUsage.upsert({
      where: usageKey(userId),
      create: { userId, day, messages: 0, tokens: 0 },
      update: {},
    });
    const allowed = await prisma.teamChatUsage.updateMany({
      where: {
        userId,
        day,
        messages: { lt: TEAM_CHAT_MESSAGE_LIMIT },
        tokens: { lte: TEAM_CHAT_TOKEN_LIMIT - addTokens },
      },
      data: {
        messages: { increment: 1 },
        tokens: { increment: addTokens },
      },
    });
    const row = await prisma.teamChatUsage.findUniqueOrThrow({
      where: usageKey(userId),
    });
    return quotaFromUsage(row, allowed.count > 0);
  } catch {
    return null;
  }
}

export async function refundTeamChatTurn(
  userId: string,
  pTokens: number
): Promise<TeamChatQuota> {
  if (!prisma || !USER_ID.test(userId)) return emptyTeamChatQuota();
  const refundTokens = Math.max(0, Math.trunc(pTokens));
  try {
    const row = await prisma.teamChatUsage.findUnique({
      where: usageKey(userId),
    });
    if (!row) return emptyTeamChatQuota();
    const next = await prisma.teamChatUsage.update({
      where: usageKey(userId),
      data: {
        messages: Math.max(row.messages - 1, 0),
        tokens: Math.max(row.tokens - refundTokens, 0),
      },
    });
    return quotaFromUsage(next);
  } catch {
    return emptyTeamChatQuota();
  }
}
