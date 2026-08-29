"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { recordInstall } from "@/lib/actions";
import { parseGrokTemplateUrl } from "@/lib/grok-url";
import { orderedSeats, type Seat } from "@/lib/pack";

export function AddEveryBot({
  seats,
  packId,
  owner,
  slug,
}: {
  seats: Seat[];
  packId: string;
  owner: string;
  slug: string;
}) {
  const items = orderedSeats({ seats })
    .map((seat) => ({
      name: seat.name,
      href: parseGrokTemplateUrl(seat.grokTemplateUrl),
      isDesk: seat.isDesk,
    }))
    .filter((item): item is { name: string; href: string; isDesk: boolean } => Boolean(item.href));

  const [blocked, setBlocked] = useState(false);
  const [opened, setOpened] = useState<string[]>([]);

  if (items.length === 0) {
    return (
      <Button disabled variant="outline" className="min-h-11">
        Add every bot in this pack
      </Button>
    );
  }

  async function openAll() {
    const nextOpened: string[] = [];
    let hitBlock = false;
    for (const item of items) {
      const popup = window.open(item.href, "_blank", "noopener,noreferrer");
      if (!popup) {
        hitBlock = true;
        break;
      }
      nextOpened.push(item.href);
    }
    setOpened(nextOpened);
    setBlocked(hitBlock);
    await recordInstall(packId, owner, slug);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="min-h-11">
          Add every bot in this pack
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add every bot in this pack</DialogTitle>
          <DialogDescription>
            Official Grok opens one tab per seat. The browser may block the rest.
            We never install bots through an API call.
          </DialogDescription>
        </DialogHeader>
        <ol className="flex list-decimal flex-col gap-2 pl-5 text-[13px]">
          {items.map((item, index) => (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-foreground underline-offset-4 hover:underline"
                onClick={() => recordInstall(packId, owner, slug)}
              >
                {index + 1}. {item.isDesk ? "Desk · " : ""}
                {item.name}
              </a>
            </li>
          ))}
        </ol>
        <Button className="min-h-11" onClick={openAll}>
          Open desk, then each seat
        </Button>
        {blocked ? (
          <p className="text-[12px] text-muted-foreground">
            The browser blocked extra tabs. Use the numbered list. Opened {opened.length} of {items.length}.
          </p>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
