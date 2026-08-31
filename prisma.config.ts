import { config } from "dotenv";
import { defineConfig } from "prisma/config";
import { postgresConnectionString } from "./lib/env-url";

config({ path: ".env.local" });
config();

const url =
  postgresConnectionString(process.env.DATABASE_URL) ??
  postgresConnectionString(process.env.DIRECT_URL);
const directUrl = postgresConnectionString(process.env.DIRECT_URL);
if (!url) {
  throw new Error("DATABASE_URL is required");
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: directUrl ?? url,
    ...(directUrl ? { directUrl } : {}),
  },
});
