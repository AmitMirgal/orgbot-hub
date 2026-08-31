import { PrismaPg } from "@prisma/adapter-pg";
import { prismaPostgresUrl } from "@/lib/env-url";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export function prismaErrorCode(error: unknown): string | undefined {
  if (!error || typeof error !== "object" || !("code" in error)) return undefined;
  const code = (error as { code: unknown }).code;
  return typeof code === "string" && code.length > 0 ? code : undefined;
}

export function logPrismaFailure(scope: string, error: unknown): void {
  const code = prismaErrorCode(error);
  if (code) {
    console.error(`[prisma] ${scope} failed code=${code}`, error);
    return;
  }
  console.error(`[prisma] ${scope} failed`, error);
}

const MISSING_PRISMA_URL =
  "Prisma has no postgres URL. Set DATABASE_URL and DIRECT_URL to postgresql://user:pass@host/db. Leftover http:// pooler hrefs are not database URLs.";

function createPrisma(): PrismaClient | null {
  const connectionString = prismaPostgresUrl();
  if (!connectionString) {
    if (process.env.NODE_ENV === "production") {
      console.error(MISSING_PRISMA_URL);
    }
    return null;
  }
  try {
    const adapter = new PrismaPg({ connectionString });
    return new PrismaClient({ adapter });
  } catch (error) {
    logPrismaFailure("createPrisma", error);
    return null;
  }
}

export const prisma = globalForPrisma.prisma ?? createPrisma();

if (process.env.NODE_ENV !== "production" && prisma) {
  globalForPrisma.prisma = prisma;
}
