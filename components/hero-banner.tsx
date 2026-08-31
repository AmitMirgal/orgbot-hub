"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { AuthorMarquee } from "@/components/author-marquee";
import { SearchHero } from "@/components/search-hero";
import { ParticleText } from "@/components/ui/particle-text";
import type { TopAuthor } from "@/lib/top-authors";

const HERO_TEXT = "orgbots";
const SUBHEADING = "orgbots is a directory of Grok Bot teams you can install.";

const PALETTE = {
  light: { color: "#18181b", highlightColor: "#71717a" },
  dark: { color: "#fafafa", highlightColor: "#a1a1aa" },
} as const;

function useMdUp() {
  const [mdUp, setMdUp] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const apply = () => setMdUp(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  return mdUp;
}

export function HeroBanner({ authors = [] }: { authors?: TopAuthor[] }) {
  const { resolvedTheme } = useTheme();
  const mdUp = useMdUp();
  const palette = resolvedTheme === "dark" ? PALETTE.dark : PALETTE.light;

  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto grid min-h-[280px] w-full max-w-6xl grid-cols-1 gap-8 px-4 py-8 md:min-h-[420px] md:grid-cols-[minmax(0,1fr)_minmax(18rem,26rem)] md:items-stretch md:gap-10 md:py-10">
        <div className="min-h-[200px] md:min-h-0">
          <h1 className="sr-only">The open Grok Bot pack directory</h1>
          <ParticleText
            text={HERO_TEXT}
            color={palette.color}
            highlightColor={palette.highlightColor}
            fontSize="clamp(3rem, 11vw, 7rem)"
            fontWeight={800}
            glow={resolvedTheme === "dark"}
            align={mdUp ? "left" : "center"}
            className="min-h-[200px] md:min-h-full"
          />
        </div>
        <div className="flex flex-col items-center justify-end gap-4 text-center md:items-stretch md:text-left md:pb-1">
          <h2 className="max-w-md text-xl font-semibold tracking-tight text-foreground sm:text-2xl sm:leading-snug">
            {SUBHEADING}
          </h2>
          <SearchHero className="w-full items-center md:items-stretch" />
          <AuthorMarquee authors={authors} className="md:mx-0 md:max-w-none" />
        </div>
      </div>
    </section>
  );
}
