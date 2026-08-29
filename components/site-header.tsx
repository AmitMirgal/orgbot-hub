"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ComponentType } from "react";
import { MenuIcon } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export type PackOption = {
  owner: string;
  slug: string;
  name: string;
  featured: boolean;
};

const NAV = [{ href: "/submit", label: "Submit" }] as const;

const SOCIAL_LINKS = [
  {
    href: "https://x.com/amit_mirgal",
    label: "X",
    icon: XLogo,
  },
  {
    href: "https://github.com/AmitMirgal/orgbot-hub",
    label: "GitHub",
    icon: GitHubLogo,
  },
] as const;

function Wordmark() {
  return (
    <Link href="/" className="flex min-h-11 items-center">
      <span className="font-pixel text-lg tracking-tight text-foreground">
        ORGBOT
      </span>
    </Link>
  );
}

function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.837L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>
  );
}

function GitHubLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
      />
    </svg>
  );
}

function SocialLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex size-8 items-center justify-center text-muted-foreground hover:text-foreground"
    >
      <Icon className="size-5" />
    </a>
  );
}

export function SiteHeader({ packs }: { packs: PackOption[] }) {
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

  const socials = SOCIAL_LINKS.map((item) => (
    <SocialLink key={item.href} href={item.href} label={item.label} icon={item.icon} />
  ));

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
        <div className="ml-auto hidden items-center gap-1 md:flex">
          {socials}
          <Separator orientation="vertical" className="mx-1 h-5 self-center" />
          {nav}
          <ModeToggle />
        </div>
        <div className="ml-auto md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-11"
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
                <div className="flex items-center gap-1">{socials}</div>
                {nav}
                <Separator className="my-2" />
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-muted-foreground">Mode</span>
                  <ModeToggle />
                </div>
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
