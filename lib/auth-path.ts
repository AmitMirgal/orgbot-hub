const AUTH_CODE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

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

export function authRedirectOrigin(
  browserOrigin: string,
  siteUrl: string | undefined = process.env.NEXT_PUBLIC_SITE_URL
): string {
  const browser = originOf(browserOrigin);
  if (!browser) return browserOrigin;
  const site = originOf(siteUrl);
  if (!site) return browser;
  if (!hostsAreApexWwwAliases(hostnameOf(browser), hostnameOf(site))) {
    return browser;
  }
  return site;
}

export function hasAuthReturnQuery(params: URLSearchParams): boolean {
  if (params.get("token_hash")) return true;
  const code = params.get("code");
  if (code && AUTH_CODE.test(code)) return true;
  if (params.get("error_description")) return true;
  return false;
}

export function authCallbackBounceUrl(url: URL): URL | null {
  if (url.pathname !== "/") return null;
  if (!hasAuthReturnQuery(url.searchParams)) return null;
  const dest = new URL("/auth/callback", url.origin);
  dest.search = url.search;
  return dest;
}

function originOf(value: string | undefined): string | null {
  if (!value) return null;
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

function hostnameOf(origin: string): string {
  return new URL(origin).hostname;
}

function hostsAreApexWwwAliases(left: string, right: string): boolean {
  const apexLeft = left.replace(/^www\./, "");
  const apexRight = right.replace(/^www\./, "");
  return apexLeft === apexRight && apexLeft.includes(".");
}
