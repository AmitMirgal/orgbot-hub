import { PrismaPg } from "@prisma/adapter-pg";
import { postgresUrl } from "@/lib/env-url";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrisma(): PrismaClient | null {
  const connectionString = postgresUrl(process.env.DATABASE_URL);
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
