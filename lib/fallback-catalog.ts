import { parseGrokTemplateUrl } from "@/lib/grok-url";
import {
  DEFAULT_ROUTING_RULE,
  type Pack,
  type PackCard,
  type Profile,
  type Seat,
} from "@/lib/pack";
import { matchesSeatBand, type SeatBand } from "@/lib/topics";

export type FallbackQuery = {
  q?: string;
  topic?: string;
  featured?: boolean;
  seatBand?: SeatBand;
};

const EXAMPLES_OWNER_ID = "00000000-0000-0000-0000-000000000001";
const POTETO_OWNER_ID = "00000000-0000-0000-0000-000000000002";

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
    seat({
      id: "20000000-0000-0000-0000-000000000002",
      name: "point peddler",
      job: "Credit-card and airline points. One job: how to book.",
      repeatsWhen: "the same booking question comes back",
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/PFD95widaEeqjkYLLUZmD",
    }),
  ],
};

const CLINIC: Pack = {
  id: "10000000-0000-0000-0000-000000000002",
  owner: EXAMPLES_OWNER,
  slug: "clinic-qa",
  name: "Clinic QA desk",
  description:
    "A triage desk for a clinic-style QA loop. Intake stays named. Random stays at triage. No patient records. No clinic secrets.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["clinic"],
  likesCount: 0,
  installsCount: 0,
  routingRule: DEFAULT_ROUTING_RULE,
  readmeMd:
    "Stencil only. Front desk plus QA-style seats. Do not put PHI here. Do not invent a live https://x.ai/bot/… link until you publish one.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000011",
      name: "Triage",
      job: "Sort inbound reports. Keep one-off questions. Hand repeating failure modes to a seat.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000012",
      name: "Intake",
      job: "Capture the report with the same fields every time.",
      repeatsWhen: "every new ticket needs the same form",
      isDesk: false,
      sortOrder: 1,
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000013",
      name: "QA",
      job: "Reproduce, grade severity, write the regression note.",
      repeatsWhen: "the same class of defect returns",
      isDesk: false,
      sortOrder: 2,
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000014",
      name: "Follow-up",
      job: "Close the loop with the reporter in plain language.",
      repeatsWhen: "status updates are themselves a job",
      isDesk: false,
      sortOrder: 3,
    }),
  ],
};

const STENCIL: Pack = {
  id: "10000000-0000-0000-0000-000000000003",
  owner: EXAMPLES_OWNER,
  slug: "stencil",
  name: "Empty stencil",
  description: "A blank roster. Desk plus one untitled seat you replace when a job repeats.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  routingRule: DEFAULT_ROUTING_RULE,
  readmeMd:
    "Start here. The desk is real. The untitled seat is a reminder, not a personality. Add an official https://x.ai/bot/… link before anyone can install.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000021",
      name: "Front desk",
      job: "Hold every question until a job has repeated enough to earn a seat.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000022",
      name: "Untitled seat",
      job: "Replace this the moment the same job comes back twice.",
      repeatsWhen: "you notice you are answering the same thing again",
      isDesk: false,
      sortOrder: 1,
    }),
  ],
};

const ALL_PACKS: Pack[] = [LAUREN, CLINIC, STENCIL];
const ALL_PROFILES: Profile[] = [POTETO_OWNER, EXAMPLES_OWNER];

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
