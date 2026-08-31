"use client";

import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { recordVisit } from "@/lib/actions";
import type { CatalogSeat } from "@/lib/api-pack";
import { parseGrokTemplateUrl } from "@/lib/grok-url";
import { captureVisit } from "@/lib/visits-client";

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
              <li key={seat.id} className="flex flex-col gap-1.5 text-[13px]">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{seat.name}</p>
                    <p className="truncate text-muted-foreground">{seat.job}</p>
                    <p className="truncate text-muted-foreground">@{seat.pack.owner}</p>
                  </div>
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
                {href ? (
                  <Button asChild size="sm" className="w-fit">
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        void recordVisit(
                          seat.packId,
                          seat.pack.owner,
                          seat.pack.slug,
                          "desk_mix",
                          seat.name
                        );
                        captureVisit({
                          packId: seat.packId,
                          identity: { owner: seat.pack.owner, slug: seat.pack.slug },
                          source: "desk_mix",
                          seatName: seat.name,
                        });
                      }}
                    >
                      Add to Grok
                    </a>
                  </Button>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
