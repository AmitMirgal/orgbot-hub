"use client";

import { usePathname } from "next/navigation";

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname === "/team" || pathname === "/login") return null;
  return (
    <footer className="shrink-0 border-t border-border">
      <p className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-4 text-[12px] text-muted-foreground">
        <span>orgbots is a directory of Grok Bot teams you can install.</span>
        <a
          href="https://github.com/AmitMirgal/orgbot-hub"
          target="_blank"
          rel="noreferrer"
          className="hover:text-foreground"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
}
