import { publicJson, publicOptions } from "@/lib/api-http";

export function GET() {
  return publicJson({
    name: "orgbots",
    docs: "/api/v1/openapi.json",
    packs: "/api/v1/packs",
    pack: "/api/v1/packs/{owner}/{slug}",
  });
}

export function OPTIONS() {
  return publicOptions();
}