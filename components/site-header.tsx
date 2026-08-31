"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

const NAV = [
  { href: "/team", label: "Team" },
  { href: "/about", label: "About" },
  { href: "/submit", label: "Submit" },
] as const;

function BrandMark() {
  return (
    <span
      aria-hidden
      className="inline-flex size-4 shrink-0 items-center justify-center rounded-[2px] bg-black dark:bg-white"
    >
      <span className="size-2 rounded-[1px] bg-white dark:bg-black" />
    </span>
  );
}

function Wordmark() {
  return (
    <Link href="/" className="flex min-h-11 items-center gap-2">
      <BrandMark />
      <span className="font-pixel text-lg font-bold tracking-tight text-foreground">
        ORGBOT
      </span>
    </Link>
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
        <div className="ml-auto hidden items-center gap-5 md:flex">
          <nav className="flex items-center gap-5">{nav}</nav>
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
                <SheetTitle className="flex items-center gap-2 font-pixel text-lg font-bold tracking-tight">
                  <BrandMark />
                  ORGBOT
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-4">
                <nav className="flex flex-col gap-1">{nav}</nav>
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
