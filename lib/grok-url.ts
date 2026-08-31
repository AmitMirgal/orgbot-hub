const ALLOWED_HOSTS = new Set(["x.ai", "www.x.ai"]);
const BOT_PATH = /^\/bot\/(s\/)?([A-Za-z0-9_-]{6,})(?:\/[A-Za-z0-9_-]+)?\/?$/;
const SECRET_HINT =
  /(?:sk-|api[_-]?key|bearer\s+|-----BEGIN|xai-[A-Za-z0-9]{10,}|secret=|token=)/i;

export function looksLikeSecret(value: string): boolean {
  return SECRET_HINT.test(value);
}

export function parseGrokTemplateUrl(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (!trimmed || looksLikeSecret(trimmed)) return null;

  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return null;
  }

  if (url.protocol !== "https:") return null;
  if (!ALLOWED_HOSTS.has(url.hostname)) return null;
  if (url.port) return null;
  if (url.username || url.password) return null;
  if (url.search || url.hash) return null;

  const match = url.pathname.match(BOT_PATH);
  if (!match) return null;

  const share = match[1] ?? "";
  const id = match[2];
  return `https://x.ai/bot/${share}${id}`;
}

export function isOfficialGrokTemplateUrl(raw: unknown): raw is string {
  return parseGrokTemplateUrl(raw) !== null;
}
