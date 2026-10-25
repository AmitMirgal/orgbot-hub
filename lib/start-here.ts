import { parseGrokTemplateUrl } from "@/lib/grok-url";

export const START_PERSONA_SLUGS = [
  "parent",
  "realtor",
  "shop",
  "founder",
  "developer",
] as const;

export type StartPersonaSlug = (typeof START_PERSONA_SLUGS)[number];

export type StartSafetyMode =
  | "read-only"
  | "drafts"
  | "acts with approval"
  | "not stated";

export type StartCard = {
  botName: string;
  byline: string;
  packPath: string | null;
  grokTemplateUrl: string;
  firstMessage: string;
  safety: {
    line: string;
    mode: StartSafetyMode;
    sourceQuote: string;
  };
  sample: string[];
  verifiedAt: string;
};

export type StartPersona = {
  slug: StartPersonaSlug;
  label: string;
  title: string;
  blurb: string;
  cards: StartCard[];
  missing: string | null;
};

export const SAMPLE_FAKE_DATA_LABEL = "Sample, fake data";

const VERIFIED_OCT_24 = "2026-10-24T17:11:00.000Z";
const VERIFIED_OCT_25 = "2026-10-25T05:20:00.000Z";

function officialUrl(raw: string): string {
  const parsed = parseGrokTemplateUrl(raw);
  if (!parsed) {
    throw new Error(`Start Here card is missing an official x.ai URL: ${raw}`);
  }
  return parsed;
}

// v1 picks are hand-curated and reviewed in PRs, may later be reordered within a persona using click data, and unreviewed bots are never auto-added.
export const START_PERSONAS: StartPersona[] = [
  {
    slug: "parent",
    label: "Parent",
    title: "A parent who runs a household",
    blurb:
      "School email, bills, and the family calendar. Three bots that read and remind you.",
    missing: null,
    cards: [
      {
        botName: "School Desk",
        byline: "Bowie",
        packPath: "/BowieHole/bowie",
        grokTemplateUrl: officialUrl("https://x.ai/bot/fk_sA7YhYV3Gzb4wNNbvP"),
        firstMessage:
          "Set me up. My kids are Maya (Lincoln Elementary, school emails come from @lincoln.k12.us) and Leo (Ridge Middle, @ridgems.org). Send my evening digest at 8pm.",
        safety: {
          line: "Reads Gmail from the school senders you list and writes events to Google Calendar. Routines stay off until you approve. It never pays, signs, RSVPs, or messages anyone.",
          mode: "acts with approval",
          sourceQuote:
            "For busy parents: turns school emails into calendar events with reminders days ahead, so you know the night before what to pack, wear, sign or pay.",
        },
        sample: [
          "Tonight's digest, Tue: Maya: picture day tomorrow, wear the blue shirt. Leo: field trip form due Fri ($12). I added both to your calendar with a reminder Thursday night.",
        ],
        verifiedAt: VERIFIED_OCT_24,
      },
      {
        botName: "Bill Watch",
        byline: "Jeffrey",
        packPath: "/mcleodagency/jeffrey",
        grokTemplateUrl: officialUrl("https://x.ai/bot/Gs_3xTnLsFwkgUoRbKcrc"),
        firstMessage:
          "Find the bills and subscriptions in my Gmail. Every Monday morning, tell me what's due in the next 2 weeks and flag any free trial about to start charging.",
        safety: {
          line: "Reads Gmail for bills and subscriptions. Read-only: it never pays, cancels, or replies.",
          mode: "read-only",
          sourceQuote: "Reads Gmail for bills and subscriptions.",
        },
        sample: [
          "Monday money check-in: 4 things due by Nov 9. Electric $84 (Nov 3). Car insurance $212 (Nov 6). StreamFlix trial turns into $15.99/mo on Nov 5. Gym price goes up $10 from Nov 8.",
        ],
        verifiedAt: VERIFIED_OCT_24,
      },
      {
        botName: "WMP",
        byline: "Caleeeb",
        packPath: "/gearcaleeeb/caleeeb",
        grokTemplateUrl: officialUrl("https://x.ai/bot/iPOF34o7dtafNEpVhIQRt"),
        firstMessage:
          "Keep me current on my partner's and kids' birthdays, appointments, school events, and family plans from my Google Calendar, and ping me in time to act.",
        safety: {
          line: "Reads your Google Calendar and pings you in time to act. Whether it ever writes to your calendar or messages anyone else is not stated.",
          mode: "not stated",
          sourceQuote:
            "A warm, discreet assistant that keeps you current on your partner's and kids' birthdays, appointments, school events, and family plans from your Google.",
        },
        sample: [
          "Heads up: Sam's dentist appointment is Thu at 4pm, and you have a meeting until 4:30. Maya's school play is next Fri at 6pm. Your partner's birthday is in 9 days, Nov 3.",
        ],
        verifiedAt: VERIFIED_OCT_25,
      },
    ],
  },
  {
    slug: "realtor",
    label: "Realtor",
    title: "A realtor",
    blurb: "Listing photos and old leads. Two bots for now; the third is still missing.",
    missing:
      "No bot in the catalog yet drafts lead follow-ups for agents and tracks showing feedback and offer or closing deadlines. Built one? This is a future Wanted item.",
    cards: [
      {
        botName: "PhotoFix",
        byline: "Mars",
        packPath: "/MarsHomestead/mars",
        grokTemplateUrl: officialUrl("https://x.ai/bot/PRdnJ63L8h0FVlMAA1UN4"),
        firstMessage:
          "Here are 24 photos from 418 Oak St. Polish them honestly, label each by room, and file them under the address in my Google Drive.",
        safety: {
          line: "Edits your listing photos and files them by address in Google Drive or Dropbox. Whether it ever sends photos to clients itself is not stated.",
          mode: "not stated",
          sourceQuote:
            "PhotoFix is an AI photo editor that polishes real estate listing photos for agents, photographers, FSBO sellers, rental owners, and vacation-rental.",
        },
        sample: [
          "418 Oak St: 24 photos polished (exposure and straightening only, no virtual changes). Filed in Drive > Listings > 418 Oak St as 01-Front, 02-Living, 03-Kitchen and so on. 2 shots too blurry to fix: 11-Bath2, 19-Garage.",
        ],
        verifiedAt: VERIFIED_OCT_24,
      },
      {
        botName: "Old Leads Finder",
        byline: "Wes",
        packPath: "/realwesfoster/wes",
        grokTemplateUrl: officialUrl("https://x.ai/bot/9hId24lSr5Rc_cSUR5evc"),
        firstMessage:
          "Look through my CRM and my sales inbox from the past 18 months and give me the 10 buyers and sellers I never closed who are most worth a call this week.",
        safety: {
          line: "Reads your CRM and sales inbox and hands you a ranked list. Whether it drafts or sends any messages is not stated.",
          mode: "not stated",
          sourceQuote: "Reads your CRM and sales inbox and hands you a ranked list.",
        },
        sample: [
          "Top 3 of 10: 1) Dana R., toured 3 condos in March, went quiet after rates rose. 2) The Parks, asked for a CMA in June, no follow-up logged. 3) Sam T., renter, lease ends in January.",
        ],
        verifiedAt: VERIFIED_OCT_24,
      },
    ],
  },
  {
    slug: "shop",
    label: "Shopify shop owner",
    title: "A Shopify shop owner",
    blurb:
      "For shops that sell on Shopify: watch your store, track your shipments, and keep the admin around them moving.",
    missing: null,
    cards: [
      {
        botName: "Shopify Store Manager",
        byline: "Jono",
        packPath: "/ibuildthings/jono",
        grokTemplateUrl: officialUrl("https://x.ai/bot/ugu85YlM4ARybmt6SDJI8"),
        firstMessage:
          "Watch my Shopify store every day. Stay quiet when it's healthy, and tell me when orders, payments, inventory, or checkout need me.",
        safety: {
          line: "Reads your Shopify orders, payments, inventory, storefront, and checkout. Monitor-only: it never changes your store or messages customers unless you ask.",
          mode: "read-only",
          sourceQuote:
            "Watches your Shopify store every day (orders, payments, inventory, storefront, and checkout), stays quiet when everything's healthy, and alerts you only.",
        },
        sample: [
          "Heads up: checkout errors jumped to 9 in the last hour (usually 0). Also, Lavender Candle 8oz is down to 3 left. Everything else looks normal.",
        ],
        verifiedAt: VERIFIED_OCT_24,
      },
      {
        botName: "Tracking Tuna Officer",
        byline: "Fish",
        packPath: "/FishxCD/fish",
        grokTemplateUrl: officialUrl("https://x.ai/bot/xy9stZRQESHWGilhQl9Nf"),
        firstMessage:
          "Every Monday, check tracking on everything I shipped last week, log it in a spreadsheet, and put stuck or returned packages at the top.",
        safety: {
          line: "Reads tracking for your Shopify store's shipped orders, records it in a spreadsheet, and sends you a short report. Read-only on your store.",
          mode: "read-only",
          sourceQuote:
            "Keeps an eye on your Shopify store's shipped orders. Every week it checks each package's tracking, records it in a spreadsheet, and sends you a short.",
        },
        sample: [
          "Weekly report: 61 shipped, 57 delivered. Stuck: #1043 (no scan in 6 days, Memphis hub), #1051 (address issue). Returned: #1038.",
        ],
        verifiedAt: VERIFIED_OCT_24,
      },
      {
        botName: "Chief",
        byline: "Top",
        packPath: "/TopShelfCapital/top",
        grokTemplateUrl: officialUrl("https://x.ai/bot/A4haB5wrqQewiNFIukYZ5"),
        firstMessage:
          "I run a two-person bakery. Track my license renewals and tax filings, and draft this week's customer email and two social posts for me to approve.",
        safety: {
          line: "Drafts emails and social posts for your approval and watches for replies. It also says it keeps your website current; how it changes the site, and whether it asks first, is not stated.",
          mode: "drafts",
          sourceQuote:
            "A chief of staff for small business owners. It tracks compliance and filings, drafts emails and social posts for your approval, keeps your website.",
        },
        sample: [
          "This week: food handler permit renews Nov 30. Q4 sales tax due Jan 20. Drafts ready for your OK: a Thanksgiving pie pre-order email and 2 posts. Nothing goes out until you approve.",
        ],
        verifiedAt: VERIFIED_OCT_24,
      },
    ],
  },
  {
    slug: "founder",
    label: "Solo founder",
    title: "A solo founder",
    blurb: "First customers, a sharper pitch, and follow-ups that don't slip.",
    missing: null,
    cards: [
      {
        botName: "First Customers Finder",
        byline: "Fabian",
        packPath: "/fabian_thepulse/fabian",
        grokTemplateUrl: officialUrl("https://x.ai/bot/1vDU_ekPGWy7UztJhp2yK"),
        firstMessage:
          "My product is a scheduling tool for dog groomers. Find me 5 real groomers each weekday morning and draft a first message to each.",
        safety: {
          line: "Finds leads and drafts the first message; you hit send. What it reads to find leads is not stated.",
          mode: "drafts",
          sourceQuote:
            "Finds 5 real leads for your product every weekday morning and drafts the first message. You just hit send.",
        },
        sample: [
          'Today\'s 5: Happy Paws Grooming (Tulsa), owner posted about no-shows last week. Draft: "Hi Jen, saw your post about Saturday no-shows..." Each draft is waiting for you to send.',
        ],
        verifiedAt: VERIFIED_OCT_24,
      },
      {
        botName: "Pitch Deck Coach",
        byline: "Hiten",
        packPath: "/hnshah/hiten",
        grokTemplateUrl: officialUrl("https://x.ai/bot/mqVPHm0oB3WPsnxbU1qB9"),
        firstMessage:
          "Here's my 12-slide seed deck. Tell me what an investor will understand, believe, question, and remember, then help me fix the weakest slide.",
        safety: {
          line: "Reviews the deck you give it and reports back. Whether it reads anything beyond that, or edits or sends anything, is not stated.",
          mode: "not stated",
          sourceQuote:
            "Reviews a pitch deck and reports what an investor is likely to understand, believe, question, and remember, then helps strengthen the story, evidence, and slides.",
        },
        sample: [
          "Understand: the problem, in 10 seconds. Believe: not yet, slide 6 claims 40% retention with no source. Question: why now? Remember: the groomer story. Fix first: slide 6.",
        ],
        verifiedAt: VERIFIED_OCT_24,
      },
      {
        botName: "FounderSales",
        byline: "Carolina",
        packPath: "/CarolinaDill/carolina",
        grokTemplateUrl: officialUrl("https://x.ai/bot/NWZOp_PkJhy87qGDCzGKi"),
        firstMessage:
          "I sell a scheduling tool to dog groomers. Research 10 prospects in Texas, draft outreach to each for me to approve, and remind me when a follow-up is due.",
        safety: {
          line: "Researches prospects and drafts outreach for you to approve, then keeps follow-ups from slipping. What accounts it reads is not stated.",
          mode: "drafts",
          sourceQuote:
            "A founder-led sales helper that researches prospects, drafts outreach for you to approve, and keeps follow-ups from slipping.",
        },
        sample: [
          "10 prospects researched. Drafts ready for your approval: 4 (Bark Avenue, Austin; Suds & Paws, Dallas; and 2 more). Follow-ups due Thu: Happy Paws, no reply since Oct 20. Nothing goes out until you approve.",
        ],
        verifiedAt: VERIFIED_OCT_25,
      },
    ],
  },
  {
    slug: "developer",
    label: "Developer",
    title: "A developer",
    blurb: "Your morning, your reviews, and the small fixes you never get to.",
    missing: null,
    cards: [
      {
        botName: "Engineer's Morning Brief",
        byline: "Mahdi",
        packPath: "/mahdi/mahdi",
        grokTemplateUrl: officialUrl("https://x.ai/bot/9b4DUFqQnCtrclcyzWs5x"),
        firstMessage:
          "Every weekday at 9:15, before my 9:30 standup, brief me on today's meetings, PRs waiting on me, failing CI, and messages that need me.",
        safety: {
          line: "Reads your meetings, PRs, CI status, and messages to write you one brief. Whether it writes or sends anything else is not stated.",
          mode: "not stated",
          sourceQuote:
            "Before standup each day, one short brief covering today's meetings, the PRs waiting on you, failing CI, and the messages that actually need you.",
        },
        sample: [
          "Mon brief: 3 meetings (standup, design review 2pm, 1:1 4pm). 2 PRs waiting on you: #482 auth refactor, #487 typo fix. CI red on main since 8:02 (flaky e2e?). 1 message needs you: Priya asks about the release date.",
        ],
        verifiedAt: VERIFIED_OCT_24,
      },
      {
        botName: "PR Reviewer",
        byline: "Mustafa",
        packPath: "/mustafaergisi/mustafa",
        grokTemplateUrl: officialUrl("https://x.ai/bot/rt629UEZFtE4Wz0A_0c37"),
        firstMessage:
          "Review https://github.com/acme/app/pull/482. Lead with what can break and what's untested.",
        safety: {
          line: "Reads pull requests through GitHub and asks you to connect it first. Whether it posts review comments on GitHub or only reports to you is not stated.",
          mode: "not stated",
          sourceQuote: "Point it at a pull request; it flags risk, missing tests, and thin context.",
        },
        sample: [
          "#482: Can break: token refresh now skips the retry path (session.ts L88). Untested: expired-token flow. The description promises a migration, but the diff has none. Nits: 2.",
        ],
        verifiedAt: VERIFIED_OCT_24,
      },
      {
        botName: "Repo Engineer",
        byline: "Rustam",
        packPath: "/RustamAtuev/rustam",
        grokTemplateUrl: officialUrl("https://x.ai/bot/iXfxVelc85rIxgZ9hLeXD"),
        firstMessage:
          "In acme/app, fix the date format on the invoices page so it uses the user's locale. Open a pull request and send me the link.",
        safety: {
          line: "Writes code: ships small GitHub fixes as pull requests through Cursor cloud agents. It never merges and never checks the repo out locally.",
          mode: "acts with approval",
          sourceQuote:
            "Ships small GitHub fixes as pull requests through Cursor cloud agents. For teams that want a manager-facing engineer bot that never merges and never deploys.",
        },
        sample: [
          "Opened PR #491: invoices page now formats dates with the user's locale. 3 files changed, tests added. Ready for your review; I won't merge it.",
        ],
        verifiedAt: VERIFIED_OCT_24,
      },
    ],
  },
];

export function isStartPersonaSlug(value: string): value is StartPersonaSlug {
  return (START_PERSONA_SLUGS as readonly string[]).includes(value);
}

export function getStartPersona(slug: string): StartPersona | null {
  if (!isStartPersonaSlug(slug)) return null;
  return START_PERSONAS.find((persona) => persona.slug === slug) ?? null;
}

export function startHerePackIdentity(
  packPath: string | null
): { owner: string; slug: string } | null {
  if (!packPath) return null;
  const match = /^\/([^/]+)\/([^/]+)$/.exec(packPath);
  if (!match) return null;
  return { owner: match[1], slug: match[2] };
}

export function listStartHereCards(): Array<{
  persona: StartPersona;
  card: StartCard;
}> {
  return START_PERSONAS.flatMap((persona) =>
    persona.cards.map((card) => ({ persona, card }))
  );
}
