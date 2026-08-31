import { PostgresStore } from "@mastra/pg";
import { postgresUrl } from "@/lib/env-url";

function createStore() {
  const connectionString = postgresUrl(process.env.DATABASE_URL);
  if (!connectionString) return undefined;
  return new PostgresStore({
    id: "orgbots-storage",
    connectionString,
  });
}

export const orgbotsStorage = createStore();
