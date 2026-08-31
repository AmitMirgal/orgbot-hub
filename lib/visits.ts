import type { VisitSource } from "@/generated/prisma/enums";

export type { VisitSource };

export type PackIdentity = {
  owner: string;
  slug: string;
};

export type VisitCapture = {
  packId: string;
  identity: PackIdentity;
  source: VisitSource;
  seatName?: string;
};
