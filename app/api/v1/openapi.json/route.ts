import { publicJson, publicOptions } from "@/lib/api-http";
import { openApiDocument } from "@/lib/openapi";

export function GET() {
  return publicJson(openApiDocument());
}

export function OPTIONS() {
  return publicOptions();
}