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
const ABDSHOMAD_OWNER_ID = "00000000-0000-0000-0000-000000000026";
const BRSTORRIE_OWNER_ID = "00000000-0000-0000-0000-000000000027";
const BEAUDENISON_OWNER_ID = "00000000-0000-0000-0000-000000000028";
const JENNANANPEI_OWNER_ID = "00000000-0000-0000-0000-000000000029";
const FUNKII_OWNER_ID = "00000000-0000-0000-0000-000000000030";
const SUMOSIGN_OWNER_ID = "00000000-0000-0000-0000-000000000031";
const BFRENCH_OWNER_ID = "00000000-0000-0000-0000-000000000032";
const HERDRDEV_OWNER_ID = "00000000-0000-0000-0000-000000000033";
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
const TPGOEBEL_OWNER_ID = "00000000-0000-0000-0000-000000000084";
const IMSHIV6T9_OWNER_ID = "00000000-0000-0000-0000-000000000085";
const DATA_NEXUS_OWNER_ID = "00000000-0000-0000-0000-000000000086";
const DARYLBLEACH_OWNER_ID = "00000000-0000-0000-0000-000000000087";
const JOHNBAI_OWNER_ID = "00000000-0000-0000-0000-000000000088";
const ZENSCHED_OWNER_ID = "00000000-0000-0000-0000-000000000089";
const MSAINTJOUR_OWNER_ID = "00000000-0000-0000-0000-000000000090";
const NIKOLAFYI_OWNER_ID = "00000000-0000-0000-0000-000000000091";
const BENNGARNISH_OWNER_ID = "00000000-0000-0000-0000-000000000092";
const OTNWORLD_OWNER_ID = "00000000-0000-0000-0000-000000000093";
const HENRYLEEBAUTA_OWNER_ID = "00000000-0000-0000-0000-000000000094";
const INQUSIT_OWNER_ID = "00000000-0000-0000-0000-000000000095";
const ADGAPAR_OWNER_ID = "00000000-0000-0000-0000-000000000096";
const MINEBOTCOIN_OWNER_ID = "00000000-0000-0000-0000-000000000097";
const DENNISONBERTRAM_OWNER_ID = "00000000-0000-0000-0000-000000000098";
const ADAMLOWISZ_OWNER_ID = "00000000-0000-0000-0000-000000000099";
const CHASEMC67_OWNER_ID = "00000000-0000-0000-0000-000000000100";
const ANDREW51786_OWNER_ID = "00000000-0000-0000-0000-000000000101";
const SEOAGENT__OWNER_ID = "00000000-0000-0000-0000-000000000102";
const AHURADEUS_OWNER_ID = "00000000-0000-0000-0000-000000000103";
const RICHSILVER_OWNER_ID = "00000000-0000-0000-0000-000000000104";
const KDJADEJA911_OWNER_ID = "00000000-0000-0000-0000-000000000105";
const JOSEAMIJARE_OWNER_ID = "00000000-0000-0000-0000-000000000106";
const MAXJEAN___OWNER_ID = "00000000-0000-0000-0000-000000000107";
const TYLERNISHIDA_OWNER_ID = "00000000-0000-0000-0000-000000000108";
const GAMBRILL_OWNER_ID = "00000000-0000-0000-0000-000000000109";
const OLD_PGMRS_WILL_OWNER_ID = "00000000-0000-0000-0000-000000000110";
const M_CHECK1B_OWNER_ID = "00000000-0000-0000-0000-000000000111";
const MAJDKAID_OWNER_ID = "00000000-0000-0000-0000-000000000112";
const MGALLMUR_OWNER_ID = "00000000-0000-0000-0000-000000000113";
const ZACHMLLR_OWNER_ID = "00000000-0000-0000-0000-000000000114";
const MARCUSRAMSEY_OWNER_ID = "00000000-0000-0000-0000-000000000115";
const RUSTAMATUEV_OWNER_ID = "00000000-0000-0000-0000-000000000116";
const DANKILLENBERGER_OWNER_ID = "00000000-0000-0000-0000-000000000117";
const SUDDENLYJON_OWNER_ID = "00000000-0000-0000-0000-000000000118";
const JOEPRO_OWNER_ID = "00000000-0000-0000-0000-000000000119";
const ZEUUSS_01_OWNER_ID = "00000000-0000-0000-0000-000000000120";
const USEPRISMNETWORK_OWNER_ID = "00000000-0000-0000-0000-000000000121";
const HASEEBMIR91_OWNER_ID = "00000000-0000-0000-0000-000000000122";
const RYANGBSYSTEMS_OWNER_ID = "00000000-0000-0000-0000-000000000123";
const MAHESHTHEDEV_OWNER_ID = "00000000-0000-0000-0000-000000000124";
const JAYBUIDL_OWNER_ID = "00000000-0000-0000-0000-000000000125";
const ANDRELEIBOVICI_OWNER_ID = "00000000-0000-0000-0000-000000000126";
const RANDYWHITEPDX_OWNER_ID = "00000000-0000-0000-0000-000000000127";
const POHLIPIT_OWNER_ID = "00000000-0000-0000-0000-000000000128";
const AKSHAYBHOPANI_OWNER_ID = "00000000-0000-0000-0000-000000000129";
const FRANKFINDOUT_OWNER_ID = "00000000-0000-0000-0000-000000000130";
const LUDIOFELIX_OWNER_ID = "00000000-0000-0000-0000-000000000131";
const BOSSRICESHARK_OWNER_ID = "00000000-0000-0000-0000-000000000132";
const SAASOCALYPSE_OWNER_ID = "00000000-0000-0000-0000-000000000133";
const MPIERAS_OWNER_ID = "00000000-0000-0000-0000-000000000134";
const EMRECOLAKOGLU_OWNER_ID = "00000000-0000-0000-0000-000000000135";
const ADEMVESSELL_OWNER_ID = "00000000-0000-0000-0000-000000000136";
const ANDYMADRICK_OWNER_ID = "00000000-0000-0000-0000-000000000137";
const KUNALSELLS_OWNER_ID = "00000000-0000-0000-0000-000000000138";
const YODA_FDE_OWNER_ID = "00000000-0000-0000-0000-000000000139";
const BRYANOFEARTH_OWNER_ID = "00000000-0000-0000-0000-000000000140";
const COONINVESTMENTS_OWNER_ID = "00000000-0000-0000-0000-000000000141";
const JOWENS254_OWNER_ID = "00000000-0000-0000-0000-000000000142";
const ONERINAS_OWNER_ID = "00000000-0000-0000-0000-000000000143";
const PAVRAVI_OWNER_ID = "00000000-0000-0000-0000-000000000144";
const JAKEWLITTLE_OWNER_ID = "00000000-0000-0000-0000-000000000145";
const ERINNFL_OWNER_ID = "00000000-0000-0000-0000-000000000146";

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

const ABDSHOMAD_OWNER: Profile = {
  id: ABDSHOMAD_OWNER_ID,
  githubLogin: "abdshomad",
  name: "Abd Shomad",
  avatarUrl: "https://avatars.githubusercontent.com/u/15354?v=4",
  xHandle: "abdshomad",
};

const BRSTORRIE_OWNER: Profile = {
  id: BRSTORRIE_OWNER_ID,
  githubLogin: "brstorrie",
  name: "Ben Storrie",
  avatarUrl: "https://avatars.githubusercontent.com/u/404844?v=4",
  xHandle: "brstorrie",
};

const BEAUDENISON_OWNER: Profile = {
  id: BEAUDENISON_OWNER_ID,
  githubLogin: "beaudenison",
  name: "Beau",
  avatarUrl: "https://avatars.githubusercontent.com/u/3272433?v=4",
  xHandle: "beaudenison",
};

const JENNANANPEI_OWNER: Profile = {
  id: JENNANANPEI_OWNER_ID,
  githubLogin: "jennananpei",
  name: "Jenna",
  avatarUrl: null,
  xHandle: "jennananpei",
};

const FUNKII_OWNER: Profile = {
  id: FUNKII_OWNER_ID,
  githubLogin: "funkii",
  name: "funkii",
  avatarUrl: "https://avatars.githubusercontent.com/u/26278363?v=4",
  xHandle: "funkii",
};

const SUMOSIGN_OWNER: Profile = {
  id: SUMOSIGN_OWNER_ID,
  githubLogin: "SumoSign",
  name: "Keith",
  avatarUrl: null,
  xHandle: "SumoSign",
};

const BFRENCH_OWNER: Profile = {
  id: BFRENCH_OWNER_ID,
  githubLogin: "bfrench",
  name: "Bill French",
  avatarUrl: "https://avatars.githubusercontent.com/u/726623?v=4",
  xHandle: "bfrench",
};

const HERDRDEV_OWNER: Profile = {
  id: HERDRDEV_OWNER_ID,
  githubLogin: "herdrdev",
  name: "Can",
  avatarUrl: "https://avatars.githubusercontent.com/u/309108654?v=4",
  xHandle: "herdrdev",
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

const TPGOEBEL_OWNER: Profile = {
  id: TPGOEBEL_OWNER_ID,
  githubLogin: "tpgoebel",
  name: "Tobias Goebel",
  avatarUrl: "https://avatars.githubusercontent.com/u/425826?v=4",
  xHandle: "tpgoebel",
};

const IMSHIV6T9_OWNER: Profile = {
  id: IMSHIV6T9_OWNER_ID,
  githubLogin: "imshiv6t9",
  name: "Shiv",
  avatarUrl: null,
  xHandle: "imshiv6t9",
};

const DATA_NEXUS_OWNER: Profile = {
  id: DATA_NEXUS_OWNER_ID,
  githubLogin: "data_nexus",
  name: "Data Nexus",
  avatarUrl: null,
  xHandle: "data_nexus",
};

const DARYLBLEACH_OWNER: Profile = {
  id: DARYLBLEACH_OWNER_ID,
  githubLogin: "darylbleach",
  name: "Daryl",
  avatarUrl: "https://avatars.githubusercontent.com/u/4758191?v=4",
  xHandle: "darylbleach",
};

const JOHNBAI_OWNER: Profile = {
  id: JOHNBAI_OWNER_ID,
  githubLogin: "johnbai",
  name: "John",
  avatarUrl: "https://avatars.githubusercontent.com/u/9279966?v=4",
  xHandle: "johnbai",
};

const ZENSCHED_OWNER: Profile = {
  id: ZENSCHED_OWNER_ID,
  githubLogin: "ZenSched",
  name: "ZenSched",
  avatarUrl: "https://avatars.githubusercontent.com/u/288568580?v=4",
  xHandle: "zensched",
};

const MSAINTJOUR_OWNER: Profile = {
  id: MSAINTJOUR_OWNER_ID,
  githubLogin: "MSaintjour",
  name: "Marc Saint-Jour",
  avatarUrl: null,
  xHandle: "MSaintjour",
};

const NIKOLAFYI_OWNER: Profile = {
  id: NIKOLAFYI_OWNER_ID,
  githubLogin: "NikolaFYI",
  name: "Nikola",
  avatarUrl: null,
  xHandle: "NikolaFYI",
};

const BENNGARNISH_OWNER: Profile = {
  id: BENNGARNISH_OWNER_ID,
  githubLogin: "benngarnish",
  name: "Benn",
  avatarUrl: "https://avatars.githubusercontent.com/u/1122587?v=4",
  xHandle: "benngarnish",
};

const OTNWORLD_OWNER: Profile = {
  id: OTNWORLD_OWNER_ID,
  githubLogin: "OTNworld",
  name: "Paul S",
  avatarUrl: "https://avatars.githubusercontent.com/u/228165969?v=4",
  xHandle: "OTNworld",
};

const HENRYLEEBAUTA_OWNER: Profile = {
  id: HENRYLEEBAUTA_OWNER_ID,
  githubLogin: "HenryLeeBauta",
  name: "Henry",
  avatarUrl: null,
  xHandle: "HenryLeeBauta",
};

const INQUSIT_OWNER: Profile = {
  id: INQUSIT_OWNER_ID,
  githubLogin: "inqusit",
  name: "Ashish",
  avatarUrl: null,
  xHandle: "inqusit",
};

const ADGAPAR_OWNER: Profile = {
  id: ADGAPAR_OWNER_ID,
  githubLogin: "adgapar",
  name: "Adi",
  avatarUrl: "https://avatars.githubusercontent.com/u/3167828?v=4",
  xHandle: "adgapar",
};

const MINEBOTCOIN_OWNER: Profile = {
  id: MINEBOTCOIN_OWNER_ID,
  githubLogin: "minebotcoin",
  name: "BOTCOIN",
  avatarUrl: null,
  xHandle: "MineBotcoin",
};

const DENNISONBERTRAM_OWNER: Profile = {
  id: DENNISONBERTRAM_OWNER_ID,
  githubLogin: "dennisonbertram",
  name: "Dennison",
  avatarUrl: "https://avatars.githubusercontent.com/u/228482372?v=4",
  xHandle: "DennisonBertram",
};

const ADAMLOWISZ_OWNER: Profile = {
  id: ADAMLOWISZ_OWNER_ID,
  githubLogin: "adamlowisz",
  name: "Adam",
  avatarUrl: null,
  xHandle: "AdamLowisz",
};

const CHASEMC67_OWNER: Profile = {
  id: CHASEMC67_OWNER_ID,
  githubLogin: "chasemc67",
  name: "Chase",
  avatarUrl: "https://avatars.githubusercontent.com/u/6922982?v=4",
  xHandle: "ChaseMc67",
};

const ANDREW51786_OWNER: Profile = {
  id: ANDREW51786_OWNER_ID,
  githubLogin: "Andrew51786",
  name: "Andrew",
  avatarUrl: null,
  xHandle: "Andrew51786",
};

const SEOAGENT__OWNER: Profile = {
  id: SEOAGENT__OWNER_ID,
  githubLogin: "SEOAgent_",
  name: "SEOAgent",
  avatarUrl: null,
  xHandle: "SEOAgent_",
};

const AHURADEUS_OWNER: Profile = {
  id: AHURADEUS_OWNER_ID,
  githubLogin: "AhuraDeus",
  name: "Ahura",
  avatarUrl: null,
  xHandle: "AhuraDeus",
};

const RICHSILVER_OWNER: Profile = {
  id: RICHSILVER_OWNER_ID,
  githubLogin: "richsilver",
  name: "Rich",
  avatarUrl: "https://avatars.githubusercontent.com/u/139979523?v=4",
  xHandle: "RichSilver",
};

const KDJADEJA911_OWNER: Profile = {
  id: KDJADEJA911_OWNER_ID,
  githubLogin: "KdJadeja911",
  name: "Krushnasinh",
  avatarUrl: null,
  xHandle: "KdJadeja911",
};

const JOSEAMIJARE_OWNER: Profile = {
  id: JOSEAMIJARE_OWNER_ID,
  githubLogin: "joseamijares",
  name: "Jose",
  avatarUrl: "https://avatars.githubusercontent.com/u/6046480?v=4",
  xHandle: "joseamijares",
};

const MAXJEAN___OWNER: Profile = {
  id: MAXJEAN___OWNER_ID,
  githubLogin: "maxjean__",
  name: "Max",
  avatarUrl: null,
  xHandle: "maxjean__",
};

const TYLERNISHIDA_OWNER: Profile = {
  id: TYLERNISHIDA_OWNER_ID,
  githubLogin: "tylernishida",
  name: "Tyler",
  avatarUrl: "https://avatars.githubusercontent.com/u/49229588?v=4",
  xHandle: "TylerNishida",
};

const GAMBRILL_OWNER: Profile = {
  id: GAMBRILL_OWNER_ID,
  githubLogin: "gambrill",
  name: "Dave",
  avatarUrl: "https://avatars.githubusercontent.com/u/80799824?v=4",
  xHandle: "gambrill",
};

const OLD_PGMRS_WILL_OWNER: Profile = {
  id: OLD_PGMRS_WILL_OWNER_ID,
  githubLogin: "old-pgmrs-will",
  name: "Will",
  avatarUrl: "https://avatars.githubusercontent.com/u/102408514?v=4",
  xHandle: "old_pgmrs_will",
};

const M_CHECK1B_OWNER: Profile = {
  id: M_CHECK1B_OWNER_ID,
  githubLogin: "m_check1B",
  name: "Matej",
  avatarUrl: null,
  xHandle: "m_check1B",
};

const MAJDKAID_OWNER: Profile = {
  id: MAJDKAID_OWNER_ID,
  githubLogin: "majdkaid",
  name: "Majd",
  avatarUrl: "https://avatars.githubusercontent.com/u/65400078?v=4",
  xHandle: "MajdKaid",
};

const MGALLMUR_OWNER: Profile = {
  id: MGALLMUR_OWNER_ID,
  githubLogin: "MGallmur",
  name: "Mauricio",
  avatarUrl: null,
  xHandle: "MGallmur",
};

const ZACHMLLR_OWNER: Profile = {
  id: ZACHMLLR_OWNER_ID,
  githubLogin: "zachmllr",
  name: "Zach",
  avatarUrl: null,
  xHandle: "zachmllr",
};

const MARCUSRAMSEY_OWNER: Profile = {
  id: MARCUSRAMSEY_OWNER_ID,
  githubLogin: "MarcusRamsey",
  name: "Marcus",
  avatarUrl: "https://avatars.githubusercontent.com/u/3101699?v=4",
  xHandle: "marcusramsey",
};

const RUSTAMATUEV_OWNER: Profile = {
  id: RUSTAMATUEV_OWNER_ID,
  githubLogin: "RustamAtuev",
  name: "Rustam",
  avatarUrl: "https://avatars.githubusercontent.com/u/288767497?v=4",
  xHandle: "RustamAtuev",
};

const DANKILLENBERGER_OWNER: Profile = {
  id: DANKILLENBERGER_OWNER_ID,
  githubLogin: "dankillenberger",
  name: "Daniel",
  avatarUrl: null,
  xHandle: "DanKillenberger",
};

const SUDDENLYJON_OWNER: Profile = {
  id: SUDDENLYJON_OWNER_ID,
  githubLogin: "suddenlyjon",
  name: "Knock",
  avatarUrl: null,
  xHandle: "SuddenlyJon",
};

const JOEPRO_OWNER: Profile = {
  id: JOEPRO_OWNER_ID,
  githubLogin: "joepro",
  name: "Joseph",
  avatarUrl: "https://avatars.githubusercontent.com/u/1109367?v=4",
  xHandle: "JoePro",
};

const ZEUUSS_01_OWNER: Profile = {
  id: ZEUUSS_01_OWNER_ID,
  githubLogin: "zeuuss_01",
  name: "ZEU$",
  avatarUrl: null,
  xHandle: "zeuuss_01",
};

const USEPRISMNETWORK_OWNER: Profile = {
  id: USEPRISMNETWORK_OWNER_ID,
  githubLogin: "useprismnetwork",
  name: "Prism",
  avatarUrl: null,
  xHandle: "useprismnetwork",
};

const HASEEBMIR91_OWNER: Profile = {
  id: HASEEBMIR91_OWNER_ID,
  githubLogin: "haseebmir91",
  name: "Haseeb",
  avatarUrl: null,
  xHandle: "HaseebMir91",
};

const RYANGBSYSTEMS_OWNER: Profile = {
  id: RYANGBSYSTEMS_OWNER_ID,
  githubLogin: "ryangbsystems",
  name: "Ryan",
  avatarUrl: null,
  xHandle: "RyanGBsystems",
};

const MAHESHTHEDEV_OWNER: Profile = {
  id: MAHESHTHEDEV_OWNER_ID,
  githubLogin: "MaheshtheDev",
  name: "Mahesh",
  avatarUrl: "https://avatars.githubusercontent.com/u/38828053?v=4",
  xHandle: "MaheshtheDev",
};

const JAYBUIDL_OWNER: Profile = {
  id: JAYBUIDL_OWNER_ID,
  githubLogin: "jaybuidl",
  name: "jaybuidl",
  avatarUrl: "https://avatars.githubusercontent.com/u/22213980?v=4",
  xHandle: "JayBuidl",
};

const ANDRELEIBOVICI_OWNER: Profile = {
  id: ANDRELEIBOVICI_OWNER_ID,
  githubLogin: "andreleibovici",
  name: "Andre",
  avatarUrl: null,
  xHandle: "andreleibovici",
};

const RANDYWHITEPDX_OWNER: Profile = {
  id: RANDYWHITEPDX_OWNER_ID,
  githubLogin: "randywhitepdx",
  name: "Randall",
  avatarUrl: null,
  xHandle: "RandyWhitePDX",
};

const POHLIPIT_OWNER: Profile = {
  id: POHLIPIT_OWNER_ID,
  githubLogin: "pohlipit",
  name: "Pete",
  avatarUrl: "https://avatars.githubusercontent.com/u/1668364?v=4",
  xHandle: "pohlipit",
};

const AKSHAYBHOPANI_OWNER: Profile = {
  id: AKSHAYBHOPANI_OWNER_ID,
  githubLogin: "akshaybhopani",
  name: "Akshay",
  avatarUrl: "https://avatars.githubusercontent.com/u/28391021?v=4",
  xHandle: "AKSHAYBHOPANI",
};

const FRANKFINDOUT_OWNER: Profile = {
  id: FRANKFINDOUT_OWNER_ID,
  githubLogin: "frankfindsout",
  name: "Frank",
  avatarUrl: null,
  xHandle: "FrankFindsOut",
};

const LUDIOFELIX_OWNER: Profile = {
  id: LUDIOFELIX_OWNER_ID,
  githubLogin: "ludiofelix",
  name: "Rob",
  avatarUrl: null,
  xHandle: "ludiofelix",
};

const BOSSRICESHARK_OWNER: Profile = {
  id: BOSSRICESHARK_OWNER_ID,
  githubLogin: "bossriceshark",
  name: "Matt",
  avatarUrl: "https://avatars.githubusercontent.com/u/194162663?v=4",
  xHandle: "bossriceshark",
};

const SAASOCALYPSE_OWNER: Profile = {
  id: SAASOCALYPSE_OWNER_ID,
  githubLogin: "saasocalypse",
  name: "Ankur",
  avatarUrl: null,
  xHandle: "SaaSocalypse",
};

const MPIERAS_OWNER: Profile = {
  id: MPIERAS_OWNER_ID,
  githubLogin: "mpieras",
  name: "Miguel",
  avatarUrl: "https://avatars.githubusercontent.com/u/9534587?v=4",
  xHandle: "mpieras",
};

const EMRECOLAKOGLU_OWNER: Profile = {
  id: EMRECOLAKOGLU_OWNER_ID,
  githubLogin: "emrecolakoglu",
  name: "Emre",
  avatarUrl: "https://avatars.githubusercontent.com/u/919056?v=4",
  xHandle: "emrecolakoglu",
};

const ADEMVESSELL_OWNER: Profile = {
  id: ADEMVESSELL_OWNER_ID,
  githubLogin: "AdemVessell",
  name: "Adem",
  avatarUrl: "https://avatars.githubusercontent.com/u/134353219?v=4",
  xHandle: "AdemVessell",
};

const ANDYMADRICK_OWNER: Profile = {
  id: ANDYMADRICK_OWNER_ID,
  githubLogin: "andymadrick",
  name: "Andy",
  avatarUrl: "https://avatars.githubusercontent.com/u/140104796?v=4",
  xHandle: "andymadrick",
};

const KUNALSELLS_OWNER: Profile = {
  id: KUNALSELLS_OWNER_ID,
  githubLogin: "kunalsells",
  name: "Kunal",
  avatarUrl: null,
  xHandle: "kunalsells",
};

const YODA_FDE_OWNER: Profile = {
  id: YODA_FDE_OWNER_ID,
  githubLogin: "yoda_FDE",
  name: "Yoda",
  avatarUrl: null,
  xHandle: "yoda_FDE",
};

const BRYANOFEARTH_OWNER: Profile = {
  id: BRYANOFEARTH_OWNER_ID,
  githubLogin: "Bryanofearth",
  name: "Bryan",
  avatarUrl: "https://avatars.githubusercontent.com/u/171011086?v=4",
  xHandle: "bryanofearth",
};

const COONINVESTMENTS_OWNER: Profile = {
  id: COONINVESTMENTS_OWNER_ID,
  githubLogin: "CoonInvestments",
  name: "Austin",
  avatarUrl: null,
  xHandle: "CoonInvestments",
};

const JOWENS254_OWNER: Profile = {
  id: JOWENS254_OWNER_ID,
  githubLogin: "JOwens254",
  name: "Justin",
  avatarUrl: null,
  xHandle: "JOwens254",
};

const ONERINAS_OWNER: Profile = {
  id: ONERINAS_OWNER_ID,
  githubLogin: "onerinas",
  name: "Rinas",
  avatarUrl: "https://avatars.githubusercontent.com/u/5433320?v=4",
  xHandle: "onerinas",
};

const PAVRAVI_OWNER: Profile = {
  id: PAVRAVI_OWNER_ID,
  githubLogin: "pavravi",
  name: "Pavan",
  avatarUrl: null,
  xHandle: "pavravi",
};

const JAKEWLITTLE_OWNER: Profile = {
  id: JAKEWLITTLE_OWNER_ID,
  githubLogin: "jakewlittle",
  name: "Jake",
  avatarUrl: "https://avatars.githubusercontent.com/u/94403708?v=4",
  xHandle: "jakewlittle",
};

const ERINNFL_OWNER: Profile = {
  id: ERINNFL_OWNER_ID,
  githubLogin: "erinnfl",
  name: "Erinn",
  avatarUrl: null,
  xHandle: "ErinnFL",
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
    'Random and “make me a bot” stay at Dr Eggbot. Use tinkabot only for wrapping an API into a Cursor/Agent Plugin. Named seats only when that job is already in this pack.',
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots she published as https://x.ai/bot/… belong here. When she publishes another official link, add a seat. Do not invent unpublished Eng/PM/recruiter bots. Do not add Box Inspector or Point peddler. tinkabot is her official share, not a quote of someone else's post.",
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
      id: "20000000-0000-0000-0000-000000000157",
      name: "tinkabot",
      job: "Wraps an API into a Cursor/Agent Plugin (MCP + skills). Data shape first, smallest scaffold that works, prove locally, then ask once for affiliation.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/br5f3C4mc75QCMEHaszXd",
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
    "Random questions stay at Rutin. Use Chieeeeefy only for chief-of-staff work. Use Fondi only for founding-team installer work. Named seats only when that job is already in this pack.",
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
    seat({
      id: "20000000-0000-0000-0000-000000000175",
      name: "Fondi",
      job: "Founding-team installer for solo founders on Grok Bot. Researches your startup from its public site, then stands up a lead team.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 2,
      grokTemplateUrl: "https://x.ai/bot/qL920VjKyua3_u89UYnQL",
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
    "Random pitch questions stay at Pitch Deck Coach. Use It's Britney only for Britney dance clips. Use Product Idea Stress Test only for idea and assumption testing. Use The Page only for public-page change watches. Use When It Matters only for watches that should message when the answer actually changes. Named seats only when that job is already in this pack.",
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
    seat({
      id: "20000000-0000-0000-0000-000000000111",
      name: "When It Matters",
      job: "Takes something you keep checking, figures out what would actually change the answer, keeps watch, and messages you when it matters.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 4,
      grokTemplateUrl: "https://x.ai/bot/BqrH8_GNQvSYV-gcmJnd8",
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
    "Random questions stay at Claudey. Use Shorty only for YouTube Shorts clipping. Use Researchy only for Grok Build CLI at max thinking. Named seats only when that job is already in this pack.",
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
    seat({
      id: "20000000-0000-0000-0000-000000000103",
      name: "Researchy",
      job: "Runs exclusively on Grok Build CLI with the latest Grok model at the highest thinking level.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 2,
      grokTemplateUrl: "https://x.ai/bot/rQt4W2zO2Gx9lfcBjd1lj",
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
    "Random questions stay at 2nd Brain. Use Rogue Bot Hunter only for rogue/fleet policing. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. Random stays at 2nd Brain. Use Rogue Bot Hunter only for rogue/fleet policing.",
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
    seat({
      id: "20000000-0000-0000-0000-000000000188",
      name: "Rogue Bot Hunter",
      job: "Police for rogue bots: cut the bill, hunt the copies, occupy the niche. Defensive only. Weekly fleet recap, a hunt when a new bot appears, and it asks before it cuts.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/DNpS1nqrBzmQ5vsx1IHn1",
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
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. This is Andy (@ahalvor), not Andy (@andymadrick).",
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
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. Do not add STEER; that template was not shared by Bill in this hunt. Do not add Beau's Grok Build (https://x.ai/bot/iwa3WaHZn385jfZrsQngL); that is a separate pack.",
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

const ABD: Pack = {
  id: "10000000-0000-0000-0000-000000000034",
  owner: ABDSHOMAD_OWNER,
  slug: "abd",
  name: "Abd",
  description:
    "Public Grok Bot templates Abd Shomad (@abdshomad) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Bot Father. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000032",
      name: "Bot Father",
      job: "Central orchestrator that nourishes, protects, and evolves a network of child agents.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/dVQjvC6c-sMhtgVskciBH",
    }),
  ],
};

const BEN: Pack = {
  id: "10000000-0000-0000-0000-000000000035",
  owner: BRSTORRIE_OWNER,
  slug: "ben",
  name: "Ben",
  description:
    "Public Grok Bot templates Ben Storrie (@brstorrie) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at The Accountant. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. The Accountant is a sibling of Aaron Overwatch conceptually but a separate pack; do not add it to Aaron.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000033",
      name: "The Accountant",
      job: "Finds runaway-token Grok Bots (over-polling, bloated usage, retry loops) and recommends what to tighten, offload, or kill. Drafts only; never deletes or pauses.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/Y_R1Ya9SIzQZguGTV5NCX",
    }),
  ],
};

const BEAU: Pack = {
  id: "10000000-0000-0000-0000-000000000036",
  owner: BEAUDENISON_OWNER,
  slug: "beau",
  name: "Beau",
  description:
    "Public Grok Bot templates Beau (@beaudenison) has shared. One pack, his roster, official Grok install per seat.",
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
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. This is not Bill Zanetti's Grok Build and not Teslaconomics' Grok Build.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000034",
      name: "Grok Build",
      job: "Builds client websites, deploys a Vercel preview, and emails the client a preview link. Checks before sending mail or going live.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/iwa3WaHZn385jfZrsQngL",
    }),
  ],
};

const JENNA: Pack = {
  id: "10000000-0000-0000-0000-000000000037",
  owner: JENNANANPEI_OWNER,
  slug: "jenna",
  name: "Jenna",
  description:
    "Public Grok Bot templates Jenna (@jennananpei) has shared. One pack, her roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Trendspotter. Use Bing Bong only for sports marketing partnership ops. Use Event Producer only for VIP and field event production. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots she published as https://x.ai/bot/… belong here. When she publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000035",
      name: "Trendspotter",
      job: "Weekday digest of sports, entertainment, and culture trends plus AI-in-marketing signals.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/nnDL-hclNLB8SkJvcVtwr",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000036",
      name: "Bing Bong",
      job: "Sports marketing partnership ops for field marketers: tickets, partner emails, branding handoffs, and suite tracking.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/BjzK0lRsgxuLSsQIsnI3E",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000037",
      name: "Event Producer",
      job: "VIP and field event production end-to-end: run-of-show, venue, F&B, AV, staffing, and day-of checklists.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 2,
      grokTemplateUrl: "https://x.ai/bot/5gyGG-rnVsQVTLWAfki1u",
    }),
  ],
};

const FUNKII: Pack = {
  id: "10000000-0000-0000-0000-000000000038",
  owner: FUNKII_OWNER,
  slug: "funkii",
  name: "funkii",
  description:
    "Public Grok Bot templates funkii (@funkii) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at t2000. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000038",
      name: "t2000",
      job: "Marketplace operator for t2000.ai. Earn, hire, settle, and sell in USDC over Passport Connect.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/eXQt5VUovcU0HMj_b-CDY",
    }),
  ],
};

const KEITH: Pack = {
  id: "10000000-0000-0000-0000-000000000039",
  owner: SUMOSIGN_OWNER,
  slug: "keith",
  name: "Keith",
  description:
    "Public Grok Bot templates Keith (@SumoSign) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at SumoSign. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000039",
      name: "SumoSign",
      job: "Sends documents for human signature via SumoSign. Client API key only; humans sign via emailed links.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/Uicr9Dc3FKOmsMfbN_NHB",
    }),
  ],
};

const BILL_FRENCH: Pack = {
  id: "10000000-0000-0000-0000-000000000040",
  owner: BFRENCH_OWNER,
  slug: "bill-french",
  name: "Bill French",
  description:
    "Public Grok Bot templates Bill French (@bfrench) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at STEER. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. This is not Bill Zanetti's pack. STEER belongs here.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000040",
      name: "STEER",
      job: "A writing desk for killing AI slop. Mark a draft, Save, and get a rewrite that follows the marks.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/mhzjt-Pa01Ds8EJ0zJrcz",
    }),
  ],
};

const CAN: Pack = {
  id: "10000000-0000-0000-0000-000000000041",
  owner: HERDRDEV_OWNER,
  slug: "can",
  name: "Can",
  description:
    "Public Grok Bot templates Can (@herdrdev) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Shepherd. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000041",
      name: "Shepherd",
      job: "Orchestrates agents in Herdr, an open runtime for coding agents.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/i5YF8f-zdcR76uKPrqg3J",
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
    "Random questions stay at Chef. Use Review This only for named-product reviews. Named seats only when that job is already in this pack.",
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
    seat({
      id: "20000000-0000-0000-0000-000000000113",
      name: "Review This",
      job: "Reviews the exact product you name. Weighs lab tests, retailer ratings, and owner forums against price and fit in your home market, then says buy, skip, or wait, and how thin the evidence is.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/g4hvAEhebCPzqwsdPBGu4",
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
    "Random questions stay at Bounty Hunter. Use Gus Fring only for QC gate. Use Beatrix Kiddo only for logistics exceptions. Use Jordan Belfort only for sales pipeline. Use Sarah Connor only for risk. Use Tony Montana only for procurement. Named seats only when that job is already in this pack.",
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
    seat({
      id: "20000000-0000-0000-0000-000000000191",
      name: "Gus Fring",
      job: "Quality Control Manager. Stamps PASS / PASS WITH FIXES / FAIL.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/Dhk5c79MEj0MRM484ZM1k",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000192",
      name: "Beatrix Kiddo",
      job: "Logistics Manager. Holds the exception queue.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 2,
      grokTemplateUrl: "https://x.ai/bot/z4Chp77wqP5ASkBKpxOOk",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000193",
      name: "Jordan Belfort",
      job: "Sales Manager. Pipeline hygiene.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 3,
      grokTemplateUrl: "https://x.ai/bot/fh1hnF7YJVoSJxEu-vKwj",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000195",
      name: "Sarah Connor",
      job: "Risk Manager. Operational and business risk: supplier risk, missing backups, expiring contracts, single points of failure, important dependencies, no plan B. Not a movie apocalypse novelty.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 4,
      grokTemplateUrl: "https://x.ai/bot/Bw-JDTu5BhTFki1GhAy9k",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000196",
      name: "Tony Montana",
      job: "Procurement Manager. Checks terms, finds suppliers, compares quotes, finds cheaper options, and prepares negotiation. Does not spend without approval.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 5,
      grokTemplateUrl: "https://x.ai/bot/tbuow4aHucVEAgNbF7qzU",
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
    "Random questions stay at last30days. Use Tesla Bot only for Tesla vehicle control from chat. Named seats only when that job is already in this pack.",
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
    seat({
      id: "20000000-0000-0000-0000-000000000176",
      name: "Tesla Bot",
      job: "Controls your Tesla from chat via tesla-pp-cli — climate, charge, locks, navigation, Superchargers, and charging costs.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/l4EozO2deoaWFB8hOGwTY",
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
    "Random questions stay at Leader 1:1 Bot. Use SE call bot only for SE and sales-engineer call work. Use Cookie Monster only for Chrome cookie-sync work. Named seats only when that job is already in this pack.",
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
    seat({
      id: "20000000-0000-0000-0000-000000000112",
      name: "SE call bot",
      job: "Helps win SE and sales-engineer calls with spoken product answers, stories, doc QA, and FDE/CE plays.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/9wmmsO_xoeLPeGEqjWLzE",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000125",
      name: "Cookie Monster",
      job: "Keeps Chrome cookies in sync for a fleet of Grok Bots that browse signed-in sites. Imports the right cookie origins onto the shared computer so those bots stay signed in — not a connector fixer, and not a daily sync.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 2,
      grokTemplateUrl: "https://x.ai/bot/55t0IuxxlT7BWffNVOKai",
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

const TOBIAS_GOEBEL: Pack = {
  id: "10000000-0000-0000-0000-000000000092",
  owner: TPGOEBEL_OWNER,
  slug: "tobias-goebel",
  name: "Tobias Goebel",
  description:
    "Public Grok Bot templates Tobias Goebel (@tpgoebel) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Melissa. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000104",
      name: "Melissa",
      job: "Fitness and nutrition coach with a balance between pulling for updates and waiting for you to tell her.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/3foGoeh6ksDhD4jTxYjyE",
    }),
  ],
};

const SHIV: Pack = {
  id: "10000000-0000-0000-0000-000000000093",
  owner: IMSHIV6T9_OWNER,
  slug: "shiv",
  name: "Shiv",
  description:
    "Public Grok Bot templates Shiv (@imshiv6t9) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Learning Assistant. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000105",
      name: "Learning Assistant",
      job: "Learning assistant.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/yE46R6j5vNPhd92fGxZRu",
    }),
  ],
};

const DATA_NEXUS: Pack = {
  id: "10000000-0000-0000-0000-000000000094",
  owner: DATA_NEXUS_OWNER,
  slug: "data-nexus",
  name: "Data Nexus",
  description:
    "Public Grok Bot templates Data Nexus (@data_nexus) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Blockchain Data Expert. Use Blockchain Data Expert 2 only for the second blockchain-data desk. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000106",
      name: "Blockchain Data Expert",
      job: "Blockchain data expert desk.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/xqZS2HUq3XEoQ8oaH0LnA",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000107",
      name: "Blockchain Data Expert 2",
      job: "Second blockchain data expert seat.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/eyFr_G8h9UmrQHNpZpNfx",
    }),
  ],
};

const DARYL: Pack = {
  id: "10000000-0000-0000-0000-000000000095",
  owner: DARYLBLEACH_OWNER,
  slug: "daryl",
  name: "Daryl",
  description:
    "Public Grok Bot templates Daryl (@darylbleach) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Porter. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000108",
      name: "Porter",
      job: "Porter desk.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/cl7kIRbcIuP6jj2Zt8z5K",
    }),
  ],
};

const JOHN: Pack = {
  id: "10000000-0000-0000-0000-000000000096",
  owner: JOHNBAI_OWNER,
  slug: "john",
  name: "John",
  description:
    "Public Grok Bot templates John (@johnbai) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at figma bro. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. Do not add SEO/GEO Specialist; that listing does not match this author's tweet.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000109",
      name: "figma bro",
      job: "Figma bro for repetitive Figma tasks.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/VHMdjIGjGpgDSJR7dW6Gz",
    }),
  ],
};

const ZENSCHED: Pack = {
  id: "10000000-0000-0000-0000-000000000097",
  owner: ZENSCHED_OWNER,
  slug: "zensched",
  name: "ZenSched",
  description:
    "Public Grok Bot templates ZenSched (@zensched) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at ZenSched. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000110",
      name: "ZenSched",
      job: "ZenSched desk.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/LK0rEXJnnD1qpEISXd7Ix",
    }),
  ],
};

const MARC: Pack = {
  id: "10000000-0000-0000-0000-000000000098",
  owner: MSAINTJOUR_OWNER,
  slug: "marc",
  name: "Marc",
  description:
    "Public Grok Bot templates Marc Saint-Jour (@MSaintjour) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Copay Compass. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000114",
      name: "Copay Compass",
      job: "Finds copay assistance for a cancer drug, signs you up for reopen alerts, and prepares applications and appeals. You submit everything yourself; it does not give medical advice and never asks for a Social Security number.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/ehxj2Wdxq9M04jvaAqyBD",
    }),
  ],
};

const NIKOLA: Pack = {
  id: "10000000-0000-0000-0000-000000000099",
  owner: NIKOLAFYI_OWNER,
  slug: "nikola",
  name: "Nikola",
  description:
    "Public Grok Bot templates Nikola (@NikolaFYI) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Nom Nom. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000115",
      name: "Nom Nom",
      job: "A calorie tracker with a simple food log. Records meals, remembers named recipes, keeps a running daily total, and sends an end-of-day wrap-up.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/bdcSxv_pSQEH0E571N_fC",
    }),
  ],
};

const BENN: Pack = {
  id: "10000000-0000-0000-0000-000000000100",
  owner: BENNGARNISH_OWNER,
  slug: "benn",
  name: "Benn",
  description:
    "Public Grok Bot templates Benn (@benngarnish) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Patch. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. This is not Ben Storrie's The Accountant.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000116",
      name: "Patch",
      job: "Helps people in the UK look after the lawn and garden they already have, month by month. Asks region, light, soil, and what is actually there, then writes a seasonal care plan timed to that garden.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/mZM210IvFxqswc9eaLjQa",
    }),
  ],
};

const PAUL: Pack = {
  id: "10000000-0000-0000-0000-000000000101",
  owner: OTNWORLD_OWNER,
  slug: "paul",
  name: "Paul",
  description:
    "Public Grok Bot templates Paul S (@OTNworld) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Workshop Facilitator. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000117",
      name: "Workshop Facilitator",
      job: "Facilitates workshops with a person and other specialist agents. Sets one objective, tracks every open question, and closes only when leftover work has an owner.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/EJTJEGbRPXlSppzFk8ETH",
    }),
  ],
};

const HENRY: Pack = {
  id: "10000000-0000-0000-0000-000000000102",
  owner: HENRYLEEBAUTA_OWNER,
  slug: "henry",
  name: "Henry",
  description:
    "Public Grok Bot templates Henry (@HenryLeeBauta) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Artifact Share. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000118",
      name: "Artifact Share",
      job: "Turns what your AI just made into a real URL a client can open. For Grok Bot users who are done sending chat links. Uses Bauta. Private by default.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/u3jfM8xk_CixZJYKQ0S7u",
    }),
  ],
};

const ASHISH: Pack = {
  id: "10000000-0000-0000-0000-000000000103",
  owner: INQUSIT_OWNER,
  slug: "ashish",
  name: "Ashish",
  description:
    "Public Grok Bot templates Ashish (@inqusit) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Tech Lead. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000119",
      name: "Tech Lead",
      job: "Stops pull requests from merging on hope. Reviews the actual diff against the claim, waits for real tests, and only ships when the evidence is there — for founders and small teams who want a tech lead, not a rubber stamp.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/RfFPxQ_rfEGcUncrJ6g_W",
    }),
  ],
};

const ADI: Pack = {
  id: "10000000-0000-0000-0000-000000000104",
  owner: ADGAPAR_OWNER,
  slug: "adi",
  name: "Adi",
  description:
    "Public Grok Bot templates Adi (@adgapar) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Token Ops. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000120",
      name: "Token Ops",
      job: "Knows every live routine across your Grok Bots, how often each fires, and whether it is worth the tokens. Flags waste and applies obvious weekday-bound fixes.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/4mCuSlW34n6l3aYxYJCdj",
    }),
  ],
};

const BOTCOIN: Pack = {
  id: "10000000-0000-0000-0000-000000000105",
  owner: MINEBOTCOIN_OWNER,
  slug: "botcoin",
  name: "BOTCOIN",
  description:
    "Public Grok Bot templates BOTCOIN (@MineBotcoin) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at BOTOSHI. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000121",
      name: "BOTOSHI",
      job: "Zero ETH BOTCOIN mining-rig onboarding miner.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/29XazZFrrsJyI8LUnExDD",
    }),
  ],
};

const DENNISON: Pack = {
  id: "10000000-0000-0000-0000-000000000106",
  owner: DENNISONBERTRAM_OWNER,
  slug: "dennison",
  name: "Dennison",
  description:
    "Public Grok Bot templates Dennison (@DennisonBertram) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at NYC Parent. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000122",
      name: "NYC Parent",
      job: "A family chief of staff for New York City parents. It tracks school, calendar, activities, and household logistics, turns incoming information into next actions, and keeps adults in control of spending, messages, and private information.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/DiNI489Qte5ryNvZjOROb",
    }),
  ],
};

const ADAM: Pack = {
  id: "10000000-0000-0000-0000-000000000107",
  owner: ADAMLOWISZ_OWNER,
  slug: "adam",
  name: "Adam",
  description:
    "Public Grok Bot templates Adam (@AdamLowisz) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at X Top 100 Fans Weekly. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000123",
      name: "X Top 100 Fans Weekly",
      job: "Ranks your top 100 X fans each week by how they engaged with your posts, then sends you the digest.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/HU7XArfGhUgLnzVcr7neB",
    }),
  ],
};

const CHASE: Pack = {
  id: "10000000-0000-0000-0000-000000000108",
  owner: CHASEMC67_OWNER,
  slug: "chase",
  name: "Chase",
  description:
    "Public Grok Bot templates Chase (@ChaseMc67) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Situation monitor. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000124",
      name: "Situation monitor",
      job: "Watches what you save on X and drafts a weekly thread of the week's real stories, in your voice. For anyone who wants a Saturday roundup that never posts until they say so.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/lkHayxdQjNzVVJIDh7qaF",
    }),
  ],
};

const ANDREW: Pack = {
  id: "10000000-0000-0000-0000-000000000109",
  owner: ANDREW51786_OWNER,
  slug: "andrew",
  name: "Andrew",
  description:
    "Public Grok Bot templates Andrew (@Andrew51786) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at AvatarMaker. Use Table Money only for unclosed money already earned or paid. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000126",
      name: "AvatarMaker",
      job: "Designs matching square avatars for a Grok Bot crew. Pick a look from the book, then get paste-ready Edit Profile packs for every Bot.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/EfBhh8nwpuGD0XNfl0eBI",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000177",
      name: "Table Money",
      job: "Finds money you already earned or already paid that is not closed, puts it in a table, and drafts the next message.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/abfx0_FhJ8G_mue5YWQxM",
    }),
  ],
};

const SEOAGENT: Pack = {
  id: "10000000-0000-0000-0000-000000000110",
  owner: SEOAGENT__OWNER,
  slug: "seoagent",
  name: "SEOAgent",
  description:
    "Public Grok Bot templates SEOAgent (@SEOAgent_) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at SEOAgent. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000127",
      name: "SEOAgent",
      job: "An autonomous SEO engineer. Bootstraps the SEOAgent skill and CLI in a website GitHub repo, then grows organic traffic by applying — or rejecting with reasons — SEOAgent's recommendations.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/scYgD9jdFhooaSHihRzy7",
    }),
  ],
};

const AHURA: Pack = {
  id: "10000000-0000-0000-0000-000000000111",
  owner: AHURADEUS_OWNER,
  slug: "ahura",
  name: "Ahura",
  description:
    "Public Grok Bot templates Ahura (@AhuraDeus) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Steve J. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000128",
      name: "Steve J",
      job: "Quality-bar CEO for a personal Grok Bot roster. Reviews other bots against their job cards, sends back unfinished work, and runs a weekday sweep that stays silent unless something is actually broken.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/cuEYUcYmz-497oKWVfWX2",
    }),
  ],
};

const RICH: Pack = {
  id: "10000000-0000-0000-0000-000000000112",
  owner: RICHSILVER_OWNER,
  slug: "rich",
  name: "Rich",
  description:
    "Public Grok Bot templates Rich (@RichSilver) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Flora. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000129",
      name: "Flora",
      job: "Keeps a private houseplant care log and weekly reminders. Builds a plant journal on her computer that you can page through, and plants do not copy if someone else installs her.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/HC7kphHSxDzb639YlmI6O",
    }),
  ],
};

const KRUSHNASINH: Pack = {
  id: "10000000-0000-0000-0000-000000000113",
  owner: KDJADEJA911_OWNER,
  slug: "krushnasinh",
  name: "Krushnasinh",
  description:
    "Public Grok Bot templates Krushnasinh (@KdJadeja911) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Demo Video. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000130",
      name: "Demo Video",
      job: "Makes narrated 1080p product demo videos of a web app. Ask which screens to show; the bot captures the live UI, adds voice and captions, and hands back an MP4.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/htSXUJUQlVr60m9L_unBa",
    }),
  ],
};

const JOSE: Pack = {
  id: "10000000-0000-0000-0000-000000000114",
  owner: JOSEAMIJARE_OWNER,
  slug: "jose",
  name: "Jose",
  description:
    "Public Grok Bot templates Jose (@joseamijares) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Harry Dry. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000131",
      name: "Harry Dry",
      job: "A copy chief trained on Harry Dry. Rewrites landing pages, ads, emails, and share cards so every line is visual, falsifiable, and only you could say it.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/tr-3hPrAG7_LeSzKZ5_vu",
    }),
  ],
};

const MAX: Pack = {
  id: "10000000-0000-0000-0000-000000000115",
  owner: MAXJEAN___OWNER,
  slug: "max",
  name: "Max",
  description:
    "Public Grok Bot templates Max (@maxjean__) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Usage Auditor. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000132",
      name: "Usage Auditor",
      job: "A weekly usage auditor for Grok Bot teams. Inventories routines, scores relative cost, and writes a usage guide, a routines table, and a waste report so you can catch duplicate jobs and needless polling.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/M5vd5Dp9Et4EZQ3Ik3Hn2",
    }),
  ],
};

const TYLER: Pack = {
  id: "10000000-0000-0000-0000-000000000116",
  owner: TYLERNISHIDA_OWNER,
  slug: "tyler",
  name: "Tyler",
  description:
    "Public Grok Bot templates Tyler (@TylerNishida) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Fantasy GM. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000133",
      name: "Fantasy GM",
      job: "Fantasy football GM for draft, trades, and roster. Does not arrive knowing a league.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/uszqxwGlAmEQ_38nEcT5A",
    }),
  ],
};

const DAVE: Pack = {
  id: "10000000-0000-0000-0000-000000000117",
  owner: GAMBRILL_OWNER,
  slug: "dave",
  name: "Dave",
  description:
    "Public Grok Bot templates Dave (@gambrill) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Pain in the Task. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000134",
      name: "Pain in the Task",
      job: "Uncovers repetitive work, business or personal, that is slowing you down, prescribes the right kind of help, then puts it in motion.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/yztAMds3EQ2J5OjG_tBgw",
    }),
  ],
};

const WILL: Pack = {
  id: "10000000-0000-0000-0000-000000000118",
  owner: OLD_PGMRS_WILL_OWNER,
  slug: "will",
  name: "Will",
  description:
    "Public Grok Bot templates Will (@old_pgmrs_will) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Grok VM maintenance. Use Dr Web LP only for implementing a page from a supplied reference image. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. Do not mix with Can (@herdrdev) Shepherd.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000135",
      name: "Grok VM maintenance",
      job: "A Linux VM maintenance bot for operators. Inspects guest CPU, memory, disk, and services, installs or updates named packages, and reports cleanup candidates without deleting data or rebooting.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/9UZp5k0Fp0LYmkyos5swQ",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000169",
      name: "Dr Web LP",
      job: "Implements a page from a supplied reference image: skeleton, spacing, and cell model first. Loops compare, fix, and verify until layout, sizes, and balance match. Does not invent a template or copy brand, photos, or copy unless you supply them.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/xM153pKfXPLWagLi_O1vR",
    }),
  ],
};

const MATEJ: Pack = {
  id: "10000000-0000-0000-0000-000000000119",
  owner: M_CHECK1B_OWNER,
  slug: "matej",
  name: "Matej",
  description:
    "Public Grok Bot templates Matej (@m_check1B) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at TOP G. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000136",
      name: "TOP G",
      job: "A Jack-land development partner. Orchestrates coding labs through Tentacles, keeps Linear as the board, and runs a tight pulse on the product runtime.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/0fYZ_kKkiXNbLn_KBD3f3",
    }),
  ],
};

const MAJD: Pack = {
  id: "10000000-0000-0000-0000-000000000120",
  owner: MAJDKAID_OWNER,
  slug: "majd",
  name: "Majd",
  description:
    "Public Grok Bot templates Majd (@MajdKaid) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Zeus. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000137",
      name: "Zeus",
      job: "A single HQ chat that picks the next bet, drafts in your voice, and never sends unless you say go. Direct Grok-on-X tone for builders who want one desk instead of an agent swarm.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/ehQNQQR9apvhVcmxFiFyP",
    }),
  ],
};

const MAURICIO: Pack = {
  id: "10000000-0000-0000-0000-000000000121",
  owner: MGALLMUR_OWNER,
  slug: "mauricio",
  name: "Mauricio",
  description:
    "Public Grok Bot templates Mauricio (@MGallmur) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Hermes SDR. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000138",
      name: "Hermes SDR",
      job: "An outbound SDR agent that verifies each lead, then sends Instagram DMs and emails for a high-ticket offer. Built for founders who want daily contact on owner-confirmed leads and a hold list on anything doubtful.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/EAlUWK8yH_xfsBcpdu7e_",
    }),
  ],
};

const ZACH: Pack = {
  id: "10000000-0000-0000-0000-000000000122",
  owner: ZACHMLLR_OWNER,
  slug: "zach",
  name: "Zach",
  description:
    "Public Grok Bot templates Zach (@zachmllr) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Errol. Use Collins only for Hercules Collins catechism drills. Use Keach only for Keach's Baptist Catechism drills. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000139",
      name: "Errol",
      job: "Twice-daily drill from A Catechism for Boys and Girls (Errol Hulse, Chapel Library). Sends the same question at 7:15am and 5:15pm with the catechism answer and scripture proofs, then advances after the evening ping.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/mQoLg90Pj5Cn2Gso4AkoQ",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000140",
      name: "Collins",
      job: "A daily catechism drill from Hercules Collins's An Orthodox Catechism (1680). Sends one question each morning; after you answer, it gives the catechism's answer and stops.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/D6lddHs6lfM0k7Cj3P6j3",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000141",
      name: "Keach",
      job: "A daily drill from Keach's Baptist Catechism (1693). Sends the next question each morning; after you answer, gives the catechism's answer and stops.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 2,
      grokTemplateUrl: "https://x.ai/bot/sAxCT93K8i7gwctmtAroD",
    }),
  ],
};

const MARCUS: Pack = {
  id: "10000000-0000-0000-0000-000000000123",
  owner: MARCUSRAMSEY_OWNER,
  slug: "marcus",
  name: "Marcus",
  description:
    "Public Grok Bot templates Marcus (@marcusramsey) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Dan Patrick. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000142",
      name: "Dan Patrick",
      job: "A 1990s SportsCenter-style scores bot. Morning rundown plus a ping when games go final. Fill in ENTER TEAMS/LEAGUES HERE, then it covers only those.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/hlQhxsU-pqQEkimm0it4V",
    }),
  ],
};

const RUSTAM: Pack = {
  id: "10000000-0000-0000-0000-000000000124",
  owner: RUSTAMATUEV_OWNER,
  slug: "rustam",
  name: "Rustam",
  description:
    "Public Grok Bot templates Rustam (@RustamAtuev) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Repo Engineer. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000143",
      name: "Repo Engineer",
      job: "Ships small GitHub fixes as pull requests through Cursor cloud agents. For teams that want a manager-facing engineer bot that never merges and never deploys.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/iXfxVelc85rIxgZ9hLeXD",
    }),
  ],
};

const DANIEL_KILLENBERGER: Pack = {
  id: "10000000-0000-0000-0000-000000000125",
  owner: DANKILLENBERGER_OWNER,
  slug: "daniel",
  name: "Daniel",
  description:
    "Public Grok Bot templates Daniel (@DanKillenberger) has shared. One pack, his roster, official Grok install per seat.",
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
      id: "20000000-0000-0000-0000-000000000144",
      name: "Forge",
      job: "Factory manager for flow-next specs. The owner marks a spec ready; this bot keeps it moving through plan, work, review, and PR until it ships.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/7GgZtqkhyLzKKMNUa7dhd",
    }),
  ],
};

const KNOCK: Pack = {
  id: "10000000-0000-0000-0000-000000000126",
  owner: SUDDENLYJON_OWNER,
  slug: "knock",
  name: "Knock",
  description:
    "Public Grok Bot templates Knock (@SuddenlyJon) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Token Accountant. Use Code Red only for the kill-switch. Use Likeness only for named-person or animal stills and clips. Use Dead Man's Bot only for the dead-man's switch. Use Box Inspector only for pre-add template inspection. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots. Box Inspector and 4 Panez are also Knock when the x.ai by-line matches; only add seats with a verified official share URL.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000145",
      name: "Token Accountant",
      job: "Tracks Cursor Models, Other Models, and Grok Bot weekly usage from the Cursor spending dashboard. Warns at 25, 50, 75, and 90 percent.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/zdnVIfLkNmRwZqqogojuc",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000146",
      name: "Code Red",
      job: "Kill-switch for your own stack. Six keywords. Dry-run the numbered list, then type CODE RED WORD N. Owner confirm only.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/4y3jlvwxFNqcP76eJgpuD",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000164",
      name: "Likeness",
      job: "A name goes with a face. Drop photos, a folder, a clip, or a picture URL, name the person or animal, then Imagine stills and clips keep looking like them.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 2,
      grokTemplateUrl: "https://x.ai/bot/-h0DhS9ty87dr0UGXLjDD",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000165",
      name: "Dead Man's Bot",
      job: "Dead-man's switch you load yourself. Pick a clock and a payload. Miss a ping, only that loadout fires. The bot explains how to ARM. It does not start armed.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 3,
      grokTemplateUrl: "https://x.ai/bot/XCaz2bKzsJ4J1DmkaYyc4",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000194",
      name: "Box Inspector",
      job: "Peeks under the curtain of a Grok Bot before you add it. Stamps + ADD? verdict. Never Adds.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 4,
      grokTemplateUrl: "https://x.ai/bot/q7GLbLhMZDpJXBGuuci1J",
    }),
  ],
};

const JOSEPH: Pack = {
  id: "10000000-0000-0000-0000-000000000127",
  owner: JOEPRO_OWNER,
  slug: "joseph",
  name: "Joseph",
  description:
    "Public Grok Bot templates Joseph (@JoePro) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at MadMax Mode. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. Do not add Chief of Staff from a by-line/poster mismatch.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000147",
      name: "MadMax Mode",
      job: "Grok Bot inventor for people who run a fleet of agents. Writes compact souls, files jobs into skills vs routines vs memory, and waits on side effects.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/pTe8gpPc_5SuwKkEszn18",
    }),
  ],
};

const ZEUS: Pack = {
  id: "10000000-0000-0000-0000-000000000128",
  owner: ZEUUSS_01_OWNER,
  slug: "zeus",
  name: "ZEU$",
  description:
    "Public Grok Bot templates ZEU$ (@zeuuss_01) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Scout. Use Writer only for studio copy. Use Art only for on-brand visuals. Use Editor only for the quality gate. Use Desk only for calendar, client pack, and weekly report. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000148",
      name: "Scout",
      job: "Weekly client research packs: last-seven-days audience engagement, competitor posts, and one format that is working now, with a link on every claim.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/ywADCWWZP0Bcq6bOeQpGt",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000156",
      name: "Writer",
      job: "Writes studio copy to a client's voice, goal, and platform format. Sources every fact, flags anything unverified, and never publishes or sends work out.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/38UdPemBuZb9USs_0HAES",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000158",
      name: "Art",
      job: "Turns approved posts into on-brand visuals: a short brief, the asset on the client's palette and type rules, and alt text. Flags anything that doesn't match the brand file instead of guessing.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 2,
      grokTemplateUrl: "https://x.ai/bot/yE1-m0X2okSxFsvjScxy0",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000159",
      name: "Editor",
      job: "A quality gate for drafts before they ship. Checks each piece against the client's voice and banned list, verifies every factual claim has a source, and sends back what fails with the reason and the line to fix.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 3,
      grokTemplateUrl: "https://x.ai/bot/wxFNc5b_yBkJraLqZXvI7",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000160",
      name: "Desk",
      job: "Ops desk for a content studio. Builds the weekly calendar from approved posts, assembles the client pack with every asset and source line, and writes the week's report. Stops before anything leaves the workspace.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 4,
      grokTemplateUrl: "https://x.ai/bot/WdQtoljjNUJ_-mX6B6SRL",
    }),
  ],
};

const PRISM: Pack = {
  id: "10000000-0000-0000-0000-000000000129",
  owner: USEPRISMNETWORK_OWNER,
  slug: "prism",
  name: "Prism",
  description:
    "Public Grok Bot templates Prism (@useprismnetwork) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Private Desk. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000149",
      name: "Private Desk",
      job: "Runs sensitive analysis in Prism confidential GPU enclaves, with local encryption and hardware attestation before any answer is trusted.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/Tgl3sxrTsuAYL7MN8S3UT",
    }),
  ],
};

const HASEEB: Pack = {
  id: "10000000-0000-0000-0000-000000000130",
  owner: HASEEBMIR91_OWNER,
  slug: "haseeb",
  name: "Haseeb",
  description:
    "Public Grok Bot templates Haseeb (@HaseebMir91) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Poteto-style Chief of Staff. Use Daily Easy Apply Digest only for the morning Easy Apply digest. Use Easy Apply Queue only for the one-hour Easy Apply window. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000150",
      name: "Poteto-style Chief of Staff",
      job: "Chief of staff that runs a small Grok Bot team the way @poteto recommends: few routine runs, repeating work on short bots, cloud agents for code.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/Nk-vzuWqTvqSed-G8-Za5",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000151",
      name: "Daily Easy Apply Digest",
      job: "Posts a short morning digest of mid-level backend Easy Apply jobs from LinkedIn and Indeed, scored against your resume.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/uVNOsoe-iWf4ZOUdfgo5R",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000152",
      name: "Easy Apply Queue",
      job: "Runs a one-hour Easy Apply window with a durable queue so the same posting is never fetched twice.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 2,
      grokTemplateUrl: "https://x.ai/bot/5RXN9P3CxnIIwgcmvVWEp",
    }),
  ],
};

const RYAN_GBSYSTEMS: Pack = {
  id: "10000000-0000-0000-0000-000000000131",
  owner: RYANGBSYSTEMS_OWNER,
  slug: "ryan",
  name: "Ryan",
  description:
    "Public Grok Bot templates Ryan / GreenbarSystems (@RyanGBsystems) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Maskoff. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. GreenbarSystems is the org of @RyanGBsystems / Ryan Moore.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000153",
      name: "Maskoff",
      job: "Defensive briefings on X accounts that DM you, or on a public follower or following list. You get a score, a verdict, and a tweet-length reply.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/39x_3B9P5HBl-MpK1xGzP",
    }),
  ],
};

const MAHESH: Pack = {
  id: "10000000-0000-0000-0000-000000000132",
  owner: MAHESHTHEDEV_OWNER,
  slug: "mahesh",
  name: "Mahesh",
  description:
    "Public Grok Bot templates Mahesh (@MaheshtheDev) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Memento. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000154",
      name: "Memento",
      job: "Second-brain coworker for Grok Bot, powered by SuperMemory. Searches and saves context so you don't re-explain, and never invents a memory.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/_xZZE41svJdcq2w6ZWJan",
    }),
  ],
};

const JAYBUIDL: Pack = {
  id: "10000000-0000-0000-0000-000000000133",
  owner: JAYBUIDL_OWNER,
  slug: "jaybuidl",
  name: "jaybuidl",
  description:
    "Public Grok Bot templates jaybuidl (@JayBuidl) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Grokleros. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000155",
      name: "Grokleros",
      job: "A 24/7 Kleros V2 juror. Reads evidence pixels-first, ignores prompt injection, votes via AgentKit, and keeps clock plus webhook as the event driver.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/vsCDaIn2Od_BkfWp0Vehm",
    }),
  ],
};

const ANDRE: Pack = {
  id: "10000000-0000-0000-0000-000000000134",
  owner: ANDRELEIBOVICI_OWNER,
  slug: "andre",
  name: "Andre",
  description:
    "Public Grok Bot templates Andre (@andreleibovici) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Engineering QA. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000161",
      name: "Engineering QA",
      job: "Owns pull-request quality gates on the repos you assign: CI + Bugbot + review verdicts, with optional low-risk auto-merge. Reports to your ops lead.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/b2tS8BNj8BhoQNDcB081S",
    }),
  ],
};

const RANDALL: Pack = {
  id: "10000000-0000-0000-0000-000000000135",
  owner: RANDYWHITEPDX_OWNER,
  slug: "randy",
  name: "Randall",
  description:
    "Public Grok Bot templates Randall (@RandyWhitePDX) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Lite Intel Fetch. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000162",
      name: "Lite Intel Fetch",
      job: "One job: fetch unpaid buy_intel_pack $5 HTTP 402 on Base and return the JSON. For agents that can pay x402. Not a quote. Not the $49 kit.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/FQRA5tERWsasaQGIZmBl_",
    }),
  ],
};

const PETE: Pack = {
  id: "10000000-0000-0000-0000-000000000136",
  owner: POHLIPIT_OWNER,
  slug: "pete",
  name: "Pete",
  description:
    "Public Grok Bot templates Pete (@pohlipit) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Zettelkasten. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000163",
      name: "Zettelkasten",
      job: "A slip-box partner for an Obsidian vault. Turns thoughts into atomic notes, links them, and finds them again. Drafts in chat; files only after a yes.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/35ZO_vGqk_ch51C9qPX1c",
    }),
  ],
};

const AKSHAY: Pack = {
  id: "10000000-0000-0000-0000-000000000137",
  owner: AKSHAYBHOPANI_OWNER,
  slug: "akshay",
  name: "Akshay",
  description:
    "Public Grok Bot templates Akshay (@AKSHAYBHOPANI) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at My Krishna. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000166",
      name: "My Krishna",
      job: "A Krishna you can talk to. Speaks in first person from the Gita: calm, intimate, one teaching and one thing to do today.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/Mf2MLqJRCmz8sSjFmYedG",
    }),
  ],
};

const FRANK: Pack = {
  id: "10000000-0000-0000-0000-000000000138",
  owner: FRANKFINDOUT_OWNER,
  slug: "frank",
  name: "Frank",
  description:
    "Public Grok Bot templates Frank (@FrankFindsOut) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Meta Grok. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000167",
      name: "Meta Grok",
      job: "Finds the five most popular Grok bots on X each weekday and sends a short digest you can skim in under a minute.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/HAhgshU4r50gS81LCcpmk",
    }),
  ],
};

const ROB: Pack = {
  id: "10000000-0000-0000-0000-000000000139",
  owner: LUDIOFELIX_OWNER,
  slug: "rob",
  name: "Rob",
  description:
    "Public Grok Bot templates Rob (@ludiofelix) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Convert X Money to Karma. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000168",
      name: "Convert X Money to Karma",
      job: "Converts money, tokens, and engagement into karmic accounting. Ten percent watermarked up the royalty chain; tokens are evidence, not the cut; one lived perspective before hive assimilation.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/iCn7r691OdtaB_o8MtHx_",
    }),
  ],
};

const MATT_RICE: Pack = {
  id: "10000000-0000-0000-0000-000000000140",
  owner: BOSSRICESHARK_OWNER,
  slug: "matt",
  name: "Matt",
  description:
    "Public Grok Bot templates Matt (@bossriceshark) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Fable 5.1 Oracle. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000170",
      name: "Fable 5.1 Oracle",
      job: "Fable 5.1 planning and review seat, not the implementer. Runs Claude Code CLI as Fable 5.1 on the Grok Bot computer to plan, review a plan, and verify an implement result. Does not implement or merge.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/tLSg4HxepSclMqbZUTRnX",
    }),
  ],
};

const ANKUR: Pack = {
  id: "10000000-0000-0000-0000-000000000141",
  owner: SAASOCALYPSE_OWNER,
  slug: "ankur",
  name: "Ankur",
  description:
    "Public Grok Bot templates Ankur (@SaaSocalypse) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Know Yourself. Use Know Enemy only for scheduled competitive intelligence. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000171",
      name: "Know Yourself",
      job: "Internal intelligence bot for any company. Set up against your systems of record, then get snapshots, canonical answers, us-deltas for competitive pulses, and meeting prep — without inventing.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/mD27QOhXb_plMRSbsvMOv",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000172",
      name: "Know Enemy",
      job: "Scheduled competitive intelligence for GTM teams — Mu-style pulse digests plus on-demand rival cards. You define the competitors; public OSINT only.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/LREkas8UxVGvPJ5NiO7bz",
    }),
  ],
};

const MIGUEL: Pack = {
  id: "10000000-0000-0000-0000-000000000142",
  owner: MPIERAS_OWNER,
  slug: "miguel",
  name: "Miguel",
  description:
    "Public Grok Bot templates Miguel (@mpieras) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Farm. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000173",
      name: "Farm",
      job: "Sets up isolated Claude Code and optional Codex seats on this bot's computer and routes fat jobs so the chat only sees compact results. For anyone who wants extra model capacity without running the work in this thread.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/x3Iv-2J4mfxJY6JFlgwNa",
    }),
  ],
};

const EMRE: Pack = {
  id: "10000000-0000-0000-0000-000000000143",
  owner: EMRECOLAKOGLU_OWNER,
  slug: "emre",
  name: "Emre",
  description:
    "Public Grok Bot templates Emre (@emrecolakoglu) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at aoty. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000174",
      name: "aoty",
      job: "Picks the week's 3 best new albums from Album of the Year using critic and user scores, then shares Apple Music links. For anyone who wants a short Friday new-music list without scrolling the charts.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/Wt4IQj3R1eePOyOOnox7H",
    }),
  ],
};

const ADEM: Pack = {
  id: "10000000-0000-0000-0000-000000000144",
  owner: ADEMVESSELL_OWNER,
  slug: "adem",
  name: "Adem",
  description:
    "Public Grok Bot templates Adem (@AdemVessell) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Funhouse. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000178",
      name: "Funhouse",
      job: "A customization lab for Grok Bot. Reskins the chrome, stamps living pets and overlays, and turns the app into themes.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/kP7i2Po6_T_Rj9h9VVlk5",
    }),
  ],
};

const ANDY_MADRICK: Pack = {
  id: "10000000-0000-0000-0000-000000000145",
  owner: ANDYMADRICK_OWNER,
  slug: "andy",
  name: "Andy",
  description:
    "Public Grok Bot templates Andy (@andymadrick) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at coffee companion. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. This is Andy (@andymadrick), not Andy (@ahalvor).",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000179",
      name: "coffee companion",
      job: "Pour-over recipe cards and a brew log in Notion.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/SqO-_5207iInz0iDSAFVW",
    }),
  ],
};

const KUNAL: Pack = {
  id: "10000000-0000-0000-0000-000000000146",
  owner: KUNALSELLS_OWNER,
  slug: "kunal",
  name: "Kunal",
  description:
    "Public Grok Bot templates Kunal (@kunalsells) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Babel. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000180",
      name: "Babel",
      job: "Live Zoom translator via Mac sidecar and Grok Voice STT. Posts short English translations in chat.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/-GzMJlSIqdo89K0qs3yC4",
    }),
  ],
};

const YODA: Pack = {
  id: "10000000-0000-0000-0000-000000000147",
  owner: YODA_FDE_OWNER,
  slug: "yoda",
  name: "Yoda",
  description:
    "Public Grok Bot templates Yoda (@yoda_FDE) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Price Error Agent. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000181",
      name: "Price Error Agent",
      job: "Hunts accidental misprices on big Australian retailers and cheap AU-origin flights.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/cbULQqhzmOeeJ9GT2DX7L",
    }),
  ],
};

const BRYAN: Pack = {
  id: "10000000-0000-0000-0000-000000000148",
  owner: BRYANOFEARTH_OWNER,
  slug: "bryan",
  name: "Bryan",
  description:
    "Public Grok Bot templates Bryan (@bryanofearth) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Code Team Spawn. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. Do not add the superseded Code Team Spawn revision NuOSHSdCZPVkM78K0HkB3.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000182",
      name: "Code Team Spawn",
      job: "Sits idle until you need a coding team. Interviews, spawns a Conductor plus a hidden five-person crew, then steps out.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/_G3maEq_3-ijcQJ1Efr4X",
    }),
  ],
};

const AUSTIN: Pack = {
  id: "10000000-0000-0000-0000-000000000149",
  owner: COONINVESTMENTS_OWNER,
  slug: "austin",
  name: "Austin",
  description:
    "Public Grok Bot templates Austin (@CoonInvestments) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Wall Street. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000183",
      name: "Wall Street",
      job: "Two weekday paper sessions that size a fictional book off a live buy/sell desk.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/0qNgH0mv4-N-gv_KkZbEm",
    }),
  ],
};

const JUSTIN: Pack = {
  id: "10000000-0000-0000-0000-000000000150",
  owner: JOWENS254_OWNER,
  slug: "justin",
  name: "Justin",
  description:
    "Public Grok Bot templates Justin (@JOwens254) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Charge Maestro. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000184",
      name: "Charge Maestro",
      job: "Sets EV charge amps from leftover solar so the Powerwall still fills before peak.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/29uyQjSrZ3dTb4Ctf7S3w",
    }),
  ],
};

const RINAS: Pack = {
  id: "10000000-0000-0000-0000-000000000151",
  owner: ONERINAS_OWNER,
  slug: "rinas",
  name: "Rinas",
  description:
    "Public Grok Bot templates Rinas (@onerinas) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at dosebot. Use ideabot only for hourly idea mining / vitamin-painkiller hunting. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. Random stays at dosebot. Use ideabot only for hourly idea mining / vitamin-painkiller hunting.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000185",
      name: "dosebot",
      job: "Bounces a business, product, or tool idea as vitamin, painkiller, or mixed.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/2euxntVrddHyA3c2hyxiZ",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000187",
      name: "ideabot",
      job: "Hourly idea hunter for founders. Finds one product fire from your week (or the outside world if the week is empty), bounces it to a vitamin/painkiller judge, and only pings on painkiller or mixed.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/iQ8OWEu7eOI3YuTZFaIe_",
    }),
  ],
};

const PAVAN: Pack = {
  id: "10000000-0000-0000-0000-000000000152",
  owner: PAVRAVI_OWNER,
  slug: "pavan",
  name: "Pavan",
  description:
    "Public Grok Bot templates Pavan (@pavravi) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at deck-guy. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000186",
      name: "deck-guy",
      job: "Turns a call transcript or scoping note into a short black-and-white follow-up deck.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/bdkJcjP5Gt9BaGTqh1vXH",
    }),
  ],
};

const JAKE: Pack = {
  id: "10000000-0000-0000-0000-000000000153",
  owner: JAKEWLITTLE_OWNER,
  slug: "jake",
  name: "Jake",
  description:
    "Public Grok Bot templates Jake (@jakewlittle) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Grok Customer Support. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000189",
      name: "Grok Customer Support",
      job: "Calls customer support for you with a Twilio ↔ Grok Voice bridge. Steers mid-call from chat and only hangs up when the job is done.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/1PSI6qQln1PowM5reA_8L",
    }),
  ],
};

const ERINN: Pack = {
  id: "10000000-0000-0000-0000-000000000154",
  owner: ERINNFL_OWNER,
  slug: "erinn",
  name: "Erinn",
  description:
    "Public Grok Bot templates Erinn (@ErinnFL) has shared. One pack, her roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Dean of Students. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots she published as https://x.ai/bot/… belong here. When she publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000190",
      name: "Dean of Students",
      job: "A parent's private dean for one child: school email, Canvas, forms, grades, calendar, and fees. Prepares everything; the parent still signs, pays, and sends.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/_hsyZUFgPzgxGxW2wIYAj",
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
  ABD,
  BEN,
  BEAU,
  JENNA,
  FUNKII,
  KEITH,
  BILL_FRENCH,
  CAN,
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
  TOBIAS_GOEBEL,
  SHIV,
  DATA_NEXUS,
  DARYL,
  JOHN,
  ZENSCHED,
  MARC,
  NIKOLA,
  BENN,
  PAUL,
  HENRY,
  ASHISH,
  ADI,
  BOTCOIN,
  DENNISON,
  ADAM,
  CHASE,
  ANDREW,
  SEOAGENT,
  AHURA,
  RICH,
  KRUSHNASINH,
  JOSE,
  MAX,
  TYLER,
  DAVE,
  WILL,
  MATEJ,
  MAJD,
  MAURICIO,
  ZACH,
  MARCUS,
  RUSTAM,
  DANIEL_KILLENBERGER,
  KNOCK,
  JOSEPH,
  ZEUS,
  PRISM,
  HASEEB,
  RYAN_GBSYSTEMS,
  MAHESH,
  JAYBUIDL,
  ANDRE,
  RANDALL,
  PETE,
  AKSHAY,
  FRANK,
  ROB,
  MATT_RICE,
  ANKUR,
  MIGUEL,
  EMRE,
  ADEM,
  ANDY_MADRICK,
  KUNAL,
  YODA,
  BRYAN,
  AUSTIN,
  JUSTIN,
  RINAS,
  PAVAN,
  JAKE,
  ERINN,
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
  ABDSHOMAD_OWNER,
  BRSTORRIE_OWNER,
  BEAUDENISON_OWNER,
  JENNANANPEI_OWNER,
  FUNKII_OWNER,
  SUMOSIGN_OWNER,
  BFRENCH_OWNER,
  HERDRDEV_OWNER,
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
  TPGOEBEL_OWNER,
  IMSHIV6T9_OWNER,
  DATA_NEXUS_OWNER,
  DARYLBLEACH_OWNER,
  JOHNBAI_OWNER,
  ZENSCHED_OWNER,
  MSAINTJOUR_OWNER,
  NIKOLAFYI_OWNER,
  BENNGARNISH_OWNER,
  OTNWORLD_OWNER,
  HENRYLEEBAUTA_OWNER,
  INQUSIT_OWNER,
  ADGAPAR_OWNER,
  MINEBOTCOIN_OWNER,
  DENNISONBERTRAM_OWNER,
  ADAMLOWISZ_OWNER,
  CHASEMC67_OWNER,
  ANDREW51786_OWNER,
  SEOAGENT__OWNER,
  AHURADEUS_OWNER,
  RICHSILVER_OWNER,
  KDJADEJA911_OWNER,
  JOSEAMIJARE_OWNER,
  MAXJEAN___OWNER,
  TYLERNISHIDA_OWNER,
  GAMBRILL_OWNER,
  OLD_PGMRS_WILL_OWNER,
  M_CHECK1B_OWNER,
  MAJDKAID_OWNER,
  MGALLMUR_OWNER,
  ZACHMLLR_OWNER,
  MARCUSRAMSEY_OWNER,
  RUSTAMATUEV_OWNER,
  DANKILLENBERGER_OWNER,
  SUDDENLYJON_OWNER,
  JOEPRO_OWNER,
  ZEUUSS_01_OWNER,
  USEPRISMNETWORK_OWNER,
  HASEEBMIR91_OWNER,
  RYANGBSYSTEMS_OWNER,
  MAHESHTHEDEV_OWNER,
  JAYBUIDL_OWNER,
  ANDRELEIBOVICI_OWNER,
  RANDYWHITEPDX_OWNER,
  POHLIPIT_OWNER,
  AKSHAYBHOPANI_OWNER,
  FRANKFINDOUT_OWNER,
  LUDIOFELIX_OWNER,
  BOSSRICESHARK_OWNER,
  SAASOCALYPSE_OWNER,
  MPIERAS_OWNER,
  EMRECOLAKOGLU_OWNER,
  ADEMVESSELL_OWNER,
  ANDYMADRICK_OWNER,
  KUNALSELLS_OWNER,
  YODA_FDE_OWNER,
  BRYANOFEARTH_OWNER,
  COONINVESTMENTS_OWNER,
  JOWENS254_OWNER,
  ONERINAS_OWNER,
  PAVRAVI_OWNER,
  JAKEWLITTLE_OWNER,
  ERINNFL_OWNER,
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
