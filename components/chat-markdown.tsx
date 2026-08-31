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
        "text-sm leading-relaxed [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
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
