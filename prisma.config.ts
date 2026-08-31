import { config } from "dotenv";
import { defineConfig } from "prisma/config";

config({ path: ".env.local" });
config();

function postgresUrl(raw: string | undefined): string | undefined {
  const value = raw?.trim();
  if (!value) return undefined;
  const scheme = value.startsWith("postgresql://")
    ? "postgresql://"
    : value.startsWith("postgres://")
      ? "postgres://"
      : null;
  if (!scheme) return value;
  const rest = value.slice(scheme.length);
  const slash = rest.indexOf("/");
  const authAndHost = slash === -1 ? rest : rest.slice(0, slash);
  const path = slash === -1 ? "" : rest.slice(slash);
  const lastAt = authAndHost.lastIndexOf("@");
  if (lastAt === -1) return value;
  const userPass = authAndHost.slice(0, lastAt);
  const host = authAndHost.slice(lastAt + 1);
  const colon = userPass.indexOf(":");
  if (colon === -1) return value;
  const user = userPass.slice(0, colon);
  const password = userPass.slice(colon + 1);
  const encodedUser = user.includes("%") ? user : encodeURIComponent(user);
  const encodedPassword = password.includes("%")
    ? password
    : encodeURIComponent(password);
  return `${scheme}${encodedUser}:${encodedPassword}@${host}${path}`;
}

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
