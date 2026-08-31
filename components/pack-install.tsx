"use client";

import { useEffect, useState } from "react";
import { AddToGrok } from "@/components/add-to-grok";
import { visitsLabel } from "@/lib/api-pack";
import type { VisitSource } from "@/lib/visits";

export function PackInstall({
  url,
  label,
  packId,
  owner,
  slug,
  seatName,
  source,
  visitsCount,
}: {
  url: string | null;
  label: string;
  packId: string;
  owner: string;
  slug: string;
  seatName?: string;
  source?: VisitSource;
  visitsCount: number;
}) {
  const [visits, setVisits] = useState(visitsCount);
  useEffect(() => {
    setVisits(visitsCount);
  }, [visitsCount]);
  return (
    <div className="flex w-full flex-col gap-3 lg:w-auto">
      <AddToGrok
        url={url}
        label={label}
        packId={packId}
        owner={owner}
        slug={slug}
        seatName={seatName}
        source={source}
        onRecorded={setVisits}
      />
      <p className="font-mono text-xs text-muted-foreground">{visitsLabel(visits)}</p>
    </div>
  );
}
