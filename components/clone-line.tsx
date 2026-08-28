"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { recordClone } from "@/lib/actions";
import { cloneGit, cloneNpx } from "@/lib/pack";

export function CloneLine({
  packId,
  owner,
  slug,
  githubUrl,
}: {
  packId: string;
  owner: string;
  slug: string;
  githubUrl: string | null;
}) {
  const npx = cloneNpx(owner, slug);
  const git = githubUrl ? cloneGit(githubUrl) : null;
  const [copied, setCopied] = useState<"npx" | "git" | null>(null);

  async function copy(which: "npx" | "git", value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(which);
    await recordClone(packId, owner, slug);
    window.setTimeout(() => setCopied(null), 1400);
  }

  return (
    <div className="flex flex-col gap-2">
      <CopyRow
        label="npx"
        value={npx}
        copied={copied === "npx"}
        onCopy={() => copy("npx", npx)}
      />
      {git ? (
        <CopyRow
          label="git"
          value={git}
          copied={copied === "git"}
          onCopy={() => copy("git", git)}
        />
      ) : null}
    </div>
  );
}

function CopyRow({
  label,
  value,
  copied,
  onCopy,
}: {
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1">
      <span className="w-8 shrink-0 font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
      <code className="min-w-0 flex-1 truncate font-mono text-[12px]">{value}</code>
      <Button variant="ghost" size="icon-xs" onClick={onCopy} aria-label={`Copy ${label}`}>
        {copied ? <CheckIcon /> : <CopyIcon />}
      </Button>
    </div>
  );
}
