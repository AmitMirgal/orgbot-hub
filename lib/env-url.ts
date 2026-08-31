export function unwrapMarkdownUrl(raw: string | undefined): string | undefined {
  const value = raw?.trim().replace(/^['"]|['"]$/g, "");
  if (!value) return undefined;
  return value.replace(
    /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
    (_match, label: string) => label
  );
}

export function httpUrl(raw: string | undefined): string | undefined {
  const value = unwrapMarkdownUrl(raw);
  if (!value) return undefined;
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return undefined;
    return value;
  } catch {
    return undefined;
  }
}

export function postgresUrl(raw: string | undefined): string | undefined {
  const value = unwrapMarkdownUrl(raw);
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
