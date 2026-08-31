import { PostgresStore } from "@mastra/pg";
import { mastraPostgresUrl } from "@/lib/env-url";

const MISSING_MASTRA_STORAGE =
  "Mastra memory has no postgres URL. Set DIRECT_URL to a postgres:// session URL on port 5432, or DATABASE_URL. NEXT_PUBLIC_SUPABASE_URL is not a database URL.";

function createStore() {
  // Session Postgres first. PgBouncer transaction mode rejects Mastra prepared statements.
  const connectionString = mastraPostgresUrl();
  if (!connectionString) {
    if (process.env.NODE_ENV === "production") {
      console.error(MISSING_MASTRA_STORAGE);
    }
    return undefined;
  }
  return new PostgresStore({
    id: "orgbots-storage",
    connectionString,
  });
}

export const orgbotsStorage = createStore();
