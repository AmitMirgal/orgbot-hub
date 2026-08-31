"use client";

import { PlusIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { recordVisit } from "@/lib/actions";
import type { CatalogSeat } from "@/lib/api-pack";
import { parseGrokTemplateUrl } from "@/lib/grok-url";
import { captureVisit } from "@/lib/visits-client";

function trackMixAdd(seat: CatalogSeat) {
  void recordVisit(seat.packId, seat.pack.owner, seat.pack.slug, "desk_mix", seat.name);
  captureVisit({
    packId: seat.packId,
    identity: { owner: seat.pack.owner, slug: seat.pack.slug },
    source: "desk_mix",
    seatName: seat.name,
  });
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
    <div className="flex min-h-0 flex-1 flex-col gap-3 px-4 py-4">
      {heading ? (
        <div>
          <h2 className="text-sm font-medium">Your mix</h2>
          <p className="text-[12px] text-muted-foreground">
            Session only. Not a listed pack.
          </p>
        </div>
      ) : (
        <p className="text-[12px] text-muted-foreground">
          Session only. Not a listed pack.
        </p>
      )}
      {draft.length === 0 ? (
        <p className="text-[13px] text-muted-foreground">
          Seats you pick land here.
        </p>
      ) : (
        <ul className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto">
          {draft.map((seat) => {
            const href = parseGrokTemplateUrl(seat.grokTemplateUrl);
            return (
              <li key={seat.id} className="flex items-start justify-between gap-2 text-[13px]">
                <div className="min-w-0">
                  <p className="truncate font-medium">{seat.name}</p>
                  <p className="truncate text-muted-foreground">{seat.job}</p>
                  <p className="truncate text-muted-foreground">@{seat.pack.owner}</p>
                </div>
                <div className="flex shrink-0 items-center">
                  {href ? (
                    <Button asChild size="icon-sm" variant="ghost">
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Add ${seat.name} to Grok`}
                        onClick={() => trackMixAdd(seat)}
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
          })}
        </ul>
      )}
    </div>
  );
}
