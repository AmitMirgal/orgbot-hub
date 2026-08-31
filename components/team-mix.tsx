"use client";

import { PlusIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CatalogSeat } from "@/lib/api-pack";
import { parseGrokTemplateUrl } from "@/lib/grok-url";
import { useRecordVisit } from "@/lib/visits-record";

export function MixSeatRow({
  seat,
  onRemove,
}: {
  seat: CatalogSeat;
  onRemove: (url: string) => void;
}) {
  const record = useRecordVisit();
  const href = parseGrokTemplateUrl(seat.grokTemplateUrl);
  return (
    <li className="flex min-w-0 items-start gap-3">
      <div className="min-w-0 flex-1">
        <p className="font-medium leading-snug wrap-break-word">{seat.name}</p>
        <p className="text-[13px] leading-snug text-muted-foreground wrap-break-word">
          {seat.job}
        </p>
        <p className="mt-0.5 text-[12px] text-muted-foreground">@{seat.pack.owner}</p>
      </div>
      <div className="flex shrink-0 items-center gap-0.5 pt-0.5">
        {href ? (
          <Button asChild size="icon-sm" variant="outline">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Add ${seat.name} to Grok`}
              onClick={() => {
                void record({
                  packId: seat.packId,
                  owner: seat.pack.owner,
                  slug: seat.pack.slug,
                  source: "desk_mix",
                  seatName: seat.name,
                });
              }}
            >
              <PlusIcon className="size-3.5" />
            </a>
          </Button>
        ) : null}
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          aria-label={`Remove ${seat.name}`}
          onClick={() => onRemove(seat.grokTemplateUrl)}
        >
          <XIcon className="size-3.5" />
        </Button>
      </div>
    </li>
  );
}

export function TeamMix({
  draft,
  onRemove,
  heading = true,
}: {
  draft: CatalogSeat[];
  onRemove: (url: string) => void;
  heading?: boolean;
}) {
  return (
    <div className="flex min-h-0 min-w-0 w-full flex-1 flex-col gap-4 overflow-hidden px-4 py-4">
      {heading ? (
        <div className="pr-2">
          <h2 className="text-sm font-medium">Your mix</h2>
          <p className="text-[12px] text-muted-foreground">
            Session only. Not a listed pack.
          </p>
        </div>
      ) : (
        <p className="pr-2 text-[12px] text-muted-foreground">
          Session only. Not a listed pack.
        </p>
      )}
      {draft.length === 0 ? (
        <p className="text-[13px] text-muted-foreground">
          Seats you pick land here.
        </p>
      ) : (
        <ul className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-y-auto overflow-x-hidden pr-1">
          {draft.map((seat) => (
            <MixSeatRow key={seat.id} seat={seat} onRemove={onRemove} />
          ))}
        </ul>
      )}
    </div>
  );
}
