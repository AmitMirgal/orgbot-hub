"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { recordStartHereCategoryClick } from "@/lib/actions";
import { captureStartHereCategory } from "@/lib/visits-client";

export function StartHereCategoryLink({
  category,
  className,
  children,
  userId = null,
}: {
  category: string;
  className?: string;
  children: ReactNode;
  userId?: string | null;
}) {
  const router = useRouter();

  return (
    <Link
      href={`/start/${category}`}
      className={className}
      onClick={(event) => {
        captureStartHereCategory(category, userId);
        const modified =
          event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
        if (modified) {
          void recordStartHereCategoryClick(category);
          return;
        }
        event.preventDefault();
        void recordStartHereCategoryClick(category).finally(() => {
          router.push(`/start/${category}`);
        });
      }}
    >
      {children}
    </Link>
  );
}
