import { PostgresStore } from "@mastra/pg";
import { mastraPostgresUrl } from "@/lib/env-url";

function createStore() {
  const connectionString = mastraPostgresUrl();
  if (!connectionString) return undefined;
  return new PostgresStore({
    id: "orgbots-storage",
    connectionString,
  });
}

export const orgbotsStorage = createStore();
