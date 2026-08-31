import {
  parseCatalogSeat,
  type CatalogAuthor,
  type CatalogSeat,
} from "@/lib/api-pack";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

export function seatsFromChatParts(parts: unknown[]): CatalogSeat[] {
  const seats: CatalogSeat[] = [];
  const seen = new Set<string>();
  for (const part of parts) {
    if (!isRecord(part)) continue;
    const type = String(part.type ?? "");
    if (!type.startsWith("tool-") && type !== "dynamic-tool") continue;
    const output = part.output;
    const list = isRecord(output) && Array.isArray(output.seats) ? output.seats : [];
    for (const item of list) {
      const seat = parseCatalogSeat(item);
      if (!seat || seen.has(seat.grokTemplateUrl)) continue;
      seen.add(seat.grokTemplateUrl);
      seats.push(seat);
    }
  }
  return seats;
}

export function authorsFromSeats(seats: CatalogSeat[]): CatalogAuthor[] {
  const seen = new Set<string>();
  const authors: CatalogAuthor[] = [];
  for (const seat of seats) {
    const key = seat.author.githubLogin.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    authors.push(seat.author);
  }
  return authors;
}

export function messageText(parts: unknown[]): string {
  return parts
    .filter((part): part is { type: string; text: string } => {
      return isRecord(part) && part.type === "text" && typeof part.text === "string";
    })
    .map((part) => part.text)
    .join("");
}

export type CatalogThreadRender =
  | { kind: "omit" }
  | { kind: "user"; text: string }
  | {
      kind: "assistant";
      text: string | null;
      seats: CatalogSeat[];
      authors: CatalogAuthor[];
      emptyReply: boolean;
    };

export function catalogThreadRender(input: {
  role: string;
  parts: unknown[];
  last: boolean;
  mix: boolean;
  waiting: boolean;
}): CatalogThreadRender {
  const text = messageText(input.parts).trim();
  if (input.role === "user") {
    return text ? { kind: "user", text } : { kind: "omit" };
  }
  const seats = input.mix ? seatsFromChatParts(input.parts) : [];
  const authors = authorsFromSeats(seats);
  const searching = input.last && hasToolActivity(input.parts);
  const emptyReply =
    input.last &&
    !input.waiting &&
    !searching &&
    text.length === 0 &&
    seats.length === 0;
  if (text.length === 0 && seats.length === 0 && authors.length === 0 && !emptyReply) {
    return { kind: "omit" };
  }
  return {
    kind: "assistant",
    text: text.length > 0 ? text : null,
    seats,
    authors,
    emptyReply,
  };
}

export function hasToolActivity(parts: unknown[]): boolean {
  return parts.some((part) => {
    if (!isRecord(part)) return false;
    const type = String(part.type ?? "");
    if (!type.startsWith("tool-") && type !== "dynamic-tool") return false;
    const state = String(part.state ?? "");
    return state === "input-streaming" || state === "input-available" || state === "call";
  });
}
