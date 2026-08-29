"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { MenuIcon, SearchIcon } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
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
import { Input } from "@/components/ui/input";
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
  featured: boolean;
};

function Wordmark() {
  return (
    <Link href="/" className="flex min-h-11 items-center">
      <span className="font-pixel text-lg tracking-tight text-foreground">
        ORGBOT
      </span>
    </Link>
  );
}

function SignInButton() {
  if (!createClient()) return null;

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
    <Button variant="outline" className="min-h-11" onClick={onSignIn}>
      GitHub sign-in
    </Button>
  );
}

function AccountMenu({ profile }: { profile: Profile }) {
  const initials = (profile.name ?? profile.githubLogin).slice(0, 1).toUpperCase();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-11 rounded-full">
          <Avatar className="h-7 w-7">
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
          <Link href="/submit">Submit</Link>
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

function HeaderSearch({
  onOpenPalette,
}: {
  onOpenPalette: () => void;
}) {
  const router = useRouter();
  const [value, setValue] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const q = value.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/marketplace");
  }

  return (
    <form onSubmit={onSubmit} className="relative hidden min-w-0 flex-1 md:block">
      <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onFocus={onOpenPalette}
        placeholder="Search packs"
        aria-label="Search packs"
        className="h-12 bg-background pl-8 text-base"
      />
    </form>
  );
}

const NAV = [
  { href: "/topics", label: "Topics" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/submit", label: "Submit" },
];

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
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/marketplace");
  }

  const nav = NAV.map((item) => (
    <Link
      key={item.href}
      href={item.href}
      className="inline-flex min-h-11 items-center text-[13px] text-muted-foreground hover:text-foreground"
    >
      {item.label}
    </Link>
  ));

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
        <Wordmark />
        <HeaderSearch onOpenPalette={() => setOpen(true)} />
        <nav className="ml-auto hidden items-center gap-3 md:flex">{nav}</nav>
        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <Button
            variant="ghost"
            size="icon"
            className="size-11 md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Search"
          >
            <SearchIcon className="h-4 w-4" />
          </Button>
          <div className="hidden md:block">
            <ModeToggle />
          </div>
          {profile ? <AccountMenu profile={profile} /> : <SignInButton />}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-11 md:hidden"
                aria-label="Menu"
              >
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="font-pixel text-lg tracking-tight">ORGBOT</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-4">
                {nav}
                <Separator className="my-2" />
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-muted-foreground">Mode</span>
                  <ModeToggle />
                </div>
                {profile ? (
                  <Link
                    href={`/${profile.githubLogin}`}
                    className="inline-flex min-h-11 items-center text-[13px]"
                  >
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
        description="Find a pack by name, topic, or seat"
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
                <span className="ml-auto font-mono text-xs text-muted-foreground">
                  @{pack.owner}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
}
