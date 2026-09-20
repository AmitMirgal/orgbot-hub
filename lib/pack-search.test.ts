import assert from "node:assert/strict";
import { test } from "node:test";
import type { PublicPack } from "./api-pack.ts";
import {
  PACK_SEARCH_LIMIT,
  packTokenScore,
  searchAndRerankPacks,
  shortlistPacks,
} from "./pack-search.ts";

function pack(
  partial: Partial<PublicPack> & { slug: string; name: string }
): PublicPack {
  return {
    owner: partial.owner ?? "author",
    slug: partial.slug,
    name: partial.name,
    description: partial.description ?? "",
    githubUrl: null,
    official: false,
    featured: false,
    topics: partial.topics ?? [],
    href: `/${partial.owner ?? "author"}/${partial.slug}`,
    visitsCount: partial.visitsCount ?? 0,
    seats: partial.seats ?? [],
  };
}

const hiring = pack({
  slug: "hiring",
  name: "Founder hiring",
  description: "A desk for recruiting",
  seats: [
    {
      name: "Recruiter",
      job: "Source and screen software engineers",
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/hire1",
    },
  ],
});
const billing = pack({
  slug: "billing",
  name: "Clinic billing",
  description: "Claims desk",
  seats: [
    {
      name: "Billing",
      job: "Clinic invoices and claims",
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/bill1",
    },
  ],
});
const named = pack({
  slug: "lauren",
  name: "Lauren",
  description: "Personal desk",
  owner: "poteto",
});

test("token score prefers a hiring pack for a hiring query", () => {
  assert.ok(packTokenScore(hiring, "help me hire engineers") > packTokenScore(billing, "help me hire engineers"));
});

test("shortlist keeps keyword hits first and fills related packs", () => {
  const shortlist = shortlistPacks([named], [named, hiring, billing], "help me hire engineers");
  assert.equal(shortlist[0]?.slug, "lauren");
  assert.ok(shortlist.some((item) => item.slug === "hiring"));
});

test("searchAndRerankPacks shortlists, re-ranks, and caps results", async () => {
  const recruiter = pack({
    slug: "recruiter-bot",
    name: "Recruiter bot",
    description: "Engineer hiring assistant",
    seats: [
      {
        name: "Sourcer",
        job: "Hire engineers",
        isDesk: false,
        sortOrder: 1,
        grokTemplateUrl: "https://x.ai/bot/rec1",
      },
    ],
  });
  const extras = Array.from({ length: 12 }, (_, i) =>
    pack({ slug: `eng-${i}`, name: `Eng ${i}`, description: "engineers" })
  );
  const catalog = [billing, named, hiring, recruiter, ...extras];
  let rerankInput: string[] = [];
  const result = await searchAndRerankPacks(
    { q: "hire software engineers" },
    {
      listPacks: async (query) => (query.q ? [] : catalog),
      rerank: async (_query, packs) => {
        rerankInput = packs.map((item) => item.slug);
        const preferred = packs.filter((item) => item.slug === "hiring");
        const rest = packs.filter((item) => item.slug !== "hiring");
        return [...preferred, ...rest];
      },
    }
  );
  assert.equal(result.empty, false);
  assert.ok(rerankInput.includes("hiring"));
  assert.equal(result.packs[0]?.slug, "hiring");
  assert.ok(result.packs.length <= PACK_SEARCH_LIMIT);
  assert.equal(result.packs.length, PACK_SEARCH_LIMIT);
});

test("searchAndRerankPacks without a query skips re-rank", async () => {
  let reranked = 0;
  const result = await searchAndRerankPacks(
    {},
    {
      listPacks: async () => [billing, hiring],
      rerank: async (_query, packs) => {
        reranked += 1;
        return packs;
      },
    }
  );
  assert.equal(reranked, 0);
  assert.deepEqual(
    result.packs.map((item) => item.slug),
    ["billing", "hiring"]
  );
});
