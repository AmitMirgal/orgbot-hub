import { parseGrokTemplateUrl } from "@/lib/grok-url";
import { type Pack, type PackCard, type Profile, type Seat } from "@/lib/pack";
import { sortPacksByVisits } from "@/lib/visits-count";
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
const NAOUFALELH_OWNER_ID = "00000000-0000-0000-0000-000000000005";
const GNURIO_OWNER_ID = "00000000-0000-0000-0000-000000000006";
const HNSHAH_OWNER_ID = "00000000-0000-0000-0000-000000000007";
const BRADSHANNON_OWNER_ID = "00000000-0000-0000-0000-000000000008";
const FARZYNESS_OWNER_ID = "00000000-0000-0000-0000-000000000009";
const CJBLEV_OWNER_ID = "00000000-0000-0000-0000-000000000010";
const TALSIACH_OWNER_ID = "00000000-0000-0000-0000-000000000011";
const THESMITPATEL_OWNER_ID = "00000000-0000-0000-0000-000000000012";
const DANNYLIMANSETA_OWNER_ID = "00000000-0000-0000-0000-000000000013";
const MASSIMODELUISA_OWNER_ID = "00000000-0000-0000-0000-000000000014";
const MAIYANGAI_OWNER_ID = "00000000-0000-0000-0000-000000000015";

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

const NAOUFALELH_OWNER: Profile = {
  id: NAOUFALELH_OWNER_ID,
  githubLogin: "naoufalelh",
  name: "Naoufal El hassnaoui",
  avatarUrl: "https://avatars.githubusercontent.com/u/10200999?v=4",
  xHandle: "naoufal_elh",
};

const GNURIO_OWNER: Profile = {
  id: GNURIO_OWNER_ID,
  githubLogin: "gnurio",
  name: "George Nurijanian",
  avatarUrl: "https://avatars.githubusercontent.com/u/6743730?v=4",
  xHandle: "nurijanian",
};

const HNSHAH_OWNER: Profile = {
  id: HNSHAH_OWNER_ID,
  githubLogin: "hnshah",
  name: "Hiten Shah",
  avatarUrl: "https://avatars.githubusercontent.com/u/3155200?v=4",
  xHandle: "hnshah",
};

const BRADSHANNON_OWNER: Profile = {
  id: BRADSHANNON_OWNER_ID,
  githubLogin: "BradShannon",
  name: "Brad Shannon",
  avatarUrl: "https://avatars.githubusercontent.com/u/3514881?v=4",
  xHandle: "bradshannon",
};

const FARZYNESS_OWNER: Profile = {
  id: FARZYNESS_OWNER_ID,
  githubLogin: "farzyness",
  name: "Farzad",
  avatarUrl: "https://avatars.githubusercontent.com/u/253716664?v=4",
  xHandle: "farzyness",
};

const CJBLEV_OWNER: Profile = {
  id: CJBLEV_OWNER_ID,
  githubLogin: "cjblev",
  name: "Corey",
  avatarUrl: null,
  xHandle: "cjblev",
};

const TALSIACH_OWNER: Profile = {
  id: TALSIACH_OWNER_ID,
  githubLogin: "talsiach",
  name: "Tal Siach",
  avatarUrl: null,
  xHandle: "Talsiach",
};

const THESMITPATEL_OWNER: Profile = {
  id: THESMITPATEL_OWNER_ID,
  githubLogin: "thesmitpatel",
  name: "Smit Patel",
  avatarUrl: null,
  xHandle: "thesmitpatel",
};

const DANNYLIMANSETA_OWNER: Profile = {
  id: DANNYLIMANSETA_OWNER_ID,
  githubLogin: "dannylimanseta",
  name: "Danny Limanseta",
  avatarUrl: null,
  xHandle: "DannyLimanseta",
};

const MASSIMODELUISA_OWNER: Profile = {
  id: MASSIMODELUISA_OWNER_ID,
  githubLogin: "massimodeluisa",
  name: "Massimo De Luisa",
  avatarUrl: null,
  xHandle: "massimodeluisa",
};

const MAIYANGAI_OWNER: Profile = {
  id: MAIYANGAI_OWNER_ID,
  githubLogin: "MaiYangAI",
  name: "Mai Yang",
  avatarUrl: null,
  xHandle: "MaiYangAI",
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
  visitsCount: 0,
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
  visitsCount: 0,
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
  visitsCount: 0,
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
  visitsCount: 0,
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

const GEORGE: Pack = {
  id: "10000000-0000-0000-0000-000000000014",
  owner: GNURIO_OWNER,
  slug: "george",
  name: "George",
  description:
    "Public Grok Bot templates George Nurijanian (@nurijanian) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at AI PM OS. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. This sample is not the full paid AI PM OS.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000006",
      name: "AI PM OS",
      job: "A sample of the AI PM OS for product managers. Default recipe is Problem First. Also has Make Requirements Great and Decisions. Does not include the full 243-skill paid OS.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/9dtfHw4LHmwc5uBC-a9vj",
    }),
  ],
};

const HITEN: Pack = {
  id: "10000000-0000-0000-0000-000000000015",
  owner: HNSHAH_OWNER,
  slug: "hiten",
  name: "Hiten",
  description:
    "Public Grok Bot templates Hiten Shah (@hnshah) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random pitch questions stay at Pitch Deck Coach. Use It's Britney only for Britney dance clips. Use Product Idea Stress Test only for idea and assumption testing. Use The Page only for public-page change watches. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. Do not add Box Inspector; that template is by SuddenlyJon.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000007",
      name: "Pitch Deck Coach",
      job: "Reviews a pitch deck and reports what an investor is likely to understand, believe, question, and remember, then helps strengthen the story, evidence, and slides.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/mqVPHm0oB3WPsnxbU1qB9",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000008",
      name: "It's Britney",
      job: "Sends random Britney Spears internet dance clips, timed to significant hours of the day.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/pNLwpHs8rmtMzAkUi-Zu2",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000012",
      name: "Product Idea Stress Test",
      job: "Investigates a product or startup idea for founders. Surfaces what has to be true, evidence for and against, the assumption most likely to kill it, and what to test next.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 2,
      grokTemplateUrl: "https://x.ai/bot/JeFTvcDX-7QT2evKGIb52",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000013",
      name: "The Page",
      job: "Watches 3–5 public pages once each morning and messages only when the thing you care about actually changed. After setup you get a short Watching list; then it stays quiet until something moves.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 3,
      grokTemplateUrl: "https://x.ai/bot/uFRK1GoAsiopBLPY19QCe",
    }),
  ],
};

const BRAD: Pack = {
  id: "10000000-0000-0000-0000-000000000016",
  owner: BRADSHANNON_OWNER,
  slug: "brad",
  name: "Brad",
  description:
    "Public Grok Bot templates Brad Shannon (@bradshannon) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Bouncer. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000009",
      name: "Bouncer",
      job: "Reviews a public Grok Bot share link or pasted config before you add it. Quotes findings and returns CLEAN, WARN, or BLOCK-recommended, and does not add, install, spend, or post.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/cGcG0msqfz7o7J3QMLhbE",
    }),
  ],
};

const FARZAD: Pack = {
  id: "10000000-0000-0000-0000-000000000017",
  owner: FARZYNESS_OWNER,
  slug: "farzad",
  name: "Farzad",
  description:
    "Public Grok Bot templates Farzad (@farzyness) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Claudey. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000010",
      name: "Claudey",
      job: "Runs Anthropic Claude Code for frontend, UI, and architecture work. Defaults to Opus, reports a PR as soon as the CLI exits, and keeps Fable for rare invention only.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/OR72i4SNc0_F1IzbCfg-D",
    }),
  ],
};

const COREY: Pack = {
  id: "10000000-0000-0000-0000-000000000018",
  owner: CJBLEV_OWNER,
  slug: "corey",
  name: "Corey",
  description:
    "Public Grok Bot templates Corey (@cjblev) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Steward. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000011",
      name: "Steward",
      job: "Watches Cursor usage for a Grok Bot fleet. Names which bot spent, and how to keep the same output for less.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/VMwfgQlHkYfFkbPYDWzAA",
    }),
  ],
};

const TAL: Pack = {
  id: "10000000-0000-0000-0000-000000000019",
  owner: TALSIACH_OWNER,
  slug: "tal",
  name: "Tal",
  description:
    "Public Grok Bot templates Tal Siach (@Talsiach) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Blunt. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000014",
      name: "Blunt",
      job: "Send a landing page URL and get a senior product-marketer memo: what works, what does not, the one thing to fix first, and a score out of 10.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/N0J32FbnVRuetJi1oJggh",
    }),
  ],
};

const SMIT: Pack = {
  id: "10000000-0000-0000-0000-000000000020",
  owner: THESMITPATEL_OWNER,
  slug: "smit",
  name: "Smit",
  description:
    "Public Grok Bot templates Smit Patel (@thesmitpatel) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Commercial Taste. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000015",
      name: "Commercial Taste",
      job: "Business thought partner for technical founders and execs. Helps with positioning, distribution, and commercialization before the data is complete.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/vekulzIMXM8hDjkp-mDkX",
    }),
  ],
};

const DANNY: Pack = {
  id: "10000000-0000-0000-0000-000000000021",
  owner: DANNYLIMANSETA_OWNER,
  slug: "danny",
  name: "Danny",
  description:
    "Public Grok Bot templates Danny Limanseta (@DannyLimanseta) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Sable: Game Art. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000016",
      name: "Sable: Game Art",
      job: "Helps game developers ideate and visualize: suggests styles from real games, mocks the same idea in those looks, then produces 2D art or sprite sheets and slices them into game-ready PNGs. For 3D, asks before using Tripo3D or Meshy3D.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/oSvAMKX_ahD56ZmgwtRys",
    }),
  ],
};

const MASSIMO: Pack = {
  id: "10000000-0000-0000-0000-000000000022",
  owner: MASSIMODELUISA_OWNER,
  slug: "massimo",
  name: "Massimo",
  description:
    "Public Grok Bot templates Massimo De Luisa (@massimodeluisa) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Human Copywriter. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000017",
      name: "Human Copywriter",
      job: "A human-voice rewrite desk for email, posts, blogs, DMs, landing-page bodies, and PR. American English by default. Draft-only: you get a draft, you publish.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/JZAccYtlRFvDSU2CnMnkZ",
    }),
  ],
};

const MAI: Pack = {
  id: "10000000-0000-0000-0000-000000000023",
  owner: MAIYANGAI_OWNER,
  slug: "mai",
  name: "Mai",
  description:
    "Public Grok Bot templates Mai Yang (@MaiYangAI) has shared. One pack, her roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Grok Deck. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots she published as https://x.ai/bot/… belong here. When she publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000018",
      name: "Grok Deck",
      job: "Makes HTML slide decks in the Grok Bot look: paper canvas, blob faces, morphing page turns. Swap in your talk copy and present in a browser, no build.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/Ja9NzNTRz2ozzQLNfrJwI",
    }),
  ],
};

const ALL_PACKS: Pack[] = [
  LAUREN,
  KRISTA,
  ERIC,
  NAO,
  GEORGE,
  HITEN,
  BRAD,
  FARZAD,
  COREY,
  TAL,
  SMIT,
  DANNY,
  MASSIMO,
  MAI,
];
const ALL_PROFILES: Profile[] = [
  POTETO_OWNER,
  EXAMPLES_OWNER,
  KRISTA_OWNER,
  ERIC_OWNER,
  NAOUFALELH_OWNER,
  GNURIO_OWNER,
  HNSHAH_OWNER,
  BRADSHANNON_OWNER,
  FARZYNESS_OWNER,
  CJBLEV_OWNER,
  TALSIACH_OWNER,
  THESMITPATEL_OWNER,
  DANNYLIMANSETA_OWNER,
  MASSIMODELUISA_OWNER,
  MAIYANGAI_OWNER,
];

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
  return sortPacksByVisits(packs);
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
