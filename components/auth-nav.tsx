"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { safeNextPath } from "@/lib/auth-path";
import type { SessionUser } from "@/lib/session-user";

export function AuthNav({
  user,
  className,
}: {
  user: SessionUser | null;
  className?: string;
}) {
  const pathname = usePathname();
  const next = safeNextPath(pathname === "/login" ? "/team" : pathname);
  const signOutRef = useRef<HTMLFormElement>(null);

  if (!user) {
    return (
      <div className={className}>
        <Button asChild variant="outline" size="sm">
          <Link href={`/login?next=${encodeURIComponent(next)}`}>Sign in</Link>
        </Button>
      </div>
    );
  }

  const label = user.name ?? user.email ?? "Account";
  const initial = label.slice(0, 1).toUpperCase();

  return (
    <div className={className}>
      <form ref={signOutRef} action="/auth/sign-out" method="post" className="hidden">
        <button type="submit" tabIndex={-1}>
          Sign out
        </button>
      </form>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-11 rounded-full"
            aria-label={`${label} account menu`}
          >
            <Avatar size="sm">
              {user.avatarUrl ? <AvatarImage src={user.avatarUrl} alt="" /> : null}
              <AvatarFallback>{initial}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-56">
          <DropdownMenuLabel className="font-normal">
            <span className="block truncate text-sm font-medium text-foreground">
              {label}
            </span>
            {user.email && user.email !== label ? (
              <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                {user.email}
              </span>
            ) : null}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onSelect={() => {
              signOutRef.current?.requestSubmit();
            }}
          >
            <LogOutIcon />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
