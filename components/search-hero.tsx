"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchHero({ defaultQuery = "" }: { defaultQuery?: string }) {
  const router = useRouter();
  const [value, setValue] = useState(defaultQuery);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const q = value.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/marketplace");
  }

  return (
    <form onSubmit={onSubmit} className="relative">
      <SearchIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search packs"
        aria-label="Search packs"
        className="h-12 bg-background pl-9 text-base"
      />
    </form>
  );
}
