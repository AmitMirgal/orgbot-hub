import { PrismaPg } from "@prisma/adapter-pg";
import { prismaPostgresUrl } from "@/lib/env-url";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrisma(): PrismaClient | null {
  // Pooler DATABASE_URL first, then DIRECT_URL. Leftover http:// hrefs are skipped.
  const connectionString = prismaPostgresUrl();
  if (!connectionString) return null;
  try {
    const adapter = new PrismaPg({ connectionString });
    return new PrismaClient({ adapter });
  } catch {
    return null;
  }
}

export const prisma = globalForPrisma.prisma ?? createPrisma();

if (process.env.NODE_ENV !== "production" && prisma) {
  globalForPrisma.prisma = prisma;
}
