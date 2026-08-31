import { config } from "dotenv";
import { defineConfig } from "prisma/config";
import { postgresUrl } from "./lib/env-url";

config({ path: ".env.local" });
config();

const url = postgresUrl(process.env.DATABASE_URL);
const directUrl = postgresUrl(process.env.DIRECT_URL);
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
