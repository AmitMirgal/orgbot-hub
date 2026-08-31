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
      className="flex w-full max-w-sm items-start gap-3 rounded-xl border border-border bg-background p-3"
    >
      <Link href={profileHref} className="shrink-0" aria-label={`${displayName} on orgbots`}>
        <Avatar>
          <AvatarImage src={src} alt="" />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </Link>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium leading-tight">
          <Link href={profileHref} className="hover:underline">
            {displayName}
          </Link>
        </p>
        {xHandle ? (
          <p className="mt-1">
            <NetworkHandle network="x" handle={xHandle} personName={displayName} />
          </p>
        ) : (
          <p className="mt-1 font-mono text-[13px] text-muted-foreground">
            @{author.githubLogin}
          </p>
        )}
        {xHandle && !sameHandle ? (
          <p className="mt-1 truncate font-mono text-[12px] text-muted-foreground">
            <Link href={profileHref} className="hover:underline">
              @{author.githubLogin}
            </Link>
          </p>
        ) : null}
      </div>
    </article>
  );
}
