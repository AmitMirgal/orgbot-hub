import type { PublicPackQuery } from "@/lib/public-catalog";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
  "Content-Type": "application/json",
} as const;

export function parsePacksQuery(params: URLSearchParams): PublicPackQuery {
  const q = params.get("q")?.trim() || undefined;
  const owner = params.get("owner")?.trim() || undefined;
  const featured = params.get("featured") === "true" ? true : undefined;
  return {
    ...(q ? { q } : {}),
    ...(owner ? { owner } : {}),
    ...(featured ? { featured: true as const } : {}),
  };
}

export function publicJson(body: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      ...CORS,
      ...init?.headers,
    },
  });
}

export function publicOptions(): Response {
  return new Response(null, { status: 204, headers: CORS });
}