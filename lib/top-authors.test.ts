import assert from "node:assert/strict";
import { test } from "node:test";
import { topAuthors } from "./top-authors.ts";

function pack(
  login: string,
  visitsCount: number,
  featured = false
): {
  owner: { githubLogin: string; name: string | null; avatarUrl: string | null };
  visitsCount: number;
  featured: boolean;
} {
  return {
    owner: { githubLogin: login, name: login, avatarUrl: null },
    visitsCount,
    featured,
  };
}

test("topAuthors dedupes owners and ranks by visits then featured", () => {
  const authors = topAuthors(
    [
      pack("low", 1),
      pack("mid", 4),
      pack("featured-low", 4, true),
      pack("high", 10),
      pack("high", 2),
      pack("skip", 0),
      pack("fifth", 3),
    ],
    5
  );
  assert.deepEqual(
    authors.map((author) => author.githubLogin),
    ["high", "featured-low", "mid", "fifth", "low"]
  );
});

test("topAuthors returns fewer than five when the catalog is small", () => {
  const authors = topAuthors([pack("poteto", 2, true), pack("kristaletz", 9)]);
  assert.deepEqual(
    authors.map((author) => author.githubLogin),
    ["kristaletz", "poteto"]
  );
});
