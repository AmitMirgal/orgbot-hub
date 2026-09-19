"use client";

import Link from "next/link";
import { NetworkHandle } from "@/components/network-handle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  authorAvatarSrc,
  publicXHandle,
  type CatalogAuthor,
} from "@/lib/api-pack";
import { authorHref } from "@/lib/pack";

export function AuthorProfileCard({ author }: { author: CatalogAuthor }) {
  const displayName = author.name ?? author.githubLogin;
  const initials = displayName.slice(0, 1).toUpperCase();
  const xHandle = publicXHandle(author.xHandle);
  const src = authorAvatarSrc(author);
  const profileHref = authorHref(author.githubLogin);
  const sameHandle =
    xHandle !== null && xHandle.toLowerCase() === author.githubLogin.toLowerCase();

  return (
    <article
      aria-label={`${displayName} profile`}
      className="flex h-full min-w-0 w-full items-start gap-3 rounded-xl border border-border bg-background p-3"
    >
      <Link
        href={profileHref}
        className="shrink-0 rounded-full outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        aria-label={`${displayName} on orgbots`}
      >
        <Avatar>
          <AvatarImage src={src} alt="" />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </Link>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium leading-tight">
          <Link
            href={profileHref}
            className="rounded-sm outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {displayName}
          </Link>
        </p>
        {xHandle ? (
          <p className="mt-1 min-w-0 wrap-break-word">
            <NetworkHandle network="x" handle={xHandle} personName={displayName} />
          </p>
        ) : (
          <p className="mt-1 truncate font-mono text-[13px] text-muted-foreground">
            @{author.githubLogin}
          </p>
        )}
        {xHandle && !sameHandle ? (
          <p className="mt-1 truncate font-mono text-[12px] text-muted-foreground">
            <Link
              href={profileHref}
              className="rounded-sm outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              @{author.githubLogin}
            </Link>
          </p>
        ) : null}
      </div>
    </article>
  );
}
