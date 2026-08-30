import { existsSync } from "node:fs";
import { resolve as resolvePath } from "node:path";
import { pathToFileURL } from "node:url";

export async function resolve(specifier, context, nextResolve) {
  if (!specifier.startsWith("@/")) {
    return nextResolve(specifier, context);
  }
  const rel = specifier.slice(2);
  const abs = resolvePath(process.cwd(), rel);
  const candidates = [
    rel.endsWith(".ts") || rel.endsWith(".tsx") || rel.endsWith(".js") ? abs : `${abs}.ts`,
    `${abs}.tsx`,
    abs,
  ];
  const match = candidates.find((path) => existsSync(path)) ?? candidates[0];
  return nextResolve(pathToFileURL(match).href, context);
}
