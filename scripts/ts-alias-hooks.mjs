import { existsSync } from "node:fs";
import { dirname, resolve as resolvePath } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
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
  // Prisma's generated client imports `./enums` without an extension. Node's
  // type-stripping loader will not find those files unless we point at `.ts`.
  if (
    (specifier.startsWith("./") || specifier.startsWith("../")) &&
    context.parentURL
  ) {
    const abs = resolvePath(dirname(fileURLToPath(context.parentURL)), specifier);
    if (!existsSync(abs)) {
      const ts = `${abs}.ts`;
      if (existsSync(ts)) {
        return nextResolve(pathToFileURL(ts).href, context);
      }
    }
  }
  return nextResolve(specifier, context);
}
