"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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

  if (!user) {
    return (
      <Button asChild variant="outline" size="sm">
        <Link href={`/login?next=${encodeURIComponent(next)}`}>Sign in</Link>
      </Button>
    );
  }

  const label = user.name ?? user.email ?? "Account";
  const initial = label.slice(0, 1).toUpperCase();

  return (
    <div className={className ?? "flex items-center gap-2"}>
      <Avatar size="sm">
        {user.avatarUrl ? <AvatarImage src={user.avatarUrl} alt="" /> : null}
        <AvatarFallback>{initial}</AvatarFallback>
      </Avatar>
      <form action="/auth/sign-out" method="post">
        <Button type="submit" variant="ghost" size="sm">
          Sign out
        </Button>
      </form>
    </div>
  );
}
