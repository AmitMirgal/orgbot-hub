import { prisma } from "@/lib/prisma";
import {
  TEAM_CHAT_MESSAGE_LIMIT,
  TEAM_CHAT_TOKEN_LIMIT,
  emptyTeamChatQuota,
  quotaFromUsage,
  utcDay,
  type TeamChatQuota,
} from "@/lib/team-quota";

export async function readTeamChatQuotaForUser(userId: string): Promise<TeamChatQuota> {
  if (!prisma) return emptyTeamChatQuota();
  const row = await prisma.teamChatUsage.findUnique({
    where: { userId_day: { userId, day: utcDay() } },
  });
  return quotaFromUsage(row);
}

export async function consumeTeamChatTurn(
  userId: string,
  pTokens: number
): Promise<TeamChatQuota | null> {
  if (!prisma) return null;
  const addTokens = Math.max(0, Math.trunc(pTokens));
  const day = utcDay();
  return prisma.$transaction(async (tx) => {
    await tx.teamChatUsage.upsert({
      where: { userId_day: { userId, day } },
      create: { userId, day, messages: 0, tokens: 0 },
      update: {},
    });
    const allowed = await tx.teamChatUsage.updateMany({
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
    const row = await tx.teamChatUsage.findUniqueOrThrow({
      where: { userId_day: { userId, day } },
    });
    return quotaFromUsage(row, allowed.count > 0);
  });
}

export async function refundTeamChatTurn(
  userId: string,
  pTokens: number
): Promise<TeamChatQuota> {
  if (!prisma) return emptyTeamChatQuota();
  const refundTokens = Math.max(0, Math.trunc(pTokens));
  const day = utcDay();
  return prisma.$transaction(async (tx) => {
    const row = await tx.teamChatUsage.findUnique({
      where: { userId_day: { userId, day } },
    });
    if (!row) return emptyTeamChatQuota();
    const next = await tx.teamChatUsage.update({
      where: { userId_day: { userId, day } },
      data: {
        messages: Math.max(row.messages - 1, 0),
        tokens: Math.max(row.tokens - refundTokens, 0),
      },
    });
    return quotaFromUsage(next);
  });
}