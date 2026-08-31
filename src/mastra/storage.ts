import { PostgresStore } from "@mastra/pg";
import { mastraPostgresUrl } from "@/lib/env-url";

// Session Postgres (DIRECT_URL / 5432) first. PgBouncer transaction mode
// rejects Mastra prepared statements; leftover http:// pooler hrefs are ignored.
function createStore() {
  const connectionString = mastraPostgresUrl();
  if (!connectionString) return undefined;
  return new PostgresStore({
    id: "orgbots-storage",
    connectionString,
  });
}

export const orgbotsStorage = createStore();
