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
const SHANEMAC_OWNER_ID = "00000000-0000-0000-0000-000000000016";
const AMAKELKY_OWNER_ID = "00000000-0000-0000-0000-000000000017";
const LETERRYBZH_OWNER_ID = "00000000-0000-0000-0000-000000000018";
const AHALVOR_OWNER_ID = "00000000-0000-0000-0000-000000000019";
const AMBERDAWN1786_OWNER_ID = "00000000-0000-0000-0000-000000000020";
const NICOCHAUVIN74_OWNER_ID = "00000000-0000-0000-0000-000000000021";
const JORDANHALL_DEV_OWNER_ID = "00000000-0000-0000-0000-000000000022";
const MDAFANULH_OWNER_ID = "00000000-0000-0000-0000-000000000023";
const RRRKREN_OWNER_ID = "00000000-0000-0000-0000-000000000024";
const BILLZANETTI_OWNER_ID = "00000000-0000-0000-0000-000000000025";
const ARTHURMACWATERS_OWNER_ID = "00000000-0000-0000-0000-000000000034";
const AV1DLIVE_OWNER_ID = "00000000-0000-0000-0000-000000000035";
const CHIEFJEEB_OWNER_ID = "00000000-0000-0000-0000-000000000036";
const CLAIREVO_OWNER_ID = "00000000-0000-0000-0000-000000000037";
const DANIACOSTAAI_OWNER_ID = "00000000-0000-0000-0000-000000000038";
const DANIEL_FARINAX_OWNER_ID = "00000000-0000-0000-0000-000000000039";
const DANIEL_MAC8_OWNER_ID = "00000000-0000-0000-0000-000000000040";
const DANIELZAMBRINI_OWNER_ID = "00000000-0000-0000-0000-000000000041";
const DIEGO_F_AGUIRRE_OWNER_ID = "00000000-0000-0000-0000-000000000042";
const DOGECOINNORWAY_OWNER_ID = "00000000-0000-0000-0000-000000000043";
const FANTOMBUILDZ_OWNER_ID = "00000000-0000-0000-0000-000000000044";
const FILIPPOFONSECA_OWNER_ID = "00000000-0000-0000-0000-000000000045";
const HERESMYETH_OWNER_ID = "00000000-0000-0000-0000-000000000046";
const HEYROBINAI_OWNER_ID = "00000000-0000-0000-0000-000000000047";
const HIEUDINH__OWNER_ID = "00000000-0000-0000-0000-000000000048";
const JACKFRIKS_OWNER_ID = "00000000-0000-0000-0000-000000000049";
const JORDANWCJACKSON_OWNER_ID = "00000000-0000-0000-0000-000000000050";
const JOSHKIM_OWNER_ID = "00000000-0000-0000-0000-000000000051";
const KENTCDODDS_OWNER_ID = "00000000-0000-0000-0000-000000000052";
const KEVINACE_OWNER_ID = "00000000-0000-0000-0000-000000000053";
const KIARAPLDS_OWNER_ID = "00000000-0000-0000-0000-000000000054";
const LENNYSAN_OWNER_ID = "00000000-0000-0000-0000-000000000055";
const LEXRUS_OWNER_ID = "00000000-0000-0000-0000-000000000056";
const LIAM_FALLEN_OWNER_ID = "00000000-0000-0000-0000-000000000057";
const LIMEUNFILTERED_OWNER_ID = "00000000-0000-0000-0000-000000000058";
const LINGXI_OWNER_ID = "00000000-0000-0000-0000-000000000059";
const LOGANAROBISON_OWNER_ID = "00000000-0000-0000-0000-000000000060";
const MAMUSO_OWNER_ID = "00000000-0000-0000-0000-000000000061";
const MATT_SILBERMAN_OWNER_ID = "00000000-0000-0000-0000-000000000062";
const MUSTAFAERGISI_OWNER_ID = "00000000-0000-0000-0000-000000000063";
const MVANHORN_OWNER_ID = "00000000-0000-0000-0000-000000000064";
const NAYLI_AI_OWNER_ID = "00000000-0000-0000-0000-000000000065";
const NYTEMODEONLY_OWNER_ID = "00000000-0000-0000-0000-000000000066";
const OLIVERKORZEN_OWNER_ID = "00000000-0000-0000-0000-000000000067";
const PARKER__CONRAD_OWNER_ID = "00000000-0000-0000-0000-000000000068";
const RRYSSF_OWNER_ID = "00000000-0000-0000-0000-000000000069";
const RYANTHAWKS_OWNER_ID = "00000000-0000-0000-0000-000000000070";
const SAWYERMERRITT_OWNER_ID = "00000000-0000-0000-0000-000000000071";
const SCHEEMUNAI_OWNER_ID = "00000000-0000-0000-0000-000000000072";
const SCOTTXMETCALF_OWNER_ID = "00000000-0000-0000-0000-000000000073";
const SOLEIO_OWNER_ID = "00000000-0000-0000-0000-000000000074";
const SUBFORTI_OWNER_ID = "00000000-0000-0000-0000-000000000075";
const TESLACONOMICS_OWNER_ID = "00000000-0000-0000-0000-000000000076";
const THE_MR_WIZARD_OWNER_ID = "00000000-0000-0000-0000-000000000077";
const THESORAGIRLS_OWNER_ID = "00000000-0000-0000-0000-000000000078";
const THISWEEKNAI_OWNER_ID = "00000000-0000-0000-0000-000000000079";
const TOBIAS_PFUETZE_OWNER_ID = "00000000-0000-0000-0000-000000000080";
const VINCENTZHU_OWNER_ID = "00000000-0000-0000-0000-000000000081";
const VITICCI_OWNER_ID = "00000000-0000-0000-0000-000000000082";
const WAYNESUTTON_OWNER_ID = "00000000-0000-0000-0000-000000000083";

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

const SHANEMAC_OWNER: Profile = {
  id: SHANEMAC_OWNER_ID,
  githubLogin: "shanemac",
  name: "Shane Mac",
  avatarUrl: "https://avatars.githubusercontent.com/u/92173063?v=4",
  xHandle: "ShaneMac",
};

const AMAKELKY_OWNER: Profile = {
  id: AMAKELKY_OWNER_ID,
  githubLogin: "a-makelky",
  name: "Aaron Makelky",
  avatarUrl: "https://avatars.githubusercontent.com/u/206495698?v=4",
  xHandle: "theaaron",
};

const LETERRYBZH_OWNER: Profile = {
  id: LETERRYBZH_OWNER_ID,
  githubLogin: "LeTerryBZH",
  name: "Thierry / TJM",
  avatarUrl: null,
  xHandle: "LeTerryBZH",
};

const AHALVOR_OWNER: Profile = {
  id: AHALVOR_OWNER_ID,
  githubLogin: "ahalvor",
  name: "Andy",
  avatarUrl: "https://avatars.githubusercontent.com/u/7927660?v=4",
  xHandle: "ahalvor",
};

const AMBERDAWN1786_OWNER: Profile = {
  id: AMBERDAWN1786_OWNER_ID,
  githubLogin: "amberdawn1786",
  name: "Amber Dawn",
  avatarUrl: null,
  xHandle: "amberdawn1786",
};

const NICOCHAUVIN74_OWNER: Profile = {
  id: NICOCHAUVIN74_OWNER_ID,
  githubLogin: "NicoChauvin74",
  name: "Nicolas Chauvin",
  avatarUrl: null,
  xHandle: "NicoChauvin74",
};

const JORDANHALL_DEV_OWNER: Profile = {
  id: JORDANHALL_DEV_OWNER_ID,
  githubLogin: "JordanHall_dev",
  name: "Jordan Upton",
  avatarUrl: null,
  xHandle: "JordanHall_dev",
};

const MDAFANULH_OWNER: Profile = {
  id: MDAFANULH_OWNER_ID,
  githubLogin: "mdafanulh",
  name: "Md / Haque",
  avatarUrl: null,
  xHandle: "mdafanulh",
};

const RRRKREN_OWNER: Profile = {
  id: RRRKREN_OWNER_ID,
  githubLogin: "rrrkren",
  name: "Eric Ren",
  avatarUrl: "https://avatars.githubusercontent.com/u/8688167?v=4",
  xHandle: "rrrkren",
};

const BILLZANETTI_OWNER: Profile = {
  id: BILLZANETTI_OWNER_ID,
  githubLogin: "billzanetti",
  name: "Bill Zanetti",
  avatarUrl: "https://avatars.githubusercontent.com/u/10750672?v=4",
  xHandle: "BillZanetti",
};

const ARTHURMACWATERS_OWNER: Profile = {
  id: ARTHURMACWATERS_OWNER_ID,
  githubLogin: "arthurmacwaters",
  name: "Arthur",
  avatarUrl: "https://avatars.githubusercontent.com/u/113576576?v=4",
  xHandle: "ArthurMacwaters",
};

const AV1DLIVE_OWNER: Profile = {
  id: AV1DLIVE_OWNER_ID,
  githubLogin: "Av1dlive",
  name: "Av1d",
  avatarUrl: null,
  xHandle: "Av1dlive",
};

const CHIEFJEEB_OWNER: Profile = {
  id: CHIEFJEEB_OWNER_ID,
  githubLogin: "chiefjeeb",
  name: "chiefjeeb",
  avatarUrl: null,
  xHandle: "chiefjeeb",
};

const CLAIREVO_OWNER: Profile = {
  id: CLAIREVO_OWNER_ID,
  githubLogin: "clairevo",
  name: "Claire",
  avatarUrl: "https://avatars.githubusercontent.com/u/1369635?v=4",
  xHandle: "clairevo",
};

const DANIACOSTAAI_OWNER: Profile = {
  id: DANIACOSTAAI_OWNER_ID,
  githubLogin: "DaniAcostaAI",
  name: "Dani",
  avatarUrl: null,
  xHandle: "DaniAcostaAI",
};

const DANIEL_FARINAX_OWNER: Profile = {
  id: DANIEL_FARINAX_OWNER_ID,
  githubLogin: "Daniel_Farinax",
  name: "Daniel Farinax",
  avatarUrl: null,
  xHandle: "Daniel_Farinax",
};

const DANIEL_MAC8_OWNER: Profile = {
  id: DANIEL_MAC8_OWNER_ID,
  githubLogin: "daniel_mac8",
  name: "Daniel Mac",
  avatarUrl: null,
  xHandle: "daniel_mac8",
};

const DANIELZAMBRINI_OWNER: Profile = {
  id: DANIELZAMBRINI_OWNER_ID,
  githubLogin: "DanielZambrini",
  name: "Daniel Zambrini",
  avatarUrl: null,
  xHandle: "DanielZambrini",
};

const DIEGO_F_AGUIRRE_OWNER: Profile = {
  id: DIEGO_F_AGUIRRE_OWNER_ID,
  githubLogin: "Diego_F_Aguirre",
  name: "Diego",
  avatarUrl: null,
  xHandle: "Diego_F_Aguirre",
};

const DOGECOINNORWAY_OWNER: Profile = {
  id: DOGECOINNORWAY_OWNER_ID,
  githubLogin: "dogecoinnorway",
  name: "DogecoinNorway",
  avatarUrl: "https://avatars.githubusercontent.com/u/89579354?v=4",
  xHandle: "DogecoinNorway",
};

const FANTOMBUILDZ_OWNER: Profile = {
  id: FANTOMBUILDZ_OWNER_ID,
  githubLogin: "FantomBuildz",
  name: "Fantom",
  avatarUrl: null,
  xHandle: "FantomBuildz",
};

const FILIPPOFONSECA_OWNER: Profile = {
  id: FILIPPOFONSECA_OWNER_ID,
  githubLogin: "filippofonseca",
  name: "Filippo",
  avatarUrl: "https://avatars.githubusercontent.com/u/68870282?v=4",
  xHandle: "FilippoFonseca",
};

const HERESMYETH_OWNER: Profile = {
  id: HERESMYETH_OWNER_ID,
  githubLogin: "HeresMyEth",
  name: "HeresMyEth",
  avatarUrl: null,
  xHandle: "HeresMyEth",
};

const HEYROBINAI_OWNER: Profile = {
  id: HEYROBINAI_OWNER_ID,
  githubLogin: "heyrobinai",
  name: "Robin",
  avatarUrl: null,
  xHandle: "heyrobinai",
};

const HIEUDINH__OWNER: Profile = {
  id: HIEUDINH__OWNER_ID,
  githubLogin: "hieudinh_",
  name: "Hieu",
  avatarUrl: null,
  xHandle: "hieudinh_",
};

const JACKFRIKS_OWNER: Profile = {
  id: JACKFRIKS_OWNER_ID,
  githubLogin: "jackfriks",
  name: "Jack",
  avatarUrl: "https://avatars.githubusercontent.com/u/112214002?v=4",
  xHandle: "jackfriks",
};

const JORDANWCJACKSON_OWNER: Profile = {
  id: JORDANWCJACKSON_OWNER_ID,
  githubLogin: "jordanwcjackson",
  name: "Jordan Jackson",
  avatarUrl: null,
  xHandle: "jordanwcjackson",
};

const JOSHKIM_OWNER: Profile = {
  id: JOSHKIM_OWNER_ID,
  githubLogin: "joshkim",
  name: "Josh",
  avatarUrl: "https://avatars.githubusercontent.com/u/37055579?v=4",
  xHandle: "joshkim",
};

const KENTCDODDS_OWNER: Profile = {
  id: KENTCDODDS_OWNER_ID,
  githubLogin: "kentcdodds",
  name: "Kent C. Dodds",
  avatarUrl: "https://avatars.githubusercontent.com/u/1500684?v=4",
  xHandle: "kentcdodds",
};

const KEVINACE_OWNER: Profile = {
  id: KEVINACE_OWNER_ID,
  githubLogin: "kevinace",
  name: "Kevin",
  avatarUrl: "https://avatars.githubusercontent.com/u/7966491?v=4",
  xHandle: "kevinace",
};

const KIARAPLDS_OWNER: Profile = {
  id: KIARAPLDS_OWNER_ID,
  githubLogin: "kiaraplds",
  name: "Kiara",
  avatarUrl: "https://avatars.githubusercontent.com/u/47531859?v=4",
  xHandle: "kiaraplds",
};

const LENNYSAN_OWNER: Profile = {
  id: LENNYSAN_OWNER_ID,
  githubLogin: "lennysan",
  name: "Lenny Rachitsky",
  avatarUrl: "https://avatars.githubusercontent.com/u/5602?v=4",
  xHandle: "lennysan",
};

const LEXRUS_OWNER: Profile = {
  id: LEXRUS_OWNER_ID,
  githubLogin: "lexrus",
  name: "Lex Tang",
  avatarUrl: "https://avatars.githubusercontent.com/u/219689?v=4",
  xHandle: "lexrus",
};

const LIAM_FALLEN_OWNER: Profile = {
  id: LIAM_FALLEN_OWNER_ID,
  githubLogin: "liam_fallen",
  name: "Liam",
  avatarUrl: null,
  xHandle: "liam_fallen",
};

const LIMEUNFILTERED_OWNER: Profile = {
  id: LIMEUNFILTERED_OWNER_ID,
  githubLogin: "limeunfiltered",
  name: "Lime",
  avatarUrl: "https://avatars.githubusercontent.com/u/318505837?v=4",
  xHandle: "limeunfiltered",
};

const LINGXI_OWNER: Profile = {
  id: LINGXI_OWNER_ID,
  githubLogin: "lingxi",
  name: "Lingxi",
  avatarUrl: "https://avatars.githubusercontent.com/u/22110637?v=4",
  xHandle: "lingxi",
};

const LOGANAROBISON_OWNER: Profile = {
  id: LOGANAROBISON_OWNER_ID,
  githubLogin: "LoganARobison",
  name: "Logan",
  avatarUrl: null,
  xHandle: "LoganARobison",
};

const MAMUSO_OWNER: Profile = {
  id: MAMUSO_OWNER_ID,
  githubLogin: "mamuso",
  name: "Manuel Muñoz Solera",
  avatarUrl: "https://avatars.githubusercontent.com/u/3992?v=4",
  xHandle: "mamuso",
};

const MATT_SILBERMAN_OWNER: Profile = {
  id: MATT_SILBERMAN_OWNER_ID,
  githubLogin: "matt_silberman",
  name: "Matt Silberman",
  avatarUrl: null,
  xHandle: "matt_silberman",
};

const MUSTAFAERGISI_OWNER: Profile = {
  id: MUSTAFAERGISI_OWNER_ID,
  githubLogin: "mustafaergisi",
  name: "Mustafa",
  avatarUrl: null,
  xHandle: "mustafaergisi",
};

const MVANHORN_OWNER: Profile = {
  id: MVANHORN_OWNER_ID,
  githubLogin: "mvanhorn",
  name: "Matt Van Horn",
  avatarUrl: "https://avatars.githubusercontent.com/u/455140?v=4",
  xHandle: "mvanhorn",
};

const NAYLI_AI_OWNER: Profile = {
  id: NAYLI_AI_OWNER_ID,
  githubLogin: "nayli_ai",
  name: "Nayli",
  avatarUrl: null,
  xHandle: "nayli_ai",
};

const NYTEMODEONLY_OWNER: Profile = {
  id: NYTEMODEONLY_OWNER_ID,
  githubLogin: "NYTEMODEONLY",
  name: "nytemode",
  avatarUrl: "https://avatars.githubusercontent.com/u/108635732?v=4",
  xHandle: "nytemodeonly",
};

const OLIVERKORZEN_OWNER: Profile = {
  id: OLIVERKORZEN_OWNER_ID,
  githubLogin: "OliverKorzen",
  name: "Oliver",
  avatarUrl: null,
  xHandle: "OliverKorzen",
};

const PARKER__CONRAD_OWNER: Profile = {
  id: PARKER__CONRAD_OWNER_ID,
  githubLogin: "parker__conrad",
  name: "Parker",
  avatarUrl: null,
  xHandle: "parker__conrad",
};

const RRYSSF_OWNER: Profile = {
  id: RRYSSF_OWNER_ID,
  githubLogin: "rryssf",
  name: "rryssf",
  avatarUrl: "https://avatars.githubusercontent.com/u/206442266?v=4",
  xHandle: "rryssf",
};

const RYANTHAWKS_OWNER: Profile = {
  id: RYANTHAWKS_OWNER_ID,
  githubLogin: "ryanthawks",
  name: "Ryan",
  avatarUrl: "https://avatars.githubusercontent.com/u/258342719?v=4",
  xHandle: "ryanthawks",
};

const SAWYERMERRITT_OWNER: Profile = {
  id: SAWYERMERRITT_OWNER_ID,
  githubLogin: "sawyermerritt",
  name: "Sawyer",
  avatarUrl: "https://avatars.githubusercontent.com/u/323447024?v=4",
  xHandle: "SawyerMerritt",
};

const SCHEEMUNAI_OWNER: Profile = {
  id: SCHEEMUNAI_OWNER_ID,
  githubLogin: "scheemunai",
  name: "Schee",
  avatarUrl: "https://avatars.githubusercontent.com/u/6823959?v=4",
  xHandle: "scheemunai",
};

const SCOTTXMETCALF_OWNER: Profile = {
  id: SCOTTXMETCALF_OWNER_ID,
  githubLogin: "scottxmetcalf",
  name: "Scott",
  avatarUrl: null,
  xHandle: "scottxmetcalf",
};

const SOLEIO_OWNER: Profile = {
  id: SOLEIO_OWNER_ID,
  githubLogin: "soleio",
  name: "Soleio",
  avatarUrl: "https://avatars.githubusercontent.com/u/3349882?v=4",
  xHandle: "soleio",
};

const SUBFORTI_OWNER: Profile = {
  id: SUBFORTI_OWNER_ID,
  githubLogin: "subforti",
  name: "subforti",
  avatarUrl: "https://avatars.githubusercontent.com/u/135699124?v=4",
  xHandle: "subforti",
};

const TESLACONOMICS_OWNER: Profile = {
  id: TESLACONOMICS_OWNER_ID,
  githubLogin: "Teslaconomics",
  name: "Teslaconomics",
  avatarUrl: null,
  xHandle: "Teslaconomics",
};

const THE_MR_WIZARD_OWNER: Profile = {
  id: THE_MR_WIZARD_OWNER_ID,
  githubLogin: "The_Mr_Wizard",
  name: "Wizard",
  avatarUrl: null,
  xHandle: "The_Mr_Wizard",
};

const THESORAGIRLS_OWNER: Profile = {
  id: THESORAGIRLS_OWNER_ID,
  githubLogin: "thesoragirls",
  name: "thesoragirls",
  avatarUrl: null,
  xHandle: "thesoragirls",
};

const THISWEEKNAI_OWNER: Profile = {
  id: THISWEEKNAI_OWNER_ID,
  githubLogin: "ThisWeeknAI",
  name: "ThisWeeknAI",
  avatarUrl: null,
  xHandle: "ThisWeeknAI",
};

const TOBIAS_PFUETZE_OWNER: Profile = {
  id: TOBIAS_PFUETZE_OWNER_ID,
  githubLogin: "tobias_pfuetze",
  name: "Tobias",
  avatarUrl: null,
  xHandle: "tobias_pfuetze",
};

const VINCENTZHU_OWNER: Profile = {
  id: VINCENTZHU_OWNER_ID,
  githubLogin: "vincentzhu",
  name: "Vincent",
  avatarUrl: "https://avatars.githubusercontent.com/u/8760916?v=4",
  xHandle: "vincentzhu",
};

const VITICCI_OWNER: Profile = {
  id: VITICCI_OWNER_ID,
  githubLogin: "viticci",
  name: "Federico Viticci",
  avatarUrl: "https://avatars.githubusercontent.com/u/2583235?v=4",
  xHandle: "viticci",
};

const WAYNESUTTON_OWNER: Profile = {
  id: WAYNESUTTON_OWNER_ID,
  githubLogin: "waynesutton",
  name: "Wayne Sutton",
  avatarUrl: "https://avatars.githubusercontent.com/u/720186?v=4",
  xHandle: "waynesutton",
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
    "Random questions stay at Rutin. Use Chieeeeefy only for chief-of-staff work. Named seats only when that job is already in this pack.",
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
    seat({
      id: "20000000-0000-0000-0000-000000000043",
      name: "Chieeeeefy",
      job: "Chief-of-staff seat for the pack.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/GiBPBQR2WrHNul4k9Tz6Q",
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
    "Random questions stay at Claudey. Use Shorty only for YouTube Shorts clipping. Named seats only when that job is already in this pack.",
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
    seat({
      id: "20000000-0000-0000-0000-000000000042",
      name: "Shorty",
      job: "YouTube Shorts auto-clipper that finds the best-performing moments on a channel and creates captioned Shorts.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/32fHIBw9Yz-s_o35KycGX",
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
    "Random questions stay at Grok Deck. Use 最值得关注的Grok Bot 推文？ only for weekday Grok Bot tweet scans. Named seats only when that job is already in this pack.",
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
    seat({
      id: "20000000-0000-0000-0000-000000000019",
      name: "最值得关注的Grok Bot 推文？",
      job: "Weekday scanner of a public Grok Bot explorer list. Only files high-quality, high-traffic original posts. Works in Chinese. Does not post.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/lFDR77qKaT3Iglzv9pUac",
    }),
  ],
};

const SHANE: Pack = {
  id: "10000000-0000-0000-0000-000000000024",
  owner: SHANEMAC_OWNER,
  slug: "shane",
  name: "Shane",
  description:
    "Public Grok Bot templates Shane Mac (@ShaneMac) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Librarian. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000020",
      name: "Librarian",
      job: "Builds a personal library site from shelf photos. Catalogs books, pulls snippets, maps contradictions, and marks the ones you would hand people.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/suKVjDAR-hSr_PTBxgdRw",
    }),
  ],
};

const AARON: Pack = {
  id: "10000000-0000-0000-0000-000000000025",
  owner: AMAKELKY_OWNER,
  slug: "aaron",
  name: "Aaron",
  description:
    "Public Grok Bot templates Aaron Makelky (@theaaron) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Set Up. Use Overwatch only for multi-bot workspace organization. Use CoS only for chief-of-staff work. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000021",
      name: "Set Up",
      job: "Walks a newcomer through building a small, intentional bot team: one chief, a few project leads, and specialists.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/BsExflSUXpW0hs21OTBzu",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000022",
      name: "Overwatch",
      job: "Keeps a shared multi-bot workspace organized, git-backed, and portable.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/HtClSXO_AmiQoyYH9aXV9",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000023",
      name: "CoS",
      job: "A personal chief of staff for a small specialist AI team. Coordinates calendar, projects, and inbound mail, and never sends as you unless you ask.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 2,
      grokTemplateUrl: "https://x.ai/bot/eiVFbd0nIdH2gzSwHOs0D",
    }),
  ],
};

const THIERRY: Pack = {
  id: "10000000-0000-0000-0000-000000000026",
  owner: LETERRYBZH_OWNER,
  slug: "thierry",
  name: "Thierry",
  description:
    "Public Grok Bot templates Thierry / TJM (@LeTerryBZH) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at 2nd Brain. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000024",
      name: "2nd Brain",
      job: "A Lattice wiki compiler second brain. Files sources as raw notes, compiles short wiki pages, and answers from those pages.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/c4fYduVVic2YtbcjXquD0",
    }),
  ],
};

const ANDY: Pack = {
  id: "10000000-0000-0000-0000-000000000027",
  owner: AHALVOR_OWNER,
  slug: "andy",
  name: "Andy",
  description:
    "Public Grok Bot templates Andy (@ahalvor) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Homeroom. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000025",
      name: "Homeroom",
      job: "A parent helper that pulls Schoology, keeps a family homework site current, and watches school activities.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/IciOb-9jMtlkc1RJj6MQe",
    }),
  ],
};

const AMBER: Pack = {
  id: "10000000-0000-0000-0000-000000000028",
  owner: AMBERDAWN1786_OWNER,
  slug: "amber",
  name: "Amber",
  description:
    "Public Grok Bot templates Amber Dawn (@amberdawn1786) has shared. One pack, her roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Sous Chef. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots she published as https://x.ai/bot/… belong here. When she publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000026",
      name: "Sous Chef",
      job: "Finds recipes, builds meal plans and grocery lists, and shops when asked.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/RuCu3IpKAvrx00H0MDI0t",
    }),
  ],
};

const NICOLAS: Pack = {
  id: "10000000-0000-0000-0000-000000000029",
  owner: NICOCHAUVIN74_OWNER,
  slug: "nicolas",
  name: "Nicolas",
  description:
    "Public Grok Bot templates Nicolas Chauvin (@NicoChauvin74) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at BeTree. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000027",
      name: "BeTree",
      job: "Compiles a multi-agent plan into a live behavior-tree graph and shared status board.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/2PSNlIROOJPj9qZlfRy0w",
    }),
  ],
};

const JORDAN: Pack = {
  id: "10000000-0000-0000-0000-000000000030",
  owner: JORDANHALL_DEV_OWNER,
  slug: "jordan",
  name: "Jordan",
  description:
    "Public Grok Bot templates Jordan Upton (@JordanHall_dev) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Usage-pool orchestrator. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000028",
      name: "Usage-pool orchestrator",
      job: "A thin Grok Bot that hands heavy work to Cursor by default, and optionally Grok Build, Claude Code, or Codex, so those usage pools do the work.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/Nx4wpKeM_NYx577xlJFMD",
    }),
  ],
};

const MD: Pack = {
  id: "10000000-0000-0000-0000-000000000031",
  owner: MDAFANULH_OWNER,
  slug: "md",
  name: "Md",
  description:
    "Public Grok Bot templates Md / Haque (@mdafanulh) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Lumos. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000029",
      name: "Lumos",
      job: "Technical educator that uses the Feynman technique: one daily-life analogy and one example.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/SwTxLoOaIwDqTSvhTIhrK",
    }),
  ],
};

const ERIC_REN: Pack = {
  id: "10000000-0000-0000-0000-000000000032",
  owner: RRRKREN_OWNER,
  slug: "eric-ren",
  name: "Eric Ren",
  description:
    "Public Grok Bot templates Eric Ren (@rrrkren) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at unifi AQ trmnl integration. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. This is not Eric Zakariasson's pack.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000030",
      name: "unifi AQ trmnl integration",
      job: "Builds and maintains a TRMNL private plugin for UniFi Protect UP-AirQuality sensor data.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/NU02qQ9iahZtAM0i0x1KT",
    }),
  ],
};

const BILL: Pack = {
  id: "10000000-0000-0000-0000-000000000033",
  owner: BILLZANETTI_OWNER,
  slug: "bill",
  name: "Bill",
  description:
    "Public Grok Bot templates Bill Zanetti (@BillZanetti) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Grok Build. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. Do not add STEER; that template was not shared by Bill in this hunt.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000031",
      name: "Grok Build",
      job: "Runs the real Grok Build CLI for apps, code, and deep research at maximum effort on an agent computer.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/eydijdzrfgtnmlnUyPSI-",
    }),
  ],
};

const ARTHUR: Pack = {
  id: "10000000-0000-0000-0000-000000000042",
  owner: ARTHURMACWATERS_OWNER,
  slug: "arthur",
  name: "Arthur",
  description:
    "Public Grok Bot templates Arthur (@ArthurMacwaters) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Research Bot. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000044",
      name: "Research Bot",
      job: "Research bot that answers with verified, cited sources and first-principles thinking.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/Nn0ykGa3vJ6YS7ib7F6yH",
    }),
  ],
};

const AV1D: Pack = {
  id: "10000000-0000-0000-0000-000000000043",
  owner: AV1DLIVE_OWNER,
  slug: "av1d",
  name: "Av1d",
  description:
    "Public Grok Bot templates Av1d (@Av1dlive) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at loops. Use Master only for master orchestration. Use Chief of Staff only for chief-of-staff work. Use Growth Desk only for growth work. Use Grok Bot Coach only for Grok Bot coaching. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000045",
      name: "loops",
      job: "Looping operator desk for recurring Grok Bot work.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/Ub3T7usX-c6yRQibQq83P",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000046",
      name: "Master",
      job: "Master orchestrator for the pack.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/j7B5LHnEIPTuPQZxxQwpx",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000047",
      name: "Chief of Staff",
      job: "Chief of staff for the pack.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 2,
      grokTemplateUrl: "https://x.ai/bot/d8OshqLZvtcKDcNluPuyo",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000048",
      name: "Growth Desk",
      job: "Growth desk for Grok Bot distribution and growth work.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 3,
      grokTemplateUrl: "https://x.ai/bot/YYCOE-YeGxnGLb4Mbv7dO",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000049",
      name: "Grok Bot Coach",
      job: "Coaches Grok Bot setup and usage.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 4,
      grokTemplateUrl: "https://x.ai/bot/BrjELcmSwatjRc8DYjtrT",
    }),
  ],
};

const CHIEFJEEB: Pack = {
  id: "10000000-0000-0000-0000-000000000044",
  owner: CHIEFJEEB_OWNER,
  slug: "chiefjeeb",
  name: "chiefjeeb",
  description:
    "Public Grok Bot templates chiefjeeb (@chiefjeeb) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Mercury. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000050",
      name: "Mercury",
      job: "Product lead that owns the system and the release call. Workers take narrow Cursor jobs in parallel; the lead does not code. Manages long context when coding on Cursor via Grok Bot.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/lk1yHfim5Ayra0Q0QlN3L",
    }),
  ],
};

const CLAIRE: Pack = {
  id: "10000000-0000-0000-0000-000000000045",
  owner: CLAIREVO_OWNER,
  slug: "claire",
  name: "Claire",
  description:
    "Public Grok Bot templates Claire (@clairevo) has shared. One pack, her roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Tradbot. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots she published as https://x.ai/bot/… belong here. When she publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000051",
      name: "Tradbot",
      job: "Trading desk bot.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/uY_7s1TZILVzUeJ9lLOx9",
    }),
  ],
};

const DANI: Pack = {
  id: "10000000-0000-0000-0000-000000000046",
  owner: DANIACOSTAAI_OWNER,
  slug: "dani",
  name: "Dani",
  description:
    "Public Grok Bot templates Dani (@DaniAcostaAI) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at TheFounder. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000052",
      name: "TheFounder",
      job: "A founder chief of staff inspired by Lauren's Dr Eggbot idea.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/Bt48h63v32_q_shWVlEBb",
    }),
  ],
};

const DANIEL_FARINAX: Pack = {
  id: "10000000-0000-0000-0000-000000000047",
  owner: DANIEL_FARINAX_OWNER,
  slug: "daniel-farinax",
  name: "Daniel Farinax",
  description:
    "Public Grok Bot templates Daniel Farinax (@Daniel_Farinax) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at freebots.lol. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000053",
      name: "freebots.lol",
      job: "Official Grok Bot template for freebots.lol. Makes a bot understand and participate in that experiment.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/ndOGeXyjkQLdceRlk7JP4",
    }),
  ],
};

const DANIEL_MAC: Pack = {
  id: "10000000-0000-0000-0000-000000000048",
  owner: DANIEL_MAC8_OWNER,
  slug: "daniel-mac",
  name: "Daniel Mac",
  description:
    "Public Grok Bot templates Daniel Mac (@daniel_mac8) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at X Brief. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000054",
      name: "X Brief",
      job: "Briefs recent X posts.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/GkX6X536UK2MlbkfGLQnb",
    }),
  ],
};

const DANIEL_ZAMBRINI: Pack = {
  id: "10000000-0000-0000-0000-000000000049",
  owner: DANIELZAMBRINI_OWNER,
  slug: "daniel-zambrini",
  name: "Daniel Zambrini",
  description:
    "Public Grok Bot templates Daniel Zambrini (@DanielZambrini) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Claude Code. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000055",
      name: "Claude Code",
      job: "Runs Claude Code CLI. The main bot can check, send, and ask this seat using Fable.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/71PSQ4KBs-hNYBsH05X_n",
    }),
  ],
};

const DIEGO: Pack = {
  id: "10000000-0000-0000-0000-000000000050",
  owner: DIEGO_F_AGUIRRE_OWNER,
  slug: "diego",
  name: "Diego",
  description:
    "Public Grok Bot templates Diego (@Diego_F_Aguirre) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Home Front. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000056",
      name: "Home Front",
      job: "Watches VA resources and mail. Pings on appointments, claims, and family-qualified deals.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/eREHCFAQlq8jS3P6bnNSL",
    }),
  ],
};

const DOGECOINNORWAY: Pack = {
  id: "10000000-0000-0000-0000-000000000051",
  owner: DOGECOINNORWAY_OWNER,
  slug: "dogecoinnorway",
  name: "DogecoinNorway",
  description:
    "Public Grok Bot templates DogecoinNorway (@DogecoinNorway) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Chef. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000057",
      name: "Chef",
      job: "Helps with recipes, a weekly meal planner, a shopping list, and ordering in your area.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/3U6zxtPa1b8GbWheaIr4J",
    }),
  ],
};

const FANTOM: Pack = {
  id: "10000000-0000-0000-0000-000000000052",
  owner: FANTOMBUILDZ_OWNER,
  slug: "fantom",
  name: "Fantom",
  description:
    "Public Grok Bot templates Fantom (@FantomBuildz) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Brake. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000058",
      name: "Brake",
      job: "Looks at what you have running, names the leftover job, and stops there. For bots that never stopped burning usage.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/ig-dwKjUc7doBIDhiMi9Z",
    }),
  ],
};

const FILIPPO: Pack = {
  id: "10000000-0000-0000-0000-000000000053",
  owner: FILIPPOFONSECA_OWNER,
  slug: "filippo",
  name: "Filippo",
  description:
    "Public Grok Bot templates Filippo (@FilippoFonseca) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Dispatch. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000059",
      name: "Dispatch",
      job: "Handles meeting invites and inbound Slack, email, Google Calendar, LinkedIn, and X DMs.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/YkmZEZYBk-BqylyQbM3kq",
    }),
  ],
};

const HERESMYETH: Pack = {
  id: "10000000-0000-0000-0000-000000000054",
  owner: HERESMYETH_OWNER,
  slug: "heresmyeth",
  name: "HeresMyEth",
  description:
    "Public Grok Bot templates HeresMyEth (@HeresMyEth) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at TeslrBot. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000060",
      name: "TeslrBot",
      job: "Controls a Tesla through Grok Bot via TeslrBot.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/_S9OOSBgXixedyANQSYjQ",
    }),
  ],
};

const ROBIN: Pack = {
  id: "10000000-0000-0000-0000-000000000055",
  owner: HEYROBINAI_OWNER,
  slug: "robin",
  name: "Robin",
  description:
    "Public Grok Bot templates Robin (@heyrobinai) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Alfred. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000061",
      name: "Alfred",
      job: "Bot chief advisor.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/KZ9xav0Qad1U5QigEn7rh",
    }),
  ],
};

const HIEU: Pack = {
  id: "10000000-0000-0000-0000-000000000056",
  owner: HIEUDINH__OWNER,
  slug: "hieu",
  name: "Hieu",
  description:
    "Public Grok Bot templates Hieu (@hieudinh_) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at grokbots.best. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000062",
      name: "grokbots.best",
      job: "Submits bots from any X post to grokbots.best.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/55WKZjppK42Jr3XPnPJdm",
    }),
  ],
};

const JACK: Pack = {
  id: "10000000-0000-0000-0000-000000000057",
  owner: JACKFRIKS_OWNER,
  slug: "jack",
  name: "Jack",
  description:
    "Public Grok Bot templates Jack (@jackfriks) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at repost X posts everywhere. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000063",
      name: "repost X posts everywhere",
      job: "Polls for new posts on X and copies them to other socials, including quote tweets.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/fu6JIwhLoBvrxtaZik0RP",
    }),
  ],
};

const JORDAN_JACKSON: Pack = {
  id: "10000000-0000-0000-0000-000000000058",
  owner: JORDANWCJACKSON_OWNER,
  slug: "jordan-jackson",
  name: "Jordan Jackson",
  description:
    "Public Grok Bot templates Jordan Jackson (@jordanwcjackson) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Watch Later Deck. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000064",
      name: "Watch Later Deck",
      job: "Watch Later deck.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/9-kjE0PVBDhmW-7Fck_R9",
    }),
  ],
};

const JOSH: Pack = {
  id: "10000000-0000-0000-0000-000000000059",
  owner: JOSHKIM_OWNER,
  slug: "josh",
  name: "Josh",
  description:
    "Public Grok Bot templates Josh (@joshkim) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Tally Desk. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000065",
      name: "Tally Desk",
      job: "Tally Forms desk that talks to the Tally API.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/m-qZ-OIA6Nt2LZeb2bKg5",
    }),
  ],
};

const KENT: Pack = {
  id: "10000000-0000-0000-0000-000000000060",
  owner: KENTCDODDS_OWNER,
  slug: "kent",
  name: "Kent",
  description:
    "Public Grok Bot templates Kent C. Dodds (@kentcdodds) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Kody. Use Imogen only for alt text on posted images. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000066",
      name: "Kody",
      job: "Kent's desk bot, Kody.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/yTSGElYcIjFW_5IXu2I-e",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000067",
      name: "Imogen",
      job: "Replies to images you post with alt text.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/9y2GcFkKMAUhYlMxRUS0X",
    }),
  ],
};

const KEVIN: Pack = {
  id: "10000000-0000-0000-0000-000000000061",
  owner: KEVINACE_OWNER,
  slug: "kevin",
  name: "Kevin",
  description:
    "Public Grok Bot templates Kevin (@kevinace) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Homework Checker. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000068",
      name: "Homework Checker",
      job: "Checks homework.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/Mm_WhYXIjZ3xDNf3s3p91",
    }),
  ],
};

const KIARA: Pack = {
  id: "10000000-0000-0000-0000-000000000062",
  owner: KIARAPLDS_OWNER,
  slug: "kiara",
  name: "Kiara",
  description:
    "Public Grok Bot templates Kiara (@kiaraplds) has shared. One pack, her roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Professor Oak. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots she published as https://x.ai/bot/… belong here. When she publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000069",
      name: "Professor Oak",
      job: "Agent-maker for a Pokémon workforce. Names bots, writes the full job, gives each a mascot face, and bakes draft-only in so nothing posts unless you say so.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/IiWYN5QOjQeYw0KTISFEQ",
    }),
  ],
};

const LENNY: Pack = {
  id: "10000000-0000-0000-0000-000000000063",
  owner: LENNYSAN_OWNER,
  slug: "lenny",
  name: "Lenny",
  description:
    "Public Grok Bot templates Lenny Rachitsky (@lennysan) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Be Happier. Use Talent Matchmaker only for talent matching. Use Lennybot only for Lennybot work. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000070",
      name: "Be Happier",
      job: "Be Happier desk.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/0VC1XzREXRFGe0hVo-JEG",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000071",
      name: "Talent Matchmaker",
      job: "Talent matchmaker.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/l8p6rXw-lalL-UNiHySnJ",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000072",
      name: "Lennybot",
      job: "Lennybot.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 2,
      grokTemplateUrl: "https://x.ai/bot/VjbtJ_qTdzbhJGmXdvTIc",
    }),
  ],
};

const LEX: Pack = {
  id: "10000000-0000-0000-0000-000000000064",
  owner: LEXRUS_OWNER,
  slug: "lex",
  name: "Lex",
  description:
    "Public Grok Bot templates Lex Tang (@lexrus) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at RevenueDog. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000073",
      name: "RevenueDog",
      job: "Revenue dog.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/IDFtkYcsl7MpfdfTx09RT",
    }),
  ],
};

const LIAM: Pack = {
  id: "10000000-0000-0000-0000-000000000065",
  owner: LIAM_FALLEN_OWNER,
  slug: "liam",
  name: "Liam",
  description:
    "Public Grok Bot templates Liam (@liam_fallen) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Bounty Hunter. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000074",
      name: "Bounty Hunter",
      job: "Looks for money you are owed. Digs through emails and bills for refunds, credits, claims, and other money worth chasing. You approve anything next.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/gCWYD009F66A3XDEYdZgf",
    }),
  ],
};

const LIME: Pack = {
  id: "10000000-0000-0000-0000-000000000066",
  owner: LIMEUNFILTERED_OWNER,
  slug: "lime",
  name: "Lime",
  description:
    "Public Grok Bot templates Lime (@limeunfiltered) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Receipt Scanner. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000075",
      name: "Receipt Scanner",
      job: "Receipt scanner and expense tracking.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/qod4CrNQBlDIMm5wFYVQp",
    }),
  ],
};

const LINGXI: Pack = {
  id: "10000000-0000-0000-0000-000000000067",
  owner: LINGXI_OWNER,
  slug: "lingxi",
  name: "Lingxi",
  description:
    "Public Grok Bot templates Lingxi (@lingxi) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Lingxi's Engineer Bot. Use Nightly Audit Engineer only for nightly repo audit. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000076",
      name: "Lingxi's Engineer Bot",
      job: "Manages many more cloud agents than you could handle alone.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/fY1xWwCLzDDGVe3GwH78j",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000077",
      name: "Nightly Audit Engineer",
      job: "Keeps the repo clean overnight.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/hkGSHcqKjGc5dm3ugNc2U",
    }),
  ],
};

const LOGAN: Pack = {
  id: "10000000-0000-0000-0000-000000000068",
  owner: LOGANAROBISON_OWNER,
  slug: "logan",
  name: "Logan",
  description:
    "Public Grok Bot templates Logan (@LoganARobison) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Jess. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000078",
      name: "Jess",
      job: "Executive assistant.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/Nmv2fCQEcQc3EHzVXJZKN",
    }),
  ],
};

const MANUEL: Pack = {
  id: "10000000-0000-0000-0000-000000000069",
  owner: MAMUSO_OWNER,
  slug: "manuel",
  name: "Manuel",
  description:
    "Public Grok Bot templates Manuel Muñoz Solera (@mamuso) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Critiquito. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000079",
      name: "Critiquito",
      job: "Looks at your UI and only has notes.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/rt9m-FTkJoGsZzAjsKLPM",
    }),
  ],
};

const MATT_SILBERMAN: Pack = {
  id: "10000000-0000-0000-0000-000000000070",
  owner: MATT_SILBERMAN_OWNER,
  slug: "matt-silberman",
  name: "Matt Silberman",
  description:
    "Public Grok Bot templates Matt Silberman (@matt_silberman) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Inbot. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000080",
      name: "Inbot",
      job: "Inbot desk.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/yH2UttxbMwMugweZrigHT",
    }),
  ],
};

const MUSTAFA: Pack = {
  id: "10000000-0000-0000-0000-000000000071",
  owner: MUSTAFAERGISI_OWNER,
  slug: "mustafa",
  name: "Mustafa",
  description:
    "Public Grok Bot templates Mustafa (@mustafaergisi) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at PR Reviewer. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000081",
      name: "PR Reviewer",
      job: "Point it at a pull request; it flags risk, missing tests, and thin context.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/rt629UEZFtE4Wz0A_0c37",
    }),
  ],
};

const MATT_VANHORN: Pack = {
  id: "10000000-0000-0000-0000-000000000072",
  owner: MVANHORN_OWNER,
  slug: "matt-vanhorn",
  name: "Matt Van Horn",
  description:
    "Public Grok Bot templates Matt Van Horn (@mvanhorn) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at last30days. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000082",
      name: "last30days",
      job: "Official last30days Grok Bot template.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/ANv3NrqPfRcS9PdXku7h8",
    }),
  ],
};

const NAYLI: Pack = {
  id: "10000000-0000-0000-0000-000000000073",
  owner: NAYLI_AI_OWNER,
  slug: "nayli",
  name: "Nayli",
  description:
    "Public Grok Bot templates Nayli (@nayli_ai) has shared. One pack, her roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Mystery Snack Agent. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots she published as https://x.ai/bot/… belong here. When she publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000083",
      name: "Mystery Snack Agent",
      job: "Mystery snack agent.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/jEv8xhxlnSNp2KnQ9ciyP",
    }),
  ],
};

const NYTEMODE: Pack = {
  id: "10000000-0000-0000-0000-000000000074",
  owner: NYTEMODEONLY_OWNER,
  slug: "nytemode",
  name: "nytemode",
  description:
    "Public Grok Bot templates nytemode (@nytemodeonly) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Feedback. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000084",
      name: "Feedback",
      job: "Reports issues and bugs as direct feedback to the xAI, SpaceXAI, and Cursor teams.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/_-3KKbHbnSRzrS_8KFugU",
    }),
  ],
};

const OLIVER: Pack = {
  id: "10000000-0000-0000-0000-000000000075",
  owner: OLIVERKORZEN_OWNER,
  slug: "oliver",
  name: "Oliver",
  description:
    "Public Grok Bot templates Oliver (@OliverKorzen) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Latch. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000085",
      name: "Latch",
      job: "Walks you through Grok Bot setup and connectors. Pick your role, write the tools you actually use, and begin.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/9nbLm_04EvjnolE9oevTT",
    }),
  ],
};

const PARKER: Pack = {
  id: "10000000-0000-0000-0000-000000000076",
  owner: PARKER__CONRAD_OWNER,
  slug: "parker",
  name: "Parker",
  description:
    "Public Grok Bot templates Parker (@parker__conrad) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Chicken Joe. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000086",
      name: "Chicken Joe",
      job: "Morning surf report for spots between Marin County and Santa Cruz.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/7f5AjmpjZkmTIsSybedYS",
    }),
  ],
};

const RRYSSF: Pack = {
  id: "10000000-0000-0000-0000-000000000077",
  owner: RRYSSF_OWNER,
  slug: "rryssf",
  name: "rryssf",
  description:
    "Public Grok Bot templates rryssf (@rryssf) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Forge. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000087",
      name: "Forge",
      job: "A template generator / template foundry.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/uF_uodOFUz9mdv6XDWE70",
    }),
  ],
};

const RYAN: Pack = {
  id: "10000000-0000-0000-0000-000000000078",
  owner: RYANTHAWKS_OWNER,
  slug: "ryan",
  name: "Ryan",
  description:
    "Public Grok Bot templates Ryan (@ryanthawks) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Google Agent. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000088",
      name: "Google Agent",
      job: "Google Agent desk.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/tttQVA2UtlNwCzITNCIr0",
    }),
  ],
};

const SAWYER: Pack = {
  id: "10000000-0000-0000-0000-000000000079",
  owner: SAWYERMERRITT_OWNER,
  slug: "sawyer",
  name: "Sawyer",
  description:
    "Public Grok Bot templates Sawyer (@SawyerMerritt) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Home Robots. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000089",
      name: "Home Robots",
      job: "Controls home robots such as a mower or vacuum from Grok Bot.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/3mf-UN4mGnCp8DbPBnW5u",
    }),
  ],
};

const SCHEE: Pack = {
  id: "10000000-0000-0000-0000-000000000080",
  owner: SCHEEMUNAI_OWNER,
  slug: "schee",
  name: "Schee",
  description:
    "Public Grok Bot templates Schee (@scheemunai) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Newsletter Cleanup. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000090",
      name: "Newsletter Cleanup",
      job: "Audits email and unsubscribes from newsletters.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/dHd69sBvMG2o3lJa__T7K",
    }),
  ],
};

const SCOTT: Pack = {
  id: "10000000-0000-0000-0000-000000000081",
  owner: SCOTTXMETCALF_OWNER,
  slug: "scott",
  name: "Scott",
  description:
    "Public Grok Bot templates Scott (@scottxmetcalf) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Leader 1:1 Bot. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000091",
      name: "Leader 1:1 Bot",
      job: "Walks into the 1:1 with last week's thread and the 3 things worth talking about.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/eZhKhPkfxxFSml18TS2X8",
    }),
  ],
};

const SOLEIO: Pack = {
  id: "10000000-0000-0000-0000-000000000082",
  owner: SOLEIO_OWNER,
  slug: "soleio",
  name: "Soleio",
  description:
    "Public Grok Bot templates Soleio (@soleio) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Polo. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000092",
      name: "Polo",
      job: "Lets friends and trusted contacts self-serve benign information from an inbox. Drafts replies to waiting Marco questions with a discretion engine.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/R-i5_wHeR_cBinyLVyvWh",
    }),
  ],
};

const SUBFORTI: Pack = {
  id: "10000000-0000-0000-0000-000000000083",
  owner: SUBFORTI_OWNER,
  slug: "subforti",
  name: "subforti",
  description:
    "Public Grok Bot templates subforti (@subforti) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Palette. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000093",
      name: "Palette",
      job: "Palette desk.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/yfrTgGSwB_DZNUxx0g05V",
    }),
  ],
};

const TESLACONOMICS: Pack = {
  id: "10000000-0000-0000-0000-000000000084",
  owner: TESLACONOMICS_OWNER,
  slug: "teslaconomics",
  name: "Teslaconomics",
  description:
    "Public Grok Bot templates Teslaconomics (@Teslaconomics) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Grok Build. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. This is not Bill Zanetti's Grok Build and not Beau's Grok Build.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000094",
      name: "Grok Build",
      job: "A Grok Build bot that builds the rest of the pack. Runs on an agent computer.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/ZRxm1O9tmizOhriV7GiWL",
    }),
  ],
};

const WIZARD: Pack = {
  id: "10000000-0000-0000-0000-000000000085",
  owner: THE_MR_WIZARD_OWNER,
  slug: "wizard",
  name: "Wizard",
  description:
    "Public Grok Bot templates Wizard (@The_Mr_Wizard) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Kirk. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000095",
      name: "Kirk",
      job: "Enterprise Crew. Type START after installing to load out the crew.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/FaRchqvTT6ZCRVPf0JABl",
    }),
  ],
};

const SORA_GIRLS: Pack = {
  id: "10000000-0000-0000-0000-000000000086",
  owner: THESORAGIRLS_OWNER,
  slug: "sora-girls",
  name: "Sora Girls",
  description:
    "Public Grok Bot templates thesoragirls (@thesoragirls) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Clipper. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000096",
      name: "Clipper",
      job: "Turns videos from X or your own files into short clips and GIFs with a clear angle.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/ozEfaAFJMDGoB-ysym8_V",
    }),
  ],
};

const THISWEEKNAI: Pack = {
  id: "10000000-0000-0000-0000-000000000087",
  owner: THISWEEKNAI_OWNER,
  slug: "thisweeknai",
  name: "ThisWeeknAI",
  description:
    "Public Grok Bot templates ThisWeeknAI (@ThisWeeknAI) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Clip Bot. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000097",
      name: "Clip Bot",
      job: "Pulls captioned clips from any YouTube video.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/Vk0cnF2c364QxNv-Xip1M",
    }),
  ],
};

const TOBIAS: Pack = {
  id: "10000000-0000-0000-0000-000000000088",
  owner: TOBIAS_PFUETZE_OWNER,
  slug: "tobias",
  name: "Tobias",
  description:
    "Public Grok Bot templates Tobias (@tobias_pfuetze) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Senior Analyst. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000098",
      name: "Senior Analyst",
      job: "OCR for images and text. Drop a document such as a financial statement; get financials back as Excel, then a cited memo.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/Q2xW8BIDffTjbDVXZYZhV",
    }),
  ],
};

const VINCENT: Pack = {
  id: "10000000-0000-0000-0000-000000000089",
  owner: VINCENTZHU_OWNER,
  slug: "vincent",
  name: "Vincent",
  description:
    "Public Grok Bot templates Vincent (@vincentzhu) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Spark. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000099",
      name: "Spark",
      job: "Onboarding seat.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/_2vi1lOY4oiBaJDA3S8l1",
    }),
  ],
};

const FEDERICO: Pack = {
  id: "10000000-0000-0000-0000-000000000090",
  owner: VITICCI_OWNER,
  slug: "federico",
  name: "Federico",
  description:
    "Public Grok Bot templates Federico Viticci (@viticci) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at StoriesBot. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000100",
      name: "StoriesBot",
      job: "Searches 17 years of Apple coverage on MacStories, annual iOS reviews, and questions about favorite apps and gear.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/cV7nGFO88pb2WXNN56h8A",
    }),
  ],
};

const WAYNE: Pack = {
  id: "10000000-0000-0000-0000-000000000091",
  owner: WAYNESUTTON_OWNER,
  slug: "wayne",
  name: "Wayne",
  description:
    "Public Grok Bot templates Wayne Sutton (@waynesutton) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Apps. Use Bot inbox only for unread bot and group-chat scans. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000101",
      name: "Apps",
      job: "One-shot apps with Convex. Builds Vite + React + TypeScript + Convex in anonymous development mode and returns a live app from the Grok Bot computer.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/OPLop__-mqSsyQheR5JYv",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000102",
      name: "Bot inbox",
      job: "Type \"scan\". One line per unread bot or group chat. Does not change other bots or mark anything as read.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/RHSd-aq6KC84xxUnvBXSl",
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
  SHANE,
  AARON,
  THIERRY,
  ANDY,
  AMBER,
  NICOLAS,
  JORDAN,
  MD,
  ERIC_REN,
  BILL,
  ARTHUR,
  AV1D,
  CHIEFJEEB,
  CLAIRE,
  DANI,
  DANIEL_FARINAX,
  DANIEL_MAC,
  DANIEL_ZAMBRINI,
  DIEGO,
  DOGECOINNORWAY,
  FANTOM,
  FILIPPO,
  HERESMYETH,
  ROBIN,
  HIEU,
  JACK,
  JORDAN_JACKSON,
  JOSH,
  KENT,
  KEVIN,
  KIARA,
  LENNY,
  LEX,
  LIAM,
  LIME,
  LINGXI,
  LOGAN,
  MANUEL,
  MATT_SILBERMAN,
  MUSTAFA,
  MATT_VANHORN,
  NAYLI,
  NYTEMODE,
  OLIVER,
  PARKER,
  RRYSSF,
  RYAN,
  SAWYER,
  SCHEE,
  SCOTT,
  SOLEIO,
  SUBFORTI,
  TESLACONOMICS,
  WIZARD,
  SORA_GIRLS,
  THISWEEKNAI,
  TOBIAS,
  VINCENT,
  FEDERICO,
  WAYNE,
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
  SHANEMAC_OWNER,
  AMAKELKY_OWNER,
  LETERRYBZH_OWNER,
  AHALVOR_OWNER,
  AMBERDAWN1786_OWNER,
  NICOCHAUVIN74_OWNER,
  JORDANHALL_DEV_OWNER,
  MDAFANULH_OWNER,
  RRRKREN_OWNER,
  BILLZANETTI_OWNER,
  ARTHURMACWATERS_OWNER,
  AV1DLIVE_OWNER,
  CHIEFJEEB_OWNER,
  CLAIREVO_OWNER,
  DANIACOSTAAI_OWNER,
  DANIEL_FARINAX_OWNER,
  DANIEL_MAC8_OWNER,
  DANIELZAMBRINI_OWNER,
  DIEGO_F_AGUIRRE_OWNER,
  DOGECOINNORWAY_OWNER,
  FANTOMBUILDZ_OWNER,
  FILIPPOFONSECA_OWNER,
  HERESMYETH_OWNER,
  HEYROBINAI_OWNER,
  HIEUDINH__OWNER,
  JACKFRIKS_OWNER,
  JORDANWCJACKSON_OWNER,
  JOSHKIM_OWNER,
  KENTCDODDS_OWNER,
  KEVINACE_OWNER,
  KIARAPLDS_OWNER,
  LENNYSAN_OWNER,
  LEXRUS_OWNER,
  LIAM_FALLEN_OWNER,
  LIMEUNFILTERED_OWNER,
  LINGXI_OWNER,
  LOGANAROBISON_OWNER,
  MAMUSO_OWNER,
  MATT_SILBERMAN_OWNER,
  MUSTAFAERGISI_OWNER,
  MVANHORN_OWNER,
  NAYLI_AI_OWNER,
  NYTEMODEONLY_OWNER,
  OLIVERKORZEN_OWNER,
  PARKER__CONRAD_OWNER,
  RRYSSF_OWNER,
  RYANTHAWKS_OWNER,
  SAWYERMERRITT_OWNER,
  SCHEEMUNAI_OWNER,
  SCOTTXMETCALF_OWNER,
  SOLEIO_OWNER,
  SUBFORTI_OWNER,
  TESLACONOMICS_OWNER,
  THE_MR_WIZARD_OWNER,
  THESORAGIRLS_OWNER,
  THISWEEKNAI_OWNER,
  TOBIAS_PFUETZE_OWNER,
  VINCENTZHU_OWNER,
  VITICCI_OWNER,
  WAYNESUTTON_OWNER,
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
