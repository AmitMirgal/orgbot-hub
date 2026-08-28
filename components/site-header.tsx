"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MenuIcon, SearchIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Profile } from "@/lib/pack";
import { createClient } from "@/lib/supabase/client";

export type PackOption = {
  owner: string;
  slug: string;
  name: string;
  official: boolean;
};

function Wordmark() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="flex size-5 items-center justify-center rounded-[4px] border border-border">
        <span className="block h-2.5 w-2.5 rounded-[1px] bg-foreground/80" />
      </span>
      <span className="text-[13px] font-medium tracking-tight">orgbots</span>
    </Link>
  );
}

function SignInButton() {
  async function onSignIn() {
    const supabase = createClient();
    if (!supabase) return;
    const origin = window.location.origin;
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: `${origin}/auth/callback` },
    });
  }

  return (
    <Button variant="outline" size="sm" onClick={onSignIn}>
      GitHub sign-in
    </Button>
  );
}

function AccountMenu({ profile }: { profile: Profile }) {
  const initials = (profile.name ?? profile.githubLogin).slice(0, 1).toUpperCase();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="rounded-full">
          <Avatar size="sm">
            {profile.avatarUrl ? (
              <AvatarImage src={profile.avatarUrl} alt={profile.githubLogin} />
            ) : null}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <Link href={`/${profile.githubLogin}`}>{profile.githubLogin}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/publish">Publish</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => {
            const form = document.createElement("form");
            form.method = "post";
            form.action = "/auth/sign-out";
            document.body.appendChild(form);
            form.submit();
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SiteHeader({
  profile,
  packs,
}: {
  profile: Profile | null;
  packs: PackOption[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
      if (event.key === "/" && !typing && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function goSearch(value: string) {
    const q = value.trim();
    setOpen(false);
    router.push(q ? `/?q=${encodeURIComponent(q)}` : "/");
  }

  const nav = (
    <>
      <Link
        href="/topics"
        className="text-[13px] text-muted-foreground hover:text-foreground"
      >
        Topics
      </Link>
      <Link
        href="/official"
        className="text-[13px] text-muted-foreground hover:text-foreground"
      >
        Official
      </Link>
      {profile ? (
        <Link
          href="/publish"
          className="text-[13px] text-muted-foreground hover:text-foreground"
        >
          Publish
        </Link>
      ) : null}
    </>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-6xl items-center gap-3 px-4">
        <Wordmark />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="hidden min-w-0 flex-1 items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1 text-left text-[13px] text-muted-foreground md:flex"
        >
          <SearchIcon className="size-3.5" />
          <span className="flex-1 truncate">Search packs</span>
          <kbd className="font-mono text-[10px] text-muted-foreground/80">/</kbd>
        </button>
        <nav className="ml-auto hidden items-center gap-4 sm:flex">{nav}</nav>
        <div className="ml-auto flex items-center gap-2 sm:ml-0">
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Search"
          >
            <SearchIcon className="size-4" />
          </Button>
          {profile ? <AccountMenu profile={profile} /> : <SignInButton />}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="sm:hidden" aria-label="Menu">
                <MenuIcon className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>orgbots</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-3 px-4">
                {nav}
                <Separator />
                {profile ? (
                  <Link href={`/${profile.githubLogin}`} className="text-[13px]">
                    {profile.githubLogin}
                  </Link>
                ) : null}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search packs"
        description="Find a roster by name"
      >
        <CommandInput
          placeholder="Search packs"
          value={query}
          onValueChange={setQuery}
          onKeyDown={(event) => {
            if (event.key === "Enter" && query.trim()) {
              event.preventDefault();
              goSearch(query);
            }
          }}
        />
        <CommandList>
          <CommandEmpty>No packs match.</CommandEmpty>
          <CommandGroup heading="Packs">
            {packs.map((pack) => (
              <CommandItem
                key={`${pack.owner}/${pack.slug}`}
                value={`${pack.name} ${pack.owner} ${pack.slug}`}
                onSelect={() => {
                  setOpen(false);
                  router.push(`/${pack.owner}/${pack.slug}`);
                }}
              >
                <span className="truncate">{pack.name}</span>
                <span className="ml-auto font-mono text-[11px] text-muted-foreground">
                  {pack.owner}/{pack.slug}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
}
