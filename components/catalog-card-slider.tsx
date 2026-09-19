"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function CatalogCardSlider({
  label,
  count,
  children,
}: {
  label: string;
  count: number;
  children: ReactNode;
}) {
  const listId = useId();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const node = scrollerRef.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    const overflowing = max > 1;
    setCanPrev(overflowing && node.scrollLeft > 1);
    setCanNext(overflowing && node.scrollLeft < max - 1);
  }, []);

  useEffect(() => {
    const node = scrollerRef.current;
    if (!node) return;
    update();
    node.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => {
      node.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [count, update]);

  function scrollByPage(direction: -1 | 1) {
    const node = scrollerRef.current;
    if (!node) return;
    const item = node.querySelector("[data-slider-item]");
    const gap = 8;
    const amount =
      item instanceof HTMLElement ? item.offsetWidth + gap : Math.round(node.clientWidth * 0.85);
    node.scrollBy({
      left: direction * amount,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByPage(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByPage(-1);
    }
  }

  if (count === 0) return null;

  const overflowing = canPrev || canNext;

  return (
    <div
      className={cn(
        "grid min-w-0 w-full items-center gap-1",
        overflowing && "grid-cols-[1.75rem_minmax(0,1fr)_1.75rem]"
      )}
    >
      {overflowing ? (
        <div className="flex justify-center">
          {canPrev ? (
            <Button
              type="button"
              size="icon-sm"
              variant="secondary"
              aria-controls={listId}
              aria-label={`Previous ${label.toLowerCase()}`}
              onClick={() => scrollByPage(-1)}
            >
              <ChevronLeftIcon />
            </Button>
          ) : (
            <span className="size-7" aria-hidden />
          )}
        </div>
      ) : null}
      <div
        ref={scrollerRef}
        id={listId}
        role="list"
        aria-label={label}
        tabIndex={overflowing ? 0 : undefined}
        onKeyDown={onKeyDown}
        className={cn(
          "flex min-w-0 snap-x snap-mandatory items-stretch gap-2 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth touch-pan-x pb-0.5",
          "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
          "motion-reduce:snap-none motion-reduce:scroll-auto",
          "outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        )}
      >
        {children}
      </div>
      {overflowing ? (
        <div className="flex justify-center">
          {canNext ? (
            <Button
              type="button"
              size="icon-sm"
              variant="secondary"
              aria-controls={listId}
              aria-label={`Next ${label.toLowerCase()}`}
              onClick={() => scrollByPage(1)}
            >
              <ChevronRightIcon />
            </Button>
          ) : (
            <span className="size-7" aria-hidden />
          )}
        </div>
      ) : null}
    </div>
  );
}

export function CatalogCardSliderItem({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  return (
    <div
      role="listitem"
      data-slider-item
      className={cn("flex min-w-0 shrink-0 snap-start", className)}
    >
      {children}
    </div>
  );
}
