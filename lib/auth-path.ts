export function safeNextPath(
  raw: string | null | undefined,
  fallback = "/team"
): string {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//") || raw.startsWith("/\\")) {
    return fallback;
  }
  if (raw.startsWith("/login")) return fallback;
  return raw;
}

export function authCallbackUrl(origin: string, next: string): string {
  return `${origin}/auth/callback?next=${encodeURIComponent(safeNextPath(next))}`;
}
