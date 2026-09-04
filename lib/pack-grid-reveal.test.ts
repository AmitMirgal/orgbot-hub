import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import {
  initialRevealed,
  needsSentinel,
  nextRevealed,
} from "./pack-grid-reveal.ts";

test("empty list reveals nothing and hides the sentinel", () => {
  assert.equal(initialRevealed(0), 0);
  assert.equal(needsSentinel(0, 0), false);
  assert.equal(initialRevealed(-4), 0);
  assert.equal(needsSentinel(0, -4), false);
});

test("total 3 reveals all cards and hides the sentinel", () => {
  assert.equal(initialRevealed(3), 3);
  assert.equal(needsSentinel(3, 3), false);
  assert.equal(needsSentinel(3, 9), true);
});

test("total 160 starts at 9 with a sentinel", () => {
  assert.equal(initialRevealed(160), 9);
  assert.equal(needsSentinel(9, 160), true);
});

test("nextRevealed pages by 9 then clamps", () => {
  assert.equal(nextRevealed(9, 160), 18);
  assert.equal(nextRevealed(160, 160), 160);
  assert.equal(nextRevealed(nextRevealed(160, 160), 160), 160);
  assert.equal(nextRevealed(155, 160), 160);
});

test("pack grid owns the reveal window", () => {
  const src = readFileSync(
    fileURLToPath(new URL("../components/pack-grid.tsx", import.meta.url)),
    "utf8"
  );
  assert.match(src, /"use client"/);
  assert.match(src, /initialRevealed/);
  assert.match(src, /nextRevealed/);
  assert.match(src, /needsSentinel/);
  assert.match(src, /IntersectionObserver/);
  assert.match(src, /content-visibility:auto/);
  assert.match(src, /contain-intrinsic-size/);
  assert.match(src, /packs\.slice/);
});
