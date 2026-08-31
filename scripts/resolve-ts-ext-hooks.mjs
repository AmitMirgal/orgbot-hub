import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

export async function resolve(specifier, context, nextResolve) {
  if (!specifier.startsWith("./") && !specifier.startsWith("../")) {
    return nextResolve(specifier, context);
  }
  for (const ext of [".ts", ".js"]) {
    const url = new URL(specifier + ext, context.parentURL);
    if (existsSync(fileURLToPath(url))) {
      return nextResolve(url.href, context);
    }
  }
  return nextResolve(specifier, context);
}
