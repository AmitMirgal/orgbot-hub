import { config } from "dotenv";
import { defineConfig } from "prisma/config";
import { postgresConnectionString } from "./lib/env-url";

config({ path: ".env.local" });
config();

// prisma generate does not connect. Vercel preview may have no DATABASE_URL
// or only a leftover http:// pooler href. Runtime CRUD uses lib/prisma.ts.
const GENERATE_PLACEHOLDER =
  "postgresql://prisma:prisma@127.0.0.1:5432/prisma";

const url =
  postgresConnectionString(process.env.DATABASE_URL) ??
  postgresConnectionString(process.env.DIRECT_URL) ??
  GENERATE_PLACEHOLDER;
const directUrl = postgresConnectionString(process.env.DIRECT_URL);

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
