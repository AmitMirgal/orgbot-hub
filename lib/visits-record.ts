"use client";

import { useRouter } from "next/navigation";
import { recordVisit } from "@/lib/actions";
import { captureVisit } from "@/lib/visits-client";
import type { VisitSource } from "@/lib/visits";

export function useRecordVisit() {
  const router = useRouter();
  return (input: {
    packId: string;
    owner: string;
    slug: string;
    source?: VisitSource;
    seatName?: string;
  }) => {
    const source = input.source ?? "add_to_grok";
    captureVisit({
      packId: input.packId,
      identity: { owner: input.owner, slug: input.slug },
      source,
      seatName: input.seatName,
    });
    return recordVisit(
      input.packId,
      input.owner,
      input.slug,
      source,
      input.seatName
    ).then((result) => {
      router.refresh();
      return result;
    });
  };
}
