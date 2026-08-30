"use client";

import posthog from "posthog-js";
import type { VisitCapture } from "@/lib/visits";

export function captureVisit(event: VisitCapture): void {
  try {
    if (!process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) return;
    posthog.capture("add_bot_clicked", {
      pack_id: event.packId,
      pack_owner: event.identity.owner,
      pack_slug: event.identity.slug,
      source: event.source,
      ...(event.seatName ? { seat_name: event.seatName } : {}),
    });
  } catch {
    // Analytics must never block the Supabase increment.
  }
}
