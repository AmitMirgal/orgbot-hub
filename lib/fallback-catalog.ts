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
const NAOUFALELH_OWNER_ID = "00000000-0000-0000-0000-000000000005";

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

const NAOUFALELH_OWNER: Profile = {
  id: NAOUFALELH_OWNER_ID,
  githubLogin: "naoufalelh",
  name: "Naoufal El hassnaoui",
  avatarUrl: "https://avatars.githubusercontent.com/u/10200999?v=4",
  xHandle: "naoufal_elh",
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

const NAO: Pack = {
  id: "10000000-0000-0000-0000-000000000013",
  owner: NAOUFALELH_OWNER,
  slug: "nao",
  name: "Nao",
  description:
    "Public Grok Bot templates Nao (@naoufal_elh) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  routingRule:
    "Random questions stay at Rutin. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000005",
      name: "Rutin",
      job: "A Monday-morning optimizer that scans every bot's routines and proposes schedule fixes, including how many runs you save each week if you apply them. On first chat it runs that scan immediately, waits for your okay, then applies only what you approve.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/o4gWkNGmffEaVtOhaEsA7",
    }),
  ],
};

const ALL_PACKS: Pack[] = [LAUREN, NAO];
const ALL_PROFILES: Profile[] = [POTETO_OWNER, EXAMPLES_OWNER, NAOUFALELH_OWNER];

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
