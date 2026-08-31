import { parseSeatsQuery, publicJson, publicOptions } from "@/lib/api-http";
import { listPublicSeats } from "@/lib/public-catalog";

export async function GET(request: Request) {
  const query = parseSeatsQuery(new URL(request.url).searchParams);
  const seats = await listPublicSeats(query);
  return publicJson({ seats });
}

export function OPTIONS() {
  return publicOptions();
}
