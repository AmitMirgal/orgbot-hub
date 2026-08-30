import { publicJson, publicOptions } from "@/lib/api-http";
import { getPublicPack } from "@/lib/public-catalog";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ owner: string; slug: string }> }
) {
  const { owner, slug } = await params;
  const pack = await getPublicPack(owner, slug);
  if (!pack) return publicJson({ error: "not_found" }, { status: 404 });
  return publicJson(pack);
}

export function OPTIONS() {
  return publicOptions();
}