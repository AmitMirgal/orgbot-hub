import assert from "node:assert/strict";
import { test } from "node:test";
import {
  categoryClickRow,
  rankStartHereCategories,
} from "./start-here-clicks.ts";

const PARENT_ID = "11111111-1111-4111-8111-111111111111";

test("a category click keeps a signed-in user id and drops anything else", () => {
  assert.deepEqual(categoryClickRow("parent", PARENT_ID), {
    category: "parent",
    userId: PARENT_ID,
  });
  assert.deepEqual(categoryClickRow("realtor", null), {
    category: "realtor",
    userId: null,
  });
  assert.deepEqual(categoryClickRow("shop", "not-a-user"), {
    category: "shop",
    userId: null,
  });
  assert.equal(categoryClickRow("clinic", PARENT_ID), null);
});

test("category counts rank the most clicked slug first", () => {
  const ranked = rankStartHereCategories([
    { category: "parent", clicks: 1 },
    { category: "realtor", clicks: 1 },
    { category: "developer", clicks: 3 },
    { category: "clinic", clicks: 9 },
    { category: "founder", clicks: 1.5 },
  ]);
  assert.deepEqual(
    ranked.map((row) => [row.category, row.clicks]),
    [
      ["developer", 3],
      ["parent", 1],
      ["realtor", 1],
      ["founder", 0],
      ["shop", 0],
    ]
  );
});
