import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseOrgbotYaml } from "@/lib/orgbot-yaml";
import { slugifySeat, type Pack, type PackCard, type Profile, type Seat } from "@/lib/pack";

type ExampleQuery = {
  q?: string;
  topic?: string;
  official?: boolean;
};

const EXAMPLES_OWNER_ID = "00000000-0000-0000-0000-000000000001";

const EXAMPLE_OWNER: Profile = {
  id: EXAMPLES_OWNER_ID,
  githubLogin: "examples",
  name: "examples",
  avatarUrl: null,
};

type ExampleMeta = {
  id: string;
  slug: string;
  official: boolean;
  likesCount: number;
  clonesCount: number;
};

const EXAMPLE_META: ExampleMeta[] = [
  {
    id: "10000000-0000-0000-0000-000000000001",
    slug: "founder-desk",
    official: true,
    likesCount: 24,
    clonesCount: 128,
  },
  {
    id: "10000000-0000-0000-0000-000000000002",
    slug: "clinic-qa",
    official: false,
    likesCount: 11,
    clonesCount: 47,
  },
  {
    id: "10000000-0000-0000-0000-000000000003",
    slug: "stencil",
    official: false,
    likesCount: 3,
    clonesCount: 12,
  },
];

let cached: Pack[] | null = null;

function examplesRoot(): string {
  return join(process.cwd(), "examples");
}

function loadPack(meta: ExampleMeta): Pack {
  const dir = join(examplesRoot(), meta.slug);
  const manifest = parseOrgbotYaml(readFileSync(join(dir, "orgbots.yaml"), "utf8"));
  const readmeMd = readFileSync(join(dir, "README.md"), "utf8");
  const seats: Seat[] = [
    {
      id: `${meta.id}-desk`,
      name: manifest.desk.name,
      job: manifest.desk.job,
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
    },
    ...manifest.seats.map((seat, index) => ({
      id: `${meta.id}-${slugifySeat(seat.name)}`,
      name: seat.name,
      job: seat.job,
      repeatsWhen: seat.repeats_when ?? null,
      isDesk: false,
      sortOrder: index + 1,
    })),
  ];
  return {
    id: meta.id,
    owner: EXAMPLE_OWNER,
    slug: manifest.slug,
    name: manifest.name,
    description: manifest.description,
    githubUrl: null,
    license: manifest.license ?? null,
    official: meta.official,
    topics: manifest.topics,
    runtimes: manifest.runtimes,
    likesCount: meta.likesCount,
    clonesCount: meta.clonesCount,
    readmeMd,
    rule: manifest.rule,
    seats,
  };
}

function allExamplePacks(): Pack[] {
  if (!cached) {
    cached = EXAMPLE_META.map(loadPack);
  }
  return cached;
}

function toCard(pack: Pack): PackCard {
  return {
    id: pack.id,
    owner: pack.owner,
    slug: pack.slug,
    name: pack.name,
    description: pack.description,
    githubUrl: pack.githubUrl,
    license: pack.license,
    official: pack.official,
    topics: pack.topics,
    runtimes: pack.runtimes,
    likesCount: pack.likesCount,
    clonesCount: pack.clonesCount,
    seats: pack.seats,
  };
}

function matchesQuery(pack: Pack, query: ExampleQuery): boolean {
  if (query.official && !pack.official) return false;
  if (query.topic && !pack.topics.includes(query.topic)) return false;
  if (query.q) {
    const q = query.q.toLowerCase();
    const haystack = `${pack.name} ${pack.description} ${pack.slug}`.toLowerCase();
    if (!haystack.includes(q)) return false;
  }
  return true;
}

export function listExamplePacks(query: ExampleQuery = {}): PackCard[] {
  return allExamplePacks()
    .filter((pack) => matchesQuery(pack, query))
    .sort((a, b) => b.clonesCount - a.clonesCount || a.name.localeCompare(b.name))
    .map(toCard);
}

export function getExamplePack(owner: string, slug: string): Pack | null {
  if (owner !== EXAMPLE_OWNER.githubLogin) return null;
  return allExamplePacks().find((pack) => pack.slug === slug) ?? null;
}

export function getExampleProfile(login: string): Profile | null {
  if (login !== EXAMPLE_OWNER.githubLogin) return null;
  return EXAMPLE_OWNER;
}

export function listExamplePacksByOwner(login: string): PackCard[] {
  if (login !== EXAMPLE_OWNER.githubLogin) return [];
  return listExamplePacks();
}

export function listExampleTopics(): { topic: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const pack of allExamplePacks()) {
    for (const topic of pack.topics) {
      counts.set(topic, (counts.get(topic) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([topic, count]) => ({ topic, count }))
    .sort((a, b) => b.count - a.count || a.topic.localeCompare(b.topic));
}
