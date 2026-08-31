import assert from "node:assert/strict";
import { test } from "node:test";
import { getFallbackPack } from "./fallback-catalog.ts";
import {
  catalogAuthorFromOwner,
  parseCatalogSeat,
  publicXHandle,
  seatsFromPacks,
} from "./api-pack.ts";
import {
  authorsFromSeats,
  catalogThreadRender,
  seatsFromChatParts,
} from "./chat-seats.ts";

test("catalog seats carry the pack author identity", () => {
  const lauren = getFallbackPack("poteto", "lauren");
  assert.ok(lauren);
  const seats = seatsFromPacks([lauren]);
  assert.ok(seats.length > 0);
  for (const seat of seats) {
    assert.equal(seat.author.githubLogin, "poteto");
    assert.equal(seat.author.name, "Lauren Tan");
    assert.equal(seat.author.xHandle, "poteto");
  }
});

test("parseCatalogSeat fills author from pack.owner when omitted", () => {
  const parsed = parseCatalogSeat({
    id: "seat-1",
    name: "Desk",
    job: "Front desk",
    isDesk: true,
    grokTemplateUrl: "https://x.ai/bot/93gOz3op1UQdBdbekQFLK",
    packId: "pack-1",
    pack: {
      owner: "poteto",
      slug: "lauren",
      name: "Lauren",
      href: "/poteto/lauren",
    },
  });
  assert.ok(parsed);
  assert.equal(parsed.author.githubLogin, "poteto");
  assert.equal(parsed.author.xHandle, null);
});

test("seatsFromChatParts reads tool seats and unique authors", () => {
  const lauren = getFallbackPack("poteto", "lauren");
  const krista = getFallbackPack("kristaletz", "krista");
  assert.ok(lauren);
  assert.ok(krista);
  const mixed = [...seatsFromPacks([lauren]), ...seatsFromPacks([krista])];
  assert.ok(mixed.length >= 2);
  const parts = [
    {
      type: "tool-searchSeats",
      state: "output-available",
      output: { empty: false, seats: mixed },
    },
  ];
  const seats = seatsFromChatParts(parts);
  assert.equal(seats.length, mixed.length);
  const authors = authorsFromSeats(seats);
  assert.equal(authors.length, 2);
  assert.ok(authors.some((author) => author.githubLogin === "poteto"));
  assert.ok(authors.some((author) => author.githubLogin === "kristaletz"));
});

test("publicXHandle strips leading at signs", () => {
  assert.equal(publicXHandle("@poteto"), "poteto");
  assert.equal(publicXHandle("poteto"), "poteto");
  assert.equal(publicXHandle("  "), null);
  assert.equal(publicXHandle(null), null);
});

test("catalogAuthorFromOwner prefers explicit author fields", () => {
  const author = catalogAuthorFromOwner(
    { githubLogin: "poteto", name: "Lauren Tan", avatarUrl: null, xHandle: "poteto" },
    { name: "Overridden", xHandle: "other" }
  );
  assert.equal(author.githubLogin, "poteto");
  assert.equal(author.name, "Overridden");
  assert.equal(author.xHandle, "other");
});

test("catalogThreadRender omits empty and whitespace bubbles", () => {
  assert.equal(
    catalogThreadRender({
      role: "user",
      parts: [{ type: "text", text: "   " }],
      last: true,
      mix: true,
      waiting: false,
    }).kind,
    "omit"
  );
  assert.equal(
    catalogThreadRender({
      role: "assistant",
      parts: [{ type: "text", text: "" }],
      last: true,
      mix: true,
      waiting: true,
    }).kind,
    "omit"
  );
  assert.equal(
    catalogThreadRender({
      role: "assistant",
      parts: [{ type: "text", text: "\n" }],
      last: true,
      mix: true,
      waiting: true,
    }).kind,
    "omit"
  );
  const searching = catalogThreadRender({
    role: "assistant",
    parts: [{ type: "tool-searchSeats", state: "input-streaming" }],
    last: true,
    mix: true,
    waiting: true,
  });
  assert.equal(searching.kind, "omit");
  const typed = catalogThreadRender({
    role: "assistant",
    parts: [{ type: "text", text: "  Mix these seats.  " }],
    last: true,
    mix: true,
    waiting: true,
  });
  assert.equal(typed.kind, "assistant");
  if (typed.kind === "assistant") {
    assert.equal(typed.text, "Mix these seats.");
    assert.equal(typed.emptyReply, false);
  }
  const emptyReply = catalogThreadRender({
    role: "assistant",
    parts: [{ type: "text", text: "" }],
    last: true,
    mix: true,
    waiting: false,
  });
  assert.equal(emptyReply.kind, "assistant");
  if (emptyReply.kind === "assistant") {
    assert.equal(emptyReply.text, null);
    assert.equal(emptyReply.emptyReply, true);
  }
});

