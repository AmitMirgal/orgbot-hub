"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ComponentType } from "react";
import { MenuIcon } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { GitHubLogo, XLogo } from "@/components/network-icons";
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
