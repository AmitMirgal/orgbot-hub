"use client";

import { Streamdown } from "streamdown";
import "streamdown/styles.css";
import { cn } from "@/lib/utils";

export function ChatMarkdown({
  children,
  streaming = false,
  className,
}: {
  children: string;
  streaming?: boolean;
  className?: string;
}) {
  return (
    <Streamdown
      animated={streaming}
      className={cn(
        "max-w-full min-w-0 overflow-x-auto text-sm leading-relaxed [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto",
        className
      )}
      controls={false}
      isAnimating={streaming}
      mode={streaming ? "streaming" : "static"}
    >
      {children}
    </Streamdown>
  );
}
