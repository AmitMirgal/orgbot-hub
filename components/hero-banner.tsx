"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import HalftoneReveal from "@/components/HalftoneReveal";
import { SearchHero } from "@/components/search-hero";

const HERO_SRC = "/hero-halftone.png";

const PALETTE = {
  light: { inkColor: "#18181b", paperColor: "#fafafa" },
  dark: { inkColor: "#f4f4f5", paperColor: "#18181b" },
} as const;

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  return reduce;
}

export function HeroBanner() {
  const { resolvedTheme } = useTheme();
  const reduceMotion = usePrefersReducedMotion();
  const palette = resolvedTheme === "dark" ? PALETTE.dark : PALETTE.light;

  return (
    <section className="relative w-full min-h-[280px] overflow-hidden md:min-h-[420px]">
      <div className="absolute inset-0" aria-hidden="true">
        {reduceMotion ? (
          <Image
            src={HERO_SRC}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover dark:invert"
          />
        ) : (
          <HalftoneReveal
            src={HERO_SRC}
            mode="mono"
            shape="circle"
            trigger="hover"
            idleReveal={0.16}
            inkColor={palette.inkColor}
            paperColor={palette.paperColor}
            borderRadius="0px"
            className="h-full w-full"
          />
        )}
      </div>
      <div className="pointer-events-none relative z-10 mx-auto flex min-h-[280px] w-full max-w-6xl flex-col justify-center gap-4 px-4 py-10 md:min-h-[420px]">
        <h1 className="font-pixel text-4xl leading-none tracking-wide sm:text-6xl">
          ORGBOT
        </h1>
        <p className="text-[17px] font-medium tracking-tight sm:text-xl">
          The open Grok Bot pack directory
        </p>
        <p className="max-w-xl text-[15px] leading-6 text-muted-foreground">
          orgbots is a directory of Grok Bot teams you can install.
        </p>
        <div className="pointer-events-auto max-w-xl">
          <SearchHero />
        </div>
      </div>
    </section>
  );
}
