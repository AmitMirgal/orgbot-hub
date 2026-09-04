"use client";

import { useEffect, useRef, useState } from "react";
import { PackCardView } from "@/components/pack-card";
import type { PackCard } from "@/lib/pack";
import {
  initialRevealed,
  needsSentinel,
  nextRevealed,
} from "@/lib/pack-grid-reveal";

export function PackGrid({ packs }: { packs: PackCard[] }) {
  const total = packs.length;
  const packIds = packs.map((pack) => pack.id).join(",");
  const [revealed, setRevealed] = useState(() => initialRevealed(total));
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRevealed(initialRevealed(total));
  }, [packIds, total]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed((current) => nextRevealed(current, total));
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [revealed, total]);

  if (packs.length === 0) {
    return (
      <p className="border border-dashed border-border px-4 py-10 text-center text-[13px] text-muted-foreground">
        No packs match.
      </p>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {packs.slice(0, revealed).map((pack) => (
        <div
          key={pack.id}
          className="h-full [content-visibility:auto] [contain-intrinsic-size:auto_18rem]"
        >
          <PackCardView pack={pack} />
        </div>
      ))}
      {needsSentinel(revealed, total) ? (
        <div ref={sentinelRef} aria-hidden className="col-span-full h-px" />
      ) : null}
    </div>
  );
}
