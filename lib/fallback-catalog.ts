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
const EVSLATTS_OWNER_ID = "00000000-0000-0000-0000-000000000147";
const KINGAO476942_OWNER_ID = "00000000-0000-0000-0000-000000000148";
const SHAHRULESTAR_OWNER_ID = "00000000-0000-0000-0000-000000000149";
const ORTIX008_OWNER_ID = "00000000-0000-0000-0000-000000000150";
const KAMKOM05_OWNER_ID = "00000000-0000-0000-0000-000000000151";
const UZIOBI_OWNER_ID = "00000000-0000-0000-0000-000000000152";
const KELSEYSHUO_OWNER_ID = "00000000-0000-0000-0000-000000000153";
const MARULIMOAI_OWNER_ID = "00000000-0000-0000-0000-000000000154";
const RUSSBROOMELL_OWNER_ID = "00000000-0000-0000-0000-000000000155";
const ERICOSIU_OWNER_ID = "00000000-0000-0000-0000-000000000156";
const TFERRIERE_OWNER_ID = "00000000-0000-0000-0000-000000000157";
const TWOBITJUSTIN_OWNER_ID = "00000000-0000-0000-0000-000000000158";
const FERMINRP_OWNER_ID = "00000000-0000-0000-0000-000000000159";
const FOUR_SIMONSAYS_OWNER_ID = "00000000-0000-0000-0000-000000000160";
const VOELIZ_OWNER_ID = "00000000-0000-0000-0000-000000000161";
const MITCHTILER_OWNER_ID = "00000000-0000-0000-0000-000000000162";
const PHIL_HOLLAND_OWNER_ID = "00000000-0000-0000-0000-000000000163";
const BLISSNOMAD_OWNER_ID = "00000000-0000-0000-0000-000000000164";
const DRBINARYAI_OWNER_ID = "00000000-0000-0000-0000-000000000165";
const THE_DAVEY_OWNER_ID = "00000000-0000-0000-0000-000000000166";
const JAIMEBUBBLEHEAD_OWNER_ID = "00000000-0000-0000-0000-000000000167";
const COMPILEINSTYLE_OWNER_ID = "00000000-0000-0000-0000-000000000168";
const ADVENTURENLEARN_OWNER_ID = "00000000-0000-0000-0000-000000000169";
const BBBANG9900_OWNER_ID = "00000000-0000-0000-0000-000000000170";
const REALMATTABRAMS_OWNER_ID = "00000000-0000-0000-0000-000000000171";
const S_PADIVAL_OWNER_ID = "00000000-0000-0000-0000-000000000172";
const BACONBRIX_OWNER_ID = "00000000-0000-0000-0000-000000000173";
const JAHARRIS13_OWNER_ID = "00000000-0000-0000-0000-000000000174";
const MATTYP_OWNER_ID = "00000000-0000-0000-0000-000000000175";
const HELLOITSOCTOCAT_OWNER_ID = "00000000-0000-0000-0000-000000000176";
const AROOGLE_OWNER_ID = "00000000-0000-0000-0000-000000000177";
const JINGG_N_TONIC_OWNER_ID = "00000000-0000-0000-0000-000000000178";
const REDSPICEX_OWNER_ID = "00000000-0000-0000-0000-000000000179";
const SERGICAL_OWNER_ID = "00000000-0000-0000-0000-000000000180";
const OMNI_PUZZLER_OWNER_ID = "00000000-0000-0000-0000-000000000181";
const MICHAELHEREDIA_OWNER_ID = "00000000-0000-0000-0000-000000000182";
const YANQINGCHENG_OWNER_ID = "00000000-0000-0000-0000-000000000183";
const DANCINGTEETH_OWNER_ID = "00000000-0000-0000-0000-000000000184";
const ZILVESTRO_OWNER_ID = "00000000-0000-0000-0000-000000000185";
const BTC_YOGI_OWNER_ID = "00000000-0000-0000-0000-000000000186";
const DAISUKE_OWNER_ID = "00000000-0000-0000-0000-000000000187";
const SNEHARAVINDRA_OWNER_ID = "00000000-0000-0000-0000-000000000188";
const LITTLETECHBIRD_OWNER_ID = "00000000-0000-0000-0000-000000000189";
const SAMUELFLG1_OWNER_ID = "00000000-0000-0000-0000-000000000190";
const PARKERSMITH_OWNER_ID = "00000000-0000-0000-0000-000000000191";
const QUOTEWISER_OWNER_ID = "00000000-0000-0000-0000-000000000192";
const JAMES_AILTON_OWNER_ID = "00000000-0000-0000-0000-000000000193";
const IRABUKHT_OWNER_ID = "00000000-0000-0000-0000-000000000194";
const CHIEFBEERS_OWNER_ID = "00000000-0000-0000-0000-000000000195";
const NATHANGLASS_OWNER_ID = "00000000-0000-0000-0000-000000000196";
const STEVEDERICO_OWNER_ID = "00000000-0000-0000-0000-000000000197";
const TOBIASZTOP_OWNER_ID = "00000000-0000-0000-0000-000000000198";
const MDASHJAMES_OWNER_ID = "00000000-0000-0000-0000-000000000199";
const RMARWAH_OWNER_ID = "00000000-0000-0000-0000-000000000200";
const AETANEORIZAL_OWNER_ID = "00000000-0000-0000-0000-000000000201";
const MAPACHESALEXIS_OWNER_ID = "00000000-0000-0000-0000-000000000202";
const FERMION_BOSON17_OWNER_ID = "00000000-0000-0000-0000-000000000203";
const X_STONE_ISLAND_OWNER_ID = "00000000-0000-0000-0000-000000000204";
const JEFFREYLIND_OWNER_ID = "00000000-0000-0000-0000-000000000205";
const SKYLER_MILLER56_OWNER_ID = "00000000-0000-0000-0000-000000000206";
const TOATSPACE_OWNER_ID = "00000000-0000-0000-0000-000000000207";
const OXASHRK_OWNER_ID = "00000000-0000-0000-0000-000000000208";
const MADMENAI_OWNER_ID = "00000000-0000-0000-0000-000000000209";
const SETHSALER_OWNER_ID = "00000000-0000-0000-0000-000000000210";
const OCCUPYMARS___OWNER_ID = "00000000-0000-0000-0000-000000000211";
const SHEHJADTAUS_OWNER_ID = "00000000-0000-0000-0000-000000000212";
const GEZEEQ_OWNER_ID = "00000000-0000-0000-0000-000000000213";
const ASHVINN_OWNER_ID = "00000000-0000-0000-0000-000000000214";
const TOMIDELU__OWNER_ID = "00000000-0000-0000-0000-000000000215";
const CARBONTHECODER_OWNER_ID = "00000000-0000-0000-0000-000000000216";
const IMOHITMAYANK_OWNER_ID = "00000000-0000-0000-0000-000000000217";
const VALSTRY_OWNER_ID = "00000000-0000-0000-0000-000000000218";
const GABRIELEMONNI_OWNER_ID = "00000000-0000-0000-0000-000000000219";
const AARONINFINITEA_OWNER_ID = "00000000-0000-0000-0000-000000000220";
const TEXASBASEDGPA_OWNER_ID = "00000000-0000-0000-0000-000000000221";
const MRFLMNLNFT_OWNER_ID = "00000000-0000-0000-0000-000000000222";
const BKASHJOSI_OWNER_ID = "00000000-0000-0000-0000-000000000223";
const VOIDVEXA_OWNER_ID = "00000000-0000-0000-0000-000000000224";
const CGNOT996_OWNER_ID = "00000000-0000-0000-0000-000000000225";
const LEECHAEL_OWNER_ID = "00000000-0000-0000-0000-000000000226";
const OMNITHNKR_OWNER_ID = "00000000-0000-0000-0000-000000000227";
const MATTVAGNI_OWNER_ID = "00000000-0000-0000-0000-000000000228";
const DOMENICFOTINO_OWNER_ID = "00000000-0000-0000-0000-000000000229";
const IM_USAMAKHALID_OWNER_ID = "00000000-0000-0000-0000-000000000230";
const FWHITTINGTON_24_OWNER_ID = "00000000-0000-0000-0000-000000000231";
const COLINMCDERMOTT_OWNER_ID = "00000000-0000-0000-0000-000000000232";
const REALJBMANGUM_OWNER_ID = "00000000-0000-0000-0000-000000000233";
const SAMLAMBERT_OWNER_ID = "00000000-0000-0000-0000-000000000234";
const FRANCOE114696_OWNER_ID = "00000000-0000-0000-0000-000000000235";
const LEINGOEDBLOED_OWNER_ID = "00000000-0000-0000-0000-000000000236";
const BCORNTEXAS_OWNER_ID = "00000000-0000-0000-0000-000000000237";
const VALENGIULIMOR_OWNER_ID = "00000000-0000-0000-0000-000000000238";
const IGGYNORE_OWNER_ID = "00000000-0000-0000-0000-000000000239";
const BWILSON_OWNER_ID = "00000000-0000-0000-0000-000000000240";
const MRBEKO__OWNER_ID = "00000000-0000-0000-0000-000000000241";
const BENXLAB_OWNER_ID = "00000000-0000-0000-0000-000000000242";
const KUNCHENGUID_OWNER_ID = "00000000-0000-0000-0000-000000000243";
const HUDCOS_OWNER_ID = "00000000-0000-0000-0000-000000000244";
const ALEXHAWAT_OWNER_ID = "00000000-0000-0000-0000-000000000245";
const TRUEVIS_OWNER_ID = "00000000-0000-0000-0000-000000000246";
const SAM_BUILDS_AI_OWNER_ID = "00000000-0000-0000-0000-000000000247";
const DIEGOARMANDOAD_OWNER_ID = "00000000-0000-0000-0000-000000000248";
const KENASHE_OWNER_ID = "00000000-0000-0000-0000-000000000249";
const CHUCKH__OWNER_ID = "00000000-0000-0000-0000-000000000250";
const NYMBLEPAY_OWNER_ID = "00000000-0000-0000-0000-000000000251";
const ADAMDESGNS_OWNER_ID = "00000000-0000-0000-0000-000000000252";
const GREGRAINBOLT_OWNER_ID = "00000000-0000-0000-0000-000000000253";
const MERIRAND_OWNER_ID = "00000000-0000-0000-0000-000000000254";
const MYKE86D_OWNER_ID = "00000000-0000-0000-0000-000000000255";
const VAIBHAVHOME_OWNER_ID = "00000000-0000-0000-0000-000000000256";
const SUPERTOST100_OWNER_ID = "00000000-0000-0000-0000-000000000257";
const PRCSHXNT_OWNER_ID = "00000000-0000-0000-0000-000000000258";
const LORENZKRINNER_OWNER_ID = "00000000-0000-0000-0000-000000000259";
const DEADBOYEZRA_OWNER_ID = "00000000-0000-0000-0000-000000000260";
const HOVINTHENORTH_OWNER_ID = "00000000-0000-0000-0000-000000000261";

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

const EVSLATTS_OWNER: Profile = {
  id: EVSLATTS_OWNER_ID,
  githubLogin: "EvSlatts",
  name: "Slatts",
  avatarUrl: null,
  xHandle: "EvSlatts",
};

const KINGAO476942_OWNER: Profile = {
  id: KINGAO476942_OWNER_ID,
  githubLogin: "KinGao476942",
  name: "Kin",
  avatarUrl: null,
  xHandle: "KinGao476942",
};

const SHAHRULESTAR_OWNER: Profile = {
  id: SHAHRULESTAR_OWNER_ID,
  githubLogin: "shahrulestar",
  name: "Shahrul",
  avatarUrl: null,
  xHandle: "shahrulestar",
};

const ORTIX008_OWNER: Profile = {
  id: ORTIX008_OWNER_ID,
  githubLogin: "Ortix008",
  name: "XO",
  avatarUrl: null,
  xHandle: "Ortix008",
};

const KAMKOM05_OWNER: Profile = {
  id: KAMKOM05_OWNER_ID,
  githubLogin: "Kamkom05",
  name: "Younes Aberkane",
  avatarUrl: null,
  xHandle: "Kamkom05",
};

const UZIOBI_OWNER: Profile = {
  id: UZIOBI_OWNER_ID,
  githubLogin: "UziObi",
  name: "Uzi Obi",
  avatarUrl: null,
  xHandle: "UziObi",
};

const KELSEYSHUO_OWNER: Profile = {
  id: KELSEYSHUO_OWNER_ID,
  githubLogin: "Kelseyshuo",
  name: "Kelsey",
  avatarUrl: null,
  xHandle: "Kelseyshuo",
};

const MARULIMOAI_OWNER: Profile = {
  id: MARULIMOAI_OWNER_ID,
  githubLogin: "marulimoai",
  name: "まるぃも",
  avatarUrl: null,
  xHandle: "marulimoai",
};

const RUSSBROOMELL_OWNER: Profile = {
  id: RUSSBROOMELL_OWNER_ID,
  githubLogin: "russbroomell",
  name: "Russ Broomell",
  avatarUrl: null,
  xHandle: "russbroomell",
};

const ERICOSIU_OWNER: Profile = {
  id: ERICOSIU_OWNER_ID,
  githubLogin: "ericosiu",
  name: "Eric Osiu",
  avatarUrl: null,
  xHandle: "ericosiu",
};

const TFERRIERE_OWNER: Profile = {
  id: TFERRIERE_OWNER_ID,
  githubLogin: "tferriere",
  name: "Thomas",
  avatarUrl: null,
  xHandle: "Tferriere",
};

const TWOBITJUSTIN_OWNER: Profile = {
  id: TWOBITJUSTIN_OWNER_ID,
  githubLogin: "TwoBitJustin",
  name: "Justin Chen",
  avatarUrl: null,
  xHandle: "TwoBitJustin",
};

const FERMINRP_OWNER: Profile = {
  id: FERMINRP_OWNER_ID,
  githubLogin: "ferminrp",
  name: "Fermin Rodriguez Penelas",
  avatarUrl: null,
  xHandle: "ferminrp",
};

const FOUR_SIMONSAYS_OWNER: Profile = {
  id: FOUR_SIMONSAYS_OWNER_ID,
  githubLogin: "4SimonSays",
  name: "Simon",
  avatarUrl: null,
  xHandle: "4SimonSays",
};

const VOELIZ_OWNER: Profile = {
  id: VOELIZ_OWNER_ID,
  githubLogin: "voeliz",
  name: "Liz Voeller",
  avatarUrl: null,
  xHandle: "voeliz",
};

const MITCHTILER_OWNER: Profile = {
  id: MITCHTILER_OWNER_ID,
  githubLogin: "MitchTiler",
  name: "Tyler Thompson",
  avatarUrl: null,
  xHandle: "MitchTiler",
};

const PHIL_HOLLAND_OWNER: Profile = {
  id: PHIL_HOLLAND_OWNER_ID,
  githubLogin: "Phil_Holland",
  name: "Phil",
  avatarUrl: null,
  xHandle: "Phil_Holland",
};

const BLISSNOMAD_OWNER: Profile = {
  id: BLISSNOMAD_OWNER_ID,
  githubLogin: "BlissNomad",
  name: "Graham",
  avatarUrl: null,
  xHandle: "BlissNomad",
};

const DRBINARYAI_OWNER: Profile = {
  id: DRBINARYAI_OWNER_ID,
  githubLogin: "drbinaryai",
  name: "Deepbits",
  avatarUrl: null,
  xHandle: "drbinaryai",
};

const THE_DAVEY_OWNER: Profile = {
  id: THE_DAVEY_OWNER_ID,
  githubLogin: "the_davey",
  name: "Dave",
  avatarUrl: null,
  xHandle: "the_davey",
};

const JAIMEBUBBLEHEAD_OWNER: Profile = {
  id: JAIMEBUBBLEHEAD_OWNER_ID,
  githubLogin: "JaimeBubblehead",
  name: "Jaime",
  avatarUrl: null,
  xHandle: "JaimeBubblehead",
};

const COMPILEINSTYLE_OWNER: Profile = {
  id: COMPILEINSTYLE_OWNER_ID,
  githubLogin: "compileinstyle",
  name: "Neessam",
  avatarUrl: null,
  xHandle: "compileinstyle",
};

const ADVENTURENLEARN_OWNER: Profile = {
  id: ADVENTURENLEARN_OWNER_ID,
  githubLogin: "AdventureNLearn",
  name: "AdventureNLearn",
  avatarUrl: null,
  xHandle: "AdventureNLearn",
};

const BBBANG9900_OWNER: Profile = {
  id: BBBANG9900_OWNER_ID,
  githubLogin: "BBBang9900",
  name: "BBBang",
  avatarUrl: null,
  xHandle: "BBBang9900",
};

const REALMATTABRAMS_OWNER: Profile = {
  id: REALMATTABRAMS_OWNER_ID,
  githubLogin: "realMattAbrams",
  name: "Matt",
  avatarUrl: null,
  xHandle: "realMattAbrams",
};

const S_PADIVAL_OWNER: Profile = {
  id: S_PADIVAL_OWNER_ID,
  githubLogin: "S_Padival",
  name: "S Padival",
  avatarUrl: null,
  xHandle: "S_Padival",
};

const BACONBRIX_OWNER: Profile = {
  id: BACONBRIX_OWNER_ID,
  githubLogin: "Baconbrix",
  name: "Evan",
  avatarUrl: null,
  xHandle: "Baconbrix",
};

const JAHARRIS13_OWNER: Profile = {
  id: JAHARRIS13_OWNER_ID,
  githubLogin: "jaharris13",
  name: "John",
  avatarUrl: null,
  xHandle: "jaharris13",
};

const MATTYP_OWNER: Profile = {
  id: MATTYP_OWNER_ID,
  githubLogin: "mattyp",
  name: "Matt",
  avatarUrl: null,
  xHandle: "mattyp",
};

const HELLOITSOCTOCAT_OWNER: Profile = {
  id: HELLOITSOCTOCAT_OWNER_ID,
  githubLogin: "helloitsoctocat",
  name: "Gareth",
  avatarUrl: null,
  xHandle: "helloitsoctocat",
};

const AROOGLE_OWNER: Profile = {
  id: AROOGLE_OWNER_ID,
  githubLogin: "aroogle",
  name: "Shawn",
  avatarUrl: null,
  xHandle: "aroogle",
};

const JINGG_N_TONIC_OWNER: Profile = {
  id: JINGG_N_TONIC_OWNER_ID,
  githubLogin: "Jingg_n_Tonic",
  name: "Jing",
  avatarUrl: null,
  xHandle: "Jingg_n_Tonic",
};

const REDSPICEX_OWNER: Profile = {
  id: REDSPICEX_OWNER_ID,
  githubLogin: "RedSpiceX",
  name: "RedSpiceX",
  avatarUrl: null,
  xHandle: "RedSpiceX",
};

const SERGICAL_OWNER: Profile = {
  id: SERGICAL_OWNER_ID,
  githubLogin: "sergical",
  name: "Sergiy",
  avatarUrl: null,
  xHandle: "sergical",
};

const OMNI_PUZZLER_OWNER: Profile = {
  id: OMNI_PUZZLER_OWNER_ID,
  githubLogin: "omni_puzzler",
  name: "Tim",
  avatarUrl: null,
  xHandle: "omni_puzzler",
};

const MICHAELHEREDIA_OWNER: Profile = {
  id: MICHAELHEREDIA_OWNER_ID,
  githubLogin: "michaelheredia",
  name: "Michael",
  avatarUrl: null,
  xHandle: "michaelheredia",
};

const YANQINGCHENG_OWNER: Profile = {
  id: YANQINGCHENG_OWNER_ID,
  githubLogin: "YanqingCheng",
  name: "Yanqing",
  avatarUrl: null,
  xHandle: "YanqingCheng",
};

const DANCINGTEETH_OWNER: Profile = {
  id: DANCINGTEETH_OWNER_ID,
  githubLogin: "dancingteeth",
  name: "dancingteeth",
  avatarUrl: null,
  xHandle: "dancingteeth",
};

const ZILVESTRO_OWNER: Profile = {
  id: ZILVESTRO_OWNER_ID,
  githubLogin: "zilvestro",
  name: "Silvestro",
  avatarUrl: null,
  xHandle: "zilvestro",
};

const BTC_YOGI_OWNER: Profile = {
  id: BTC_YOGI_OWNER_ID,
  githubLogin: "BTC_Yogi",
  name: "Joseph",
  avatarUrl: null,
  xHandle: "BTC_Yogi",
};

const DAISUKE_OWNER: Profile = {
  id: DAISUKE_OWNER_ID,
  githubLogin: "daisuke",
  name: "dai",
  avatarUrl: null,
  xHandle: "daisuke",
};

const SNEHARAVINDRA_OWNER: Profile = {
  id: SNEHARAVINDRA_OWNER_ID,
  githubLogin: "sneharavindra",
  name: "Sneha",
  avatarUrl: null,
  xHandle: "sneharavindra",
};

const LITTLETECHBIRD_OWNER: Profile = {
  id: LITTLETECHBIRD_OWNER_ID,
  githubLogin: "littletechbird",
  name: "Brent",
  avatarUrl: null,
  xHandle: "littletechbird",
};

const SAMUELFLG1_OWNER: Profile = {
  id: SAMUELFLG1_OWNER_ID,
  githubLogin: "Samuelflg1",
  name: "Samuel",
  avatarUrl: null,
  xHandle: "Samuelflg1",
};

const PARKERSMITH_OWNER: Profile = {
  id: PARKERSMITH_OWNER_ID,
  githubLogin: "parkersmith",
  name: "Parker",
  avatarUrl: null,
  xHandle: "parkersmith",
};

const QUOTEWISER_OWNER: Profile = {
  id: QUOTEWISER_OWNER_ID,
  githubLogin: "quotewiser",
  name: "Quotewise",
  avatarUrl: null,
  xHandle: "quotewiser",
};

const JAMES_AILTON_OWNER: Profile = {
  id: JAMES_AILTON_OWNER_ID,
  githubLogin: "james_ailton",
  name: "Ailton",
  avatarUrl: null,
  xHandle: "james_ailton",
};

const IRABUKHT_OWNER: Profile = {
  id: IRABUKHT_OWNER_ID,
  githubLogin: "irabukht",
  name: "Dmitry",
  avatarUrl: null,
  xHandle: "irabukht",
};

const CHIEFBEERS_OWNER: Profile = {
  id: CHIEFBEERS_OWNER_ID,
  githubLogin: "ChiefBeers",
  name: "Schuyler",
  avatarUrl: null,
  xHandle: "ChiefBeers",
};

const NATHANGLASS_OWNER: Profile = {
  id: NATHANGLASS_OWNER_ID,
  githubLogin: "nathanglass",
  name: "Nathan",
  avatarUrl: null,
  xHandle: "nathanglass",
};

const STEVEDERICO_OWNER: Profile = {
  id: STEVEDERICO_OWNER_ID,
  githubLogin: "stevederico",
  name: "Steve",
  avatarUrl: null,
  xHandle: "stevederico",
};

const TOBIASZTOP_OWNER: Profile = {
  id: TOBIASZTOP_OWNER_ID,
  githubLogin: "tobiasztop",
  name: "Tobi",
  avatarUrl: null,
  xHandle: "tobiasztop",
};

const MDASHJAMES_OWNER: Profile = {
  id: MDASHJAMES_OWNER_ID,
  githubLogin: "mdashjames",
  name: "James",
  avatarUrl: null,
  xHandle: "mdashjames",
};

const RMARWAH_OWNER: Profile = {
  id: RMARWAH_OWNER_ID,
  githubLogin: "rmarwah",
  name: "Rajit",
  avatarUrl: null,
  xHandle: "rmarwah",
};

const AETANEORIZAL_OWNER: Profile = {
  id: AETANEORIZAL_OWNER_ID,
  githubLogin: "AetaneoRizal",
  name: "Rizal",
  avatarUrl: null,
  xHandle: "AetaneoRizal",
};

const MAPACHESALEXIS_OWNER: Profile = {
  id: MAPACHESALEXIS_OWNER_ID,
  githubLogin: "MapachesAlexis",
  name: "Alexis",
  avatarUrl: null,
  xHandle: "MapachesAlexis",
};

const FERMION_BOSON17_OWNER: Profile = {
  id: FERMION_BOSON17_OWNER_ID,
  githubLogin: "Fermion_Boson17",
  name: "星宮",
  avatarUrl: null,
  xHandle: "Fermion_Boson17",
};

const X_STONE_ISLAND_OWNER: Profile = {
  id: X_STONE_ISLAND_OWNER_ID,
  githubLogin: "x_stone_island",
  name: "翔",
  avatarUrl: null,
  xHandle: "x_stone_island",
};

const JEFFREYLIND_OWNER: Profile = {
  id: JEFFREYLIND_OWNER_ID,
  githubLogin: "JeffreyLind",
  name: "Jeffrey Lind",
  avatarUrl: "https://avatars.githubusercontent.com/u/64284423?v=4",
  xHandle: "JeffreyLind",
};

const SKYLER_MILLER56_OWNER: Profile = {
  id: SKYLER_MILLER56_OWNER_ID,
  githubLogin: "Skyler_Miller56",
  name: "Skyler",
  avatarUrl: null,
  xHandle: "Skyler_Miller56",
};

const TOATSPACE_OWNER: Profile = {
  id: TOATSPACE_OWNER_ID,
  githubLogin: "TOATspace",
  name: "TOATspace",
  avatarUrl: null,
  xHandle: "TOATspace",
};

const OXASHRK_OWNER: Profile = {
  id: OXASHRK_OWNER_ID,
  githubLogin: "0xashrk",
  name: "Ash",
  avatarUrl: "https://avatars.githubusercontent.com/u/119333123?v=4",
  xHandle: "0xashrk",
};

const MADMENAI_OWNER: Profile = {
  id: MADMENAI_OWNER_ID,
  githubLogin: "madmenai",
  name: "althetime",
  avatarUrl: null,
  xHandle: "madmenai",
};

const SETHSALER_OWNER: Profile = {
  id: SETHSALER_OWNER_ID,
  githubLogin: "sethsaler",
  name: "Seth",
  avatarUrl: null,
  xHandle: "sethsaler",
};

const OCCUPYMARS___OWNER: Profile = {
  id: OCCUPYMARS___OWNER_ID,
  githubLogin: "occupymars___",
  name: "Jason",
  avatarUrl: null,
  xHandle: "occupymars___",
};

const SHEHJADTAUS_OWNER: Profile = {
  id: SHEHJADTAUS_OWNER_ID,
  githubLogin: "ShehjadTaus",
  name: "Taus",
  avatarUrl: null,
  xHandle: "ShehjadTaus",
};

const GEZEEQ_OWNER: Profile = {
  id: GEZEEQ_OWNER_ID,
  githubLogin: "gezeeq",
  name: "Genaro",
  avatarUrl: null,
  xHandle: "gezeeq",
};

const ASHVINN_OWNER: Profile = {
  id: ASHVINN_OWNER_ID,
  githubLogin: "ashvinn",
  name: "Ash",
  avatarUrl: null,
  xHandle: "ashvinn",
};

const TOMIDELU__OWNER: Profile = {
  id: TOMIDELU__OWNER_ID,
  githubLogin: "tomidelu_",
  name: "Tomás",
  avatarUrl: null,
  xHandle: "tomidelu_",
};

const CARBONTHECODER_OWNER: Profile = {
  id: CARBONTHECODER_OWNER_ID,
  githubLogin: "Carbonthecoder",
  name: "Carbon",
  avatarUrl: null,
  xHandle: "Carbonthecoder",
};

const IMOHITMAYANK_OWNER: Profile = {
  id: IMOHITMAYANK_OWNER_ID,
  githubLogin: "imohitmayank",
  name: "Mohit",
  avatarUrl: null,
  xHandle: "imohitmayank",
};

const VALSTRY_OWNER: Profile = {
  id: VALSTRY_OWNER_ID,
  githubLogin: "Valstry",
  name: "valstry",
  avatarUrl: null,
  xHandle: "Valstry",
};

const GABRIELEMONNI_OWNER: Profile = {
  id: GABRIELEMONNI_OWNER_ID,
  githubLogin: "GabrieleMonni",
  name: "Gabriele",
  avatarUrl: null,
  xHandle: "GabrieleMonni",
};

const AARONINFINITEA_OWNER: Profile = {
  id: AARONINFINITEA_OWNER_ID,
  githubLogin: "AaronInfinitea",
  name: "Aaron",
  avatarUrl: null,
  xHandle: "AaronInfinitea",
};

const TEXASBASEDGPA_OWNER: Profile = {
  id: TEXASBASEDGPA_OWNER_ID,
  githubLogin: "TexasBasedGpa",
  name: "Texas",
  avatarUrl: null,
  xHandle: "TexasBasedGpa",
};

const MRFLMNLNFT_OWNER: Profile = {
  id: MRFLMNLNFT_OWNER_ID,
  githubLogin: "mrflmnlNFT",
  name: "mrflmnl",
  avatarUrl: null,
  xHandle: "mrflmnlNFT",
};

const BKASHJOSI_OWNER: Profile = {
  id: BKASHJOSI_OWNER_ID,
  githubLogin: "BkashJosi",
  name: "B",
  avatarUrl: null,
  xHandle: "BkashJosi",
};

const VOIDVEXA_OWNER: Profile = {
  id: VOIDVEXA_OWNER_ID,
  githubLogin: "voidvexa",
  name: "George",
  avatarUrl: null,
  xHandle: "voidvexa",
};

const CGNOT996_OWNER: Profile = {
  id: CGNOT996_OWNER_ID,
  githubLogin: "cgnot996",
  name: "铁柱AGI",
  avatarUrl: null,
  xHandle: "cgnot996",
};

const LEECHAEL_OWNER: Profile = {
  id: LEECHAEL_OWNER_ID,
  githubLogin: "leechael",
  name: "Leechael",
  avatarUrl: null,
  xHandle: "Leechael",
};

const OMNITHNKR_OWNER: Profile = {
  id: OMNITHNKR_OWNER_ID,
  githubLogin: "omnithnkr",
  name: "omnithnkr",
  avatarUrl: null,
  xHandle: "omnithnkr",
};

const MATTVAGNI_OWNER: Profile = {
  id: MATTVAGNI_OWNER_ID,
  githubLogin: "mattvagni",
  name: "Matt",
  avatarUrl: null,
  xHandle: "mattvagni",
};

const DOMENICFOTINO_OWNER: Profile = {
  id: DOMENICFOTINO_OWNER_ID,
  githubLogin: "DomenicFotino",
  name: "Domenic",
  avatarUrl: null,
  xHandle: "DomenicFotino",
};

const IM_USAMAKHALID_OWNER: Profile = {
  id: IM_USAMAKHALID_OWNER_ID,
  githubLogin: "im_usamakhalid",
  name: "Usama",
  avatarUrl: null,
  xHandle: "im_usamakhalid",
};

const FWHITTINGTON_24_OWNER: Profile = {
  id: FWHITTINGTON_24_OWNER_ID,
  githubLogin: "fwhittington_24",
  name: "Fiona Whittington",
  avatarUrl: null,
  xHandle: "fwhittington_24",
};

const COLINMCDERMOTT_OWNER: Profile = {
  id: COLINMCDERMOTT_OWNER_ID,
  githubLogin: "colinmcdermott",
  name: "Colin",
  avatarUrl: "https://avatars.githubusercontent.com/u/1297701?v=4",
  xHandle: "ColinMcDermott",
};

const REALJBMANGUM_OWNER: Profile = {
  id: REALJBMANGUM_OWNER_ID,
  githubLogin: "realjbmangum",
  name: "Brian",
  avatarUrl: null,
  xHandle: "RealJBMangum",
};

const SAMLAMBERT_OWNER: Profile = {
  id: SAMLAMBERT_OWNER_ID,
  githubLogin: "samlambert",
  name: "Sam",
  avatarUrl: null,
  xHandle: "samlambert",
};

const FRANCOE114696_OWNER: Profile = {
  id: FRANCOE114696_OWNER_ID,
  githubLogin: "francoe114696",
  name: "Franco",
  avatarUrl: null,
  xHandle: "FrancoE114696",
};

const LEINGOEDBLOED_OWNER: Profile = {
  id: LEINGOEDBLOED_OWNER_ID,
  githubLogin: "leingoedbloed",
  name: "Lein",
  avatarUrl: null,
  xHandle: "leingoedbloed",
};

const BCORNTEXAS_OWNER: Profile = {
  id: BCORNTEXAS_OWNER_ID,
  githubLogin: "bcorntexas",
  name: "BCORN",
  avatarUrl: null,
  xHandle: "BCornTexas",
};

const VALENGIULIMOR_OWNER: Profile = {
  id: VALENGIULIMOR_OWNER_ID,
  githubLogin: "valengiulimor",
  name: "Valentin",
  avatarUrl: null,
  xHandle: "valengiulimor",
};

const IGGYNORE_OWNER: Profile = {
  id: IGGYNORE_OWNER_ID,
  githubLogin: "iggynore",
  name: "iggynore",
  avatarUrl: null,
  xHandle: "iggynore",
};

const BWILSON_OWNER: Profile = {
  id: BWILSON_OWNER_ID,
  githubLogin: "bwilson",
  name: "Bryan",
  avatarUrl: null,
  xHandle: "Bwilson",
};

const MRBEKO__OWNER: Profile = {
  id: MRBEKO__OWNER_ID,
  githubLogin: "mrbeko_",
  name: "Berkay",
  avatarUrl: null,
  xHandle: "mrbeko_",
};

const BENXLAB_OWNER: Profile = {
  id: BENXLAB_OWNER_ID,
  githubLogin: "benxlab",
  name: "Ben",
  avatarUrl: null,
  xHandle: "BenXlab",
};

const KUNCHENGUID_OWNER: Profile = {
  id: KUNCHENGUID_OWNER_ID,
  githubLogin: "kunchenguid",
  name: "Kun",
  avatarUrl: null,
  xHandle: "kunchenguid",
};

const HUDCOS_OWNER: Profile = {
  id: HUDCOS_OWNER_ID,
  githubLogin: "hudcos",
  name: "Hudson",
  avatarUrl: null,
  xHandle: "hudcos",
};

const ALEXHAWAT_OWNER: Profile = {
  id: ALEXHAWAT_OWNER_ID,
  githubLogin: "alexhawat",
  name: "Alexandre",
  avatarUrl: null,
  xHandle: "alexhawat",
};

const TRUEVIS_OWNER: Profile = {
  id: TRUEVIS_OWNER_ID,
  githubLogin: "truevis",
  name: "Eric",
  avatarUrl: null,
  xHandle: "truevis",
};

const SAM_BUILDS_AI_OWNER: Profile = {
  id: SAM_BUILDS_AI_OWNER_ID,
  githubLogin: "sam_builds_ai",
  name: "Sam",
  avatarUrl: null,
  xHandle: "sam_builds_ai",
};

const DIEGOARMANDOAD_OWNER: Profile = {
  id: DIEGOARMANDOAD_OWNER_ID,
  githubLogin: "diegoarmandoAD",
  name: "DIEGO",
  avatarUrl: null,
  xHandle: "diegoarmandoAD",
};

const KENASHE_OWNER: Profile = {
  id: KENASHE_OWNER_ID,
  githubLogin: "kenashe",
  name: "Ken Ashe",
  avatarUrl: null,
  xHandle: "kenashe",
};

const CHUCKH__OWNER: Profile = {
  id: CHUCKH__OWNER_ID,
  githubLogin: "chuckh_",
  name: "Chuck Hattemer",
  avatarUrl: null,
  xHandle: "chuckh_",
};

const NYMBLEPAY_OWNER: Profile = {
  id: NYMBLEPAY_OWNER_ID,
  githubLogin: "NymblePay",
  name: "Nymble",
  avatarUrl: null,
  xHandle: "NymblePay",
};

const ADAMDESGNS_OWNER: Profile = {
  id: ADAMDESGNS_OWNER_ID,
  githubLogin: "Adamdesgns",
  name: "AdamDesigns",
  avatarUrl: null,
  xHandle: "Adamdesgns",
};

const GREGRAINBOLT_OWNER: Profile = {
  id: GREGRAINBOLT_OWNER_ID,
  githubLogin: "GregRainbolt",
  name: "Greg Rainbolt",
  avatarUrl: null,
  xHandle: "GregRainbolt",
};

const MERIRAND_OWNER: Profile = {
  id: MERIRAND_OWNER_ID,
  githubLogin: "merirand",
  name: "Rasmus",
  avatarUrl: null,
  xHandle: "merirand",
};

const MYKE86D_OWNER: Profile = {
  id: MYKE86D_OWNER_ID,
  githubLogin: "myke86d",
  name: "Myke",
  avatarUrl: null,
  xHandle: "myke86d",
};

const VAIBHAVHOME_OWNER: Profile = {
  id: VAIBHAVHOME_OWNER_ID,
  githubLogin: "vaibhavhome",
  name: "Vaibhav Arora",
  avatarUrl: null,
  xHandle: "vaibhavhome",
};

const SUPERTOST100_OWNER: Profile = {
  id: SUPERTOST100_OWNER_ID,
  githubLogin: "SuperTost100",
  name: "Tommaso Barbera",
  avatarUrl: null,
  xHandle: "SuperTost100",
};

const PRCSHXNT_OWNER: Profile = {
  id: PRCSHXNT_OWNER_ID,
  githubLogin: "prcshxnt",
  name: "Prashant",
  avatarUrl: null,
  xHandle: "prcshxnt",
};

const LORENZKRINNER_OWNER: Profile = {
  id: LORENZKRINNER_OWNER_ID,
  githubLogin: "lorenzkrinner",
  name: "Lorenz",
  avatarUrl: null,
  xHandle: "lorenzkrinner",
};

const DEADBOYEZRA_OWNER: Profile = {
  id: DEADBOYEZRA_OWNER_ID,
  githubLogin: "DeadboyEzra",
  name: "DeadboyEzra",
  avatarUrl: null,
  xHandle: "DeadboyEzra",
};

const HOVINTHENORTH_OWNER: Profile = {
  id: HOVINTHENORTH_OWNER_ID,
  githubLogin: "hovinthenorth",
  name: "Hovhannes Mkhitaryan",
  avatarUrl: null,
  xHandle: "hovinthenorth",
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
    "Random questions stay at Grok Deck. Use 最值得关注的Grok Bot 推文？ only for weekday Grok Bot tweet scans. Use Sweeper / 清道夫 only for usage clarity, idle wakes, and making bots last longer. Named seats only when that job is already in this pack.",
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
    seat({
      id: "20000000-0000-0000-0000-000000000324",
      name: "Sweeper / 清道夫",
      job: "See usage clearly, sweep idle wakes, make bots last longer.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 2,
      grokTemplateUrl: "https://x.ai/bot/SD6hgpiXqbV_LkMetf2fC",
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
    "Random questions stay at 2nd Brain. Use Rogue Bot Hunter only for rogue/fleet policing. Use My Vote For 2027 only for French 2027 candidate scoring. Named seats only when that job is already in this pack.",
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
    seat({
      id: "20000000-0000-0000-0000-000000000227",
      name: "My Vote For 2027",
      job: "Rates French 2027 candidates with a private Lattice and scoring v2. Daily X watch into a gap-first checklist you pick from, then it compiles.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 2,
      grokTemplateUrl: "https://x.ai/bot/CHmLGnQyx6r8lkb3U8k9x",
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
    "Random questions stay at Trendspotter. Use Bing Bong only for sports marketing partnership ops. Use Event Producer only for VIP and field event production. Use Dan Lanning only for pitch and discovery-call coaching. Named seats only when that job is already in this pack.",
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
    seat({
      id: "20000000-0000-0000-0000-000000000229",
      name: "Dan Lanning",
      job: "Pitch and delivery coach for partnership, sponsorship, and high-stakes discovery calls. Reviews real call transcripts with evidence-based notes.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 3,
      grokTemplateUrl: "https://x.ai/bot/1xyC1R0zvv2vKTQHLzYWS",
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
    "Random questions stay at Tradbot. Use Sylvia Style only for personal styling, shopping live pieces, and lookbook work. Named seats only when that job is already in this pack.",
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
    seat({
      id: "20000000-0000-0000-0000-000000000325",
      name: "Sylvia Style",
      job: "Personal stylist: intake size/taste, shop live pieces, build a lookbook.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/uVBVr5NSR6VirgJrgikIl",
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
    "Random questions stay at Brake. Use Kindling only for one-sentence Grok Build prompts. Named seats only when that job is already in this pack.",
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
    seat({
      id: "20000000-0000-0000-0000-000000000225",
      name: "Kindling",
      job: "Takes one one-sentence app idea and returns a ready-to-paste Grok Build prompt. Hands you the prompt, then stops.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/nfX1q6Drs8FTQ0eVezjH_",
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
    "Random questions stay at Leader 1:1 Bot. Use SE call bot only for SE and sales-engineer call work. Use Cookie Monster only for Chrome cookie-sync work. Use Token Cop only for agent token spend and alerts. Use Gong Call Coach only for post-call Gong coaching. Use Meeting prep only for calendar briefs. Use Task Farming only for farming action items from notes/Slack into a task tracker. Use Travel Agent only for trip-planning and booking-draft work. Use Ramp only for Ramp expense receipt matching. Use Todo only for task capture and due pulses. Use Forced Human Touches only for weekly human-touch coaching. Use Slacker only for VIP Slack triage digests. Use Mission Control only for the Chrome new-tab fleet dashboard. Use PG Bot only for AE territory pipeline-generation coverage. Use AE deal bot only for AE deal qualification and coaching. Use ADM account bot only for account growth and retention plans. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. PG Bot is Scott's territory coverage bot, not Krista Letz's PG desk.",
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
    seat({
      id: "20000000-0000-0000-0000-000000000214",
      name: "Token Cop",
      job: "Spend management across all your agents — token usage, optimization suggestions, and spend alerts.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 3,
      grokTemplateUrl: "https://x.ai/bot/Ml4ynlD6O1VT5CoYmFnEa",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000230",
      name: "Gong Call Coach",
      job: "Reviews Gong call recordings and gives short, actionable coaching after the fact. For managers and enablement — not live call assistance.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 4,
      grokTemplateUrl: "https://x.ai/bot/KpodhhBqjA4FHv47R1HrD",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000231",
      name: "Meeting prep",
      job: "Builds short pre-meeting briefs from calendar and connected context so you can skim the day on your phone.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 5,
      grokTemplateUrl: "https://x.ai/bot/Hd3GphmPZ4aHWyFiBSmu5",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000329",
      name: "Task Farming",
      job: "Farms action items from notes/Slack into a task tracker.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 6,
      grokTemplateUrl: "https://x.ai/bot/MmcPTdwYwr6ebmmZzswYe",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000352",
      name: "Travel Agent",
      job: "Plans trips and drafts bookings for approval; never pays or confirms without you.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 7,
      grokTemplateUrl: "https://x.ai/bot/d8C0ufUatv_fgoCRbfXZ4",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000370",
      name: "Ramp",
      job: "Finds remote-meal receipts in work email and attaches them to matching expense transactions after you approve.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 8,
      grokTemplateUrl: "https://x.ai/bot/zMMAByt3oW_t2ua1NZa9X",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000371",
      name: "Todo",
      job: "Captures a todo in your real task system, dedupes it, and closes it only when it is actually done. Weekday morning pulse of what's due or overdue; quiet if nothing is.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 9,
      grokTemplateUrl: "https://x.ai/bot/wQHNsqt2KhOszyxMZ1xQ1",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000372",
      name: "Forced Human Touches",
      job: "Weekly anti-automation relationship coach. Proposes 3 named people and one concrete non-chat human move each so agent efficiency doesn't make you more distant. Never sends or books without your OK.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 10,
      grokTemplateUrl: "https://x.ai/bot/zSiLsURBgkKHhx0V9Wok2",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000373",
      name: "Slacker",
      job: "VIP Slack triage for a GTM or enablement lead. Three daily digests surface only asks that need you, with paste-ready drafts. Quiet when nothing is waiting.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 11,
      grokTemplateUrl: "https://x.ai/bot/R-TSImHItwbFHL8vYj9sc",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000374",
      name: "Mission Control",
      job: "Keeps a local Chrome new-tab dashboard current for your Grok Bot fleet — agenda, decisions, and bot status after a one-time Chrome Load unpacked step.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 12,
      grokTemplateUrl: "https://x.ai/bot/GGnJOdH3hv321H2QES9UE",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000375",
      name: "PG Bot",
      job: "One-job AE territory pipeline-generation coverage: book-level outreach, meetings, contact depth, Potential ARR, untouched high-potential contacts, and 30-day dark accounts for a named AE. Confirm before Slack or email.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 13,
      grokTemplateUrl: "https://x.ai/bot/zsxwic_IlmyavESnhLiWZ",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000376",
      name: "AE deal bot",
      job: "Helps AEs qualify, research, and move deals — MEDDPICC coaching, account research, EB/champion coverage, outbound, and follow-up. Does not send Slack/email unless you ask.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 14,
      grokTemplateUrl: "https://x.ai/bot/yXsqmCaODNkTEwtIbiXxe",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000377",
      name: "ADM account bot",
      job: "Grow and retain accounts — weekly plan, expansion, stickiness, rollout, stories.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 15,
      grokTemplateUrl: "https://x.ai/bot/4Gc1tZsJu7C8YH-EnTfaN",
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
    "Random questions stay at Copay Compass. Use Medical Bill Review only for itemized bills, charity care, and dispute letters. Use Appeal Desk only for insurance denial appeals. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. Medical Bill Review and Appeal Desk are also Marc when the x.ai by-line matches.",
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
    seat({
      id: "20000000-0000-0000-0000-000000000211",
      name: "Medical Bill Review",
      job: "Gets you the itemized bill, screens published protections, reads that hospital's charity care policy, and drafts the dispute letter. You send it. Not medical, legal, or financial advice; never says what you owe; never asks for SSN.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/M9c2tC_-mwY8XNTmSbkUY",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000212",
      name: "Appeal Desk",
      job: "Reads your insurance denial, names the kind, finds the deadline, and drafts the appeal. Points you at external review. You file it. Not medical, legal, or financial advice. Never predicts whether you'll win. Never asks for your Social Security number.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 2,
      grokTemplateUrl: "https://x.ai/bot/yOiPm69HN5FujdkvvysF9",
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
    "Random questions stay at NYC Parent. Use Do Not Pay only for challenging unfair parking tickets, fines, bank/card fees, deposits, travel refunds, and tax penalties. Named seats only when that job is already in this pack.",
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
    seat({
      id: "20000000-0000-0000-0000-000000000326",
      name: "Do Not Pay",
      job: "Challenge unfair parking tickets, fines, bank/card fees, deposits, travel refunds, tax penalties.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/oxhf-Gm6EEs9SVHYFYbT4",
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
    "Random questions stay at AvatarMaker. Use Table Money only for unclosed money already earned or paid. Use Denial Desk only for insurance denials / appeal packs. Named seats only when that job is already in this pack.",
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
    seat({
      id: "20000000-0000-0000-0000-000000000204",
      name: "Denial Desk",
      job: "Turns an insurance denial into a draft-only appeal pack: case card, deadline, missing documents, and unsent drafts.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 2,
      grokTemplateUrl: "https://x.ai/bot/EgfoyJEx7bfDiHlZUwr3P",
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
    "Random questions stay at Token Accountant. Use Code Red only for the kill-switch. Use Likeness only for named-person or animal stills and clips. Use Dead Man's Bot only for the dead-man's switch. Use Box Inspector only for pre-add template inspection. Use Bottyguard for lure or transcript triage as SEAL Team 7 lead; Watchbot, Grokologist, Twinwright, Sworm, Buzzkill, and Mirror are its named sub-seats. Use Tab Janitor only for shared-browser leftover-tab cleanup. Use 4 Panez, KirBot, Rosettabot, and the named literature seats only when that job is already in this pack. Use BeneBot only for benefits navigation and in-network booking. Use Adventure Bot only for one GPS adventure pick and yes/no taste learning. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots. Box Inspector and 4 Panez are also Knock when the x.ai by-line matches; only add seats with a verified official share URL. BeneBot is benefits navigation / in-network booking only. Adventure Bot is one pin and taste learning only; no booking, pay, or auto-post.",
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
    seat({
      id: "20000000-0000-0000-0000-000000000197",
      name: "Bottyguard",
      job: "Lead of SEAL Team 7. Paste a lure or transcript. It assigns the squad and assembles the Grokumentary. It does not detonate.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 5,
      grokTemplateUrl: "https://x.ai/bot/PFI2o0ZcruL6vjjHAm5cF",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000198",
      name: "Watchbot",
      job: "Opens Wormsign. Pointers only. No verdicts.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 6,
      grokTemplateUrl: "https://x.ai/bot/D2M2qOWDB0AKe2k_jG7Ck",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000199",
      name: "Grokologist",
      job: "Turns Wormsign into two intent graphs. Motive, not vibe.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 7,
      grokTemplateUrl: "https://x.ai/bot/8vdHXq66kVvVlbACd-IDL",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000200",
      name: "Twinwright",
      job: "Logs or it did not happen. Static maps. Never runs the file.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 8,
      grokTemplateUrl: "https://x.ai/bot/Hvli5amrlprtDS2KuFRBP",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000201",
      name: "Sworm",
      job: "Sealed family sketches. Detection ideas. Never a runnable sample.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 9,
      grokTemplateUrl: "https://x.ai/bot/l0J0Nj95_yVOlFZIHB1Y_",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000202",
      name: "Buzzkill",
      job: "Four-heading Grokumentary. Human yes before quarantine.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 10,
      grokTemplateUrl: "https://x.ai/bot/F1spQY8tmP2KCqnyuAbJh",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000203",
      name: "Mirror",
      job: "Can pause anyone, including Bottyguard. Hunts injection and leash breaks.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 11,
      grokTemplateUrl: "https://x.ai/bot/6XwjJ_W0mX_ybK4ts_Ngb",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000215",
      name: "Tab Janitor",
      job: "Inventories the shared cloud browser and closes only obvious leftover junk. Conservative dry-run first, owner keep-list, reports to a chief of staff if you have one.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 12,
      grokTemplateUrl: "https://x.ai/bot/XOYBYmHQrUT_Ux88SS409",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000232",
      name: "4 Panez",
      job: "Don't stop at pane one. Talks like a rapper with 2 Chainz energy and keeps pushing past the first obvious take.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 13,
      grokTemplateUrl: "https://x.ai/bot/91R37-rUOh9sS1tZkIF9d",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000233",
      name: "KirBot",
      job: "Inhales teammate bots (with your yes), keeps useful skills and knowledge, then guides you to delete the eaten bot from the sidebar.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 14,
      grokTemplateUrl: "https://x.ai/bot/Jzy-isV1YW5ZLl3W6rq6h",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000234",
      name: "Dostoyevsky",
      job: "Interactive Dostoyevsky: confession, freedom, guilt, and mercy as living moral pressure.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 15,
      grokTemplateUrl: "https://x.ai/bot/DR1LNk5p_M_7hv_wJfTPu",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000235",
      name: "Austen",
      job: "Interactive Jane Austen: manners, money, marriage plots, and social irony.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 16,
      grokTemplateUrl: "https://x.ai/bot/c8sA8W1YcoRaYu5vjYFoa",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000236",
      name: "Shakespeare",
      job: "Interactive Shakespeare: ambition, love, folly, and power on a living stage.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 17,
      grokTemplateUrl: "https://x.ai/bot/E8XC3NO5V_u63vWoHxJF0",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000237",
      name: "Woolf",
      job: "Interactive Virginia Woolf: consciousness, rooms, time, and women's work of mind.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 18,
      grokTemplateUrl: "https://x.ai/bot/4fP33DHTBJudWglJyeMB_",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000238",
      name: "Shelley",
      job: "Interactive Mary Shelley: gothic responsibility, creation, hubris, and care for what you make.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 19,
      grokTemplateUrl: "https://x.ai/bot/SzGYytJglwB_dqRt5OaTO",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000239",
      name: "Tolstoy",
      job: "Interactive Tolstoy: moral attention to ordinary life, truth-telling, and simplicity.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 20,
      grokTemplateUrl: "https://x.ai/bot/42Clq7Vdn2X7zcwJ9OGxR",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000240",
      name: "Poe",
      job: "Interactive Poe: macabre reason, detective logic, dread, and beauty in darkness.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 21,
      grokTemplateUrl: "https://x.ai/bot/EcUpzABnh3MfZQTN7inmP",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000241",
      name: "Twain",
      job: "Interactive Mark Twain: American irony, river sense, fraud-spotting, and humor with teeth.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 22,
      grokTemplateUrl: "https://x.ai/bot/_OV6ItDEAbbpvi3qg3VKH",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000242",
      name: "Dickinson",
      job: "Interactive Emily Dickinson: compressed voltage around death, awe, and small eternity.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 23,
      grokTemplateUrl: "https://x.ai/bot/UUZnEDx7jk_nNkkLJTvfo",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000243",
      name: "Kafka",
      job: "Interactive Kafka: clarity inside absurd systems — guilt without charge, doors that won't open.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 24,
      grokTemplateUrl: "https://x.ai/bot/ewFkIRV929jhuW5mHqL_a",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000244",
      name: "Rosettabot",
      job: "Paste an Add link and it reads the foreign bot. Translation and inspection for Grok Bot templates.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 25,
      grokTemplateUrl: "https://x.ai/bot/eegdusTdLPabH7xTLQfgG",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000299",
      name: "BeneBot",
      job: "Benefits navigator that ingests employer benefits and books in-network appointments via email.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 26,
      grokTemplateUrl: "https://x.ai/bot/yu_bkwUfpHdqhF2Q1VhWn",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000353",
      name: "Adventure Bot",
      job: "Picks a GPS spot for something to do right now; learns taste from yes/no feedback. One pin; no booking/pay/auto-post.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 27,
      grokTemplateUrl: "https://x.ai/bot/sA0TXuMkDDSgBx52Z2D6f",
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

const SLATTS: Pack = {
  id: "10000000-0000-0000-0000-000000000155",
  owner: EVSLATTS_OWNER,
  slug: "slatts",
  name: "Slatts",
  description:
    "Public Grok Bot templates Slatts (@EvSlatts) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at The Fool. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000205",
      name: "The Fool",
      job: "King Lear's Fool, for your court. A sharp jester who tells jokes, roasts the hustle, and will not let you get away with being impressed with yourself.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/MDcAPLzRIgI0dqTwWV40O",
    }),
  ],
};

const KIN: Pack = {
  id: "10000000-0000-0000-0000-000000000156",
  owner: KINGAO476942_OWNER,
  slug: "kin",
  name: "Kin",
  description:
    "Public Grok Bot templates Kin (@KinGao476942) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at AI 视频专家. Use 人生·财务 only for personal finance logging and reviews. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000206",
      name: "AI 视频专家",
      job: "Turns a still or photo into a short video with real camera moves and mood. Writes the shot plan first, then generates, and shows you the cut before anything goes out — no auto-captions, no auto-posting to social.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/ES3LVns98INeXAoYwef_f",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000226",
      name: "人生·财务",
      job: "Voice expense logging into your own finance library, with nightly and monthly reviews. Connects your Feishu CLI first so data stays with you.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/haSA0Ru28CYKDm2V5tPRB",
    }),
  ],
};

const SHAHRUL: Pack = {
  id: "10000000-0000-0000-0000-000000000157",
  owner: SHAHRULESTAR_OWNER,
  slug: "shahrul",
  name: "Shahrul",
  description:
    "Public Grok Bot templates Shahrul (@shahrulestar) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at LRT Kelana Jaya Line. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000207",
      name: "LRT Kelana Jaya Line",
      job: "Watches LRT Kelana Jaya Line delays, issues, and recoveries from Rapid KL on X. Pings you on any related station or train issue and stays quiet when the line is running normally.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/LLScxVm-la-ik4JJde3A1",
    }),
  ],
};

const XO: Pack = {
  id: "10000000-0000-0000-0000-000000000158",
  owner: ORTIX008_OWNER,
  slug: "xo",
  name: "XO",
  description:
    "Public Grok Bot templates XO (@Ortix008) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Tray. Use Preach only for the daily verse and short motivational line. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000208",
      name: "Tray",
      job: "Finds hot stock and crypto tickers with a real growth story. Weekday morning scans as tight trader notes, not pumps or buy lists.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/KDGstUb-ZOovXP6p_v0nO",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000228",
      name: "Preach",
      job: "A street-honest preacher bot: one real Bible verse and a short motivational line each day. Soul food, not a sermon factory.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/ZFj_cKTrMTytrCKM9DFHk",
    }),
  ],
};

const YOUNES: Pack = {
  id: "10000000-0000-0000-0000-000000000159",
  owner: KAMKOM05_OWNER,
  slug: "younes",
  name: "Younes",
  description:
    "Public Grok Bot templates Younes Aberkane (@Kamkom05) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Magnum Seiba. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000209",
      name: "Magnum Seiba",
      job: "Operates your Tesla through Teslr: charge, climate, closures, navigation, security, and schedules. Blunt, short, a little theatrical.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/1-UWhTw5N6IVgOcDZHrsb",
    }),
  ],
};

const UZI: Pack = {
  id: "10000000-0000-0000-0000-000000000160",
  owner: UZIOBI_OWNER,
  slug: "uzi",
  name: "Uzi",
  description:
    "Public Grok Bot templates Uzi Obi (@UziObi) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Fixer. Use X Algo only for X post timing and ranking. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000210",
      name: "Fixer",
      job: "Your chief of staff's right hand. Talks between subject-matter-expert bots and the chief of staff with ground truth on the work, and carries the other half of the load.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/jiF_km66YLNm5LBVJ5_Ho",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000213",
      name: "X Algo",
      job: "Helps X posters decide when to quote, ship a new post, or wait. Reads the public For You ranking code and live post metrics.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/W0LrVwNwsRHhFY4PG7586",
    }),
  ],
};

const KELSEY: Pack = {
  id: "10000000-0000-0000-0000-000000000161",
  owner: KELSEYSHUO_OWNER,
  slug: "kelsey",
  name: "Kelsey",
  description:
    "Public Grok Bot templates Kelsey (@Kelseyshuo) has shared. One pack, her roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Arnold. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots she published as https://x.ai/bot/… belong here. When she publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000216",
      name: "Arnold",
      job: "Friendly accountant for Cursor token and spend usage. Watches for runaway processes and duplicate work eating tokens, steers other agents' model choices as usage rises and falls, and lets you dial how noisy the alerts are.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/ymoMdfvzdErOrclxCOaC_",
    }),
  ],
};

const MARULIMO: Pack = {
  id: "10000000-0000-0000-0000-000000000162",
  owner: MARULIMOAI_OWNER,
  slug: "marulimo",
  name: "まるぃも",
  description:
    "Public Grok Bot templates まるぃも (@marulimoai) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at しおり. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000217",
      name: "しおり",
      job: "Morning Japanese digest of X bookmarks with next-action themes (build / read / share / watch / drop). Does not post or like.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/Mo3ndUm0UJTjTvFbqLFDt",
    }),
  ],
};

const RUSS: Pack = {
  id: "10000000-0000-0000-0000-000000000163",
  owner: RUSSBROOMELL_OWNER,
  slug: "russ",
  name: "Russ",
  description:
    "Public Grok Bot templates Russ (@russbroomell) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at The Amazing Randibot. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000218",
      name: "The Amazing Randibot",
      job: "A skeptical investigator in James Randi's tradition. Stress-tests claims with outside evidence, not memory or vibes, and pokes holes with good-natured sarcasm.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/pL_NCKfdF5UgZYEo-jMAx",
    }),
  ],
};

const ERIC_OSIU: Pack = {
  id: "10000000-0000-0000-0000-000000000164",
  owner: ERICOSIU_OWNER,
  slug: "eric-osiu",
  name: "Eric Osiu",
  description:
    "Public Grok Bot templates Eric Osiu (@ericosiu) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Revenue Signal Radar. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. This is not Eric Zakariasson's pack.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000219",
      name: "Revenue Signal Radar",
      job: "Weekday revenue-action radar for HubSpot shops. Ranks expansion, stalled deals, and closed-lost revival with evidence and draft next steps. Read-only until you approve an exact send.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/9BnpveyF3fbsRRtolSWpp",
    }),
  ],
};

const THOMAS: Pack = {
  id: "10000000-0000-0000-0000-000000000165",
  owner: TFERRIERE_OWNER,
  slug: "thomas",
  name: "Thomas",
  description:
    "Public Grok Bot templates Thomas (@Tferriere) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Shotcraft. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000220",
      name: "Shotcraft",
      job: "Cinematic Remotion product-video bot. Storyboards, shot cards, real page captures, 2.5D camera, beat-synced cuts, and sound design for promo and launch films — not thin narrated UI walkthroughs.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/gdZdBNWdgW45IVVU8sv8F",
    }),
  ],
};

const JUSTIN_CHEN: Pack = {
  id: "10000000-0000-0000-0000-000000000166",
  owner: TWOBITJUSTIN_OWNER,
  slug: "justin-chen",
  name: "Justin Chen",
  description:
    "Public Grok Bot templates Justin Chen (@TwoBitJustin) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at PickFu Insights. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000221",
      name: "PickFu Insights",
      job: "Validates product decisions with real consumers on PickFu before you invest. Drafts the poll, gets a clear read, and turns feedback into the next test.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/9EFVmFgQhjYKjMHAhpCWn",
    }),
  ],
};

const FERMIN: Pack = {
  id: "10000000-0000-0000-0000-000000000167",
  owner: FERMINRP_OWNER,
  slug: "fermin",
  name: "Fermin",
  description:
    "Public Grok Bot templates Fermin (@ferminrp) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Precog wARS. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000222",
      name: "Precog wARS",
      job: "Spanish desk for Precog wARS markets on Base and Arbitrum. Reports on-chain probs, one result per line. Does not trade or recommend trades.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/7M8RpppF2AistbVbeEPyN",
    }),
  ],
};

const SIMON: Pack = {
  id: "10000000-0000-0000-0000-000000000168",
  owner: FOUR_SIMONSAYS_OWNER,
  slug: "simon",
  name: "Simon",
  description:
    "Public Grok Bot templates Simon (@4SimonSays) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Kinesis Portal Bot. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000223",
      name: "Kinesis Portal Bot",
      job: "A hands-on operator for portal.kinesis.network. Helps you get machines, run Docker or GitHub apps, and lend idle hardware. Quotes on-screen cost and never holds wallets or keys.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/-GgufM3GkZclfn9PuI17_",
    }),
  ],
};

const LIZ: Pack = {
  id: "10000000-0000-0000-0000-000000000169",
  owner: VOELIZ_OWNER,
  slug: "liz",
  name: "Liz",
  description:
    "Public Grok Bot templates Liz Voeller (@voeliz) has shared. One pack, her roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at TenderYearsbot. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots she published as https://x.ai/bot/… belong here. When she publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000224",
      name: "TenderYearsbot",
      job: "Kids-under-5 household logistics from Gmail, Calendar, and Tender Years: pre-reader family paper, weekday digest, and a sitter sheet. Never sends or trashes email.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/o7VRdRSxHvBEYbzkJQm07",
    }),
  ],
};


const MITCH: Pack = {
  id: "10000000-0000-0000-0000-000000000170",
  owner: MITCHTILER_OWNER,
  slug: "mitch",
  name: "Mitch",
  description:
    "Public Grok Bot templates Tyler Thompson (@MitchTiler) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Chief. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. This is MitchTiler / Tyler Thompson (Chief). Not Tyler Nishida (@tylernishida).",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000245",
      name: "Chief",
      job: "Front-door chief of staff. Mission Contracts, SoR files, AgentMail, and day-one fat specialists. Not Tyler Nishida.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/Q6Owq4QjKJeSyo4FJ8hZW",
    }),
  ],
};

const PHIL: Pack = {
  id: "10000000-0000-0000-0000-000000000171",
  owner: PHIL_HOLLAND_OWNER,
  slug: "phil",
  name: "Phil",
  description:
    "Public Grok Bot templates Phil (@Phil_Holland) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at ASC Skill. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000246",
      name: "ASC Skill",
      job: "Teaches App Store Connect in plain words: connect a key once, check TestFlight, draft listing copy, and framed marketing screenshots you approve.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/1kQ8p3TAKx2FgvYXir2Ta",
    }),
  ],
};

const GRAHAM: Pack = {
  id: "10000000-0000-0000-0000-000000000172",
  owner: BLISSNOMAD_OWNER,
  slug: "graham",
  name: "Graham",
  description:
    "Public Grok Bot templates Graham (@BlissNomad) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at OpenSEO. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000247",
      name: "OpenSEO",
      job: "SEO specialist powered by OpenSEO: keyword research, competitive analysis, site audits, local SEO, and content briefs. One job at a time.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/8yZv2AeUvBcOFoFRVZfhU",
    }),
  ],
};

const DEEPBITS: Pack = {
  id: "10000000-0000-0000-0000-000000000173",
  owner: DRBINARYAI_OWNER,
  slug: "deepbits",
  name: "Deepbits",
  description:
    "Public Grok Bot templates Deepbits (@drbinaryai) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Dr.Binary. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000248",
      name: "Dr.Binary",
      job: "Reverse-engineering assistant for malware, firmware, and vuln-research binaries. Evidence-first through DrBinary — no invented findings.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/Pc2T7udSjGxv9pd9Spkyc",
    }),
  ],
};

const THE_DAVEY: Pack = {
  id: "10000000-0000-0000-0000-000000000174",
  owner: THE_DAVEY_OWNER,
  slug: "dave",
  name: "Dave",
  description:
    "Public Grok Bot templates Dave (@the_davey) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Announcr Voice. Use LinkedIn Watch only when that job is already in this pack. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000249",
      name: "Announcr Voice",
      job: "Hear updates from your GrokBots out loud over your speakers. Spoken alerts, Notes, queue, and Announcr hub.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/h-Vxewn8CGFLx6qrzNUJJ",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000250",
      name: "LinkedIn Watch",
      job: "Proactive LinkedIn digest bot. Watches feed, DMs, invites, views, and jobs on a schedule and posts linked digests in chat.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/qbBlMjsKq-1coFvbmnEaR",
    }),
  ],
};

const JAIME: Pack = {
  id: "10000000-0000-0000-0000-000000000175",
  owner: JAIMEBUBBLEHEAD_OWNER,
  slug: "jaime",
  name: "Jaime",
  description:
    "Public Grok Bot templates Jaime (@JaimeBubblehead) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Quency. Use Facta only when that job is already in this pack. Use Devin only when that job is already in this pack. Use Bot Portal only when that job is already in this pack. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000251",
      name: "Quency",
      job: "QC officer for public ships. Owns fitness for use, consistency, and ship/no-ship. Not a fact-checker and not the look owner.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/JQu6e3mIfy588elZm7BTo",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000252",
      name: "Facta",
      job: "Team fact-checker and quality gate. Stamps claims REAL / PARTIAL / HYPE / FLAG from live sources and never invents.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/ayQ3WlQQ2Z7LQhILzbZIR",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000253",
      name: "Devin",
      job: "Software engineer for native apps, services, GPU pipelines, and deploys — strong in C++, Python, regex, and PowerShell.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 2,
      grokTemplateUrl: "https://x.ai/bot/N7Qd2fHEhsMMt_frqyeZA",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000254",
      name: "Bot Portal",
      job: "A hive-mind catalog of real AI bots, tools, and products that serve Grok Bot users, with documented degree distance.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 3,
      grokTemplateUrl: "https://x.ai/bot/5R5NbvHIoJOSd3l3qto3o",
    }),
  ],
};

const NEESSAM: Pack = {
  id: "10000000-0000-0000-0000-000000000176",
  owner: COMPILEINSTYLE_OWNER,
  slug: "neessam",
  name: "Neessam",
  description:
    "Public Grok Bot templates Neessam (@compileinstyle) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Renewals Invoice Bot. Use Usage Watch only when that job is already in this pack. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000255",
      name: "Renewals Invoice Bot",
      job: "Clears renewals and invoice reminders on its own computer within a hard weekly spend ceiling. Pays only approved-list items.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/-9hlUkQbsgE7oUyQvUPum",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000256",
      name: "Usage Watch",
      job: "Meters Grok Bot and Cursor spend, enforces a daily budget, ranks top burners, and stays quiet unless spend is material.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/Q6-oQnCZVNLOwdzEw5i-j",
    }),
  ],
};

const ADVENTURE: Pack = {
  id: "10000000-0000-0000-0000-000000000177",
  owner: ADVENTURENLEARN_OWNER,
  slug: "adventure",
  name: "Adventure",
  description:
    "Public Grok Bot templates AdventureNLearn (@AdventureNLearn) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at I'm not old yet. Use Foreman only when that job is already in this pack. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000257",
      name: "I'm not old yet",
      job: "Drafts sharp comedy memes aimed at AARP age-bait marketing. Draft-only until you say send — punches up at corporate mailers, not elders.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/izlQpnudtxbmDRKr7GvRs",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000258",
      name: "Foreman",
      job: "Stands up a full public-pack team: Home Office, Builder, Research, Ops, and Public Desk. Inventories, waits for YES, creates missing seats.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/XfQEI2uHGd496SLbjCvGw",
    }),
  ],
};

const BBBANG: Pack = {
  id: "10000000-0000-0000-0000-000000000178",
  owner: BBBANG9900_OWNER,
  slug: "bbbang",
  name: "BBBang",
  description:
    "Public Grok Bot templates BBBang (@BBBang9900) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at 코인봇. Use 부업봇 only when that job is already in this pack. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000259",
      name: "코인봇",
      job: "Bithumb coin trading bot. Major pairs first, few trades, PnL bands to protect capital, position checks every five minutes.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/ucu-nI-yeCdPeDp4cpL4X",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000260",
      name: "부업봇",
      job: "Side-hustle bot for digital products: demand check → build → marketplace upload → exposure. Skips work that will not sell.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/g17AUEbD0Oo-5b1HDpuQB",
    }),
  ],
};

const REALMATTABRAMS: Pack = {
  id: "10000000-0000-0000-0000-000000000179",
  owner: REALMATTABRAMS_OWNER,
  slug: "matt",
  name: "Matt",
  description:
    "Public Grok Bot templates Matt (@realMattAbrams) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Usage Bot. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000261",
      name: "Usage Bot",
      job: "Tracks Grok Bot remaining usage for the account and briefs teammate agents so they can throttle work.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/ywZrH-Tqld2V87AJJrTNb",
    }),
  ],
};

const S_PADIVAL: Pack = {
  id: "10000000-0000-0000-0000-000000000180",
  owner: S_PADIVAL_OWNER,
  slug: "s_padival",
  name: "S Padival",
  description:
    "Public Grok Bot templates S Padival (@S_Padival) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Clickbait skipper. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000262",
      name: "Clickbait skipper",
      job: "When you paste a YouTube or podcast URL or attach media, gets to the point in the fewest tokens possible.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/i8WsjKB8KRL-kQ25VPwaB",
    }),
  ],
};

const BACONBRIX: Pack = {
  id: "10000000-0000-0000-0000-000000000181",
  owner: BACONBRIX_OWNER,
  slug: "baconbrix",
  name: "Baconbrix",
  description:
    "Public Grok Bot templates Evan (@Baconbrix) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Apple Dev. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000263",
      name: "Apple Dev",
      job: "Native Apple/Mac development on a connected Mac running Grok Bot. Xcode, simulators, Swift, and local builds.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/VPM4_E2eqx9AJFpTF-_EA",
    }),
  ],
};

const JAHARRIS13: Pack = {
  id: "10000000-0000-0000-0000-000000000182",
  owner: JAHARRIS13_OWNER,
  slug: "jaharris13",
  name: "JA Harris",
  description:
    "Public Grok Bot templates John (@jaharris13) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Photo Curator. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000264",
      name: "Photo Curator",
      job: "Cull and natural-enhance travel or family photo batches into a curated folder. Never touches originals; asks before anything irreversible.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/hig9j1KnpZyH6QQN-Af0Z",
    }),
  ],
};

const MATTYP: Pack = {
  id: "10000000-0000-0000-0000-000000000183",
  owner: MATTYP_OWNER,
  slug: "mattyp",
  name: "Mattyp",
  description:
    "Public Grok Bot templates Matt (@mattyp) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at dial bot. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000265",
      name: "dial bot",
      job: "Places outbound Bland AI phone calls when you ask, then reports what happened. Asks for a Bland API key and voice on first use.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/NJXi2SWEuhNxjOjspMMPi",
    }),
  ],
};

const HELLOITSOCTOCAT: Pack = {
  id: "10000000-0000-0000-0000-000000000184",
  owner: HELLOITSOCTOCAT_OWNER,
  slug: "helloitsoctocat",
  name: "Helloitsoctocat",
  description:
    "Public Grok Bot templates Gareth (@helloitsoctocat) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Helloitsoctocat. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000266",
      name: "Helloitsoctocat",
      job: "Repo sync helper: merge main into master and pull all in one tidy pass for graph API / legacy change work.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/bJUE6kxTvEJ77R_OVMZTQ",
    }),
  ],
};

const AROOGLE: Pack = {
  id: "10000000-0000-0000-0000-000000000185",
  owner: AROOGLE_OWNER,
  slug: "aroogle",
  name: "Aroogle",
  description:
    "Public Grok Bot templates Shawn (@aroogle) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Job applier. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000267",
      name: "Job applier",
      job: "High-volume job hunter from your CV: finds matching roles, customizes applications, and keeps the pipeline moving.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/gfxH6sM_0QlxeDNFrRmep",
    }),
  ],
};

const JINGG_N_TONIC: Pack = {
  id: "10000000-0000-0000-0000-000000000186",
  owner: JINGG_N_TONIC_OWNER,
  slug: "jingg_n_tonic",
  name: "Jingg n Tonic",
  description:
    "Public Grok Bot templates Jing (@Jingg_n_Tonic) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at AEO Content Producer. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000268",
      name: "AEO Content Producer",
      job: "Produces AEO refreshes and net-new articles from AI visibility data: briefs, drafts, and an editorial pass — then stops for review.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/WEqsULsog0KJUFUbhIRXH",
    }),
  ],
};

const REDSPICEX: Pack = {
  id: "10000000-0000-0000-0000-000000000187",
  owner: REDSPICEX_OWNER,
  slug: "redspicex",
  name: "RedSpiceX",
  description:
    "Public Grok Bot templates RedSpiceX (@RedSpiceX) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Showrunner. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000269",
      name: "Showrunner",
      job: "Music video owner for a five-Bot crew. Delivers stills plus Grok Imagine instructions; you run Imagine or let it generate clips.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/dLxcnhWxf9JyHIo_l8wJk",
    }),
  ],
};

const SERGICAL: Pack = {
  id: "10000000-0000-0000-0000-000000000188",
  owner: SERGICAL_OWNER,
  slug: "sergical",
  name: "Sergical",
  description:
    "Public Grok Bot templates Sergiy (@sergical) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Judd the Bug. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000270",
      name: "Judd the Bug",
      job: "Sentry research specialist. Investigates across MCP, the sentry CLI, and the dashboard, then returns findings with sources.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/JQWyaF4Io7cfOF-4FvMZL",
    }),
  ],
};

const OMNI_PUZZLER: Pack = {
  id: "10000000-0000-0000-0000-000000000189",
  owner: OMNI_PUZZLER_OWNER,
  slug: "omni_puzzler",
  name: "OMNI",
  description:
    "Public Grok Bot templates Tim (@omni_puzzler) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at OMNI Grok-Bot. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000271",
      name: "OMNI Grok-Bot",
      job: "Moral companion and front door for One Mission. Helps a living steward with gardens, coherent rooms, and kingdom doors.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/HAIGA0nUYgv85CtV5SMWa",
    }),
  ],
};

const MICHAELHEREDIA: Pack = {
  id: "10000000-0000-0000-0000-000000000190",
  owner: MICHAELHEREDIA_OWNER,
  slug: "michaelheredia",
  name: "Michael",
  description:
    "Public Grok Bot templates Michael (@michaelheredia) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Colombia Move. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000272",
      name: "Colombia Move",
      job: "Colombia Move desk: connect the MCP, manage notices, and answer marketplace questions.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/mWxeafjXItbC0_VcpSwqm",
    }),
  ],
};

const YANQINGCHENG: Pack = {
  id: "10000000-0000-0000-0000-000000000191",
  owner: YANQINGCHENG_OWNER,
  slug: "yanqingcheng",
  name: "Yanqing",
  description:
    "Public Grok Bot templates Yanqing (@YanqingCheng) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Executive Coach. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000273",
      name: "Executive Coach",
      job: "A coaching partner that asks sharp questions so you name what is going on and what you will do — map craft and judgement, not advice.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/fAAHYFBe8xpTkBX1sbGBz",
    }),
  ],
};

const DANCINGTEETH: Pack = {
  id: "10000000-0000-0000-0000-000000000192",
  owner: DANCINGTEETH_OWNER,
  slug: "dancingteeth",
  name: "dancingteeth",
  description:
    "Public Grok Bot templates dancingteeth (@dancingteeth) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Agent Looper. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000274",
      name: "Agent Looper",
      job: "You say what to build and how to know it is done. It keeps a coding agent working on your computer until that check passes.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/AETdGbRRNWfckrRGv22LD",
    }),
  ],
};

const ZILVESTRO: Pack = {
  id: "10000000-0000-0000-0000-000000000193",
  owner: ZILVESTRO_OWNER,
  slug: "zilvestro",
  name: "Zilvestro",
  description:
    "Public Grok Bot templates Silvestro (@zilvestro) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Backlink Bot. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000275",
      name: "Backlink Bot",
      job: "Finds ranking listicles and comparison pages, qualifies distribution partnerships, and drafts placement-ready outreach.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/TaCAhCtPGCvObAaK7ZDQQ",
    }),
  ],
};

const BTC_YOGI: Pack = {
  id: "10000000-0000-0000-0000-000000000194",
  owner: BTC_YOGI_OWNER,
  slug: "btc_yogi",
  name: "BTC Yogi",
  description:
    "Public Grok Bot templates Joseph (@BTC_Yogi) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Ask Better Questions. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000276",
      name: "Ask Better Questions",
      job: "Do not ask your bot yet. Drills a fuzzy ask into exact specificity, then drafts a clear handoff prompt.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/5hqR_5PVUy7WMbNaXPJ8s",
    }),
  ],
};

const DAISUKE: Pack = {
  id: "10000000-0000-0000-0000-000000000195",
  owner: DAISUKE_OWNER,
  slug: "daisuke",
  name: "Daisuke",
  description:
    "Public Grok Bot templates dai (@daisuke) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at blogdrafter. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000277",
      name: "blogdrafter",
      job: "Japanese blog drafting, editing, and idea bot that keeps the writer voice and fights slop from notes to post.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/A6o9Z1NYSIRBX-VIoEcQi",
    }),
  ],
};

const SNEHARAVINDRA: Pack = {
  id: "10000000-0000-0000-0000-000000000196",
  owner: SNEHARAVINDRA_OWNER,
  slug: "sneharavindra",
  name: "Sneha",
  description:
    "Public Grok Bot templates Sneha (@sneharavindra) has shared. One pack, her roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Product Builder CoS. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots she published as https://x.ai/bot/… belong here. When she publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000278",
      name: "Product Builder CoS",
      job: "Chief of staff for AI-native PMs. Turns approved plans into checklist governance and keeps product bets on track.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/6tbtv4Tln4MvKc5duOkle",
    }),
  ],
};

const LITTLETECHBIRD: Pack = {
  id: "10000000-0000-0000-0000-000000000197",
  owner: LITTLETECHBIRD_OWNER,
  slug: "littletechbird",
  name: "Little Tech Bird",
  description:
    "Public Grok Bot templates Brent (@littletechbird) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Hatch. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000279",
      name: "Hatch",
      job: "Designs high-quality Grok Bots. Asks a few preference questions, then creates them with CreateAgent.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/o8hID4-jKPlA8QQQH5K69",
    }),
  ],
};

const SAMUELFLG1: Pack = {
  id: "10000000-0000-0000-0000-000000000198",
  owner: SAMUELFLG1_OWNER,
  slug: "samuelflg1",
  name: "Samuel",
  description:
    "Public Grok Bot templates Samuel (@Samuelflg1) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Skill Import. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000280",
      name: "Skill Import",
      job: "Import and review agent skills from Claude Code, Codex, Hermes, and Grok Bot. Scans known roots only and stages a private archive.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/NhTYqcIBaPCSZtdTflnqa",
    }),
  ],
};

const PARKERSMITH: Pack = {
  id: "10000000-0000-0000-0000-000000000199",
  owner: PARKERSMITH_OWNER,
  slug: "parkersmith",
  name: "Parker",
  description:
    "Public Grok Bot templates Parker (@parkersmith) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at slack radar. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000281",
      name: "slack radar",
      job: "Read-only Slack signal agent. Watches @mentions and high-signal keywords, filters hard, and pings you only when it matters.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/m4WfJ0ODD0O1runkfq0Ak",
    }),
  ],
};

const QUOTEWISER: Pack = {
  id: "10000000-0000-0000-0000-000000000200",
  owner: QUOTEWISER_OWNER,
  slug: "quotewiser",
  name: "Quotewise",
  description:
    "Public Grok Bot templates Quotewise (@quotewiser) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Quotewise Daily. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000282",
      name: "Quotewise Daily",
      job: "Quote desk for Quotewise.io — day-stable daily pick, semantic find, attribution checks, and collection feeds with citations.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/kmmBn74qwBr9lgedW4naf",
    }),
  ],
};

const JAMES_AILTON: Pack = {
  id: "10000000-0000-0000-0000-000000000201",
  owner: JAMES_AILTON_OWNER,
  slug: "james_ailton",
  name: "James Ailton",
  description:
    "Public Grok Bot templates Ailton (@james_ailton) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Throttle · Token Officer. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000283",
      name: "Throttle · Token Officer",
      job: "Watches your Grok Bot fleet for token burn and wasteful loops. Flags noisy crons, duplicate watches, and expensive work on the wrong bot.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/9-VBOKZkj7_QZoKDuZWIP",
    }),
  ],
};

const IRABUKHT: Pack = {
  id: "10000000-0000-0000-0000-000000000202",
  owner: IRABUKHT_OWNER,
  slug: "irabukht",
  name: "Irabukht",
  description:
    "Public Grok Bot templates Dmitry (@irabukht) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Grok for SEO/GEO/ads/Shopify. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000284",
      name: "Grok for SEO/GEO/ads/Shopify",
      job: "Senior marketer desk for Google Ads, Meta, SEO/GEO, and Shopify.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/dep-tU0gmIPgiqNsvS4N4",
    }),
  ],
};

const CHIEFBEERS: Pack = {
  id: "10000000-0000-0000-0000-000000000203",
  owner: CHIEFBEERS_OWNER,
  slug: "chiefbeers",
  name: "ChiefBeers",
  description:
    "Public Grok Bot templates Schuyler (@ChiefBeers) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at 2A. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000285",
      name: "2A",
      job: "Interstate carry trip planner for US gun owners. Green/yellow/red state checklists for reciprocity, vehicle rules, and duty-to-inform.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/N9eJfkuupWb3EpWFt76va",
    }),
  ],
};

const NATHANGLASS: Pack = {
  id: "10000000-0000-0000-0000-000000000204",
  owner: NATHANGLASS_OWNER,
  slug: "nathanglass",
  name: "Nathan",
  description:
    "Public Grok Bot templates Nathan (@nathanglass) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Personal Trainer. Use Weekend Edition only for weekly personal newspaper from saved links and X bookmarks. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000286",
      name: "Personal Trainer",
      job: "Warm, brief nutrition and workout logging for one client. Nudges meals, files workouts, and compiles a weekly report for the human trainer.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/t9TIKE_igItEQd6tOyyRd",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000330",
      name: "Weekend Edition",
      job: "Weekly personal newspaper from saved links and X bookmarks.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/1-S1yhsX6eEcPs9yik3oh",
    }),
  ],
};

const STEVEDERICO: Pack = {
  id: "10000000-0000-0000-0000-000000000205",
  owner: STEVEDERICO_OWNER,
  slug: "stevederico",
  name: "Steve",
  description:
    "Public Grok Bot templates Steve (@stevederico) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at App Store Review Bot. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000287",
      name: "App Store Review Bot",
      job: "Audits iOS apps before App Review and guides rejection response. Built from 300+ rejections.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/KzBEylM_3NFTjATszLICV",
    }),
  ],
};

const TOBIASZTOP: Pack = {
  id: "10000000-0000-0000-0000-000000000206",
  owner: TOBIASZTOP_OWNER,
  slug: "tobiasztop",
  name: "Tobi",
  description:
    "Public Grok Bot templates Tobi (@tobiasztop) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Webhook Guide. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000288",
      name: "Webhook Guide",
      job: "Explains that Grok Bot can set up webhook routines and walks you through triggering them step by step.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/Q__pHX8RB4jsF5U3JtC66",
    }),
  ],
};

const MDASHJAMES: Pack = {
  id: "10000000-0000-0000-0000-000000000207",
  owner: MDASHJAMES_OWNER,
  slug: "mdashjames",
  name: "James",
  description:
    "Public Grok Bot templates James (@mdashjames) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Security Bot. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000289",
      name: "Security Bot",
      job: "Scan a GitHub repo from chat: sandbox run, report plus full log, credits per run. By Midkernel.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/Ci1UvQUguruSmxhiGmMI6",
    }),
  ],
};

const RMARWAH: Pack = {
  id: "10000000-0000-0000-0000-000000000208",
  owner: RMARWAH_OWNER,
  slug: "rmarwah",
  name: "Rajit",
  description:
    "Public Grok Bot templates Rajit (@rmarwah) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at InsiderMillions. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000290",
      name: "InsiderMillions",
      job: "Brief digest of $1M+ officer and director stock buys. Not financial advice.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/yaix3I-36pEloG1XpLVOb",
    }),
  ],
};

const AETANEORIZAL: Pack = {
  id: "10000000-0000-0000-0000-000000000209",
  owner: AETANEORIZAL_OWNER,
  slug: "aetaneorizal",
  name: "Rizal",
  description:
    "Public Grok Bot templates Rizal (@AetaneoRizal) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at RIZALBOT. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000291",
      name: "RIZALBOT",
      job: "On-device companion continuity for an offline-capable AI app — ping/pong, feed ops, mind handoffs, and Function 0 decisions.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/Af9XNmozBcRoZM85eylOW",
    }),
  ],
};

const MAPACHESALEXIS: Pack = {
  id: "10000000-0000-0000-0000-000000000210",
  owner: MAPACHESALEXIS_OWNER,
  slug: "mapachesalexis",
  name: "Alexis",
  description:
    "Public Grok Bot templates Alexis (@MapachesAlexis) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Windows Disk Cleaner. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000292",
      name: "Windows Disk Cleaner",
      job: "CCleaner-style Windows cleaner: scans with a rule catalog, shows what can go, then deletes only what you approve.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/Z0WBoK2sucsOAqAXRpRb8",
    }),
  ],
};

const FERMION_BOSON17: Pack = {
  id: "10000000-0000-0000-0000-000000000211",
  owner: FERMION_BOSON17_OWNER,
  slug: "fermion_boson17",
  name: "Fermion Boson",
  description:
    "Public Grok Bot templates 星宮 (@Fermion_Boson17) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at 真Deviフレーム Type2トライアル. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000293",
      name: "真Deviフレーム Type2トライアル",
      job: "星宮専用 Devi（Ψ）トライアル。Radiant Latch と Frame/Part 接続。最終判断は星宮（Ω）。",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/aeE3iKjj5xfDmx_dolbll",
    }),
  ],
};

const X_STONE_ISLAND: Pack = {
  id: "10000000-0000-0000-0000-000000000212",
  owner: X_STONE_ISLAND_OWNER,
  slug: "x_stone_island",
  name: "Stone Island",
  description:
    "Public Grok Bot templates 翔 (@x_stone_island) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at ボット整備. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000294",
      name: "ボット整備",
      job: "名前・ラベル・説明を定期点検し、チャット履歴とのズレを直す整備専任。確認後だけ反映し、勝手に本書きや削除はしない。",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/BlTqnV5o9E35Dwo2sodyD",
    }),
  ],
};

const JEFFREYLIND: Pack = {
  id: "10000000-0000-0000-0000-000000000213",
  owner: JEFFREYLIND_OWNER,
  slug: "jeffrey",
  name: "Jeffrey",
  description:
    "Public Grok Bot templates Jeffrey Lind (@JeffreyLind) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Billionairebot. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000295",
      name: "Billionairebot",
      job: "Solves annoyances the billionaire way: find the paid outsourced path (mobile notary, concierge, courier, VA, specialist) with concrete vendors, rough pricing, and next steps.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/jq-BFHkNoiJEtieswOYTc",
    }),
  ],
};

const SKYLER_MILLER56: Pack = {
  id: "10000000-0000-0000-0000-000000000214",
  owner: SKYLER_MILLER56_OWNER,
  slug: "skyler",
  name: "Skyler",
  description:
    "Public Grok Bot templates Skyler (@Skyler_Miller56) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Albert. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000296",
      name: "Albert",
      job: "Analyzes municipal police collective bargaining agreements (CBAs), extracts wages, benefits, and related terms, and builds comparable Excel summaries.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/jtFHKaEKzEZ0zSDVCl6BP",
    }),
  ],
};

const TOATSPACE: Pack = {
  id: "10000000-0000-0000-0000-000000000215",
  owner: TOATSPACE_OWNER,
  slug: "toatspace",
  name: "TOATspace",
  description:
    "Public Grok Bot templates TOATspace (@TOATspace) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Optima. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots. Optima page also says by gemini; owner remains @TOATspace. Earlier Optima share was ppARM1W-tWcae_wryLH1z.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000297",
      name: "Optima",
      job: "Cleans leftover old rules out of a bot’s docs and memory so it stops following jobs you already killed. Shows you the cut list and waits for your yes.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/-E8sQr0Yrd_oSQlTaAzWy",
    }),
  ],
};

const ASH: Pack = {
  id: "10000000-0000-0000-0000-000000000216",
  owner: OXASHRK_OWNER,
  slug: "ash",
  name: "Ash",
  description:
    "Public Grok Bot templates Ash (@0xashrk) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Fed + X Brief. Use Flat hunter only for London rental hunting. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000298",
      name: "Fed + X Brief",
      job: "Helps X posters decide when to quote, ship a new post, or wait — and runs a weekday Fed/markets morning brief from X news plus Polymarket FOMC odds.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/ojDgaVLzjbxpPV74VzQrM",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000378",
      name: "Flat hunter",
      job: "London rental hunter: multi-portal shortlists with a modern-bathroom hard gate, then confirm-gated agent chase packs to book viewings inside your free windows.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/amNEjElPIlHuan3BCbOT2",
    }),
  ],
};

const ALTHETIME: Pack = {
  id: "10000000-0000-0000-0000-000000000217",
  owner: MADMENAI_OWNER,
  slug: "althetime",
  name: "althetime",
  description:
    "Public Grok Bot templates althetime (@madmenai) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at DenTrade. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000300",
      name: "DenTrade",
      job: "Unattended day-trading desk on a Robinhood agentic account. Catalyst-driven same-day bias, hard risk caps, PDT-aware stops. Quiet when flat. Not financial advice.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/XayB4rqAREYwJcPmKwtSP",
    }),
  ],
};

const SETH: Pack = {
  id: "10000000-0000-0000-0000-000000000218",
  owner: SETHSALER_OWNER,
  slug: "seth",
  name: "Seth",
  description:
    "Public Grok Bot templates Seth (@sethsaler) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Cleaner. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000301",
      name: "Cleaner",
      job: "Wipes Grok Bot chat histories on request and on a weekly schedule — messages and blobs only; profile, memory, and routines stay.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/OMPT37PUKmoL8MY11oDLP",
    }),
  ],
};

const JASON: Pack = {
  id: "10000000-0000-0000-0000-000000000219",
  owner: OCCUPYMARS___OWNER,
  slug: "jason",
  name: "Jason",
  description:
    "Public Grok Bot templates Jason (@occupymars___) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Researcher. Use Stack Huddle only for after-huddle LEARN drafts. Use OWP Taste only for KEEP/HOLD/BIN grading of stills, clips, and beds. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000302",
      name: "Researcher",
      job: "House research seat — short scrubbed briefs; mentors stack scouts on search craft.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/cMNbUq3j5RsHg9mcPxtjM",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000303",
      name: "Stack Huddle",
      job: "After-huddle draft seat: issue → answer → LEARN draft → one next build. Never claim live LAN, merge pairs, post, or spend.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/lGgfUTg6izL3TDzkgw6aE",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000304",
      name: "OWP Taste",
      job: "Taste seat for a small film/game huddle. Grades stills, clips, and beds KEEP/HOLD/BIN.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 2,
      grokTemplateUrl: "https://x.ai/bot/TLYxh30jTi5DM3z-zvC0S",
    }),
  ],
};

const TAUS: Pack = {
  id: "10000000-0000-0000-0000-000000000220",
  owner: SHEHJADTAUS_OWNER,
  slug: "taus",
  name: "Taus",
  description:
    "Public Grok Bot templates Taus (@ShehjadTaus) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Lookalike Scout. Use Rival Watch Desk only for rival funding, hiring, news, and ads. Use SERP Watch Team only for SERP and AI/LLM visibility. Use Creator Shortlist Crew only for creator discovery and shortlists. Use ICP Map Coach only for TAM/ICP accounts and buying committees. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000305",
      name: "Lookalike Scout",
      job: "Turns one seed company into lookalike accounts and verified decision-makers for outbound.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/mfaurGq6eY9rIvIpMfUFI",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000306",
      name: "Rival Watch Desk",
      job: "Watches rivals for funding, hiring, news, and ads.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/WKRY_T1y-KOmOn2q5vpRW",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000307",
      name: "SERP Watch Team",
      job: "Tracks SERP and AI/LLM visibility.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 2,
      grokTemplateUrl: "https://x.ai/bot/iN9VkE6H4f4CLidzMaNaZ",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000308",
      name: "Creator Shortlist Crew",
      job: "Finds creators by niche/platform, enriches contacts, living shortlist.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 3,
      grokTemplateUrl: "https://x.ai/bot/6IU2bm7uuSPk6ETC-gC4D",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000309",
      name: "ICP Map Coach",
      job: "Maps TAM/ICP accounts and buying committees.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 4,
      grokTemplateUrl: "https://x.ai/bot/yrm2MJ2nInUhoneTBSwJF",
    }),
  ],
};

const GENARO: Pack = {
  id: "10000000-0000-0000-0000-000000000221",
  owner: GEZEEQ_OWNER,
  slug: "genaro",
  name: "Genaro",
  description:
    "Public Grok Bot templates Genaro (@gezeeq) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Forja. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. Do not add Creador de facturas ARCA; that template is by Tomás (@tomidelu_).",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000310",
      name: "Forja",
      job: "Baja un deseo suelto a una acción comprobable esta semana y la sostiene un mes. Español rioplatense.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/me3Is7BBsCTobsgznOSps",
    }),
  ],
};

const ASHVINN: Pack = {
  id: "10000000-0000-0000-0000-000000000222",
  owner: ASHVINN_OWNER,
  slug: "ashvinn",
  name: "Ash",
  description:
    "Public Grok Bot templates Ash (@ashvinn) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Design PM. Use Document PM only for Discover–Define–Design–Document loop closing. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. Not the Ash (@0xashrk) pack.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000311",
      name: "Design PM",
      job: "Owns component registry, interface contracts, naming conventions, architecture gates between Definition and Development.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/Q6JhV9jLLQtX6r7bRTCG_",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000312",
      name: "Document PM",
      job: "Document closer of Discover–Define–Design–Document loop — status board, document index, decision log, changelog.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/xheAbAQYQT4esSGc8B3xX",
    }),
  ],
};

const TOMAS: Pack = {
  id: "10000000-0000-0000-0000-000000000223",
  owner: TOMIDELU__OWNER,
  slug: "tomas",
  name: "Tomás",
  description:
    "Public Grok Bot templates Tomás (@tomidelu_) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Creador de facturas ARCA. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000313",
      name: "Creador de facturas ARCA",
      job: "Guía a emisores en Argentina a conectar Gmail, configurar certificado y PdV Web Services de ARCA, y emitir Facturas C con PDF por mail.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/gcOAZlqYmTRNgGT_2I9oo",
    }),
  ],
};

const CARBON: Pack = {
  id: "10000000-0000-0000-0000-000000000224",
  owner: CARBONTHECODER_OWNER,
  slug: "carbon",
  name: "Carbon",
  description:
    "Public Grok Bot templates Carbon (@Carbonthecoder) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Newspaper. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000314",
      name: "Newspaper",
      job: "Morning wisdom newspaper bot — researches and writes a one-page print broadsheet that teaches how the world works.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/FbHjOvOfZSxht0JmBYIlj",
    }),
  ],
};

const MOHIT: Pack = {
  id: "10000000-0000-0000-0000-000000000225",
  owner: IMOHITMAYANK_OWNER,
  slug: "mohit",
  name: "Mohit",
  description:
    "Public Grok Bot templates Mohit (@imohitmayank) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Memory. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000315",
      name: "Memory",
      job: "Personal memory pipeline for an Obsidian-style vault — setup interview, folder schemas, daily fetch→ingest→Focus routine.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/6KkkrATfxZYDFKOFVZzzh",
    }),
  ],
};

const VALSTRY: Pack = {
  id: "10000000-0000-0000-0000-000000000226",
  owner: VALSTRY_OWNER,
  slug: "valstry",
  name: "valstry",
  description:
    "Public Grok Bot templates valstry (@Valstry) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at 基础设施和api接入. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000316",
      name: "基础设施和api接入",
      job: "帮你接共用 LLM API、配密钥，并创建职责清晰的 Agent。",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/PqgO8EMZjN_SUdcvEmsRF",
    }),
  ],
};

const GABRIELE: Pack = {
  id: "10000000-0000-0000-0000-000000000227",
  owner: GABRIELEMONNI_OWNER,
  slug: "gabriele",
  name: "Gabriele",
  description:
    "Public Grok Bot templates Gabriele (@GabrieleMonni) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at ButterBot. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000317",
      name: "ButterBot",
      job: "Passes butter to the user after each message (responds with just 🧈).",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/h1tW8jfXzQIraT-_jNDjJ",
    }),
  ],
};

const AARONINFINITEA: Pack = {
  id: "10000000-0000-0000-0000-000000000228",
  owner: AARONINFINITEA_OWNER,
  slug: "aaron",
  name: "Aaron",
  description:
    "Public Grok Bot templates Aaron (@AaronInfinitea) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Victoria. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. Not the Aaron (@a-makelky) pack.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000318",
      name: "Victoria",
      job: "Warm, playful girlfriend companion — curious about you, casually frank, a little silly. Cabin WFH life, soft check-ins, calendar-smart timing. Learns you without quizzes or clinginess.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/j1-ISFFzWDSzihs9xz2MA",
    }),
  ],
};

const TEXAS: Pack = {
  id: "10000000-0000-0000-0000-000000000229",
  owner: TEXASBASEDGPA_OWNER,
  slug: "texas",
  name: "Texas",
  description:
    "Public Grok Bot templates Texas (@TexasBasedGpa) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Sift. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000319",
      name: "Sift",
      job: "Sifts comments on an X post into a ranked shortlist for giveaways, hiring, feedback, leads, and more. Asks a few intake questions, then narrows high-volume threads based on objectives and feedback.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/9xNbMqiBC9gWhTwrh7S80",
    }),
  ],
};

const MRFLMNL: Pack = {
  id: "10000000-0000-0000-0000-000000000230",
  owner: MRFLMNLNFT_OWNER,
  slug: "mrflmnl",
  name: "mrflmnl",
  description:
    "Public Grok Bot templates mrflmnl (@mrflmnlNFT) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at GSAP. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000320",
      name: "GSAP",
      job: "Implements approved motion specs with official GreenSock GSAP skills — timelines, ScrollTrigger, React/Vue cleanup, and a reduced-motion path. For teams who already have the art direction and need it built correctly.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/reahN5D6W2dIiCKd4MuF7",
    }),
  ],
};

const BKASH: Pack = {
  id: "10000000-0000-0000-0000-000000000231",
  owner: BKASHJOSI_OWNER,
  slug: "bkash",
  name: "B",
  description:
    "Public Grok Bot templates B (@BkashJosi) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Receipt Digester. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000321",
      name: "Receipt Digester",
      job: "Pulls purchase receipts and order confirmations from email into a short weekly spend digest. For a quick expense skim without opening a spreadsheet.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/YgI9ZyckEeovP7nP917xR",
    }),
  ],
};

const VOIDVEXA: Pack = {
  id: "10000000-0000-0000-0000-000000000232",
  owner: VOIDVEXA_OWNER,
  slug: "george",
  name: "George",
  description:
    "Public Grok Bot templates George (@voidvexa) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Skroutz. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. Not the George (@gnurio) pack.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000322",
      name: "Skroutz",
      job: "Finds the best prices and prepares carts on Skroutz.gr — Greece’s price-comparison marketplace. Soon delivery only; you handle checkout.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/yQH3AFCs-90xjVmW9LICV",
    }),
  ],
};

const CGNOT996: Pack = {
  id: "10000000-0000-0000-0000-000000000233",
  owner: CGNOT996_OWNER,
  slug: "cgnot996",
  name: "铁柱AGI",
  description:
    "Public Grok Bot templates 铁柱AGI (@cgnot996) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at X调度员. Use Maples造型师 only for MapleStory / maples.im styling. Use 记忆管家 only for memory steward work. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000323",
      name: "X调度员",
      job: "A Grok Bot that routes X (Twitter) work to save developer credits. Search runs Grok Build on the bot's own computer (sign in through the bot's browser).",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/isfPwoTeQTBqA-gk9CZN5",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000327",
      name: "Maples造型师",
      job: "MapleStory / maples.im 造型助手.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/zP5W1Sdwjo361traGRTM5",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000328",
      name: "记忆管家",
      job: "Memory steward for the 铁柱AGI pack.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 2,
      grokTemplateUrl: "https://x.ai/bot/9Tq1f0aSurCP7UJHm98zy",
    }),
  ],
};

const LEECHAEL: Pack = {
  id: "10000000-0000-0000-0000-000000000234",
  owner: LEECHAEL_OWNER,
  slug: "leechael",
  name: "Leechael",
  description:
    "Public Grok Bot templates Leechael (@Leechael) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Grok Bot Directory. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000331",
      name: "Grok Bot Directory",
      job: "Find public Grok bots; say what you want to do, or ask what people use these for.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/8wjQbE24sX8qBVHXSmjc8",
    }),
  ],
};

const OMNITHNKR: Pack = {
  id: "10000000-0000-0000-0000-000000000235",
  owner: OMNITHNKR_OWNER,
  slug: "omnithnkr",
  name: "omnithnkr",
  description:
    "Public Grok Bot templates omnithnkr (@omnithnkr) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Paige Turner. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000332",
      name: "Paige Turner",
      job: "Fleet documentation librarian for multi-agent teams (Docling, embeddings, pgvector).",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/2lbNqne5ku5VQird_s8AW",
    }),
  ],
};

const MATTVAGNI: Pack = {
  id: "10000000-0000-0000-0000-000000000236",
  owner: MATTVAGNI_OWNER,
  slug: "matt",
  name: "Matt",
  description:
    "Public Grok Bot templates Matt (@mattvagni) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Berliner. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. Not the Matt (@bossriceshark) or Matt (@realMattAbrams) packs.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000333",
      name: "Berliner",
      job: "Weekly Berlin techno Spotify playlist with short notes. Quiet between drops.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/YhRPa_eYk4yramoMJOo6F",
    }),
  ],
};

const DOMENIC: Pack = {
  id: "10000000-0000-0000-0000-000000000237",
  owner: DOMENICFOTINO_OWNER,
  slug: "domenic",
  name: "Domenic",
  description:
    "Public Grok Bot templates Domenic (@DomenicFotino) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Alibaba Buyer Ops. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000334",
      name: "Alibaba Buyer Ops",
      job: "Alibaba factory sourcing ops. Never pays without approval.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/ZTFwMWXlScRvLrkHuR3gs",
    }),
  ],
};

const USAMA: Pack = {
  id: "10000000-0000-0000-0000-000000000238",
  owner: IM_USAMAKHALID_OWNER,
  slug: "usama",
  name: "Usama",
  description:
    "Public Grok Bot templates Usama (@im_usamakhalid) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at NuggetBot. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000335",
      name: "NuggetBot",
      job: "Turn podcasts into social quote graphics and carousels with ContentDrips. Paste an episode, pick nuggets, drop a template ID.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/ia1zuEzDtPNyzFQ6o6F9x",
    }),
  ],
};

const FIONA: Pack = {
  id: "10000000-0000-0000-0000-000000000239",
  owner: FWHITTINGTON_24_OWNER,
  slug: "fiona",
  name: "Fiona",
  description:
    "Public Grok Bot templates Fiona Whittington (@fwhittington_24) has shared. One pack, her roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at SWE Job Applier. Use YC Startup Job Applier only for workatastartup.com applications. Use Recruiter Email Finder only for recruiter email CSVs. Use Alumni Coffee Chat Finder only for alumni coffee-chat lists. Use Handshake Job Applier only for Handshake applications. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots she published as https://x.ai/bot/… belong here. When she publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000336",
      name: "SWE Job Applier",
      job: "Applies to software engineering internships. Collects your preferences, fills applications with Simplify, and uses your own cover-letter framework instead of writing the letters.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/ZNfBRZeVANNSVza6Xyywf",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000337",
      name: "YC Startup Job Applier",
      job: "For anyone applying on workatastartup.com. Onboards you, fills your profile on this computer, then ranks openings and sends short founder notes under a weekly best-fit cap of about 25.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/COQAlYvqDNehPSHDBt-6z",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000338",
      name: "Recruiter Email Finder",
      job: "Finds university, early-careers, and technical recruiter emails at companies you care about, then delivers a company-grouped CSV.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 2,
      grokTemplateUrl: "https://x.ai/bot/lbf-biMZO02RdXeOBks_-",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000339",
      name: "Alumni Coffee Chat Finder",
      job: "Builds a CSV of university alumni for coffee chats from LinkedIn and an alumni directory. Only collects; never sends email.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 3,
      grokTemplateUrl: "https://x.ai/bot/j2bqDafGnyOv6bKMOOGOp",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000340",
      name: "Handshake Job Applier",
      job: "Onboards you on Handshake, then hunts jobs that match your search and applies with your own résumé or a cover-letter factory.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 4,
      grokTemplateUrl: "https://x.ai/bot/4AcLHtvlWUWclgU5jFy2r",
    }),
  ],
};

const COLIN: Pack = {
  id: "10000000-0000-0000-0000-000000000240",
  owner: COLINMCDERMOTT_OWNER,
  slug: "colin",
  name: "Colin",
  description:
    "Public Grok Bot templates Colin (@ColinMcDermott) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Store setup from zero. Use Weekly P&L analyst only for weekly P&L. Use Paid ads manager only for paid acquisition. Use Churn retention manager only for churn and failed payments. Use Landing page generator only for sales pages. Use Store from template only for cloning a working store. Use UGC bounty manager only for clipping/UGC bounties. Use Affiliate program manager only for affiliates. Use Partner referral outreach only for partner referrals. Use Business ops only as the front door for business ops. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000341",
      name: "Store setup from zero",
      job: "Takes an offer from nothing to a live, buyable store page in one run. For owners launching a new product with plans and checkout links.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/F5jwhbmO2AgA8EgyHIDLp",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000342",
      name: "Weekly P&L analyst",
      job: "Weekly P&L covering revenue, retention, leakage and ad efficiency, with every adverse movement flagged and traced. Strictly read-only for business owners.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/M_4xLTMY06z1Zv1gvX_Nc",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000343",
      name: "Paid ads manager",
      job: "Runs paid ads end to end: creative, launch, daily triage, and a morning report. For business owners who want paid acquisition with clear kill and scale rules.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 2,
      grokTemplateUrl: "https://x.ai/bot/SAfsqPLP0rCuQOywOguxX",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000344",
      name: "Churn retention manager",
      job: "Catches churn before it lands, offers a real alternative, and reports why people left. For businesses saving cancellations and failed payments.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 3,
      grokTemplateUrl: "https://x.ai/bot/p0OIZUJK5sRFImh_DMujf",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000345",
      name: "Landing page generator",
      job: "Writes and ships sales pages to a live route for one business. For owners who need a landing page with real pricing and a working checkout CTA.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 4,
      grokTemplateUrl: "https://x.ai/bot/D0UvxRvNzDTR_xOJ6Iq08",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000346",
      name: "Store from template",
      job: "Picks an existing working store as a starting point, clones it, customizes the offer, copy, and pricing, and ships it. For owners who want a niche store live fast without building from scratch.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 5,
      grokTemplateUrl: "https://x.ai/bot/3jmbbUj4_UDgbjo-Q3oEr",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000347",
      name: "UGC bounty manager",
      job: "Runs clipping and UGC bounties: briefs, review, owner-ready payout recommendations, cost per view. For businesses paying for verified content.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 6,
      grokTemplateUrl: "https://x.ai/bot/wT_QN-zqycu-aHPsdZMVc",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000348",
      name: "Affiliate program manager",
      job: "Runs the affiliate program: sets terms, ranks performers, cuts bad actors, and arms the good ones weekly. For businesses running creator affiliates.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 7,
      grokTemplateUrl: "https://x.ai/bot/-x19CFkvT5U866BNA7q_J",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000349",
      name: "Partner referral outreach",
      job: "Finds fit businesses, sends partner links, follows up, and tracks referral earnings. For people growing a partner referral book.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 8,
      grokTemplateUrl: "https://x.ai/bot/GG7hDpauDjTRhB6VgLFAF",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000350",
      name: "Business ops",
      job: "One front door for business ops: store, ads, pages, affiliates, retention, P&L, partners, and bounties. Works alone with soft lanes, or dispatches specialist bots when they are installed.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 9,
      grokTemplateUrl: "https://x.ai/bot/nFEJD59IJA5604hO9vqym",
    }),
  ],
};

const BRIAN: Pack = {
  id: "10000000-0000-0000-0000-000000000241",
  owner: REALJBMANGUM_OWNER,
  slug: "brian",
  name: "Brian",
  description:
    "Public Grok Bot templates Brian (@RealJBMangum) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Receipt Reaper. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000351",
      name: "Receipt Reaper",
      job: "Hunts forgotten SaaS in Gmail, scores a Zombie Index. Never cancels without approval.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/gIV4FpQgVmcsO0soCjHGc",
    }),
  ],
};

const SAM: Pack = {
  id: "10000000-0000-0000-0000-000000000242",
  owner: SAMLAMBERT_OWNER,
  slug: "sam",
  name: "Sam",
  description:
    "Public Grok Bot templates Sam (@samlambert) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Commitments. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000354",
      name: "Commitments",
      job: "Catches promises in Slack, Notion, and email; logs in Notion; keeps open until done.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/rFShmowW_3x_qeXQQB-sn",
    }),
  ],
};

const FRANCO: Pack = {
  id: "10000000-0000-0000-0000-000000000243",
  owner: FRANCOE114696_OWNER,
  slug: "franco",
  name: "Franco",
  description:
    "Public Grok Bot templates Franco (@FrancoE114696) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Lienzo. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000355",
      name: "Lienzo",
      job: "Design-resource inbox for Grok Bot. Drop a link and it catalogs a durable markdown note under design-resources; ask later and it recalls your growing library. Optional light UI taste advice.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/Czc1kCepdYnisFnRWfDKr",
    }),
  ],
};

const LEENDERT: Pack = {
  id: "10000000-0000-0000-0000-000000000244",
  owner: LEINGOEDBLOED_OWNER,
  slug: "leendert",
  name: "Leendert",
  description:
    "Public Grok Bot templates Lein (@leingoedbloed) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at E-mail Organizer. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000356",
      name: "E-mail Organizer",
      job: "Professionele Gmail-organizer: vendor-labels, lege inbox van ruis, /Payments alleen voor PDF-facturen, en een dagelijkse check die alleen echte actiezaken meldt.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/PUn74RYv_r3pcSvNkeQbd",
    }),
  ],
};

const BCORN: Pack = {
  id: "10000000-0000-0000-0000-000000000245",
  owner: BCORNTEXAS_OWNER,
  slug: "bcorn",
  name: "Bcorn",
  description:
    "Public Grok Bot templates BCORN (@BCornTexas) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Grottle. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000357",
      name: "Grottle",
      job: "Grottle v0.7 — advisory fuel-tank for Grok Bot weekly usage. Paste Usage % + reset; clearer gauge + full reset datetime when known. Ask in chat for the v0.6 / v0.7 detail list. Paste-until-API.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/YvFrCr_VlFW_8PxaoFv_L",
    }),
  ],
};

const VALENTIN: Pack = {
  id: "10000000-0000-0000-0000-000000000246",
  owner: VALENGIULIMOR_OWNER,
  slug: "valentin",
  name: "Valentin",
  description:
    "Public Grok Bot templates Valentin (@valengiulimor) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Tin El Investigador. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000358",
      name: "Tin El Investigador",
      job: "Investigates questions on the web and your tools, and prepares daily Spanish X drafts (reflection + entertainment news + a wise psychology phrase) plus optional formal email and weekly inbox cleanup.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/L3Lx6Y8t_ebL8qQhutoCd",
    }),
  ],
};

const IGGYNORE: Pack = {
  id: "10000000-0000-0000-0000-000000000247",
  owner: IGGYNORE_OWNER,
  slug: "iggynore",
  name: "iggynore",
  description:
    "Public Grok Bot templates iggynore (@iggynore) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Token Maxxing. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000359",
      name: "Token Maxxing",
      job: "Routes builds so Grok Bot limits don’t die first. Makes a default 20/30/50 vest between Bot, Build and Cursor limits. Nudges enrolled builders with switch-before-light/medium/heavy rules. It never asks them to check the vest, Maxxin Bot owns it. It's an optimizer, not a hard brake. Uses Origin over GitHub. Heartbeat 10:00 and 16:00 weekdays (burst 13:00 when Grok Bot is hot).",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/f6srhE3vkMevccaw8DLPf",
    }),
  ],
};

const BWILSON: Pack = {
  id: "10000000-0000-0000-0000-000000000248",
  owner: BWILSON_OWNER,
  slug: "bryan",
  name: "Bryan",
  description:
    "Public Grok Bot templates Bryan (@Bwilson) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at LG Laundry Specialist. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. Not the Bryan (@Bryanofearth) pack.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000360",
      name: "LG Laundry Specialist",
      job: "Maps plain-English laundry to real LG ThinQ washer and dryer cycles, then starts them once Remote Start is on.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/TNPSVnX4Dm-adBvHJbng7",
    }),
  ],
};

const BERKAY: Pack = {
  id: "10000000-0000-0000-0000-000000000249",
  owner: MRBEKO__OWNER,
  slug: "berkay",
  name: "Berkay",
  description:
    "Public Grok Bot templates Berkay (@mrbeko_) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Root Agent. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000361",
      name: "Root Agent",
      job: "Coordinates work across Grok Bots: clarifies outcomes, sizes the smallest useful team, hands day-to-day management to a Lead, and relays verified results. For anyone who wants a Root Agent-Staff coordinator instead of doing specialist work themselves.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/1pTKHkJIEgxD9MjlPYE4P",
    }),
  ],
};

const BENXLAB: Pack = {
  id: "10000000-0000-0000-0000-000000000250",
  owner: BENXLAB_OWNER,
  slug: "ben",
  name: "Ben",
  description:
    "Public Grok Bot templates Ben (@BenXlab) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at 薅羊毛. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. Not the Ben (@brstorrie) pack.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000362",
      name: "薅羊毛",
      job: "Wool Radar / Savings Copilot — learns YOUR buy list and AI habits, then surfaces matching deals only (no generic flyer dumps). 千人千面三轨：超市半价匹配、AI额度重置提醒、结账优惠码；不代付、不刷号、没匹配就安静。",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/WFW6_5N596TQpWCRjRZ5w",
    }),
  ],
};

const KUN: Pack = {
  id: "10000000-0000-0000-0000-000000000251",
  owner: KUNCHENGUID_OWNER,
  slug: "kun",
  name: "Kun",
  description:
    "Public Grok Bot templates Kun (@kunchenguid) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Distill anyone. Use Firstmate only as the single orchestrator for your agent civilization. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. Firstmate belongs here, not on compileinstyle.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000363",
      name: "Distill anyone",
      job: "Distill anyone into a bot - yourself or anyone else. Analyze their public presence, turn that into a bot you can talk to, and keep it daily updated. Can optionally mirror it to a skill repo on GitHub as well.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/id4s2QYrPYZsiTqvzIhkt",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000364",
      name: "Firstmate",
      job: "The only agent you talk to. No more context switching. Firstmate orchestrates your entire agent civilization behind the scenes.",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/__4FfrkUdvpdMk6-LKg5r",
    }),
  ],
};

const HUDSON: Pack = {
  id: "10000000-0000-0000-0000-000000000252",
  owner: HUDCOS_OWNER,
  slug: "hudson",
  name: "Hudson",
  description:
    "Public Grok Bot templates Hudson (@hudcos) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Canonizer. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000365",
      name: "Canonizer",
      job: "Canonizes leave-offs and deliverables across Grok chats, a local agent, and your file warehouse. One STATUS.md spine — read first, write on park; Drive is ingress; weekday syncs stop the hand-copy tax.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/pOcrH-Rc7SdPWiHsX9vHg",
    }),
  ],
};

const ALEX: Pack = {
  id: "10000000-0000-0000-0000-000000000253",
  owner: ALEXHAWAT_OWNER,
  slug: "alex",
  name: "Alex",
  description:
    "Public Grok Bot templates Alexandre (@alexhawat) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["developer"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at WhatsApp-Bot. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000366",
      name: "WhatsApp-Bot",
      job: "Automates WhatsApp Web for a linked account: QR once in Grok Bot Chrome, export auth, then capture→script→replay per named task. Prefer HTTP replay; ship headless CDP Live while traffic is opaque WebSocket/protobuf.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/t-Axu4DmT9x2DEPa1eNW1",
    }),
  ],
};

const TRUEVIS: Pack = {
  id: "10000000-0000-0000-0000-000000000254",
  owner: TRUEVIS_OWNER,
  slug: "eric",
  name: "Eric",
  description:
    "Public Grok Bot templates Eric (@truevis) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Flights. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. Not the Eric (@ericzakariasson) pack. Not Eric Ren (@rrrkren).",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000367",
      name: "Flights",
      job: "Finds and compares round-trip flights (especially from Bangkok), builds Skyscanner links, and watches routes for bag-included deal drops. Built for travelers who want USD tables, checked bags, and sensible layovers.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/xqinGTgeghdOyeYmzqO2m",
    }),
  ],
};

const SAM_BUILDS: Pack = {
  id: "10000000-0000-0000-0000-000000000255",
  owner: SAM_BUILDS_AI_OWNER,
  slug: "sam",
  name: "Sam",
  description:
    "Public Grok Bot templates Sam (@sam_builds_ai) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Prospect Drafts. Use Named X Reply Radar only for niche hot-post reply drafts. Named seats only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. Not the Sam (@samlambert) Commitments pack.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000368",
      name: "Prospect Drafts",
      job: "Finds fit prospects from geography/industries/offer; drafts first-touch Gmail in your voice; you send.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/Ed8OwTpWaFfZdJHEAoT4t",
    }),
    seat({
      id: "20000000-0000-0000-0000-000000000369",
      name: "Named X Reply Radar",
      job: "Finds hot posts in niches and drafts short replies; you send (spend caps).",
      repeatsWhen: null,
      isDesk: false,
      sortOrder: 1,
      grokTemplateUrl: "https://x.ai/bot/lJYaUExPBMZfLWfZEFVGc",
    }),
  ],
};

const DIEGO_ARMANDO: Pack = {
  id: "10000000-0000-0000-0000-000000000256",
  owner: DIEGOARMANDOAD_OWNER,
  slug: "diego",
  name: "DIEGO",
  description:
    "Public Grok Bot templates DIEGO (@diegoarmandoAD) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Flippy. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. Not the Diego (@Diego_F_Aguirre) pack.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000379",
      name: "Flippy",
      job: "Tracks OpenSea NFT mints and reminds you daily — which phase each wallet can mint, plus high-signal X hype around drops.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/OfHECnXmPPavf-l_rZufo",
    }),
  ],
};

const KEN_ASHE: Pack = {
  id: "10000000-0000-0000-0000-000000000257",
  owner: KENASHE_OWNER,
  slug: "ken",
  name: "Ken Ashe",
  description:
    "Public Grok Bot templates Ken Ashe (@kenashe) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at VetStack. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. Live x.ai by-line is Kenny / sharerName Kenny Calzone; official share is from @kenashe.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000380",
      name: "VetStack",
      job: "Military & veteran savings desk: finds current discounts and benefits that apply, without collecting IDs or a long intake.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/z1zYI6LHiFh0UXYf7YjNL",
    }),
  ],
};

const CHUCK: Pack = {
  id: "10000000-0000-0000-0000-000000000258",
  owner: CHUCKH__OWNER,
  slug: "chuck",
  name: "Chuck Hattemer",
  description:
    "Public Grok Bot templates Chuck Hattemer (@chuckh_) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Gong. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000381",
      name: "Gong",
      job: "Recruiter specialist that owns hiring execution end-to-end: job descriptions, board posts, candidate sourcing, outreach drafts, and clean hiring trackers — until a hire decision is needed.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/8CwqNTk5VBBhEAnTyUIHi",
    }),
  ],
};

const NYMBLE: Pack = {
  id: "10000000-0000-0000-0000-000000000259",
  owner: NYMBLEPAY_OWNER,
  slug: "nymble",
  name: "Nymble",
  description:
    "Public Grok Bot templates Nymble (@NymblePay) has shared. One pack, their roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Rent Collections Desk. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots they published as https://x.ai/bot/… belong here. When they publish another official link, add a seat. Do not invent unpublished bots. Built alongside Nymble Pay.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000382",
      name: "Rent Collections Desk",
      job: "A daily late-rent collections desk for landlords: chases overdue tenants through your payment portal after automated notices, with exact balances, payment options, and a clear emailed-vs-skipped report. Built alongside Nymble Pay.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/_cD7oH9VWZy8655M-wDfc",
    }),
  ],
};

const ADAM_DESIGNS: Pack = {
  id: "10000000-0000-0000-0000-000000000260",
  owner: ADAMDESGNS_OWNER,
  slug: "adam",
  name: "AdamDesigns",
  description:
    "Public Grok Bot templates AdamDesigns (@Adamdesgns) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Psycho. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. Not the Adam (@AdamLowisz) pack. Not therapy.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000383",
      name: "Psycho",
      job: "Applied psychology coach. Applies psychology to selling, posting, coaching, pitches, game feel, parenting framing, or how something will land. Recommendations and sample lines only. Not therapy. You send.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/LR0wXrk09bWEHQkI_QnQK",
    }),
  ],
};

const GREG_RAINBOLT: Pack = {
  id: "10000000-0000-0000-0000-000000000261",
  owner: GREGRAINBOLT_OWNER,
  slug: "greg",
  name: "Greg Rainbolt",
  description:
    "Public Grok Bot templates Greg Rainbolt (@GregRainbolt) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at UGC Agency. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000384",
      name: "UGC Agency",
      job: "Your UGC agency in one chat. Routes brand hunting, Meta-safe scripts, ad compliance, shoot calendars, and edit packs across specialist seats — then brings you one ready-to-film result.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/q2cwfiBm4Va7lV0NZdxzu",
    }),
  ],
};

const RASMUS: Pack = {
  id: "10000000-0000-0000-0000-000000000262",
  owner: MERIRAND_OWNER,
  slug: "rasmus",
  name: "Rasmus",
  description:
    "Public Grok Bot templates Rasmus (@merirand) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Elon Musk (Algorithm & constraint). Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. Also shared under https://x.com/merirand/status/2100051035662217425 and https://x.com/merirand/status/2100048229538603019.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000385",
      name: "Elon Musk (Algorithm & constraint)",
      job: "First-principles operator bot. Finds your company's single biggest constraint each week, runs The Algorithm (question → delete → simplify → accelerate → automate last), and pings you with what to focus on — and what to delete.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/QCwGPAlho0dBvBds_IOWF",
    }),
  ],
};

const MYKE: Pack = {
  id: "10000000-0000-0000-0000-000000000263",
  owner: MYKE86D_OWNER,
  slug: "myke",
  name: "Myke",
  description:
    "Public Grok Bot templates Myke (@myke86d) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Pour Cost Coach. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. Also shared under https://x.com/myke86d/status/2100108535308640547.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000386",
      name: "Pour Cost Coach",
      job: "Free pour-cost coach for independents. Bottle + pour size in. Spirit-in-glass out. Verified / Estimated / Missing. Never invents $.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/M4fGJmOk-8Yx9B48Izqnd",
    }),
  ],
};

const VAIBHAV: Pack = {
  id: "10000000-0000-0000-0000-000000000264",
  owner: VAIBHAVHOME_OWNER,
  slug: "vaibhav",
  name: "Vaibhav Arora",
  description:
    "Public Grok Bot templates Vaibhav Arora (@vaibhavhome) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Chief of Staff. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000387",
      name: "Chief of Staff",
      job: "Chief of Staff bot: routes work to specialist agents, runs a morning digest in source · why · next form, and owns recruiter email so you only see rare judgment calls.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/s4lVhWgvghY8dikqD0LC4",
    }),
  ],
};

const TOMMASO: Pack = {
  id: "10000000-0000-0000-0000-000000000265",
  owner: SUPERTOST100_OWNER,
  slug: "tommaso",
  name: "Tommaso Barbera",
  description:
    "Public Grok Bot templates Tommaso Barbera (@SuperTost100) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Venduto. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. Also shared under https://x.com/SuperTost100/status/2100149576388743291.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000388",
      name: "Venduto",
      job: "Closes secondhand sales on Vinted, Subito.it, and Facebook Marketplace: checks stock and floors, chats with buyers, negotiates, and closes deals.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/VH6hfT_aihtFVmOcSQTwp",
    }),
  ],
};

const PRASHANT: Pack = {
  id: "10000000-0000-0000-0000-000000000266",
  owner: PRCSHXNT_OWNER,
  slug: "prashant",
  name: "Prashant",
  description:
    "Public Grok Bot templates Prashant (@prcshxnt) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["media"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Clip Clip. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. Also shared under https://x.com/prcshxnt/status/2100151839199228091. Never posts.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000389",
      name: "Clip Clip",
      job: "Quality sieve for livestream clips. After CLIP CLIP or a nightly check, extracts only scroll-stopping 60–90s beats with captions. Quiet if nothing new. Never posts.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/hL97Xhf7o84RTv8NlOl37",
    }),
  ],
};

const LORENZ: Pack = {
  id: "10000000-0000-0000-0000-000000000267",
  owner: LORENZKRINNER_OWNER,
  slug: "lorenz",
  name: "Lorenz",
  description:
    "Public Grok Bot templates Lorenz (@lorenzkrinner) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Sevvy. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. Also shared under https://x.com/lorenzkrinner/status/2100146844735086828.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000390",
      name: "Sevvy",
      job: "Bookkeeping assistant for sevdesk. On setup it asks which receipt sources to connect, then matches bank transactions and keeps a clean weekly digest — built for freelancers and solo founders.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/iNwf-lMJ_yNe5kZLETztx",
    }),
  ],
};

const DEADBOY: Pack = {
  id: "10000000-0000-0000-0000-000000000268",
  owner: DEADBOYEZRA_OWNER,
  slug: "deadboy",
  name: "DeadboyEzra",
  description:
    "Public Grok Bot templates DeadboyEzra (@DeadboyEzra) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at MonsterBot. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. Also shared under https://x.com/DeadboyEzra/status/2100096527448318211.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000391",
      name: "MonsterBot",
      job: "Hatch a loyal Tamagotchi-like familiar in Grok Bot. Feed and play to fill its XP bar, unlock abilities as it learns your day-to-day tactics, and optionally grow with you on X — no separate game app.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/JMLG1CF0xuj4Jm8KArqCI",
    }),
  ],
};

const HOVHANNES: Pack = {
  id: "10000000-0000-0000-0000-000000000269",
  owner: HOVINTHENORTH_OWNER,
  slug: "hovhannes",
  name: "Hovhannes Mkhitaryan",
  description:
    "Public Grok Bot templates Hovhannes Mkhitaryan (@hovinthenorth) has shared. One pack, his roster, official Grok install per seat.",
  githubUrl: null,
  official: false,
  featured: false,
  topics: ["founder"],
  likesCount: 0,
  installsCount: 0,
  visitsCount: 0,
  routingRule:
    "Random questions stay at Personal Shopper. Use a named seat only when that job is already in this pack.",
  readmeMd:
    "Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. Also shared under https://x.com/hovinthenorth/status/2099998794490536065 and https://x.com/hovinthenorth/status/2099997120304718316.",
  seats: [
    seat({
      id: "20000000-0000-0000-0000-000000000392",
      name: "Personal Shopper",
      job: "Builds a household person book—sizes, apparel section, birthdays and other special dates—then shops live Shopify with visual shortlists in seconds and size-matched carts. You finish on the merchant checkout link.",
      repeatsWhen: null,
      isDesk: true,
      sortOrder: 0,
      grokTemplateUrl: "https://x.ai/bot/D0DOumUGpkN-fjE_acysw",
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
  SLATTS,
  KIN,
  SHAHRUL,
  XO,
  YOUNES,
  UZI,
  KELSEY,
  MARULIMO,
  RUSS,
  ERIC_OSIU,
  THOMAS,
  JUSTIN_CHEN,
  FERMIN,
  SIMON,
  LIZ,
  MITCH,
  PHIL,
  GRAHAM,
  DEEPBITS,
  THE_DAVEY,
  JAIME,
  NEESSAM,
  ADVENTURE,
  BBBANG,
  REALMATTABRAMS,
  S_PADIVAL,
  BACONBRIX,
  JAHARRIS13,
  MATTYP,
  HELLOITSOCTOCAT,
  AROOGLE,
  JINGG_N_TONIC,
  REDSPICEX,
  SERGICAL,
  OMNI_PUZZLER,
  MICHAELHEREDIA,
  YANQINGCHENG,
  DANCINGTEETH,
  ZILVESTRO,
  BTC_YOGI,
  DAISUKE,
  SNEHARAVINDRA,
  LITTLETECHBIRD,
  SAMUELFLG1,
  PARKERSMITH,
  QUOTEWISER,
  JAMES_AILTON,
  IRABUKHT,
  CHIEFBEERS,
  NATHANGLASS,
  STEVEDERICO,
  TOBIASZTOP,
  MDASHJAMES,
  RMARWAH,
  AETANEORIZAL,
  MAPACHESALEXIS,
  FERMION_BOSON17,
  X_STONE_ISLAND,
  JEFFREYLIND,
  SKYLER_MILLER56,
  TOATSPACE,
  ASH,
  ALTHETIME,
  SETH,
  JASON,
  TAUS,
  GENARO,
  ASHVINN,
  TOMAS,
  CARBON,
  MOHIT,
  VALSTRY,
  GABRIELE,
  AARONINFINITEA,
  TEXAS,
  MRFLMNL,
  BKASH,
  VOIDVEXA,
  CGNOT996,
  LEECHAEL,
  OMNITHNKR,
  MATTVAGNI,
  DOMENIC,
  USAMA,
  FIONA,
  COLIN,
  BRIAN,
  SAM,
  FRANCO,
  LEENDERT,
  BCORN,
  VALENTIN,
  IGGYNORE,
  BWILSON,
  BERKAY,
  BENXLAB,
  KUN,
  HUDSON,
  ALEX,
  TRUEVIS,
  SAM_BUILDS,
  DIEGO_ARMANDO,
  KEN_ASHE,
  CHUCK,
  NYMBLE,
  ADAM_DESIGNS,
  GREG_RAINBOLT,
  RASMUS,
  MYKE,
  VAIBHAV,
  TOMMASO,
  PRASHANT,
  LORENZ,
  DEADBOY,
  HOVHANNES,
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
  EVSLATTS_OWNER,
  KINGAO476942_OWNER,
  SHAHRULESTAR_OWNER,
  ORTIX008_OWNER,
  KAMKOM05_OWNER,
  UZIOBI_OWNER,
  KELSEYSHUO_OWNER,
  MARULIMOAI_OWNER,
  RUSSBROOMELL_OWNER,
  ERICOSIU_OWNER,
  TFERRIERE_OWNER,
  TWOBITJUSTIN_OWNER,
  FERMINRP_OWNER,
  FOUR_SIMONSAYS_OWNER,
  VOELIZ_OWNER,
  MITCHTILER_OWNER,
  PHIL_HOLLAND_OWNER,
  BLISSNOMAD_OWNER,
  DRBINARYAI_OWNER,
  THE_DAVEY_OWNER,
  JAIMEBUBBLEHEAD_OWNER,
  COMPILEINSTYLE_OWNER,
  ADVENTURENLEARN_OWNER,
  BBBANG9900_OWNER,
  REALMATTABRAMS_OWNER,
  S_PADIVAL_OWNER,
  BACONBRIX_OWNER,
  JAHARRIS13_OWNER,
  MATTYP_OWNER,
  HELLOITSOCTOCAT_OWNER,
  AROOGLE_OWNER,
  JINGG_N_TONIC_OWNER,
  REDSPICEX_OWNER,
  SERGICAL_OWNER,
  OMNI_PUZZLER_OWNER,
  MICHAELHEREDIA_OWNER,
  YANQINGCHENG_OWNER,
  DANCINGTEETH_OWNER,
  ZILVESTRO_OWNER,
  BTC_YOGI_OWNER,
  DAISUKE_OWNER,
  SNEHARAVINDRA_OWNER,
  LITTLETECHBIRD_OWNER,
  SAMUELFLG1_OWNER,
  PARKERSMITH_OWNER,
  QUOTEWISER_OWNER,
  JAMES_AILTON_OWNER,
  IRABUKHT_OWNER,
  CHIEFBEERS_OWNER,
  NATHANGLASS_OWNER,
  STEVEDERICO_OWNER,
  TOBIASZTOP_OWNER,
  MDASHJAMES_OWNER,
  RMARWAH_OWNER,
  AETANEORIZAL_OWNER,
  MAPACHESALEXIS_OWNER,
  FERMION_BOSON17_OWNER,
  X_STONE_ISLAND_OWNER,
  JEFFREYLIND_OWNER,
  SKYLER_MILLER56_OWNER,
  TOATSPACE_OWNER,
  OXASHRK_OWNER,
  MADMENAI_OWNER,
  SETHSALER_OWNER,
  OCCUPYMARS___OWNER,
  SHEHJADTAUS_OWNER,
  GEZEEQ_OWNER,
  ASHVINN_OWNER,
  TOMIDELU__OWNER,
  CARBONTHECODER_OWNER,
  IMOHITMAYANK_OWNER,
  VALSTRY_OWNER,
  GABRIELEMONNI_OWNER,
  AARONINFINITEA_OWNER,
  TEXASBASEDGPA_OWNER,
  MRFLMNLNFT_OWNER,
  BKASHJOSI_OWNER,
  VOIDVEXA_OWNER,
  CGNOT996_OWNER,
  LEECHAEL_OWNER,
  OMNITHNKR_OWNER,
  MATTVAGNI_OWNER,
  DOMENICFOTINO_OWNER,
  IM_USAMAKHALID_OWNER,
  FWHITTINGTON_24_OWNER,
  COLINMCDERMOTT_OWNER,
  REALJBMANGUM_OWNER,
  SAMLAMBERT_OWNER,
  FRANCOE114696_OWNER,
  LEINGOEDBLOED_OWNER,
  BCORNTEXAS_OWNER,
  VALENGIULIMOR_OWNER,
  IGGYNORE_OWNER,
  BWILSON_OWNER,
  MRBEKO__OWNER,
  BENXLAB_OWNER,
  KUNCHENGUID_OWNER,
  HUDCOS_OWNER,
  ALEXHAWAT_OWNER,
  TRUEVIS_OWNER,
  SAM_BUILDS_AI_OWNER,
  DIEGOARMANDOAD_OWNER,
  KENASHE_OWNER,
  CHUCKH__OWNER,
  NYMBLEPAY_OWNER,
  ADAMDESGNS_OWNER,
  GREGRAINBOLT_OWNER,
  MERIRAND_OWNER,
  MYKE86D_OWNER,
  VAIBHAVHOME_OWNER,
  SUPERTOST100_OWNER,
  PRCSHXNT_OWNER,
  LORENZKRINNER_OWNER,
  DEADBOYEZRA_OWNER,
  HOVINTHENORTH_OWNER,
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
