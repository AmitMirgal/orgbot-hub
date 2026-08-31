import assert from "node:assert/strict";
import { test } from "node:test";
import { parseSupabaseUrl } from "./supabase/env.ts";

test("parseSupabaseUrl accepts http(s) origins and rejects placeholders", () => {
  assert.equal(parseSupabaseUrl("http://127.0.0.1:54321"), "http://127.0.0.1:54321");
  assert.equal(
    parseSupabaseUrl("https://abcdefghijklmnop.supabase.co"),
    "https://abcdefghijklmnop.supabase.co"
  );
  assert.equal(parseSupabaseUrl(undefined), undefined);
  assert.equal(parseSupabaseUrl(""), undefined);
  assert.equal(parseSupabaseUrl("not-a-url"), undefined);
  assert.equal(parseSupabaseUrl("postgres://127.0.0.1:5432/orgbots"), undefined);
  assert.equal(
    parseSupabaseUrl("[https://abcdefghijklmnop.supabase.co](https://abcdefghijklmnop.supabase.co)"),
    "https://abcdefghijklmnop.supabase.co"
  );
});
