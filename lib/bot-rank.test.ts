import assert from "node:assert/strict";
import { test } from "node:test";
import { seatsFromPacks, type CatalogSeat } from "./api-pack.ts";
import { rankSeatsByFit } from "./bot-rank.ts";
import { getFallbackPack } from "./fallback-catalog.ts";
import { shortlistByToken } from "./seat-mix.ts";

function catalogSeats(): CatalogSeat[] {
  const lauren = getFallbackPack("poteto", "lauren");
  const krista = getFallbackPack("kristaletz", "krista");
  assert.ok(lauren);
  assert.ok(krista);
  return seatsFromPacks([lauren, krista]);
}

const jobs = ["slides", "plugin", "prospecting", "interview"];

test("rankSeatsByFit sorts by jev noul with the best bot first", async () => {
  const seats = catalogSeats();
  const tokenOrder = shortlistByToken(seats, jobs, 12).map((seat) => seat.name);
  assert.ok(tokenOrder.length >= 4);
  const ranked = await rankSeatsByFit(seats, jobs, {
    scoreBot: async (_query, seat) => {
      if (seat.name === "Echo") return 0.99;
      if (seat.name === "PG") return 0.8;
      if (seat.name === "Dr Eggbot") return 0.7;
      if (seat.name === "tinkabot") return 0.6;
      return 0.1;
    },
  });
  assert.deepEqual(
    ranked.map((seat) => seat.name),
    ["Echo", "PG", "tinkabot"]
  );
  assert.equal(tokenOrder.includes("Echo"), true);
  assert.equal(
    ranked.some((seat) => seat.name === "Dr Eggbot"),
    false
  );
  for (const seat of ranked) {
    assert.ok(seat.grokTemplateUrl.startsWith("https://x.ai/bot/"));
  }
});

test("rankSeatsByFit keeps the keyword shortlist when jev abstains", async () => {
  const seats = catalogSeats();
  const tokenOrder = shortlistByToken(seats, jobs, 12).map((seat) => seat.name);
  const ranked = await rankSeatsByFit(seats, jobs, {
    scoreBot: async () => null,
  });
  assert.equal(ranked[0]?.name, tokenOrder[0]);
  assert.ok(ranked.length > 0);
  assert.ok(ranked.length <= tokenOrder.length);
});

test("rankSeatsByFit drops a seat whose URL is not an official x.ai bot", async () => {
  const seats = catalogSeats();
  const ghost: CatalogSeat = {
    ...seats[0],
    id: "ghost",
    name: "Ghost",
    job: "slides plugin prospecting interview",
    grokTemplateUrl: "https://example.com/bot/not-official",
  };
  const ranked = await rankSeatsByFit([ghost, ...seats], jobs, {
    scoreBot: async () => 0.9,
  });
  assert.equal(
    ranked.some((seat) => seat.name === "Ghost"),
    false
  );
  assert.ok(ranked.every((seat) => seat.grokTemplateUrl.startsWith("https://x.ai/bot/")));
});
