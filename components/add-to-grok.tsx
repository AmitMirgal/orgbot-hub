"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { recordInstall } from "@/lib/actions";
import { parseGrokTemplateUrl } from "@/lib/grok-url";

export function AddToGrok({
  url,
  label,
  packId,
  owner,
  slug,
}: {
  url: string | null;
  label: string;
  packId: string;
  owner: string;
  slug: string;
}) {
  const href = parseGrokTemplateUrl(url);
  const [copied, setCopied] = useState(false);

  if (!href) {
    return (
      <div className="flex flex-col gap-1.5">
        <Button disabled className="min-h-11 w-full justify-center sm:w-auto">
          {label}
        </Button>
        <p className="text-[12px] text-muted-foreground">
          Publisher must paste an official https://x.ai/bot/… link.
        </p>
      </div>
    );
  }

  async function onInstall() {
    await recordInstall(packId, owner, slug);
  }

  async function onCopy() {
    if (!href) return;
    await navigator.clipboard.writeText(href);
    setCopied(true);
    await recordInstall(packId, owner, slug);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <Button asChild className="min-h-11">
        <a href={href} target="_blank" rel="noopener noreferrer" onClick={onInstall}>
          {label}
        </a>
      </Button>
      <Button
        type="button"
        variant="outline"
        className="min-h-11"
        onClick={onCopy}
      >
        {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
        Copy
      </Button>
    </div>
  );
}
