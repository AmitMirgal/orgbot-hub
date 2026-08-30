import { parsePacksQuery, publicJson, publicOptions } from "@/lib/api-http";
import { listPublicPacks } from "@/lib/public-catalog";

export async function GET(request: Request) {
  const query = parsePacksQuery(new URL(request.url).searchParams);
  const packs = await listPublicPacks(query);
  return publicJson({ packs });
}

export function OPTIONS() {
  return publicOptions();
}