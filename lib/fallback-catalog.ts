import { parseGrokTemplateUrl } from "@/lib/grok-url";
import { type Pack, type PackCard, type Profile, type Seat } from "@/lib/pack";
import { matchesSeatBand, type SeatBand } from "@/lib/topics";

export type FallbackQuery = {
  q?: string;
  topic?: string;
  featured?: boolean;
  seatBand?: SeatBand;
};

const EXAMPLES_OWNER_ID = "00000000-0000-0000-0000-000000000001";
const POTETO_OWNER_ID = "00000000-0000-0000-0000-000000000002";
const KRISTA_OWNER_ID = "00000000-0000-0000-0000-000000000003";
const ERIC_OWNER_ID = "00000000-0000-0000-0000-000000000004";

const EXAMPLES_OWNER: Profile = {
  id: EXAMPLES_OWNER_ID,
  githubLogin: "examples",
  name: "examples",
  avatarUrl: null,
  xHandle: null,
};

const POTETO_OWNER: Profile = {
  id: POTETO_OWNER_ID,
  githubLogin: "poteto",
  name: "Lauren Tan",
  avatarUrl: null,
  xHandle: "poteto",
};

const KRISTA_OWNER: Profile = {
  id: KRISTA_OWNER_ID,
  githubLogin: "kristaletz",
  name: "Krista Letz",
  avatarUrl: "https://avatars.githubusercontent.com/u/225127725?v=4",
  xHandle: "kristaletz",
};

const ERIC_OWNER: Profile = {
  id: ERIC_OWNER_ID,
  githubLogin: "ericzakariasson",
  name: "Eric Zakariasson",
  avatarUrl: "https://avatars.githubusercontent.com/u/25622412?v=4",
  xHandle: "ericzakariasson",
};

function seat(partial: Omit<Seat, "grokTemplateUrl"> & { grokTemplateUrl?: string | null }): Seat {
  return {
    ...partial,
    grokTemplateUrl: parseGrokTemplateUrl(partial.grokTemplateUrl) ?? null,
  };
}

const LAUREN: Pack = {
  id: "10000000-0000-0000-0000-000000000010",
  owner: POTETO_OWNER,
  slug: "lauren",
  name: "Lauren",
  description:
    "Public Grok Bot templates Lauren Tan (@poteto) has shared. One pack, her roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: true,
  topics: ["founder", "developer"],
  likesCount: 0,
  installsCount: 0,
  routingRule:
    'Random and “make me a bot” stay at Dr Eggbot. Use a named seat only when that job is already in this pack.',
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots she published as https://x.ai/bot/… belong here. When she publishes another official link, add a seat. Do not invent unpublished Eng/PM/recruiter bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000001",
      name: "Dr Eggbot",
      job: "Builds other Grok bots after a short interview. Coding bots get her stack conventions.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/93gOz3op1UQdBdbekQFLK",
    }),
  ],
};

const KRISTA: Pack = {
  id: "10000000-0000-0000-0000-000000000011",
  owner: KRISTA_OWNER,
  slug: "krista",
  name: "Krista",
  description:
    "Public Grok Bot templates Krista Letz (@kristaletz) has shared. One pack, her roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  routingRule:
    "Random GTM questions stay at PG. Use Echo only for call-to-slides. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots she published as https://x.ai/bot/… belong here. When she publishes another official link, add a seat. Do not invent unpublished Chief of Staff or Salesforce bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000002",
      name: "PG",
      job: "Prospecting bot that researches accounts, watches recent podcasts and webinars for personal hooks, and can optionally sign into X or LinkedIn to find recent posts. Builds a contact spreadsheet and drafts outreach from CRM and meeting notes.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/fcJJMM58AdXSTBdW3xWyW",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000003",
      name: "Echo",
      job: "Turns a customer call into slides from customer context. Works with Figma or Google Slides, and Granola or Gong notes.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/ph5mcXqVy2p176Br7BJYi",
    }),
  ],
};

const ERIC: Pack = {
  id: "10000000-0000-0000-0000-000000000012",
  owner: ERIC_OWNER,
  slug: "eric",
  name: "Eric",
  description:
    "Public Grok Bot templates Eric Zakariasson (@ericzakariasson) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  routingRule:
    "Random questions stay at Projects Manager. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished Coder, Writer, or Researcher bots from his guide.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000004",
      name: "Projects Manager",
      job: "A Grok Bot projects manager. Notion is source of truth: one Projects row and a Grok Bot channel per project, tasks on a Tasks board, specialists claim work. The user decides. Agents execute. Does not do specialist work.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/FU-Ev6_Ju4lFGWwWRD0GD",
    }),
  ],
};

const ALL_PACKS: Pack[] = [LAUREN, KRISTA, ERIC];
const ALL_PROFILES: Profile[] = [POTETO_OWNER, EXAMPLES_OWNER, KRISTA_OWNER, ERIC_OWNER];

function toCard(pack: Pack): PackCard {
  const { readmeMd: _readme, routingRule: _rule, ...card } = pack;
  return card;
}

function matchesQuery(pack: Pack, query: FallbackQuery): boolean {
  if (query.featured && !pack.featured) return false;
  if (query.topic && !pack.topics.includes(query.topic)) return false;
  if (!matchesSeatBand(pack.seats.length, query.seatBand)) return false;
  if (query.q) {
    const q = query.q.toLowerCase();
    const haystack = [
      pack.name,
      pack.description,
      pack.slug,
      pack.topics.join(" "),
      ...pack.seats.map((item) => item.name),
    ]
      .join(" ")
      .toLowerCase();
    if (!haystack.includes(q)) return false;
  }
  return true;
}

function sortPacks(packs: Pack[]): Pack[] {
  return packs.slice().sort((a, b) => {
    if (a.featured !== b.featured) return Number(b.featured) - Number(a.featured);
    if (a.installsCount !== b.installsCount) return b.installsCount - a.installsCount;
    return a.name.localeCompare(b.name);
  });
}

export function listFallbackPacks(query: FallbackQuery = {}): PackCard[] {
  return sortPacks(ALL_PACKS.filter((pack) => matchesQuery(pack, query))).map(toCard);
}

export function getFallbackPack(owner: string, slug: string): Pack | null {
  return ALL_PACKS.find((pack) => pack.owner.githubLogin === owner && pack.slug === slug) ?? null;
}

export function getFallbackProfile(login: string): Profile | null {
  return ALL_PROFILES.find((profile) => profile.githubLogin === login) ?? null;
}

export function listFallbackPacksByOwner(login: string): PackCard[] {
  return listFallbackPacks().filter((pack) => pack.owner.githubLogin === login);
}

export function listFallbackTopics(): { topic: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const pack of ALL_PACKS) {
    for (const topic of pack.topics) {
      counts.set(topic, (counts.get(topic) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([topic, count]) => ({ topic, count }))
    .sort((a, b) => b.count - a.count || a.topic.localeCompare(b.topic));
}

export function fallbackStats(): { packs: number; seats: number } {
  return {
    packs: ALL_PACKS.length,
    seats: ALL_PACKS.reduce((sum, pack) => sum + pack.seats.length, 0),
  };
}
