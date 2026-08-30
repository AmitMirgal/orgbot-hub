export type VisitSource = "add_to_grok" | "add_every_bot";

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
