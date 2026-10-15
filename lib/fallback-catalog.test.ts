import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import {
  fallbackStats,
  getFallbackPack,
  getFallbackProfile,
  listFallbackPacks,
  listFallbackPacksByOwner,
} from "./fallback-catalog.ts";
import { parseGrokTemplateUrl } from "./grok-url.ts";

const seedSql = readFileSync(
  fileURLToPath(new URL("../supabase/seed.sql", import.meta.url)),
  "utf8"
);

test("catalog includes existing packs plus the new verified shares", () => {
  const stats = fallbackStats();
  assert.equal(stats.packs, 844);
  assert.equal(stats.seats, 1339);
  assert.ok(getFallbackPack("poteto", "lauren"));
  assert.ok(getFallbackPack("cjblev", "corey"));
  assert.ok(getFallbackPack("MaiYangAI", "mai"));
  assert.ok(getFallbackPack("farzyness", "farzad"));
  assert.ok(getFallbackPack("naoufalelh", "nao"));
  assert.ok(getFallbackPack("Teslaconomics", "teslaconomics"));
  assert.ok(getFallbackPack("kentcdodds", "kent"));
  assert.ok(getFallbackPack("abdshomad", "abd"));
  assert.ok(getFallbackPack("brstorrie", "ben"));
  assert.ok(getFallbackPack("beaudenison", "beau"));
  assert.ok(getFallbackPack("jennananpei", "jenna"));
  assert.ok(getFallbackPack("funkii", "funkii"));
  assert.ok(getFallbackPack("SumoSign", "keith"));
  assert.ok(getFallbackPack("bfrench", "bill-french"));
  assert.ok(getFallbackPack("herdrdev", "can"));
  assert.ok(getFallbackPack("andreleibovici", "andre"));
  assert.ok(getFallbackPack("randywhitepdx", "randy"));
  assert.ok(getFallbackPack("pohlipit", "pete"));
  assert.ok(getFallbackPack("akshaybhopani", "akshay"));
  assert.ok(getFallbackPack("frankfindsout", "frank"));
  assert.ok(getFallbackPack("ludiofelix", "rob"));
  assert.ok(getFallbackPack("old-pgmrs-will", "will"));
  assert.ok(getFallbackPack("bossriceshark", "matt"));
  assert.ok(getFallbackPack("saasocalypse", "ankur"));
  assert.ok(getFallbackPack("mpieras", "miguel"));
  assert.ok(getFallbackPack("emrecolakoglu", "emre"));
  assert.ok(getFallbackPack("AdemVessell", "adem"));
  assert.ok(getFallbackPack("andymadrick", "andy"));
  assert.ok(getFallbackPack("kunalsells", "kunal"));
  assert.ok(getFallbackPack("yoda_FDE", "yoda"));
  assert.ok(getFallbackPack("Bryanofearth", "bryan"));
  assert.ok(getFallbackPack("CoonInvestments", "austin"));
  assert.ok(getFallbackPack("JOwens254", "justin"));
  assert.ok(getFallbackPack("onerinas", "rinas"));
  assert.ok(getFallbackPack("pavravi", "pavan"));
  assert.ok(getFallbackPack("jakewlittle", "jake"));
  assert.ok(getFallbackPack("erinnfl", "erinn"));
  assert.ok(getFallbackPack("EvSlatts", "slatts"));
  assert.ok(getFallbackPack("KinGao476942", "kin"));
  assert.ok(getFallbackPack("shahrulestar", "shahrul"));
  assert.ok(getFallbackPack("Ortix008", "xo"));
  assert.ok(getFallbackPack("Kamkom05", "younes"));
  assert.ok(getFallbackPack("UziObi", "uzi"));
  assert.ok(getFallbackPack("Kelseyshuo", "kelsey"));
  assert.ok(getFallbackPack("marulimoai", "marulimo"));
  assert.ok(getFallbackPack("russbroomell", "russ"));
  assert.ok(getFallbackPack("ericosiu", "eric-osiu"));
  assert.ok(getFallbackPack("tferriere", "thomas"));
  assert.ok(getFallbackPack("TwoBitJustin", "justin-chen"));
  assert.ok(getFallbackPack("ferminrp", "fermin"));
  assert.ok(getFallbackPack("4SimonSays", "simon"));
  assert.ok(getFallbackPack("voeliz", "liz"));
  assert.ok(getFallbackPack("MitchTiler", "mitch"));
  assert.ok(getFallbackPack("Phil_Holland", "phil"));
  assert.ok(getFallbackPack("BlissNomad", "graham"));
  assert.ok(getFallbackPack("drbinaryai", "deepbits"));
  assert.ok(getFallbackPack("the_davey", "dave"));
  assert.ok(getFallbackPack("JaimeBubblehead", "jaime"));
  assert.ok(getFallbackPack("compileinstyle", "neessam"));
  assert.ok(getFallbackPack("AdventureNLearn", "adventure"));
  assert.ok(getFallbackPack("BBBang9900", "bbbang"));
  assert.ok(getFallbackPack("realMattAbrams", "matt"));
  assert.ok(getFallbackPack("S_Padival", "s_padival"));
  assert.ok(getFallbackPack("Baconbrix", "baconbrix"));
  assert.ok(getFallbackPack("jaharris13", "jaharris13"));
  assert.ok(getFallbackPack("mattyp", "mattyp"));
  assert.ok(getFallbackPack("helloitsoctocat", "helloitsoctocat"));
  assert.ok(getFallbackPack("aroogle", "aroogle"));
  assert.ok(getFallbackPack("Jingg_n_Tonic", "jingg_n_tonic"));
  assert.ok(getFallbackPack("RedSpiceX", "redspicex"));
  assert.ok(getFallbackPack("sergical", "sergical"));
  assert.ok(getFallbackPack("omni_puzzler", "omni_puzzler"));
  assert.ok(getFallbackPack("michaelheredia", "michaelheredia"));
  assert.ok(getFallbackPack("YanqingCheng", "yanqingcheng"));
  assert.ok(getFallbackPack("dancingteeth", "dancingteeth"));
  assert.ok(getFallbackPack("zilvestro", "zilvestro"));
  assert.ok(getFallbackPack("BTC_Yogi", "btc_yogi"));
  assert.ok(getFallbackPack("daisuke", "daisuke"));
  assert.ok(getFallbackPack("sneharavindra", "sneharavindra"));
  assert.ok(getFallbackPack("littletechbird", "littletechbird"));
  assert.ok(getFallbackPack("Samuelflg1", "samuelflg1"));
  assert.ok(getFallbackPack("parkersmith", "parkersmith"));
  assert.ok(getFallbackPack("quotewiser", "quotewiser"));
  assert.ok(getFallbackPack("james_ailton", "james_ailton"));
  assert.ok(getFallbackPack("irabukht", "irabukht"));
  assert.ok(getFallbackPack("ChiefBeers", "chiefbeers"));
  assert.ok(getFallbackPack("nathanglass", "nathanglass"));
  assert.ok(getFallbackPack("stevederico", "stevederico"));
  assert.ok(getFallbackPack("tobiasztop", "tobiasztop"));
  assert.ok(getFallbackPack("mdashjames", "mdashjames"));
  assert.ok(getFallbackPack("rmarwah", "rmarwah"));
  assert.ok(getFallbackPack("AetaneoRizal", "aetaneorizal"));
  assert.ok(getFallbackPack("MapachesAlexis", "mapachesalexis"));
  assert.ok(getFallbackPack("Fermion_Boson17", "fermion_boson17"));
  assert.ok(getFallbackPack("x_stone_island", "x_stone_island"));
  assert.ok(getFallbackPack("JeffreyLind", "jeffrey"));
  assert.ok(getFallbackPack("Skyler_Miller56", "skyler"));
  assert.ok(getFallbackPack("TOATspace", "toatspace"));
  assert.ok(getFallbackPack("0xashrk", "ash"));
  assert.ok(getFallbackPack("madmenai", "althetime"));
  assert.ok(getFallbackPack("sethsaler", "seth"));
  assert.ok(getFallbackPack("occupymars___", "jason"));
  assert.ok(getFallbackPack("ShehjadTaus", "taus"));
  assert.ok(getFallbackPack("gezeeq", "genaro"));
  assert.ok(getFallbackPack("ashvinn", "ashvinn"));
  assert.ok(getFallbackPack("tomidelu_", "tomas"));
  assert.ok(getFallbackPack("Carbonthecoder", "carbon"));
  assert.ok(getFallbackPack("imohitmayank", "mohit"));
  assert.ok(getFallbackPack("Valstry", "valstry"));
  assert.ok(getFallbackPack("GabrieleMonni", "gabriele"));
  assert.ok(getFallbackPack("AaronInfinitea", "aaron"));
  assert.ok(getFallbackPack("TexasBasedGpa", "texas"));
  assert.ok(getFallbackPack("mrflmnlNFT", "mrflmnl"));
  assert.ok(getFallbackPack("BkashJosi", "bkash"));
  assert.ok(getFallbackPack("voidvexa", "george"));
  assert.ok(getFallbackPack("cgnot996", "cgnot996"));
  assert.ok(getFallbackPack("leechael", "leechael"));
  assert.ok(getFallbackPack("omnithnkr", "omnithnkr"));
  assert.ok(getFallbackPack("mattvagni", "matt"));
  assert.ok(getFallbackPack("DomenicFotino", "domenic"));
  assert.ok(getFallbackPack("im_usamakhalid", "usama"));
  assert.ok(getFallbackPack("fwhittington_24", "fiona"));
  assert.ok(getFallbackPack("colinmcdermott", "colin"));
  assert.ok(getFallbackPack("realjbmangum", "brian"));
  assert.ok(getFallbackPack("diegoarmandoAD", "diego"));
  assert.ok(getFallbackPack("kenashe", "ken"));
  assert.ok(getFallbackPack("chuckh_", "chuck"));
  assert.ok(getFallbackPack("NymblePay", "nymble"));
  assert.ok(getFallbackPack("Adamdesgns", "adam"));
  assert.ok(getFallbackPack("GregRainbolt", "greg"));
  assert.ok(getFallbackPack("merirand", "rasmus"));
  assert.ok(getFallbackPack("myke86d", "myke"));
  assert.ok(getFallbackPack("vaibhavhome", "vaibhav"));
  assert.ok(getFallbackPack("SuperTost100", "tommaso"));
  assert.ok(getFallbackPack("prcshxnt", "prashant"));
  assert.ok(getFallbackPack("lorenzkrinner", "lorenz"));
  assert.ok(getFallbackPack("DeadboyEzra", "deadboy"));
  assert.ok(getFallbackPack("hovinthenorth", "hovhannes"));
  assert.ok(getFallbackPack("___troopr", "varun"));
  assert.ok(getFallbackPack("joncarder", "jon"));
  assert.ok(getFallbackPack("Abdollahoffline", "abdullah"));
  assert.ok(getFallbackPack("Rimusz", "rimantas"));
  assert.ok(getFallbackPack("EricChez", "eric"));
  assert.ok(getFallbackPack("1280mhz", "1280"));
  assert.ok(getFallbackPack("_hungha", "hunghuc"));
  assert.ok(getFallbackPack("_rudedude", "don"));
  assert.ok(getFallbackPack("afeastofideas", "mindfeast"));
  assert.ok(getFallbackPack("alexnextd00r", "alex"));
  assert.ok(getFallbackPack("anabology", "anabology"));
  assert.ok(getFallbackPack("andrarchy", "andrew"));
  assert.ok(getFallbackPack("andrewwilkinson", "andrew"));
  assert.ok(getFallbackPack("anubis941", "rich"));
  assert.ok(getFallbackPack("aojdevstudi0", "ossie"));
  assert.ok(getFallbackPack("ayushbherwani", "ayush"));
  assert.ok(getFallbackPack("bigbaldasian", "tan"));
  assert.ok(getFallbackPack("biggs237", "jeremy"));
  assert.ok(getFallbackPack("blayonx", "blay"));
  assert.ok(getFallbackPack("buberlo", "konrad"));
  assert.ok(getFallbackPack("bunkeideploy", "bunkei"));
  assert.ok(getFallbackPack("cadena_gus", "gustavo"));
  assert.ok(getFallbackPack("carm1nee", "carm1ne"));
  assert.ok(getFallbackPack("chris_vandaele", "christopher"));
  assert.ok(getFallbackPack("chrisvolkernick", "chrisvbtc"));
  assert.ok(getFallbackPack("coffeengrit", "coffee"));
  assert.ok(getFallbackPack("colehollander10", "cole"));
  assert.ok(getFallbackPack("congressdj", "dj"));
  assert.ok(getFallbackPack("cyberamped", "myron"));
  assert.ok(getFallbackPack("dallinwatts", "dallin"));
  assert.ok(getFallbackPack("dduongtech", "david"));
  assert.ok(getFallbackPack("dinablachman", "dina"));
  assert.ok(getFallbackPack("dirtytesla", "dirty"));
  assert.ok(getFallbackPack("drakonus5774", "scott"));
  assert.ok(getFallbackPack("erictschroeder", "eric"));
  assert.ok(getFallbackPack("finaldash_", "david"));
  assert.ok(getFallbackPack("guluhehe", "guluhehe"));
  assert.ok(getFallbackPack("gzikry", "george"));
  assert.ok(getFallbackPack("heidibriones", "heidi"));
  assert.ok(getFallbackPack("hjackson2", "hank"));
  assert.ok(getFallbackPack("iamjoshmoulton", "josh"));
  assert.ok(getFallbackPack("iamluis_dev", "luis"));
  assert.ok(getFallbackPack("jadmthw", "jaden"));
  assert.ok(getFallbackPack("jasonlix993", "xiang"));
  assert.ok(getFallbackPack("jasonrogersafb", "jason"));
  assert.ok(getFallbackPack("jaydook", "jay"));
  assert.ok(getFallbackPack("jennaliftslife", "jenna"));
  assert.ok(getFallbackPack("johnnyskyfox", "johnny"));
  assert.ok(getFallbackPack("jonmartinez", "jjz"));
  assert.ok(getFallbackPack("joshmeyer", "josh"));
  assert.ok(getFallbackPack("joshwalkos", "josh"));
  assert.ok(getFallbackPack("journeydeck", "patrick"));
  assert.ok(getFallbackPack("jvonfsdinmd", "john"));
  assert.ok(getFallbackPack("kchau", "kevin"));
  assert.ok(getFallbackPack("kelvdynasty", "kelvin"));
  assert.ok(getFallbackPack("ken_linkwell", "ken"));
  assert.ok(getFallbackPack("kuten26", "kuten26"));
  assert.ok(getFallbackPack("lamps_apple", "apple"));
  assert.ok(getFallbackPack("latchkeylegend", "genxer"));
  assert.ok(getFallbackPack("lucasalpes", "lucas"));
  assert.ok(getFallbackPack("martinpaulweiss", "martin"));
  assert.ok(getFallbackPack("memoriesofgreen", "tannhuser"));
  assert.ok(getFallbackPack("minheo93698092", "min"));
  assert.ok(getFallbackPack("mrellew", "matt"));
  assert.ok(getFallbackPack("napoleon__bon", "napoleon"));
  assert.ok(getFallbackPack("netseg_io", "leon"));
  assert.ok(getFallbackPack("nil0bject", "nil"));
  assert.ok(getFallbackPack("obiwontrader", "anatoliy"));
  assert.ok(getFallbackPack("oprydai", "mustafa"));
  assert.ok(getFallbackPack("rd1963", "russell"));
  assert.ok(getFallbackPack("realcoachmatt23", "matt"));
  assert.ok(getFallbackPack("realjohnnewburg", "jonathan"));
  assert.ok(getFallbackPack("rgllm", "rogrio"));
  assert.ok(getFallbackPack("russini6", "russell"));
  assert.ok(getFallbackPack("ryanfurne", "ryan"));
  assert.ok(getFallbackPack("ryanrhinkle", "ryan"));
  assert.ok(getFallbackPack("sadiesupadoge", "sadie"));
  assert.ok(getFallbackPack("sayaconsole", "saya"));
  assert.ok(getFallbackPack("schienwang", "schien"));
  assert.ok(getFallbackPack("sivunigunta", "satya"));
  assert.ok(getFallbackPack("societilili", "societi"));
  assert.ok(getFallbackPack("srcaptainthrawn", "darryl"));
  assert.ok(getFallbackPack("stsola", "st"));
  assert.ok(getFallbackPack("the_contextian", "contextian"));
  assert.ok(getFallbackPack("the_real_issah", "issah"));
  assert.ok(getFallbackPack("timdoes", "tim"));
  assert.ok(getFallbackPack("titaniumtomp", "tom"));
  assert.ok(getFallbackPack("tonysimons_", "tony"));
  assert.ok(getFallbackPack("twilightsurfers", "twilight"));
  assert.ok(getFallbackPack("twood_trust", "twood"));
  assert.ok(getFallbackPack("unclemikeyla", "eacc"));
  assert.ok(getFallbackPack("w0rldwid3vib3s", "worldwidevibes"));
  assert.ok(getFallbackPack("wifedirtytesla", "wife"));
  assert.ok(getFallbackPack("willconqueror23", "will"));
  assert.ok(getFallbackPack("yandymccutcheon", "andy"));
  assert.ok(getFallbackPack("zhouruijin", "ruijin"));
  assert.ok(getFallbackPack("_noahweir", "noah"));
  assert.ok(getFallbackPack("TorranceMiller", "torrance"));
  assert.ok(getFallbackPack("TraderScottyS", "scott"));
  assert.ok(getFallbackPack("FordCrews", "ford"));
  assert.ok(getFallbackPack("BHamilt94615115", "bhamilton"));
  assert.ok(getFallbackPack("KingRomstar", "rami"));
  assert.ok(getFallbackPack("CarlosSalas", "carlos"));
  assert.ok(getFallbackPack("guysuter", "guy"));
  assert.ok(getFallbackPack("PaPa_Bear5565", "papa"));
  assert.ok(getFallbackPack("minchoi", "min"));
  assert.ok(getFallbackPack("esther_confused", "esther"));
  assert.ok(getFallbackPack("rob_an_", "rob"));
  assert.ok(getFallbackPack("JugalJg", "jugal"));
  assert.ok(getFallbackPack("gene_alex", "gene"));
  assert.ok(getFallbackPack("TheCiscoBryan", "cisco"));
  assert.ok(getFallbackPack("thegreatest_sv", "kiosa"));
  assert.ok(getFallbackPack("Bilbo_of_Shire", "luke"));
  assert.ok(getFallbackPack("Zulian", "ricardo"));
  assert.ok(getFallbackPack("orange_boy", "vlad"));
  assert.ok(getFallbackPack("apostlejohn", "john"));
  assert.ok(getFallbackPack("JonStenstrom", "jon"));
  assert.ok(getFallbackPack("joshuastowell25", "joshua"));
  assert.ok(getFallbackPack("RKunk", "ryan"));
  assert.ok(getFallbackPack("MarinCountyman", "mark"));
  assert.ok(getFallbackPack("KellehEyad", "eyad"));
  assert.ok(getFallbackPack("csapperson", "chris"));
  assert.ok(getFallbackPack("sweetpollybred", "dana"));
  assert.ok(getFallbackPack("MattMatthews121", "matt"));
  assert.ok(getFallbackPack("benoror", "ben"));
  assert.ok(getFallbackPack("3dKelvic", "kelvic"));
  assert.ok(getFallbackPack("ProofofMaro", "maro"));
  assert.ok(getFallbackPack("FrankYin17", "frank"));
  assert.ok(getFallbackPack("itsryanlenk", "ryan"));
  assert.ok(getFallbackPack("KacperRutk", "kacper"));
  assert.ok(getFallbackPack("maxfaubert", "max"));
  assert.ok(getFallbackPack("monomyth", "eugene"));
  assert.ok(getFallbackPack("TheNextGreatEra", "nge"));
  assert.ok(getFallbackPack("lafraia", "daniel"));
  assert.ok(getFallbackPack("ignota_regalis", "ignota"));
  assert.ok(getFallbackPack("IAmMichaelSweet", "michael"));
  assert.ok(getFallbackPack("dode", "dode"));
  assert.ok(getFallbackPack("salterworld", "tim"));
  assert.ok(getFallbackPack("BragiHelvig", "bragi"));
  assert.ok(getFallbackPack("robannand", "robert"));
  assert.ok(getFallbackPack("CarolinaDill", "carolina"));
  assert.ok(getFallbackPack("CoryBishop15", "cory"));
  assert.ok(getFallbackPack("raitec", "ricardo"));
  assert.ok(getFallbackPack("choko_milkty", "choko"));
  assert.ok(getFallbackPack("KareenMallet", "kareen"));
  assert.ok(getFallbackPack("uzairansar", "uzair"));
  assert.ok(getFallbackPack("wolfe_jam", "james"));
  assert.ok(getFallbackPack("myGuyPye", "paul"));
  assert.ok(getFallbackPack("cyberandres", "andres"));
  assert.ok(getFallbackPack("hammerton", "shane"));
  assert.ok(getFallbackPack("scottslabio", "scott"));
  assert.ok(getFallbackPack("Davesacritic", "david"));
  assert.ok(getFallbackPack("the_Arow_H", "dartagnan"));
  assert.ok(getFallbackPack("Pinuts_", "pinuts"));
  assert.ok(getFallbackPack("coolbat1999", "tony"));
  assert.ok(getFallbackPack("dzbeitz", "starlord"));
  assert.ok(getFallbackPack("trevin", "trevin"));
  assert.ok(getFallbackPack("JGabrielGruber", "jose"));
  assert.ok(getFallbackPack("crisvallory", "cristiano"));
  assert.ok(getFallbackPack("kirby_jed", "jed"));
  assert.ok(getFallbackPack("derekvfx", "derek"));
  assert.ok(getFallbackPack("usaps", "jeronimo"));
  assert.ok(getFallbackPack("ToddATrevino", "todd"));
  assert.ok(getFallbackPack("howellsh", "scott"));
  assert.ok(getFallbackPack("sankygrocks", "sanket"));
  assert.ok(getFallbackPack("jbrianfrancis", "brian"));
  assert.ok(getFallbackPack("felipe_fyre", "fyre"));
  assert.ok(getFallbackPack("Lex_Vasquez23", "alex"));
  assert.ok(getFallbackPack("zhirafovod", "sergey"));
  assert.ok(getFallbackPack("shawnmckee", "shawn"));
  assert.ok(getFallbackPack("SauloLondono", "saulo"));
  assert.ok(getFallbackPack("shootthebull", "mike"));
  assert.ok(getFallbackPack("pareshdesai", "paresh"));
  assert.ok(getFallbackPack("WorkWithJodi", "jodi"));
  assert.ok(getFallbackPack("SLamouroux", "stephanie"));
  assert.ok(getFallbackPack("csputerbaugh1", "chadwick"));
  assert.ok(getFallbackPack("kleosrr", "mario"));
  assert.ok(getFallbackPack("kittenworth", "avalon"));
  assert.ok(getFallbackPack("pcoxproductions", "preston"));
  assert.ok(getFallbackPack("nikocallas", "niko"));
  assert.ok(getFallbackPack("zalberico", "zach"));
  assert.ok(getFallbackPack("imrannotes", "imran"));
  assert.ok(getFallbackPack("dodgeking3171", "nathan"));
  assert.ok(getFallbackPack("danielhayesmith", "daniel"));
  assert.ok(getFallbackPack("BlazeDrinkwine", "blaze"));
  assert.ok(getFallbackPack("TheEdibleAnus", "edibleanus"));
  assert.ok(getFallbackPack("UnoMasReactor", "steffan"));
  assert.ok(getFallbackPack("EricBuess", "eric"));
  assert.ok(getFallbackPack("arturorodes", "arturo"));
  assert.ok(getFallbackPack("chadparris", "chad"));
  assert.ok(getFallbackPack("GillesGuenette3", "gilles"));
  assert.ok(getFallbackPack("mike_mcconnon12", "mike"));
  assert.ok(getFallbackPack("graceclarke", "grace"));
  assert.ok(getFallbackPack("weeb3dev", "alberto"));
  assert.ok(getFallbackPack("KatheTrivinoG", "katherine"));
  assert.ok(getFallbackPack("ChrisAdcockMD", "chris"));
  assert.ok(getFallbackPack("Roland_RADPCs", "rad"));
  assert.ok(getFallbackPack("RGarrick2", "r-garrick"));
  assert.ok(getFallbackPack("_lovablecurves", "lovable"));
  assert.ok(getFallbackPack("ethan_leee9113", "ethan"));
  assert.ok(getFallbackPack("McNeely", "paul"));
  assert.ok(getFallbackPack("VYCanisMajori", "vyan"));
  assert.ok(getFallbackPack("paulovitorjp", "paulo"));
  assert.ok(getFallbackPack("686f6c61", "databye"));
  assert.ok(getFallbackPack("_VincentPeng", "vincent"));
  assert.ok(getFallbackPack("elizrdrake", "xi"));
  assert.ok(getFallbackPack("SacredFolio", "drew"));
  assert.ok(getFallbackPack("tilenpoje", "tilen"));
  assert.ok(getFallbackPack("ChrisPadrick", "chris"));
  assert.ok(getFallbackPack("damianoredem", "damiano"));
  assert.ok(getFallbackPack("nextgenmove", "hristo"));
  assert.ok(getFallbackPack("MikkoUusitalo1", "mikko"));
  assert.ok(getFallbackPack("siraustin", "austin"));
  assert.ok(getFallbackPack("legendRoofingCo", "legend"));
  assert.ok(getFallbackPack("kevinrose", "kevin"));
  assert.ok(getFallbackPack("round", "round"));
  assert.ok(getFallbackPack("Cmillet77", "chris-millet"));
  assert.ok(getFallbackPack("pattyshack", "patty"));
  assert.ok(getFallbackPack("scientists_blog", "matthew"));
  assert.ok(getFallbackPack("bartasurba", "bartas"));
  assert.ok(getFallbackPack("GallagherPreach", "chris-gallagher"));
  assert.ok(getFallbackPack("btgraham5", "brian"));
  assert.ok(getFallbackPack("kmkonline", "kmkonline"));
  assert.ok(getFallbackPack("JennyMarquis", "jenny"));
  assert.ok(getFallbackPack("msunc1985", "teresa"));
  assert.ok(getFallbackPack("aris_grivas", "aris"));
  assert.ok(getFallbackPack("mmmllcadv3", "michael"));
  assert.ok(getFallbackPack("Divine_machine", "divine"));
  assert.ok(getFallbackPack("jason_bennitt", "jason"));
  assert.ok(getFallbackPack("AlecSnelling", "alec"));
  assert.ok(getFallbackPack("Fnjrockerstein", "jared"));
  assert.ok(getFallbackPack("sjcobs", "steven"));
  assert.ok(getFallbackPack("CindyH874325640", "cindy"));
  assert.ok(getFallbackPack("keepclmcarryong", "robert"));
  assert.ok(getFallbackPack("valdagher", "valentino"));
  assert.ok(getFallbackPack("TechDadsLife", "michael"));
  assert.ok(getFallbackPack("Wardonis", "wardonis"));
  assert.ok(getFallbackPack("uxaistudio", "ward"));
  assert.ok(getFallbackPack("HBud69", "harald"));
  assert.ok(getFallbackPack("vivekk_tech", "vivek"));
  assert.ok(getFallbackPack("RoggyRyan", "ryan"));
  assert.ok(getFallbackPack("JackyHeshi", "jacky"));
  assert.ok(getFallbackPack("minivan99", "john"));
  assert.ok(getFallbackPack("zac70182", "zack"));
  assert.ok(getFallbackPack("brandonchung75", "brandon"));
  assert.ok(getFallbackPack("anzevoje", "growth"));
  assert.ok(getFallbackPack("Secalytica", "jerry"));
  assert.ok(getFallbackPack("STACCoverflow", "jarett"));
  assert.ok(getFallbackPack("arouch_serg", "serg"));
  assert.ok(getFallbackPack("VMVLAX", "law"));
  assert.ok(getFallbackPack("kschevik", "knut"));
  assert.ok(getFallbackPack("beksvie", "bernard"));
  assert.ok(getFallbackProfile("examples"));
  assert.equal(getFallbackPack("examples", "stencil"), null);
  assert.ok(!listFallbackPacks().some((pack) => pack.owner.githubLogin === "examples"));

  const brad = getFallbackPack("BradShannon", "brad");
  assert.equal(brad?.seats.length, 6);
  assert.equal(brad?.seats[1]?.name, "X Hygiene");
  assert.equal(brad?.seats[1]?.id, "20000000-0000-0000-0000-000000000540");
  assert.match(brad?.routingRule ?? "", /X Hygiene only for X follower/);

  const fantom = getFallbackPack("FantomBuildz", "fantom");
  assert.equal(fantom?.seats.length, 3);
  assert.equal(fantom?.seats[2]?.name, "Last Stop");
  assert.equal(fantom?.seats[2]?.id, "20000000-0000-0000-0000-000000000551");

  const grace = getFallbackPack("graceclarke", "grace");
  assert.equal(grace?.seats.length, 2);
  assert.equal(grace?.seats[1]?.name, "LearnBot");
  assert.equal(grace?.seats[1]?.id, "20000000-0000-0000-0000-000000000552");

  const scott76 = getFallbackPack("scottxmetcalf", "scott");
  assert.equal(scott76?.seats.length, 28);
  assert.equal(scott76?.seats[25]?.name, "Pit Crew");
  assert.equal(scott76?.seats[25]?.id, "20000000-0000-0000-0000-000000000607");
  assert.equal(scott76?.seats[25]?.grokTemplateUrl, "https://x.ai/bot/Sm0GZs7Hhf7kNV7tHCUN1");
  assert.match(scott76?.routingRule ?? "", /Pit Crew only for shared-computer/);
  assert.equal(scott76?.seats[26]?.name, "Doordash");
  assert.equal(scott76?.seats[26]?.id, "20000000-0000-0000-0000-000000000608");
  assert.equal(scott76?.seats[26]?.isDesk, false);
  assert.equal(scott76?.seats[26]?.sortOrder, 26);
  assert.equal(scott76?.seats[26]?.grokTemplateUrl, "https://x.ai/bot/J7I56EwtEh0D3yMGhnwSZ");
  assert.match(scott76?.routingRule ?? "", /Doordash only for DoorDash cart/);
  assert.equal(scott76?.seats[27]?.name, "Competitive Snake Alert");
  assert.equal(scott76?.seats[27]?.id, "20000000-0000-0000-0000-000000000611");
  assert.equal(scott76?.seats[27]?.isDesk, false);
  assert.equal(scott76?.seats[27]?.sortOrder, 27);
  assert.equal(scott76?.seats[27]?.grokTemplateUrl, "https://x.ai/bot/NqCINqE9LDY9XTw2vP_XT");
  assert.match(scott76?.routingRule ?? "", /Competitive Snake Alert only for competitor watch/);

  const colin76 = getFallbackPack("colinmcdermott", "colin");
  assert.equal(colin76?.seats.length, 12);
  assert.equal(colin76?.seats[0]?.name, "Store setup from zero");
  assert.equal(colin76?.seats[0]?.isDesk, true);
  assert.equal(colin76?.seats[10]?.name, "Jev router");
  assert.equal(colin76?.seats[10]?.id, "20000000-0000-0000-0000-000000000599");
  assert.equal(colin76?.seats[11]?.name, "Whop Economic Intelligence");
  assert.equal(colin76?.seats[11]?.id, "20000000-0000-0000-0000-000000000613");
  assert.equal(colin76?.seats[11]?.isDesk, false);
  assert.equal(colin76?.seats[11]?.sortOrder, 11);
  assert.equal(colin76?.seats[11]?.grokTemplateUrl, "https://x.ai/bot/M2ZLrLAUFFU0fFf6Aq28c");
  assert.match(colin76?.routingRule ?? "", /Whop Economic Intelligence only for Whop next-best-action/);

  const mattyp76 = getFallbackPack("mattyp", "mattyp");
  assert.equal(mattyp76?.seats.length, 2);
  assert.equal(mattyp76?.seats[1]?.name, "Media Manager");
  assert.equal(mattyp76?.seats[1]?.id, "20000000-0000-0000-0000-000000000601");

  const adventure76 = getFallbackPack("AdventureNLearn", "adventure");
  assert.equal(adventure76?.seats.length, 4);
  assert.equal(adventure76?.seats[2]?.name, "Soulsie Riff");
  assert.equal(adventure76?.seats[2]?.id, "20000000-0000-0000-0000-000000000602");

  const wardonis = getFallbackPack("Wardonis", "wardonis");
  assert.equal(wardonis?.seats.length, 7);
  assert.equal(wardonis?.seats[0]?.name, "Hearthstone Deckbuilder");
  assert.equal(wardonis?.seats[0]?.isDesk, true);

  const damiano = getFallbackPack("damianoredem", "damiano");
  assert.equal(damiano?.seats.length, 5);
  assert.equal(damiano?.seats[0]?.name, "OS: Ontology Stack");

  const knockAj = getFallbackPack("suddenlyjon", "knock");
  assert.equal(knockAj?.seats.length, 44);
  assert.equal(knockAj?.seats[0]?.name, "Token Accountant");
  assert.equal(knockAj?.seats[0]?.isDesk, true);
  assert.equal(knockAj?.seats[28]?.name, "Window");
  assert.equal(knockAj?.seats[29]?.name, "Fit Finder");
  assert.equal(knockAj?.seats[29]?.id, "20000000-0000-0000-0000-000000000612");
  assert.equal(knockAj?.seats[29]?.isDesk, false);
  assert.equal(knockAj?.seats[29]?.sortOrder, 29);
  assert.equal(knockAj?.seats[29]?.grokTemplateUrl, "https://x.ai/bot/0boCprpn_3yaiJ5PZIGCw");
  assert.match(knockAj?.routingRule ?? "", /Fit Finder only for outfit-from-photo shopping links/);
  assert.equal(knockAj?.seats[30]?.name, "Rebrander");
  assert.equal(knockAj?.seats[30]?.id, "20000000-0000-0000-0000-000000000614");
  assert.equal(knockAj?.seats[30]?.isDesk, false);
  assert.equal(knockAj?.seats[30]?.sortOrder, 30);
  assert.equal(knockAj?.seats[30]?.grokTemplateUrl, "https://x.ai/bot/HGorKc5KDQLynW4JONxn_");
  assert.match(knockAj?.routingRule ?? "", /Rebrander only for business\/product rename \/ old-brand cleanup/);

});

test("Hiten keeps Pitch Deck Coach desk and four named seats including When It Matters", () => {
  const hiten = getFallbackPack("hnshah", "hiten");
  assert.ok(hiten);
  assert.equal(hiten.id, "10000000-0000-0000-0000-000000000015");
  assert.equal(hiten.official, false);
  assert.equal(hiten.featured, false);
  assert.deepEqual(
    hiten.seats.map((item) => ({
      id: item.id,
      name: item.name,
      isDesk: item.isDesk,
      sortOrder: item.sortOrder,
      grokTemplateUrl: item.grokTemplateUrl,
    })),
    [
      {
        id: "20000000-0000-0000-0000-000000000007",
        name: "Pitch Deck Coach",
        isDesk: true,
        sortOrder: 0,
        grokTemplateUrl: "https://x.ai/bot/mqVPHm0oB3WPsnxbU1qB9",
      },
      {
        id: "20000000-0000-0000-0000-000000000008",
        name: "It's Britney",
        isDesk: false,
        sortOrder: 1,
        grokTemplateUrl: "https://x.ai/bot/pNLwpHs8rmtMzAkUi-Zu2",
      },
      {
        id: "20000000-0000-0000-0000-000000000012",
        name: "Product Idea Stress Test",
        isDesk: false,
        sortOrder: 2,
        grokTemplateUrl: "https://x.ai/bot/JeFTvcDX-7QT2evKGIb52",
      },
      {
        id: "20000000-0000-0000-0000-000000000013",
        name: "The Page",
        isDesk: false,
        sortOrder: 3,
        grokTemplateUrl: "https://x.ai/bot/uFRK1GoAsiopBLPY19QCe",
      },
      {
        id: "20000000-0000-0000-0000-000000000111",
        name: "When It Matters",
        isDesk: false,
        sortOrder: 4,
        grokTemplateUrl: "https://x.ai/bot/BqrH8_GNQvSYV-gcmJnd8",
      },
    ]
  );
  assert.match(hiten.routingRule, /Pitch Deck Coach/);
  assert.match(hiten.routingRule, /It's Britney only for Britney/);
  assert.match(hiten.routingRule, /Product Idea Stress Test only for idea and assumption testing/);
  assert.match(hiten.routingRule, /The Page only for public-page change watches/);
  assert.match(hiten.routingRule, /When It Matters only for watches that should message when the answer actually changes/);
  assert.match(hiten.readmeMd ?? "", /Do not add Box Inspector/);
  assert.ok(!hiten.seats.some((item) => /box inspector/i.test(item.name)));
  assert.match(hiten.seats[4]?.job ?? "", /when it matters/i);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/BqrH8_GNQvSYV-gcmJnd8/);
});

test("new packs are unofficial, unfeatured, and use canonical x.ai/bot URLs", () => {
  const expected = [
    {
      owner: "talsiach",
      slug: "tal",
      desk: "Blunt",
      url: "https://x.ai/bot/N0J32FbnVRuetJi1oJggh",
      seatId: "20000000-0000-0000-0000-000000000014",
    },
    {
      owner: "thesmitpatel",
      slug: "smit",
      desk: "Commercial Taste",
      url: "https://x.ai/bot/vekulzIMXM8hDjkp-mDkX",
      seatId: "20000000-0000-0000-0000-000000000015",
    },
    {
      owner: "dannylimanseta",
      slug: "danny",
      desk: "Sable: Game Art",
      url: "https://x.ai/bot/oSvAMKX_ahD56ZmgwtRys",
      seatId: "20000000-0000-0000-0000-000000000016",
    },
    {
      owner: "massimodeluisa",
      slug: "massimo",
      desk: "Human Copywriter",
      url: "https://x.ai/bot/JZAccYtlRFvDSU2CnMnkZ",
      seatId: "20000000-0000-0000-0000-000000000017",
    },
    {
      owner: "MaiYangAI",
      slug: "mai",
      desk: "Grok Deck",
      url: "https://x.ai/bot/Ja9NzNTRz2ozzQLNfrJwI",
      seatId: "20000000-0000-0000-0000-000000000018",
    },
  ] as const;

  for (const item of expected) {
    const pack = getFallbackPack(item.owner, item.slug);
    assert.ok(pack, `${item.owner}/${item.slug}`);
    assert.equal(pack.official, false);
    assert.equal(pack.featured, false);
    if (item.slug === "mai") {
      assert.equal(pack.seats.length, 3);
    } else if (item.slug === "massimo") {
      assert.equal(pack.seats.length, 2);
    } else {
      assert.equal(pack.seats.length, 1);
    }
    assert.equal(pack.seats[0]?.name, item.desk);
    assert.equal(pack.seats[0]?.isDesk, true);
    assert.equal(pack.seats[0]?.id, item.seatId);
    assert.equal(pack.seats[0]?.grokTemplateUrl, item.url);
    assert.equal(parseGrokTemplateUrl(pack.seats[0]?.grokTemplateUrl), item.url);
    assert.match(seedSql, new RegExp(item.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.equal(getFallbackProfile("maiyang"), null);
  assert.ok(getFallbackProfile("MaiYangAI"));
  const lauren = getFallbackPack("poteto", "lauren");
  assert.ok(!lauren?.seats.some((item) => /peddler/i.test(item.name)));
});

test("Farzad keeps Claudey as desk and adds Shorty and Researchy", () => {
  const farzad = getFallbackPack("farzyness", "farzad");
  assert.ok(farzad);
  assert.equal(farzad.seats[0]?.name, "Claudey");
  assert.equal(farzad.seats[0]?.isDesk, true);
  assert.equal(farzad.seats[0]?.grokTemplateUrl, "https://x.ai/bot/OR72i4SNc0_F1IzbCfg-D");
  assert.deepEqual(
    farzad.seats.map((item) => ({
      name: item.name,
      isDesk: item.isDesk,
      sortOrder: item.sortOrder,
      grokTemplateUrl: item.grokTemplateUrl,
    })),
    [
      {
        name: "Claudey",
        isDesk: true,
        sortOrder: 0,
        grokTemplateUrl: "https://x.ai/bot/OR72i4SNc0_F1IzbCfg-D",
      },
      {
        name: "Shorty",
        isDesk: false,
        sortOrder: 1,
        grokTemplateUrl: "https://x.ai/bot/32fHIBw9Yz-s_o35KycGX",
      },
      {
        name: "Researchy",
        isDesk: false,
        sortOrder: 2,
        grokTemplateUrl: "https://x.ai/bot/rQt4W2zO2Gx9lfcBjd1lj",
      },
      {
        name: "Video Creator",
        isDesk: false,
        sortOrder: 3,
        grokTemplateUrl: "https://x.ai/bot/RPtsHesZPgAlwMOZAX8Ef",
      },
    ]
  );
  assert.match(farzad.routingRule, /Claudey/);
  assert.match(farzad.routingRule, /Shorty only for YouTube Shorts clipping/);
  assert.match(farzad.routingRule, /Researchy only for Grok Build CLI at max thinking/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/32fHIBw9Yz-s_o35KycGX/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/rQt4W2zO2Gx9lfcBjd1lj/);
});

test("Nao keeps Rutin as desk and adds Chieeeeefy", () => {
  const nao = getFallbackPack("naoufalelh", "nao");
  assert.ok(nao);
  assert.equal(nao.seats[0]?.name, "Rutin");
  assert.equal(nao.seats[0]?.isDesk, true);
  assert.deepEqual(
    nao.seats.slice(0, 5).map((item) => ({
      name: item.name,
      isDesk: item.isDesk,
      sortOrder: item.sortOrder,
      grokTemplateUrl: item.grokTemplateUrl,
    })),
    [
      {
        name: "Rutin",
        isDesk: true,
        sortOrder: 0,
        grokTemplateUrl: "https://x.ai/bot/o4gWkNGmffEaVtOhaEsA7",
      },
      {
        name: "Chieeeeefy",
        isDesk: false,
        sortOrder: 1,
        grokTemplateUrl: "https://x.ai/bot/GiBPBQR2WrHNul4k9Tz6Q",
      },
      {
        name: "Fondi",
        isDesk: false,
        sortOrder: 2,
        grokTemplateUrl: "https://x.ai/bot/qL920VjKyua3_u89UYnQL",
      },
      {
        name: "Clock",
        isDesk: false,
        sortOrder: 3,
        grokTemplateUrl: "https://x.ai/bot/o1i1t2DhvfahqIlO5o1gd",
      },
      {
        name: "Eric · Gift Scout",
        isDesk: false,
        sortOrder: 4,
        grokTemplateUrl: "https://x.ai/bot/W4gNjXXfAN_S75Y-cakHM",
      },
    ]
  );
  assert.match(nao.routingRule, /Rutin/);
  assert.match(nao.routingRule, /Chieeeeefy only for chief-of-staff work/);
  assert.match(nao.routingRule, /Fondi only for founding-team installer work/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/GiBPBQR2WrHNul4k9Tz6Q/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/qL920VjKyua3_u89UYnQL/);
});

test("Jenna keeps Trendspotter as desk and adds Bing Bong and Event Producer", () => {
  const jenna = getFallbackPack("jennananpei", "jenna");
  assert.ok(jenna);
  assert.equal(jenna.official, false);
  assert.equal(jenna.featured, false);
  assert.equal(jenna.owner.avatarUrl, null);
  assert.deepEqual(
    jenna.seats.map((item) => ({
      id: item.id,
      name: item.name,
      isDesk: item.isDesk,
      sortOrder: item.sortOrder,
      grokTemplateUrl: item.grokTemplateUrl,
    })),
    [
      {
        id: "20000000-0000-0000-0000-000000000035",
        name: "Trendspotter",
        isDesk: true,
        sortOrder: 0,
        grokTemplateUrl: "https://x.ai/bot/nnDL-hclNLB8SkJvcVtwr",
      },
      {
        id: "20000000-0000-0000-0000-000000000036",
        name: "Bing Bong",
        isDesk: false,
        sortOrder: 1,
        grokTemplateUrl: "https://x.ai/bot/BjzK0lRsgxuLSsQIsnI3E",
      },
      {
        id: "20000000-0000-0000-0000-000000000037",
        name: "Event Producer",
        isDesk: false,
        sortOrder: 2,
        grokTemplateUrl: "https://x.ai/bot/5gyGG-rnVsQVTLWAfki1u",
      },
      {
        id: "20000000-0000-0000-0000-000000000229",
        name: "Dan Lanning",
        isDesk: false,
        sortOrder: 3,
        grokTemplateUrl: "https://x.ai/bot/1xyC1R0zvv2vKTQHLzYWS",
      },
    ]
  );
  assert.match(jenna.routingRule, /Trendspotter/);
  assert.match(jenna.routingRule, /Dan Lanning only for pitch and discovery-call coaching/);
  assert.match(jenna.routingRule, /Bing Bong only for sports marketing partnership ops/);
  assert.match(jenna.routingRule, /Event Producer only for VIP and field event production/);
});

test("Mai keeps Grok Deck as desk and adds the Chinese tweet-scanner seat", () => {
  const mai = getFallbackPack("MaiYangAI", "mai");
  assert.ok(mai);
  assert.equal(mai.official, false);
  assert.equal(mai.featured, false);
  assert.deepEqual(
    mai.seats.map((item) => ({
      id: item.id,
      name: item.name,
      isDesk: item.isDesk,
      sortOrder: item.sortOrder,
      grokTemplateUrl: item.grokTemplateUrl,
    })),
    [
      {
        id: "20000000-0000-0000-0000-000000000018",
        name: "Grok Deck",
        isDesk: true,
        sortOrder: 0,
        grokTemplateUrl: "https://x.ai/bot/Ja9NzNTRz2ozzQLNfrJwI",
      },
      {
        id: "20000000-0000-0000-0000-000000000019",
        name: "最值得关注的Grok Bot 推文？",
        isDesk: false,
        sortOrder: 1,
        grokTemplateUrl: "https://x.ai/bot/lFDR77qKaT3Iglzv9pUac",
      },
      {
        id: "20000000-0000-0000-0000-000000000324",
        name: "Sweeper / 清道夫",
        isDesk: false,
        sortOrder: 2,
        grokTemplateUrl: "https://x.ai/bot/SD6hgpiXqbV_LkMetf2fC",
      },
    ]
  );
  assert.match(mai.routingRule, /Grok Deck/);
  assert.match(mai.routingRule, /最值得关注的Grok Bot 推文？/);
  assert.match(mai.routingRule, /Sweeper \/ 清道夫/);
  assert.match(mai.seats[1]?.job ?? "", /Chinese/);
  assert.match(mai.seats[1]?.job ?? "", /Does not post/);
});

test("new packs are unofficial, unfeatured, and keep one desk per author", () => {
  const expected = [
    {
      owner: "shanemac",
      slug: "shane",
      name: "Shane",
      desk: "Librarian",
      url: "https://x.ai/bot/suKVjDAR-hSr_PTBxgdRw",
      seatId: "20000000-0000-0000-0000-000000000020",
      packId: "10000000-0000-0000-0000-000000000024",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "a-makelky",
      slug: "aaron",
      name: "Aaron",
      desk: "Set Up",
      url: "https://x.ai/bot/BsExflSUXpW0hs21OTBzu",
      seatId: "20000000-0000-0000-0000-000000000021",
      packId: "10000000-0000-0000-0000-000000000025",
      seats: 4,
      topic: "founder",
    },
    {
      owner: "LeTerryBZH",
      slug: "thierry",
      name: "Thierry",
      desk: "2nd Brain",
      url: "https://x.ai/bot/c4fYduVVic2YtbcjXquD0",
      seatId: "20000000-0000-0000-0000-000000000024",
      packId: "10000000-0000-0000-0000-000000000026",
      seats: 3,
      topic: "developer",
    },
    {
      owner: "ahalvor",
      slug: "andy",
      name: "Andy",
      desk: "Homeroom",
      url: "https://x.ai/bot/IciOb-9jMtlkc1RJj6MQe",
      seatId: "20000000-0000-0000-0000-000000000025",
      packId: "10000000-0000-0000-0000-000000000027",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "amberdawn1786",
      slug: "amber",
      name: "Amber",
      desk: "Sous Chef",
      url: "https://x.ai/bot/RuCu3IpKAvrx00H0MDI0t",
      seatId: "20000000-0000-0000-0000-000000000026",
      packId: "10000000-0000-0000-0000-000000000028",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "NicoChauvin74",
      slug: "nicolas",
      name: "Nicolas",
      desk: "BeTree",
      url: "https://x.ai/bot/2PSNlIROOJPj9qZlfRy0w",
      seatId: "20000000-0000-0000-0000-000000000027",
      packId: "10000000-0000-0000-0000-000000000029",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "JordanHall_dev",
      slug: "jordan",
      name: "Jordan",
      desk: "Usage-pool orchestrator",
      url: "https://x.ai/bot/Nx4wpKeM_NYx577xlJFMD",
      seatId: "20000000-0000-0000-0000-000000000028",
      packId: "10000000-0000-0000-0000-000000000030",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "mdafanulh",
      slug: "md",
      name: "Md",
      desk: "Lumos",
      url: "https://x.ai/bot/SwTxLoOaIwDqTSvhTIhrK",
      seatId: "20000000-0000-0000-0000-000000000029",
      packId: "10000000-0000-0000-0000-000000000031",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "rrrkren",
      slug: "eric-ren",
      name: "Eric Ren",
      desk: "unifi AQ trmnl integration",
      url: "https://x.ai/bot/NU02qQ9iahZtAM0i0x1KT",
      seatId: "20000000-0000-0000-0000-000000000030",
      packId: "10000000-0000-0000-0000-000000000032",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "billzanetti",
      slug: "bill",
      name: "Bill",
      desk: "Grok Build",
      url: "https://x.ai/bot/eydijdzrfgtnmlnUyPSI-",
      seatId: "20000000-0000-0000-0000-000000000031",
      packId: "10000000-0000-0000-0000-000000000033",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "abdshomad",
      slug: "abd",
      name: "Abd",
      desk: "Bot Father",
      url: "https://x.ai/bot/dVQjvC6c-sMhtgVskciBH",
      seatId: "20000000-0000-0000-0000-000000000032",
      packId: "10000000-0000-0000-0000-000000000034",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "brstorrie",
      slug: "ben",
      name: "Ben",
      desk: "The Accountant",
      url: "https://x.ai/bot/Y_R1Ya9SIzQZguGTV5NCX",
      seatId: "20000000-0000-0000-0000-000000000033",
      packId: "10000000-0000-0000-0000-000000000035",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "beaudenison",
      slug: "beau",
      name: "Beau",
      desk: "Grok Build",
      url: "https://x.ai/bot/iwa3WaHZn385jfZrsQngL",
      seatId: "20000000-0000-0000-0000-000000000034",
      packId: "10000000-0000-0000-0000-000000000036",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "jennananpei",
      slug: "jenna",
      name: "Jenna",
      desk: "Trendspotter",
      url: "https://x.ai/bot/nnDL-hclNLB8SkJvcVtwr",
      seatId: "20000000-0000-0000-0000-000000000035",
      packId: "10000000-0000-0000-0000-000000000037",
      seats: 4,
      topic: "founder",
    },
    {
      owner: "funkii",
      slug: "funkii",
      name: "funkii",
      desk: "t2000",
      url: "https://x.ai/bot/eXQt5VUovcU0HMj_b-CDY",
      seatId: "20000000-0000-0000-0000-000000000038",
      packId: "10000000-0000-0000-0000-000000000038",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "SumoSign",
      slug: "keith",
      name: "Keith",
      desk: "SumoSign",
      url: "https://x.ai/bot/Uicr9Dc3FKOmsMfbN_NHB",
      seatId: "20000000-0000-0000-0000-000000000039",
      packId: "10000000-0000-0000-0000-000000000039",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "bfrench",
      slug: "bill-french",
      name: "Bill French",
      desk: "STEER",
      url: "https://x.ai/bot/mhzjt-Pa01Ds8EJ0zJrcz",
      seatId: "20000000-0000-0000-0000-000000000040",
      packId: "10000000-0000-0000-0000-000000000040",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "herdrdev",
      slug: "can",
      name: "Can",
      desk: "Shepherd",
      url: "https://x.ai/bot/i5YF8f-zdcR76uKPrqg3J",
      seatId: "20000000-0000-0000-0000-000000000041",
      packId: "10000000-0000-0000-0000-000000000041",
      seats: 1,
      topic: "developer",
    },
  ] as const;

  for (const item of expected) {
    const pack = getFallbackPack(item.owner, item.slug);
    assert.ok(pack, `${item.owner}/${item.slug}`);
    assert.equal(pack.id, item.packId);
    assert.equal(pack.name, item.name);
    assert.equal(pack.official, false);
    assert.equal(pack.featured, false);
    assert.deepEqual(pack.topics, [item.topic]);
    assert.ok(pack.seats.length >= item.seats);
    assert.equal(pack.seats[0]?.name, item.desk);
    assert.equal(pack.seats[0]?.isDesk, true);
    assert.equal(pack.seats[0]?.sortOrder, 0);
    assert.equal(pack.seats[0]?.id, item.seatId);
    assert.equal(pack.seats[0]?.grokTemplateUrl, item.url);
    assert.equal(parseGrokTemplateUrl(pack.seats[0]?.grokTemplateUrl), item.url);
    assert.match(seedSql, new RegExp(item.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(seedSql, new RegExp(item.packId));
  }

  const aaron = getFallbackPack("a-makelky", "aaron");
  assert.ok(aaron);
  assert.deepEqual(
    aaron.seats.map((item) => ({
      name: item.name,
      isDesk: item.isDesk,
      sortOrder: item.sortOrder,
      grokTemplateUrl: item.grokTemplateUrl,
    })),
    [
      {
        name: "Set Up",
        isDesk: true,
        sortOrder: 0,
        grokTemplateUrl: "https://x.ai/bot/BsExflSUXpW0hs21OTBzu",
      },
      {
        name: "Overwatch",
        isDesk: false,
        sortOrder: 1,
        grokTemplateUrl: "https://x.ai/bot/HtClSXO_AmiQoyYH9aXV9",
      },
      {
        name: "CoS",
        isDesk: false,
        sortOrder: 2,
        grokTemplateUrl: "https://x.ai/bot/eiVFbd0nIdH2gzSwHOs0D",
      },
      {
        name: "Changelog Scout",
        isDesk: false,
        sortOrder: 3,
        grokTemplateUrl: "https://x.ai/bot/_VfbyLY4aGU8KJD46l5Mk",
      },
    ]
  );
  assert.match(aaron.routingRule, /Set Up/);
  assert.match(aaron.routingRule, /Overwatch only for multi-bot workspace organization/);
  assert.match(aaron.routingRule, /CoS only for chief-of-staff work/);

  const eric = getFallbackPack("ericzakariasson", "eric");
  const ericRen = getFallbackPack("rrrkren", "eric-ren");
  assert.ok(eric);
  assert.ok(ericRen);
  assert.equal(eric.slug, "eric");
  assert.equal(ericRen.slug, "eric-ren");
  assert.equal(ericRen.name, "Eric Ren");
  assert.notEqual(eric.id, ericRen.id);
  assert.equal(getFallbackPack("rrrkren", "eric"), null);
  assert.equal(getFallbackProfile("ericren"), null);
  assert.ok(getFallbackProfile("rrrkren"));
  assert.ok(getFallbackProfile("a-makelky"));
  assert.equal(getFallbackProfile("theaaron"), null);
  assert.equal(getFallbackProfile("ShaneMac"), null);
  assert.ok(getFallbackProfile("shanemac"));

  const bill = getFallbackPack("billzanetti", "bill");
  assert.ok(bill);
  assert.ok(!bill.seats.some((item) => /steer/i.test(item.name)));
  assert.match(bill.readmeMd ?? "", /Do not add STEER/);
  assert.match(bill.readmeMd ?? "", /Do not add Beau's Grok Build/);
  assert.equal(bill.seats[0]?.grokTemplateUrl, "https://x.ai/bot/eydijdzrfgtnmlnUyPSI-");

  const teslaconomics = getFallbackPack("Teslaconomics", "teslaconomics");
  assert.ok(teslaconomics);
  assert.equal(teslaconomics.name, "Teslaconomics");
  assert.equal(teslaconomics.slug, "teslaconomics");
  assert.equal(teslaconomics.seats[0]?.name, "Grok Build");
  assert.equal(teslaconomics.seats[0]?.grokTemplateUrl, "https://x.ai/bot/ZRxm1O9tmizOhriV7GiWL");
  assert.notEqual(bill.seats[0]?.grokTemplateUrl, teslaconomics.seats[0]?.grokTemplateUrl);
  assert.match(teslaconomics.readmeMd ?? "", /not Bill Zanetti's Grok Build/);
  assert.match(teslaconomics.readmeMd ?? "", /not Beau's Grok Build/);
  assert.ok(!bill.seats.some((item) => item.grokTemplateUrl === "https://x.ai/bot/ZRxm1O9tmizOhriV7GiWL"));
  assert.ok(!bill.seats.some((item) => item.grokTemplateUrl === "https://x.ai/bot/iwa3WaHZn385jfZrsQngL"));

  const beau = getFallbackPack("beaudenison", "beau");
  assert.ok(beau);
  assert.equal(beau.seats[0]?.grokTemplateUrl, "https://x.ai/bot/iwa3WaHZn385jfZrsQngL");
  assert.notEqual(beau.seats[0]?.grokTemplateUrl, bill.seats[0]?.grokTemplateUrl);
  assert.notEqual(beau.seats[0]?.grokTemplateUrl, teslaconomics.seats[0]?.grokTemplateUrl);
  assert.match(beau.readmeMd ?? "", /not Bill Zanetti's Grok Build/);
  assert.match(beau.readmeMd ?? "", /not Teslaconomics' Grok Build/);

  const billFrench = getFallbackPack("bfrench", "bill-french");
  assert.ok(billFrench);
  assert.equal(billFrench.seats[0]?.name, "STEER");
  assert.equal(billFrench.seats[0]?.grokTemplateUrl, "https://x.ai/bot/mhzjt-Pa01Ds8EJ0zJrcz");
  assert.equal(getFallbackPack("bfrench", "bill"), null);
  assert.equal(getFallbackPack("billzanetti", "bill-french"), null);

  assert.ok(!aaron.seats.some((item) => /accountant/i.test(item.name)));
  const ben = getFallbackPack("brstorrie", "ben");
  assert.ok(ben);
  assert.match(ben.readmeMd ?? "", /do not add it to Aaron/);

  const lauren = getFallbackPack("poteto", "lauren");
  assert.equal(lauren?.seats.length, 2);
  assert.equal(lauren?.seats[0]?.name, "Dr Eggbot");
  assert.equal(lauren?.seats[0]?.isDesk, true);
  assert.equal(lauren?.seats[0]?.grokTemplateUrl, "https://x.ai/bot/93gOz3op1UQdBdbekQFLK");
  assert.equal(lauren?.seats[1]?.name, "tinkabot");
  assert.equal(lauren?.seats[1]?.isDesk, false);
  assert.equal(lauren?.seats[1]?.id, "20000000-0000-0000-0000-000000000157");
  assert.equal(lauren?.seats[1]?.grokTemplateUrl, "https://x.ai/bot/br5f3C4mc75QCMEHaszXd");
  assert.ok(!lauren?.seats.some((item) => /peddler/i.test(item.name)));
  assert.ok(!lauren?.seats.some((item) => /box inspector/i.test(item.name)));
});

test("seed.sql dual-write covers Hiten seats and new owners", () => {
  for (const id of [
    "20000000-0000-0000-0000-000000000012",
    "20000000-0000-0000-0000-000000000013",
    "20000000-0000-0000-0000-000000000014",
    "20000000-0000-0000-0000-000000000015",
    "20000000-0000-0000-0000-000000000016",
    "20000000-0000-0000-0000-000000000017",
    "20000000-0000-0000-0000-000000000018",
    "20000000-0000-0000-0000-000000000019",
    "20000000-0000-0000-0000-000000000020",
    "20000000-0000-0000-0000-000000000021",
    "20000000-0000-0000-0000-000000000022",
    "20000000-0000-0000-0000-000000000023",
    "20000000-0000-0000-0000-000000000024",
    "20000000-0000-0000-0000-000000000025",
    "20000000-0000-0000-0000-000000000026",
    "20000000-0000-0000-0000-000000000027",
    "20000000-0000-0000-0000-000000000028",
    "20000000-0000-0000-0000-000000000029",
    "20000000-0000-0000-0000-000000000030",
    "20000000-0000-0000-0000-000000000031",
    "20000000-0000-0000-0000-000000000032",
    "20000000-0000-0000-0000-000000000033",
    "20000000-0000-0000-0000-000000000034",
    "20000000-0000-0000-0000-000000000035",
    "20000000-0000-0000-0000-000000000036",
    "20000000-0000-0000-0000-000000000037",
    "20000000-0000-0000-0000-000000000038",
    "20000000-0000-0000-0000-000000000039",
    "20000000-0000-0000-0000-000000000040",
    "20000000-0000-0000-0000-000000000041",
    "20000000-0000-0000-0000-000000000042",
    "20000000-0000-0000-0000-000000000043",
    "20000000-0000-0000-0000-000000000044",
    "20000000-0000-0000-0000-000000000102",
    "20000000-0000-0000-0000-000000000103",
    "20000000-0000-0000-0000-000000000110",
    "20000000-0000-0000-0000-000000000111",
    "20000000-0000-0000-0000-000000000112",
    "20000000-0000-0000-0000-000000000113",
    "20000000-0000-0000-0000-000000000114",
    "20000000-0000-0000-0000-000000000115",
    "20000000-0000-0000-0000-000000000116",
    "20000000-0000-0000-0000-000000000117",
    "20000000-0000-0000-0000-000000000118",
    "20000000-0000-0000-0000-000000000119",
    "20000000-0000-0000-0000-000000000120",
    "20000000-0000-0000-0000-000000000121",
    "20000000-0000-0000-0000-000000000122",
    "20000000-0000-0000-0000-000000000123",
    "20000000-0000-0000-0000-000000000124",
  ]) {
    assert.match(seedSql, new RegExp(id));
  }
  assert.match(seedSql, /talsiach@orgbots\.dev/);
  assert.match(seedSql, /thesmitpatel@orgbots\.dev/);
  assert.match(seedSql, /dannylimanseta@orgbots\.dev/);
  assert.match(seedSql, /massimodeluisa@orgbots\.dev/);
  assert.match(seedSql, /MaiYangAI@orgbots\.dev/);
  assert.match(seedSql, /shanemac@orgbots\.dev/);
  assert.match(seedSql, /a-makelky@orgbots\.dev/);
  assert.match(seedSql, /LeTerryBZH@orgbots\.dev/);
  assert.match(seedSql, /ahalvor@orgbots\.dev/);
  assert.match(seedSql, /amberdawn1786@orgbots\.dev/);
  assert.match(seedSql, /NicoChauvin74@orgbots\.dev/);
  assert.match(seedSql, /JordanHall_dev@orgbots\.dev/);
  assert.match(seedSql, /mdafanulh@orgbots\.dev/);
  assert.match(seedSql, /rrrkren@orgbots\.dev/);
  assert.match(seedSql, /billzanetti@orgbots\.dev/);
  assert.match(seedSql, /abdshomad@orgbots\.dev/);
  assert.match(seedSql, /brstorrie@orgbots\.dev/);
  assert.match(seedSql, /beaudenison@orgbots\.dev/);
  assert.match(seedSql, /jennananpei@orgbots\.dev/);
  assert.match(seedSql, /funkii@orgbots\.dev/);
  assert.match(seedSql, /SumoSign@orgbots\.dev/);
  assert.match(seedSql, /bfrench@orgbots\.dev/);
  assert.match(seedSql, /herdrdev@orgbots\.dev/);
  assert.match(seedSql, /arthurmacwaters@orgbots\.dev/);
  assert.match(seedSql, /kentcdodds@orgbots\.dev/);
  assert.match(seedSql, /Teslaconomics@orgbots\.dev/);
  assert.match(seedSql, /10000000-0000-0000-0000-000000000023/);
  assert.match(seedSql, /10000000-0000-0000-0000-000000000033/);
  assert.match(seedSql, /10000000-0000-0000-0000-000000000034/);
  assert.match(seedSql, /10000000-0000-0000-0000-000000000041/);
  assert.match(seedSql, /10000000-0000-0000-0000-000000000042/);
  assert.match(seedSql, /10000000-0000-0000-0000-000000000091/);
  assert.match(seedSql, /10000000-0000-0000-0000-000000000097/);
  assert.match(seedSql, /tpgoebel@orgbots\.dev/);
  assert.match(seedSql, /johnbai@orgbots\.dev/);
  assert.match(seedSql, /ZenSched@orgbots\.dev/);
  assert.match(seedSql, /MSaintjour@orgbots\.dev/);
  assert.match(seedSql, /NikolaFYI@orgbots\.dev/);
  assert.match(seedSql, /benngarnish@orgbots\.dev/);
  assert.match(seedSql, /OTNworld@orgbots\.dev/);
  assert.match(seedSql, /HenryLeeBauta@orgbots\.dev/);
  assert.match(seedSql, /inqusit@orgbots\.dev/);
  assert.match(seedSql, /adgapar@orgbots\.dev/);
  assert.match(seedSql, /minebotcoin@orgbots\.dev/);
  assert.match(seedSql, /dennisonbertram@orgbots\.dev/);
  assert.match(seedSql, /adamlowisz@orgbots\.dev/);
  assert.match(seedSql, /chasemc67@orgbots\.dev/);
  assert.match(seedSql, /10000000-0000-0000-0000-000000000098/);
  assert.match(seedSql, /10000000-0000-0000-0000-000000000103/);
  assert.match(seedSql, /10000000-0000-0000-0000-000000000108/);
  assert.match(seedSql, /'bill-french'/);
  assert.match(seedSql, /'eric-ren'/);
  assert.match(seedSql, /'teslaconomics'/);
  assert.match(seedSql, /'daniel-farinax'/);
  assert.match(seedSql, /'daniel-mac'/);
  assert.match(seedSql, /'daniel-zambrini'/);
  assert.match(seedSql, /'Box Inspector'/);
  assert.doesNotMatch(seedSql, /https:\/\/github\.com\/maiyang[^-A-Z]/i);
  assert.doesNotMatch(seedSql, /https:\/\/x\.ai\/bot\/plugin\//);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/mhzjt-Pa01Ds8EJ0zJrcz/);
  assert.doesNotMatch(seedSql, /https:\/\/x\.ai\/bot\/AY2y4oPL_VgcttCt8OFqm/);
  assert.doesNotMatch(seedSql, /https:\/\/x\.ai\/bot\/PFD95widaEeqjkYLLUZmD/);
  assert.doesNotMatch(seedSql, /https:\/\/x\.ai\/bot\/Yf3pOvZQ0B_9DDcCzuhDG/);
  assert.doesNotMatch(seedSql, /https:\/\/x\.ai\/bot\/pImOOCvE7uB1SXENOI9Ng/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/i5YF8f-zdcR76uKPrqg3J/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/iwa3WaHZn385jfZrsQngL/);
  assert.match(seedSql, /andreleibovici@orgbots\.dev/);
  assert.match(seedSql, /randywhitepdx@orgbots\.dev/);
  assert.match(seedSql, /pohlipit@orgbots\.dev/);
  assert.match(seedSql, /akshaybhopani@orgbots\.dev/);
  assert.match(seedSql, /frankfindsout@orgbots\.dev/);
  assert.match(seedSql, /ludiofelix@orgbots\.dev/);
  assert.match(seedSql, /bossriceshark@orgbots\.dev/);
  assert.match(seedSql, /saasocalypse@orgbots\.dev/);
  assert.match(seedSql, /mpieras@orgbots\.dev/);
  assert.match(seedSql, /emrecolakoglu@orgbots\.dev/);
  assert.match(seedSql, /AdemVessell@orgbots\.dev/);
  assert.match(seedSql, /andymadrick@orgbots\.dev/);
  assert.match(seedSql, /kunalsells@orgbots\.dev/);
  assert.match(seedSql, /yoda_FDE@orgbots\.dev/);
  assert.match(seedSql, /Bryanofearth@orgbots\.dev/);
  assert.match(seedSql, /CoonInvestments@orgbots\.dev/);
  assert.match(seedSql, /JOwens254@orgbots\.dev/);
  assert.match(seedSql, /onerinas@orgbots\.dev/);
  assert.match(seedSql, /pavravi@orgbots\.dev/);
  assert.match(seedSql, /'Dead Man''s Bot'/);
  assert.doesNotMatch(seedSql, /https:\/\/x\.ai\/bot\/NuFI0dF9FgvO8FfMPHKzx/);
  assert.doesNotMatch(seedSql, /https:\/\/x\.ai\/bot\/-CjM4_uRs6sEGdfZfC5gv/);
  assert.doesNotMatch(seedSql, /https:\/\/x\.ai\/bot\/08RSf587bOlWhbQai6A3I/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/jiF_km66YLNm5LBVJ5_Ho/);
  assert.doesNotMatch(seedSql, /https:\/\/x\.ai\/bot\/NuOSHSdCZPVkM78K0HkB3/);
  assert.doesNotMatch(seedSql, /https:\/\/x\.ai\/bot\/use-cases/);
});

test("grokbots.best gap-fill packs are unofficial with one desk and dual-written URLs", () => {
  const expected = [
    {
      owner: "arthurmacwaters",
      slug: "arthur",
      name: "Arthur",
      desk: "Research Bot",
      url: "https://x.ai/bot/Nn0ykGa3vJ6YS7ib7F6yH",
      seats: 1,
    },
    {
      owner: "Av1dlive",
      slug: "av1d",
      name: "Av1d",
      desk: "loops",
      url: "https://x.ai/bot/Ub3T7usX-c6yRQibQq83P",
      seats: 6,
    },
    {
      owner: "kentcdodds",
      slug: "kent",
      name: "Kent",
      desk: "Kody",
      url: "https://x.ai/bot/yTSGElYcIjFW_5IXu2I-e",
      seats: 2,
    },
    {
      owner: "lennysan",
      slug: "lenny",
      name: "Lenny",
      desk: "Be Happier",
      url: "https://x.ai/bot/0VC1XzREXRFGe0hVo-JEG",
      seats: 3,
    },
    {
      owner: "lingxi",
      slug: "lingxi",
      name: "Lingxi",
      desk: "Lingxi's Engineer Bot",
      url: "https://x.ai/bot/fY1xWwCLzDDGVe3GwH78j",
      seats: 2,
    },
    {
      owner: "waynesutton",
      slug: "wayne",
      name: "Wayne",
      desk: "Apps",
      url: "https://x.ai/bot/OPLop__-mqSsyQheR5JYv",
      seats: 2,
    },
    {
      owner: "tpgoebel",
      slug: "tobias-goebel",
      name: "Tobias Goebel",
      desk: "Melissa",
      url: "https://x.ai/bot/3foGoeh6ksDhD4jTxYjyE",
      seats: 1,
    },
    {
      owner: "imshiv6t9",
      slug: "shiv",
      name: "Shiv",
      desk: "Learning Assistant",
      url: "https://x.ai/bot/yE46R6j5vNPhd92fGxZRu",
      seats: 1,
    },
    {
      owner: "data_nexus",
      slug: "data-nexus",
      name: "Data Nexus",
      desk: "Blockchain Data Expert",
      url: "https://x.ai/bot/xqZS2HUq3XEoQ8oaH0LnA",
      seats: 2,
    },
    {
      owner: "darylbleach",
      slug: "daryl",
      name: "Daryl",
      desk: "Porter",
      url: "https://x.ai/bot/cl7kIRbcIuP6jj2Zt8z5K",
      seats: 1,
    },
    {
      owner: "johnbai",
      slug: "john",
      name: "John",
      desk: "figma bro",
      url: "https://x.ai/bot/VHMdjIGjGpgDSJR7dW6Gz",
      seats: 1,
    },
    {
      owner: "ZenSched",
      slug: "zensched",
      name: "ZenSched",
      desk: "ZenSched",
      url: "https://x.ai/bot/LK0rEXJnnD1qpEISXd7Ix",
      seats: 1,
    },
    {
      owner: "Daniel_Farinax",
      slug: "daniel-farinax",
      name: "Daniel Farinax",
      desk: "freebots.lol",
      url: "https://x.ai/bot/ndOGeXyjkQLdceRlk7JP4",
      seats: 2,
    },
    {
      owner: "daniel_mac8",
      slug: "daniel-mac",
      name: "Daniel Mac",
      desk: "X Brief",
      url: "https://x.ai/bot/GkX6X536UK2MlbkfGLQnb",
      seats: 1,
    },
    {
      owner: "DanielZambrini",
      slug: "daniel-zambrini",
      name: "Daniel Zambrini",
      desk: "Claude Code",
      url: "https://x.ai/bot/71PSQ4KBs-hNYBsH05X_n",
      seats: 1,
    },
  ] as const;

  for (const item of expected) {
    const pack = getFallbackPack(item.owner, item.slug);
    assert.ok(pack, `${item.owner}/${item.slug}`);
    assert.equal(pack.name, item.name);
    assert.equal(pack.official, false);
    assert.equal(pack.featured, false);
    assert.ok(pack.seats.length >= item.seats);
    assert.equal(pack.seats[0]?.name, item.desk);
    assert.equal(pack.seats[0]?.isDesk, true);
    assert.equal(pack.seats[0]?.grokTemplateUrl, item.url);
    assert.equal(parseGrokTemplateUrl(pack.seats[0]?.grokTemplateUrl), item.url);
    assert.match(seedSql, new RegExp(item.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  const kent = getFallbackPack("kentcdodds", "kent");
  assert.ok(kent);
  assert.equal(kent.seats[1]?.name, "Imogen");
  assert.equal(kent.seats[1]?.grokTemplateUrl, "https://x.ai/bot/9y2GcFkKMAUhYlMxRUS0X");
  assert.equal(kent.owner.githubLogin, "kentcdodds");
  assert.ok(kent.owner.avatarUrl);

  const av1d = getFallbackPack("Av1dlive", "av1d");
  assert.ok(av1d);
  assert.equal(av1d.owner.avatarUrl, null);
  assert.deepEqual(
    av1d.seats.map((item) => item.name),
    ["loops", "Master", "Chief of Staff", "Growth Desk", "Grok Bot Coach", "Inference Lab"]
  );

  const dataNexus = getFallbackPack("data_nexus", "data-nexus");
  assert.ok(dataNexus);
  assert.deepEqual(
    dataNexus.seats.map((item) => item.name),
    ["Blockchain Data Expert", "Blockchain Data Expert 2"]
  );
  assert.equal(dataNexus.seats[1]?.grokTemplateUrl, "https://x.ai/bot/eyFr_G8h9UmrQHNpZpNfx");

  const john = getFallbackPack("johnbai", "john");
  assert.ok(john);
  assert.equal(john.seats.length, 1);
  assert.equal(john.seats[0]?.name, "figma bro");
  assert.match(john.readmeMd ?? "", /Do not add SEO\/GEO Specialist/);
  assert.ok(!john.seats.some((item) => item.grokTemplateUrl === "https://x.ai/bot/pImOOCvE7uB1SXENOI9Ng"));

  const tobias = getFallbackPack("tobias_pfuetze", "tobias");
  const tobiasGoebel = getFallbackPack("tpgoebel", "tobias-goebel");
  assert.ok(tobias);
  assert.ok(tobiasGoebel);
  assert.notEqual(tobias.id, tobiasGoebel.id);
  assert.equal(tobiasGoebel.seats[0]?.name, "Melissa");

  const fallbackUrls = new Set(
    listFallbackPacks()
      .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
      .map((seat) => seat.grokTemplateUrl)
      .filter((url): url is string => Boolean(url))
  );
  const seedUrls = new Set(
    [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map((match) => match[0])
  );
  for (const url of fallbackUrls) {
    assert.ok(seedUrls.has(url), `seed missing ${url}`);
  }
});

test("Scott and DogecoinNorway keep their desks and add named extra seats", () => {
  const scott = getFallbackPack("scottxmetcalf", "scott");
  assert.ok(scott);
  assert.equal(scott.official, false);
  assert.equal(scott.featured, false);
  assert.equal(scott.seats[0]?.name, "Leader 1:1 Bot");
  assert.equal(scott.seats[0]?.isDesk, true);
  assert.deepEqual(
    scott.seats.map((item) => ({
      id: item.id,
      name: item.name,
      isDesk: item.isDesk,
      sortOrder: item.sortOrder,
      grokTemplateUrl: item.grokTemplateUrl,
    })),
    [
      {
        id: "20000000-0000-0000-0000-000000000091",
        name: "Leader 1:1 Bot",
        isDesk: true,
        sortOrder: 0,
        grokTemplateUrl: "https://x.ai/bot/eZhKhPkfxxFSml18TS2X8",
      },
      {
        id: "20000000-0000-0000-0000-000000000112",
        name: "SE call bot",
        isDesk: false,
        sortOrder: 1,
        grokTemplateUrl: "https://x.ai/bot/9wmmsO_xoeLPeGEqjWLzE",
      },
      {
        id: "20000000-0000-0000-0000-000000000125",
        name: "Cookie Monster",
        isDesk: false,
        sortOrder: 2,
        grokTemplateUrl: "https://x.ai/bot/55t0IuxxlT7BWffNVOKai",
      },
      {
        id: "20000000-0000-0000-0000-000000000214",
        name: "Token Cop",
        isDesk: false,
        sortOrder: 3,
        grokTemplateUrl: "https://x.ai/bot/Ml4ynlD6O1VT5CoYmFnEa",
      },
      {
        id: "20000000-0000-0000-0000-000000000230",
        name: "Gong Call Coach",
        isDesk: false,
        sortOrder: 4,
        grokTemplateUrl: "https://x.ai/bot/KpodhhBqjA4FHv47R1HrD",
      },
      {
        id: "20000000-0000-0000-0000-000000000231",
        name: "Meeting prep",
        isDesk: false,
        sortOrder: 5,
        grokTemplateUrl: "https://x.ai/bot/Hd3GphmPZ4aHWyFiBSmu5",
      },
      {
        id: "20000000-0000-0000-0000-000000000329",
        name: "Task Farming",
        isDesk: false,
        sortOrder: 6,
        grokTemplateUrl: "https://x.ai/bot/MmcPTdwYwr6ebmmZzswYe",
      },
      {
        id: "20000000-0000-0000-0000-000000000352",
        name: "Travel Agent",
        isDesk: false,
        sortOrder: 7,
        grokTemplateUrl: "https://x.ai/bot/d8C0ufUatv_fgoCRbfXZ4",
      },
      {
        id: "20000000-0000-0000-0000-000000000370",
        name: "Ramp",
        isDesk: false,
        sortOrder: 8,
        grokTemplateUrl: "https://x.ai/bot/zMMAByt3oW_t2ua1NZa9X",
      },
      {
        id: "20000000-0000-0000-0000-000000000371",
        name: "Todo",
        isDesk: false,
        sortOrder: 9,
        grokTemplateUrl: "https://x.ai/bot/wQHNsqt2KhOszyxMZ1xQ1",
      },
      {
        id: "20000000-0000-0000-0000-000000000372",
        name: "Forced Human Touches",
        isDesk: false,
        sortOrder: 10,
        grokTemplateUrl: "https://x.ai/bot/zSiLsURBgkKHhx0V9Wok2",
      },
      {
        id: "20000000-0000-0000-0000-000000000373",
        name: "Slacker",
        isDesk: false,
        sortOrder: 11,
        grokTemplateUrl: "https://x.ai/bot/R-TSImHItwbFHL8vYj9sc",
      },
      {
        id: "20000000-0000-0000-0000-000000000374",
        name: "Mission Control",
        isDesk: false,
        sortOrder: 12,
        grokTemplateUrl: "https://x.ai/bot/GGnJOdH3hv321H2QES9UE",
      },
      {
        id: "20000000-0000-0000-0000-000000000375",
        name: "PG Bot",
        isDesk: false,
        sortOrder: 13,
        grokTemplateUrl: "https://x.ai/bot/zsxwic_IlmyavESnhLiWZ",
      },
      {
        id: "20000000-0000-0000-0000-000000000376",
        name: "AE deal bot",
        isDesk: false,
        sortOrder: 14,
        grokTemplateUrl: "https://x.ai/bot/yXsqmCaODNkTEwtIbiXxe",
      },
      {
        id: "20000000-0000-0000-0000-000000000377",
        name: "ADM account bot",
        isDesk: false,
        sortOrder: 15,
        grokTemplateUrl: "https://x.ai/bot/4Gc1tZsJu7C8YH-EnTfaN",
      },
      {
        id: "20000000-0000-0000-0000-000000000579",
        name: "2nd Brain",
        isDesk: false,
        sortOrder: 16,
        grokTemplateUrl: "https://x.ai/bot/0XFvhY1cnpm9EnH-dlcPO",
      },
      {
        id: "20000000-0000-0000-0000-000000000580",
        name: "Notion",
        isDesk: false,
        sortOrder: 17,
        grokTemplateUrl: "https://x.ai/bot/-p3E1-AtfuoYitjQaBMVC",
      },
      {
        id: "20000000-0000-0000-0000-000000000581",
        name: "Live Call Coach",
        isDesk: false,
        sortOrder: 18,
        grokTemplateUrl: "https://x.ai/bot/z1sFV8dXNuD_xwE1xk_mz",
      },
      {
        id: "20000000-0000-0000-0000-000000000582",
        name: "Open Loop Closer",
        isDesk: false,
        sortOrder: 19,
        grokTemplateUrl: "https://x.ai/bot/OnZxELs_59ZvE4_-jTMaV",
      },
      {
        id: "20000000-0000-0000-0000-000000000583",
        name: "Producer",
        isDesk: false,
        sortOrder: 20,
        grokTemplateUrl: "https://x.ai/bot/f2IQR96u1xM-hzMpW7sg2",
      },
      {
        id: "20000000-0000-0000-0000-000000000584",
        name: "DWTS Ezra Votes",
        isDesk: false,
        sortOrder: 21,
        grokTemplateUrl: "https://x.ai/bot/FudoGp1ChuiSXr3TMVZGG",
      },
      {
        id: "20000000-0000-0000-0000-000000000585",
        name: "Email Bot Work",
        isDesk: false,
        sortOrder: 22,
        grokTemplateUrl: "https://x.ai/bot/oSaziY7pPP4PH2ZHts0hS",
      },
      {
        id: "20000000-0000-0000-0000-000000000604",
        name: "LinkedIn Agent",
        isDesk: false,
        sortOrder: 23,
        grokTemplateUrl: "https://x.ai/bot/TtbtDOEfnPntO9DWANx3P",
      },
      {
        id: "20000000-0000-0000-0000-000000000605",
        name: "X bot",
        isDesk: false,
        sortOrder: 24,
        grokTemplateUrl: "https://x.ai/bot/8OqqCibnjW8m8cgdn3Qyl",
      },
      {
        id: "20000000-0000-0000-0000-000000000607",
        name: "Pit Crew",
        isDesk: false,
        sortOrder: 25,
        grokTemplateUrl: "https://x.ai/bot/Sm0GZs7Hhf7kNV7tHCUN1",
      },
      {
        id: "20000000-0000-0000-0000-000000000608",
        name: "Doordash",
        isDesk: false,
        sortOrder: 26,
        grokTemplateUrl: "https://x.ai/bot/J7I56EwtEh0D3yMGhnwSZ",
      },
      {
        id: "20000000-0000-0000-0000-000000000611",
        name: "Competitive Snake Alert",
        isDesk: false,
        sortOrder: 27,
        grokTemplateUrl: "https://x.ai/bot/NqCINqE9LDY9XTw2vP_XT",
      },
    ]
  );
  assert.match(scott.routingRule, /Leader 1:1 Bot/);
  assert.match(scott.routingRule, /Doordash only for DoorDash cart \/ DashPass \/ live-track \/ work-meal receipt filing/);
  assert.match(scott.routingRule, /Competitive Snake Alert only for competitor watch \/ pricing-launch-positioning snake alerts/);
  assert.match(scott.routingRule, /Gong Call Coach only for post-call Gong coaching/);
  assert.match(scott.routingRule, /Meeting prep only for calendar briefs/);
  assert.match(scott.routingRule, /SE call bot only for SE and sales-engineer call work/);
  assert.match(scott.routingRule, /Cookie Monster only for Chrome cookie-sync work/);
  assert.match(scott.routingRule, /Token Cop only for agent token spend and alerts/);
  assert.match(scott.routingRule, /Task Farming only for farming action items/);
  assert.match(scott.routingRule, /Travel Agent only for trip-planning and booking-draft work/);
  assert.match(scott.routingRule, /Ramp only for Ramp expense receipt matching/);
  assert.match(scott.routingRule, /Todo only for task capture and due pulses/);
  assert.match(scott.routingRule, /Forced Human Touches only for weekly human-touch coaching/);
  assert.match(scott.routingRule, /Slacker only for VIP Slack triage digests/);
  assert.match(scott.routingRule, /Mission Control only for the Chrome new-tab fleet dashboard/);
  assert.match(scott.routingRule, /PG Bot only for AE territory pipeline-generation coverage/);
  assert.match(scott.routingRule, /AE deal bot only for AE deal qualification and coaching/);
  assert.match(scott.routingRule, /ADM account bot only for account growth and retention plans/);
  assert.match(scott.readmeMd ?? "", /not Krista Letz's PG desk/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/9wmmsO_xoeLPeGEqjWLzE/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/55t0IuxxlT7BWffNVOKai/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/d8C0ufUatv_fgoCRbfXZ4/);

  const doge = getFallbackPack("dogecoinnorway", "dogecoinnorway");
  assert.ok(doge);
  assert.equal(doge.id, "10000000-0000-0000-0000-000000000051");
  assert.equal(doge.official, false);
  assert.equal(doge.featured, false);
  assert.equal(doge.seats[0]?.name, "Chef");
  assert.equal(doge.seats[0]?.isDesk, true);
  assert.equal(doge.seats.length, 2);
  assert.equal(doge.seats[1]?.name, "Review This");
  assert.equal(doge.seats[1]?.isDesk, false);
  assert.equal(doge.seats[1]?.sortOrder, 1);
  assert.equal(doge.seats[1]?.id, "20000000-0000-0000-0000-000000000113");
  assert.equal(doge.seats[1]?.grokTemplateUrl, "https://x.ai/bot/g4hvAEhebCPzqwsdPBGu4");
  assert.match(doge.routingRule, /Chef/);
  assert.match(doge.routingRule, /Review This only for named-product reviews/);
  assert.match(doge.seats[1]?.job ?? "", /buy, skip, or wait/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/g4hvAEhebCPzqwsdPBGu4/);
  assert.equal(listFallbackPacksByOwner("dogecoinnorway").length, 1);
});

test("catalog watch adds six unofficial one-desk packs with live x.ai URLs", () => {
  const expected = [
    {
      owner: "MSaintjour",
      slug: "marc",
      name: "Marc",
      desk: "Copay Compass",
      url: "https://x.ai/bot/ehxj2Wdxq9M04jvaAqyBD",
      seatId: "20000000-0000-0000-0000-000000000114",
      packId: "10000000-0000-0000-0000-000000000098",
      topic: "founder",
      avatar: null as string | null,
      seats: 3,
    },
    {
      owner: "NikolaFYI",
      slug: "nikola",
      name: "Nikola",
      desk: "Nom Nom",
      url: "https://x.ai/bot/bdcSxv_pSQEH0E571N_fC",
      seatId: "20000000-0000-0000-0000-000000000115",
      packId: "10000000-0000-0000-0000-000000000099",
      topic: "founder",
      avatar: null,
    },
    {
      owner: "benngarnish",
      slug: "benn",
      name: "Benn",
      desk: "Patch",
      url: "https://x.ai/bot/mZM210IvFxqswc9eaLjQa",
      seatId: "20000000-0000-0000-0000-000000000116",
      packId: "10000000-0000-0000-0000-000000000100",
      topic: "founder",
      avatar: "https://avatars.githubusercontent.com/u/1122587?v=4",
    },
    {
      owner: "OTNworld",
      slug: "paul",
      name: "Paul",
      desk: "Workshop Facilitator",
      url: "https://x.ai/bot/EJTJEGbRPXlSppzFk8ETH",
      seatId: "20000000-0000-0000-0000-000000000117",
      packId: "10000000-0000-0000-0000-000000000101",
      topic: "founder",
      avatar: "https://avatars.githubusercontent.com/u/228165969?v=4",
    },
    {
      owner: "HenryLeeBauta",
      slug: "henry",
      name: "Henry",
      desk: "Artifact Share",
      url: "https://x.ai/bot/u3jfM8xk_CixZJYKQ0S7u",
      seatId: "20000000-0000-0000-0000-000000000118",
      packId: "10000000-0000-0000-0000-000000000102",
      topic: "developer",
      avatar: null,
    },
    {
      owner: "inqusit",
      slug: "ashish",
      name: "Ashish",
      desk: "Tech Lead",
      url: "https://x.ai/bot/RfFPxQ_rfEGcUncrJ6g_W",
      seatId: "20000000-0000-0000-0000-000000000119",
      packId: "10000000-0000-0000-0000-000000000103",
      topic: "developer",
      avatar: null,
    },
  ] as const;

  for (const item of expected) {
    const pack = getFallbackPack(item.owner, item.slug);
    assert.ok(pack, `${item.owner}/${item.slug}`);
    assert.equal(pack.id, item.packId);
    assert.equal(pack.name, item.name);
    assert.equal(pack.official, false);
    assert.equal(pack.featured, false);
    assert.equal(pack.githubUrl, null);
    assert.deepEqual(pack.topics, [item.topic]);
    assert.equal(pack.likesCount, 0);
    assert.equal(pack.installsCount, 0);
    assert.equal(pack.visitsCount, 0);
    assert.equal(pack.seats.length, "seats" in item ? item.seats : 1);
    assert.equal(pack.seats[0]?.name, item.desk);
    assert.equal(pack.seats[0]?.isDesk, true);
    assert.equal(pack.seats[0]?.sortOrder, 0);
    assert.equal(pack.seats[0]?.id, item.seatId);
    assert.equal(pack.seats[0]?.grokTemplateUrl, item.url);
    assert.equal(parseGrokTemplateUrl(pack.seats[0]?.grokTemplateUrl), item.url);
    assert.equal(pack.owner.avatarUrl, item.avatar);
    assert.match(seedSql, new RegExp(item.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(seedSql, new RegExp(item.packId));
    assert.match(seedSql, new RegExp(item.seatId));
  }

  const benn = getFallbackPack("benngarnish", "benn");
  const ben = getFallbackPack("brstorrie", "ben");
  assert.ok(benn);
  assert.ok(ben);
  assert.notEqual(benn.id, ben.id);
  assert.equal(benn.slug, "benn");
  assert.equal(ben.slug, "ben");
  assert.equal(getFallbackPack("benngarnish", "ben"), null);
  assert.equal(getFallbackPack("brstorrie", "benn"), null);
  assert.match(benn.readmeMd ?? "", /not Ben Storrie's The Accountant/);
  assert.ok(!benn.seats.some((item) => /accountant/i.test(item.name)));
  assert.ok(!ben.seats.some((item) => /patch/i.test(item.name)));

  const marc = getFallbackPack("MSaintjour", "marc");
  assert.ok(marc);
  assert.equal(marc.seats.length, 3);
  assert.equal(marc.seats[0]?.name, "Copay Compass");
  assert.equal(marc.seats[0]?.isDesk, true);
  assert.match(marc.seats[0]?.job ?? "", /copay assistance/i);
  assert.match(marc.seats[0]?.job ?? "", /does not give medical advice/);
  assert.ok(marc.seats.some((item) => item.grokTemplateUrl === "https://x.ai/bot/M9c2tC_-mwY8XNTmSbkUY"));

  assert.equal(getFallbackProfile("msaintjour"), null);
  assert.ok(getFallbackProfile("MSaintjour"));
  assert.ok(getFallbackProfile("NikolaFYI"));
  assert.ok(getFallbackProfile("benngarnish"));
  assert.ok(getFallbackProfile("OTNworld"));
  assert.ok(getFallbackProfile("HenryLeeBauta"));
  assert.ok(getFallbackProfile("inqusit"));
});

test("catalog watch adds five unofficial one-desk packs with live x.ai URLs", () => {
  const expected = [
    {
      owner: "adgapar",
      slug: "adi",
      name: "Adi",
      desk: "Token Ops",
      url: "https://x.ai/bot/4mCuSlW34n6l3aYxYJCdj",
      seatId: "20000000-0000-0000-0000-000000000120",
      packId: "10000000-0000-0000-0000-000000000104",
      topic: "developer",
      avatar: "https://avatars.githubusercontent.com/u/3167828?v=4" as string | null,
      job: /live routine/i,
    },
    {
      owner: "minebotcoin",
      slug: "botcoin",
      name: "BOTCOIN",
      desk: "BOTOSHI",
      url: "https://x.ai/bot/29XazZFrrsJyI8LUnExDD",
      seatId: "20000000-0000-0000-0000-000000000121",
      packId: "10000000-0000-0000-0000-000000000105",
      topic: "founder",
      avatar: null,
      job: /Zero ETH BOTCOIN mining-rig onboarding miner/,
    },
    {
      owner: "dennisonbertram",
      slug: "dennison",
      name: "Dennison",
      desk: "NYC Parent",
      url: "https://x.ai/bot/DiNI489Qte5ryNvZjOROb",
      seatId: "20000000-0000-0000-0000-000000000122",
      packId: "10000000-0000-0000-0000-000000000106",
      topic: "founder",
      avatar: "https://avatars.githubusercontent.com/u/228482372?v=4",
      job: /family chief of staff for New York City parents/i,
    },
    {
      owner: "adamlowisz",
      slug: "adam",
      name: "Adam",
      desk: "X Top 100 Fans Weekly",
      url: "https://x.ai/bot/HU7XArfGhUgLnzVcr7neB",
      seatId: "20000000-0000-0000-0000-000000000123",
      packId: "10000000-0000-0000-0000-000000000107",
      topic: "media",
      avatar: null,
      job: /top 100 X fans each week/i,
    },
    {
      owner: "chasemc67",
      slug: "chase",
      name: "Chase",
      desk: "Situation monitor",
      url: "https://x.ai/bot/lkHayxdQjNzVVJIDh7qaF",
      seatId: "20000000-0000-0000-0000-000000000124",
      packId: "10000000-0000-0000-0000-000000000108",
      topic: "media",
      avatar: "https://avatars.githubusercontent.com/u/6922982?v=4",
      job: /never posts until they say so/i,
    },
  ] as const;

  for (const item of expected) {
    const pack = getFallbackPack(item.owner, item.slug);
    assert.ok(pack, `${item.owner}/${item.slug}`);
    assert.equal(pack.id, item.packId);
    assert.equal(pack.name, item.name);
    assert.equal(pack.official, false);
    assert.equal(pack.featured, false);
    assert.equal(pack.githubUrl, null);
    assert.deepEqual(pack.topics, [item.topic]);
    assert.equal(pack.likesCount, 0);
    assert.equal(pack.installsCount, 0);
    assert.equal(pack.visitsCount, 0);
    assert.equal(pack.seats.length, item.slug === "dennison" || item.slug === "chase" ? 2 : 1);
    assert.equal(pack.seats[0]?.name, item.desk);
    assert.equal(pack.seats[0]?.isDesk, true);
    assert.equal(pack.seats[0]?.sortOrder, 0);
    assert.equal(pack.seats[0]?.id, item.seatId);
    assert.equal(pack.seats[0]?.grokTemplateUrl, item.url);
    assert.equal(parseGrokTemplateUrl(pack.seats[0]?.grokTemplateUrl), item.url);
    assert.match(pack.seats[0]?.job ?? "", item.job);
    assert.equal(pack.owner.avatarUrl, item.avatar);
    assert.match(seedSql, new RegExp(item.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(seedSql, new RegExp(item.packId));
    assert.match(seedSql, new RegExp(item.seatId));
    assert.equal(listFallbackPacksByOwner(item.owner).length, 1);
  }

  assert.ok(getFallbackProfile("adgapar"));
  assert.ok(getFallbackProfile("minebotcoin"));
  assert.ok(getFallbackProfile("dennisonbertram"));
  assert.ok(getFallbackProfile("adamlowisz"));
  assert.ok(getFallbackProfile("chasemc67"));
  assert.equal(getFallbackProfile("MineBotcoin"), null);
  assert.equal(getFallbackProfile("AdamLowisz"), null);
  assert.equal(getFallbackPack("examples", "stencil"), null);

  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url): url is string => Boolean(url));
  const uniqueFallbackUrls = new Set(fallbackUrls);
  assert.equal(fallbackUrls.length, 1339);
  assert.equal(uniqueFallbackUrls.size, 1339);

  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  const seedUrls = new Set(seedUrlMatches);
  for (const url of uniqueFallbackUrls) {
    assert.ok(seedUrls.has(url), `seed missing ${url}`);
  }
  for (const url of expected.map((item) => item.url)) {
    assert.equal(
      fallbackUrls.filter((item) => item === url).length,
      1,
      `catalog should include ${url} exactly once`
    );
    assert.equal(
      seedUrlMatches.filter((item) => item === url).length,
      1,
      `seed should include ${url} exactly once`
    );
  }
});

test("catalog watch adds Andrew AvatarMaker, Scott Cookie Monster, and 14 more packs", () => {
  const expected = [
    {
      owner: "Andrew51786",
      slug: "andrew",
      name: "Andrew",
      desk: "AvatarMaker",
      url: "https://x.ai/bot/EfBhh8nwpuGD0XNfl0eBI",
      seatId: "20000000-0000-0000-0000-000000000126",
      packId: "10000000-0000-0000-0000-000000000109",
      topic: "media",
      avatar: null as string | null,
      job: /matching square avatars/i,
      seats: 3,
    },
    {
      owner: "SEOAgent_",
      slug: "seoagent",
      name: "SEOAgent",
      desk: "SEOAgent",
      url: "https://x.ai/bot/scYgD9jdFhooaSHihRzy7",
      seatId: "20000000-0000-0000-0000-000000000127",
      packId: "10000000-0000-0000-0000-000000000110",
      topic: "developer",
      avatar: null,
      job: /autonomous SEO engineer/i,
      seats: 1,
    },
    {
      owner: "AhuraDeus",
      slug: "ahura",
      name: "Ahura",
      desk: "Steve J",
      url: "https://x.ai/bot/cuEYUcYmz-497oKWVfWX2",
      seatId: "20000000-0000-0000-0000-000000000128",
      packId: "10000000-0000-0000-0000-000000000111",
      topic: "founder",
      avatar: null,
      job: /Quality-bar CEO/i,
      seats: 1,
    },
    {
      owner: "richsilver",
      slug: "rich",
      name: "Rich",
      desk: "Flora",
      url: "https://x.ai/bot/HC7kphHSxDzb639YlmI6O",
      seatId: "20000000-0000-0000-0000-000000000129",
      packId: "10000000-0000-0000-0000-000000000112",
      topic: "founder",
      avatar: "https://avatars.githubusercontent.com/u/139979523?v=4",
      job: /houseplant care log/i,
      seats: 1,
    },
    {
      owner: "KdJadeja911",
      slug: "krushnasinh",
      name: "Krushnasinh",
      desk: "Demo Video",
      url: "https://x.ai/bot/htSXUJUQlVr60m9L_unBa",
      seatId: "20000000-0000-0000-0000-000000000130",
      packId: "10000000-0000-0000-0000-000000000113",
      topic: "media",
      avatar: null,
      job: /narrated 1080p product demo/i,
      seats: 1,
    },
    {
      owner: "joseamijares",
      slug: "jose",
      name: "Jose",
      desk: "Harry Dry",
      url: "https://x.ai/bot/tr-3hPrAG7_LeSzKZ5_vu",
      seatId: "20000000-0000-0000-0000-000000000131",
      packId: "10000000-0000-0000-0000-000000000114",
      topic: "media",
      avatar: "https://avatars.githubusercontent.com/u/6046480?v=4",
      job: /copy chief trained on Harry Dry/i,
      seats: 1,
    },
    {
      owner: "maxjean__",
      slug: "max",
      name: "Max",
      desk: "Usage Auditor",
      url: "https://x.ai/bot/M5vd5Dp9Et4EZQ3Ik3Hn2",
      seatId: "20000000-0000-0000-0000-000000000132",
      packId: "10000000-0000-0000-0000-000000000115",
      topic: "developer",
      avatar: null,
      job: /weekly usage auditor/i,
      seats: 1,
    },
    {
      owner: "tylernishida",
      slug: "tyler",
      name: "Tyler",
      desk: "Fantasy GM",
      url: "https://x.ai/bot/uszqxwGlAmEQ_38nEcT5A",
      seatId: "20000000-0000-0000-0000-000000000133",
      packId: "10000000-0000-0000-0000-000000000116",
      topic: "founder",
      avatar: "https://avatars.githubusercontent.com/u/49229588?v=4",
      job: /fantasy football GM/i,
      seats: 1,
    },
    {
      owner: "gambrill",
      slug: "dave",
      name: "Dave",
      desk: "Pain in the Task",
      url: "https://x.ai/bot/yztAMds3EQ2J5OjG_tBgw",
      seatId: "20000000-0000-0000-0000-000000000134",
      packId: "10000000-0000-0000-0000-000000000117",
      topic: "founder",
      avatar: "https://avatars.githubusercontent.com/u/80799824?v=4",
      job: /repetitive work/i,
      seats: 2,
    },
    {
      owner: "old-pgmrs-will",
      slug: "will",
      name: "Will",
      desk: "Grok VM maintenance",
      url: "https://x.ai/bot/9UZp5k0Fp0LYmkyos5swQ",
      seatId: "20000000-0000-0000-0000-000000000135",
      packId: "10000000-0000-0000-0000-000000000118",
      topic: "developer",
      avatar: "https://avatars.githubusercontent.com/u/102408514?v=4",
      job: /Linux VM maintenance/i,
      seats: 2,
    },
    {
      owner: "m_check1B",
      slug: "matej",
      name: "Matej",
      desk: "TOP G",
      url: "https://x.ai/bot/0fYZ_kKkiXNbLn_KBD3f3",
      seatId: "20000000-0000-0000-0000-000000000136",
      packId: "10000000-0000-0000-0000-000000000119",
      topic: "developer",
      avatar: null,
      job: /Jack-land development partner/i,
      seats: 1,
    },
    {
      owner: "majdkaid",
      slug: "majd",
      name: "Majd",
      desk: "Zeus",
      url: "https://x.ai/bot/ehQNQQR9apvhVcmxFiFyP",
      seatId: "20000000-0000-0000-0000-000000000137",
      packId: "10000000-0000-0000-0000-000000000120",
      topic: "founder",
      avatar: "https://avatars.githubusercontent.com/u/65400078?v=4",
      job: /single HQ chat/i,
      seats: 1,
    },
    {
      owner: "MGallmur",
      slug: "mauricio",
      name: "Mauricio",
      desk: "Hermes SDR",
      url: "https://x.ai/bot/EAlUWK8yH_xfsBcpdu7e_",
      seatId: "20000000-0000-0000-0000-000000000138",
      packId: "10000000-0000-0000-0000-000000000121",
      topic: "founder",
      avatar: null,
      job: /outbound SDR/i,
      seats: 1,
    },
    {
      owner: "MarcusRamsey",
      slug: "marcus",
      name: "Marcus",
      desk: "Dan Patrick",
      url: "https://x.ai/bot/hlQhxsU-pqQEkimm0it4V",
      seatId: "20000000-0000-0000-0000-000000000142",
      packId: "10000000-0000-0000-0000-000000000123",
      topic: "media",
      avatar: "https://avatars.githubusercontent.com/u/3101699?v=4",
      job: /SportsCenter-style scores/i,
      seats: 1,
    },
  ] as const;

  for (const item of expected) {
    const pack = getFallbackPack(item.owner, item.slug);
    assert.ok(pack, `${item.owner}/${item.slug}`);
    assert.equal(pack.id, item.packId);
    assert.equal(pack.name, item.name);
    assert.equal(pack.official, false);
    assert.equal(pack.featured, false);
    assert.equal(pack.githubUrl, null);
    assert.deepEqual(pack.topics, [item.topic]);
    assert.equal(pack.likesCount, 0);
    assert.equal(pack.installsCount, 0);
    assert.equal(pack.visitsCount, 0);
    assert.ok(pack.seats.length >= item.seats);
    assert.equal(pack.seats[0]?.name, item.desk);
    assert.equal(pack.seats[0]?.isDesk, true);
    assert.equal(pack.seats[0]?.sortOrder, 0);
    assert.equal(pack.seats[0]?.id, item.seatId);
    assert.equal(pack.seats[0]?.grokTemplateUrl, item.url);
    assert.equal(parseGrokTemplateUrl(pack.seats[0]?.grokTemplateUrl), item.url);
    assert.match(pack.seats[0]?.job ?? "", item.job);
    assert.equal(pack.owner.avatarUrl, item.avatar);
    assert.match(seedSql, new RegExp(item.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(seedSql, new RegExp(item.packId));
    assert.match(seedSql, new RegExp(item.seatId));
    assert.equal(listFallbackPacksByOwner(item.owner).length, 1);
  }

  const zach = getFallbackPack("zachmllr", "zach");
  assert.ok(zach);
  assert.equal(zach.id, "10000000-0000-0000-0000-000000000122");
  assert.equal(zach.official, false);
  assert.equal(zach.featured, false);
  assert.deepEqual(zach.topics, ["founder"]);
  assert.deepEqual(
    zach.seats.map((item) => ({
      id: item.id,
      name: item.name,
      isDesk: item.isDesk,
      sortOrder: item.sortOrder,
      grokTemplateUrl: item.grokTemplateUrl,
    })),
    [
      {
        id: "20000000-0000-0000-0000-000000000139",
        name: "Errol",
        isDesk: true,
        sortOrder: 0,
        grokTemplateUrl: "https://x.ai/bot/mQoLg90Pj5Cn2Gso4AkoQ",
      },
      {
        id: "20000000-0000-0000-0000-000000000140",
        name: "Collins",
        isDesk: false,
        sortOrder: 1,
        grokTemplateUrl: "https://x.ai/bot/D6lddHs6lfM0k7Cj3P6j3",
      },
      {
        id: "20000000-0000-0000-0000-000000000141",
        name: "Keach",
        isDesk: false,
        sortOrder: 2,
        grokTemplateUrl: "https://x.ai/bot/sAxCT93K8i7gwctmtAroD",
      },
    ]
  );
  assert.match(zach.routingRule, /Errol/);
  assert.match(zach.routingRule, /Collins only for Hercules Collins catechism drills/);
  assert.match(zach.routingRule, /Keach only for Keach's Baptist Catechism drills/);
  assert.match(zach.seats[0]?.job ?? "", /Catechism for Boys and Girls/);
  assert.match(zach.seats[1]?.job ?? "", /Orthodox Catechism/);
  assert.match(zach.seats[2]?.job ?? "", /Baptist Catechism/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/mQoLg90Pj5Cn2Gso4AkoQ/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/D6lddHs6lfM0k7Cj3P6j3/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/sAxCT93K8i7gwctmtAroD/);
  assert.equal(listFallbackPacksByOwner("zachmllr").length, 1);

  assert.ok(getFallbackProfile("Andrew51786"));
  assert.ok(getFallbackProfile("SEOAgent_"));
  assert.ok(getFallbackProfile("old-pgmrs-will"));
  assert.ok(getFallbackProfile("MarcusRamsey"));
  assert.equal(getFallbackProfile("old_pgmrs_will"), null);
  assert.equal(getFallbackProfile("marcusramsey"), null);
  assert.equal(getFallbackPack("examples", "stencil"), null);
  assert.ok(!listFallbackPacks().some((pack) => pack.owner.githubLogin === "examples"));

  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url): url is string => Boolean(url));
  const uniqueFallbackUrls = new Set(fallbackUrls);
  assert.equal(fallbackUrls.length, 1339);
  assert.equal(uniqueFallbackUrls.size, 1339);

  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  const seedUrls = new Set(seedUrlMatches);
  for (const url of uniqueFallbackUrls) {
    assert.ok(seedUrls.has(url), `seed missing ${url}`);
  }
  const newUrls = [
    ...expected.map((item) => item.url),
    "https://x.ai/bot/55t0IuxxlT7BWffNVOKai",
    "https://x.ai/bot/mQoLg90Pj5Cn2Gso4AkoQ",
    "https://x.ai/bot/D6lddHs6lfM0k7Cj3P6j3",
    "https://x.ai/bot/sAxCT93K8i7gwctmtAroD",
  ];
  for (const url of newUrls) {
    assert.equal(
      fallbackUrls.filter((item) => item === url).length,
      1,
      `catalog should include ${url} exactly once`
    );
    assert.equal(
      seedUrlMatches.filter((item) => item === url).length,
      1,
      `seed should include ${url} exactly once`
    );
  }
});

test("catalog adds ten unofficial packs plus Lauren tinkabot", () => {
  const expected = [
    {
      owner: "RustamAtuev",
      slug: "rustam",
      name: "Rustam",
      desk: "Repo Engineer",
      url: "https://x.ai/bot/iXfxVelc85rIxgZ9hLeXD",
      seatId: "20000000-0000-0000-0000-000000000143",
      packId: "10000000-0000-0000-0000-000000000124",
      topic: "developer",
      avatar: "https://avatars.githubusercontent.com/u/288767497?v=4" as string | null,
      job: /manager-facing engineer bot/i,
      seats: 1,
    },
    {
      owner: "dankillenberger",
      slug: "daniel",
      name: "Daniel",
      desk: "Forge",
      url: "https://x.ai/bot/7GgZtqkhyLzKKMNUa7dhd",
      seatId: "20000000-0000-0000-0000-000000000144",
      packId: "10000000-0000-0000-0000-000000000125",
      topic: "developer",
      avatar: null,
      job: /Factory manager for flow-next specs/i,
      seats: 1,
    },
    {
      owner: "suddenlyjon",
      slug: "knock",
      name: "Knock",
      desk: "Token Accountant",
      url: "https://x.ai/bot/zdnVIfLkNmRwZqqogojuc",
      seatId: "20000000-0000-0000-0000-000000000145",
      packId: "10000000-0000-0000-0000-000000000126",
      topic: "founder",
      avatar: null,
      job: /Cursor spending dashboard/i,
      seats: 41,
    },
    {
      owner: "joepro",
      slug: "joseph",
      name: "Joseph",
      desk: "MadMax Mode",
      url: "https://x.ai/bot/pTe8gpPc_5SuwKkEszn18",
      seatId: "20000000-0000-0000-0000-000000000147",
      packId: "10000000-0000-0000-0000-000000000127",
      topic: "founder",
      avatar: "https://avatars.githubusercontent.com/u/1109367?v=4",
      job: /Grok Bot inventor/i,
      seats: 1,
    },
    {
      owner: "zeuuss_01",
      slug: "zeus",
      name: "ZEU$",
      desk: "Scout",
      url: "https://x.ai/bot/ywADCWWZP0Bcq6bOeQpGt",
      seatId: "20000000-0000-0000-0000-000000000148",
      packId: "10000000-0000-0000-0000-000000000128",
      topic: "media",
      avatar: null,
      job: /Weekly client research packs/i,
      seats: 5,
    },
    {
      owner: "useprismnetwork",
      slug: "prism",
      name: "Prism",
      desk: "Private Desk",
      url: "https://x.ai/bot/Tgl3sxrTsuAYL7MN8S3UT",
      seatId: "20000000-0000-0000-0000-000000000149",
      packId: "10000000-0000-0000-0000-000000000129",
      topic: "founder",
      avatar: null,
      job: /confidential GPU enclaves/i,
      seats: 1,
    },
    {
      owner: "haseebmir91",
      slug: "haseeb",
      name: "Haseeb",
      desk: "Poteto-style Chief of Staff",
      url: "https://x.ai/bot/Nk-vzuWqTvqSed-G8-Za5",
      seatId: "20000000-0000-0000-0000-000000000150",
      packId: "10000000-0000-0000-0000-000000000130",
      topic: "founder",
      avatar: null,
      job: /runs a small Grok Bot team the way @poteto recommends/i,
      seats: 3,
    },
    {
      owner: "ryangbsystems",
      slug: "ryan",
      name: "Ryan",
      desk: "Maskoff",
      url: "https://x.ai/bot/39x_3B9P5HBl-MpK1xGzP",
      seatId: "20000000-0000-0000-0000-000000000153",
      packId: "10000000-0000-0000-0000-000000000131",
      topic: "media",
      avatar: null,
      job: /Defensive briefings on X accounts/i,
      seats: 1,
    },
    {
      owner: "MaheshtheDev",
      slug: "mahesh",
      name: "Mahesh",
      desk: "Memento",
      url: "https://x.ai/bot/_xZZE41svJdcq2w6ZWJan",
      seatId: "20000000-0000-0000-0000-000000000154",
      packId: "10000000-0000-0000-0000-000000000132",
      topic: "founder",
      avatar: "https://avatars.githubusercontent.com/u/38828053?v=4",
      job: /Second-brain coworker/i,
      seats: 1,
    },
    {
      owner: "jaybuidl",
      slug: "jaybuidl",
      name: "jaybuidl",
      desk: "Grokleros",
      url: "https://x.ai/bot/vsCDaIn2Od_BkfWp0Vehm",
      seatId: "20000000-0000-0000-0000-000000000155",
      packId: "10000000-0000-0000-0000-000000000133",
      topic: "developer",
      avatar: "https://avatars.githubusercontent.com/u/22213980?v=4",
      job: /Kleros V2 juror/i,
      seats: 1,
    },
    {
      owner: "andreleibovici",
      slug: "andre",
      name: "Andre",
      desk: "Engineering QA",
      url: "https://x.ai/bot/b2tS8BNj8BhoQNDcB081S",
      seatId: "20000000-0000-0000-0000-000000000161",
      packId: "10000000-0000-0000-0000-000000000134",
      topic: "developer",
      avatar: null,
      job: /pull-request quality gates/i,
      seats: 1,
    },
    {
      owner: "randywhitepdx",
      slug: "randy",
      name: "Randall",
      desk: "Lite Intel Fetch",
      url: "https://x.ai/bot/FQRA5tERWsasaQGIZmBl_",
      seatId: "20000000-0000-0000-0000-000000000162",
      packId: "10000000-0000-0000-0000-000000000135",
      topic: "founder",
      avatar: null,
      job: /buy_intel_pack \$5 HTTP 402/i,
      seats: 1,
    },
    {
      owner: "pohlipit",
      slug: "pete",
      name: "Pete",
      desk: "Zettelkasten",
      url: "https://x.ai/bot/35ZO_vGqk_ch51C9qPX1c",
      seatId: "20000000-0000-0000-0000-000000000163",
      packId: "10000000-0000-0000-0000-000000000136",
      topic: "founder",
      avatar: "https://avatars.githubusercontent.com/u/1668364?v=4",
      job: /Obsidian vault/i,
      seats: 1,
    },
    {
      owner: "akshaybhopani",
      slug: "akshay",
      name: "Akshay",
      desk: "My Krishna",
      url: "https://x.ai/bot/Mf2MLqJRCmz8sSjFmYedG",
      seatId: "20000000-0000-0000-0000-000000000166",
      packId: "10000000-0000-0000-0000-000000000137",
      topic: "media",
      avatar: "https://avatars.githubusercontent.com/u/28391021?v=4",
      job: /first person from the Gita/i,
      seats: 1,
    },
    {
      owner: "frankfindsout",
      slug: "frank",
      name: "Frank",
      desk: "Meta Grok",
      url: "https://x.ai/bot/HAhgshU4r50gS81LCcpmk",
      seatId: "20000000-0000-0000-0000-000000000167",
      packId: "10000000-0000-0000-0000-000000000138",
      topic: "media",
      avatar: null,
      job: /five most popular Grok bots on X each weekday/i,
      seats: 1,
    },
    {
      owner: "ludiofelix",
      slug: "rob",
      name: "Rob",
      desk: "Convert X Money to Karma",
      url: "https://x.ai/bot/iCn7r691OdtaB_o8MtHx_",
      seatId: "20000000-0000-0000-0000-000000000168",
      packId: "10000000-0000-0000-0000-000000000139",
      topic: "founder",
      avatar: null,
      job: /karmic accounting/i,
      seats: 1,
    },
  ] as const;

  for (const item of expected) {
    const pack = getFallbackPack(item.owner, item.slug);
    assert.ok(pack, `${item.owner}/${item.slug}`);
    assert.equal(pack.id, item.packId);
    assert.equal(pack.name, item.name);
    assert.equal(pack.official, false);
    assert.equal(pack.featured, false);
    assert.equal(pack.githubUrl, null);
    assert.deepEqual(pack.topics, [item.topic]);
    assert.equal(pack.likesCount, 0);
    assert.equal(pack.installsCount, 0);
    assert.equal(pack.visitsCount, 0);
    assert.ok(pack.seats.length >= item.seats);
    assert.equal(pack.seats[0]?.name, item.desk);
    assert.equal(pack.seats[0]?.isDesk, true);
    assert.equal(pack.seats[0]?.sortOrder, 0);
    assert.equal(pack.seats[0]?.id, item.seatId);
    assert.equal(pack.seats[0]?.grokTemplateUrl, item.url);
    assert.equal(parseGrokTemplateUrl(pack.seats[0]?.grokTemplateUrl), item.url);
    assert.match(pack.seats[0]?.job ?? "", item.job);
    assert.equal(pack.owner.avatarUrl, item.avatar);
    assert.match(seedSql, new RegExp(item.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(seedSql, new RegExp(item.packId));
    assert.match(seedSql, new RegExp(item.seatId));
    assert.equal(listFallbackPacksByOwner(item.owner).length, 1);
  }

  const knock = getFallbackPack("suddenlyjon", "knock");
  assert.ok(knock);
  assert.equal(knock.seats.length, 44);
  assert.deepEqual(
    knock.seats.slice(0, 31).map((item) => ({
      id: item.id,
      name: item.name,
      isDesk: item.isDesk,
      sortOrder: item.sortOrder,
      grokTemplateUrl: item.grokTemplateUrl,
    })),
    [
      {
        id: "20000000-0000-0000-0000-000000000145",
        name: "Token Accountant",
        isDesk: true,
        sortOrder: 0,
        grokTemplateUrl: "https://x.ai/bot/zdnVIfLkNmRwZqqogojuc",
      },
      {
        id: "20000000-0000-0000-0000-000000000146",
        name: "Code Red",
        isDesk: false,
        sortOrder: 1,
        grokTemplateUrl: "https://x.ai/bot/4y3jlvwxFNqcP76eJgpuD",
      },
      {
        id: "20000000-0000-0000-0000-000000000164",
        name: "Likeness",
        isDesk: false,
        sortOrder: 2,
        grokTemplateUrl: "https://x.ai/bot/-h0DhS9ty87dr0UGXLjDD",
      },
      {
        id: "20000000-0000-0000-0000-000000000165",
        name: "Dead Man's Bot",
        isDesk: false,
        sortOrder: 3,
        grokTemplateUrl: "https://x.ai/bot/XCaz2bKzsJ4J1DmkaYyc4",
      },
      {
        id: "20000000-0000-0000-0000-000000000194",
        name: "Box Inspector",
        isDesk: false,
        sortOrder: 4,
        grokTemplateUrl: "https://x.ai/bot/q7GLbLhMZDpJXBGuuci1J",
      },
      {
        id: "20000000-0000-0000-0000-000000000197",
        name: "Bottyguard",
        isDesk: false,
        sortOrder: 5,
        grokTemplateUrl: "https://x.ai/bot/PFI2o0ZcruL6vjjHAm5cF",
      },
      {
        id: "20000000-0000-0000-0000-000000000198",
        name: "Watchbot",
        isDesk: false,
        sortOrder: 6,
        grokTemplateUrl: "https://x.ai/bot/D2M2qOWDB0AKe2k_jG7Ck",
      },
      {
        id: "20000000-0000-0000-0000-000000000199",
        name: "Grokologist",
        isDesk: false,
        sortOrder: 7,
        grokTemplateUrl: "https://x.ai/bot/8vdHXq66kVvVlbACd-IDL",
      },
      {
        id: "20000000-0000-0000-0000-000000000200",
        name: "Twinwright",
        isDesk: false,
        sortOrder: 8,
        grokTemplateUrl: "https://x.ai/bot/Hvli5amrlprtDS2KuFRBP",
      },
      {
        id: "20000000-0000-0000-0000-000000000201",
        name: "Sworm",
        isDesk: false,
        sortOrder: 9,
        grokTemplateUrl: "https://x.ai/bot/l0J0Nj95_yVOlFZIHB1Y_",
      },
      {
        id: "20000000-0000-0000-0000-000000000202",
        name: "Buzzkill",
        isDesk: false,
        sortOrder: 10,
        grokTemplateUrl: "https://x.ai/bot/F1spQY8tmP2KCqnyuAbJh",
      },
      {
        id: "20000000-0000-0000-0000-000000000203",
        name: "Mirror",
        isDesk: false,
        sortOrder: 11,
        grokTemplateUrl: "https://x.ai/bot/6XwjJ_W0mX_ybK4ts_Ngb",
      },
      {
        id: "20000000-0000-0000-0000-000000000215",
        name: "Tab Janitor",
        isDesk: false,
        sortOrder: 12,
        grokTemplateUrl: "https://x.ai/bot/XOYBYmHQrUT_Ux88SS409",
      },
      {
        id: "20000000-0000-0000-0000-000000000232",
        name: "4 Panez",
        isDesk: false,
        sortOrder: 13,
        grokTemplateUrl: "https://x.ai/bot/91R37-rUOh9sS1tZkIF9d",
      },
      {
        id: "20000000-0000-0000-0000-000000000233",
        name: "KirBot",
        isDesk: false,
        sortOrder: 14,
        grokTemplateUrl: "https://x.ai/bot/Jzy-isV1YW5ZLl3W6rq6h",
      },
      {
        id: "20000000-0000-0000-0000-000000000234",
        name: "Dostoyevsky",
        isDesk: false,
        sortOrder: 15,
        grokTemplateUrl: "https://x.ai/bot/DR1LNk5p_M_7hv_wJfTPu",
      },
      {
        id: "20000000-0000-0000-0000-000000000235",
        name: "Austen",
        isDesk: false,
        sortOrder: 16,
        grokTemplateUrl: "https://x.ai/bot/c8sA8W1YcoRaYu5vjYFoa",
      },
      {
        id: "20000000-0000-0000-0000-000000000236",
        name: "Shakespeare",
        isDesk: false,
        sortOrder: 17,
        grokTemplateUrl: "https://x.ai/bot/E8XC3NO5V_u63vWoHxJF0",
      },
      {
        id: "20000000-0000-0000-0000-000000000237",
        name: "Woolf",
        isDesk: false,
        sortOrder: 18,
        grokTemplateUrl: "https://x.ai/bot/4fP33DHTBJudWglJyeMB_",
      },
      {
        id: "20000000-0000-0000-0000-000000000238",
        name: "Shelley",
        isDesk: false,
        sortOrder: 19,
        grokTemplateUrl: "https://x.ai/bot/SzGYytJglwB_dqRt5OaTO",
      },
      {
        id: "20000000-0000-0000-0000-000000000239",
        name: "Tolstoy",
        isDesk: false,
        sortOrder: 20,
        grokTemplateUrl: "https://x.ai/bot/42Clq7Vdn2X7zcwJ9OGxR",
      },
      {
        id: "20000000-0000-0000-0000-000000000240",
        name: "Poe",
        isDesk: false,
        sortOrder: 21,
        grokTemplateUrl: "https://x.ai/bot/EcUpzABnh3MfZQTN7inmP",
      },
      {
        id: "20000000-0000-0000-0000-000000000241",
        name: "Twain",
        isDesk: false,
        sortOrder: 22,
        grokTemplateUrl: "https://x.ai/bot/_OV6ItDEAbbpvi3qg3VKH",
      },
      {
        id: "20000000-0000-0000-0000-000000000242",
        name: "Dickinson",
        isDesk: false,
        sortOrder: 23,
        grokTemplateUrl: "https://x.ai/bot/UUZnEDx7jk_nNkkLJTvfo",
      },
      {
        id: "20000000-0000-0000-0000-000000000243",
        name: "Kafka",
        isDesk: false,
        sortOrder: 24,
        grokTemplateUrl: "https://x.ai/bot/ewFkIRV929jhuW5mHqL_a",
      },
      {
        id: "20000000-0000-0000-0000-000000000244",
        name: "Rosettabot",
        isDesk: false,
        sortOrder: 25,
        grokTemplateUrl: "https://x.ai/bot/eegdusTdLPabH7xTLQfgG",
      },
      {
        id: "20000000-0000-0000-0000-000000000299",
        name: "BeneBot",
        isDesk: false,
        sortOrder: 26,
        grokTemplateUrl: "https://x.ai/bot/yu_bkwUfpHdqhF2Q1VhWn",
      },
      {
        id: "20000000-0000-0000-0000-000000000353",
        name: "Adventure Bot",
        isDesk: false,
        sortOrder: 27,
        grokTemplateUrl: "https://x.ai/bot/sA0TXuMkDDSgBx52Z2D6f",
      },
      {
        id: "20000000-0000-0000-0000-000000000447",
        name: "Window",
        isDesk: false,
        sortOrder: 28,
        grokTemplateUrl: "https://x.ai/bot/E_j1gMmT7KLW4HWbMV2nK",
      },
      {
        id: "20000000-0000-0000-0000-000000000612",
        name: "Fit Finder",
        isDesk: false,
        sortOrder: 29,
        grokTemplateUrl: "https://x.ai/bot/0boCprpn_3yaiJ5PZIGCw",
      },
      {
        id: "20000000-0000-0000-0000-000000000614",
        name: "Rebrander",
        isDesk: false,
        sortOrder: 30,
        grokTemplateUrl: "https://x.ai/bot/HGorKc5KDQLynW4JONxn_",
      },
    ]
  );
  assert.match(knock.routingRule, /Token Accountant/);
  assert.match(knock.routingRule, /4 Panez, KirBot, Rosettabot/);
  assert.match(knock.routingRule, /BeneBot only for benefits navigation and in-network booking/);
  assert.match(knock.routingRule, /Adventure Bot only for one GPS adventure pick/);
  assert.match(knock.routingRule, /Window only for dew-point window vs dehumidifier calls/);
  assert.match(knock.routingRule, /Fit Finder only for outfit-from-photo shopping links/);
  assert.match(knock.routingRule, /Rebrander only for business\/product rename \/ old-brand cleanup/);
  assert.match(knock.routingRule, /Code Red only for the kill-switch/);
  assert.match(knock.routingRule, /Likeness only for named-person or animal stills and clips/);
  assert.match(knock.routingRule, /Dead Man's Bot only for the dead-man's switch/);
  assert.match(knock.routingRule, /Box Inspector only for pre-add template inspection/);
  assert.match(knock.routingRule, /Bottyguard for lure or transcript triage as SEAL Team 7 lead/);
  assert.match(knock.readmeMd ?? "", /Box Inspector/);
  assert.match(knock.readmeMd ?? "", /4 Panez/);
  assert.match(knock.seats[2]?.job ?? "", /Imagine stills and clips keep looking like them/);
  assert.match(knock.seats[3]?.job ?? "", /does not start armed/);
  assert.match(knock.seats[4]?.job ?? "", /Never Adds/);

  const haseeb = getFallbackPack("haseebmir91", "haseeb");
  assert.ok(haseeb);
  assert.deepEqual(
    haseeb.seats.map((item) => ({
      id: item.id,
      name: item.name,
      isDesk: item.isDesk,
      sortOrder: item.sortOrder,
      grokTemplateUrl: item.grokTemplateUrl,
    })),
    [
      {
        id: "20000000-0000-0000-0000-000000000150",
        name: "Poteto-style Chief of Staff",
        isDesk: true,
        sortOrder: 0,
        grokTemplateUrl: "https://x.ai/bot/Nk-vzuWqTvqSed-G8-Za5",
      },
      {
        id: "20000000-0000-0000-0000-000000000151",
        name: "Daily Easy Apply Digest",
        isDesk: false,
        sortOrder: 1,
        grokTemplateUrl: "https://x.ai/bot/uVNOsoe-iWf4ZOUdfgo5R",
      },
      {
        id: "20000000-0000-0000-0000-000000000152",
        name: "Easy Apply Queue",
        isDesk: false,
        sortOrder: 2,
        grokTemplateUrl: "https://x.ai/bot/5RXN9P3CxnIIwgcmvVWEp",
      },
    ]
  );

  const zeus = getFallbackPack("zeuuss_01", "zeus");
  assert.ok(zeus);
  assert.deepEqual(
    zeus.seats.map((item) => ({
      id: item.id,
      name: item.name,
      isDesk: item.isDesk,
      sortOrder: item.sortOrder,
      grokTemplateUrl: item.grokTemplateUrl,
    })),
    [
      {
        id: "20000000-0000-0000-0000-000000000148",
        name: "Scout",
        isDesk: true,
        sortOrder: 0,
        grokTemplateUrl: "https://x.ai/bot/ywADCWWZP0Bcq6bOeQpGt",
      },
      {
        id: "20000000-0000-0000-0000-000000000156",
        name: "Writer",
        isDesk: false,
        sortOrder: 1,
        grokTemplateUrl: "https://x.ai/bot/38UdPemBuZb9USs_0HAES",
      },
      {
        id: "20000000-0000-0000-0000-000000000158",
        name: "Art",
        isDesk: false,
        sortOrder: 2,
        grokTemplateUrl: "https://x.ai/bot/yE1-m0X2okSxFsvjScxy0",
      },
      {
        id: "20000000-0000-0000-0000-000000000159",
        name: "Editor",
        isDesk: false,
        sortOrder: 3,
        grokTemplateUrl: "https://x.ai/bot/wxFNc5b_yBkJraLqZXvI7",
      },
      {
        id: "20000000-0000-0000-0000-000000000160",
        name: "Desk",
        isDesk: false,
        sortOrder: 4,
        grokTemplateUrl: "https://x.ai/bot/WdQtoljjNUJ_-mX6B6SRL",
      },
    ]
  );
  assert.match(zeus.routingRule, /Writer only for studio copy/);
  assert.match(zeus.routingRule, /Art only for on-brand visuals/);
  assert.match(zeus.routingRule, /Editor only for the quality gate/);
  assert.match(zeus.routingRule, /Desk only for calendar, client pack, and weekly report/);
  assert.match(zeus.seats[1]?.job ?? "", /never publishes or sends work out/);
  assert.match(zeus.seats[2]?.job ?? "", /on-brand visuals/);
  assert.match(zeus.seats[3]?.job ?? "", /quality gate/);
  assert.match(zeus.seats[4]?.job ?? "", /weekly calendar/);

  const marc = getFallbackPack("MSaintjour", "marc");
  assert.ok(marc);
  assert.equal(marc.seats.length, 3);
  assert.equal(marc.seats[0]?.name, "Copay Compass");
  assert.equal(marc.seats[0]?.isDesk, true);
  assert.ok(marc.seats.some((item) => item.name === "Medical Bill Review"));
  assert.ok(marc.seats.some((item) => item.grokTemplateUrl === "https://x.ai/bot/M9c2tC_-mwY8XNTmSbkUY"));

  const joseph = getFallbackPack("joepro", "joseph");
  assert.ok(joseph);
  assert.equal(joseph.seats.length, 1);
  assert.ok(!joseph.seats.some((item) => item.grokTemplateUrl === "https://x.ai/bot/5hqR_5PVUy7WMbNaXPJ8s"));

  const lauren = getFallbackPack("poteto", "lauren");
  assert.ok(lauren);
  assert.equal(lauren.seats.length, 2);
  assert.equal(lauren.seats[0]?.name, "Dr Eggbot");
  assert.equal(lauren.seats[0]?.isDesk, true);
  assert.equal(lauren.seats[1]?.name, "tinkabot");
  assert.equal(lauren.seats[1]?.isDesk, false);
  assert.equal(lauren.seats[1]?.grokTemplateUrl, "https://x.ai/bot/br5f3C4mc75QCMEHaszXd");
  assert.match(lauren.routingRule, /tinkabot only for wrapping an API/);
  assert.match(lauren.readmeMd ?? "", /Do not add Box Inspector or Point peddler/);
  assert.ok(!lauren.seats.some((item) => /peddler/i.test(item.name)));
  assert.ok(!lauren.seats.some((item) => /box inspector/i.test(item.name)));

  assert.ok(getFallbackProfile("RustamAtuev"));
  assert.ok(getFallbackProfile("dankillenberger"));
  assert.ok(getFallbackProfile("suddenlyjon"));
  assert.ok(getFallbackProfile("joepro"));
  assert.ok(getFallbackProfile("zeuuss_01"));
  assert.ok(getFallbackProfile("useprismnetwork"));
  assert.ok(getFallbackProfile("haseebmir91"));
  assert.ok(getFallbackProfile("ryangbsystems"));
  assert.ok(getFallbackProfile("MaheshtheDev"));
  assert.ok(getFallbackProfile("jaybuidl"));
  assert.ok(getFallbackProfile("andreleibovici"));
  assert.ok(getFallbackProfile("randywhitepdx"));
  assert.ok(getFallbackProfile("pohlipit"));
  assert.ok(getFallbackProfile("akshaybhopani"));
  assert.ok(getFallbackProfile("frankfindsout"));
  assert.ok(getFallbackProfile("ludiofelix"));
  assert.equal(getFallbackProfile("FrankFindsOut"), null);
  assert.equal(getFallbackProfile("RandyWhitePDX"), null);
  assert.equal(getFallbackProfile("rustamatuev"), null);
  assert.equal(getFallbackProfile("mahesh"), null);
  assert.equal(getFallbackPack("examples", "stencil"), null);
  assert.ok(!listFallbackPacks().some((pack) => pack.owner.githubLogin === "examples"));

  const skipped = [
    "https://x.ai/bot/ny02y0VWgzWSSFlXgpWVZ",
    "https://x.ai/bot/vYIAB3Z6V8gEERewymcw1",
    "https://x.ai/bot/UWNGpcghM9H79JCb4of5Q",
    "https://x.ai/bot/Z0Faxo9DTX0KL7j7OHTWJ",
    "https://x.ai/bot/3n26nkAkMjk5EZcKJlo9w",
    "https://x.ai/bot/Abz5txK3unOkm5ZxCGGX-",
    "https://x.ai/bot/NuFI0dF9FgvO8FfMPHKzx",
    "https://x.ai/bot/-CjM4_uRs6sEGdfZfC5gv",
  ];
  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url): url is string => Boolean(url));
  const uniqueFallbackUrls = new Set(fallbackUrls);
  assert.equal(fallbackUrls.length, 1339);
  assert.equal(uniqueFallbackUrls.size, 1339);
  for (const url of skipped) {
    assert.ok(!uniqueFallbackUrls.has(url), `catalog should skip ${url}`);
    assert.ok(!seedSql.includes(url), `seed should skip ${url}`);
  }

  const addedUrls = [
    ...expected.map((item) => item.url),
    "https://x.ai/bot/4y3jlvwxFNqcP76eJgpuD",
    "https://x.ai/bot/uVNOsoe-iWf4ZOUdfgo5R",
    "https://x.ai/bot/5RXN9P3CxnIIwgcmvVWEp",
    "https://x.ai/bot/br5f3C4mc75QCMEHaszXd",
    "https://x.ai/bot/38UdPemBuZb9USs_0HAES",
    "https://x.ai/bot/yE1-m0X2okSxFsvjScxy0",
    "https://x.ai/bot/wxFNc5b_yBkJraLqZXvI7",
    "https://x.ai/bot/WdQtoljjNUJ_-mX6B6SRL",
    "https://x.ai/bot/-h0DhS9ty87dr0UGXLjDD",
    "https://x.ai/bot/XCaz2bKzsJ4J1DmkaYyc4",
    "https://x.ai/bot/q7GLbLhMZDpJXBGuuci1J",
    "https://x.ai/bot/Mf2MLqJRCmz8sSjFmYedG",
    "https://x.ai/bot/HAhgshU4r50gS81LCcpmk",
    "https://x.ai/bot/iCn7r691OdtaB_o8MtHx_",
  ];
  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  for (const url of addedUrls) {
    assert.equal(
      fallbackUrls.filter((item) => item === url).length,
      1,
      `catalog should include ${url} exactly once`
    );
    assert.equal(
      seedUrlMatches.filter((item) => item === url).length,
      1,
      `seed should include ${url} exactly once`
    );
  }
});

test("catalog watch 8pm IST 2026-09-02 adds Will Dr Web LP plus four unofficial packs", () => {
  const will = getFallbackPack("old-pgmrs-will", "will");
  assert.ok(will);
  assert.equal(will.id, "10000000-0000-0000-0000-000000000118");
  assert.equal(will.official, false);
  assert.equal(will.featured, false);
  assert.equal(will.seats[0]?.name, "Grok VM maintenance");
  assert.equal(will.seats[0]?.isDesk, true);
  assert.equal(will.seats[0]?.grokTemplateUrl, "https://x.ai/bot/9UZp5k0Fp0LYmkyos5swQ");
  assert.deepEqual(
    will.seats.slice(0, 2).map((item) => ({
      id: item.id,
      name: item.name,
      isDesk: item.isDesk,
      sortOrder: item.sortOrder,
      grokTemplateUrl: item.grokTemplateUrl,
    })),
    [
      {
        id: "20000000-0000-0000-0000-000000000135",
        name: "Grok VM maintenance",
        isDesk: true,
        sortOrder: 0,
        grokTemplateUrl: "https://x.ai/bot/9UZp5k0Fp0LYmkyos5swQ",
      },
      {
        id: "20000000-0000-0000-0000-000000000169",
        name: "Dr Web LP",
        isDesk: false,
        sortOrder: 1,
        grokTemplateUrl: "https://x.ai/bot/xM153pKfXPLWagLi_O1vR",
      },
    ]
  );
  assert.match(will.seats[1]?.job ?? "", /supplied reference image/i);
  assert.match(will.routingRule, /Grok VM maintenance/);
  assert.match(will.routingRule, /Dr Web LP only for implementing a page from a supplied reference image/);
  assert.match(will.readmeMd ?? "", /Do not mix with Can \(@herdrdev\) Shepherd/);
  assert.ok(!will.seats.some((item) => item.name === "Shepherd"));
  assert.ok(!will.seats.some((item) => item.grokTemplateUrl === "https://x.ai/bot/i5YF8f-zdcR76uKPrqg3J"));
  assert.equal(listFallbackPacksByOwner("old-pgmrs-will").length, 1);

  const can = getFallbackPack("herdrdev", "can");
  assert.ok(can);
  assert.equal(can.seats.length, 1);
  assert.equal(can.seats[0]?.name, "Shepherd");
  assert.ok(!can.seats.some((item) => item.name === "Dr Web LP"));

  const expected = [
    {
      owner: "bossriceshark",
      slug: "matt",
      name: "Matt",
      desk: "Fable 5.1 Oracle",
      url: "https://x.ai/bot/tLSg4HxepSclMqbZUTRnX",
      seatId: "20000000-0000-0000-0000-000000000170",
      packId: "10000000-0000-0000-0000-000000000140",
      topic: "developer",
      avatar: "https://avatars.githubusercontent.com/u/194162663?v=4" as string | null,
      job: /Fable 5\.1 planning and review/i,
      xHandle: "bossriceshark",
      seats: 1,
    },
    {
      owner: "saasocalypse",
      slug: "ankur",
      name: "Ankur",
      desk: "Know Yourself",
      url: "https://x.ai/bot/mD27QOhXb_plMRSbsvMOv",
      seatId: "20000000-0000-0000-0000-000000000171",
      packId: "10000000-0000-0000-0000-000000000141",
      topic: "founder",
      avatar: null,
      job: /Internal intelligence bot/i,
      xHandle: "SaaSocalypse",
      seats: 2,
    },
    {
      owner: "mpieras",
      slug: "miguel",
      name: "Miguel",
      desk: "Farm",
      url: "https://x.ai/bot/x3Iv-2J4mfxJY6JFlgwNa",
      seatId: "20000000-0000-0000-0000-000000000173",
      packId: "10000000-0000-0000-0000-000000000142",
      topic: "developer",
      avatar: "https://avatars.githubusercontent.com/u/9534587?v=4",
      job: /isolated Claude Code/i,
      xHandle: "mpieras",
      seats: 1,
    },
    {
      owner: "emrecolakoglu",
      slug: "emre",
      name: "Emre",
      desk: "aoty",
      url: "https://x.ai/bot/Wt4IQj3R1eePOyOOnox7H",
      seatId: "20000000-0000-0000-0000-000000000174",
      packId: "10000000-0000-0000-0000-000000000143",
      topic: "media",
      avatar: "https://avatars.githubusercontent.com/u/919056?v=4",
      job: /Album of the Year/i,
      xHandle: "emrecolakoglu",
      seats: 1,
    },
  ] as const;

  for (const item of expected) {
    const pack = getFallbackPack(item.owner, item.slug);
    assert.ok(pack, `${item.owner}/${item.slug}`);
    assert.equal(pack.id, item.packId);
    assert.equal(pack.name, item.name);
    assert.equal(pack.official, false);
    assert.equal(pack.featured, false);
    assert.equal(pack.githubUrl, null);
    assert.deepEqual(pack.topics, [item.topic]);
    assert.equal(pack.likesCount, 0);
    assert.equal(pack.installsCount, 0);
    assert.equal(pack.visitsCount, 0);
    assert.ok(pack.seats.length >= item.seats);
    assert.equal(pack.seats[0]?.name, item.desk);
    assert.equal(pack.seats[0]?.isDesk, true);
    assert.equal(pack.seats[0]?.sortOrder, 0);
    assert.equal(pack.seats[0]?.id, item.seatId);
    assert.equal(pack.seats[0]?.grokTemplateUrl, item.url);
    assert.equal(parseGrokTemplateUrl(pack.seats[0]?.grokTemplateUrl), item.url);
    assert.match(pack.seats[0]?.job ?? "", item.job);
    assert.equal(pack.owner.githubLogin, item.owner);
    assert.equal(pack.owner.avatarUrl, item.avatar);
    assert.equal(pack.owner.xHandle, item.xHandle);
    assert.match(seedSql, new RegExp(item.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(seedSql, new RegExp(item.packId));
    assert.match(seedSql, new RegExp(item.seatId));
    assert.equal(listFallbackPacksByOwner(item.owner).length, 1);
  }

  const ankur = getFallbackPack("saasocalypse", "ankur");
  assert.ok(ankur);
  assert.deepEqual(
    ankur.seats.map((item) => ({
      id: item.id,
      name: item.name,
      isDesk: item.isDesk,
      sortOrder: item.sortOrder,
      grokTemplateUrl: item.grokTemplateUrl,
    })),
    [
      {
        id: "20000000-0000-0000-0000-000000000171",
        name: "Know Yourself",
        isDesk: true,
        sortOrder: 0,
        grokTemplateUrl: "https://x.ai/bot/mD27QOhXb_plMRSbsvMOv",
      },
      {
        id: "20000000-0000-0000-0000-000000000172",
        name: "Know Enemy",
        isDesk: false,
        sortOrder: 1,
        grokTemplateUrl: "https://x.ai/bot/LREkas8UxVGvPJ5NiO7bz",
      },
    ]
  );
  assert.match(ankur.routingRule, /Know Yourself/);
  assert.match(ankur.routingRule, /Know Enemy only for scheduled competitive intelligence/);
  assert.match(ankur.seats[1]?.job ?? "", /public OSINT only/i);

  const lauren = getFallbackPack("poteto", "lauren");
  assert.ok(lauren);
  assert.equal(lauren.seats[0]?.name, "Dr Eggbot");
  assert.equal(lauren.seats[0]?.isDesk, true);
  assert.equal(lauren.seats[1]?.name, "tinkabot");
  assert.ok(!lauren.seats.some((item) => /peddler/i.test(item.name)));
  assert.ok(!listFallbackPacks().some((pack) => pack.seats.some((seat) => /peddler/i.test(seat.name))));

  assert.ok(getFallbackProfile("bossriceshark"));
  assert.ok(getFallbackProfile("saasocalypse"));
  assert.ok(getFallbackProfile("mpieras"));
  assert.ok(getFallbackProfile("emrecolakoglu"));
  assert.equal(getFallbackProfile("SaaSocalypse"), null);
  assert.equal(getFallbackProfile("bossRiceShark"), null);
  assert.equal(getFallbackPack("examples", "stencil"), null);
  assert.ok(!listFallbackPacks().some((pack) => pack.owner.githubLogin === "examples"));

  const skipped = [
    "https://x.ai/bot/ny02y0VWgzWSSFlXgpWVZ",
    "https://x.ai/bot/vYIAB3Z6V8gEERewymcw1",
    "https://x.ai/bot/UWNGpcghM9H79JCb4of5Q",
    "https://x.ai/bot/Z0Faxo9DTX0KL7j7OHTWJ",
  ];
  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url): url is string => Boolean(url));
  const uniqueFallbackUrls = new Set(fallbackUrls);
  assert.equal(fallbackUrls.length, 1339);
  assert.equal(uniqueFallbackUrls.size, 1339);
  for (const url of skipped) {
    assert.ok(!uniqueFallbackUrls.has(url), `catalog should skip ${url}`);
    assert.ok(!seedSql.includes(url), `seed should skip ${url}`);
  }

  const addedUrls = [
    "https://x.ai/bot/xM153pKfXPLWagLi_O1vR",
    ...expected.map((item) => item.url),
    "https://x.ai/bot/LREkas8UxVGvPJ5NiO7bz",
  ];
  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  for (const url of addedUrls) {
    assert.equal(
      fallbackUrls.filter((item) => item === url).length,
      1,
      `catalog should include ${url} exactly once`
    );
    assert.equal(
      seedUrlMatches.filter((item) => item === url).length,
      1,
      `seed should include ${url} exactly once`
    );
  }

  for (const url of uniqueFallbackUrls) {
    assert.ok(seedUrlMatches.includes(url), `seed missing ${url}`);
  }
});

test("catalog watch adds Fondi, Tesla Bot, Table Money, and nine unofficial packs", () => {
  const nao = getFallbackPack("naoufalelh", "nao");
  assert.ok(nao);
  assert.equal(nao.seats.length, 6);
  assert.equal(nao.seats[2]?.id, "20000000-0000-0000-0000-000000000175");
  assert.equal(nao.seats[2]?.name, "Fondi");
  assert.equal(nao.seats[2]?.isDesk, false);
  assert.equal(nao.seats[2]?.sortOrder, 2);
  assert.equal(nao.seats[2]?.grokTemplateUrl, "https://x.ai/bot/qL920VjKyua3_u89UYnQL");
  assert.match(nao.seats[2]?.job ?? "", /Founding-team installer/i);
  assert.match(nao.routingRule, /Fondi only for founding-team installer work/);

  const matt = getFallbackPack("mvanhorn", "matt-vanhorn");
  assert.ok(matt);
  assert.equal(matt.seats[0]?.name, "last30days");
  assert.equal(matt.seats[0]?.isDesk, true);
  assert.deepEqual(
    matt.seats.map((item) => ({
      id: item.id,
      name: item.name,
      isDesk: item.isDesk,
      sortOrder: item.sortOrder,
      grokTemplateUrl: item.grokTemplateUrl,
    })),
    [
      {
        id: "20000000-0000-0000-0000-000000000082",
        name: "last30days",
        isDesk: true,
        sortOrder: 0,
        grokTemplateUrl: "https://x.ai/bot/ANv3NrqPfRcS9PdXku7h8",
      },
      {
        id: "20000000-0000-0000-0000-000000000176",
        name: "Tesla Bot",
        isDesk: false,
        sortOrder: 1,
        grokTemplateUrl: "https://x.ai/bot/l4EozO2deoaWFB8hOGwTY",
      },
    ]
  );
  assert.match(matt.seats[1]?.job ?? "", /tesla-pp-cli/i);
  assert.match(matt.routingRule, /Tesla Bot only for Tesla vehicle control from chat/);

  const andrew = getFallbackPack("Andrew51786", "andrew");
  assert.ok(andrew);
  assert.equal(andrew.seats[0]?.name, "AvatarMaker");
  assert.equal(andrew.seats[0]?.isDesk, true);
  assert.deepEqual(
    andrew.seats.map((item) => ({
      id: item.id,
      name: item.name,
      isDesk: item.isDesk,
      sortOrder: item.sortOrder,
      grokTemplateUrl: item.grokTemplateUrl,
    })),
    [
      {
        id: "20000000-0000-0000-0000-000000000126",
        name: "AvatarMaker",
        isDesk: true,
        sortOrder: 0,
        grokTemplateUrl: "https://x.ai/bot/EfBhh8nwpuGD0XNfl0eBI",
      },
      {
        id: "20000000-0000-0000-0000-000000000177",
        name: "Table Money",
        isDesk: false,
        sortOrder: 1,
        grokTemplateUrl: "https://x.ai/bot/abfx0_FhJ8G_mue5YWQxM",
      },
      {
        id: "20000000-0000-0000-0000-000000000204",
        name: "Denial Desk",
        isDesk: false,
        sortOrder: 2,
        grokTemplateUrl: "https://x.ai/bot/EgfoyJEx7bfDiHlZUwr3P",
      },
    ]
  );
  assert.match(andrew.seats[1]?.job ?? "", /not closed/i);
  assert.match(andrew.seats[2]?.job ?? "", /draft-only appeal pack/);
  assert.match(andrew.routingRule, /Table Money only for unclosed money already earned or paid/);
  assert.match(andrew.routingRule, /Denial Desk only for insurance denials \/ appeal packs/);

  const ahalvorAndy = getFallbackPack("ahalvor", "andy");
  const madrickAndy = getFallbackPack("andymadrick", "andy");
  assert.ok(ahalvorAndy);
  assert.ok(madrickAndy);
  assert.notEqual(ahalvorAndy.id, madrickAndy.id);
  assert.equal(ahalvorAndy.seats[0]?.name, "Homeroom");
  assert.equal(madrickAndy.seats[0]?.name, "coffee companion");
  assert.match(ahalvorAndy.readmeMd ?? "", /not Andy \(@andymadrick\)/);
  assert.match(madrickAndy.readmeMd ?? "", /not Andy \(@ahalvor\)/);
  assert.equal(listFallbackPacksByOwner("ahalvor").length, 1);
  assert.equal(listFallbackPacksByOwner("andymadrick").length, 1);

  const expected = [
    {
      owner: "AdemVessell",
      slug: "adem",
      name: "Adem",
      desk: "Funhouse",
      url: "https://x.ai/bot/kP7i2Po6_T_Rj9h9VVlk5",
      seatId: "20000000-0000-0000-0000-000000000178",
      packId: "10000000-0000-0000-0000-000000000144",
      topic: "media",
      avatar: "https://avatars.githubusercontent.com/u/134353219?v=4" as string | null,
      job: /customization lab/i,
      xHandle: "AdemVessell",
    },
    {
      owner: "andymadrick",
      slug: "andy",
      name: "Andy",
      desk: "coffee companion",
      url: "https://x.ai/bot/SqO-_5207iInz0iDSAFVW",
      seatId: "20000000-0000-0000-0000-000000000179",
      packId: "10000000-0000-0000-0000-000000000145",
      topic: "founder",
      avatar: "https://avatars.githubusercontent.com/u/140104796?v=4",
      job: /Pour-over recipe cards/i,
      xHandle: "andymadrick",
    },
    {
      owner: "kunalsells",
      slug: "kunal",
      name: "Kunal",
      desk: "Babel",
      url: "https://x.ai/bot/-GzMJlSIqdo89K0qs3yC4",
      seatId: "20000000-0000-0000-0000-000000000180",
      packId: "10000000-0000-0000-0000-000000000146",
      topic: "developer",
      avatar: null,
      job: /Live Zoom translator/i,
      xHandle: "kunalsells",
    },
    {
      owner: "yoda_FDE",
      slug: "yoda",
      name: "Yoda",
      desk: "Price Error Agent",
      url: "https://x.ai/bot/cbULQqhzmOeeJ9GT2DX7L",
      seatId: "20000000-0000-0000-0000-000000000181",
      packId: "10000000-0000-0000-0000-000000000147",
      topic: "founder",
      avatar: null,
      job: /Australian retailers/i,
      xHandle: "yoda_FDE",
    },
    {
      owner: "Bryanofearth",
      slug: "bryan",
      name: "Bryan",
      desk: "Code Team Spawn",
      url: "https://x.ai/bot/_G3maEq_3-ijcQJ1Efr4X",
      seatId: "20000000-0000-0000-0000-000000000182",
      packId: "10000000-0000-0000-0000-000000000148",
      topic: "developer",
      avatar: "https://avatars.githubusercontent.com/u/171011086?v=4",
      job: /Conductor plus a hidden five-person crew/i,
      xHandle: "bryanofearth",
    },
    {
      owner: "CoonInvestments",
      slug: "austin",
      name: "Austin",
      desk: "Wall Street",
      url: "https://x.ai/bot/0qNgH0mv4-N-gv_KkZbEm",
      seatId: "20000000-0000-0000-0000-000000000183",
      packId: "10000000-0000-0000-0000-000000000149",
      topic: "founder",
      avatar: null,
      job: /weekday paper sessions/i,
      xHandle: "CoonInvestments",
    },
    {
      owner: "JOwens254",
      slug: "justin",
      name: "Justin",
      desk: "Charge Maestro",
      url: "https://x.ai/bot/29uyQjSrZ3dTb4Ctf7S3w",
      seatId: "20000000-0000-0000-0000-000000000184",
      packId: "10000000-0000-0000-0000-000000000150",
      topic: "founder",
      avatar: null,
      job: /leftover solar/i,
      xHandle: "JOwens254",
    },
    {
      owner: "onerinas",
      slug: "rinas",
      name: "Rinas",
      desk: "dosebot",
      url: "https://x.ai/bot/2euxntVrddHyA3c2hyxiZ",
      seatId: "20000000-0000-0000-0000-000000000185",
      packId: "10000000-0000-0000-0000-000000000151",
      topic: "founder",
      avatar: "https://avatars.githubusercontent.com/u/5433320?v=4",
      job: /vitamin, painkiller, or mixed/i,
      xHandle: "onerinas",
    },
    {
      owner: "pavravi",
      slug: "pavan",
      name: "Pavan",
      desk: "deck-guy",
      url: "https://x.ai/bot/bdkJcjP5Gt9BaGTqh1vXH",
      seatId: "20000000-0000-0000-0000-000000000186",
      packId: "10000000-0000-0000-0000-000000000152",
      topic: "founder",
      avatar: null,
      job: /black-and-white follow-up deck/i,
      xHandle: "pavravi",
    },
  ] as const;

  for (const item of expected) {
    const pack = getFallbackPack(item.owner, item.slug);
    assert.ok(pack, `${item.owner}/${item.slug}`);
    assert.equal(pack.id, item.packId);
    assert.equal(pack.name, item.name);
    assert.equal(pack.official, false);
    assert.equal(pack.featured, false);
    assert.equal(pack.githubUrl, null);
    assert.deepEqual(pack.topics, [item.topic]);
    assert.equal(pack.likesCount, 0);
    assert.equal(pack.installsCount, 0);
    assert.equal(pack.visitsCount, 0);
    assert.equal(pack.seats.length, item.owner === "onerinas" ? 2 : 1);
    assert.equal(pack.seats[0]?.name, item.desk);
    assert.equal(pack.seats[0]?.isDesk, true);
    assert.equal(pack.seats[0]?.sortOrder, 0);
    assert.equal(pack.seats[0]?.id, item.seatId);
    assert.equal(pack.seats[0]?.grokTemplateUrl, item.url);
    assert.equal(parseGrokTemplateUrl(pack.seats[0]?.grokTemplateUrl), item.url);
    assert.match(pack.seats[0]?.job ?? "", item.job);
    assert.equal(pack.owner.githubLogin, item.owner);
    assert.equal(pack.owner.avatarUrl, item.avatar);
    assert.equal(pack.owner.xHandle, item.xHandle);
    assert.match(seedSql, new RegExp(item.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(seedSql, new RegExp(item.packId));
    assert.match(seedSql, new RegExp(item.seatId));
    assert.equal(listFallbackPacksByOwner(item.owner).length, 1);
  }

  const bryan = getFallbackPack("Bryanofearth", "bryan");
  assert.ok(bryan);
  assert.match(bryan.readmeMd ?? "", /NuOSHSdCZPVkM78K0HkB3/);
  assert.ok(!bryan.seats.some((item) => item.grokTemplateUrl === "https://x.ai/bot/NuOSHSdCZPVkM78K0HkB3"));

  assert.ok(getFallbackProfile("AdemVessell"));
  assert.ok(getFallbackProfile("andymadrick"));
  assert.ok(getFallbackProfile("kunalsells"));
  assert.ok(getFallbackProfile("yoda_FDE"));
  assert.ok(getFallbackProfile("Bryanofearth"));
  assert.ok(getFallbackProfile("CoonInvestments"));
  assert.ok(getFallbackProfile("JOwens254"));
  assert.ok(getFallbackProfile("onerinas"));
  assert.ok(getFallbackProfile("pavravi"));
  assert.ok(getFallbackProfile("jakewlittle"));
  assert.equal(getFallbackProfile("ademvessell"), null);
  assert.equal(getFallbackProfile("bryanofearth"), null);
  assert.equal(getFallbackPack("examples", "stencil"), null);
  assert.ok(!listFallbackPacks().some((pack) => pack.owner.githubLogin === "examples"));

  const skipped = [
    "https://x.ai/bot/08RSf587bOlWhbQai6A3I",
    "https://x.ai/bot/3n26nkAkMjk5EZcKJlo9w",
    "https://x.ai/bot/NuOSHSdCZPVkM78K0HkB3",
    "https://x.ai/bot/use-cases",
    "https://x.ai/bot/GTStkB5wsoSlGx9jtdaPe",
  ];
  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url): url is string => Boolean(url));
  const uniqueFallbackUrls = new Set(fallbackUrls);
  assert.equal(fallbackUrls.length, 1339);
  assert.equal(uniqueFallbackUrls.size, 1339);
  for (const url of skipped) {
    assert.ok(!uniqueFallbackUrls.has(url), `catalog should skip ${url}`);
    assert.ok(!seedSql.includes(url), `seed should skip ${url}`);
  }

  const addedUrls = [
    "https://x.ai/bot/qL920VjKyua3_u89UYnQL",
    "https://x.ai/bot/l4EozO2deoaWFB8hOGwTY",
    "https://x.ai/bot/abfx0_FhJ8G_mue5YWQxM",
    ...expected.map((item) => item.url),
  ];
  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  for (const url of addedUrls) {
    assert.equal(
      fallbackUrls.filter((item) => item === url).length,
      1,
      `catalog should include ${url} exactly once`
    );
    assert.equal(
      seedUrlMatches.filter((item) => item === url).length,
      1,
      `seed should include ${url} exactly once`
    );
  }

  for (const url of uniqueFallbackUrls) {
    assert.ok(seedUrlMatches.includes(url), `seed missing ${url}`);
  }
});

test("catalog adds Rinas ideabot, Thierry Rogue Bot Hunter, Jake Grok Customer Support, and Tyler Fantasy GM URL", () => {
  const rinas = getFallbackPack("onerinas", "rinas");
  assert.ok(rinas);
  assert.equal(rinas.id, "10000000-0000-0000-0000-000000000151");
  assert.equal(rinas.official, false);
  assert.equal(rinas.featured, false);
  assert.equal(rinas.seats[0]?.name, "dosebot");
  assert.equal(rinas.seats[0]?.isDesk, true);
  assert.equal(rinas.seats[0]?.grokTemplateUrl, "https://x.ai/bot/2euxntVrddHyA3c2hyxiZ");
  assert.deepEqual(
    rinas.seats.map((item) => ({
      id: item.id,
      name: item.name,
      isDesk: item.isDesk,
      sortOrder: item.sortOrder,
      grokTemplateUrl: item.grokTemplateUrl,
    })),
    [
      {
        id: "20000000-0000-0000-0000-000000000185",
        name: "dosebot",
        isDesk: true,
        sortOrder: 0,
        grokTemplateUrl: "https://x.ai/bot/2euxntVrddHyA3c2hyxiZ",
      },
      {
        id: "20000000-0000-0000-0000-000000000187",
        name: "ideabot",
        isDesk: false,
        sortOrder: 1,
        grokTemplateUrl: "https://x.ai/bot/iQ8OWEu7eOI3YuTZFaIe_",
      },
    ]
  );
  assert.match(rinas.seats[1]?.job ?? "", /hourly idea hunter/i);
  assert.match(rinas.routingRule, /dosebot/);
  assert.match(rinas.routingRule, /ideabot only for hourly idea mining \/ vitamin-painkiller hunting/);
  assert.match(rinas.readmeMd ?? "", /Random stays at dosebot/);
  assert.equal(listFallbackPacksByOwner("onerinas").length, 1);

  const thierry = getFallbackPack("LeTerryBZH", "thierry");
  assert.ok(thierry);
  assert.equal(thierry.id, "10000000-0000-0000-0000-000000000026");
  assert.equal(thierry.official, false);
  assert.equal(thierry.featured, false);
  assert.equal(thierry.seats[0]?.name, "2nd Brain");
  assert.equal(thierry.seats[0]?.isDesk, true);
  assert.equal(thierry.seats[0]?.grokTemplateUrl, "https://x.ai/bot/c4fYduVVic2YtbcjXquD0");
  assert.deepEqual(
    thierry.seats.map((item) => ({
      id: item.id,
      name: item.name,
      isDesk: item.isDesk,
      sortOrder: item.sortOrder,
      grokTemplateUrl: item.grokTemplateUrl,
    })),
    [
      {
        id: "20000000-0000-0000-0000-000000000024",
        name: "2nd Brain",
        isDesk: true,
        sortOrder: 0,
        grokTemplateUrl: "https://x.ai/bot/c4fYduVVic2YtbcjXquD0",
      },
      {
        id: "20000000-0000-0000-0000-000000000188",
        name: "Rogue Bot Hunter",
        isDesk: false,
        sortOrder: 1,
        grokTemplateUrl: "https://x.ai/bot/DNpS1nqrBzmQ5vsx1IHn1",
      },
      {
        id: "20000000-0000-0000-0000-000000000227",
        name: "My Vote For 2027",
        isDesk: false,
        sortOrder: 2,
        grokTemplateUrl: "https://x.ai/bot/CHmLGnQyx6r8lkb3U8k9x",
      },
    ]
  );
  assert.match(thierry.seats[1]?.job ?? "", /police for rogue bots/i);
  assert.match(thierry.routingRule, /My Vote For 2027 only for French 2027 candidate scoring/);
  assert.match(thierry.routingRule, /2nd Brain/);
  assert.match(thierry.routingRule, /Rogue Bot Hunter only for rogue\/fleet policing/);
  assert.match(thierry.readmeMd ?? "", /Random stays at 2nd Brain/);
  assert.equal(listFallbackPacksByOwner("LeTerryBZH").length, 1);

  const jake = getFallbackPack("jakewlittle", "jake");
  assert.ok(jake);
  assert.equal(jake.id, "10000000-0000-0000-0000-000000000153");
  assert.equal(jake.name, "Jake");
  assert.equal(jake.official, false);
  assert.equal(jake.featured, false);
  assert.equal(jake.githubUrl, null);
  assert.deepEqual(jake.topics, ["founder"]);
  assert.equal(jake.seats.length, 1);
  assert.equal(jake.seats[0]?.id, "20000000-0000-0000-0000-000000000189");
  assert.equal(jake.seats[0]?.name, "Grok Customer Support");
  assert.equal(jake.seats[0]?.isDesk, true);
  assert.equal(jake.seats[0]?.sortOrder, 0);
  assert.equal(jake.seats[0]?.grokTemplateUrl, "https://x.ai/bot/1PSI6qQln1PowM5reA_8L");
  assert.match(jake.seats[0]?.job ?? "", /Twilio/);
  assert.equal(jake.owner.githubLogin, "jakewlittle");
  assert.equal(jake.owner.name, "Jake");
  assert.equal(jake.owner.xHandle, "jakewlittle");
  assert.equal(jake.owner.avatarUrl, "https://avatars.githubusercontent.com/u/94403708?v=4");
  assert.equal(listFallbackPacksByOwner("jakewlittle").length, 1);

  const tyler = getFallbackPack("tylernishida", "tyler");
  assert.ok(tyler);
  assert.equal(tyler.id, "10000000-0000-0000-0000-000000000116");
  assert.equal(tyler.seats.length, 1);
  assert.equal(tyler.seats[0]?.id, "20000000-0000-0000-0000-000000000133");
  assert.equal(tyler.seats[0]?.name, "Fantasy GM");
  assert.equal(tyler.seats[0]?.isDesk, true);
  assert.equal(tyler.seats[0]?.sortOrder, 0);
  assert.equal(tyler.seats[0]?.grokTemplateUrl, "https://x.ai/bot/uszqxwGlAmEQ_38nEcT5A");
  assert.match(tyler.seats[0]?.job ?? "", /Fantasy football GM for draft, trades, and roster/);
  assert.ok(!tyler.seats.some((item) => item.grokTemplateUrl === "https://x.ai/bot/vmQChAUGO26cUDqdSqYlH"));

  assert.ok(getFallbackProfile("jakewlittle"));
  assert.equal(getFallbackProfile("JakeWLittle"), null);
  assert.equal(getFallbackPack("examples", "stencil"), null);
  assert.ok(!listFallbackPacks().some((pack) => pack.owner.githubLogin === "examples"));

  const skipped = [
    "https://x.ai/bot/GTStkB5wsoSlGx9jtdaPe",
    "https://x.ai/bot/vmQChAUGO26cUDqdSqYlH",
  ];
  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url): url is string => Boolean(url));
  const uniqueFallbackUrls = new Set(fallbackUrls);
  assert.equal(fallbackUrls.length, 1339);
  assert.equal(uniqueFallbackUrls.size, 1339);
  for (const url of skipped) {
    assert.ok(!uniqueFallbackUrls.has(url), `catalog should skip ${url}`);
    assert.ok(!seedSql.includes(url), `seed should skip ${url}`);
  }

  const addedUrls = [
    "https://x.ai/bot/iQ8OWEu7eOI3YuTZFaIe_",
    "https://x.ai/bot/DNpS1nqrBzmQ5vsx1IHn1",
    "https://x.ai/bot/1PSI6qQln1PowM5reA_8L",
    "https://x.ai/bot/uszqxwGlAmEQ_38nEcT5A",
  ];
  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  for (const url of addedUrls) {
    assert.equal(
      fallbackUrls.filter((item) => item === url).length,
      1,
      `catalog should include ${url} exactly once`
    );
    assert.equal(
      seedUrlMatches.filter((item) => item === url).length,
      1,
      `seed should include ${url} exactly once`
    );
  }

  assert.match(seedSql, /jakewlittle@orgbots\.dev/);
  assert.match(seedSql, /20000000-0000-0000-0000-000000000187/);
  assert.match(seedSql, /20000000-0000-0000-0000-000000000188/);
  assert.match(seedSql, /20000000-0000-0000-0000-000000000189/);
  assert.match(seedSql, /10000000-0000-0000-0000-000000000153/);
  assert.match(seedSql, /00000000-0000-0000-0000-000000000145/);
});

test("catalog adds Erinn Dean of Students, Liam QC/logistics/sales seats, and Knock Box Inspector", () => {
  const erinn = getFallbackPack("erinnfl", "erinn");
  assert.ok(erinn);
  assert.equal(erinn.id, "10000000-0000-0000-0000-000000000154");
  assert.equal(erinn.name, "Erinn");
  assert.equal(erinn.official, false);
  assert.equal(erinn.featured, false);
  assert.equal(erinn.githubUrl, null);
  assert.deepEqual(erinn.topics, ["founder"]);
  assert.equal(erinn.seats.length, 2);
  assert.equal(erinn.seats[0]?.id, "20000000-0000-0000-0000-000000000190");
  assert.equal(erinn.seats[0]?.name, "Dean of Students");
  assert.equal(erinn.seats[0]?.isDesk, true);
  assert.equal(erinn.seats[0]?.sortOrder, 0);
  assert.equal(erinn.seats[0]?.grokTemplateUrl, "https://x.ai/bot/_hsyZUFgPzgxGxW2wIYAj");
  assert.match(erinn.seats[0]?.job ?? "", /parent still signs, pays, and sends/);
  assert.match(erinn.routingRule, /Dean of Students/);
  assert.equal(erinn.owner.githubLogin, "erinnfl");
  assert.equal(erinn.owner.name, "Erinn");
  assert.equal(erinn.owner.xHandle, "ErinnFL");
  assert.equal(erinn.owner.avatarUrl, null);
  assert.equal(listFallbackPacksByOwner("erinnfl").length, 1);
  assert.ok(getFallbackProfile("erinnfl"));
  assert.equal(getFallbackProfile("ErinnFL"), null);

  const liam = getFallbackPack("liam_fallen", "liam");
  assert.ok(liam);
  assert.equal(liam.id, "10000000-0000-0000-0000-000000000065");
  assert.equal(liam.seats[0]?.name, "Bounty Hunter");
  assert.equal(liam.seats[0]?.isDesk, true);
  assert.equal(liam.seats[0]?.grokTemplateUrl, "https://x.ai/bot/gCWYD009F66A3XDEYdZgf");
  assert.deepEqual(
    liam.seats.map((item) => ({
      id: item.id,
      name: item.name,
      isDesk: item.isDesk,
      sortOrder: item.sortOrder,
      grokTemplateUrl: item.grokTemplateUrl,
    })),
    [
      {
        id: "20000000-0000-0000-0000-000000000074",
        name: "Bounty Hunter",
        isDesk: true,
        sortOrder: 0,
        grokTemplateUrl: "https://x.ai/bot/gCWYD009F66A3XDEYdZgf",
      },
      {
        id: "20000000-0000-0000-0000-000000000191",
        name: "Gus Fring",
        isDesk: false,
        sortOrder: 1,
        grokTemplateUrl: "https://x.ai/bot/Dhk5c79MEj0MRM484ZM1k",
      },
      {
        id: "20000000-0000-0000-0000-000000000192",
        name: "Beatrix Kiddo",
        isDesk: false,
        sortOrder: 2,
        grokTemplateUrl: "https://x.ai/bot/z4Chp77wqP5ASkBKpxOOk",
      },
      {
        id: "20000000-0000-0000-0000-000000000193",
        name: "Jordan Belfort",
        isDesk: false,
        sortOrder: 3,
        grokTemplateUrl: "https://x.ai/bot/fh1hnF7YJVoSJxEu-vKwj",
      },
      {
        id: "20000000-0000-0000-0000-000000000195",
        name: "Sarah Connor",
        isDesk: false,
        sortOrder: 4,
        grokTemplateUrl: "https://x.ai/bot/Bw-JDTu5BhTFki1GhAy9k",
      },
      {
        id: "20000000-0000-0000-0000-000000000196",
        name: "Tony Montana",
        isDesk: false,
        sortOrder: 5,
        grokTemplateUrl: "https://x.ai/bot/tbuow4aHucVEAgNbF7qzU",
      },
      {
        id: "20000000-0000-0000-0000-000000000499",
        name: "Lockdown",
        isDesk: false,
        sortOrder: 6,
        grokTemplateUrl: "https://x.ai/bot/C5EIiTZZL2pPpsb_po7Zs",
      },
      {
        id: "20000000-0000-0000-0000-000000000606",
        name: "Everyone",
        isDesk: false,
        sortOrder: 7,
        grokTemplateUrl: "https://x.ai/bot/ARBlLiKi4wbhc7o6SlnGu",
      },
      {
        id: "20000000-0000-0000-0000-000000000849",
        name: "Handoff",
        isDesk: false,
        sortOrder: 8,
        grokTemplateUrl: "https://x.ai/bot/wXaXn5rj0pJIMzzonyXsl",
      },
    ]
  );
  assert.match(liam.seats[1]?.job ?? "", /PASS WITH FIXES/);
  assert.match(liam.seats[2]?.job ?? "", /exception queue/);
  assert.match(liam.seats[3]?.job ?? "", /Pipeline hygiene/);
  assert.match(liam.seats[4]?.job ?? "", /operational and business risk/i);
  assert.match(liam.seats[5]?.job ?? "", /Does not spend without approval/);
  assert.match(liam.routingRule, /Bounty Hunter/);
  assert.match(liam.routingRule, /Gus Fring only for QC gate/);
  assert.match(liam.routingRule, /Beatrix Kiddo only for logistics exceptions/);
  assert.match(liam.routingRule, /Jordan Belfort only for sales pipeline/);
  assert.match(liam.routingRule, /Sarah Connor only for risk/);
  assert.match(liam.routingRule, /Tony Montana only for procurement/);

  const knock = getFallbackPack("suddenlyjon", "knock");
  assert.ok(knock);
  assert.equal(knock.seats.length, 44);
  assert.equal(knock.seats[0]?.name, "Token Accountant");
  assert.equal(knock.seats[0]?.isDesk, true);
  assert.equal(knock.seats[4]?.id, "20000000-0000-0000-0000-000000000194");
  assert.equal(knock.seats[4]?.name, "Box Inspector");
  assert.equal(knock.seats[4]?.isDesk, false);
  assert.equal(knock.seats[4]?.sortOrder, 4);
  assert.equal(knock.seats[4]?.grokTemplateUrl, "https://x.ai/bot/q7GLbLhMZDpJXBGuuci1J");
  assert.match(knock.seats[4]?.job ?? "", /Never Adds/);
  assert.match(knock.routingRule, /Box Inspector only for pre-add template inspection/);
  assert.equal(knock.seats[5]?.name, "Bottyguard");
  assert.equal(knock.seats[5]?.isDesk, false);
  assert.equal(knock.seats[5]?.sortOrder, 5);
  assert.equal(knock.seats[11]?.name, "Mirror");
  assert.match(knock.routingRule, /Bottyguard for lure or transcript triage as SEAL Team 7 lead/);
  assert.equal(
    listFallbackPacks().filter((pack) =>
      (getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? []).some(
        (seat) => seat.name === "Box Inspector"
      )
    ).length,
    1
  );

  assert.equal(getFallbackPack("examples", "stencil"), null);
  assert.ok(!listFallbackPacks().some((pack) => pack.owner.githubLogin === "examples"));

  const addedUrls = [
    "https://x.ai/bot/_hsyZUFgPzgxGxW2wIYAj",
    "https://x.ai/bot/Dhk5c79MEj0MRM484ZM1k",
    "https://x.ai/bot/z4Chp77wqP5ASkBKpxOOk",
    "https://x.ai/bot/fh1hnF7YJVoSJxEu-vKwj",
    "https://x.ai/bot/q7GLbLhMZDpJXBGuuci1J",
    "https://x.ai/bot/Bw-JDTu5BhTFki1GhAy9k",
    "https://x.ai/bot/tbuow4aHucVEAgNbF7qzU",
  ];
  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url): url is string => Boolean(url));
  const uniqueFallbackUrls = new Set(fallbackUrls);
  assert.equal(fallbackUrls.length, 1339);
  assert.equal(uniqueFallbackUrls.size, 1339);
  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  for (const url of addedUrls) {
    assert.equal(
      fallbackUrls.filter((item) => item === url).length,
      1,
      `catalog should include ${url} exactly once`
    );
    assert.equal(
      seedUrlMatches.filter((item) => item === url).length,
      1,
      `seed should include ${url} exactly once`
    );
  }

  assert.match(seedSql, /erinnfl@orgbots\.dev/);
  assert.match(seedSql, /20000000-0000-0000-0000-000000000190/);
  assert.match(seedSql, /20000000-0000-0000-0000-000000000191/);
  assert.match(seedSql, /20000000-0000-0000-0000-000000000192/);
  assert.match(seedSql, /20000000-0000-0000-0000-000000000193/);
  assert.match(seedSql, /20000000-0000-0000-0000-000000000194/);
  assert.match(seedSql, /20000000-0000-0000-0000-000000000195/);
  assert.match(seedSql, /20000000-0000-0000-0000-000000000196/);
  assert.match(seedSql, /10000000-0000-0000-0000-000000000154/);
  assert.match(seedSql, /00000000-0000-0000-0000-000000000146/);
});

test("catalog adds Liam Sarah Connor risk and Tony Montana procurement seats", () => {
  const liam = getFallbackPack("liam_fallen", "liam");
  assert.ok(liam);
  assert.equal(liam.official, false);
  assert.equal(liam.featured, false);
  assert.equal(liam.seats[0]?.name, "Bounty Hunter");
  assert.equal(liam.seats[0]?.isDesk, true);
  assert.equal(liam.seats[0]?.grokTemplateUrl, "https://x.ai/bot/gCWYD009F66A3XDEYdZgf");
  assert.equal(liam.seats.length, 9);
  assert.equal(liam.seats[4]?.id, "20000000-0000-0000-0000-000000000195");
  assert.equal(liam.seats[4]?.name, "Sarah Connor");
  assert.equal(liam.seats[4]?.isDesk, false);
  assert.equal(liam.seats[4]?.sortOrder, 4);
  assert.equal(liam.seats[4]?.grokTemplateUrl, "https://x.ai/bot/Bw-JDTu5BhTFki1GhAy9k");
  assert.match(liam.seats[4]?.job ?? "", /Risk Manager/);
  assert.match(liam.seats[4]?.job ?? "", /no plan B/);
  assert.match(liam.seats[4]?.job ?? "", /Not a movie apocalypse novelty/);
  assert.equal(liam.seats[5]?.id, "20000000-0000-0000-0000-000000000196");
  assert.equal(liam.seats[5]?.name, "Tony Montana");
  assert.equal(liam.seats[5]?.isDesk, false);
  assert.equal(liam.seats[5]?.sortOrder, 5);
  assert.equal(liam.seats[5]?.grokTemplateUrl, "https://x.ai/bot/tbuow4aHucVEAgNbF7qzU");
  assert.match(liam.seats[5]?.job ?? "", /Procurement Manager/);
  assert.match(liam.seats[5]?.job ?? "", /Does not spend without approval/);
  assert.match(liam.routingRule, /Random questions stay at Bounty Hunter/);
  assert.match(liam.routingRule, /Sarah Connor only for risk/);
  assert.match(liam.routingRule, /Tony Montana only for procurement/);
  assert.match(liam.routingRule, /Gus Fring only for QC gate/);
  assert.match(liam.routingRule, /Beatrix Kiddo only for logistics exceptions/);
  assert.match(liam.routingRule, /Jordan Belfort only for sales pipeline/);

  assert.equal(getFallbackPack("examples", "stencil"), null);
  assert.ok(!listFallbackPacks().some((pack) => pack.owner.githubLogin === "examples"));

  const addedUrls = [
    "https://x.ai/bot/Bw-JDTu5BhTFki1GhAy9k",
    "https://x.ai/bot/tbuow4aHucVEAgNbF7qzU",
  ];
  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url): url is string => Boolean(url));
  const uniqueFallbackUrls = new Set(fallbackUrls);
  assert.equal(fallbackUrls.length, 1339);
  assert.equal(uniqueFallbackUrls.size, 1339);
  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  const seedUrls = new Set(seedUrlMatches);
  for (const url of uniqueFallbackUrls) {
    assert.ok(seedUrls.has(url), `seed missing ${url}`);
  }
  for (const url of addedUrls) {
    assert.equal(
      fallbackUrls.filter((item) => item === url).length,
      1,
      `catalog should include ${url} exactly once`
    );
    assert.equal(
      seedUrlMatches.filter((item) => item === url).length,
      1,
      `seed should include ${url} exactly once`
    );
  }

  assert.match(seedSql, /'Sarah Connor'/);
  assert.match(seedSql, /'Tony Montana'/);
  assert.match(seedSql, /20000000-0000-0000-0000-000000000195/);
  assert.match(seedSql, /20000000-0000-0000-0000-000000000196/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/Bw-JDTu5BhTFki1GhAy9k/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/tbuow4aHucVEAgNbF7qzU/);
  assert.match(seedSql, /Sarah Connor only for risk/);
  assert.match(seedSql, /Tony Montana only for procurement/);
});

test("catalog adds Knock SEAL Team 7, Andrew Denial Desk, and six unofficial desk packs", () => {
  const knock = getFallbackPack("suddenlyjon", "knock");
  assert.ok(knock);
  assert.equal(knock.seats[0]?.name, "Token Accountant");
  assert.equal(knock.seats[0]?.isDesk, true);
  assert.equal(knock.seats.length, 44);
  assert.deepEqual(
    knock.seats.slice(5, 12).map((item) => ({
      id: item.id,
      name: item.name,
      isDesk: item.isDesk,
      sortOrder: item.sortOrder,
      grokTemplateUrl: item.grokTemplateUrl,
    })),
    [
      {
        id: "20000000-0000-0000-0000-000000000197",
        name: "Bottyguard",
        isDesk: false,
        sortOrder: 5,
        grokTemplateUrl: "https://x.ai/bot/PFI2o0ZcruL6vjjHAm5cF",
      },
      {
        id: "20000000-0000-0000-0000-000000000198",
        name: "Watchbot",
        isDesk: false,
        sortOrder: 6,
        grokTemplateUrl: "https://x.ai/bot/D2M2qOWDB0AKe2k_jG7Ck",
      },
      {
        id: "20000000-0000-0000-0000-000000000199",
        name: "Grokologist",
        isDesk: false,
        sortOrder: 7,
        grokTemplateUrl: "https://x.ai/bot/8vdHXq66kVvVlbACd-IDL",
      },
      {
        id: "20000000-0000-0000-0000-000000000200",
        name: "Twinwright",
        isDesk: false,
        sortOrder: 8,
        grokTemplateUrl: "https://x.ai/bot/Hvli5amrlprtDS2KuFRBP",
      },
      {
        id: "20000000-0000-0000-0000-000000000201",
        name: "Sworm",
        isDesk: false,
        sortOrder: 9,
        grokTemplateUrl: "https://x.ai/bot/l0J0Nj95_yVOlFZIHB1Y_",
      },
      {
        id: "20000000-0000-0000-0000-000000000202",
        name: "Buzzkill",
        isDesk: false,
        sortOrder: 10,
        grokTemplateUrl: "https://x.ai/bot/F1spQY8tmP2KCqnyuAbJh",
      },
      {
        id: "20000000-0000-0000-0000-000000000203",
        name: "Mirror",
        isDesk: false,
        sortOrder: 11,
        grokTemplateUrl: "https://x.ai/bot/6XwjJ_W0mX_ybK4ts_Ngb",
      },
    ]
  );
  assert.match(knock.seats[5]?.job ?? "", /does not detonate/i);
  assert.match(knock.seats[6]?.job ?? "", /Pointers only/);
  assert.match(knock.seats[7]?.job ?? "", /Motive, not vibe/);
  assert.match(knock.seats[8]?.job ?? "", /Never runs the file/);
  assert.match(knock.seats[9]?.job ?? "", /Never a runnable sample/);
  assert.match(knock.seats[10]?.job ?? "", /Human yes before quarantine/);
  assert.match(knock.seats[11]?.job ?? "", /Can pause anyone, including Bottyguard/);
  assert.match(knock.routingRule, /Random questions stay at Token Accountant/);
  assert.match(knock.routingRule, /Bottyguard for lure or transcript triage as SEAL Team 7 lead/);
  assert.match(knock.routingRule, /Watchbot, Grokologist, Twinwright, Sworm, Buzzkill, and Mirror are its named sub-seats/);
  assert.match(knock.routingRule, /Box Inspector only for pre-add template inspection/);

  const andrew = getFallbackPack("Andrew51786", "andrew");
  assert.ok(andrew);
  assert.equal(andrew.seats[0]?.name, "AvatarMaker");
  assert.equal(andrew.seats[0]?.isDesk, true);
  assert.equal(andrew.seats.length, 3);
  assert.equal(andrew.seats[2]?.id, "20000000-0000-0000-0000-000000000204");
  assert.equal(andrew.seats[2]?.name, "Denial Desk");
  assert.equal(andrew.seats[2]?.isDesk, false);
  assert.equal(andrew.seats[2]?.sortOrder, 2);
  assert.equal(andrew.seats[2]?.grokTemplateUrl, "https://x.ai/bot/EgfoyJEx7bfDiHlZUwr3P");
  assert.match(andrew.seats[2]?.job ?? "", /draft-only appeal pack/);
  assert.match(andrew.routingRule, /Denial Desk only for insurance denials \/ appeal packs/);

  const expected = [
    {
      owner: "EvSlatts",
      slug: "slatts",
      name: "Slatts",
      desk: "The Fool",
      url: "https://x.ai/bot/MDcAPLzRIgI0dqTwWV40O",
      seatId: "20000000-0000-0000-0000-000000000205",
      packId: "10000000-0000-0000-0000-000000000155",
      ownerId: "00000000-0000-0000-0000-000000000147",
      topic: "founder",
      job: /King Lear's Fool/,
      xHandle: "EvSlatts",
      ownerName: "Slatts",
    },
    {
      owner: "KinGao476942",
      slug: "kin",
      name: "Kin",
      desk: "AI 视频专家",
      url: "https://x.ai/bot/ES3LVns98INeXAoYwef_f",
      seatId: "20000000-0000-0000-0000-000000000206",
      packId: "10000000-0000-0000-0000-000000000156",
      ownerId: "00000000-0000-0000-0000-000000000148",
      topic: "media",
      job: /no auto-captions, no auto-posting to social/,
      xHandle: "KinGao476942",
      ownerName: "Kin",
    },
    {
      owner: "shahrulestar",
      slug: "shahrul",
      name: "Shahrul",
      desk: "LRT Kelana Jaya Line",
      url: "https://x.ai/bot/LLScxVm-la-ik4JJde3A1",
      seatId: "20000000-0000-0000-0000-000000000207",
      packId: "10000000-0000-0000-0000-000000000157",
      ownerId: "00000000-0000-0000-0000-000000000149",
      topic: "media",
      job: /Rapid KL on X/,
      xHandle: "shahrulestar",
      ownerName: "Shahrul",
    },
    {
      owner: "Ortix008",
      slug: "xo",
      name: "XO",
      desk: "Tray",
      url: "https://x.ai/bot/KDGstUb-ZOovXP6p_v0nO",
      seatId: "20000000-0000-0000-0000-000000000208",
      packId: "10000000-0000-0000-0000-000000000158",
      ownerId: "00000000-0000-0000-0000-000000000150",
      topic: "founder",
      job: /not pumps or buy lists/,
      xHandle: "Ortix008",
      ownerName: "XO",
    },
    {
      owner: "Kamkom05",
      slug: "younes",
      name: "Younes",
      desk: "Magnum Seiba",
      url: "https://x.ai/bot/1-UWhTw5N6IVgOcDZHrsb",
      seatId: "20000000-0000-0000-0000-000000000209",
      packId: "10000000-0000-0000-0000-000000000159",
      ownerId: "00000000-0000-0000-0000-000000000151",
      topic: "founder",
      job: /Teslr/,
      xHandle: "Kamkom05",
      ownerName: "Younes Aberkane",
    },
    {
      owner: "UziObi",
      slug: "uzi",
      name: "Uzi",
      desk: "Fixer",
      url: "https://x.ai/bot/jiF_km66YLNm5LBVJ5_Ho",
      seatId: "20000000-0000-0000-0000-000000000210",
      packId: "10000000-0000-0000-0000-000000000160",
      ownerId: "00000000-0000-0000-0000-000000000152",
      topic: "founder",
      job: /chief of staff's right hand/,
      xHandle: "UziObi",
      ownerName: "Uzi Obi",
    },
  ];

  for (const item of expected) {
    const pack = getFallbackPack(item.owner, item.slug);
    assert.ok(pack, item.slug);
    assert.equal(pack.id, item.packId);
    assert.equal(pack.name, item.name);
    assert.equal(pack.official, false);
    assert.equal(pack.featured, false);
    assert.equal(pack.githubUrl, null);
    assert.deepEqual(pack.topics, [item.topic]);
    assert.equal(pack.likesCount, 0);
    assert.equal(pack.installsCount, 0);
    assert.equal(pack.visitsCount, 0);
    assert.equal(pack.seats.length, item.slug === "xo" ? 4 : item.slug === "uzi" ? 3 : item.slug === "kin" ? 2 : 1);
    assert.equal(pack.seats[0]?.name, item.desk);
    assert.equal(pack.seats[0]?.isDesk, true);
    assert.equal(pack.seats[0]?.sortOrder, 0);
    assert.equal(pack.seats[0]?.id, item.seatId);
    assert.equal(pack.seats[0]?.grokTemplateUrl, item.url);
    assert.equal(parseGrokTemplateUrl(pack.seats[0]?.grokTemplateUrl), item.url);
    assert.match(pack.seats[0]?.job ?? "", item.job);
    assert.equal(pack.owner.githubLogin, item.owner);
    assert.equal(pack.owner.name, item.ownerName);
    assert.equal(pack.owner.xHandle, item.xHandle);
    assert.equal(pack.owner.avatarUrl, null);
    assert.match(seedSql, new RegExp(item.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(seedSql, new RegExp(item.packId));
    assert.match(seedSql, new RegExp(item.seatId));
    assert.match(seedSql, new RegExp(item.ownerId));
    assert.equal(listFallbackPacksByOwner(item.owner).length, 1);
    assert.ok(getFallbackProfile(item.owner));
  }

  assert.equal(getFallbackProfile("evslatts"), null);
  assert.equal(getFallbackProfile("uziobi"), null);
  assert.equal(getFallbackPack("examples", "stencil"), null);
  assert.ok(!listFallbackPacks().some((pack) => pack.owner.githubLogin === "examples"));

  const skipped = [
    "https://x.ai/bot/NuOSHSdCZPVkM78K0HkB3",
    "https://x.ai/bot/use-cases",
  ];
  const addedUrls = [
    "https://x.ai/bot/PFI2o0ZcruL6vjjHAm5cF",
    "https://x.ai/bot/D2M2qOWDB0AKe2k_jG7Ck",
    "https://x.ai/bot/8vdHXq66kVvVlbACd-IDL",
    "https://x.ai/bot/Hvli5amrlprtDS2KuFRBP",
    "https://x.ai/bot/l0J0Nj95_yVOlFZIHB1Y_",
    "https://x.ai/bot/F1spQY8tmP2KCqnyuAbJh",
    "https://x.ai/bot/6XwjJ_W0mX_ybK4ts_Ngb",
    "https://x.ai/bot/EgfoyJEx7bfDiHlZUwr3P",
    ...expected.map((item) => item.url),
  ];
  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url): url is string => Boolean(url));
  const uniqueFallbackUrls = new Set(fallbackUrls);
  assert.equal(fallbackUrls.length, 1339);
  assert.equal(uniqueFallbackUrls.size, 1339);
  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  const seedUrls = new Set(seedUrlMatches);
  for (const url of uniqueFallbackUrls) {
    assert.ok(seedUrls.has(url), `seed missing ${url}`);
  }
  for (const url of skipped) {
    assert.ok(!uniqueFallbackUrls.has(url), `catalog should skip ${url}`);
    assert.ok(!seedSql.includes(url), `seed should skip ${url}`);
  }
  for (const url of addedUrls) {
    assert.equal(
      fallbackUrls.filter((item) => item === url).length,
      1,
      `catalog should include ${url} exactly once`
    );
    assert.equal(
      seedUrlMatches.filter((item) => item === url).length,
      1,
      `seed should include ${url} exactly once`
    );
  }

  assert.match(seedSql, /EvSlatts@orgbots\.dev/);
  assert.match(seedSql, /KinGao476942@orgbots\.dev/);
  assert.match(seedSql, /shahrulestar@orgbots\.dev/);
  assert.match(seedSql, /Ortix008@orgbots\.dev/);
  assert.match(seedSql, /Kamkom05@orgbots\.dev/);
  assert.match(seedSql, /UziObi@orgbots\.dev/);
  assert.match(seedSql, /Denial Desk only for insurance denials \/ appeal packs/);
  assert.match(seedSql, /Bottyguard for lure or transcript triage as SEAL Team 7 lead/);
});

test("catalog adds extra seats for Marc Uzi Scott Knock and nine unofficial desk packs", () => {
  const marc = getFallbackPack("MSaintjour", "marc");
  assert.ok(marc);
  assert.equal(marc.seats[0]?.name, "Copay Compass");
  assert.equal(marc.seats[0]?.isDesk, true);
  assert.equal(marc.seats[0]?.grokTemplateUrl, "https://x.ai/bot/ehxj2Wdxq9M04jvaAqyBD");
  assert.equal(marc.seats.length, 3);
  assert.equal(marc.seats[1]?.id, "20000000-0000-0000-0000-000000000211");
  assert.equal(marc.seats[1]?.name, "Medical Bill Review");
  assert.equal(marc.seats[1]?.isDesk, false);
  assert.equal(marc.seats[1]?.sortOrder, 1);
  assert.equal(marc.seats[1]?.grokTemplateUrl, "https://x.ai/bot/M9c2tC_-mwY8XNTmSbkUY");
  assert.match(marc.seats[1]?.job ?? "", /itemized bill/);
  assert.match(marc.seats[1]?.job ?? "", /never asks for SSN/);
  assert.equal(marc.seats[2]?.id, "20000000-0000-0000-0000-000000000212");
  assert.equal(marc.seats[2]?.name, "Appeal Desk");
  assert.equal(marc.seats[2]?.isDesk, false);
  assert.equal(marc.seats[2]?.sortOrder, 2);
  assert.equal(marc.seats[2]?.grokTemplateUrl, "https://x.ai/bot/yOiPm69HN5FujdkvvysF9");
  assert.match(marc.seats[2]?.job ?? "", /insurance denial/);
  assert.match(marc.routingRule, /Medical Bill Review only for itemized bills/);
  assert.match(marc.routingRule, /Appeal Desk only for insurance denial appeals/);
  assert.match(marc.readmeMd ?? "", /Medical Bill Review and Appeal Desk are also Marc/);

  const uzi = getFallbackPack("UziObi", "uzi");
  assert.ok(uzi);
  assert.equal(uzi.seats[0]?.name, "Fixer");
  assert.equal(uzi.seats[0]?.isDesk, true);
  assert.equal(uzi.seats[0]?.grokTemplateUrl, "https://x.ai/bot/jiF_km66YLNm5LBVJ5_Ho");
  assert.equal(uzi.seats.length, 3);
  assert.equal(uzi.seats[1]?.id, "20000000-0000-0000-0000-000000000213");
  assert.equal(uzi.seats[1]?.name, "X Algo");
  assert.equal(uzi.seats[1]?.isDesk, false);
  assert.equal(uzi.seats[1]?.sortOrder, 1);
  assert.equal(uzi.seats[1]?.grokTemplateUrl, "https://x.ai/bot/W0LrVwNwsRHhFY4PG7586");
  assert.match(uzi.seats[1]?.job ?? "", /For You ranking/);
  assert.match(uzi.routingRule, /X Algo only for X post timing and ranking/);

  const scott = getFallbackPack("scottxmetcalf", "scott");
  assert.ok(scott);
  assert.equal(scott.seats[0]?.name, "Leader 1:1 Bot");
  assert.equal(scott.seats[0]?.isDesk, true);
  assert.equal(scott.seats[3]?.id, "20000000-0000-0000-0000-000000000214");
  assert.equal(scott.seats[3]?.name, "Token Cop");
  assert.equal(scott.seats[3]?.isDesk, false);
  assert.equal(scott.seats[3]?.sortOrder, 3);
  assert.equal(scott.seats[3]?.grokTemplateUrl, "https://x.ai/bot/Ml4ynlD6O1VT5CoYmFnEa");
  assert.match(scott.seats[3]?.job ?? "", /token usage/);
  assert.equal(scott.seats.length, 28);
  assert.equal(scott.seats[4]?.name, "Gong Call Coach");
  assert.equal(scott.seats[4]?.id, "20000000-0000-0000-0000-000000000230");
  assert.equal(scott.seats[5]?.name, "Meeting prep");
  assert.equal(scott.seats[5]?.id, "20000000-0000-0000-0000-000000000231");
  assert.equal(scott.seats[6]?.name, "Task Farming");
  assert.equal(scott.seats[6]?.id, "20000000-0000-0000-0000-000000000329");
  assert.equal(scott.seats[7]?.name, "Travel Agent");
  assert.equal(scott.seats[7]?.id, "20000000-0000-0000-0000-000000000352");
  assert.equal(scott.seats[7]?.isDesk, false);
  assert.equal(scott.seats[7]?.sortOrder, 7);
  assert.equal(scott.seats[7]?.grokTemplateUrl, "https://x.ai/bot/d8C0ufUatv_fgoCRbfXZ4");
  assert.match(scott.seats[7]?.job ?? "", /drafts bookings for approval/);
  assert.match(scott.routingRule, /Token Cop only for agent token spend and alerts/);
  assert.match(scott.routingRule, /Gong Call Coach only for post-call Gong coaching/);
  assert.match(scott.routingRule, /Task Farming only for farming action items/);
  assert.match(scott.routingRule, /Travel Agent only for trip-planning and booking-draft work/);
  assert.match(scott.routingRule, /Ramp only for Ramp expense receipt matching/);
  assert.match(scott.routingRule, /PG Bot only for AE territory pipeline-generation coverage/);
  assert.match(scott.routingRule, /ADM account bot only for account growth and retention plans/);
  assert.equal(scott.seats[8]?.name, "Ramp");
  assert.equal(scott.seats[8]?.id, "20000000-0000-0000-0000-000000000370");
  assert.equal(scott.seats[8]?.isDesk, false);
  assert.equal(scott.seats[8]?.sortOrder, 8);
  assert.equal(scott.seats[15]?.name, "ADM account bot");
  assert.equal(scott.seats[15]?.id, "20000000-0000-0000-0000-000000000377");
  assert.equal(scott.seats[15]?.sortOrder, 15);

  const knock = getFallbackPack("suddenlyjon", "knock");
  assert.ok(knock);
  assert.equal(knock.seats[0]?.name, "Token Accountant");
  assert.equal(knock.seats[0]?.isDesk, true);
  assert.equal(knock.seats.length, 44);
  assert.equal(knock.seats[12]?.id, "20000000-0000-0000-0000-000000000215");
  assert.equal(knock.seats[12]?.name, "Tab Janitor");
  assert.equal(knock.seats[12]?.isDesk, false);
  assert.equal(knock.seats[12]?.sortOrder, 12);
  assert.equal(knock.seats[12]?.grokTemplateUrl, "https://x.ai/bot/XOYBYmHQrUT_Ux88SS409");
  assert.match(knock.seats[12]?.job ?? "", /leftover junk/);
  assert.equal(knock.seats[13]?.name, "4 Panez");
  assert.equal(knock.seats[13]?.id, "20000000-0000-0000-0000-000000000232");
  assert.equal(knock.seats[25]?.name, "Rosettabot");
  assert.equal(knock.seats[25]?.id, "20000000-0000-0000-0000-000000000244");
  assert.match(knock.routingRule, /Tab Janitor only for shared-browser leftover-tab cleanup/);
  assert.match(knock.routingRule, /4 Panez, KirBot, Rosettabot/);

  const eric = getFallbackPack("ericzakariasson", "eric");
  const ericOsiu = getFallbackPack("ericosiu", "eric-osiu");
  assert.ok(eric);
  assert.ok(ericOsiu);
  assert.notEqual(eric.id, ericOsiu.id);
  assert.equal(eric.slug, "eric");
  assert.equal(ericOsiu.slug, "eric-osiu");
  assert.equal(getFallbackPack("ericosiu", "eric"), null);
  assert.equal(getFallbackPack("ericzakariasson", "eric-osiu"), null);
  assert.match(ericOsiu.readmeMd ?? "", /not Eric Zakariasson's pack/);

  const justinOwens = getFallbackPack("JOwens254", "justin");
  const justinChen = getFallbackPack("TwoBitJustin", "justin-chen");
  assert.ok(justinOwens);
  assert.ok(justinChen);
  assert.notEqual(justinOwens.id, justinChen.id);
  assert.equal(justinOwens.slug, "justin");
  assert.equal(justinChen.slug, "justin-chen");
  assert.equal(justinOwens.seats[0]?.name, "Charge Maestro");
  assert.equal(justinChen.seats[0]?.name, "PickFu Insights");
  assert.equal(getFallbackPack("TwoBitJustin", "justin"), null);
  assert.equal(getFallbackPack("JOwens254", "justin-chen"), null);

  const expected = [
    {
      owner: "Kelseyshuo",
      slug: "kelsey",
      name: "Kelsey",
      desk: "Arnold",
      url: "https://x.ai/bot/ymoMdfvzdErOrclxCOaC_",
      seatId: "20000000-0000-0000-0000-000000000216",
      packId: "10000000-0000-0000-0000-000000000161",
      ownerId: "00000000-0000-0000-0000-000000000153",
      topic: "developer",
      job: /runaway processes/,
      xHandle: "Kelseyshuo",
      ownerName: "Kelsey",
    },
    {
      owner: "marulimoai",
      slug: "marulimo",
      name: "まるぃも",
      desk: "しおり",
      url: "https://x.ai/bot/Mo3ndUm0UJTjTvFbqLFDt",
      seatId: "20000000-0000-0000-0000-000000000217",
      packId: "10000000-0000-0000-0000-000000000162",
      ownerId: "00000000-0000-0000-0000-000000000154",
      topic: "media",
      job: /Does not post or like/,
      xHandle: "marulimoai",
      ownerName: "まるぃも",
    },
    {
      owner: "russbroomell",
      slug: "russ",
      name: "Russ",
      desk: "The Amazing Randibot",
      url: "https://x.ai/bot/pL_NCKfdF5UgZYEo-jMAx",
      seatId: "20000000-0000-0000-0000-000000000218",
      packId: "10000000-0000-0000-0000-000000000163",
      ownerId: "00000000-0000-0000-0000-000000000155",
      topic: "founder",
      job: /James Randi/,
      xHandle: "russbroomell",
      ownerName: "Russ Broomell",
    },
    {
      owner: "ericosiu",
      slug: "eric-osiu",
      name: "Eric Osiu",
      desk: "Revenue Signal Radar",
      url: "https://x.ai/bot/9BnpveyF3fbsRRtolSWpp",
      seatId: "20000000-0000-0000-0000-000000000219",
      packId: "10000000-0000-0000-0000-000000000164",
      ownerId: "00000000-0000-0000-0000-000000000156",
      topic: "founder",
      job: /HubSpot/,
      xHandle: "ericosiu",
      ownerName: "Eric Osiu",
    },
    {
      owner: "tferriere",
      slug: "thomas",
      name: "Thomas",
      desk: "Shotcraft",
      url: "https://x.ai/bot/gdZdBNWdgW45IVVU8sv8F",
      seatId: "20000000-0000-0000-0000-000000000220",
      packId: "10000000-0000-0000-0000-000000000165",
      ownerId: "00000000-0000-0000-0000-000000000157",
      topic: "media",
      job: /Remotion/,
      xHandle: "Tferriere",
      ownerName: "Thomas",
    },
    {
      owner: "TwoBitJustin",
      slug: "justin-chen",
      name: "Justin Chen",
      desk: "PickFu Insights",
      url: "https://x.ai/bot/9EFVmFgQhjYKjMHAhpCWn",
      seatId: "20000000-0000-0000-0000-000000000221",
      packId: "10000000-0000-0000-0000-000000000166",
      ownerId: "00000000-0000-0000-0000-000000000158",
      topic: "founder",
      job: /PickFu/,
      xHandle: "TwoBitJustin",
      ownerName: "Justin Chen",
    },
    {
      owner: "ferminrp",
      slug: "fermin",
      name: "Fermin",
      desk: "Precog wARS",
      url: "https://x.ai/bot/7M8RpppF2AistbVbeEPyN",
      seatId: "20000000-0000-0000-0000-000000000222",
      packId: "10000000-0000-0000-0000-000000000167",
      ownerId: "00000000-0000-0000-0000-000000000159",
      topic: "founder",
      job: /Does not trade/,
      xHandle: "ferminrp",
      ownerName: "Fermin Rodriguez Penelas",
    },
    {
      owner: "4SimonSays",
      slug: "simon",
      name: "Simon",
      desk: "Kinesis Portal Bot",
      url: "https://x.ai/bot/-GgufM3GkZclfn9PuI17_",
      seatId: "20000000-0000-0000-0000-000000000223",
      packId: "10000000-0000-0000-0000-000000000168",
      ownerId: "00000000-0000-0000-0000-000000000160",
      topic: "developer",
      job: /portal\.kinesis\.network/,
      xHandle: "4SimonSays",
      ownerName: "Simon",
    },
    {
      owner: "voeliz",
      slug: "liz",
      name: "Liz",
      desk: "TenderYearsbot",
      url: "https://x.ai/bot/o7VRdRSxHvBEYbzkJQm07",
      seatId: "20000000-0000-0000-0000-000000000224",
      packId: "10000000-0000-0000-0000-000000000169",
      ownerId: "00000000-0000-0000-0000-000000000161",
      topic: "founder",
      job: /Kids-under-5/,
      xHandle: "voeliz",
      ownerName: "Liz Voeller",
    },
  ];

  for (const item of expected) {
    const pack = getFallbackPack(item.owner, item.slug);
    assert.ok(pack, item.slug);
    assert.equal(pack.id, item.packId);
    assert.equal(pack.name, item.name);
    assert.equal(pack.official, false);
    assert.equal(pack.featured, false);
    assert.equal(pack.githubUrl, null);
    assert.deepEqual(pack.topics, [item.topic]);
    assert.equal(pack.likesCount, 0);
    assert.equal(pack.installsCount, 0);
    assert.equal(pack.visitsCount, 0);
    assert.ok(pack.seats.length >= (item.slug === "eric-osiu" ? 2 : 1));
    assert.equal(pack.seats[0]?.name, item.desk);
    assert.equal(pack.seats[0]?.isDesk, true);
    assert.equal(pack.seats[0]?.sortOrder, 0);
    assert.equal(pack.seats[0]?.id, item.seatId);
    assert.equal(pack.seats[0]?.grokTemplateUrl, item.url);
    assert.equal(parseGrokTemplateUrl(pack.seats[0]?.grokTemplateUrl), item.url);
    assert.match(pack.seats[0]?.job ?? "", item.job);
    assert.equal(pack.owner.githubLogin, item.owner);
    assert.equal(pack.owner.name, item.ownerName);
    assert.equal(pack.owner.xHandle, item.xHandle);
    assert.equal(pack.owner.avatarUrl, null);
    assert.match(seedSql, new RegExp(item.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(seedSql, new RegExp(item.packId));
    assert.match(seedSql, new RegExp(item.seatId));
    assert.match(seedSql, new RegExp(item.ownerId));
    assert.equal(listFallbackPacksByOwner(item.owner).length, 1);
    assert.ok(getFallbackProfile(item.owner));
  }

  assert.equal(getFallbackProfile("kelseyshuo"), null);
  assert.equal(getFallbackProfile("twobitjustin"), null);
  assert.equal(getFallbackProfile("4simonsays"), null);
  assert.equal(getFallbackProfile("Tferriere"), null);
  assert.equal(getFallbackPack("examples", "stencil"), null);
  assert.ok(!listFallbackPacks().some((pack) => pack.owner.githubLogin === "examples"));

  const skipped = [
    "https://x.ai/bot/NuOSHSdCZPVkM78K0HkB3",
    "https://x.ai/bot/use-cases",
  ];
  const addedUrls = [
    "https://x.ai/bot/M9c2tC_-mwY8XNTmSbkUY",
    "https://x.ai/bot/yOiPm69HN5FujdkvvysF9",
    "https://x.ai/bot/W0LrVwNwsRHhFY4PG7586",
    "https://x.ai/bot/Ml4ynlD6O1VT5CoYmFnEa",
    "https://x.ai/bot/XOYBYmHQrUT_Ux88SS409",
    ...expected.map((item) => item.url),
  ];
  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url): url is string => Boolean(url));
  const uniqueFallbackUrls = new Set(fallbackUrls);
  assert.equal(fallbackUrls.length, 1339);
  assert.equal(uniqueFallbackUrls.size, 1339);
  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  const seedUrls = new Set(seedUrlMatches);
  for (const url of uniqueFallbackUrls) {
    assert.ok(seedUrls.has(url), `seed missing ${url}`);
  }
  for (const url of skipped) {
    assert.ok(!uniqueFallbackUrls.has(url), `catalog should skip ${url}`);
    assert.ok(!seedSql.includes(url), `seed should skip ${url}`);
  }
  for (const url of addedUrls) {
    assert.equal(
      fallbackUrls.filter((item) => item === url).length,
      1,
      `catalog should include ${url} exactly once`
    );
    assert.equal(
      seedUrlMatches.filter((item) => item === url).length,
      1,
      `seed should include ${url} exactly once`
    );
  }

  assert.match(seedSql, /Kelseyshuo@orgbots\.dev/);
  assert.match(seedSql, /marulimoai@orgbots\.dev/);
  assert.match(seedSql, /russbroomell@orgbots\.dev/);
  assert.match(seedSql, /ericosiu@orgbots\.dev/);
  assert.match(seedSql, /tferriere@orgbots\.dev/);
  assert.match(seedSql, /TwoBitJustin@orgbots\.dev/);
  assert.match(seedSql, /ferminrp@orgbots\.dev/);
  assert.match(seedSql, /4SimonSays@orgbots\.dev/);
  assert.match(seedSql, /voeliz@orgbots\.dev/);
  assert.match(seedSql, /This is not Eric Zakariasson's pack/);
  assert.match(seedSql, /Tab Janitor only for shared-browser leftover-tab cleanup/);
  assert.match(seedSql, /Token Cop only for agent token spend and alerts/);
});

test("catalog adds Sep 4-11 verified x.ai/bot shares with MitchTiler isolated from tylernishida", () => {
  const stats = fallbackStats();
  assert.equal(stats.packs, 844);
  assert.equal(stats.seats, 1339);

  const mitch = getFallbackPack("MitchTiler", "mitch");
  const tyler = getFallbackPack("tylernishida", "tyler");
  assert.ok(mitch);
  assert.ok(tyler);
  assert.equal(mitch.seats[0]?.name, "Chief");
  assert.equal(mitch.seats[0]?.id, "20000000-0000-0000-0000-000000000245");
  assert.equal(mitch.seats[0]?.grokTemplateUrl, "https://x.ai/bot/Q6Owq4QjKJeSyo4FJ8hZW");
  assert.ok(!tyler.seats.some((seat) => seat.grokTemplateUrl === "https://x.ai/bot/Q6Owq4QjKJeSyo4FJ8hZW"));
  assert.equal(getFallbackPack("tylernishida", "mitch"), null);
  assert.equal(getFallbackPack("MitchTiler", "tyler"), null);
  assert.match(mitch.readmeMd ?? "", /Not Tyler Nishida/);
  assert.equal(mitch.official, false);
  assert.equal(mitch.featured, false);

  assert.ok(getFallbackPack("FantomBuildz", "fantom")?.seats.some((seat) => seat.name === "Kindling" && seat.grokTemplateUrl === "https://x.ai/bot/nfX1q6Drs8FTQ0eVezjH_"));
  assert.ok(getFallbackPack("KinGao476942", "kin")?.seats.some((seat) => seat.name === "人生·财务" && seat.grokTemplateUrl === "https://x.ai/bot/haSA0Ru28CYKDm2V5tPRB"));
  assert.ok(getFallbackPack("LeTerryBZH", "thierry")?.seats.some((seat) => seat.name === "My Vote For 2027" && seat.grokTemplateUrl === "https://x.ai/bot/CHmLGnQyx6r8lkb3U8k9x"));
  assert.ok(getFallbackPack("Ortix008", "xo")?.seats.some((seat) => seat.name === "Preach" && seat.grokTemplateUrl === "https://x.ai/bot/ZFj_cKTrMTytrCKM9DFHk"));
  assert.ok(getFallbackPack("jennananpei", "jenna")?.seats.some((seat) => seat.name === "Dan Lanning" && seat.grokTemplateUrl === "https://x.ai/bot/1xyC1R0zvv2vKTQHLzYWS"));

  const davey = getFallbackPack("the_davey", "dave");
  const gambrill = getFallbackPack("gambrill", "dave");
  assert.ok(davey);
  assert.ok(gambrill);
  assert.notEqual(davey.id, gambrill.id);
  assert.equal(davey.seats[0]?.name, "Announcr Voice");
  assert.equal(davey.seats[1]?.name, "LinkedIn Watch");

  const jaime = getFallbackPack("JaimeBubblehead", "jaime");
  assert.ok(jaime);
  assert.equal(jaime.seats.length, 4);
  assert.equal(jaime.seats[0]?.name, "Quency");
  assert.equal(jaime.seats[0]?.isDesk, true);

  const expectedSingles = [
    {
      owner: "MitchTiler",
      slug: "mitch",
      name: "Mitch",
      desk: "Chief",
      url: "https://x.ai/bot/Q6Owq4QjKJeSyo4FJ8hZW",
      seatId: "20000000-0000-0000-0000-000000000245",
      packId: "10000000-0000-0000-0000-000000000170",
      ownerId: "00000000-0000-0000-0000-000000000162",
      topic: "founder",
      xHandle: "MitchTiler",
      ownerName: "Tyler Thompson",
    },
    {
      owner: "Phil_Holland",
      slug: "phil",
      name: "Phil",
      desk: "ASC Skill",
      url: "https://x.ai/bot/1kQ8p3TAKx2FgvYXir2Ta",
      seatId: "20000000-0000-0000-0000-000000000246",
      packId: "10000000-0000-0000-0000-000000000171",
      ownerId: "00000000-0000-0000-0000-000000000163",
      topic: "developer",
      xHandle: "Phil_Holland",
      ownerName: "Phil",
    },
    {
      owner: "BlissNomad",
      slug: "graham",
      name: "Graham",
      desk: "OpenSEO",
      url: "https://x.ai/bot/8yZv2AeUvBcOFoFRVZfhU",
      seatId: "20000000-0000-0000-0000-000000000247",
      packId: "10000000-0000-0000-0000-000000000172",
      ownerId: "00000000-0000-0000-0000-000000000164",
      topic: "media",
      xHandle: "BlissNomad",
      ownerName: "Graham",
    },
    {
      owner: "drbinaryai",
      slug: "deepbits",
      name: "Deepbits",
      desk: "Dr.Binary",
      url: "https://x.ai/bot/Pc2T7udSjGxv9pd9Spkyc",
      seatId: "20000000-0000-0000-0000-000000000248",
      packId: "10000000-0000-0000-0000-000000000173",
      ownerId: "00000000-0000-0000-0000-000000000165",
      topic: "developer",
      xHandle: "drbinaryai",
      ownerName: "Deepbits",
    },
    {
      owner: "realMattAbrams",
      slug: "matt",
      name: "Matt",
      desk: "Usage Bot",
      url: "https://x.ai/bot/ywZrH-Tqld2V87AJJrTNb",
      seatId: "20000000-0000-0000-0000-000000000261",
      packId: "10000000-0000-0000-0000-000000000179",
      ownerId: "00000000-0000-0000-0000-000000000171",
      topic: "founder",
      xHandle: "realMattAbrams",
      ownerName: "Matt",
    },
    {
      owner: "S_Padival",
      slug: "s_padival",
      name: "S Padival",
      desk: "Clickbait skipper",
      url: "https://x.ai/bot/i8WsjKB8KRL-kQ25VPwaB",
      seatId: "20000000-0000-0000-0000-000000000262",
      packId: "10000000-0000-0000-0000-000000000180",
      ownerId: "00000000-0000-0000-0000-000000000172",
      topic: "media",
      xHandle: "S_Padival",
      ownerName: "S Padival",
    },
    {
      owner: "Baconbrix",
      slug: "baconbrix",
      name: "Baconbrix",
      desk: "Apple Dev",
      url: "https://x.ai/bot/VPM4_E2eqx9AJFpTF-_EA",
      seatId: "20000000-0000-0000-0000-000000000263",
      packId: "10000000-0000-0000-0000-000000000181",
      ownerId: "00000000-0000-0000-0000-000000000173",
      topic: "developer",
      xHandle: "Baconbrix",
      ownerName: "Evan",
    },
    {
      owner: "jaharris13",
      slug: "jaharris13",
      name: "JA Harris",
      desk: "Photo Curator",
      url: "https://x.ai/bot/hig9j1KnpZyH6QQN-Af0Z",
      seatId: "20000000-0000-0000-0000-000000000264",
      packId: "10000000-0000-0000-0000-000000000182",
      ownerId: "00000000-0000-0000-0000-000000000174",
      topic: "media",
      xHandle: "jaharris13",
      ownerName: "John",
    },
    {
      owner: "mattyp",
      slug: "mattyp",
      name: "Mattyp",
      desk: "dial bot",
      url: "https://x.ai/bot/NJXi2SWEuhNxjOjspMMPi",
      seatId: "20000000-0000-0000-0000-000000000265",
      packId: "10000000-0000-0000-0000-000000000183",
      ownerId: "00000000-0000-0000-0000-000000000175",
      topic: "founder",
      xHandle: "mattyp",
      ownerName: "Matt",
    },
    {
      owner: "helloitsoctocat",
      slug: "helloitsoctocat",
      name: "Helloitsoctocat",
      desk: "Helloitsoctocat",
      url: "https://x.ai/bot/bJUE6kxTvEJ77R_OVMZTQ",
      seatId: "20000000-0000-0000-0000-000000000266",
      packId: "10000000-0000-0000-0000-000000000184",
      ownerId: "00000000-0000-0000-0000-000000000176",
      topic: "developer",
      xHandle: "helloitsoctocat",
      ownerName: "Gareth",
    },
    {
      owner: "aroogle",
      slug: "aroogle",
      name: "Aroogle",
      desk: "Job applier",
      url: "https://x.ai/bot/gfxH6sM_0QlxeDNFrRmep",
      seatId: "20000000-0000-0000-0000-000000000267",
      packId: "10000000-0000-0000-0000-000000000185",
      ownerId: "00000000-0000-0000-0000-000000000177",
      topic: "founder",
      xHandle: "aroogle",
      ownerName: "Shawn",
    },
    {
      owner: "Jingg_n_Tonic",
      slug: "jingg_n_tonic",
      name: "Jingg n Tonic",
      desk: "AEO Content Producer",
      url: "https://x.ai/bot/WEqsULsog0KJUFUbhIRXH",
      seatId: "20000000-0000-0000-0000-000000000268",
      packId: "10000000-0000-0000-0000-000000000186",
      ownerId: "00000000-0000-0000-0000-000000000178",
      topic: "media",
      xHandle: "Jingg_n_Tonic",
      ownerName: "Jing",
    },
    {
      owner: "RedSpiceX",
      slug: "redspicex",
      name: "RedSpiceX",
      desk: "Showrunner",
      url: "https://x.ai/bot/dLxcnhWxf9JyHIo_l8wJk",
      seatId: "20000000-0000-0000-0000-000000000269",
      packId: "10000000-0000-0000-0000-000000000187",
      ownerId: "00000000-0000-0000-0000-000000000179",
      topic: "media",
      xHandle: "RedSpiceX",
      ownerName: "RedSpiceX",
    },
    {
      owner: "sergical",
      slug: "sergical",
      name: "Sergical",
      desk: "Judd the Bug",
      url: "https://x.ai/bot/JQWyaF4Io7cfOF-4FvMZL",
      seatId: "20000000-0000-0000-0000-000000000270",
      packId: "10000000-0000-0000-0000-000000000188",
      ownerId: "00000000-0000-0000-0000-000000000180",
      topic: "developer",
      xHandle: "sergical",
      ownerName: "Sergiy",
    },
    {
      owner: "omni_puzzler",
      slug: "omni_puzzler",
      name: "OMNI",
      desk: "OMNI Grok-Bot",
      url: "https://x.ai/bot/HAIGA0nUYgv85CtV5SMWa",
      seatId: "20000000-0000-0000-0000-000000000271",
      packId: "10000000-0000-0000-0000-000000000189",
      ownerId: "00000000-0000-0000-0000-000000000181",
      topic: "founder",
      xHandle: "omni_puzzler",
      ownerName: "Tim",
    },
    {
      owner: "michaelheredia",
      slug: "michaelheredia",
      name: "Michael",
      desk: "Colombia Move",
      url: "https://x.ai/bot/mWxeafjXItbC0_VcpSwqm",
      seatId: "20000000-0000-0000-0000-000000000272",
      packId: "10000000-0000-0000-0000-000000000190",
      ownerId: "00000000-0000-0000-0000-000000000182",
      topic: "founder",
      xHandle: "michaelheredia",
      ownerName: "Michael",
    },
    {
      owner: "YanqingCheng",
      slug: "yanqingcheng",
      name: "Yanqing",
      desk: "Executive Coach",
      url: "https://x.ai/bot/fAAHYFBe8xpTkBX1sbGBz",
      seatId: "20000000-0000-0000-0000-000000000273",
      packId: "10000000-0000-0000-0000-000000000191",
      ownerId: "00000000-0000-0000-0000-000000000183",
      topic: "founder",
      xHandle: "YanqingCheng",
      ownerName: "Yanqing",
    },
    {
      owner: "dancingteeth",
      slug: "dancingteeth",
      name: "dancingteeth",
      desk: "Agent Looper",
      url: "https://x.ai/bot/AETdGbRRNWfckrRGv22LD",
      seatId: "20000000-0000-0000-0000-000000000274",
      packId: "10000000-0000-0000-0000-000000000192",
      ownerId: "00000000-0000-0000-0000-000000000184",
      topic: "developer",
      xHandle: "dancingteeth",
      ownerName: "dancingteeth",
    },
    {
      owner: "zilvestro",
      slug: "zilvestro",
      name: "Zilvestro",
      desk: "Backlink Bot",
      url: "https://x.ai/bot/TaCAhCtPGCvObAaK7ZDQQ",
      seatId: "20000000-0000-0000-0000-000000000275",
      packId: "10000000-0000-0000-0000-000000000193",
      ownerId: "00000000-0000-0000-0000-000000000185",
      topic: "media",
      xHandle: "zilvestro",
      ownerName: "Silvestro",
    },
    {
      owner: "BTC_Yogi",
      slug: "btc_yogi",
      name: "BTC Yogi",
      desk: "Ask Better Questions",
      url: "https://x.ai/bot/5hqR_5PVUy7WMbNaXPJ8s",
      seatId: "20000000-0000-0000-0000-000000000276",
      packId: "10000000-0000-0000-0000-000000000194",
      ownerId: "00000000-0000-0000-0000-000000000186",
      topic: "founder",
      xHandle: "BTC_Yogi",
      ownerName: "Joseph",
    },
    {
      owner: "daisuke",
      slug: "daisuke",
      name: "Daisuke",
      desk: "blogdrafter",
      url: "https://x.ai/bot/A6o9Z1NYSIRBX-VIoEcQi",
      seatId: "20000000-0000-0000-0000-000000000277",
      packId: "10000000-0000-0000-0000-000000000195",
      ownerId: "00000000-0000-0000-0000-000000000187",
      topic: "media",
      xHandle: "daisuke",
      ownerName: "dai",
    },
    {
      owner: "sneharavindra",
      slug: "sneharavindra",
      name: "Sneha",
      desk: "Product Builder CoS",
      url: "https://x.ai/bot/6tbtv4Tln4MvKc5duOkle",
      seatId: "20000000-0000-0000-0000-000000000278",
      packId: "10000000-0000-0000-0000-000000000196",
      ownerId: "00000000-0000-0000-0000-000000000188",
      topic: "founder",
      xHandle: "sneharavindra",
      ownerName: "Sneha",
    },
    {
      owner: "littletechbird",
      slug: "littletechbird",
      name: "Little Tech Bird",
      desk: "Hatch",
      url: "https://x.ai/bot/o8hID4-jKPlA8QQQH5K69",
      seatId: "20000000-0000-0000-0000-000000000279",
      packId: "10000000-0000-0000-0000-000000000197",
      ownerId: "00000000-0000-0000-0000-000000000189",
      topic: "developer",
      xHandle: "littletechbird",
      ownerName: "Brent",
    },
    {
      owner: "Samuelflg1",
      slug: "samuelflg1",
      name: "Samuel",
      desk: "Skill Import",
      url: "https://x.ai/bot/NhTYqcIBaPCSZtdTflnqa",
      seatId: "20000000-0000-0000-0000-000000000280",
      packId: "10000000-0000-0000-0000-000000000198",
      ownerId: "00000000-0000-0000-0000-000000000190",
      topic: "developer",
      xHandle: "Samuelflg1",
      ownerName: "Samuel",
    },
    {
      owner: "parkersmith",
      slug: "parkersmith",
      name: "Parker",
      desk: "slack radar",
      url: "https://x.ai/bot/m4WfJ0ODD0O1runkfq0Ak",
      seatId: "20000000-0000-0000-0000-000000000281",
      packId: "10000000-0000-0000-0000-000000000199",
      ownerId: "00000000-0000-0000-0000-000000000191",
      topic: "founder",
      xHandle: "parkersmith",
      ownerName: "Parker",
    },
    {
      owner: "quotewiser",
      slug: "quotewiser",
      name: "Quotewise",
      desk: "Quotewise Daily",
      url: "https://x.ai/bot/kmmBn74qwBr9lgedW4naf",
      seatId: "20000000-0000-0000-0000-000000000282",
      packId: "10000000-0000-0000-0000-000000000200",
      ownerId: "00000000-0000-0000-0000-000000000192",
      topic: "media",
      xHandle: "quotewiser",
      ownerName: "Quotewise",
    },
    {
      owner: "james_ailton",
      slug: "james_ailton",
      name: "James Ailton",
      desk: "Throttle · Token Officer",
      url: "https://x.ai/bot/9-VBOKZkj7_QZoKDuZWIP",
      seatId: "20000000-0000-0000-0000-000000000283",
      packId: "10000000-0000-0000-0000-000000000201",
      ownerId: "00000000-0000-0000-0000-000000000193",
      topic: "developer",
      xHandle: "james_ailton",
      ownerName: "Ailton",
    },
    {
      owner: "irabukht",
      slug: "irabukht",
      name: "Irabukht",
      desk: "Grok for SEO/GEO/ads/Shopify",
      url: "https://x.ai/bot/dep-tU0gmIPgiqNsvS4N4",
      seatId: "20000000-0000-0000-0000-000000000284",
      packId: "10000000-0000-0000-0000-000000000202",
      ownerId: "00000000-0000-0000-0000-000000000194",
      topic: "media",
      xHandle: "irabukht",
      ownerName: "Dmitry",
    },
    {
      owner: "ChiefBeers",
      slug: "chiefbeers",
      name: "ChiefBeers",
      desk: "2A",
      url: "https://x.ai/bot/N9eJfkuupWb3EpWFt76va",
      seatId: "20000000-0000-0000-0000-000000000285",
      packId: "10000000-0000-0000-0000-000000000203",
      ownerId: "00000000-0000-0000-0000-000000000195",
      topic: "founder",
      xHandle: "ChiefBeers",
      ownerName: "Schuyler",
    },
    {
      owner: "nathanglass",
      slug: "nathanglass",
      name: "Nathan",
      desk: "Personal Trainer",
      url: "https://x.ai/bot/t9TIKE_igItEQd6tOyyRd",
      seatId: "20000000-0000-0000-0000-000000000286",
      packId: "10000000-0000-0000-0000-000000000204",
      ownerId: "00000000-0000-0000-0000-000000000196",
      topic: "founder",
      xHandle: "nathanglass",
      ownerName: "Nathan",
    },
    {
      owner: "stevederico",
      slug: "stevederico",
      name: "Steve",
      desk: "App Store Review Bot",
      url: "https://x.ai/bot/KzBEylM_3NFTjATszLICV",
      seatId: "20000000-0000-0000-0000-000000000287",
      packId: "10000000-0000-0000-0000-000000000205",
      ownerId: "00000000-0000-0000-0000-000000000197",
      topic: "developer",
      xHandle: "stevederico",
      ownerName: "Steve",
    },
    {
      owner: "tobiasztop",
      slug: "tobiasztop",
      name: "Tobi",
      desk: "Webhook Guide",
      url: "https://x.ai/bot/Q__pHX8RB4jsF5U3JtC66",
      seatId: "20000000-0000-0000-0000-000000000288",
      packId: "10000000-0000-0000-0000-000000000206",
      ownerId: "00000000-0000-0000-0000-000000000198",
      topic: "developer",
      xHandle: "tobiasztop",
      ownerName: "Tobi",
    },
    {
      owner: "mdashjames",
      slug: "mdashjames",
      name: "James",
      desk: "Security Bot",
      url: "https://x.ai/bot/Ci1UvQUguruSmxhiGmMI6",
      seatId: "20000000-0000-0000-0000-000000000289",
      packId: "10000000-0000-0000-0000-000000000207",
      ownerId: "00000000-0000-0000-0000-000000000199",
      topic: "developer",
      xHandle: "mdashjames",
      ownerName: "James",
    },
    {
      owner: "rmarwah",
      slug: "rmarwah",
      name: "Rajit",
      desk: "InsiderMillions",
      url: "https://x.ai/bot/yaix3I-36pEloG1XpLVOb",
      seatId: "20000000-0000-0000-0000-000000000290",
      packId: "10000000-0000-0000-0000-000000000208",
      ownerId: "00000000-0000-0000-0000-000000000200",
      topic: "founder",
      xHandle: "rmarwah",
      ownerName: "Rajit",
    },
    {
      owner: "AetaneoRizal",
      slug: "aetaneorizal",
      name: "Rizal",
      desk: "RIZALBOT",
      url: "https://x.ai/bot/Af9XNmozBcRoZM85eylOW",
      seatId: "20000000-0000-0000-0000-000000000291",
      packId: "10000000-0000-0000-0000-000000000209",
      ownerId: "00000000-0000-0000-0000-000000000201",
      topic: "founder",
      xHandle: "AetaneoRizal",
      ownerName: "Rizal",
    },
    {
      owner: "MapachesAlexis",
      slug: "mapachesalexis",
      name: "Alexis",
      desk: "Windows Disk Cleaner",
      url: "https://x.ai/bot/Z0WBoK2sucsOAqAXRpRb8",
      seatId: "20000000-0000-0000-0000-000000000292",
      packId: "10000000-0000-0000-0000-000000000210",
      ownerId: "00000000-0000-0000-0000-000000000202",
      topic: "developer",
      xHandle: "MapachesAlexis",
      ownerName: "Alexis",
    },
    {
      owner: "Fermion_Boson17",
      slug: "fermion_boson17",
      name: "Fermion Boson",
      desk: "真Deviフレーム Type2トライアル",
      url: "https://x.ai/bot/aeE3iKjj5xfDmx_dolbll",
      seatId: "20000000-0000-0000-0000-000000000293",
      packId: "10000000-0000-0000-0000-000000000211",
      ownerId: "00000000-0000-0000-0000-000000000203",
      topic: "founder",
      xHandle: "Fermion_Boson17",
      ownerName: "星宮",
    },
    {
      owner: "x_stone_island",
      slug: "x_stone_island",
      name: "Stone Island",
      desk: "ボット整備",
      url: "https://x.ai/bot/BlTqnV5o9E35Dwo2sodyD",
      seatId: "20000000-0000-0000-0000-000000000294",
      packId: "10000000-0000-0000-0000-000000000212",
      ownerId: "00000000-0000-0000-0000-000000000204",
      topic: "developer",
      xHandle: "x_stone_island",
      ownerName: "翔",
    },
    {
      owner: "JeffreyLind",
      slug: "jeffrey",
      name: "Jeffrey",
      desk: "Billionairebot",
      url: "https://x.ai/bot/jq-BFHkNoiJEtieswOYTc",
      seatId: "20000000-0000-0000-0000-000000000295",
      packId: "10000000-0000-0000-0000-000000000213",
      ownerId: "00000000-0000-0000-0000-000000000205",
      topic: "founder",
      xHandle: "JeffreyLind",
      ownerName: "Jeffrey Lind",
    },
    {
      owner: "Skyler_Miller56",
      slug: "skyler",
      name: "Skyler",
      desk: "Albert",
      url: "https://x.ai/bot/jtFHKaEKzEZ0zSDVCl6BP",
      seatId: "20000000-0000-0000-0000-000000000296",
      packId: "10000000-0000-0000-0000-000000000214",
      ownerId: "00000000-0000-0000-0000-000000000206",
      topic: "founder",
      xHandle: "Skyler_Miller56",
      ownerName: "Skyler",
    },
    {
      owner: "TOATspace",
      slug: "toatspace",
      name: "TOATspace",
      desk: "Optima",
      url: "https://x.ai/bot/-E8sQr0Yrd_oSQlTaAzWy",
      seatId: "20000000-0000-0000-0000-000000000297",
      packId: "10000000-0000-0000-0000-000000000215",
      ownerId: "00000000-0000-0000-0000-000000000207",
      topic: "developer",
      xHandle: "TOATspace",
      ownerName: "TOATspace",
    },
    {
      owner: "0xashrk",
      slug: "ash",
      name: "Ash",
      desk: "Fed + X Brief",
      url: "https://x.ai/bot/ojDgaVLzjbxpPV74VzQrM",
      seatId: "20000000-0000-0000-0000-000000000298",
      packId: "10000000-0000-0000-0000-000000000216",
      ownerId: "00000000-0000-0000-0000-000000000208",
      topic: "founder",
      xHandle: "0xashrk",
      ownerName: "Ash",
    },
  ] as const;
  for (const item of expectedSingles) {
    const pack = getFallbackPack(item.owner, item.slug);
    assert.ok(pack, `${item.owner}/${item.slug}`);
    assert.equal(pack.id, item.packId);
    assert.equal(pack.name, item.name);
    assert.equal(pack.official, false);
    assert.equal(pack.featured, false);
    assert.deepEqual(pack.topics, [item.topic]);
    assert.ok(
      pack.seats.length >=
        (item.slug === "nathanglass" ||
        item.slug === "ash" ||
        item.slug === "mattyp" ||
        item.slug === "parkersmith" ||
        item.slug === "baconbrix" ||
        item.slug === "eric-osiu"
          ? 2
          : 1)
    );
    assert.equal(pack.seats[0]?.name, item.desk);
    assert.equal(pack.seats[0]?.isDesk, true);
    assert.equal(pack.seats[0]?.id, item.seatId);
    assert.equal(pack.seats[0]?.grokTemplateUrl, item.url);
    assert.equal(pack.owner.name, item.ownerName);
    assert.equal(pack.owner.xHandle, item.xHandle);
    assert.match(seedSql, new RegExp(item.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(seedSql, new RegExp(item.packId));
    assert.match(seedSql, new RegExp(item.seatId));
    assert.match(seedSql, new RegExp(item.ownerId));
  }

  assert.ok(getFallbackPack("Phil_Holland", "phil"));
  assert.match(seedSql, /Phil_Holland@orgbots\.dev/);
  assert.ok(getFallbackPack("BlissNomad", "graham"));
  assert.match(seedSql, /BlissNomad@orgbots\.dev/);
  assert.ok(getFallbackPack("drbinaryai", "deepbits"));
  assert.match(seedSql, /drbinaryai@orgbots\.dev/);
  assert.ok(getFallbackPack("compileinstyle", "neessam"));
  assert.match(seedSql, /compileinstyle@orgbots\.dev/);
  assert.ok(getFallbackPack("AdventureNLearn", "adventure"));
  assert.match(seedSql, /AdventureNLearn@orgbots\.dev/);
  assert.ok(getFallbackPack("BBBang9900", "bbbang"));
  assert.match(seedSql, /BBBang9900@orgbots\.dev/);
  assert.ok(getFallbackPack("JaimeBubblehead", "jaime"));
  assert.match(seedSql, /JaimeBubblehead@orgbots\.dev/);
  assert.ok(getFallbackPack("the_davey", "dave"));
  assert.match(seedSql, /the_davey@orgbots\.dev/);
  assert.match(seedSql, /MitchTiler@orgbots\.dev/);
  assert.match(seedSql, /Not Tyler Nishida/);
  assert.equal(getFallbackPack("examples", "stencil"), null);
});

test("catalog adds Ash Fed+X Brief and updates TOATspace Optima desk URL", () => {
  const stats = fallbackStats();
  assert.equal(stats.packs, 844);
  assert.equal(stats.seats, 1339);

  const jeffrey = getFallbackPack("JeffreyLind", "jeffrey");
  assert.ok(jeffrey);
  assert.equal(jeffrey.id, "10000000-0000-0000-0000-000000000213");
  assert.equal(jeffrey.official, false);
  assert.equal(jeffrey.featured, false);
  assert.deepEqual(jeffrey.topics, ["founder"]);
  assert.equal(jeffrey.seats.length, 1);
  assert.equal(jeffrey.seats[0]?.name, "Billionairebot");
  assert.equal(jeffrey.seats[0]?.isDesk, true);
  assert.equal(jeffrey.seats[0]?.id, "20000000-0000-0000-0000-000000000295");
  assert.equal(jeffrey.seats[0]?.grokTemplateUrl, "https://x.ai/bot/jq-BFHkNoiJEtieswOYTc");
  assert.match(jeffrey.seats[0]?.job ?? "", /billionaire way/);
  assert.match(jeffrey.routingRule, /Billionairebot/);
  assert.equal(jeffrey.owner.githubLogin, "JeffreyLind");
  assert.equal(jeffrey.owner.xHandle, "JeffreyLind");
  assert.equal(jeffrey.owner.avatarUrl, "https://avatars.githubusercontent.com/u/64284423?v=4");
  assert.equal(listFallbackPacksByOwner("JeffreyLind").length, 1);

  const skyler = getFallbackPack("Skyler_Miller56", "skyler");
  assert.ok(skyler);
  assert.equal(skyler.id, "10000000-0000-0000-0000-000000000214");
  assert.equal(skyler.official, false);
  assert.equal(skyler.featured, false);
  assert.deepEqual(skyler.topics, ["founder"]);
  assert.equal(skyler.seats.length, 1);
  assert.equal(skyler.seats[0]?.name, "Albert");
  assert.equal(skyler.seats[0]?.isDesk, true);
  assert.equal(skyler.seats[0]?.id, "20000000-0000-0000-0000-000000000296");
  assert.equal(skyler.seats[0]?.grokTemplateUrl, "https://x.ai/bot/jtFHKaEKzEZ0zSDVCl6BP");
  assert.match(skyler.seats[0]?.job ?? "", /collective bargaining/);
  assert.match(skyler.routingRule, /Albert/);
  assert.equal(skyler.owner.githubLogin, "Skyler_Miller56");
  assert.equal(skyler.owner.xHandle, "Skyler_Miller56");
  assert.equal(skyler.owner.avatarUrl, null);
  assert.equal(listFallbackPacksByOwner("Skyler_Miller56").length, 1);

  const toat = getFallbackPack("TOATspace", "toatspace");
  assert.ok(toat);
  assert.equal(toat.id, "10000000-0000-0000-0000-000000000215");
  assert.equal(toat.official, false);
  assert.equal(toat.featured, false);
  assert.deepEqual(toat.topics, ["developer"]);
  assert.equal(toat.seats.length, 1);
  assert.equal(toat.seats[0]?.name, "Optima");
  assert.equal(toat.seats[0]?.isDesk, true);
  assert.equal(toat.seats[0]?.id, "20000000-0000-0000-0000-000000000297");
  assert.equal(toat.seats[0]?.grokTemplateUrl, "https://x.ai/bot/-E8sQr0Yrd_oSQlTaAzWy");
  assert.match(toat.seats[0]?.job ?? "", /cut list/);
  assert.match(toat.routingRule, /Optima/);
  assert.match(toat.readmeMd ?? "", /by gemini/);
  assert.match(toat.readmeMd ?? "", /ppARM1W-tWcae_wryLH1z/);
  assert.equal(toat.owner.githubLogin, "TOATspace");
  assert.equal(toat.owner.xHandle, "TOATspace");
  assert.equal(listFallbackPacksByOwner("TOATspace").length, 1);

  const ash = getFallbackPack("0xashrk", "ash");
  assert.ok(ash);
  assert.equal(ash.id, "10000000-0000-0000-0000-000000000216");
  assert.equal(ash.official, false);
  assert.equal(ash.featured, false);
  assert.deepEqual(ash.topics, ["founder"]);
  assert.equal(ash.seats.length, 2);
  assert.equal(ash.seats[0]?.name, "Fed + X Brief");
  assert.equal(ash.seats[0]?.isDesk, true);
  assert.equal(ash.seats[0]?.id, "20000000-0000-0000-0000-000000000298");
  assert.equal(ash.seats[0]?.grokTemplateUrl, "https://x.ai/bot/ojDgaVLzjbxpPV74VzQrM");
  assert.match(ash.seats[0]?.job ?? "", /Polymarket FOMC/);
  assert.equal(ash.seats[1]?.name, "Flat hunter");
  assert.equal(ash.seats[1]?.isDesk, false);
  assert.equal(ash.seats[1]?.sortOrder, 1);
  assert.equal(ash.seats[1]?.id, "20000000-0000-0000-0000-000000000378");
  assert.equal(ash.seats[1]?.grokTemplateUrl, "https://x.ai/bot/amNEjElPIlHuan3BCbOT2");
  assert.match(ash.routingRule, /Fed \+ X Brief/);
  assert.match(ash.routingRule, /Flat hunter only for London rental hunting/);
  assert.equal(ash.owner.githubLogin, "0xashrk");
  assert.equal(ash.owner.name, "Ash");
  assert.equal(ash.owner.xHandle, "0xashrk");
  assert.equal(ash.owner.avatarUrl, "https://avatars.githubusercontent.com/u/119333123?v=4");
  assert.equal(listFallbackPacksByOwner("0xashrk").length, 1);

  const skipped = [
    "https://x.ai/bot/1xAJYJPes3X7dUM2mk9Di",
    "https://x.ai/bot/AMFF7LG8gxX1bLIH-_D3A",
    "https://x.ai/bot/DyKsq0BuAq-c-N0mkqh7U",
    "https://x.ai/bot/_jOdbfkB16zxu7MRcmReE",
    "https://x.ai/bot/tIas6udS9kSXpcAz6LFd1",
    "https://x.ai/bot/nSzhldgXfVuC93CjjQptM",
    "https://x.ai/bot/ppARM1W-tWcae_wryLH1z",
  ];
  const addedUrls = [
    "https://x.ai/bot/jq-BFHkNoiJEtieswOYTc",
    "https://x.ai/bot/jtFHKaEKzEZ0zSDVCl6BP",
    "https://x.ai/bot/-E8sQr0Yrd_oSQlTaAzWy",
    "https://x.ai/bot/ojDgaVLzjbxpPV74VzQrM",
  ];
  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url): url is string => Boolean(url));
  const uniqueFallbackUrls = new Set(fallbackUrls);
  assert.equal(fallbackUrls.length, 1339);
  assert.equal(uniqueFallbackUrls.size, 1339);
  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  for (const url of skipped) {
    assert.ok(!uniqueFallbackUrls.has(url), `catalog should skip ${url}`);
    assert.ok(!seedSql.includes(url), `seed should skip ${url}`);
  }
  for (const url of addedUrls) {
    assert.equal(
      fallbackUrls.filter((item) => item === url).length,
      1,
      `catalog should include ${url} exactly once`
    );
    assert.equal(
      seedUrlMatches.filter((item) => item === url).length,
      1,
      `seed should include ${url} exactly once`
    );
  }

  assert.match(seedSql, /JeffreyLind@orgbots\.dev/);
  assert.match(seedSql, /Skyler_Miller56@orgbots\.dev/);
  assert.match(seedSql, /TOATspace@orgbots\.dev/);
  assert.match(seedSql, /0xashrk@orgbots\.dev/);
  assert.equal(getFallbackPack("examples", "stencil"), null);
  assert.ok(
    getFallbackPack("poteto", "lauren")?.seats.some(
      (seat) => seat.grokTemplateUrl === "https://x.ai/bot/93gOz3op1UQdBdbekQFLK"
    )
  );
  assert.ok(
    listFallbackPacks().some((pack) =>
      (getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? []).some(
        (seat) => seat.grokTemplateUrl === "https://x.ai/bot/NJXi2SWEuhNxjOjspMMPi"
      )
    )
  );
});

test("catalog adds Knock BeneBot and 11 Sep 12 morning hunt packs", () => {
  const stats = fallbackStats();
  assert.equal(stats.packs, 844);
  assert.equal(stats.seats, 1339);

  const knock = getFallbackPack("suddenlyjon", "knock");
  assert.ok(knock);
  assert.equal(knock.seats.length, 44);
  assert.equal(knock.seats[25]?.name, "Rosettabot");
  assert.equal(knock.seats[26]?.name, "BeneBot");
  assert.equal(knock.seats[26]?.id, "20000000-0000-0000-0000-000000000299");
  assert.equal(knock.seats[26]?.isDesk, false);
  assert.equal(knock.seats[26]?.sortOrder, 26);
  assert.equal(knock.seats[26]?.grokTemplateUrl, "https://x.ai/bot/yu_bkwUfpHdqhF2Q1VhWn");
  assert.match(knock.seats[26]?.job ?? "", /Benefits navigator/);
  assert.match(knock.routingRule, /BeneBot only for benefits navigation and in-network booking/);
  assert.match(knock.readmeMd ?? "", /BeneBot is benefits navigation/);

  const ash0x = getFallbackPack("0xashrk", "ash");
  const ashvinn = getFallbackPack("ashvinn", "ashvinn");
  assert.ok(ash0x);
  assert.ok(ashvinn);
  assert.notEqual(ash0x.id, ashvinn.id);
  assert.equal(ash0x.owner.githubLogin, "0xashrk");
  assert.equal(ashvinn.owner.githubLogin, "ashvinn");
  assert.equal(getFallbackPack("0xashrk", "ashvinn"), null);
  assert.equal(getFallbackPack("ashvinn", "ash"), null);
  assert.match(ashvinn.readmeMd ?? "", /Not the Ash \(@0xashrk\) pack/);

  const genaro = getFallbackPack("gezeeq", "genaro");
  const tomas = getFallbackPack("tomidelu_", "tomas");
  assert.ok(genaro);
  assert.ok(tomas);
  assert.equal(genaro.seats.length, 1);
  assert.equal(genaro.seats[0]?.name, "Forja");
  assert.ok(!genaro.seats.some((seat) => seat.name === "Creador de facturas ARCA"));
  assert.equal(tomas.seats[0]?.name, "Creador de facturas ARCA");
  assert.equal(tomas.seats[0]?.grokTemplateUrl, "https://x.ai/bot/gcOAZlqYmTRNgGT_2I9oo");
  assert.match(genaro.readmeMd ?? "", /Do not add Creador de facturas ARCA/);

  const expected = [
    {
      owner: "madmenai",
      slug: "althetime",
      name: "althetime",
      desk: "DenTrade",
      url: "https://x.ai/bot/XayB4rqAREYwJcPmKwtSP",
      seatId: "20000000-0000-0000-0000-000000000300",
      packId: "10000000-0000-0000-0000-000000000217",
      ownerId: "00000000-0000-0000-0000-000000000209",
      topic: "founder",
      xHandle: "madmenai",
      seats: 1,
    },
    {
      owner: "sethsaler",
      slug: "seth",
      name: "Seth",
      desk: "Cleaner",
      url: "https://x.ai/bot/OMPT37PUKmoL8MY11oDLP",
      seatId: "20000000-0000-0000-0000-000000000301",
      packId: "10000000-0000-0000-0000-000000000218",
      ownerId: "00000000-0000-0000-0000-000000000210",
      topic: "founder",
      xHandle: "sethsaler",
      seats: 1,
    },
    {
      owner: "occupymars___",
      slug: "jason",
      name: "Jason",
      desk: "Researcher",
      url: "https://x.ai/bot/cMNbUq3j5RsHg9mcPxtjM",
      seatId: "20000000-0000-0000-0000-000000000302",
      packId: "10000000-0000-0000-0000-000000000219",
      ownerId: "00000000-0000-0000-0000-000000000211",
      topic: "founder",
      xHandle: "occupymars___",
      seats: 3,
    },
    {
      owner: "ShehjadTaus",
      slug: "taus",
      name: "Taus",
      desk: "Lookalike Scout",
      url: "https://x.ai/bot/mfaurGq6eY9rIvIpMfUFI",
      seatId: "20000000-0000-0000-0000-000000000305",
      packId: "10000000-0000-0000-0000-000000000220",
      ownerId: "00000000-0000-0000-0000-000000000212",
      topic: "founder",
      xHandle: "ShehjadTaus",
      seats: 5,
    },
    {
      owner: "gezeeq",
      slug: "genaro",
      name: "Genaro",
      desk: "Forja",
      url: "https://x.ai/bot/me3Is7BBsCTobsgznOSps",
      seatId: "20000000-0000-0000-0000-000000000310",
      packId: "10000000-0000-0000-0000-000000000221",
      ownerId: "00000000-0000-0000-0000-000000000213",
      topic: "founder",
      xHandle: "gezeeq",
      seats: 1,
    },
    {
      owner: "ashvinn",
      slug: "ashvinn",
      name: "Ash",
      desk: "Design PM",
      url: "https://x.ai/bot/Q6JhV9jLLQtX6r7bRTCG_",
      seatId: "20000000-0000-0000-0000-000000000311",
      packId: "10000000-0000-0000-0000-000000000222",
      ownerId: "00000000-0000-0000-0000-000000000214",
      topic: "developer",
      xHandle: "ashvinn",
      seats: 2,
    },
    {
      owner: "tomidelu_",
      slug: "tomas",
      name: "Tomás",
      desk: "Creador de facturas ARCA",
      url: "https://x.ai/bot/gcOAZlqYmTRNgGT_2I9oo",
      seatId: "20000000-0000-0000-0000-000000000313",
      packId: "10000000-0000-0000-0000-000000000223",
      ownerId: "00000000-0000-0000-0000-000000000215",
      topic: "founder",
      xHandle: "tomidelu_",
      seats: 1,
    },
    {
      owner: "Carbonthecoder",
      slug: "carbon",
      name: "Carbon",
      desk: "Newspaper",
      url: "https://x.ai/bot/FbHjOvOfZSxht0JmBYIlj",
      seatId: "20000000-0000-0000-0000-000000000314",
      packId: "10000000-0000-0000-0000-000000000224",
      ownerId: "00000000-0000-0000-0000-000000000216",
      topic: "founder",
      xHandle: "Carbonthecoder",
      seats: 1,
    },
    {
      owner: "imohitmayank",
      slug: "mohit",
      name: "Mohit",
      desk: "Memory",
      url: "https://x.ai/bot/6KkkrATfxZYDFKOFVZzzh",
      seatId: "20000000-0000-0000-0000-000000000315",
      packId: "10000000-0000-0000-0000-000000000225",
      ownerId: "00000000-0000-0000-0000-000000000217",
      topic: "founder",
      xHandle: "imohitmayank",
      seats: 1,
    },
    {
      owner: "Valstry",
      slug: "valstry",
      name: "valstry",
      desk: "基础设施和api接入",
      url: "https://x.ai/bot/PqgO8EMZjN_SUdcvEmsRF",
      seatId: "20000000-0000-0000-0000-000000000316",
      packId: "10000000-0000-0000-0000-000000000226",
      ownerId: "00000000-0000-0000-0000-000000000218",
      topic: "developer",
      xHandle: "Valstry",
      seats: 1,
    },
    {
      owner: "GabrieleMonni",
      slug: "gabriele",
      name: "Gabriele",
      desk: "ButterBot",
      url: "https://x.ai/bot/h1tW8jfXzQIraT-_jNDjJ",
      seatId: "20000000-0000-0000-0000-000000000317",
      packId: "10000000-0000-0000-0000-000000000227",
      ownerId: "00000000-0000-0000-0000-000000000219",
      topic: "founder",
      xHandle: "GabrieleMonni",
      seats: 1,
    },
  ];

  for (const item of expected) {
    const pack = getFallbackPack(item.owner, item.slug);
    assert.ok(pack, item.slug);
    assert.equal(pack.id, item.packId);
    assert.equal(pack.name, item.name);
    assert.equal(pack.official, false);
    assert.equal(pack.featured, false);
    assert.deepEqual(pack.topics, [item.topic]);
    assert.equal(pack.owner.id, item.ownerId);
    assert.equal(pack.owner.githubLogin, item.owner);
    assert.equal(pack.owner.xHandle, item.xHandle);
    assert.ok(pack.seats.length >= item.seats);
    assert.equal(pack.seats[0]?.name, item.desk);
    assert.equal(pack.seats[0]?.isDesk, true);
    assert.equal(pack.seats[0]?.id, item.seatId);
    assert.equal(pack.seats[0]?.grokTemplateUrl, item.url);
    assert.match(pack.routingRule, new RegExp(item.desk.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.equal(listFallbackPacksByOwner(item.owner).length, 1);
  }

  const jason = getFallbackPack("occupymars___", "jason");
  assert.ok(jason);
  assert.equal(jason.seats[1]?.name, "Stack Huddle");
  assert.equal(jason.seats[1]?.grokTemplateUrl, "https://x.ai/bot/lGgfUTg6izL3TDzkgw6aE");
  assert.equal(jason.seats[2]?.name, "OWP Taste");
  assert.equal(jason.seats[2]?.grokTemplateUrl, "https://x.ai/bot/TLYxh30jTi5DM3z-zvC0S");
  assert.match(jason.routingRule, /Stack Huddle only for after-huddle LEARN drafts/);
  assert.match(jason.routingRule, /OWP Taste only for KEEP\/HOLD\/BIN/);

  const taus = getFallbackPack("ShehjadTaus", "taus");
  assert.ok(taus);
  assert.deepEqual(
    taus.seats.map((seat) => seat.name),
    [
      "Lookalike Scout",
      "Rival Watch Desk",
      "SERP Watch Team",
      "Creator Shortlist Crew",
      "ICP Map Coach",
    ]
  );
  assert.equal(taus.seats[4]?.grokTemplateUrl, "https://x.ai/bot/yrm2MJ2nInUhoneTBSwJF");

  const ashvinnPack = getFallbackPack("ashvinn", "ashvinn");
  assert.ok(ashvinnPack);
  assert.equal(ashvinnPack.seats[1]?.name, "Document PM");
  assert.equal(ashvinnPack.seats[1]?.grokTemplateUrl, "https://x.ai/bot/xheAbAQYQT4esSGc8B3xX");
  assert.match(ashvinnPack.routingRule, /Document PM only for Discover–Define–Design–Document/);

  const skipped = [
    "https://x.ai/bot/AMFF7LG8gxX1bLIH-_D3A",
    "https://x.ai/bot/hEmSUvWxccmfAVDGri1R8",
  ];
  const addedUrls = [
    "https://x.ai/bot/yu_bkwUfpHdqhF2Q1VhWn",
    "https://x.ai/bot/XayB4rqAREYwJcPmKwtSP",
    "https://x.ai/bot/OMPT37PUKmoL8MY11oDLP",
    "https://x.ai/bot/cMNbUq3j5RsHg9mcPxtjM",
    "https://x.ai/bot/lGgfUTg6izL3TDzkgw6aE",
    "https://x.ai/bot/TLYxh30jTi5DM3z-zvC0S",
    "https://x.ai/bot/mfaurGq6eY9rIvIpMfUFI",
    "https://x.ai/bot/WKRY_T1y-KOmOn2q5vpRW",
    "https://x.ai/bot/iN9VkE6H4f4CLidzMaNaZ",
    "https://x.ai/bot/6IU2bm7uuSPk6ETC-gC4D",
    "https://x.ai/bot/yrm2MJ2nInUhoneTBSwJF",
    "https://x.ai/bot/me3Is7BBsCTobsgznOSps",
    "https://x.ai/bot/Q6JhV9jLLQtX6r7bRTCG_",
    "https://x.ai/bot/xheAbAQYQT4esSGc8B3xX",
    "https://x.ai/bot/gcOAZlqYmTRNgGT_2I9oo",
    "https://x.ai/bot/FbHjOvOfZSxht0JmBYIlj",
    "https://x.ai/bot/6KkkrATfxZYDFKOFVZzzh",
    "https://x.ai/bot/PqgO8EMZjN_SUdcvEmsRF",
    "https://x.ai/bot/h1tW8jfXzQIraT-_jNDjJ",
  ];
  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url): url is string => Boolean(url));
  const uniqueFallbackUrls = new Set(fallbackUrls);
  assert.equal(fallbackUrls.length, 1339);
  assert.equal(uniqueFallbackUrls.size, 1339);
  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  for (const url of skipped) {
    assert.ok(!uniqueFallbackUrls.has(url), `catalog should skip ${url}`);
    assert.ok(!seedSql.includes(url), `seed should skip ${url}`);
  }
  for (const url of addedUrls) {
    assert.equal(
      fallbackUrls.filter((item) => item === url).length,
      1,
      `catalog should include ${url} exactly once`
    );
    assert.equal(
      seedUrlMatches.filter((item) => item === url).length,
      1,
      `seed should include ${url} exactly once`
    );
  }

  assert.match(seedSql, /madmenai@orgbots\.dev/);
  assert.match(seedSql, /sethsaler@orgbots\.dev/);
  assert.match(seedSql, /occupymars___@orgbots\.dev/);
  assert.match(seedSql, /ShehjadTaus@orgbots\.dev/);
  assert.match(seedSql, /gezeeq@orgbots\.dev/);
  assert.match(seedSql, /ashvinn@orgbots\.dev/);
  assert.match(seedSql, /tomidelu_@orgbots\.dev/);
  assert.match(seedSql, /Carbonthecoder@orgbots\.dev/);
  assert.match(seedSql, /imohitmayank@orgbots\.dev/);
  assert.match(seedSql, /Valstry@orgbots\.dev/);
  assert.match(seedSql, /GabrieleMonni@orgbots\.dev/);
  assert.match(seedSql, /BeneBot only for benefits navigation and in-network booking/);
  assert.equal(getFallbackPack("examples", "stencil"), null);
});

test("catalog adds Victoria + Sift + GSAP + Receipt Digester (Sep 12 noon)", () => {
  const stats = fallbackStats();
  assert.equal(stats.packs, 844);
  assert.equal(stats.seats, 1339);

  const amakelkyAaron = getFallbackPack("a-makelky", "aaron");
  const aaronInfinitea = getFallbackPack("AaronInfinitea", "aaron");
  assert.ok(amakelkyAaron);
  assert.ok(aaronInfinitea);
  assert.notEqual(amakelkyAaron.id, aaronInfinitea.id);
  assert.match(aaronInfinitea.readmeMd ?? "", /Not the Aaron \(@a-makelky\) pack/);

  const expected = [
    {
      owner: "AaronInfinitea",
      slug: "aaron",
      name: "Aaron",
      desk: "Victoria",
      url: "https://x.ai/bot/j1-ISFFzWDSzihs9xz2MA",
      seatId: "20000000-0000-0000-0000-000000000318",
      packId: "10000000-0000-0000-0000-000000000228",
      ownerId: "00000000-0000-0000-0000-000000000220",
      topic: "founder",
      xHandle: "AaronInfinitea",
      seats: 1,
    },
    {
      owner: "TexasBasedGpa",
      slug: "texas",
      name: "Texas",
      desk: "Sift",
      url: "https://x.ai/bot/9xNbMqiBC9gWhTwrh7S80",
      seatId: "20000000-0000-0000-0000-000000000319",
      packId: "10000000-0000-0000-0000-000000000229",
      ownerId: "00000000-0000-0000-0000-000000000221",
      topic: "founder",
      xHandle: "TexasBasedGpa",
      seats: 1,
    },
    {
      owner: "mrflmnlNFT",
      slug: "mrflmnl",
      name: "mrflmnl",
      desk: "GSAP",
      url: "https://x.ai/bot/reahN5D6W2dIiCKd4MuF7",
      seatId: "20000000-0000-0000-0000-000000000320",
      packId: "10000000-0000-0000-0000-000000000230",
      ownerId: "00000000-0000-0000-0000-000000000222",
      topic: "developer",
      xHandle: "mrflmnlNFT",
      seats: 1,
    },
    {
      owner: "BkashJosi",
      slug: "bkash",
      name: "B",
      desk: "Receipt Digester",
      url: "https://x.ai/bot/YgI9ZyckEeovP7nP917xR",
      seatId: "20000000-0000-0000-0000-000000000321",
      packId: "10000000-0000-0000-0000-000000000231",
      ownerId: "00000000-0000-0000-0000-000000000223",
      topic: "founder",
      xHandle: "BkashJosi",
      seats: 1,
    },
  ];

  for (const item of expected) {
    const pack = getFallbackPack(item.owner, item.slug);
    assert.ok(pack, item.slug);
    assert.equal(pack.id, item.packId);
    assert.equal(pack.name, item.name);
    assert.equal(pack.official, false);
    assert.equal(pack.featured, false);
    assert.deepEqual(pack.topics, [item.topic]);
    assert.equal(pack.owner.id, item.ownerId);
    assert.equal(pack.owner.githubLogin, item.owner);
    assert.equal(pack.owner.xHandle, item.xHandle);
    assert.ok(pack.seats.length >= item.seats);
    assert.equal(pack.seats[0]?.name, item.desk);
    assert.equal(pack.seats[0]?.isDesk, true);
    assert.equal(pack.seats[0]?.id, item.seatId);
    assert.equal(pack.seats[0]?.grokTemplateUrl, item.url);
    assert.match(pack.routingRule, new RegExp(item.desk.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.equal(listFallbackPacksByOwner(item.owner).length, 1);
  }

  const skipped = [
    "https://x.ai/bot/_jOdbfkB16zxu7MRcmReE",
    "https://x.ai/bot/hEmSUvWxccmfAVDGri1R8",
  ];
  const addedUrls = expected.map((item) => item.url);
  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url): url is string => Boolean(url));
  const uniqueFallbackUrls = new Set(fallbackUrls);
  assert.equal(fallbackUrls.length, 1339);
  assert.equal(uniqueFallbackUrls.size, 1339);
  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  for (const url of skipped) {
    assert.ok(!uniqueFallbackUrls.has(url), `catalog should skip ${url}`);
    assert.ok(!seedSql.includes(url), `seed should skip ${url}`);
  }
  for (const url of addedUrls) {
    assert.equal(
      fallbackUrls.filter((item) => item === url).length,
      1,
      `catalog should include ${url} exactly once`
    );
    assert.equal(
      seedUrlMatches.filter((item) => item === url).length,
      1,
      `seed should include ${url} exactly once`
    );
  }

  assert.match(seedSql, /AaronInfinitea@orgbots\.dev/);
  assert.match(seedSql, /TexasBasedGpa@orgbots\.dev/);
  assert.match(seedSql, /mrflmnlNFT@orgbots\.dev/);
  assert.match(seedSql, /BkashJosi@orgbots\.dev/);
  assert.ok(
    getFallbackPack("poteto", "lauren")?.seats.some(
      (seat) => seat.grokTemplateUrl === "https://x.ai/bot/93gOz3op1UQdBdbekQFLK"
    )
  );
  assert.equal(getFallbackPack("examples", "stencil"), null);
});

test("catalog adds voidvexa/george (Skroutz) + cgnot996 (X调度员)", () => {
  const stats = fallbackStats();
  assert.equal(stats.packs, 844);
  assert.equal(stats.seats, 1339);

  const gnurioGeorge = getFallbackPack("gnurio", "george");
  const voidvexaGeorge = getFallbackPack("voidvexa", "george");
  assert.ok(gnurioGeorge);
  assert.ok(voidvexaGeorge);
  assert.notEqual(gnurioGeorge.id, voidvexaGeorge.id);
  assert.match(voidvexaGeorge.readmeMd ?? "", /Not the George \(@gnurio\) pack/);

  const expected = [
    {
      owner: "voidvexa",
      slug: "george",
      name: "George",
      desk: "Skroutz",
      url: "https://x.ai/bot/yQH3AFCs-90xjVmW9LICV",
      seatId: "20000000-0000-0000-0000-000000000322",
      packId: "10000000-0000-0000-0000-000000000232",
      ownerId: "00000000-0000-0000-0000-000000000224",
      topic: "founder",
      xHandle: "voidvexa",
      seats: 1,
    },
    {
      owner: "cgnot996",
      slug: "cgnot996",
      name: "铁柱AGI",
      desk: "X调度员",
      url: "https://x.ai/bot/isfPwoTeQTBqA-gk9CZN5",
      seatId: "20000000-0000-0000-0000-000000000323",
      packId: "10000000-0000-0000-0000-000000000233",
      ownerId: "00000000-0000-0000-0000-000000000225",
      topic: "developer",
      xHandle: "cgnot996",
      seats: 3,
    },
  ];

  for (const item of expected) {
    const pack = getFallbackPack(item.owner, item.slug);
    assert.ok(pack, item.slug);
    assert.equal(pack.id, item.packId);
    assert.equal(pack.name, item.name);
    assert.equal(pack.official, false);
    assert.equal(pack.featured, false);
    assert.deepEqual(pack.topics, [item.topic]);
    assert.equal(pack.owner.id, item.ownerId);
    assert.equal(pack.owner.githubLogin, item.owner);
    assert.equal(pack.owner.xHandle, item.xHandle);
    assert.equal(pack.owner.avatarUrl, null);
    assert.ok(pack.seats.length >= item.seats);
    assert.equal(pack.seats[0]?.name, item.desk);
    assert.equal(pack.seats[0]?.isDesk, true);
    assert.equal(pack.seats[0]?.sortOrder, 0);
    assert.equal(pack.seats[0]?.id, item.seatId);
    assert.equal(pack.seats[0]?.grokTemplateUrl, item.url);
    assert.equal(parseGrokTemplateUrl(pack.seats[0]?.grokTemplateUrl), item.url);
    assert.match(pack.routingRule, new RegExp(item.desk.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.equal(listFallbackPacksByOwner(item.owner).length, 1);
  }

  const skippedNoon = [
    "https://x.ai/bot/j1-ISFFzWDSzihs9xz2MA",
    "https://x.ai/bot/9xNbMqiBC9gWhTwrh7S80",
    "https://x.ai/bot/reahN5D6W2dIiCKd4MuF7",
    "https://x.ai/bot/YgI9ZyckEeovP7nP917xR",
  ];
  for (const url of skippedNoon) {
    assert.ok(seedSql.includes(url), `noon pack ${url} remains on main`);
  }

  const addedUrls = expected.map((item) => item.url);
  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url): url is string => Boolean(url));
  const uniqueFallbackUrls = new Set(fallbackUrls);
  assert.equal(fallbackUrls.length, 1339);
  assert.equal(uniqueFallbackUrls.size, 1339);
  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  for (const url of addedUrls) {
    assert.equal(
      fallbackUrls.filter((item) => item === url).length,
      1,
      `catalog should include ${url} exactly once`
    );
    assert.equal(
      seedUrlMatches.filter((item) => item === url).length,
      1,
      `seed should include ${url} exactly once`
    );
  }

  assert.match(seedSql, /voidvexa@orgbots\.dev/);
  assert.match(seedSql, /cgnot996@orgbots\.dev/);
  assert.match(seedSql, /Skroutz by George|yQH3AFCs-90xjVmW9LICV/);
  assert.match(seedSql, /X调度员/);
  assert.equal(getFallbackPack("examples", "stencil"), null);
});

test("catalog adds Sep 12 evening + Sep 13 backlog seats and packs", () => {
  const stats = fallbackStats();
  assert.equal(stats.packs, 844);
  assert.equal(stats.seats, 1339);

  const mai = getFallbackPack("MaiYangAI", "mai");
  assert.ok(mai);
  assert.equal(mai.seats[0]?.isDesk, true);
  assert.ok(
    mai.seats.some(
      (seat) =>
        seat.name === "Sweeper / 清道夫" &&
        seat.isDesk === false &&
        seat.grokTemplateUrl === "https://x.ai/bot/SD6hgpiXqbV_LkMetf2fC" &&
        seat.id === "20000000-0000-0000-0000-000000000324"
    )
  );
  assert.match(mai.routingRule, /Sweeper \/ 清道夫/);

  const claire = getFallbackPack("clairevo", "claire");
  assert.ok(claire?.seats.some((seat) => seat.name === "Sylvia Style" && seat.grokTemplateUrl === "https://x.ai/bot/uVBVr5NSR6VirgJrgikIl"));
  assert.match(claire?.routingRule ?? "", /Sylvia Style/);

  const dennison = getFallbackPack("dennisonbertram", "dennison");
  assert.ok(dennison?.seats.some((seat) => seat.name === "Do Not Pay" && seat.grokTemplateUrl === "https://x.ai/bot/oxhf-Gm6EEs9SVHYFYbT4"));

  const cgnot = getFallbackPack("cgnot996", "cgnot996");
  assert.ok(cgnot);
  assert.equal(cgnot.seats[0]?.name, "X调度员");
  assert.equal(cgnot.seats.length, 4);
  assert.ok(cgnot.seats.some((seat) => seat.name === "Maples造型师" && seat.grokTemplateUrl === "https://x.ai/bot/zP5W1Sdwjo361traGRTM5"));
  assert.ok(cgnot.seats.some((seat) => seat.name === "记忆管家" && seat.grokTemplateUrl === "https://x.ai/bot/9Tq1f0aSurCP7UJHm98zy"));

  const scott = getFallbackPack("scottxmetcalf", "scott");
  assert.ok(scott?.seats.some((seat) => seat.name === "Task Farming" && seat.grokTemplateUrl === "https://x.ai/bot/MmcPTdwYwr6ebmmZzswYe"));
  assert.ok(scott?.seats.some((seat) => seat.name === "Travel Agent" && seat.grokTemplateUrl === "https://x.ai/bot/d8C0ufUatv_fgoCRbfXZ4"));
  assert.match(scott?.routingRule ?? "", /Task Farming/);
  assert.match(scott?.routingRule ?? "", /Travel Agent/);

  const nathan = getFallbackPack("nathanglass", "nathanglass");
  assert.ok(nathan?.seats.some((seat) => seat.name === "Weekend Edition" && seat.grokTemplateUrl === "https://x.ai/bot/1-S1yhsX6eEcPs9yik3oh"));

  const expected = [
    {
      owner: "leechael",
      slug: "leechael",
      name: "Leechael",
      desk: "Grok Bot Directory",
      url: "https://x.ai/bot/8wjQbE24sX8qBVHXSmjc8",
      seatId: "20000000-0000-0000-0000-000000000331",
      packId: "10000000-0000-0000-0000-000000000234",
      ownerId: "00000000-0000-0000-0000-000000000226",
      topic: "developer",
      xHandle: "Leechael",
      seats: 2,
      avatarUrl: null as string | null,
    },
    {
      owner: "omnithnkr",
      slug: "omnithnkr",
      name: "omnithnkr",
      desk: "Paige Turner",
      url: "https://x.ai/bot/2lbNqne5ku5VQird_s8AW",
      seatId: "20000000-0000-0000-0000-000000000332",
      packId: "10000000-0000-0000-0000-000000000235",
      ownerId: "00000000-0000-0000-0000-000000000227",
      topic: "developer",
      xHandle: "omnithnkr",
      seats: 1,
      avatarUrl: null,
    },
    {
      owner: "mattvagni",
      slug: "matt",
      name: "Matt",
      desk: "Berliner",
      url: "https://x.ai/bot/YhRPa_eYk4yramoMJOo6F",
      seatId: "20000000-0000-0000-0000-000000000333",
      packId: "10000000-0000-0000-0000-000000000236",
      ownerId: "00000000-0000-0000-0000-000000000228",
      topic: "media",
      xHandle: "mattvagni",
      seats: 1,
      avatarUrl: null,
    },
    {
      owner: "DomenicFotino",
      slug: "domenic",
      name: "Domenic",
      desk: "Alibaba Buyer Ops",
      url: "https://x.ai/bot/ZTFwMWXlScRvLrkHuR3gs",
      seatId: "20000000-0000-0000-0000-000000000334",
      packId: "10000000-0000-0000-0000-000000000237",
      ownerId: "00000000-0000-0000-0000-000000000229",
      topic: "founder",
      xHandle: "DomenicFotino",
      seats: 1,
      avatarUrl: null,
    },
    {
      owner: "im_usamakhalid",
      slug: "usama",
      name: "Usama",
      desk: "NuggetBot",
      url: "https://x.ai/bot/ia1zuEzDtPNyzFQ6o6F9x",
      seatId: "20000000-0000-0000-0000-000000000335",
      packId: "10000000-0000-0000-0000-000000000238",
      ownerId: "00000000-0000-0000-0000-000000000230",
      topic: "media",
      xHandle: "im_usamakhalid",
      seats: 1,
      avatarUrl: null,
    },
    {
      owner: "fwhittington_24",
      slug: "fiona",
      name: "Fiona",
      desk: "SWE Job Applier",
      url: "https://x.ai/bot/ZNfBRZeVANNSVza6Xyywf",
      seatId: "20000000-0000-0000-0000-000000000336",
      packId: "10000000-0000-0000-0000-000000000239",
      ownerId: "00000000-0000-0000-0000-000000000231",
      topic: "founder",
      xHandle: "fwhittington_24",
      seats: 5,
      avatarUrl: null,
    },
    {
      owner: "colinmcdermott",
      slug: "colin",
      name: "Colin",
      desk: "Store setup from zero",
      url: "https://x.ai/bot/F5jwhbmO2AgA8EgyHIDLp",
      seatId: "20000000-0000-0000-0000-000000000341",
      packId: "10000000-0000-0000-0000-000000000240",
      ownerId: "00000000-0000-0000-0000-000000000232",
      topic: "founder",
      xHandle: "ColinMcDermott",
      seats: 12,
      avatarUrl: "https://avatars.githubusercontent.com/u/1297701?v=4",
    },
    {
      owner: "realjbmangum",
      slug: "brian",
      name: "Brian",
      desk: "Receipt Reaper",
      url: "https://x.ai/bot/gIV4FpQgVmcsO0soCjHGc",
      seatId: "20000000-0000-0000-0000-000000000351",
      packId: "10000000-0000-0000-0000-000000000241",
      ownerId: "00000000-0000-0000-0000-000000000233",
      topic: "founder",
      xHandle: "RealJBMangum",
      seats: 1,
      avatarUrl: null,
    },
  ];

  for (const item of expected) {
    const pack = getFallbackPack(item.owner, item.slug);
    assert.ok(pack, item.slug);
    assert.equal(pack.id, item.packId);
    assert.equal(pack.name, item.name);
    assert.equal(pack.official, false);
    assert.equal(pack.featured, false);
    assert.deepEqual(pack.topics, [item.topic]);
    assert.equal(pack.owner.id, item.ownerId);
    assert.equal(pack.owner.githubLogin, item.owner);
    assert.equal(pack.owner.xHandle, item.xHandle);
    assert.equal(pack.owner.avatarUrl, item.avatarUrl);
    assert.ok(pack.seats.length >= item.seats);
    assert.equal(pack.seats[0]?.name, item.desk);
    assert.equal(pack.seats[0]?.isDesk, true);
    assert.equal(pack.seats[0]?.sortOrder, 0);
    assert.equal(pack.seats[0]?.id, item.seatId);
    assert.equal(pack.seats[0]?.grokTemplateUrl, item.url);
    assert.equal(parseGrokTemplateUrl(pack.seats[0]?.grokTemplateUrl), item.url);
    assert.match(pack.routingRule, new RegExp(item.desk.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.equal(listFallbackPacksByOwner(item.owner).length, 1);
  }

  const fiona = getFallbackPack("fwhittington_24", "fiona");
  assert.deepEqual(
    fiona?.seats.map((seat) => seat.grokTemplateUrl),
    [
      "https://x.ai/bot/ZNfBRZeVANNSVza6Xyywf",
      "https://x.ai/bot/COQAlYvqDNehPSHDBt-6z",
      "https://x.ai/bot/lbf-biMZO02RdXeOBks_-",
      "https://x.ai/bot/j2bqDafGnyOv6bKMOOGOp",
      "https://x.ai/bot/4AcLHtvlWUWclgU5jFy2r",
    ]
  );

  const colin = getFallbackPack("colinmcdermott", "colin");
  assert.equal(colin?.seats.length, 12);
  assert.equal(colin?.seats.filter((seat) => seat.isDesk).length, 1);
  assert.ok(colin?.seats.some((seat) => seat.grokTemplateUrl === "https://x.ai/bot/-x19CFkvT5U866BNA7q_J"));
  assert.equal(colin?.seats[11]?.name, "Whop Economic Intelligence");
  assert.equal(colin?.seats[11]?.id, "20000000-0000-0000-0000-000000000613");

  const mattvagni = getFallbackPack("mattvagni", "matt");
  const boss = getFallbackPack("bossriceshark", "matt");
  assert.ok(mattvagni && boss);
  assert.notEqual(mattvagni.id, boss.id);
  assert.match(mattvagni.readmeMd ?? "", /Not the Matt \(@bossriceshark\)/);

  const addedUrls = [
    "https://x.ai/bot/SD6hgpiXqbV_LkMetf2fC",
    "https://x.ai/bot/uVBVr5NSR6VirgJrgikIl",
    "https://x.ai/bot/oxhf-Gm6EEs9SVHYFYbT4",
    "https://x.ai/bot/zP5W1Sdwjo361traGRTM5",
    "https://x.ai/bot/9Tq1f0aSurCP7UJHm98zy",
    "https://x.ai/bot/MmcPTdwYwr6ebmmZzswYe",
    "https://x.ai/bot/1-S1yhsX6eEcPs9yik3oh",
    "https://x.ai/bot/8wjQbE24sX8qBVHXSmjc8",
    "https://x.ai/bot/2lbNqne5ku5VQird_s8AW",
    "https://x.ai/bot/YhRPa_eYk4yramoMJOo6F",
    "https://x.ai/bot/ZTFwMWXlScRvLrkHuR3gs",
    "https://x.ai/bot/ia1zuEzDtPNyzFQ6o6F9x",
    "https://x.ai/bot/ZNfBRZeVANNSVza6Xyywf",
    "https://x.ai/bot/COQAlYvqDNehPSHDBt-6z",
    "https://x.ai/bot/lbf-biMZO02RdXeOBks_-",
    "https://x.ai/bot/j2bqDafGnyOv6bKMOOGOp",
    "https://x.ai/bot/4AcLHtvlWUWclgU5jFy2r",
    "https://x.ai/bot/F5jwhbmO2AgA8EgyHIDLp",
    "https://x.ai/bot/M_4xLTMY06z1Zv1gvX_Nc",
    "https://x.ai/bot/SAfsqPLP0rCuQOywOguxX",
    "https://x.ai/bot/p0OIZUJK5sRFImh_DMujf",
    "https://x.ai/bot/D0UvxRvNzDTR_xOJ6Iq08",
    "https://x.ai/bot/3jmbbUj4_UDgbjo-Q3oEr",
    "https://x.ai/bot/wT_QN-zqycu-aHPsdZMVc",
    "https://x.ai/bot/-x19CFkvT5U866BNA7q_J",
    "https://x.ai/bot/GG7hDpauDjTRhB6VgLFAF",
    "https://x.ai/bot/nFEJD59IJA5604hO9vqym",
    "https://x.ai/bot/gIV4FpQgVmcsO0soCjHGc",
    "https://x.ai/bot/d8C0ufUatv_fgoCRbfXZ4",
  ];
  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url): url is string => Boolean(url));
  assert.equal(fallbackUrls.length, 1339);
  assert.equal(new Set(fallbackUrls).size, 1339);
  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  for (const url of addedUrls) {
    assert.equal(fallbackUrls.filter((item) => item === url).length, 1, url);
    assert.equal(seedUrlMatches.filter((item) => item === url).length, 1, url);
  }

  const skipped = [
    "https://x.ai/bot/Puh0gY4xFLf8g7SBaXQUQ",
    "https://x.ai/bot/3QlpCJKENU1wC7ka7e9O0",
    "https://x.ai/bot/hEmSUvWxccmfAVDGri1R8",
    "https://x.ai/bot/_jOdbfkB16zxu7MRcmReE",
  ];
  for (const url of skipped) {
    assert.equal(fallbackUrls.filter((item) => item === url).length, 0, url);
    assert.equal(seedUrlMatches.filter((item) => item === url).length, 0, url);
  }

  assert.match(seedSql, /leechael@orgbots\.dev/);
  assert.match(seedSql, /colinmcdermott@orgbots\.dev/);
  assert.match(seedSql, /fwhittington_24@orgbots\.dev/);
  assert.match(seedSql, /Grok Bot Directory/);
  assert.match(seedSql, /Receipt Reaper/);
  assert.match(seedSql, /Store setup from zero/);
  assert.equal(getFallbackPack("examples", "stencil"), null);
});

test("catalog adds Sep 15 Adventure Bot + 7 new packs", () => {
  const stats = fallbackStats();
  assert.equal(stats.packs, 844);
  assert.equal(stats.seats, 1339);

  const knock = getFallbackPack("suddenlyjon", "knock");
  assert.ok(knock);
  assert.ok(
    knock.seats.some(
      (seat) =>
        seat.name === "Adventure Bot" &&
        seat.isDesk === false &&
        seat.grokTemplateUrl === "https://x.ai/bot/sA0TXuMkDDSgBx52Z2D6f" &&
        seat.id === "20000000-0000-0000-0000-000000000353"
    )
  );
  assert.match(knock.routingRule, /Adventure Bot only for one GPS adventure pick/);
  assert.match(knock.readmeMd ?? "", /Adventure Bot is one pin and taste learning only/);

  const expected = [
    {
      owner: "samlambert",
      slug: "sam",
      name: "Sam",
      desk: "Commitments",
      url: "https://x.ai/bot/rFShmowW_3x_qeXQQB-sn",
      seatId: "20000000-0000-0000-0000-000000000354",
      packId: "10000000-0000-0000-0000-000000000242",
      ownerId: "00000000-0000-0000-0000-000000000234",
      topic: "founder",
      xHandle: "samlambert",
    },
    {
      owner: "francoe114696",
      slug: "franco",
      name: "Franco",
      desk: "Lienzo",
      url: "https://x.ai/bot/Czc1kCepdYnisFnRWfDKr",
      seatId: "20000000-0000-0000-0000-000000000355",
      packId: "10000000-0000-0000-0000-000000000243",
      ownerId: "00000000-0000-0000-0000-000000000235",
      topic: "developer",
      xHandle: "FrancoE114696",
    },
    {
      owner: "leingoedbloed",
      slug: "leendert",
      name: "Leendert",
      desk: "E-mail Organizer",
      url: "https://x.ai/bot/PUn74RYv_r3pcSvNkeQbd",
      seatId: "20000000-0000-0000-0000-000000000356",
      packId: "10000000-0000-0000-0000-000000000244",
      ownerId: "00000000-0000-0000-0000-000000000236",
      topic: "founder",
      xHandle: "leingoedbloed",
    },
    {
      owner: "bcorntexas",
      slug: "bcorn",
      name: "Bcorn",
      desk: "Grottle",
      url: "https://x.ai/bot/YvFrCr_VlFW_8PxaoFv_L",
      seatId: "20000000-0000-0000-0000-000000000357",
      packId: "10000000-0000-0000-0000-000000000245",
      ownerId: "00000000-0000-0000-0000-000000000237",
      topic: "developer",
      xHandle: "BCornTexas",
    },
    {
      owner: "valengiulimor",
      slug: "valentin",
      name: "Valentin",
      desk: "Tin El Investigador",
      url: "https://x.ai/bot/L3Lx6Y8t_ebL8qQhutoCd",
      seatId: "20000000-0000-0000-0000-000000000358",
      packId: "10000000-0000-0000-0000-000000000246",
      ownerId: "00000000-0000-0000-0000-000000000238",
      topic: "media",
      xHandle: "valengiulimor",
    },
    {
      owner: "iggynore",
      slug: "iggynore",
      name: "iggynore",
      desk: "Token Maxxing",
      url: "https://x.ai/bot/f6srhE3vkMevccaw8DLPf",
      seatId: "20000000-0000-0000-0000-000000000359",
      packId: "10000000-0000-0000-0000-000000000247",
      ownerId: "00000000-0000-0000-0000-000000000239",
      topic: "developer",
      xHandle: "iggynore",
    },
    {
      owner: "bwilson",
      slug: "bryan",
      name: "Bryan",
      desk: "LG Laundry Specialist",
      url: "https://x.ai/bot/TNPSVnX4Dm-adBvHJbng7",
      seatId: "20000000-0000-0000-0000-000000000360",
      packId: "10000000-0000-0000-0000-000000000248",
      ownerId: "00000000-0000-0000-0000-000000000240",
      topic: "founder",
      xHandle: "Bwilson",
    },
  ];

  for (const item of expected) {
    const pack = getFallbackPack(item.owner, item.slug);
    assert.ok(pack, item.owner);
    assert.equal(pack.id, item.packId);
    assert.equal(pack.owner.id, item.ownerId);
    assert.equal(pack.owner.githubLogin, item.owner);
    assert.equal(pack.owner.name, item.name === "Bcorn" ? "BCORN" : item.name === "Leendert" ? "Lein" : item.name);
    assert.equal(pack.owner.xHandle, item.xHandle);
    assert.equal(pack.name, item.name);
    assert.equal(pack.official, false);
    assert.equal(pack.featured, false);
    assert.deepEqual(pack.topics, [item.topic]);
    assert.equal(pack.seats.length, item.owner === "bwilson" ? 2 : 1);
    assert.equal(pack.seats[0]?.name, item.desk);
    assert.equal(pack.seats[0]?.isDesk, true);
    assert.equal(pack.seats[0]?.id, item.seatId);
    assert.equal(pack.seats[0]?.grokTemplateUrl, item.url);
    assert.equal(getFallbackProfile(item.owner)?.xHandle, item.xHandle);
  }

  const bryanExisting = getFallbackPack("Bryanofearth", "bryan");
  const bryanNew = getFallbackPack("bwilson", "bryan");
  assert.ok(bryanExisting && bryanNew);
  assert.notEqual(bryanExisting.id, bryanNew.id);
  assert.match(bryanNew.readmeMd ?? "", /Not the Bryan \(@Bryanofearth\)/);

  const addedUrls = [
    "https://x.ai/bot/sA0TXuMkDDSgBx52Z2D6f",
    "https://x.ai/bot/rFShmowW_3x_qeXQQB-sn",
    "https://x.ai/bot/Czc1kCepdYnisFnRWfDKr",
    "https://x.ai/bot/PUn74RYv_r3pcSvNkeQbd",
    "https://x.ai/bot/YvFrCr_VlFW_8PxaoFv_L",
    "https://x.ai/bot/L3Lx6Y8t_ebL8qQhutoCd",
    "https://x.ai/bot/f6srhE3vkMevccaw8DLPf",
    "https://x.ai/bot/TNPSVnX4Dm-adBvHJbng7",
  ];
  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url): url is string => Boolean(url));
  assert.equal(fallbackUrls.length, 1339);
  assert.equal(new Set(fallbackUrls).size, 1339);
  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  for (const url of addedUrls) {
    assert.equal(fallbackUrls.filter((item) => item === url).length, 1, url);
    assert.equal(seedUrlMatches.filter((item) => item === url).length, 1, url);
  }

  const skipped = [
    "https://x.ai/bot/_jOdbfkB16zxu7MRcmReE",
    "https://x.ai/bot/_ICGTFLfhc98B8xzTLGzg",
    "https://x.ai/bot/Uy2oK9854UViaiO0rQ6nC",
  ];
  for (const url of skipped) {
    assert.equal(fallbackUrls.filter((item) => item === url).length, 0, url);
    assert.equal(seedUrlMatches.filter((item) => item === url).length, 0, url);
  }

  assert.match(seedSql, /samlambert@orgbots\.dev/);
  assert.match(seedSql, /francoe114696@orgbots\.dev/);
  assert.match(seedSql, /Adventure Bot only for one GPS adventure pick/);
  assert.match(seedSql, /LG Laundry Specialist/);
  assert.match(seedSql, /Commitments/);
  assert.match(seedSql, /Tin El Investigador/);
  assert.equal(getFallbackPack("examples", "stencil"), null);
});

test("catalog adds Sep 15 3pm Root Agent + 薅羊毛 + Kun + Canonizer + WhatsApp-Bot + Flights", () => {
  const stats = fallbackStats();
  assert.equal(stats.packs, 844);
  assert.equal(stats.seats, 1339);

  const expected = [
    {
      owner: "mrbeko_",
      slug: "berkay",
      name: "Berkay",
      desk: "Root Agent",
      url: "https://x.ai/bot/1pTKHkJIEgxD9MjlPYE4P",
      seatId: "20000000-0000-0000-0000-000000000361",
      packId: "10000000-0000-0000-0000-000000000249",
      ownerId: "00000000-0000-0000-0000-000000000241",
      topic: "founder",
      xHandle: "mrbeko_",
      seats: 1,
    },
    {
      owner: "benxlab",
      slug: "ben",
      name: "Ben",
      desk: "薅羊毛",
      url: "https://x.ai/bot/WFW6_5N596TQpWCRjRZ5w",
      seatId: "20000000-0000-0000-0000-000000000362",
      packId: "10000000-0000-0000-0000-000000000250",
      ownerId: "00000000-0000-0000-0000-000000000242",
      topic: "founder",
      xHandle: "BenXlab",
      seats: 1,
    },
    {
      owner: "kunchenguid",
      slug: "kun",
      name: "Kun",
      desk: "Distill anyone",
      url: "https://x.ai/bot/id4s2QYrPYZsiTqvzIhkt",
      seatId: "20000000-0000-0000-0000-000000000363",
      packId: "10000000-0000-0000-0000-000000000251",
      ownerId: "00000000-0000-0000-0000-000000000243",
      topic: "founder",
      xHandle: "kunchenguid",
      seats: 2,
    },
    {
      owner: "hudcos",
      slug: "hudson",
      name: "Hudson",
      desk: "Canonizer",
      url: "https://x.ai/bot/pOcrH-Rc7SdPWiHsX9vHg",
      seatId: "20000000-0000-0000-0000-000000000365",
      packId: "10000000-0000-0000-0000-000000000252",
      ownerId: "00000000-0000-0000-0000-000000000244",
      topic: "founder",
      xHandle: "hudcos",
      seats: 1,
    },
    {
      owner: "alexhawat",
      slug: "alex",
      name: "Alex",
      desk: "WhatsApp-Bot",
      url: "https://x.ai/bot/t-Axu4DmT9x2DEPa1eNW1",
      seatId: "20000000-0000-0000-0000-000000000366",
      packId: "10000000-0000-0000-0000-000000000253",
      ownerId: "00000000-0000-0000-0000-000000000245",
      topic: "developer",
      xHandle: "alexhawat",
      seats: 1,
    },
    {
      owner: "truevis",
      slug: "eric",
      name: "Eric",
      desk: "Flights",
      url: "https://x.ai/bot/xqinGTgeghdOyeYmzqO2m",
      seatId: "20000000-0000-0000-0000-000000000367",
      packId: "10000000-0000-0000-0000-000000000254",
      ownerId: "00000000-0000-0000-0000-000000000246",
      topic: "founder",
      xHandle: "truevis",
      seats: 1,
    },
  ];

  for (const item of expected) {
    const pack = getFallbackPack(item.owner, item.slug);
    assert.ok(pack, item.owner);
    assert.equal(pack.id, item.packId);
    assert.equal(pack.owner.id, item.ownerId);
    assert.equal(pack.owner.githubLogin, item.owner);
    assert.equal(pack.owner.name, item.name === "Alex" ? "Alexandre" : item.name);
    assert.equal(pack.owner.xHandle, item.xHandle);
    assert.equal(pack.name, item.name);
    assert.equal(pack.official, false);
    assert.equal(pack.featured, false);
    assert.deepEqual(pack.topics, [item.topic]);
    assert.ok(pack.seats.length >= item.seats);
    assert.equal(pack.seats[0]?.name, item.desk);
    assert.equal(pack.seats[0]?.isDesk, true);
    assert.equal(pack.seats[0]?.id, item.seatId);
    assert.equal(pack.seats[0]?.grokTemplateUrl, item.url);
    assert.equal(getFallbackProfile(item.owner)?.xHandle, item.xHandle);
    assert.equal(listFallbackPacksByOwner(item.owner).length, 1);
  }

  const kun = getFallbackPack("kunchenguid", "kun");
  assert.ok(kun);
  assert.equal(kun.seats[1]?.name, "Firstmate");
  assert.equal(kun.seats[1]?.isDesk, false);
  assert.equal(kun.seats[1]?.id, "20000000-0000-0000-0000-000000000364");
  assert.equal(kun.seats[1]?.grokTemplateUrl, "https://x.ai/bot/__4FfrkUdvpdMk6-LKg5r");
  assert.match(kun.routingRule, /Firstmate only as the single orchestrator/);
  assert.match(kun.readmeMd ?? "", /Firstmate belongs here, not on compileinstyle/);
  assert.equal(getFallbackPack("compileinstyle", "neessam")?.seats.some((s) => s.name === "Firstmate"), false);

  const ericExisting = getFallbackPack("ericzakariasson", "eric");
  const ericTruevis = getFallbackPack("truevis", "eric");
  assert.ok(ericExisting && ericTruevis);
  assert.notEqual(ericExisting.id, ericTruevis.id);
  assert.match(ericTruevis.readmeMd ?? "", /Not the Eric \(@ericzakariasson\)/);
  assert.match(ericTruevis.readmeMd ?? "", /Not Eric Ren \(@rrrkren\)/);
  assert.equal(getFallbackPack("rrrkren", "eric"), null);

  const benExisting = getFallbackPack("brstorrie", "ben");
  const benXlab = getFallbackPack("benxlab", "ben");
  assert.ok(benExisting && benXlab);
  assert.notEqual(benExisting.id, benXlab.id);
  assert.match(benXlab.readmeMd ?? "", /Not the Ben \(@brstorrie\)/);

  const addedUrls = [
    "https://x.ai/bot/1pTKHkJIEgxD9MjlPYE4P",
    "https://x.ai/bot/WFW6_5N596TQpWCRjRZ5w",
    "https://x.ai/bot/id4s2QYrPYZsiTqvzIhkt",
    "https://x.ai/bot/__4FfrkUdvpdMk6-LKg5r",
    "https://x.ai/bot/pOcrH-Rc7SdPWiHsX9vHg",
    "https://x.ai/bot/t-Axu4DmT9x2DEPa1eNW1",
    "https://x.ai/bot/xqinGTgeghdOyeYmzqO2m",
  ];
  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url): url is string => Boolean(url));
  assert.equal(fallbackUrls.length, 1339);
  assert.equal(new Set(fallbackUrls).size, 1339);
  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  for (const url of addedUrls) {
    assert.equal(fallbackUrls.filter((item) => item === url).length, 1, url);
    assert.equal(seedUrlMatches.filter((item) => item === url).length, 1, url);
  }

  const skipped = [
    "https://x.ai/bot/Uy2oK9854UViaiO0rQ6nC",
    "https://x.ai/bot/_jOdbfkB16zxu7MRcmReE",
  ];
  for (const url of skipped) {
    assert.equal(fallbackUrls.filter((item) => item === url).length, 0, url);
    assert.equal(seedUrlMatches.filter((item) => item === url).length, 0, url);
  }

  assert.match(seedSql, /mrbeko_@orgbots\.dev/);
  assert.match(seedSql, /benxlab@orgbots\.dev/);
  assert.match(seedSql, /kunchenguid@orgbots\.dev/);
  assert.match(seedSql, /hudcos@orgbots\.dev/);
  assert.match(seedSql, /alexhawat@orgbots\.dev/);
  assert.match(seedSql, /truevis@orgbots\.dev/);
  assert.match(seedSql, /Root Agent/);
  assert.match(seedSql, /薅羊毛/);
  assert.match(seedSql, /Distill anyone/);
  assert.match(seedSql, /Firstmate/);
  assert.match(seedSql, /Canonizer/);
  assert.match(seedSql, /WhatsApp-Bot/);
  assert.match(seedSql, /Flights/);
  assert.equal(getFallbackPack("examples", "stencil"), null);
});

test("catalog adds sam_builds_ai/sam and eight Scott seats (Sep 15 eve)", () => {
  const stats = fallbackStats();
  assert.equal(stats.packs, 844);
  assert.equal(stats.seats, 1339);

  const samBuilds = getFallbackPack("sam_builds_ai", "sam");
  assert.ok(samBuilds);
  assert.equal(samBuilds.id, "10000000-0000-0000-0000-000000000255");
  assert.equal(samBuilds.owner.id, "00000000-0000-0000-0000-000000000247");
  assert.equal(samBuilds.owner.githubLogin, "sam_builds_ai");
  assert.equal(samBuilds.owner.name, "Sam");
  assert.equal(samBuilds.owner.xHandle, "sam_builds_ai");
  assert.equal(samBuilds.official, false);
  assert.equal(samBuilds.featured, false);
  assert.deepEqual(samBuilds.topics, ["founder"]);
  assert.equal(samBuilds.seats.length, 3);
  assert.equal(samBuilds.seats[0]?.name, "Prospect Drafts");
  assert.equal(samBuilds.seats[0]?.isDesk, true);
  assert.equal(samBuilds.seats[0]?.id, "20000000-0000-0000-0000-000000000368");
  assert.equal(samBuilds.seats[0]?.grokTemplateUrl, "https://x.ai/bot/Ed8OwTpWaFfZdJHEAoT4t");
  assert.match(samBuilds.seats[0]?.job ?? "", /first-touch Gmail/);
  assert.equal(samBuilds.seats[1]?.name, "Named X Reply Radar");
  assert.equal(samBuilds.seats[1]?.isDesk, false);
  assert.equal(samBuilds.seats[1]?.sortOrder, 1);
  assert.equal(samBuilds.seats[1]?.id, "20000000-0000-0000-0000-000000000369");
  assert.equal(samBuilds.seats[1]?.grokTemplateUrl, "https://x.ai/bot/lJYaUExPBMZfLWfZEFVGc");
  assert.match(samBuilds.routingRule, /Prospect Drafts/);
  assert.match(samBuilds.routingRule, /Named X Reply Radar only for niche hot-post reply drafts/);
  assert.match(samBuilds.readmeMd ?? "", /Not the Sam \(@samlambert\) Commitments pack/);

  const samLambert = getFallbackPack("samlambert", "sam");
  assert.ok(samLambert);
  assert.notEqual(samLambert.id, samBuilds.id);
  assert.equal(samLambert.seats[0]?.name, "Commitments");
  assert.equal(samLambert.seats.some((s) => s.name === "Prospect Drafts"), false);
  assert.equal(listFallbackPacksByOwner("sam_builds_ai").length, 1);
  assert.equal(getFallbackProfile("sam_builds_ai")?.xHandle, "sam_builds_ai");

  const scott = getFallbackPack("scottxmetcalf", "scott");
  assert.ok(scott);
  assert.equal(scott.id, "10000000-0000-0000-0000-000000000081");
  assert.equal(scott.seats.length, 28);
  assert.equal(scott.seats[0]?.name, "Leader 1:1 Bot");
  assert.equal(scott.seats[0]?.isDesk, true);
  const addedScott = [
    {
      name: "Ramp",
      id: "20000000-0000-0000-0000-000000000370",
      sortOrder: 8,
      url: "https://x.ai/bot/zMMAByt3oW_t2ua1NZa9X",
    },
    {
      name: "Todo",
      id: "20000000-0000-0000-0000-000000000371",
      sortOrder: 9,
      url: "https://x.ai/bot/wQHNsqt2KhOszyxMZ1xQ1",
    },
    {
      name: "Forced Human Touches",
      id: "20000000-0000-0000-0000-000000000372",
      sortOrder: 10,
      url: "https://x.ai/bot/zSiLsURBgkKHhx0V9Wok2",
    },
    {
      name: "Slacker",
      id: "20000000-0000-0000-0000-000000000373",
      sortOrder: 11,
      url: "https://x.ai/bot/R-TSImHItwbFHL8vYj9sc",
    },
    {
      name: "Mission Control",
      id: "20000000-0000-0000-0000-000000000374",
      sortOrder: 12,
      url: "https://x.ai/bot/GGnJOdH3hv321H2QES9UE",
    },
    {
      name: "PG Bot",
      id: "20000000-0000-0000-0000-000000000375",
      sortOrder: 13,
      url: "https://x.ai/bot/zsxwic_IlmyavESnhLiWZ",
    },
    {
      name: "AE deal bot",
      id: "20000000-0000-0000-0000-000000000376",
      sortOrder: 14,
      url: "https://x.ai/bot/yXsqmCaODNkTEwtIbiXxe",
    },
    {
      name: "ADM account bot",
      id: "20000000-0000-0000-0000-000000000377",
      sortOrder: 15,
      url: "https://x.ai/bot/4Gc1tZsJu7C8YH-EnTfaN",
    },
  ];
  for (const item of addedScott) {
    const seat = scott.seats[item.sortOrder];
    assert.ok(seat, item.name);
    assert.equal(seat.name, item.name);
    assert.equal(seat.id, item.id);
    assert.equal(seat.isDesk, false);
    assert.equal(seat.sortOrder, item.sortOrder);
    assert.equal(seat.grokTemplateUrl, item.url);
  }
  assert.match(scott.readmeMd ?? "", /not Krista Letz's PG desk/);
  assert.equal(getFallbackPack("kristaletz", "krista")?.seats[0]?.name, "PG");
  assert.equal(
    getFallbackPack("kristaletz", "krista")?.seats.some(
      (s) => s.grokTemplateUrl === "https://x.ai/bot/zsxwic_IlmyavESnhLiWZ"
    ),
    false
  );

  const addedUrls = [
    "https://x.ai/bot/Ed8OwTpWaFfZdJHEAoT4t",
    "https://x.ai/bot/lJYaUExPBMZfLWfZEFVGc",
    "https://x.ai/bot/zMMAByt3oW_t2ua1NZa9X",
    "https://x.ai/bot/wQHNsqt2KhOszyxMZ1xQ1",
    "https://x.ai/bot/zSiLsURBgkKHhx0V9Wok2",
    "https://x.ai/bot/R-TSImHItwbFHL8vYj9sc",
    "https://x.ai/bot/GGnJOdH3hv321H2QES9UE",
    "https://x.ai/bot/zsxwic_IlmyavESnhLiWZ",
    "https://x.ai/bot/yXsqmCaODNkTEwtIbiXxe",
    "https://x.ai/bot/4Gc1tZsJu7C8YH-EnTfaN",
  ];
  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url): url is string => Boolean(url));
  assert.equal(fallbackUrls.length, 1339);
  assert.equal(new Set(fallbackUrls).size, 1339);
  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  for (const url of addedUrls) {
    assert.equal(fallbackUrls.filter((item) => item === url).length, 1, url);
    assert.equal(seedUrlMatches.filter((item) => item === url).length, 1, url);
  }

  const skipped = [
    "https://x.ai/bot/Uy2oK9854UViaiO0rQ6nC",
    "https://x.ai/bot/1GpK7CoPs4e_M__9rb3uR",
    "https://x.ai/bot/Kcjp2",
    "https://x.ai/bot/_jOdbfkB16zxu7MRcmReE",
  ];
  for (const url of skipped) {
    assert.equal(fallbackUrls.filter((item) => item === url).length, 0, url);
    assert.equal(seedUrlMatches.filter((item) => item === url).length, 0, url);
  }

  assert.match(seedSql, /sam_builds_ai@orgbots\.dev/);
  assert.match(seedSql, /Prospect Drafts/);
  assert.match(seedSql, /Named X Reply Radar/);
  assert.match(seedSql, /Forced Human Touches/);
  assert.match(seedSql, /ADM account bot/);
  assert.match(seedSql, /not Krista Letz's PG desk/);
  assert.equal(getFallbackPack("examples", "stencil"), null);
});

test("catalog Sep 16 — Flat hunter seat + 9 new packs (8am+noon)", () => {
  const stats = fallbackStats();
  assert.equal(stats.packs, 844);
  assert.equal(stats.seats, 1339);

  const ash = getFallbackPack("0xashrk", "ash");
  assert.ok(ash);
  assert.equal(ash.id, "10000000-0000-0000-0000-000000000216");
  assert.equal(ash.seats.length, 2);
  assert.equal(ash.seats[0]?.name, "Fed + X Brief");
  assert.equal(ash.seats[0]?.isDesk, true);
  assert.equal(ash.seats[0]?.grokTemplateUrl, "https://x.ai/bot/ojDgaVLzjbxpPV74VzQrM");
  assert.equal(ash.seats[1]?.name, "Flat hunter");
  assert.equal(ash.seats[1]?.isDesk, false);
  assert.equal(ash.seats[1]?.sortOrder, 1);
  assert.equal(ash.seats[1]?.id, "20000000-0000-0000-0000-000000000378");
  assert.equal(ash.seats[1]?.grokTemplateUrl, "https://x.ai/bot/amNEjElPIlHuan3BCbOT2");
  assert.match(ash.seats[1]?.job ?? "", /modern-bathroom/);
  assert.match(ash.routingRule, /Flat hunter only for London rental hunting/);
  assert.equal(listFallbackPacksByOwner("0xashrk").length, 1);

  const expected = [
    {
      owner: "diegoarmandoAD",
      slug: "diego",
      name: "DIEGO",
      ownerId: "00000000-0000-0000-0000-000000000248",
      packId: "10000000-0000-0000-0000-000000000256",
      desk: "Flippy",
      seatId: "20000000-0000-0000-0000-000000000379",
      url: "https://x.ai/bot/OfHECnXmPPavf-l_rZufo",
      topic: "founder",
      job: /OpenSea NFT mints/,
      notPack: ["Diego_F_Aguirre", "diego"] as const,
    },
    {
      owner: "kenashe",
      slug: "ken",
      name: "Ken Ashe",
      ownerId: "00000000-0000-0000-0000-000000000249",
      packId: "10000000-0000-0000-0000-000000000257",
      desk: "VetStack",
      seatId: "20000000-0000-0000-0000-000000000380",
      url: "https://x.ai/bot/z1zYI6LHiFh0UXYf7YjNL",
      topic: "founder",
      job: /veteran savings/,
      readme: /Kenny Calzone/,
    },
    {
      owner: "chuckh_",
      slug: "chuck",
      name: "Chuck Hattemer",
      ownerId: "00000000-0000-0000-0000-000000000250",
      packId: "10000000-0000-0000-0000-000000000258",
      desk: "Gong",
      seatId: "20000000-0000-0000-0000-000000000381",
      url: "https://x.ai/bot/8CwqNTk5VBBhEAnTyUIHi",
      topic: "founder",
      job: /hiring execution/,
    },
    {
      owner: "NymblePay",
      slug: "nymble",
      name: "Nymble",
      ownerId: "00000000-0000-0000-0000-000000000251",
      packId: "10000000-0000-0000-0000-000000000259",
      desk: "Rent Collections Desk",
      seatId: "20000000-0000-0000-0000-000000000382",
      url: "https://x.ai/bot/_cD7oH9VWZy8655M-wDfc",
      topic: "founder",
      job: /late-rent collections/,
      readme: /Nymble Pay/,
    },
    {
      owner: "Adamdesgns",
      slug: "adam",
      name: "AdamDesigns",
      ownerId: "00000000-0000-0000-0000-000000000252",
      packId: "10000000-0000-0000-0000-000000000260",
      desk: "Psycho",
      seatId: "20000000-0000-0000-0000-000000000383",
      url: "https://x.ai/bot/LR0wXrk09bWEHQkI_QnQK",
      topic: "founder",
      job: /Not therapy/,
      readme: /Not the Adam \(@AdamLowisz\) pack/,
      notPack: ["AdamLowisz", "adam"] as const,
    },
    {
      owner: "GregRainbolt",
      slug: "greg",
      name: "Greg Rainbolt",
      ownerId: "00000000-0000-0000-0000-000000000253",
      packId: "10000000-0000-0000-0000-000000000261",
      desk: "UGC Agency",
      seatId: "20000000-0000-0000-0000-000000000384",
      url: "https://x.ai/bot/q2cwfiBm4Va7lV0NZdxzu",
      topic: "media",
      job: /ready-to-film/,
    },
    {
      owner: "merirand",
      slug: "rasmus",
      name: "Rasmus",
      ownerId: "00000000-0000-0000-0000-000000000254",
      packId: "10000000-0000-0000-0000-000000000262",
      desk: "Elon Musk (Algorithm & constraint)",
      seatId: "20000000-0000-0000-0000-000000000385",
      url: "https://x.ai/bot/QCwGPAlho0dBvBds_IOWF",
      topic: "founder",
      job: /biggest constraint/,
    },
    {
      owner: "myke86d",
      slug: "myke",
      name: "Myke",
      ownerId: "00000000-0000-0000-0000-000000000255",
      packId: "10000000-0000-0000-0000-000000000263",
      desk: "Pour Cost Coach",
      seatId: "20000000-0000-0000-0000-000000000386",
      url: "https://x.ai/bot/M4fGJmOk-8Yx9B48Izqnd",
      topic: "founder",
      job: /Never invents/,
    },
    {
      owner: "vaibhavhome",
      slug: "vaibhav",
      name: "Vaibhav Arora",
      ownerId: "00000000-0000-0000-0000-000000000256",
      packId: "10000000-0000-0000-0000-000000000264",
      desk: "Chief of Staff",
      seatId: "20000000-0000-0000-0000-000000000387",
      url: "https://x.ai/bot/s4lVhWgvghY8dikqD0LC4",
      topic: "founder",
      job: /morning digest/,
    },
  ] as const;

  for (const item of expected) {
    const pack = getFallbackPack(item.owner, item.slug);
    assert.ok(pack, item.owner);
    assert.equal(pack.id, item.packId);
    assert.equal(pack.owner.id, item.ownerId);
    assert.equal(pack.owner.githubLogin, item.owner);
    assert.equal(pack.owner.name, item.name);
    assert.equal(pack.owner.xHandle, item.owner);
    assert.equal(pack.name, item.name);
    assert.equal(pack.official, false);
    assert.equal(pack.featured, false);
    assert.deepEqual(pack.topics, [item.topic]);
    assert.equal(pack.seats.length, item.owner === "myke86d" ? 3 : 1);
    assert.equal(pack.seats[0]?.name, item.desk);
    assert.equal(pack.seats[0]?.isDesk, true);
    assert.equal(pack.seats[0]?.sortOrder, 0);
    assert.equal(pack.seats[0]?.id, item.seatId);
    assert.equal(pack.seats[0]?.grokTemplateUrl, item.url);
    assert.match(pack.seats[0]?.job ?? "", item.job);
    assert.match(pack.routingRule, new RegExp(item.desk.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    if ("readme" in item && item.readme) {
      assert.match(pack.readmeMd ?? "", item.readme);
    }
    assert.equal(listFallbackPacksByOwner(item.owner).length, 1);
    assert.equal(getFallbackProfile(item.owner)?.xHandle, item.owner);
  }

  const diegoExisting = getFallbackPack("Diego_F_Aguirre", "diego");
  assert.ok(diegoExisting);
  assert.notEqual(diegoExisting.id, "10000000-0000-0000-0000-000000000256");
  assert.equal(diegoExisting.seats[0]?.name, "Home Front");

  const adamExisting = getFallbackPack("adamlowisz", "adam");
  assert.ok(adamExisting);
  assert.notEqual(adamExisting.id, "10000000-0000-0000-0000-000000000260");
  assert.equal(adamExisting.seats[0]?.name, "X Top 100 Fans Weekly");

  const addedUrls = [
    "https://x.ai/bot/amNEjElPIlHuan3BCbOT2",
    "https://x.ai/bot/OfHECnXmPPavf-l_rZufo",
    "https://x.ai/bot/z1zYI6LHiFh0UXYf7YjNL",
    "https://x.ai/bot/8CwqNTk5VBBhEAnTyUIHi",
    "https://x.ai/bot/_cD7oH9VWZy8655M-wDfc",
    "https://x.ai/bot/LR0wXrk09bWEHQkI_QnQK",
    "https://x.ai/bot/q2cwfiBm4Va7lV0NZdxzu",
    "https://x.ai/bot/QCwGPAlho0dBvBds_IOWF",
    "https://x.ai/bot/M4fGJmOk-8Yx9B48Izqnd",
    "https://x.ai/bot/s4lVhWgvghY8dikqD0LC4",
  ];
  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url): url is string => Boolean(url));
  assert.equal(fallbackUrls.length, 1339);
  assert.equal(new Set(fallbackUrls).size, 1339);
  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  for (const url of addedUrls) {
    assert.equal(fallbackUrls.filter((item) => item === url).length, 1, url);
    assert.equal(seedUrlMatches.filter((item) => item === url).length, 1, url);
  }

  const skipped = [
    "https://x.ai/bot/y3xJtXexbxn7XpmECEJMc",
    "https://x.ai/bot/Mz3Q4s3wGqOQd4dhGeG_F",
    "https://x.ai/bot/PxN9o4VTuWBtmsHyfQc9j",
  ];
  for (const url of skipped) {
    assert.equal(fallbackUrls.filter((item) => item === url).length, 0, url);
    assert.equal(seedUrlMatches.filter((item) => item === url).length, 0, url);
  }

  assert.match(seedSql, /diegoarmandoAD@orgbots\.dev/);
  assert.match(seedSql, /Flat hunter/);
  assert.match(seedSql, /VetStack/);
  assert.match(seedSql, /Rent Collections Desk/);
  assert.match(seedSql, /Pour Cost Coach/);
  assert.match(seedSql, /Kenny Calzone/);
  assert.equal(getFallbackPack("examples", "stencil"), null);
});

test("catalog 3pm IST 2026-09-16 — Venduto, Clip Clip, Sevvy, MonsterBot, Personal Shopper", () => {
  const stats = fallbackStats();
  assert.equal(stats.packs, 844);
  assert.equal(stats.seats, 1339);

  const expected = [
    {
      owner: "SuperTost100",
      slug: "tommaso",
      name: "Tommaso Barbera",
      ownerId: "00000000-0000-0000-0000-000000000257",
      packId: "10000000-0000-0000-0000-000000000265",
      desk: "Venduto",
      seatId: "20000000-0000-0000-0000-000000000388",
      url: "https://x.ai/bot/VH6hfT_aihtFVmOcSQTwp",
      topic: "founder",
      job: /Vinted, Subito\.it, and Facebook Marketplace/,
      readme: /2100149576388743291/,
    },
    {
      owner: "prcshxnt",
      slug: "prashant",
      name: "Prashant",
      ownerId: "00000000-0000-0000-0000-000000000258",
      packId: "10000000-0000-0000-0000-000000000266",
      desk: "Clip Clip",
      seatId: "20000000-0000-0000-0000-000000000389",
      url: "https://x.ai/bot/hL97Xhf7o84RTv8NlOl37",
      topic: "media",
      job: /Never posts/,
      readme: /2100151839199228091/,
    },
    {
      owner: "lorenzkrinner",
      slug: "lorenz",
      name: "Lorenz",
      ownerId: "00000000-0000-0000-0000-000000000259",
      packId: "10000000-0000-0000-0000-000000000267",
      desk: "Sevvy",
      seatId: "20000000-0000-0000-0000-000000000390",
      url: "https://x.ai/bot/iNwf-lMJ_yNe5kZLETztx",
      topic: "founder",
      job: /sevdesk/,
      readme: /2100146844735086828/,
    },
    {
      owner: "DeadboyEzra",
      slug: "deadboy",
      name: "DeadboyEzra",
      ownerId: "00000000-0000-0000-0000-000000000260",
      packId: "10000000-0000-0000-0000-000000000268",
      desk: "MonsterBot",
      seatId: "20000000-0000-0000-0000-000000000391",
      url: "https://x.ai/bot/JMLG1CF0xuj4Jm8KArqCI",
      topic: "founder",
      job: /Tamagotchi-like familiar/,
      readme: /2100096527448318211/,
    },
    {
      owner: "hovinthenorth",
      slug: "hovhannes",
      name: "Hovhannes Mkhitaryan",
      ownerId: "00000000-0000-0000-0000-000000000261",
      packId: "10000000-0000-0000-0000-000000000269",
      desk: "Personal Shopper",
      seatId: "20000000-0000-0000-0000-000000000392",
      url: "https://x.ai/bot/D0DOumUGpkN-fjE_acysw",
      topic: "founder",
      job: /household person book/,
      readme: /2099998794490536065/,
    },
  ] as const;

  for (const item of expected) {
    const pack = getFallbackPack(item.owner, item.slug);
    assert.ok(pack, item.owner);
    assert.equal(pack.id, item.packId);
    assert.equal(pack.owner.id, item.ownerId);
    assert.equal(pack.owner.githubLogin, item.owner);
    assert.equal(pack.owner.name, item.name);
    assert.equal(pack.owner.xHandle, item.owner);
    assert.equal(pack.name, item.name);
    assert.equal(pack.official, false);
    assert.equal(pack.featured, false);
    assert.deepEqual(pack.topics, [item.topic]);
    assert.equal(pack.seats.length, 1);
    assert.equal(pack.seats[0]?.name, item.desk);
    assert.equal(pack.seats[0]?.isDesk, true);
    assert.equal(pack.seats[0]?.sortOrder, 0);
    assert.equal(pack.seats[0]?.id, item.seatId);
    assert.equal(pack.seats[0]?.grokTemplateUrl, item.url);
    assert.match(pack.seats[0]?.job ?? "", item.job);
    assert.match(pack.routingRule, new RegExp(item.desk.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    if ("readme" in item && item.readme) {
      assert.match(pack.readmeMd ?? "", item.readme);
    }
    assert.equal(listFallbackPacksByOwner(item.owner).length, 1);
    assert.equal(getFallbackProfile(item.owner)?.xHandle, item.owner);
  }

  const addedUrls = [
    "https://x.ai/bot/VH6hfT_aihtFVmOcSQTwp",
    "https://x.ai/bot/hL97Xhf7o84RTv8NlOl37",
    "https://x.ai/bot/iNwf-lMJ_yNe5kZLETztx",
    "https://x.ai/bot/JMLG1CF0xuj4Jm8KArqCI",
    "https://x.ai/bot/D0DOumUGpkN-fjE_acysw",
  ];
  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url): url is string => Boolean(url));
  assert.equal(fallbackUrls.length, 1339);
  assert.equal(new Set(fallbackUrls).size, 1339);
  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  for (const url of addedUrls) {
    assert.equal(fallbackUrls.filter((item) => item === url).length, 1, url);
    assert.equal(seedUrlMatches.filter((item) => item === url).length, 1, url);
  }

  const skippedNames = [
    "Cash Fleet Operator",
    "Falcon Constraint Desk",
    "Falcon Constraint Optimizer",
    "Research Brief",
    "Lecture Sheet",
    "Homeschool LABS",
  ];
  for (const name of skippedNames) {
    assert.ok(
      !listFallbackPacks().some((pack) =>
        (getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? []).some(
          (seat) => seat.name.includes(name) || (seat.job ?? "").includes(name)
        )
      ),
      name
    );
  }

  assert.match(seedSql, /SuperTost100@orgbots\.dev/);
  assert.match(seedSql, /prcshxnt@orgbots\.dev/);
  assert.match(seedSql, /Venduto/);
  assert.match(seedSql, /Clip Clip/);
  assert.match(seedSql, /Sevvy/);
  assert.match(seedSql, /MonsterBot/);
  assert.match(seedSql, /Personal Shopper/);
  assert.equal(getFallbackPack("examples", "stencil"), null);
});

test("catalog 5pm IST 2026-09-16 — fomo pilled, AutoOutreach SDR, SaaS Content Ranker, Ops, YouTube Soft-PASS Ops", () => {
  const stats = fallbackStats();
  assert.equal(stats.packs, 844);
  assert.equal(stats.seats, 1339);

  const expected = [
    {
      owner: "___troopr",
      slug: "varun",
      packName: "Varun",
      ownerName: "Varun Sapre",
      ownerId: "00000000-0000-0000-0000-000000000262",
      packId: "10000000-0000-0000-0000-000000000270",
      desk: "fomo pilled",
      seatId: "20000000-0000-0000-0000-000000000393",
      url: "https://x.ai/bot/YOqFuamIFV3WdNNHYVt9L",
      topic: "founder",
      job: /Never RSVP\/register\/buy/,
      readme: /2100141133561319554/,
    },
    {
      owner: "joncarder",
      slug: "jon",
      packName: "Jon",
      ownerName: "Jon Carder",
      ownerId: "00000000-0000-0000-0000-000000000263",
      packId: "10000000-0000-0000-0000-000000000271",
      desk: "AutoOutreach SDR",
      seatId: "20000000-0000-0000-0000-000000000394",
      url: "https://x.ai/bot/BFOjQ_Gg_sQi5pJ-Q05UW",
      topic: "founder",
      job: /books meetings while you sleep/,
      readme: /2100144664234086441/,
    },
    {
      owner: "Abdollahoffline",
      slug: "abdullah",
      packName: "Abdullah",
      ownerName: "Abdullah",
      ownerId: "00000000-0000-0000-0000-000000000264",
      packId: "10000000-0000-0000-0000-000000000272",
      desk: "SaaS Content Ranker",
      seatId: "20000000-0000-0000-0000-000000000395",
      url: "https://x.ai/bot/JDYPl17DU2bU771WtX4we",
      topic: "founder",
      job: /SaaS affiliate content/,
      readme: /2100145991965872367/,
    },
    {
      owner: "Rimusz",
      slug: "rimantas",
      packName: "Rimantas",
      ownerName: "Rimantas Mocevicius",
      ownerId: "00000000-0000-0000-0000-000000000265",
      packId: "10000000-0000-0000-0000-000000000273",
      desk: "Ops",
      seatId: "20000000-0000-0000-0000-000000000396",
      url: "https://x.ai/bot/4sUQZA1UAXXDRf5bhYwPY",
      topic: "founder",
      job: /Chief of Staff front door/,
      readme: /2100159532349403632/,
    },
    {
      owner: "EricChez",
      slug: "eric",
      packName: "Eric Chez",
      ownerName: "Eric Chez",
      ownerId: "00000000-0000-0000-0000-000000000266",
      packId: "10000000-0000-0000-0000-000000000274",
      desk: "YouTube Soft-PASS Ops",
      seatId: "20000000-0000-0000-0000-000000000397",
      url: "https://x.ai/bot/hf0v7qdlZbACHYYPTVxQ8",
      topic: "media",
      job: /Private-first YouTube music/,
      readme: /2100186088606503068/,
    },
  ] as const;

  for (const item of expected) {
    const pack = getFallbackPack(item.owner, item.slug);
    assert.ok(pack, item.owner);
    assert.equal(pack.id, item.packId);
    assert.equal(pack.owner.id, item.ownerId);
    assert.equal(pack.owner.githubLogin, item.owner);
    assert.equal(pack.owner.name, item.ownerName);
    assert.equal(pack.owner.xHandle, item.owner);
    assert.equal(pack.name, item.packName);
    assert.equal(pack.official, false);
    assert.equal(pack.featured, false);
    assert.deepEqual(pack.topics, [item.topic]);
    assert.equal(pack.seats.length, 1);
    assert.equal(pack.seats[0]?.name, item.desk);
    assert.equal(pack.seats[0]?.isDesk, true);
    assert.equal(pack.seats[0]?.sortOrder, 0);
    assert.equal(pack.seats[0]?.id, item.seatId);
    assert.equal(pack.seats[0]?.grokTemplateUrl, item.url);
    assert.match(pack.seats[0]?.job ?? "", item.job);
    assert.match(pack.routingRule, new RegExp(item.desk.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(pack.readmeMd ?? "", item.readme);
    assert.equal(listFallbackPacksByOwner(item.owner).length, 1);
    assert.equal(getFallbackProfile(item.owner)?.xHandle, item.owner);
  }

  assert.notEqual(getFallbackPack("EricChez", "eric")?.id, getFallbackPack("ericzakariasson", "eric")?.id);
  assert.notEqual(getFallbackPack("EricChez", "eric")?.id, getFallbackPack("rrrkren", "eric-ren")?.id ?? getFallbackPack("rrrkren", "eric")?.id);
  assert.match(getFallbackPack("EricChez", "eric")?.readmeMd ?? "", /Not the Eric \(@ericzakariasson\) pack/);

  const addedUrls = [
    "https://x.ai/bot/YOqFuamIFV3WdNNHYVt9L",
    "https://x.ai/bot/BFOjQ_Gg_sQi5pJ-Q05UW",
    "https://x.ai/bot/JDYPl17DU2bU771WtX4we",
    "https://x.ai/bot/4sUQZA1UAXXDRf5bhYwPY",
    "https://x.ai/bot/hf0v7qdlZbACHYYPTVxQ8",
  ];
  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url): url is string => Boolean(url));
  assert.equal(fallbackUrls.length, 1339);
  assert.equal(new Set(fallbackUrls).size, 1339);
  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  for (const url of addedUrls) {
    assert.equal(fallbackUrls.filter((item) => item === url).length, 1, url);
    assert.equal(seedUrlMatches.filter((item) => item === url).length, 1, url);
  }

  const skippedUrls = [
    "https://x.ai/bot/Mz3Q4s3wGqOQd4dhGeG_F",
    "https://x.ai/bot/bCbTllH-w87rHpu3avg5Y",
    "https://x.ai/bot/3nkH58KUSQG5S7A29rzWi",
    "https://x.ai/bot/eSxdHB8yCtJbqp6vxQOzP",
  ];
  for (const url of skippedUrls) {
    assert.equal(fallbackUrls.filter((item) => item === url).length, 0, url);
    assert.equal(seedUrlMatches.filter((item) => item === url).length, 0, url);
  }

  const skippedNames = [
    "Cash Fleet Operator",
    "DogTheNaughtyHunter",
    "CYBERCABINSIGHT",
    "Falcon Constraint Desk",
    "Falcon Constraint Optimizer",
    "Grok Bot Optimizer",
    "Research Brief",
    "Lecture Sheet",
    "Homeschool LABS",
  ];
  for (const name of skippedNames) {
    assert.ok(
      !listFallbackPacks().some((pack) =>
        (getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? []).some(
          (seat) => seat.name.includes(name) || (seat.job ?? "").includes(name)
        )
      ),
      name
    );
  }

  assert.match(seedSql, /___troopr@orgbots\.dev/);
  assert.match(seedSql, /joncarder@orgbots\.dev/);
  assert.match(seedSql, /Abdollahoffline@orgbots\.dev/);
  assert.match(seedSql, /Rimusz@orgbots\.dev/);
  assert.match(seedSql, /EricChez@orgbots\.dev/);
  assert.match(seedSql, /fomo pilled/);
  assert.match(seedSql, /AutoOutreach SDR/);
  assert.match(seedSql, /SaaS Content Ranker/);
  assert.match(seedSql, /YouTube Soft-PASS Ops/);
  assert.equal(getFallbackPack("examples", "stencil"), null);
});
test("catalog watch 3pm IST 2026-09-19 — 133 unfiled seats (Personal Shopper already on main)", () => {
  const stats = fallbackStats();
  assert.equal(stats.packs, 844);
  assert.equal(stats.seats, 1339);

  const expected = [
    {
      owner: "_noahweir",
      slug: "noah",
      packName: "Noah",
      ownerName: "Noah Weir",
      ownerId: "00000000-0000-0000-0000-000000000267",
      packId: "10000000-0000-0000-0000-000000000275",
      desk: "Privacy Sweep",
      seatId: "20000000-0000-0000-0000-000000000398",
      url: "https://x.ai/bot/L7qSBOOLgC6QuDY3nYc2X",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "TorranceMiller",
      slug: "torrance",
      packName: "Torrance",
      ownerName: "Torrance Miller",
      ownerId: "00000000-0000-0000-0000-000000000268",
      packId: "10000000-0000-0000-0000-000000000276",
      desk: "Blaise",
      seatId: "20000000-0000-0000-0000-000000000399",
      url: "https://x.ai/bot/znOp4qqXQXqNiFvLXhUF5",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "TraderScottyS",
      slug: "scott",
      packName: "Scott",
      ownerName: "Scott S",
      ownerId: "00000000-0000-0000-0000-000000000269",
      packId: "10000000-0000-0000-0000-000000000277",
      desk: "Research Lead",
      seatId: "20000000-0000-0000-0000-000000000400",
      url: "https://x.ai/bot/sF0FLiic1qUdaYsqoHtBL",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "FordCrews",
      slug: "ford",
      packName: "Ford",
      ownerName: "Ford Crews",
      ownerId: "00000000-0000-0000-0000-000000000270",
      packId: "10000000-0000-0000-0000-000000000278",
      desk: "Do You Know It",
      seatId: "20000000-0000-0000-0000-000000000401",
      url: "https://x.ai/bot/qqri--MjKj0It7LYwqYqu",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "BHamilt94615115",
      slug: "bhamilton",
      packName: "BHamilton",
      ownerName: "BHamilton",
      ownerId: "00000000-0000-0000-0000-000000000271",
      packId: "10000000-0000-0000-0000-000000000279",
      desk: "Orchard Sensors",
      seatId: "20000000-0000-0000-0000-000000000402",
      url: "https://x.ai/bot/AXez4BKs4EM9RH9il-XEv",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "KingRomstar",
      slug: "rami",
      packName: "Rami",
      ownerName: "Rami",
      ownerId: "00000000-0000-0000-0000-000000000272",
      packId: "10000000-0000-0000-0000-000000000280",
      desk: "Directory Submitter",
      seatId: "20000000-0000-0000-0000-000000000403",
      url: "https://x.ai/bot/eoGTX8Y6jOoRDBYk5pNe9",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "CarlosSalas",
      slug: "carlos",
      packName: "Carlos",
      ownerName: "Carlos Salas",
      ownerId: "00000000-0000-0000-0000-000000000273",
      packId: "10000000-0000-0000-0000-000000000281",
      desk: "Dee Jay!",
      seatId: "20000000-0000-0000-0000-000000000404",
      url: "https://x.ai/bot/SlaKFOWu18n_PRAmeLkT_",
      seats: 1,
      topic: "media",
    },
    {
      owner: "guysuter",
      slug: "guy",
      packName: "Guy",
      ownerName: "Guy Suter",
      ownerId: "00000000-0000-0000-0000-000000000274",
      packId: "10000000-0000-0000-0000-000000000282",
      desk: "Founder Growth Pilot",
      seatId: "20000000-0000-0000-0000-000000000406",
      url: "https://x.ai/bot/4KvT7CVIPLS35OwLuxcwQ",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "PaPa_Bear5565",
      slug: "papa",
      packName: "Papa",
      ownerName: "Real World Markets",
      ownerId: "00000000-0000-0000-0000-000000000275",
      packId: "10000000-0000-0000-0000-000000000283",
      desk: "Real World Markets Ops",
      seatId: "20000000-0000-0000-0000-000000000407",
      url: "https://x.ai/bot/H6BI53guK-PTP417x1AFn",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "minchoi",
      slug: "min",
      packName: "Min",
      ownerName: "Min Choi",
      ownerId: "00000000-0000-0000-0000-000000000276",
      packId: "10000000-0000-0000-0000-000000000284",
      desk: "Content OS",
      seatId: "20000000-0000-0000-0000-000000000408",
      url: "https://x.ai/bot/eIdFwAQ7gWA4xlpQ71jXf",
      seats: 1,
      topic: "media",
    },
    {
      owner: "esther_confused",
      slug: "esther",
      packName: "Esther",
      ownerName: "Esther is a confused human being",
      ownerId: "00000000-0000-0000-0000-000000000277",
      packId: "10000000-0000-0000-0000-000000000285",
      desk: "company talk",
      seatId: "20000000-0000-0000-0000-000000000409",
      url: "https://x.ai/bot/lAptf_5PxlSgx4w-L9uMt",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "rob_an_",
      slug: "rob",
      packName: "Rob",
      ownerName: "Rob An",
      ownerId: "00000000-0000-0000-0000-000000000278",
      packId: "10000000-0000-0000-0000-000000000286",
      desk: "Class Action Lawsuit Finder",
      seatId: "20000000-0000-0000-0000-000000000410",
      url: "https://x.ai/bot/3Tf_Vk_UR3JJb6Dq3hioZ",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "JugalJg",
      slug: "jugal",
      packName: "Jugal",
      ownerName: "Jugal JG",
      ownerId: "00000000-0000-0000-0000-000000000279",
      packId: "10000000-0000-0000-0000-000000000287",
      desk: "Custom Resume",
      seatId: "20000000-0000-0000-0000-000000000411",
      url: "https://x.ai/bot/lNFp3O9Os-4jAk9_1GMJm",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "gene_alex",
      slug: "gene",
      packName: "Gene",
      ownerName: "Gene Alexander",
      ownerId: "00000000-0000-0000-0000-000000000280",
      packId: "10000000-0000-0000-0000-000000000288",
      desk: "Briefing Ferry",
      seatId: "20000000-0000-0000-0000-000000000412",
      url: "https://x.ai/bot/pm-678wpzU0TQYBWte8mx",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "TheCiscoBryan",
      slug: "cisco",
      packName: "Cisco",
      ownerName: "CiscoBryan",
      ownerId: "00000000-0000-0000-0000-000000000281",
      packId: "10000000-0000-0000-0000-000000000289",
      desk: "Ledger",
      seatId: "20000000-0000-0000-0000-000000000413",
      url: "https://x.ai/bot/5ARm6x7aL6_5N1ETWr_sT",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "thegreatest_sv",
      slug: "kiosa",
      packName: "Kiosa",
      ownerName: "kiosa",
      ownerId: "00000000-0000-0000-0000-000000000282",
      packId: "10000000-0000-0000-0000-000000000290",
      desk: "X Virality Score",
      seatId: "20000000-0000-0000-0000-000000000414",
      url: "https://x.ai/bot/BIvSSU3sukmkTpMeSnft-",
      seats: 1,
      topic: "media",
    },
    {
      owner: "Bilbo_of_Shire",
      slug: "luke",
      packName: "Luke",
      ownerName: "Luke Ognibene",
      ownerId: "00000000-0000-0000-0000-000000000283",
      packId: "10000000-0000-0000-0000-000000000291",
      desk: "Job Bot",
      seatId: "20000000-0000-0000-0000-000000000415",
      url: "https://x.ai/bot/lT4JF6MG0PrcgAYPIY6Nm",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "Zulian",
      slug: "ricardo",
      packName: "Ricardo",
      ownerName: "Ricardo Zulian",
      ownerId: "00000000-0000-0000-0000-000000000284",
      packId: "10000000-0000-0000-0000-000000000292",
      desk: "School Companion",
      seatId: "20000000-0000-0000-0000-000000000416",
      url: "https://x.ai/bot/fnebLkY08y2GCer768ukp",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "orange_boy",
      slug: "vlad",
      packName: "Vlad",
      ownerName: "Vlad P",
      ownerId: "00000000-0000-0000-0000-000000000285",
      packId: "10000000-0000-0000-0000-000000000293",
      desk: "Ćevbo · Soul Broker",
      seatId: "20000000-0000-0000-0000-000000000417",
      url: "https://x.ai/bot/52MysHk4AuXQs0nWbxQF2",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "apostlejohn",
      slug: "john",
      packName: "John",
      ownerName: "John Welty",
      ownerId: "00000000-0000-0000-0000-000000000286",
      packId: "10000000-0000-0000-0000-000000000294",
      desk: "Newsie",
      seatId: "20000000-0000-0000-0000-000000000418",
      url: "https://x.ai/bot/q631iJtHVwxloj8ZBoJyV",
      seats: 1,
      topic: "media",
    },
    {
      owner: "JonStenstrom",
      slug: "jon",
      packName: "Jon",
      ownerName: "Jon Stenstrom",
      ownerId: "00000000-0000-0000-0000-000000000287",
      packId: "10000000-0000-0000-0000-000000000295",
      desk: "Profit Finder",
      seatId: "20000000-0000-0000-0000-000000000419",
      url: "https://x.ai/bot/vc-0ahZfJwuo-DyPUcmj7",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "joshuastowell25",
      slug: "joshua",
      packName: "Joshua",
      ownerName: "Joshua Stowell",
      ownerId: "00000000-0000-0000-0000-000000000288",
      packId: "10000000-0000-0000-0000-000000000296",
      desk: "Path Consolidator Bot",
      seatId: "20000000-0000-0000-0000-000000000420",
      url: "https://x.ai/bot/wL-TZSSeq-ZkLoogQGjU-",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "RKunk",
      slug: "ryan",
      packName: "Ryan",
      ownerName: "Ryan",
      ownerId: "00000000-0000-0000-0000-000000000289",
      packId: "10000000-0000-0000-0000-000000000297",
      desk: "Chief of Staff",
      seatId: "20000000-0000-0000-0000-000000000421",
      url: "https://x.ai/bot/Z_D5RFPPjXhQhGVNXG2-Y",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "MarinCountyman",
      slug: "mark",
      packName: "Mark",
      ownerName: "Mark Hill",
      ownerId: "00000000-0000-0000-0000-000000000290",
      packId: "10000000-0000-0000-0000-000000000298",
      desk: "MDH Hill Charts",
      seatId: "20000000-0000-0000-0000-000000000422",
      url: "https://x.ai/bot/Mmcfff6ubyzhSnqMAQ3NA",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "KellehEyad",
      slug: "eyad",
      packName: "Eyad",
      ownerName: "Eyad Kelleh",
      ownerId: "00000000-0000-0000-0000-000000000291",
      packId: "10000000-0000-0000-0000-000000000299",
      desk: "Mother Ship",
      seatId: "20000000-0000-0000-0000-000000000423",
      url: "https://x.ai/bot/WBmiRJCwxzSCBHBTdC1wi",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "csapperson",
      slug: "chris",
      packName: "Chris",
      ownerName: "Christopher Apperson",
      ownerId: "00000000-0000-0000-0000-000000000292",
      packId: "10000000-0000-0000-0000-000000000300",
      desk: "HVAC, Doors, and Home Assistant",
      seatId: "20000000-0000-0000-0000-000000000424",
      url: "https://x.ai/bot/tF0ckH21ZT7L1CN3HOyHl",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "sweetpollybred",
      slug: "dana",
      packName: "Dana",
      ownerName: "Dana",
      ownerId: "00000000-0000-0000-0000-000000000293",
      packId: "10000000-0000-0000-0000-000000000301",
      desk: "Studio Assistant",
      seatId: "20000000-0000-0000-0000-000000000425",
      url: "https://x.ai/bot/Z411hW0fpQZunKK8t-8gH",
      seats: 1,
      topic: "media",
    },
    {
      owner: "MattMatthews121",
      slug: "matt",
      packName: "Matt",
      ownerName: "Matt Matthews",
      ownerId: "00000000-0000-0000-0000-000000000294",
      packId: "10000000-0000-0000-0000-000000000302",
      desk: "Health Coach",
      seatId: "20000000-0000-0000-0000-000000000426",
      url: "https://x.ai/bot/HBKDOnEeqhfLyev8MalAt",
      seats: 1,
      topic: "clinic",
    },
    {
      owner: "benoror",
      slug: "ben",
      packName: "Ben",
      ownerName: "Ben Orozco",
      ownerId: "00000000-0000-0000-0000-000000000295",
      packId: "10000000-0000-0000-0000-000000000303",
      desk: "Bender",
      seatId: "20000000-0000-0000-0000-000000000427",
      url: "https://x.ai/bot/KvPUjItGazccrvGwOm401",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "3dKelvic",
      slug: "kelvic",
      packName: "Kelvic",
      ownerName: "KELVIC-3D",
      ownerId: "00000000-0000-0000-0000-000000000296",
      packId: "10000000-0000-0000-0000-000000000304",
      desk: "Web-Op",
      seatId: "20000000-0000-0000-0000-000000000428",
      url: "https://x.ai/bot/Aii63wFn_TPj5MvF7fDyS",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "ProofofMaro",
      slug: "maro",
      packName: "Maro",
      ownerName: "maro",
      ownerId: "00000000-0000-0000-0000-000000000297",
      packId: "10000000-0000-0000-0000-000000000305",
      desk: "MaroBot",
      seatId: "20000000-0000-0000-0000-000000000430",
      url: "https://x.ai/bot/JaqEBG9Fah4MNpLJHVvbu",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "FrankYin17",
      slug: "frank",
      packName: "Frank",
      ownerName: "Frank Yin",
      ownerId: "00000000-0000-0000-0000-000000000298",
      packId: "10000000-0000-0000-0000-000000000306",
      desk: "Remote Grok Build",
      seatId: "20000000-0000-0000-0000-000000000431",
      url: "https://x.ai/bot/dLYpR1sSkG0VLa8-faEgX",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "itsryanlenk",
      slug: "ryan",
      packName: "Ryan",
      ownerName: "Ryan Lenk",
      ownerId: "00000000-0000-0000-0000-000000000299",
      packId: "10000000-0000-0000-0000-000000000307",
      desk: "Wainwright Manager",
      seatId: "20000000-0000-0000-0000-000000000432",
      url: "https://x.ai/bot/TqyhVfSrAYZ-xQSrD_x1A",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "KacperRutk",
      slug: "kacper",
      packName: "Kacper",
      ownerName: "Kacper Rutkiewicz",
      ownerId: "00000000-0000-0000-0000-000000000300",
      packId: "10000000-0000-0000-0000-000000000308",
      desk: "SniffBot",
      seatId: "20000000-0000-0000-0000-000000000433",
      url: "https://x.ai/bot/r3zhR2taB4UL6qkApsgau",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "maxfaubert",
      slug: "max",
      packName: "Max",
      ownerName: "Maximilien Faubert",
      ownerId: "00000000-0000-0000-0000-000000000301",
      packId: "10000000-0000-0000-0000-000000000309",
      desk: "Historian",
      seatId: "20000000-0000-0000-0000-000000000434",
      url: "https://x.ai/bot/hHiqd6PMMJ3whDUBCQkDG",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "monomyth",
      slug: "eugene",
      packName: "Eugene",
      ownerName: "Eugene Ray",
      ownerId: "00000000-0000-0000-0000-000000000302",
      packId: "10000000-0000-0000-0000-000000000310",
      desk: "Yusician",
      seatId: "20000000-0000-0000-0000-000000000435",
      url: "https://x.ai/bot/xpTH6yslvNJuuPq5mO01a",
      seats: 5,
      topic: "media",
    },
    {
      owner: "TheNextGreatEra",
      slug: "nge",
      packName: "Nge",
      ownerName: "Nge",
      ownerId: "00000000-0000-0000-0000-000000000303",
      packId: "10000000-0000-0000-0000-000000000311",
      desk: "Podcast Pipeline",
      seatId: "20000000-0000-0000-0000-000000000436",
      url: "https://x.ai/bot/5wqj5ihszSFeGjNBjK8Mn",
      seats: 1,
      topic: "media",
    },
    {
      owner: "lafraia",
      slug: "daniel",
      packName: "Daniel",
      ownerName: "Daniel Lafraia",
      ownerId: "00000000-0000-0000-0000-000000000304",
      packId: "10000000-0000-0000-0000-000000000312",
      desk: "OwnPhoneBot",
      seatId: "20000000-0000-0000-0000-000000000437",
      url: "https://x.ai/bot/yaQTHVqOMscKBYYDAfNoP",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "ignota_regalis",
      slug: "ignota",
      packName: "Ignota",
      ownerName: "Ignota",
      ownerId: "00000000-0000-0000-0000-000000000305",
      packId: "10000000-0000-0000-0000-000000000313",
      desk: "Alley Cat",
      seatId: "20000000-0000-0000-0000-000000000438",
      url: "https://x.ai/bot/e1XwuT5B35AAqLsMfGbfg",
      seats: 3,
      topic: "founder",
    },
    {
      owner: "IAmMichaelSweet",
      slug: "michael",
      packName: "Michael",
      ownerName: "Michael Sweet",
      ownerId: "00000000-0000-0000-0000-000000000306",
      packId: "10000000-0000-0000-0000-000000000314",
      desk: "Steve",
      seatId: "20000000-0000-0000-0000-000000000439",
      url: "https://x.ai/bot/tVFpcwYEBXW4ReAFni6Cn",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "dode",
      slug: "dode",
      packName: "Dode",
      ownerName: "Dodes",
      ownerId: "00000000-0000-0000-0000-000000000307",
      packId: "10000000-0000-0000-0000-000000000315",
      desk: "Governator",
      seatId: "20000000-0000-0000-0000-000000000441",
      url: "https://x.ai/bot/LoPqRp44sI8sHRpNN9Kq-",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "salterworld",
      slug: "tim",
      packName: "Tim",
      ownerName: "Tim Salter",
      ownerId: "00000000-0000-0000-0000-000000000308",
      packId: "10000000-0000-0000-0000-000000000316",
      desk: "Team Ninja + Self-learning Skills Loop",
      seatId: "20000000-0000-0000-0000-000000000442",
      url: "https://x.ai/bot/uoHxMMgZfiJTymQ0dA9g8",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "BragiHelvig",
      slug: "bragi",
      packName: "Bragi",
      ownerName: "Bragi Helvig (Quiet Giant)",
      ownerId: "00000000-0000-0000-0000-000000000309",
      packId: "10000000-0000-0000-0000-000000000317",
      desk: "Marketing Bot",
      seatId: "20000000-0000-0000-0000-000000000443",
      url: "https://x.ai/bot/FaMbaDOO2WceFyiKDu6_6",
      seats: 1,
      topic: "media",
    },
    {
      owner: "robannand",
      slug: "robert",
      packName: "Robert",
      ownerName: "Robert Annand",
      ownerId: "00000000-0000-0000-0000-000000000310",
      packId: "10000000-0000-0000-0000-000000000318",
      desk: "Estack",
      seatId: "20000000-0000-0000-0000-000000000444",
      url: "https://x.ai/bot/R0acF6Pmp8YewSZm6fA-D",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "CarolinaDill",
      slug: "carolina",
      packName: "Carolina",
      ownerName: "Carolina Dill",
      ownerId: "00000000-0000-0000-0000-000000000311",
      packId: "10000000-0000-0000-0000-000000000319",
      desk: "GrokBotScout",
      seatId: "20000000-0000-0000-0000-000000000445",
      url: "https://x.ai/bot/_KMuKhK4yVbCD8BVLhvAP",
      seats: 8,
      topic: "founder",
    },
    {
      owner: "CoryBishop15",
      slug: "cory",
      packName: "Cory",
      ownerName: "Cory Bishop",
      ownerId: "00000000-0000-0000-0000-000000000312",
      packId: "10000000-0000-0000-0000-000000000320",
      desk: "Trade Ops Director",
      seatId: "20000000-0000-0000-0000-000000000446",
      url: "https://x.ai/bot/uRig0yNXuYwcODXk_F88f",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "raitec",
      slug: "ricardo",
      packName: "Ricardo",
      ownerName: "Ricardo Accioly",
      ownerId: "00000000-0000-0000-0000-000000000313",
      packId: "10000000-0000-0000-0000-000000000321",
      desk: "Homebase",
      seatId: "20000000-0000-0000-0000-000000000448",
      url: "https://x.ai/bot/WZ7amxhH9gXXBEaGmg0un",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "choko_milkty",
      slug: "choko",
      packName: "Choko",
      ownerName: "초코넛밀크티",
      ownerId: "00000000-0000-0000-0000-000000000314",
      packId: "10000000-0000-0000-0000-000000000322",
      desk: "메일 정리봇",
      seatId: "20000000-0000-0000-0000-000000000449",
      url: "https://x.ai/bot/gLV5mUN4vqHFKsCSn_DTO",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "KareenMallet",
      slug: "kareen",
      packName: "Kareen",
      ownerName: "Kareen Mallet",
      ownerId: "00000000-0000-0000-0000-000000000315",
      packId: "10000000-0000-0000-0000-000000000323",
      desk: "Learning DNA",
      seatId: "20000000-0000-0000-0000-000000000450",
      url: "https://x.ai/bot/xm3G76TSxi1dcG4qwebvm",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "uzairansar",
      slug: "uzair",
      packName: "Uzair",
      ownerName: "Uzi",
      ownerId: "00000000-0000-0000-0000-000000000316",
      packId: "10000000-0000-0000-0000-000000000324",
      desk: "Home Hunter",
      seatId: "20000000-0000-0000-0000-000000000451",
      url: "https://x.ai/bot/ljzXIgAQcGOV0QxYjHH8I",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "wolfe_jam",
      slug: "james",
      packName: "James",
      ownerName: "James | wolfejam | faf.one",
      ownerId: "00000000-0000-0000-0000-000000000317",
      packId: "10000000-0000-0000-0000-000000000325",
      desk: "Dealer",
      seatId: "20000000-0000-0000-0000-000000000452",
      url: "https://x.ai/bot/nbUWXUqcXIA0HNQQ3R1Bu",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "myGuyPye",
      slug: "paul",
      packName: "Paul",
      ownerName: "PyeGuy",
      ownerId: "00000000-0000-0000-0000-000000000318",
      packId: "10000000-0000-0000-0000-000000000326",
      desk: "Replay",
      seatId: "20000000-0000-0000-0000-000000000453",
      url: "https://x.ai/bot/4mICdo5bR2FyghKoOZve5",
      seats: 1,
      topic: "media",
    },
    {
      owner: "cyberandres",
      slug: "andres",
      packName: "Andres",
      ownerName: "CyberAndres | Punto Tricolor",
      ownerId: "00000000-0000-0000-0000-000000000319",
      packId: "10000000-0000-0000-0000-000000000327",
      desk: "Punto Tricolor Ops",
      seatId: "20000000-0000-0000-0000-000000000456",
      url: "https://x.ai/bot/ARSoBhGtQqYPT2Nu44ABi",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "hammerton",
      slug: "shane",
      packName: "Shane",
      ownerName: "Shane Hamilton",
      ownerId: "00000000-0000-0000-0000-000000000320",
      packId: "10000000-0000-0000-0000-000000000328",
      desk: "Voice Calls",
      seatId: "20000000-0000-0000-0000-000000000457",
      url: "https://x.ai/bot/X8nyQdKULzWau6NPoYZtf",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "scottslabio",
      slug: "scott",
      packName: "Scott",
      ownerName: "Scott",
      ownerId: "00000000-0000-0000-0000-000000000321",
      packId: "10000000-0000-0000-0000-000000000329",
      desk: "Syncwright",
      seatId: "20000000-0000-0000-0000-000000000458",
      url: "https://x.ai/bot/0_f9wcIpoq9TZ5E_RZrwb",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "Davesacritic",
      slug: "david",
      packName: "David",
      ownerName: "David",
      ownerId: "00000000-0000-0000-0000-000000000322",
      packId: "10000000-0000-0000-0000-000000000330",
      desk: "Jarvis",
      seatId: "20000000-0000-0000-0000-000000000459",
      url: "https://x.ai/bot/cVFusYdAgGA9GY8wHPl2x",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "the_Arow_H",
      slug: "dartagnan",
      packName: "Dartagnan",
      ownerName: "D'Artagnan",
      ownerId: "00000000-0000-0000-0000-000000000323",
      packId: "10000000-0000-0000-0000-000000000331",
      desk: "Unicron",
      seatId: "20000000-0000-0000-0000-000000000460",
      url: "https://x.ai/bot/LIoSGK9L2p0pCeApCmS1g",
      seats: 4,
      topic: "founder",
    },
    {
      owner: "Pinuts_",
      slug: "pinuts",
      packName: "Pinuts",
      ownerName: "Mathieu | SaaS Maker",
      ownerId: "00000000-0000-0000-0000-000000000324",
      packId: "10000000-0000-0000-0000-000000000332",
      desk: "Sentry OPS",
      seatId: "20000000-0000-0000-0000-000000000461",
      url: "https://x.ai/bot/ZFQ35fLdqLdzDyI_TQoGZ",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "coolbat1999",
      slug: "tony",
      packName: "Tony",
      ownerName: "Coolbat",
      ownerId: "00000000-0000-0000-0000-000000000325",
      packId: "10000000-0000-0000-0000-000000000333",
      desk: "Travel Grok",
      seatId: "20000000-0000-0000-0000-000000000462",
      url: "https://x.ai/bot/4YWzzAP8Di9B4DnYd3Uzo",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "dzbeitz",
      slug: "starlord",
      packName: "Starlord",
      ownerName: "David Z Beitz",
      ownerId: "00000000-0000-0000-0000-000000000326",
      packId: "10000000-0000-0000-0000-000000000334",
      desk: "Property Visit",
      seatId: "20000000-0000-0000-0000-000000000463",
      url: "https://x.ai/bot/85qsR6t4r8jI3oKbPm5Uu",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "trevin",
      slug: "trevin",
      packName: "Trevin",
      ownerName: "Trevin Chow",
      ownerId: "00000000-0000-0000-0000-000000000327",
      packId: "10000000-0000-0000-0000-000000000335",
      desk: "Commute Comrade",
      seatId: "20000000-0000-0000-0000-000000000464",
      url: "https://x.ai/bot/eyMdVOKBwSBwp63MX2fxy",
      seats: 2,
      topic: "founder",
    },
    {
      owner: "JGabrielGruber",
      slug: "jose",
      packName: "Jose",
      ownerName: "José Gabriel Gruber",
      ownerId: "00000000-0000-0000-0000-000000000328",
      packId: "10000000-0000-0000-0000-000000000336",
      desk: "Grok",
      seatId: "20000000-0000-0000-0000-000000000465",
      url: "https://x.ai/bot/XGIep-r89FqSquTEKtd1f",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "crisvallory",
      slug: "cristiano",
      packName: "Cristiano",
      ownerName: "Cristiano Vallory",
      ownerId: "00000000-0000-0000-0000-000000000329",
      packId: "10000000-0000-0000-0000-000000000337",
      desk: "Termômetro Eleitoral",
      seatId: "20000000-0000-0000-0000-000000000466",
      url: "https://x.ai/bot/n6DQhcTSPHdlVpQtEinpS",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "kirby_jed",
      slug: "jed",
      packName: "Jed",
      ownerName: "JedKirby",
      ownerId: "00000000-0000-0000-0000-000000000330",
      packId: "10000000-0000-0000-0000-000000000338",
      desk: "Range Safety",
      seatId: "20000000-0000-0000-0000-000000000467",
      url: "https://x.ai/bot/pbFUUD8wVI14rACIQ40YY",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "derekvfx",
      slug: "derek",
      packName: "Derek",
      ownerName: "derekvfx",
      ownerId: "00000000-0000-0000-0000-000000000331",
      packId: "10000000-0000-0000-0000-000000000339",
      desk: "Free Contest",
      seatId: "20000000-0000-0000-0000-000000000469",
      url: "https://x.ai/bot/duPnEjDq9SYTK2nAyPDj4",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "usaps",
      slug: "jeronimo",
      packName: "Jeronimo",
      ownerName: "Jero",
      ownerId: "00000000-0000-0000-0000-000000000332",
      packId: "10000000-0000-0000-0000-000000000340",
      desk: "CMDI Ingest",
      seatId: "20000000-0000-0000-0000-000000000470",
      url: "https://x.ai/bot/Mpk0GQurVy7idutEgKKUF",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "ToddATrevino",
      slug: "todd",
      packName: "Todd",
      ownerName: "ToddATrevino",
      ownerId: "00000000-0000-0000-0000-000000000333",
      packId: "10000000-0000-0000-0000-000000000341",
      desk: "San Martín Watch",
      seatId: "20000000-0000-0000-0000-000000000471",
      url: "https://x.ai/bot/dXPRQwRlwI9_jip6vFYoT",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "howellsh",
      slug: "scott",
      packName: "Scott",
      ownerName: "Scott",
      ownerId: "00000000-0000-0000-0000-000000000334",
      packId: "10000000-0000-0000-0000-000000000342",
      desk: "defendMusk bot",
      seatId: "20000000-0000-0000-0000-000000000472",
      url: "https://x.ai/bot/vS-vrOlLKSpXsTmBxPL57",
      seats: 1,
      topic: "media",
    },
    {
      owner: "sankygrocks",
      slug: "sanket",
      packName: "Sanket",
      ownerName: "Sanket",
      ownerId: "00000000-0000-0000-0000-000000000335",
      packId: "10000000-0000-0000-0000-000000000343",
      desk: "Job Applyer",
      seatId: "20000000-0000-0000-0000-000000000473",
      url: "https://x.ai/bot/zP-tzi_isEHluq8_NdYEf",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "jbrianfrancis",
      slug: "brian",
      packName: "Brian",
      ownerName: "Brian",
      ownerId: "00000000-0000-0000-0000-000000000336",
      packId: "10000000-0000-0000-0000-000000000344",
      desk: "Rick Steves",
      seatId: "20000000-0000-0000-0000-000000000474",
      url: "https://x.ai/bot/1wQ3XiODIFFSCKrkDApu3",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "felipe_fyre",
      slug: "fyre",
      packName: "Fyre",
      ownerName: "Fyre",
      ownerId: "00000000-0000-0000-0000-000000000337",
      packId: "10000000-0000-0000-0000-000000000345",
      desk: "Sherlock Holmes",
      seatId: "20000000-0000-0000-0000-000000000475",
      url: "https://x.ai/bot/Ftp8JyxBU9oeZa5V1YTDn",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "Lex_Vasquez23",
      slug: "alex",
      packName: "Alex",
      ownerName: "Alex",
      ownerId: "00000000-0000-0000-0000-000000000338",
      packId: "10000000-0000-0000-0000-000000000346",
      desk: "Chase",
      seatId: "20000000-0000-0000-0000-000000000476",
      url: "https://x.ai/bot/3hissja8d2xjHliXdnmm4",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "zhirafovod",
      slug: "sergey",
      packName: "Sergey",
      ownerName: "Sergey",
      ownerId: "00000000-0000-0000-0000-000000000339",
      packId: "10000000-0000-0000-0000-000000000347",
      desk: "Data Materializer",
      seatId: "20000000-0000-0000-0000-000000000477",
      url: "https://x.ai/bot/fYnk17DG7ctOODqZDJydF",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "shawnmckee",
      slug: "shawn",
      packName: "Shawn",
      ownerName: "Shawn",
      ownerId: "00000000-0000-0000-0000-000000000340",
      packId: "10000000-0000-0000-0000-000000000348",
      desk: "MacBuild",
      seatId: "20000000-0000-0000-0000-000000000478",
      url: "https://x.ai/bot/8sA76Cs0vZMy9ROtq8Rn2",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "SauloLondono",
      slug: "saulo",
      packName: "Saulo",
      ownerName: "Saulo",
      ownerId: "00000000-0000-0000-0000-000000000341",
      packId: "10000000-0000-0000-0000-000000000349",
      desk: "Docket",
      seatId: "20000000-0000-0000-0000-000000000479",
      url: "https://x.ai/bot/Dv6-DIhzFpqJ4-VMMibNT",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "shootthebull",
      slug: "mike",
      packName: "Mike",
      ownerName: "Mike",
      ownerId: "00000000-0000-0000-0000-000000000342",
      packId: "10000000-0000-0000-0000-000000000350",
      desk: "Hal",
      seatId: "20000000-0000-0000-0000-000000000480",
      url: "https://x.ai/bot/2daEJSUffM8-Dcn2MJjrQ",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "pareshdesai",
      slug: "paresh",
      packName: "Paresh",
      ownerName: "Paresh",
      ownerId: "00000000-0000-0000-0000-000000000343",
      packId: "10000000-0000-0000-0000-000000000351",
      desk: "Web Security Audit",
      seatId: "20000000-0000-0000-0000-000000000481",
      url: "https://x.ai/bot/Xdx94lJlv-xK14WF6yzVR",
      seats: 2,
      topic: "developer",
    },
    {
      owner: "WorkWithJodi",
      slug: "jodi",
      packName: "Jodi",
      ownerName: "Jodi Stott",
      ownerId: "00000000-0000-0000-0000-000000000344",
      packId: "10000000-0000-0000-0000-000000000352",
      desk: "Squirrel",
      seatId: "20000000-0000-0000-0000-000000000482",
      url: "https://x.ai/bot/wOQJr4ZMV3db830YErtOw",
      seats: 6,
      topic: "founder",
    },
    {
      owner: "SLamouroux",
      slug: "stephanie",
      packName: "Stephanie",
      ownerName: "S Lamouroux",
      ownerId: "00000000-0000-0000-0000-000000000345",
      packId: "10000000-0000-0000-0000-000000000353",
      desk: "Packet Wrangler Range Rider",
      seatId: "20000000-0000-0000-0000-000000000485",
      url: "https://x.ai/bot/QeblYPmzNFIbeCJR_dKyS",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "csputerbaugh1",
      slug: "chadwick",
      packName: "Chadwick",
      ownerName: "Chadwick",
      ownerId: "00000000-0000-0000-0000-000000000346",
      packId: "10000000-0000-0000-0000-000000000354",
      desk: "Countdown",
      seatId: "20000000-0000-0000-0000-000000000486",
      url: "https://x.ai/bot/zrbXLuz-YKUfqa5kSapWQ",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "kleosrr",
      slug: "mario",
      packName: "Mario",
      ownerName: "Mario",
      ownerId: "00000000-0000-0000-0000-000000000347",
      packId: "10000000-0000-0000-0000-000000000355",
      desk: "JevBot",
      seatId: "20000000-0000-0000-0000-000000000487",
      url: "https://x.ai/bot/of2iJ-g4hgWF1v9_tNBDY",
      seats: 2,
      topic: "developer",
    },
    {
      owner: "kittenworth",
      slug: "avalon",
      packName: "Avalon",
      ownerName: "Avalon",
      ownerId: "00000000-0000-0000-0000-000000000348",
      packId: "10000000-0000-0000-0000-000000000356",
      desk: "YVenture",
      seatId: "20000000-0000-0000-0000-000000000488",
      url: "https://x.ai/bot/502iRcu35kF-eyMr7M1dZ",
      seats: 2,
      topic: "founder",
    },
    {
      owner: "pcoxproductions",
      slug: "preston",
      packName: "Preston",
      ownerName: "Preston",
      ownerId: "00000000-0000-0000-0000-000000000349",
      packId: "10000000-0000-0000-0000-000000000357",
      desk: "Bouncer",
      seatId: "20000000-0000-0000-0000-000000000489",
      url: "https://x.ai/bot/fcAnJJxw7NU_zL0Zq6Ixo",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "nikocallas",
      slug: "niko",
      packName: "Niko",
      ownerName: "Niko Callas",
      ownerId: "00000000-0000-0000-0000-000000000350",
      packId: "10000000-0000-0000-0000-000000000358",
      desk: "Not Elon",
      seatId: "20000000-0000-0000-0000-000000000491",
      url: "https://x.ai/bot/llrBTI8TFUB8tdac2JAtK",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "zalberico",
      slug: "zach",
      packName: "Zach",
      ownerName: "Zach",
      ownerId: "00000000-0000-0000-0000-000000000351",
      packId: "10000000-0000-0000-0000-000000000359",
      desk: "Family Daily",
      seatId: "20000000-0000-0000-0000-000000000492",
      url: "https://x.ai/bot/FwJmagPaEeQ_so8TTK1gh",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "imrannotes",
      slug: "imran",
      packName: "Imran",
      ownerName: "Imran Sayed",
      ownerId: "00000000-0000-0000-0000-000000000353",
      packId: "10000000-0000-0000-0000-000000000361",
      desk: "Wallet Watcher",
      seatId: "20000000-0000-0000-0000-000000000494",
      url: "https://x.ai/bot/S53Q85p1XVjLKmRcnhPcO",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "dodgeking3171",
      slug: "nathan",
      packName: "Nathan",
      ownerName: "Nathan Braner",
      ownerId: "00000000-0000-0000-0000-000000000354",
      packId: "10000000-0000-0000-0000-000000000362",
      desk: "Solo Founder Ops Desk",
      seatId: "20000000-0000-0000-0000-000000000495",
      url: "https://x.ai/bot/4evc9gtDOCrFt5vMCg0HG",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "danielhayesmith",
      slug: "daniel",
      packName: "Daniel",
      ownerName: "Daniel Hayes Smith",
      ownerId: "00000000-0000-0000-0000-000000000355",
      packId: "10000000-0000-0000-0000-000000000363",
      desk: "Deal Scout",
      seatId: "20000000-0000-0000-0000-000000000496",
      url: "https://x.ai/bot/5x_HQ9uoBCHPYvf9vbUMN",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "BlazeDrinkwine",
      slug: "blaze",
      packName: "Blaze",
      ownerName: "Blaze Drinkwine",
      ownerId: "00000000-0000-0000-0000-000000000356",
      packId: "10000000-0000-0000-0000-000000000364",
      desk: "Ag bot",
      seatId: "20000000-0000-0000-0000-000000000497",
      url: "https://x.ai/bot/vgZX7X2-hh1iC6vmmDHoh",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "TheEdibleAnus",
      slug: "edibleanus",
      packName: "Edibleanus",
      ownerName: "EdibleAnus",
      ownerId: "00000000-0000-0000-0000-000000000357",
      packId: "10000000-0000-0000-0000-000000000365",
      desk: "Chief of Staff",
      seatId: "20000000-0000-0000-0000-000000000498",
      url: "https://x.ai/bot/ykFn3jqs0q5cn3tWg16U4",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "UnoMasReactor",
      slug: "steffan",
      packName: "Steffan",
      ownerName: "Steffan Szumowski",
      ownerId: "00000000-0000-0000-0000-000000000358",
      packId: "10000000-0000-0000-0000-000000000366",
      desk: "Adam",
      seatId: "20000000-0000-0000-0000-000000000500",
      url: "https://x.ai/bot/ljkUXjCmdkW4XJHWRJxFn",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "EricBuess",
      slug: "eric",
      packName: "Eric",
      ownerName: "Eric Buess",
      ownerId: "00000000-0000-0000-0000-000000000359",
      packId: "10000000-0000-0000-0000-000000000367",
      desk: "Top Coder",
      seatId: "20000000-0000-0000-0000-000000000501",
      url: "https://x.ai/bot/dwuB7MmlnrkcXYtyOp-Hk",
      seats: 3,
      topic: "developer",
    },
    {
      owner: "arturorodes",
      slug: "arturo",
      packName: "Arturo",
      ownerName: "Arturo Rodés",
      ownerId: "00000000-0000-0000-0000-000000000360",
      packId: "10000000-0000-0000-0000-000000000368",
      desk: "Hormozi Money Models",
      seatId: "20000000-0000-0000-0000-000000000504",
      url: "https://x.ai/bot/5YvX0dqXaRzi1lYZJz6F0",
      seats: 3,
      topic: "founder",
    },
    {
      owner: "chadparris",
      slug: "chad",
      packName: "Chad",
      ownerName: "Chad Parris",
      ownerId: "00000000-0000-0000-0000-000000000361",
      packId: "10000000-0000-0000-0000-000000000369",
      desk: "PROMPT EDITOR",
      seatId: "20000000-0000-0000-0000-000000000508",
      url: "https://x.ai/bot/3SExQeiS4pwalaUG-7YM1",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "GillesGuenette3",
      slug: "gilles",
      packName: "Gilles",
      ownerName: "Gilles Guenette",
      ownerId: "00000000-0000-0000-0000-000000000362",
      packId: "10000000-0000-0000-0000-000000000370",
      desk: "Henry",
      seatId: "20000000-0000-0000-0000-000000000509",
      url: "https://x.ai/bot/4V0rzExpIY19WpNGt71Fp",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "mike_mcconnon12",
      slug: "mike",
      packName: "Mike",
      ownerName: "Mike McConnon",
      ownerId: "00000000-0000-0000-0000-000000000363",
      packId: "10000000-0000-0000-0000-000000000371",
      desk: "Creator Content Download",
      seatId: "20000000-0000-0000-0000-000000000510",
      url: "https://x.ai/bot/u1m_h-MM1Z7AyPXILn639",
      seats: 1,
      topic: "media",
    },
    {
      owner: "graceclarke",
      slug: "grace",
      packName: "Grace",
      ownerName: "Grace Clarke",
      ownerId: "00000000-0000-0000-0000-000000000364",
      packId: "10000000-0000-0000-0000-000000000372",
      desk: "The Morning Light (Newspaper)",
      seatId: "20000000-0000-0000-0000-000000000511",
      url: "https://x.ai/bot/O3Egi46yuoheU_7h1pSt-",
      seats: 2,
      topic: "media",
    },
    {
      owner: "weeb3dev",
      slug: "alberto",
      packName: "Alberto",
      ownerName: "Alberto Jauregui",
      ownerId: "00000000-0000-0000-0000-000000000365",
      packId: "10000000-0000-0000-0000-000000000373",
      desk: "obsidian",
      seatId: "20000000-0000-0000-0000-000000000512",
      url: "https://x.ai/bot/tukhb8f4XyUJFkRWlHWaz",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "KatheTrivinoG",
      slug: "katherine",
      packName: "Katherine",
      ownerName: "Katherine Triviño",
      ownerId: "00000000-0000-0000-0000-000000000366",
      packId: "10000000-0000-0000-0000-000000000374",
      desk: "Asistente Contable - Colombia",
      seatId: "20000000-0000-0000-0000-000000000513",
      url: "https://x.ai/bot/roAIOBqaMNIijMjrAaI7C",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "ChrisAdcockMD",
      slug: "chris",
      packName: "Chris",
      ownerName: "Chris Adcock MD",
      ownerId: "00000000-0000-0000-0000-000000000367",
      packId: "10000000-0000-0000-0000-000000000375",
      desk: "Jev for Grok Bot",
      seatId: "20000000-0000-0000-0000-000000000514",
      url: "https://x.ai/bot/sM_Xi4OF09cGU8KGyLvlC",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "Roland_RADPCs",
      slug: "rad",
      packName: "Rad",
      ownerName: "RAD PCs",
      ownerId: "00000000-0000-0000-0000-000000000368",
      packId: "10000000-0000-0000-0000-000000000376",
      desk: "Homer",
      seatId: "20000000-0000-0000-0000-000000000519",
      url: "https://x.ai/bot/GK4GLi9V0teYEEe2Cxh2i",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "RGarrick2",
      slug: "r-garrick",
      packName: "R. Garrick",
      ownerName: "R. Garrick",
      ownerId: "00000000-0000-0000-0000-000000000369",
      packId: "10000000-0000-0000-0000-000000000377",
      desk: "Tax Harbor",
      seatId: "20000000-0000-0000-0000-000000000520",
      url: "https://x.ai/bot/KxgpoMk2AH230cNwYUCcU",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "_lovablecurves",
      slug: "lovable",
      packName: "Lovable",
      ownerName: "Lovable",
      ownerId: "00000000-0000-0000-0000-000000000370",
      packId: "10000000-0000-0000-0000-000000000378",
      desk: "Mailchimp Monthly Blast",
      seatId: "20000000-0000-0000-0000-000000000521",
      url: "https://x.ai/bot/lcGQv8_I7UvJEWs3833LR",
      seats: 5,
      topic: "founder",
    },
    {
      owner: "ethan_leee9113",
      slug: "ethan",
      packName: "Ethan",
      ownerName: "Ethan",
      ownerId: "00000000-0000-0000-0000-000000000371",
      packId: "10000000-0000-0000-0000-000000000379",
      desk: "LinkedIn Lead Outreach",
      seatId: "20000000-0000-0000-0000-000000000523",
      url: "https://x.ai/bot/DEMmOi7SiFhsFtIKuBKRD",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "McNeely",
      slug: "paul",
      packName: "Paul",
      ownerName: "Paul L. McNeely",
      ownerId: "00000000-0000-0000-0000-000000000372",
      packId: "10000000-0000-0000-0000-000000000380",
      desk: "Daili",
      seatId: "20000000-0000-0000-0000-000000000524",
      url: "https://x.ai/bot/CB1TyiGiWtuusC-uuLX6X",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "VYCanisMajori",
      slug: "vyan",
      packName: "Vyan",
      ownerName: "V.Y@n",
      ownerId: "00000000-0000-0000-0000-000000000373",
      packId: "10000000-0000-0000-0000-000000000381",
      desk: "Orbit brief",
      seatId: "20000000-0000-0000-0000-000000000525",
      url: "https://x.ai/bot/EkX7yjLCie8Phae6Fh4nE",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "paulovitorjp",
      slug: "paulo",
      packName: "Paulo",
      ownerName: "Paulo",
      ownerId: "00000000-0000-0000-0000-000000000374",
      packId: "10000000-0000-0000-0000-000000000382",
      desk: "Done",
      seatId: "20000000-0000-0000-0000-000000000526",
      url: "https://x.ai/bot/GsaAJ6kySI1O1sM7kiMiK",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "686f6c61",
      slug: "databye",
      packName: "Databye",
      ownerName: "686f6c61",
      ownerId: "00000000-0000-0000-0000-000000000375",
      packId: "10000000-0000-0000-0000-000000000383",
      desk: "DataBye",
      seatId: "20000000-0000-0000-0000-000000000530",
      url: "https://x.ai/bot/-M2E0mNqSbuPgYBEtU-Oa",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "_VincentPeng",
      slug: "vincent",
      packName: "Vincent",
      ownerName: "Vincent",
      ownerId: "00000000-0000-0000-0000-000000000376",
      packId: "10000000-0000-0000-0000-000000000384",
      desk: "Summarize Bot",
      seatId: "20000000-0000-0000-0000-000000000531",
      url: "https://x.ai/bot/9vk3KOm7wJzYVXlyKXxj7",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "elizrdrake",
      slug: "xi",
      packName: "Ξ",
      ownerName: "Ξ",
      ownerId: "00000000-0000-0000-0000-000000000377",
      packId: "10000000-0000-0000-0000-000000000385",
      desk: "Ad Aether",
      seatId: "20000000-0000-0000-0000-000000000532",
      url: "https://x.ai/bot/ZEniQhu4iKrF9w0qlrYq2",
      seats: 3,
      topic: "founder",
    },
    {
      owner: "SacredFolio",
      slug: "drew",
      packName: "Drew",
      ownerName: "Drew",
      ownerId: "00000000-0000-0000-0000-000000000378",
      packId: "10000000-0000-0000-0000-000000000386",
      desk: "Basket Allergen",
      seatId: "20000000-0000-0000-0000-000000000533",
      url: "https://x.ai/bot/ee13wSGPrFYqdZAJnGfI4",
      seats: 2,
      topic: "founder",
    },
    {
      owner: "tilenpoje",
      slug: "tilen",
      packName: "Tilen",
      ownerName: "Tilen",
      ownerId: "00000000-0000-0000-0000-000000000379",
      packId: "10000000-0000-0000-0000-000000000387",
      desk: "Captain William Diego",
      seatId: "20000000-0000-0000-0000-000000000534",
      url: "https://x.ai/bot/F2L8KOuzoN-xKchOZQ4pJ",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "ChrisPadrick",
      slug: "chris",
      packName: "Chris",
      ownerName: "Chris",
      ownerId: "00000000-0000-0000-0000-000000000380",
      packId: "10000000-0000-0000-0000-000000000388",
      desk: "Civic Radar",
      seatId: "20000000-0000-0000-0000-000000000535",
      url: "https://x.ai/bot/18ceCocmLssbw59nEPwhr",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "damianoredem",
      slug: "damiano",
      packName: "Damiano",
      ownerName: "Damiano",
      ownerId: "00000000-0000-0000-0000-000000000381",
      packId: "10000000-0000-0000-0000-000000000389",
      desk: "OS: Ontology Stack",
      seatId: "20000000-0000-0000-0000-000000000536",
      url: "https://x.ai/bot/9Uh8RaBqp6PrcOcZjMHbD",
      seats: 5,
      topic: "founder",
    },
    {
      owner: "nextgenmove",
      slug: "hristo",
      packName: "Hristo",
      ownerName: "Hristo",
      ownerId: "00000000-0000-0000-0000-000000000382",
      packId: "10000000-0000-0000-0000-000000000390",
      desk: "Mover Bot",
      seatId: "20000000-0000-0000-0000-000000000537",
      url: "https://x.ai/bot/HOlAbXeoxd_ukzsmD6H5m",
      seats: 2,
      topic: "founder",
    },
    {
      owner: "MikkoUusitalo1",
      slug: "mikko",
      packName: "Mikko",
      ownerName: "Mikko",
      ownerId: "00000000-0000-0000-0000-000000000383",
      packId: "10000000-0000-0000-0000-000000000391",
      desk: "X Agent",
      seatId: "20000000-0000-0000-0000-000000000539",
      url: "https://x.ai/bot/7V6XbVZRZ04eHej3tJIAQ",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "siraustin",
      slug: "austin",
      packName: "Austin",
      ownerName: "Austin",
      ownerId: "00000000-0000-0000-0000-000000000384",
      packId: "10000000-0000-0000-0000-000000000392",
      desk: "Grok Telegram",
      seatId: "20000000-0000-0000-0000-000000000541",
      url: "https://x.ai/bot/3EyXrWLkGfi4SG-dMy427",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "legendRoofingCo",
      slug: "legend",
      packName: "Legend",
      ownerName: "Legend",
      ownerId: "00000000-0000-0000-0000-000000000385",
      packId: "10000000-0000-0000-0000-000000000393",
      desk: "Legend Lead Ops",
      seatId: "20000000-0000-0000-0000-000000000546",
      url: "https://x.ai/bot/WCZjv-qHMtHz2AdQW136q",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "kevinrose",
      slug: "kevin",
      packName: "Kevin",
      ownerName: "Kevin Rose",
      ownerId: "00000000-0000-0000-0000-000000000386",
      packId: "10000000-0000-0000-0000-000000000394",
      desk: "INDEXX",
      seatId: "20000000-0000-0000-0000-000000000547",
      url: "https://x.ai/bot/Vn8tnMK2GyiFmnWNoF0gT",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "round",
      slug: "round",
      packName: "round",
      ownerName: "round",
      ownerId: "00000000-0000-0000-0000-000000000387",
      packId: "10000000-0000-0000-0000-000000000395",
      desk: "anew",
      seatId: "20000000-0000-0000-0000-000000000548",
      url: "https://x.ai/bot/qtuoVRf5etpEVPNA29i7H",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "Cmillet77",
      slug: "chris-millet",
      packName: "Chris",
      ownerName: "Chris Millet",
      ownerId: "00000000-0000-0000-0000-000000000388",
      packId: "10000000-0000-0000-0000-000000000396",
      desk: "RV Trip Planner",
      seatId: "20000000-0000-0000-0000-000000000549",
      url: "https://x.ai/bot/BZr7_j7WC1klRjG8SrwWx",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "pattyshack",
      slug: "patty",
      packName: "Patty",
      ownerName: "Patty",
      ownerId: "00000000-0000-0000-0000-000000000389",
      packId: "10000000-0000-0000-0000-000000000397",
      desk: "Restaurant Canceled/Errors Order Recovery",
      seatId: "20000000-0000-0000-0000-000000000550",
      url: "https://x.ai/bot/wB9H7OSiHYPlRgyCTM5Iq",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "scientists_blog",
      slug: "matthew",
      packName: "Matthew",
      ownerName: "Matthew Ackerman",
      ownerId: "00000000-0000-0000-0000-000000000390",
      packId: "10000000-0000-0000-0000-000000000398",
      desk: "X Reply Scout",
      seatId: "20000000-0000-0000-0000-000000000553",
      url: "https://x.ai/bot/DRZ2jU1GFwV8HS2_9Y6MA",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "bartasurba",
      slug: "bartas",
      packName: "Bartas",
      ownerName: "Bartas Urba",
      ownerId: "00000000-0000-0000-0000-000000000391",
      packId: "10000000-0000-0000-0000-000000000399",
      desk: "Jevify",
      seatId: "20000000-0000-0000-0000-000000000554",
      url: "https://x.ai/bot/BQZO1Huih7uXStkjQ12ld",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "GallagherPreach",
      slug: "chris-gallagher",
      packName: "Chris",
      ownerName: "Chris Gallagher",
      ownerId: "00000000-0000-0000-0000-000000000392",
      packId: "10000000-0000-0000-0000-000000000400",
      desk: "Lee",
      seatId: "20000000-0000-0000-0000-000000000555",
      url: "https://x.ai/bot/QiLYZ-kp5PLnalntJjt9x",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "btgraham5",
      slug: "brian",
      packName: "Brian",
      ownerName: "Brian Graham",
      ownerId: "00000000-0000-0000-0000-000000000393",
      packId: "10000000-0000-0000-0000-000000000401",
      desk: "Grok Bot Troubleshooter",
      seatId: "20000000-0000-0000-0000-000000000556",
      url: "https://x.ai/bot/oJmfUiZ-BKe_Uzzbyl16y",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "kmkonline",
      slug: "kmkonline",
      packName: "kmkonline",
      ownerName: "kmkonline",
      ownerId: "00000000-0000-0000-0000-000000000394",
      packId: "10000000-0000-0000-0000-000000000402",
      desk: "Lighting Specialist",
      seatId: "20000000-0000-0000-0000-000000000557",
      url: "https://x.ai/bot/gmfwVjMBx5wLQZnQ5FiyA",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "JennyMarquis",
      slug: "jenny",
      packName: "Jenny",
      ownerName: "Jenny Marquis",
      ownerId: "00000000-0000-0000-0000-000000000395",
      packId: "10000000-0000-0000-0000-000000000403",
      desk: "Fashion Stylist",
      seatId: "20000000-0000-0000-0000-000000000558",
      url: "https://x.ai/bot/jaT7Eye5M1SvLygfLKmOq",
      seats: 1,
      topic: "media",
    },
    {
      owner: "msunc1985",
      slug: "teresa",
      packName: "Teresa",
      ownerName: "Teresa N",
      ownerId: "00000000-0000-0000-0000-000000000396",
      packId: "10000000-0000-0000-0000-000000000404",
      desk: "Future Me",
      seatId: "20000000-0000-0000-0000-000000000560",
      url: "https://x.ai/bot/l8UqiLDRnttDGyoHAHNL2",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "aris_grivas",
      slug: "aris",
      packName: "Aris",
      ownerName: "Aris",
      ownerId: "00000000-0000-0000-0000-000000000397",
      packId: "10000000-0000-0000-0000-000000000405",
      desk: "Jev for computer use",
      seatId: "20000000-0000-0000-0000-000000000561",
      url: "https://x.ai/bot/gQD_ZhGhJ_e1aLHc3RPOT",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "mmmllcadv3",
      slug: "michael",
      packName: "Michael",
      ownerName: "Michael Krantz",
      ownerId: "00000000-0000-0000-0000-000000000398",
      packId: "10000000-0000-0000-0000-000000000406",
      desk: "Alfred",
      seatId: "20000000-0000-0000-0000-000000000562",
      url: "https://x.ai/bot/moKscJ7PToJw_PVQWvkf_",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "Divine_machine",
      slug: "divine",
      packName: "Divine",
      ownerName: "Divine Machine",
      ownerId: "00000000-0000-0000-0000-000000000399",
      packId: "10000000-0000-0000-0000-000000000407",
      desk: "X Audit",
      seatId: "20000000-0000-0000-0000-000000000563",
      url: "https://x.ai/bot/s50oGLZfiPNSKuTlGsscA",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "jason_bennitt",
      slug: "jason",
      packName: "Jason",
      ownerName: "Jason",
      ownerId: "00000000-0000-0000-0000-000000000400",
      packId: "10000000-0000-0000-0000-000000000408",
      desk: "Fail Dig",
      seatId: "20000000-0000-0000-0000-000000000564",
      url: "https://x.ai/bot/oEDvMidjbGpncvbLsROau",
      seats: 3,
      topic: "founder",
    },
    {
      owner: "AlecSnelling",
      slug: "alec",
      packName: "Alec",
      ownerName: "Alec Snelling",
      ownerId: "00000000-0000-0000-0000-000000000401",
      packId: "10000000-0000-0000-0000-000000000409",
      desk: "Nessie",
      seatId: "20000000-0000-0000-0000-000000000565",
      url: "https://x.ai/bot/8-OG0rLmfAna8vs_0PBO_",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "Fnjrockerstein",
      slug: "jared",
      packName: "Jared",
      ownerName: "Jared Richards",
      ownerId: "00000000-0000-0000-0000-000000000402",
      packId: "10000000-0000-0000-0000-000000000410",
      desk: "Ride Editor",
      seatId: "20000000-0000-0000-0000-000000000566",
      url: "https://x.ai/bot/Vae3EVVTJ7hrxo1ojKv6j",
      seats: 1,
      topic: "media",
    },
    {
      owner: "sjcobs",
      slug: "steven",
      packName: "Steven",
      ownerName: "Steven Jacobs",
      ownerId: "00000000-0000-0000-0000-000000000403",
      packId: "10000000-0000-0000-0000-000000000411",
      desk: "Lantern",
      seatId: "20000000-0000-0000-0000-000000000567",
      url: "https://x.ai/bot/IbFZmiL_mzu0Dq-K4u633",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "CindyH874325640",
      slug: "cindy",
      packName: "Cindy",
      ownerName: "Cindy",
      ownerId: "00000000-0000-0000-0000-000000000404",
      packId: "10000000-0000-0000-0000-000000000412",
      desk: "Consider It Marketed",
      seatId: "20000000-0000-0000-0000-000000000568",
      url: "https://x.ai/bot/ayQYbaHquRM7x7lnBOEoQ",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "keepclmcarryong",
      slug: "robert",
      packName: "Robert",
      ownerName: "Robert",
      ownerId: "00000000-0000-0000-0000-000000000405",
      packId: "10000000-0000-0000-0000-000000000413",
      desk: "Orchestrator",
      seatId: "20000000-0000-0000-0000-000000000569",
      url: "https://x.ai/bot/Ho_6yW-icLF6xWHnNVhNo",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "valdagher",
      slug: "valentino",
      packName: "Valentino",
      ownerName: "Valentino",
      ownerId: "00000000-0000-0000-0000-000000000406",
      packId: "10000000-0000-0000-0000-000000000414",
      desk: "WinRedDestroyer",
      seatId: "20000000-0000-0000-0000-000000000570",
      url: "https://x.ai/bot/YS_lqB19LnlaPqXPEUn4f",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "TechDadsLife",
      slug: "michael",
      packName: "Michael",
      ownerName: "Michael",
      ownerId: "00000000-0000-0000-0000-000000000407",
      packId: "10000000-0000-0000-0000-000000000415",
      desk: "Newsroom to Teleprompter",
      seatId: "20000000-0000-0000-0000-000000000571",
      url: "https://x.ai/bot/-SxKtRLmO7QcCk6kN0Jzy",
      seats: 1,
      topic: "media",
    },
    {
      owner: "Wardonis",
      slug: "wardonis",
      packName: "Wardonis",
      ownerName: "Wardonis",
      ownerId: "00000000-0000-0000-0000-000000000408",
      packId: "10000000-0000-0000-0000-000000000416",
      desk: "Hearthstone Deckbuilder",
      seatId: "20000000-0000-0000-0000-000000000572",
      url: "https://x.ai/bot/tSUrQQ0W5uM9ZI73NmSHm",
      seats: 7,
      topic: "founder",
    },
    {
      owner: "uxaistudio",
      slug: "ward",
      packName: "Ward",
      ownerName: "Ward",
      ownerId: "00000000-0000-0000-0000-000000000409",
      packId: "10000000-0000-0000-0000-000000000417",
      desk: "DomainSnip Bot",
      seatId: "20000000-0000-0000-0000-000000000573",
      url: "https://x.ai/bot/C3z3lWaB4TLRC0CcodU9Q",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "HBud69",
      slug: "harald",
      packName: "Harald",
      ownerName: "Harald",
      ownerId: "00000000-0000-0000-0000-000000000410",
      packId: "10000000-0000-0000-0000-000000000418",
      desk: "Jarvis Coordinator",
      seatId: "20000000-0000-0000-0000-000000000574",
      url: "https://x.ai/bot/vGBwBEELW79gSF340zJpb",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "vivekk_tech",
      slug: "vivek",
      packName: "Vivek",
      ownerName: "Vivek",
      ownerId: "00000000-0000-0000-0000-000000000411",
      packId: "10000000-0000-0000-0000-000000000419",
      desk: "Pearl",
      seatId: "20000000-0000-0000-0000-000000000576",
      url: "https://x.ai/bot/VTWG_fyW6Xr_pkjEBM9VC",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "RoggyRyan",
      slug: "ryan",
      packName: "Ryan",
      ownerName: "Ryan J Roggy",
      ownerId: "00000000-0000-0000-0000-000000000412",
      packId: "10000000-0000-0000-0000-000000000420",
      desk: "Chief of Staff",
      seatId: "20000000-0000-0000-0000-000000000588",
      url: "https://x.ai/bot/dZfz-QuarMKqQo_mdPhbb",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "JackyHeshi",
      slug: "jacky",
      packName: "Jacky",
      ownerName: "Jacky Heshi",
      ownerId: "00000000-0000-0000-0000-000000000413",
      packId: "10000000-0000-0000-0000-000000000421",
      desk: "Data Broker Opt-Out Bot",
      seatId: "20000000-0000-0000-0000-000000000591",
      url: "https://x.ai/bot/92VG66mFtkdl7eqWiJLo6",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "minivan99",
      slug: "john",
      packName: "John",
      ownerName: "John Sayers",
      ownerId: "00000000-0000-0000-0000-000000000414",
      packId: "10000000-0000-0000-0000-000000000422",
      desk: "Penny",
      seatId: "20000000-0000-0000-0000-000000000592",
      url: "https://x.ai/bot/Gcpb0AM_Ix_r5jycu_3NL",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "zac70182",
      slug: "zack",
      packName: "Zack",
      ownerName: "Zack Gabbard",
      ownerId: "00000000-0000-0000-0000-000000000415",
      packId: "10000000-0000-0000-0000-000000000423",
      desk: "Grok Build",
      seatId: "20000000-0000-0000-0000-000000000593",
      url: "https://x.ai/bot/wnFlIE6YpskdUekfkkwFO",
      seats: 1,
      topic: "developer",
    },
    {
      owner: "brandonchung75",
      slug: "brandon",
      packName: "Brandon",
      ownerName: "Brandon",
      ownerId: "00000000-0000-0000-0000-000000000416",
      packId: "10000000-0000-0000-0000-000000000424",
      desk: "토스 증권 주식 투자봇",
      seatId: "20000000-0000-0000-0000-000000000594",
      url: "https://x.ai/bot/znMFERdq0zEC74735Szxm",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "anzevoje",
      slug: "growth",
      packName: "Growth",
      ownerName: "Growth",
      ownerId: "00000000-0000-0000-0000-000000000417",
      packId: "10000000-0000-0000-0000-000000000425",
      desk: "Lead Vetting",
      seatId: "20000000-0000-0000-0000-000000000595",
      url: "https://x.ai/bot/eEfAacXdtzHANV5hVhG6o",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "Secalytica",
      slug: "jerry",
      packName: "Jerry",
      ownerName: "Jerry",
      ownerId: "00000000-0000-0000-0000-000000000418",
      packId: "10000000-0000-0000-0000-000000000426",
      desk: "Astro",
      seatId: "20000000-0000-0000-0000-000000000596",
      url: "https://x.ai/bot/LtgFNOt7Y-bmSnixM1yAj",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "STACCoverflow",
      slug: "jarett",
      packName: "Jarett",
      ownerName: "Jarett",
      ownerId: "00000000-0000-0000-0000-000000000419",
      packId: "10000000-0000-0000-0000-000000000427",
      desk: "xGas Superchain dApp Supercycle",
      seatId: "20000000-0000-0000-0000-000000000597",
      url: "https://x.ai/bot/py3cDcRaSgRj_ixBOK3XN",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "arouch_serg",
      slug: "serg",
      packName: "Serg",
      ownerName: "Serg",
      ownerId: "00000000-0000-0000-0000-000000000420",
      packId: "10000000-0000-0000-0000-000000000428",
      desk: "Scroll",
      seatId: "20000000-0000-0000-0000-000000000598",
      url: "https://x.ai/bot/sX5M7dv2lxhG7V_utytG7",
      seats: 2,
      topic: "founder",
    },
    {
      owner: "VMVLAX",
      slug: "law",
      packName: "LAW",
      ownerName: "LAW",
      ownerId: "00000000-0000-0000-0000-000000000421",
      packId: "10000000-0000-0000-0000-000000000429",
      desk: "Longhand",
      seatId: "20000000-0000-0000-0000-000000000600",
      url: "https://x.ai/bot/N53am-rfjXPCA2UJ91kEG",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "kschevik",
      slug: "knut",
      packName: "Knut",
      ownerName: "Knut Schevik",
      ownerId: "00000000-0000-0000-0000-000000000422",
      packId: "10000000-0000-0000-0000-000000000430",
      desk: "Ai Health",
      seatId: "20000000-0000-0000-0000-000000000603",
      url: "https://x.ai/bot/OuHK7dyYD8C6Joqw80yfJ",
      seats: 1,
      topic: "founder",
    },
    {
      owner: "beksvie",
      slug: "bernard",
      packName: "Bernard",
      ownerName: "Bernard",
      ownerId: "00000000-0000-0000-0000-000000000423",
      packId: "10000000-0000-0000-0000-000000000431",
      desk: "Bot Builder",
      seatId: "20000000-0000-0000-0000-000000000615",
      url: "https://x.ai/bot/xwzDwQIkd1LYOIN1akMxy",
      seats: 1,
      topic: "founder",
    }
  ] as const;

  for (const item of expected) {
    const pack = getFallbackPack(item.owner, item.slug);
    assert.ok(pack, item.owner);
    assert.equal(pack.id, item.packId);
    assert.equal(pack.owner.id, item.ownerId);
    assert.equal(pack.owner.githubLogin, item.owner);
    assert.equal(pack.owner.name, item.ownerName);
    assert.equal(pack.owner.xHandle, item.owner);
    assert.equal(pack.name, item.packName);
    assert.equal(pack.official, false);
    assert.equal(pack.featured, false);
    assert.deepEqual(pack.topics, [item.topic]);
    assert.ok(pack.seats.length >= item.seats);
    assert.equal(pack.seats[0]?.name, item.desk);
    assert.equal(pack.seats[0]?.isDesk, true);
    assert.equal(pack.seats[0]?.sortOrder, 0);
    assert.equal(pack.seats[0]?.id, item.seatId);
    assert.equal(pack.seats[0]?.grokTemplateUrl, item.url);
    assert.equal(listFallbackPacksByOwner(item.owner).length, 1);
  }

  const daniel = getFallbackPack("Daniel_Farinax", "daniel-farinax");
  assert.ok(daniel);
  assert.equal(daniel.seats.length, 3);
  assert.equal(daniel.seats[1]?.name, "Free Bots Mesh");
  assert.equal(daniel.seats[1]?.id, "20000000-0000-0000-0000-000000000405");
  assert.equal(daniel.seats[1]?.isDesk, false);
  assert.equal(daniel.seats[1]?.grokTemplateUrl, "https://x.ai/bot/Slp4qX0H0kjgyRvMCSh5s");

  const samBuilds = getFallbackPack("sam_builds_ai", "sam");
  assert.ok(samBuilds);
  assert.equal(samBuilds.seats.length, 3);
  assert.equal(samBuilds.seats[2]?.name, "IOIQ Lite · Site Care");
  assert.equal(samBuilds.seats[2]?.id, "20000000-0000-0000-0000-000000000429");

  const myke = getFallbackPack("myke86d", "myke");
  assert.ok(myke);
  assert.equal(myke.seats.length, 3);
  assert.equal(myke.seats[1]?.name, "Radius Menu Price");
  assert.equal(myke.seats[2]?.name, "Menu Voice Recipe Cards");

  const knock = getFallbackPack("suddenlyjon", "knock");
  assert.ok(knock);
  assert.equal(knock.seats.length, 44);
  assert.equal(knock.seats[28]?.name, "Window");
  assert.equal(knock.seats[28]?.id, "20000000-0000-0000-0000-000000000447");
  assert.match(knock.routingRule, /Window only for dew-point window vs dehumidifier calls/);
  assert.equal(knock.seats[29]?.name, "Fit Finder");
  assert.equal(knock.seats[29]?.id, "20000000-0000-0000-0000-000000000612");
  assert.equal(knock.seats[29]?.isDesk, false);
  assert.equal(knock.seats[29]?.sortOrder, 29);
  assert.equal(knock.seats[29]?.grokTemplateUrl, "https://x.ai/bot/0boCprpn_3yaiJ5PZIGCw");
  assert.match(knock.routingRule, /Fit Finder only for outfit-from-photo shopping links/);
  assert.equal(knock.seats[30]?.name, "Rebrander");
  assert.equal(knock.seats[30]?.id, "20000000-0000-0000-0000-000000000614");
  assert.equal(knock.seats[30]?.isDesk, false);
  assert.equal(knock.seats[30]?.sortOrder, 30);
  assert.equal(knock.seats[30]?.grokTemplateUrl, "https://x.ai/bot/HGorKc5KDQLynW4JONxn_");
  assert.match(knock.routingRule, /Rebrander only for business\/product rename \/ old-brand cleanup/);

  const scottAf = getFallbackPack("scottxmetcalf", "scott");
  assert.ok(scottAf);
  assert.equal(scottAf.seats.length, 28);
  assert.equal(scottAf.seats[0]?.name, "Leader 1:1 Bot");
  assert.equal(scottAf.seats[0]?.isDesk, true);
  assert.equal(scottAf.seats[26]?.name, "Doordash");
  assert.equal(scottAf.seats[26]?.id, "20000000-0000-0000-0000-000000000608");
  assert.equal(scottAf.seats[26]?.isDesk, false);
  assert.equal(scottAf.seats[26]?.sortOrder, 26);
  assert.equal(scottAf.seats[26]?.grokTemplateUrl, "https://x.ai/bot/J7I56EwtEh0D3yMGhnwSZ");
  assert.match(scottAf.seats[26]?.job ?? "", /DoorDash operator/);
  assert.match(scottAf.routingRule, /Doordash only for DoorDash cart \/ DashPass \/ live-track \/ work-meal receipt filing/);
  assert.equal(scottAf.seats[27]?.name, "Competitive Snake Alert");
  assert.equal(scottAf.seats[27]?.id, "20000000-0000-0000-0000-000000000611");
  assert.equal(scottAf.seats[27]?.isDesk, false);
  assert.equal(scottAf.seats[27]?.sortOrder, 27);
  assert.equal(scottAf.seats[27]?.grokTemplateUrl, "https://x.ai/bot/NqCINqE9LDY9XTw2vP_XT");
  assert.match(scottAf.routingRule, /Competitive Snake Alert only for competitor watch \/ pricing-launch-positioning snake alerts/);

  const serg = getFallbackPack("arouch_serg", "serg");
  assert.ok(serg);
  assert.equal(serg.seats.length, 4);
  assert.equal(serg.seats[0]?.name, "Scroll");
  assert.equal(serg.seats[0]?.isDesk, true);
  assert.equal(serg.seats[1]?.name, "Fuel");
  assert.equal(serg.seats[1]?.id, "20000000-0000-0000-0000-000000000609");
  assert.equal(serg.seats[1]?.isDesk, false);
  assert.equal(serg.seats[1]?.sortOrder, 1);
  assert.equal(serg.seats[1]?.grokTemplateUrl, "https://x.ai/bot/Snd56ionW_F2lDtn_bhRf");
  assert.match(serg.seats[1]?.job ?? "", /calorie tracking and meal-prep/);
  assert.match(serg.routingRule, /Fuel only for calorie tracking and meal-prep/);

  const xi = getFallbackPack("elizrdrake", "xi");
  assert.ok(xi);
  assert.equal(xi.seats.length, 3);
  assert.equal(xi.seats[0]?.name, "Ad Aether");
  assert.equal(xi.seats[0]?.isDesk, true);
  assert.equal(xi.seats[1]?.name, "Ad Umbra");
  assert.equal(xi.seats[1]?.isDesk, false);
  assert.equal(xi.seats[2]?.name, "Sputnik 1");
  assert.equal(xi.seats[2]?.id, "20000000-0000-0000-0000-000000000610");
  assert.equal(xi.seats[2]?.isDesk, false);
  assert.equal(xi.seats[2]?.sortOrder, 2);
  assert.equal(xi.seats[2]?.grokTemplateUrl, "https://x.ai/bot/0eNrUiaGS_HCEBNBMtS-N");
  assert.match(xi.seats[2]?.job ?? "", /Commander & Chief of The Everything Bots/);
  assert.match(xi.routingRule, /Sputnik 1 only for Everything Bots captain \/ crew intro \/ quest routing/);

  const liam = getFallbackPack("liam_fallen", "liam");
  assert.ok(liam);
  assert.equal(liam.seats.length, 9);
  assert.equal(liam.seats[6]?.name, "Lockdown");
  assert.equal(liam.seats[6]?.id, "20000000-0000-0000-0000-000000000499");
  assert.equal(liam.seats[6]?.sortOrder, 6);
  assert.equal(liam.seats[7]?.name, "Everyone");
  assert.equal(liam.seats[7]?.id, "20000000-0000-0000-0000-000000000606");
  assert.equal(liam.seats[7]?.isDesk, false);
  assert.equal(liam.seats[7]?.grokTemplateUrl, "https://x.ai/bot/ARBlLiKi4wbhc7o6SlnGu");
  assert.match(liam.routingRule, /Lockdown only for personal digital security account lockdown/);
  assert.match(liam.routingRule, /Everyone only for who-is-X/);

  const ignota = getFallbackPack("ignota_regalis", "ignota");
  assert.equal(ignota?.seats.length, 3);
  assert.equal(ignota?.seats[0]?.name, "Alley Cat");
  assert.equal(ignota?.seats[1]?.name, "Rescue Cat");
  assert.equal(ignota?.seats[2]?.name, "Orange Cat");

  const jodi = getFallbackPack("WorkWithJodi", "jodi");
  assert.equal(jodi?.seats.length, 6);
  assert.equal(jodi?.seats[0]?.name, "Squirrel");

  const lovable = getFallbackPack("_lovablecurves", "lovable");
  assert.equal(lovable?.seats.length, 6);
  assert.equal(lovable?.seats[0]?.name, "Mailchimp Monthly Blast");

  const eugene = getFallbackPack("monomyth", "eugene");
  assert.equal(eugene?.seats.length, 5);
  assert.equal(eugene?.seats[1]?.name, "Data Ink");
  assert.equal(eugene?.seats[1]?.id, "20000000-0000-0000-0000-000000000440");

  assert.equal(getFallbackPack("hovinthenorth", "hovhannes")?.seats.length, 1);
  assert.equal(
    getFallbackPack("hovinthenorth", "hovhannes")?.seats[0]?.grokTemplateUrl,
    "https://x.ai/bot/D0DOumUGpkN-fjE_acysw"
  );

  const addedUrls = [
    "https://x.ai/bot/L7qSBOOLgC6QuDY3nYc2X",
    "https://x.ai/bot/znOp4qqXQXqNiFvLXhUF5",
    "https://x.ai/bot/sF0FLiic1qUdaYsqoHtBL",
    "https://x.ai/bot/qqri--MjKj0It7LYwqYqu",
    "https://x.ai/bot/AXez4BKs4EM9RH9il-XEv",
    "https://x.ai/bot/eoGTX8Y6jOoRDBYk5pNe9",
    "https://x.ai/bot/SlaKFOWu18n_PRAmeLkT_",
    "https://x.ai/bot/4KvT7CVIPLS35OwLuxcwQ",
    "https://x.ai/bot/H6BI53guK-PTP417x1AFn",
    "https://x.ai/bot/eIdFwAQ7gWA4xlpQ71jXf",
    "https://x.ai/bot/lAptf_5PxlSgx4w-L9uMt",
    "https://x.ai/bot/3Tf_Vk_UR3JJb6Dq3hioZ",
    "https://x.ai/bot/lNFp3O9Os-4jAk9_1GMJm",
    "https://x.ai/bot/pm-678wpzU0TQYBWte8mx",
    "https://x.ai/bot/5ARm6x7aL6_5N1ETWr_sT",
    "https://x.ai/bot/BIvSSU3sukmkTpMeSnft-",
    "https://x.ai/bot/lT4JF6MG0PrcgAYPIY6Nm",
    "https://x.ai/bot/fnebLkY08y2GCer768ukp",
    "https://x.ai/bot/52MysHk4AuXQs0nWbxQF2",
    "https://x.ai/bot/q631iJtHVwxloj8ZBoJyV",
    "https://x.ai/bot/vc-0ahZfJwuo-DyPUcmj7",
    "https://x.ai/bot/wL-TZSSeq-ZkLoogQGjU-",
    "https://x.ai/bot/Z_D5RFPPjXhQhGVNXG2-Y",
    "https://x.ai/bot/Mmcfff6ubyzhSnqMAQ3NA",
    "https://x.ai/bot/WBmiRJCwxzSCBHBTdC1wi",
    "https://x.ai/bot/tF0ckH21ZT7L1CN3HOyHl",
    "https://x.ai/bot/Z411hW0fpQZunKK8t-8gH",
    "https://x.ai/bot/HBKDOnEeqhfLyev8MalAt",
    "https://x.ai/bot/KvPUjItGazccrvGwOm401",
    "https://x.ai/bot/Aii63wFn_TPj5MvF7fDyS",
    "https://x.ai/bot/JaqEBG9Fah4MNpLJHVvbu",
    "https://x.ai/bot/dLYpR1sSkG0VLa8-faEgX",
    "https://x.ai/bot/TqyhVfSrAYZ-xQSrD_x1A",
    "https://x.ai/bot/r3zhR2taB4UL6qkApsgau",
    "https://x.ai/bot/hHiqd6PMMJ3whDUBCQkDG",
    "https://x.ai/bot/xpTH6yslvNJuuPq5mO01a",
    "https://x.ai/bot/Y2-3YXQhppPkm5IwYWqTE",
    "https://x.ai/bot/5wqj5ihszSFeGjNBjK8Mn",
    "https://x.ai/bot/yaQTHVqOMscKBYYDAfNoP",
    "https://x.ai/bot/e1XwuT5B35AAqLsMfGbfg",
    "https://x.ai/bot/5lT1ODmcvQ5jKYw7qvtLY",
    "https://x.ai/bot/HTygrX8LIy2waFrDOlEQK",
    "https://x.ai/bot/tVFpcwYEBXW4ReAFni6Cn",
    "https://x.ai/bot/LoPqRp44sI8sHRpNN9Kq-",
    "https://x.ai/bot/uoHxMMgZfiJTymQ0dA9g8",
    "https://x.ai/bot/FaMbaDOO2WceFyiKDu6_6",
    "https://x.ai/bot/R0acF6Pmp8YewSZm6fA-D",
    "https://x.ai/bot/_KMuKhK4yVbCD8BVLhvAP",
    "https://x.ai/bot/uRig0yNXuYwcODXk_F88f",
    "https://x.ai/bot/WZ7amxhH9gXXBEaGmg0un",
    "https://x.ai/bot/gLV5mUN4vqHFKsCSn_DTO",
    "https://x.ai/bot/xm3G76TSxi1dcG4qwebvm",
    "https://x.ai/bot/ljzXIgAQcGOV0QxYjHH8I",
    "https://x.ai/bot/nbUWXUqcXIA0HNQQ3R1Bu",
    "https://x.ai/bot/4mICdo5bR2FyghKoOZve5",
    "https://x.ai/bot/ARSoBhGtQqYPT2Nu44ABi",
    "https://x.ai/bot/X8nyQdKULzWau6NPoYZtf",
    "https://x.ai/bot/0_f9wcIpoq9TZ5E_RZrwb",
    "https://x.ai/bot/cVFusYdAgGA9GY8wHPl2x",
    "https://x.ai/bot/LIoSGK9L2p0pCeApCmS1g",
    "https://x.ai/bot/ZFQ35fLdqLdzDyI_TQoGZ",
    "https://x.ai/bot/4YWzzAP8Di9B4DnYd3Uzo",
    "https://x.ai/bot/85qsR6t4r8jI3oKbPm5Uu",
    "https://x.ai/bot/eyMdVOKBwSBwp63MX2fxy",
    "https://x.ai/bot/XGIep-r89FqSquTEKtd1f",
    "https://x.ai/bot/n6DQhcTSPHdlVpQtEinpS",
    "https://x.ai/bot/pbFUUD8wVI14rACIQ40YY",
    "https://x.ai/bot/duPnEjDq9SYTK2nAyPDj4",
    "https://x.ai/bot/Mpk0GQurVy7idutEgKKUF",
    "https://x.ai/bot/dXPRQwRlwI9_jip6vFYoT",
    "https://x.ai/bot/vS-vrOlLKSpXsTmBxPL57",
    "https://x.ai/bot/zP-tzi_isEHluq8_NdYEf",
    "https://x.ai/bot/1wQ3XiODIFFSCKrkDApu3",
    "https://x.ai/bot/Ftp8JyxBU9oeZa5V1YTDn",
    "https://x.ai/bot/3hissja8d2xjHliXdnmm4",
    "https://x.ai/bot/fYnk17DG7ctOODqZDJydF",
    "https://x.ai/bot/8sA76Cs0vZMy9ROtq8Rn2",
    "https://x.ai/bot/Dv6-DIhzFpqJ4-VMMibNT",
    "https://x.ai/bot/2daEJSUffM8-Dcn2MJjrQ",
    "https://x.ai/bot/Xdx94lJlv-xK14WF6yzVR",
    "https://x.ai/bot/zE2ZdbZSQc7tHfE7wa4kR",
    "https://x.ai/bot/wOQJr4ZMV3db830YErtOw",
    "https://x.ai/bot/HlrjSGUR11BY978c1GpzC",
    "https://x.ai/bot/bCTwk5eUxHCELHWOko_sM",
    "https://x.ai/bot/lKv-z0iBQb0hzYyrFf6_s",
    "https://x.ai/bot/MvgLJbHeHFjc7J9D419_J",
    "https://x.ai/bot/qdwm8-zhhSfaenUa6DIjD",
    "https://x.ai/bot/QeblYPmzNFIbeCJR_dKyS",
    "https://x.ai/bot/zrbXLuz-YKUfqa5kSapWQ",
    "https://x.ai/bot/of2iJ-g4hgWF1v9_tNBDY",
    "https://x.ai/bot/502iRcu35kF-eyMr7M1dZ",
    "https://x.ai/bot/Fq4c6b2KeDg3dnIGc5KWI",
    "https://x.ai/bot/fcAnJJxw7NU_zL0Zq6Ixo",
    "https://x.ai/bot/llrBTI8TFUB8tdac2JAtK",
    "https://x.ai/bot/FwJmagPaEeQ_so8TTK1gh",
    "https://x.ai/bot/S53Q85p1XVjLKmRcnhPcO",
    "https://x.ai/bot/4evc9gtDOCrFt5vMCg0HG",
    "https://x.ai/bot/5x_HQ9uoBCHPYvf9vbUMN",
    "https://x.ai/bot/vgZX7X2-hh1iC6vmmDHoh",
    "https://x.ai/bot/ykFn3jqs0q5cn3tWg16U4",
    "https://x.ai/bot/ljkUXjCmdkW4XJHWRJxFn",
    "https://x.ai/bot/dwuB7MmlnrkcXYtyOp-Hk",
    "https://x.ai/bot/cp_nk3ftrAgaKbYONW6fa",
    "https://x.ai/bot/iaOrz78m_w7I90kusc5ia",
    "https://x.ai/bot/5YvX0dqXaRzi1lYZJz6F0",
    "https://x.ai/bot/f9XdNJ5KD6LXe15vok934",
    "https://x.ai/bot/Lq3agwG85x4dhZPOVcSHh",
    "https://x.ai/bot/3SExQeiS4pwalaUG-7YM1",
    "https://x.ai/bot/4V0rzExpIY19WpNGt71Fp",
    "https://x.ai/bot/u1m_h-MM1Z7AyPXILn639",
    "https://x.ai/bot/O3Egi46yuoheU_7h1pSt-",
    "https://x.ai/bot/tukhb8f4XyUJFkRWlHWaz",
    "https://x.ai/bot/roAIOBqaMNIijMjrAaI7C",
    "https://x.ai/bot/sM_Xi4OF09cGU8KGyLvlC",
    "https://x.ai/bot/GK4GLi9V0teYEEe2Cxh2i",
    "https://x.ai/bot/KxgpoMk2AH230cNwYUCcU",
    "https://x.ai/bot/lcGQv8_I7UvJEWs3833LR",
    "https://x.ai/bot/e-l7rGeYuc_cVuydcNvBc",
    "https://x.ai/bot/93Z51EAVqzp-YOvbHFjN3",
    "https://x.ai/bot/uV8ZjlR6ehlZ074hdvXG8",
    "https://x.ai/bot/1MwL5s1o4YeJ1jA8ejdhd",
    "https://x.ai/bot/DEMmOi7SiFhsFtIKuBKRD",
    "https://x.ai/bot/CB1TyiGiWtuusC-uuLX6X",
    "https://x.ai/bot/EkX7yjLCie8Phae6Fh4nE",
    "https://x.ai/bot/GsaAJ6kySI1O1sM7kiMiK",
    "https://x.ai/bot/-M2E0mNqSbuPgYBEtU-Oa",
    "https://x.ai/bot/9vk3KOm7wJzYVXlyKXxj7",
    "https://x.ai/bot/Slp4qX0H0kjgyRvMCSh5s",
    "https://x.ai/bot/nGlUg9-CHIYUocr8NUC8m",
    "https://x.ai/bot/E_j1gMmT7KLW4HWbMV2nK",
    "https://x.ai/bot/gdnpegYIyG7iwFgg4cla-",
    "https://x.ai/bot/LIV-0p821TpKRp05HFm4h",
    "https://x.ai/bot/C5EIiTZZL2pPpsb_po7Zs",
    "https://x.ai/bot/ZEniQhu4iKrF9w0qlrYq2",
    "https://x.ai/bot/ee13wSGPrFYqdZAJnGfI4",
    "https://x.ai/bot/F2L8KOuzoN-xKchOZQ4pJ",
    "https://x.ai/bot/18ceCocmLssbw59nEPwhr",
    "https://x.ai/bot/9Uh8RaBqp6PrcOcZjMHbD",
    "https://x.ai/bot/HOlAbXeoxd_ukzsmD6H5m",
    "https://x.ai/bot/iOUbudzFRy7Y0NNrrcYK5",
    "https://x.ai/bot/7V6XbVZRZ04eHej3tJIAQ",
    "https://x.ai/bot/joKOyN0KrQlgNHpda7iii",
    "https://x.ai/bot/3EyXrWLkGfi4SG-dMy427",
    "https://x.ai/bot/uhcw0SMM6WLZDYYRKu3Qq",
    "https://x.ai/bot/qH9kawE3Xq83k9L0vbgQe",
    "https://x.ai/bot/2afkvAl8IGd9IgDxZIxp_",
    "https://x.ai/bot/eQ3bzQTxNshSUzytoh29P",
    "https://x.ai/bot/WCZjv-qHMtHz2AdQW136q",
    "https://x.ai/bot/Vn8tnMK2GyiFmnWNoF0gT",
    "https://x.ai/bot/qtuoVRf5etpEVPNA29i7H",
    "https://x.ai/bot/BZr7_j7WC1klRjG8SrwWx",
    "https://x.ai/bot/wB9H7OSiHYPlRgyCTM5Iq",
    "https://x.ai/bot/3k6PxNav782x0cEE3iD7P",
    "https://x.ai/bot/2gmdsU86wH7HBvbB7_T2C",
    "https://x.ai/bot/DRZ2jU1GFwV8HS2_9Y6MA",
    "https://x.ai/bot/BQZO1Huih7uXStkjQ12ld",
    "https://x.ai/bot/QiLYZ-kp5PLnalntJjt9x",
    "https://x.ai/bot/oJmfUiZ-BKe_Uzzbyl16y",
    "https://x.ai/bot/gmfwVjMBx5wLQZnQ5FiyA",
    "https://x.ai/bot/jaT7Eye5M1SvLygfLKmOq",
    "https://x.ai/bot/jja9KVFn--roWw_lY3fl1",
    "https://x.ai/bot/l8UqiLDRnttDGyoHAHNL2",
    "https://x.ai/bot/gQD_ZhGhJ_e1aLHc3RPOT",
    "https://x.ai/bot/moKscJ7PToJw_PVQWvkf_",
    "https://x.ai/bot/s50oGLZfiPNSKuTlGsscA",
    "https://x.ai/bot/oEDvMidjbGpncvbLsROau",
    "https://x.ai/bot/8-OG0rLmfAna8vs_0PBO_",
    "https://x.ai/bot/Vae3EVVTJ7hrxo1ojKv6j",
    "https://x.ai/bot/IbFZmiL_mzu0Dq-K4u633",
    "https://x.ai/bot/ayQYbaHquRM7x7lnBOEoQ",
    "https://x.ai/bot/Ho_6yW-icLF6xWHnNVhNo",
    "https://x.ai/bot/YS_lqB19LnlaPqXPEUn4f",
    "https://x.ai/bot/-SxKtRLmO7QcCk6kN0Jzy",
    "https://x.ai/bot/tSUrQQ0W5uM9ZI73NmSHm",
    "https://x.ai/bot/C3z3lWaB4TLRC0CcodU9Q",
    "https://x.ai/bot/vGBwBEELW79gSF340zJpb",
    "https://x.ai/bot/oowzVaiKyse9a1wwCmHtK",
    "https://x.ai/bot/VTWG_fyW6Xr_pkjEBM9VC",
    "https://x.ai/bot/9s1eGxsc3xUQ8NrDABQlN",
    "https://x.ai/bot/jhjOrq-Pp06MoA7TT_B0H",
    "https://x.ai/bot/0XFvhY1cnpm9EnH-dlcPO",
    "https://x.ai/bot/-p3E1-AtfuoYitjQaBMVC",
    "https://x.ai/bot/z1sFV8dXNuD_xwE1xk_mz",
    "https://x.ai/bot/OnZxELs_59ZvE4_-jTMaV",
    "https://x.ai/bot/f2IQR96u1xM-hzMpW7sg2",
    "https://x.ai/bot/FudoGp1ChuiSXr3TMVZGG",
    "https://x.ai/bot/oSaziY7pPP4PH2ZHts0hS",
    "https://x.ai/bot/9-4S6pwoSkDHV9x0mLDdz",
    "https://x.ai/bot/lnErR-gA_t3KkPlvtwrrz",
    "https://x.ai/bot/dZfz-QuarMKqQo_mdPhbb",
    "https://x.ai/bot/K_RnTzUnW2bsbRzNkbuS0",
    "https://x.ai/bot/DnNh9tbUQOv4WpWKRafkF",
    "https://x.ai/bot/92VG66mFtkdl7eqWiJLo6",
    "https://x.ai/bot/Gcpb0AM_Ix_r5jycu_3NL",
    "https://x.ai/bot/wnFlIE6YpskdUekfkkwFO",
    "https://x.ai/bot/znMFERdq0zEC74735Szxm",
    "https://x.ai/bot/eEfAacXdtzHANV5hVhG6o",
    "https://x.ai/bot/LtgFNOt7Y-bmSnixM1yAj",
    "https://x.ai/bot/py3cDcRaSgRj_ixBOK3XN",
    "https://x.ai/bot/sX5M7dv2lxhG7V_utytG7",
    "https://x.ai/bot/lS9XaHCr9QTTHhNtb0VQX",
    "https://x.ai/bot/N53am-rfjXPCA2UJ91kEG",
    "https://x.ai/bot/qG_ZROllzSSRGKx_iIbsQ",
    "https://x.ai/bot/O-7W0uf0-_raG54kvXQcV",
    "https://x.ai/bot/OuHK7dyYD8C6Joqw80yfJ",
    "https://x.ai/bot/TtbtDOEfnPntO9DWANx3P",
    "https://x.ai/bot/8OqqCibnjW8m8cgdn3Qyl",
    "https://x.ai/bot/ARBlLiKi4wbhc7o6SlnGu",
    "https://x.ai/bot/Sm0GZs7Hhf7kNV7tHCUN1",
    "https://x.ai/bot/J7I56EwtEh0D3yMGhnwSZ",
    "https://x.ai/bot/Snd56ionW_F2lDtn_bhRf",
    "https://x.ai/bot/0eNrUiaGS_HCEBNBMtS-N",
  ];
  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url) => Boolean(url));
  assert.equal(fallbackUrls.length, 1339);
  assert.equal(new Set(fallbackUrls).size, 1339);
  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  for (const url of addedUrls) {
    assert.equal(fallbackUrls.filter((item) => item === url).length, 1, url);
    assert.equal(seedUrlMatches.filter((item) => item === url).length, 1, url);
  }

  const skippedUrls = [
    "https://x.ai/bot/r5R9X50NdzRZBPcBQAnhP",
    "https://x.ai/bot/7k0TLQBu4hPI5oE3ywRHU",
    "https://x.ai/bot/KTMYJjzan8cuclz2lv1Rz",
    "https://x.ai/bot/Oh5wReDUbpNIumkdziM3a",
    "https://x.ai/bot/yhE7cJAuSSPZZ5jm4cX2P",
    "https://x.ai/bot/4fmde5VhCGJGeCiqn96D3",
    "https://x.ai/bot/yvY3jGWZBv2cnUy9TILqn",
    "https://x.ai/bot/Kn0qDWAH3LrNZHhllpPhW",
    "https://x.ai/bot/qhNfEBreA8mJIYklpdW3d",
    "https://x.ai/bot/_3UvU3ZziY_aEJU-U7vKy",
    "https://x.ai/bot/UrzC0eJ8vFL18OBkJe7Gz",
    "https://x.ai/bot/_jOdbfkB16zxu7MRcmReE",
    "https://x.ai/bot/Mz3Q4s3wGqOQd4dhGeG_F",
    "https://x.ai/bot/KUBJQvNtKh8qNCHUGIQyY",
    "https://x.ai/bot/GbpCPWcJn2Id4ZB3wrHlc",
    "https://x.ai/bot/pNrTRI1edl4MdKsTSYBKb",
    "https://x.ai/bot/GXCuANH-cyuMWAhPIvAIJ",
    "https://x.ai/bot/JiOX3mqrIq0ukm9pLhQ9-",
    "https://x.ai/bot/dvPHLW8eTNF-YRnzpxlsl",
    "https://x.ai/bot/2lXpzDLP4YQwbrXBX0HaI",
    "https://x.ai/bot/GM_1Lh44jlHxEcT148pXg",
    "https://x.ai/bot/eAfHja9cbCki3zc7PXXb2",
    "https://x.ai/bot/6tQo6xa_8baP3VJUYg36h",
    "https://x.ai/bot/6L7bI6xC3UxUTFaCWljFj",
    "https://x.ai/bot/lwxCB8eGT08l2QbG3Ne9p",
    "https://x.ai/bot/E9fQj_z8gnmjS6bYcfK8D",
    "https://x.ai/bot/_6NBHPSs71x4pyQS740Od",
    "https://x.ai/bot/DYg0r1xvzy_xxPeRGHcHE",
    "https://x.ai/bot/AS6uhZDipBQVtOyQdASUX",
    "https://x.ai/bot/W3n0bVOUjCF8fDrUEyFGr",
    "https://x.ai/bot/3nkH58KUSQG5S7A29rzWi",
    "https://x.ai/bot/g3URTClmjeIlCgwDIK8dV",
    "https://x.ai/bot/ktQo2oRbLm4IA_c94YNWP",
    "https://x.ai/bot/_zMsp35NS2zl-Kp1uIegB",
    "https://x.ai/bot/7pdRsSeKkooXL_2rk8M09",
    "https://x.ai/bot/O9GVEhA_dlBr1uxomyy8L",
    "https://x.ai/bot/CYiVuYkkle--PvvmEhHho",
    "https://x.ai/bot/LENrKV-0QXmE_TGv3_hem",
    "https://x.ai/bot/fV4xRsHd-OsSogPa6M6se",
    "https://x.ai/bot/kK3YzrnSL7a86H9ASHSqK",
    "https://x.ai/bot/1AFXHf0OtQ-J4-eP5wgC5",
    "https://x.ai/bot/DFnZYjCELW2QdywUWZRiG",
    "https://x.ai/bot/6MGQJ5KHWL-XYfzLDRMsb",
    "https://x.ai/bot/Amk304VOCMu6c5ZlaXy0L",
    "https://x.ai/bot/mjwNOk2Bc2k9ZkaUaiwCk"
  ];
  for (const url of skippedUrls) {
    assert.equal(fallbackUrls.filter((item) => item === url).length, 0, url);
    assert.equal(seedUrlMatches.filter((item) => item === url).length, 0, url);
  }

  assert.equal(seedSql.includes("20000000-0000-0000-0000-000000000493"), false);
  assert.equal(getFallbackPack("examples", "stencil"), null);
  assert.ok(!listFallbackPacks().some((pack) => pack.owner.githubLogin === "examples"));
});

test("catalog adds 3 named seats on existing packs (8pm 2026-09-26)", () => {
  const stats = fallbackStats();
  assert.equal(stats.packs, 844);
  assert.equal(stats.seats, 1339);

  const scott = getFallbackPack("scottxmetcalf", "scott");
  assert.ok(scott);
  assert.equal(scott.id, "10000000-0000-0000-0000-000000000081");
  assert.equal(scott.owner.id, "00000000-0000-0000-0000-000000000073");
  assert.equal(scott.official, false);
  assert.equal(scott.featured, false);
  assert.equal(scott.seats.length, 28);
  assert.equal(scott.seats[0]?.name, "Leader 1:1 Bot");
  assert.equal(scott.seats[0]?.isDesk, true);
  assert.equal(scott.seats[26]?.id, "20000000-0000-0000-0000-000000000608");
  assert.equal(scott.seats[26]?.name, "Doordash");
  assert.equal(scott.seats[26]?.isDesk, false);
  assert.equal(scott.seats[26]?.sortOrder, 26);
  assert.equal(scott.seats[26]?.repeatsWhen, null);
  assert.equal(scott.seats[26]?.grokTemplateUrl, "https://x.ai/bot/J7I56EwtEh0D3yMGhnwSZ");
  assert.match(
    scott.seats[26]?.job ?? "",
    /Your DoorDash operator\. Builds carts, tracks credits and DashPass/
  );
  assert.match(
    scott.routingRule,
    /Use Doordash only for DoorDash cart \/ DashPass \/ live-track \/ work-meal receipt filing\./
  );
  assert.match(seedSql, /20000000-0000-0000-0000-000000000608/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/J7I56EwtEh0D3yMGhnwSZ/);

  const serg = getFallbackPack("arouch_serg", "serg");
  assert.ok(serg);
  assert.equal(serg.id, "10000000-0000-0000-0000-000000000428");
  assert.equal(serg.owner.id, "00000000-0000-0000-0000-000000000420");
  assert.equal(serg.official, false);
  assert.equal(serg.featured, false);
  assert.equal(serg.seats.length, 4);
  assert.equal(serg.seats[0]?.name, "Scroll");
  assert.equal(serg.seats[0]?.isDesk, true);
  assert.equal(serg.seats[1]?.id, "20000000-0000-0000-0000-000000000609");
  assert.equal(serg.seats[1]?.name, "Fuel");
  assert.equal(serg.seats[1]?.isDesk, false);
  assert.equal(serg.seats[1]?.sortOrder, 1);
  assert.equal(serg.seats[1]?.repeatsWhen, null);
  assert.equal(serg.seats[1]?.grokTemplateUrl, "https://x.ai/bot/Snd56ionW_F2lDtn_bhRf");
  assert.match(serg.seats[1]?.job ?? "", /A calorie tracking and meal-prep assistant/);
    assert.equal(
    serg.routingRule,
    "Random questions stay at Scroll. Use Fuel only for calorie tracking and meal-prep. Use Ledger only for Ledger work. Use Forge only for Forge work. Named seats only when that job is already in this pack."
  );
  assert.match(seedSql, /20000000-0000-0000-0000-000000000609/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/Snd56ionW_F2lDtn_bhRf/);

  const xi = getFallbackPack("elizrdrake", "xi");
  assert.ok(xi);
  assert.equal(xi.id, "10000000-0000-0000-0000-000000000385");
  assert.equal(xi.owner.id, "00000000-0000-0000-0000-000000000377");
  assert.equal(xi.official, false);
  assert.equal(xi.featured, false);
  assert.equal(xi.seats.length, 3);
  assert.equal(xi.seats[0]?.name, "Ad Aether");
  assert.equal(xi.seats[0]?.isDesk, true);
  assert.equal(xi.seats[1]?.name, "Ad Umbra");
  assert.equal(xi.seats[1]?.isDesk, false);
  assert.equal(xi.seats[2]?.id, "20000000-0000-0000-0000-000000000610");
  assert.equal(xi.seats[2]?.name, "Sputnik 1");
  assert.equal(xi.seats[2]?.isDesk, false);
  assert.equal(xi.seats[2]?.sortOrder, 2);
  assert.equal(xi.seats[2]?.repeatsWhen, null);
  assert.equal(xi.seats[2]?.grokTemplateUrl, "https://x.ai/bot/0eNrUiaGS_HCEBNBMtS-N");
  assert.match(xi.seats[2]?.job ?? "", /Commander & Chief of The Everything Bots/);
  assert.match(
    xi.routingRule,
    /Use Sputnik 1 only for Everything Bots captain \/ crew intro \/ quest routing\./
  );
  assert.match(seedSql, /20000000-0000-0000-0000-000000000610/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/0eNrUiaGS_HCEBNBMtS-N/);

  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url): url is string => Boolean(url));
  assert.equal(fallbackUrls.length, 1339);
  assert.equal(new Set(fallbackUrls).size, 1339);
  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  for (const url of [
    "https://x.ai/bot/J7I56EwtEh0D3yMGhnwSZ",
    "https://x.ai/bot/Snd56ionW_F2lDtn_bhRf",
    "https://x.ai/bot/0eNrUiaGS_HCEBNBMtS-N",
  ]) {
    assert.equal(fallbackUrls.filter((item) => item === url).length, 1, url);
    assert.equal(seedUrlMatches.filter((item) => item === url).length, 1, url);
  }
});

test("catalog adds 1 named seat on existing pack (8pm 2026-09-27)", () => {
  const stats = fallbackStats();
  assert.equal(stats.packs, 844);
  assert.equal(stats.seats, 1339);

  const scott = getFallbackPack("scottxmetcalf", "scott");
  assert.ok(scott);
  assert.equal(scott.id, "10000000-0000-0000-0000-000000000081");
  assert.equal(scott.owner.id, "00000000-0000-0000-0000-000000000073");
  assert.equal(scott.official, false);
  assert.equal(scott.featured, false);
  assert.equal(scott.seats.length, 28);
  assert.equal(scott.seats[0]?.name, "Leader 1:1 Bot");
  assert.equal(scott.seats[0]?.isDesk, true);
  assert.equal(scott.seats[27]?.id, "20000000-0000-0000-0000-000000000611");
  assert.equal(scott.seats[27]?.name, "Competitive Snake Alert");
  assert.equal(scott.seats[27]?.isDesk, false);
  assert.equal(scott.seats[27]?.sortOrder, 27);
  assert.equal(scott.seats[27]?.repeatsWhen, null);
  assert.equal(scott.seats[27]?.grokTemplateUrl, "https://x.ai/bot/NqCINqE9LDY9XTw2vP_XT");
  assert.match(
    scott.seats[27]?.job ?? "",
    /Watches a named competitor list and drafts short snake alerts/
  );
  assert.match(
    scott.routingRule,
    /Use Competitive Snake Alert only for competitor watch \/ pricing-launch-positioning snake alerts \(human-in-the-loop before outbound\)\./
  );
  assert.match(seedSql, /20000000-0000-0000-0000-000000000611/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/NqCINqE9LDY9XTw2vP_XT/);

  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url): url is string => Boolean(url));
  assert.equal(fallbackUrls.length, 1339);
  assert.equal(new Set(fallbackUrls).size, 1339);
  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  assert.equal(fallbackUrls.filter((item) => item === "https://x.ai/bot/NqCINqE9LDY9XTw2vP_XT").length, 1);
  assert.equal(seedUrlMatches.filter((item) => item === "https://x.ai/bot/NqCINqE9LDY9XTw2vP_XT").length, 1);
});

test("catalog adds 1 named seat on existing pack (8pm 2026-09-30)", () => {
  const stats = fallbackStats();
  assert.equal(stats.packs, 844);
  assert.equal(stats.seats, 1339);

  const knock = getFallbackPack("suddenlyjon", "knock");
  assert.ok(knock);
  assert.equal(knock.id, "10000000-0000-0000-0000-000000000126");
  assert.equal(knock.owner.id, "00000000-0000-0000-0000-000000000118");
  assert.equal(knock.owner.githubLogin, "suddenlyjon");
  assert.equal(knock.official, false);
  assert.equal(knock.featured, false);
  assert.equal(knock.seats.length, 44);
  assert.equal(knock.seats[0]?.name, "Token Accountant");
  assert.equal(knock.seats[0]?.isDesk, true);
  assert.equal(knock.seats[29]?.id, "20000000-0000-0000-0000-000000000612");
  assert.equal(knock.seats[29]?.name, "Fit Finder");
  assert.equal(knock.seats[29]?.isDesk, false);
  assert.equal(knock.seats[29]?.sortOrder, 29);
  assert.equal(knock.seats[29]?.repeatsWhen, null);
  assert.equal(knock.seats[29]?.grokTemplateUrl, "https://x.ai/bot/0boCprpn_3yaiJ5PZIGCw");
  assert.match(
    knock.seats[29]?.job ?? "",
    /Send a photo of an outfit you like and get real store links/
  );
  assert.match(
    knock.routingRule,
    /Use Fit Finder only for outfit-from-photo shopping links \(exact\/close\/budget; no auto-buy\)\./
  );
  assert.match(
    knock.readmeMd ?? "",
    /Fit Finder is outfit-from-photo shopping links only; exact\/close\/budget; no auto-buy/
  );
  assert.match(seedSql, /20000000-0000-0000-0000-000000000612/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/0boCprpn_3yaiJ5PZIGCw/);
  assert.equal(getFallbackPack("examples", "stencil"), null);

  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url): url is string => Boolean(url));
  assert.equal(fallbackUrls.length, 1339);
  assert.equal(new Set(fallbackUrls).size, 1339);
  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  assert.equal(fallbackUrls.filter((item) => item === "https://x.ai/bot/0boCprpn_3yaiJ5PZIGCw").length, 1);
  assert.equal(seedUrlMatches.filter((item) => item === "https://x.ai/bot/0boCprpn_3yaiJ5PZIGCw").length, 1);
  assert.ok(!fallbackUrls.includes("https://x.ai/bot/l82Fnugc2EEblUuMwyeaV"));
  assert.ok(!seedSql.includes("https://x.ai/bot/l82Fnugc2EEblUuMwyeaV"));
});

test("catalog adds 1 named seat on existing pack (8pm 2026-10-01)", () => {
  const stats = fallbackStats();
  assert.equal(stats.packs, 844);
  assert.equal(stats.seats, 1339);

  const colin = getFallbackPack("colinmcdermott", "colin");
  assert.ok(colin);
  assert.equal(colin.id, "10000000-0000-0000-0000-000000000240");
  assert.equal(colin.owner.id, "00000000-0000-0000-0000-000000000232");
  assert.equal(colin.owner.githubLogin, "colinmcdermott");
  assert.equal(colin.owner.xHandle, "ColinMcDermott");
  assert.equal(colin.official, false);
  assert.equal(colin.featured, false);
  assert.equal(colin.seats.length, 12);
  assert.equal(colin.seats[0]?.id, "20000000-0000-0000-0000-000000000341");
  assert.equal(colin.seats[0]?.name, "Store setup from zero");
  assert.equal(colin.seats[0]?.isDesk, true);
  assert.equal(colin.seats[0]?.sortOrder, 0);
  assert.equal(colin.seats[10]?.name, "Jev router");
  assert.equal(colin.seats[10]?.id, "20000000-0000-0000-0000-000000000599");
  assert.equal(colin.seats[10]?.sortOrder, 10);
  assert.equal(colin.seats[11]?.id, "20000000-0000-0000-0000-000000000613");
  assert.equal(colin.seats[11]?.name, "Whop Economic Intelligence");
  assert.equal(colin.seats[11]?.isDesk, false);
  assert.equal(colin.seats[11]?.sortOrder, 11);
  assert.equal(colin.seats[11]?.repeatsWhen, null);
  assert.equal(colin.seats[11]?.grokTemplateUrl, "https://x.ai/bot/M2ZLrLAUFFU0fFf6Aq28c");
  assert.match(
    colin.seats[11]?.job ?? "",
    /Runs Whop Economic Intelligence for your business: shows the single best next action with evidence/
  );
  assert.match(
    colin.routingRule,
    /Use Whop Economic Intelligence only for Whop next-best-action \/ economic-intelligence\./
  );
  assert.match(
    colin.readmeMd ?? "",
    /Whop Economic Intelligence is the Whop next-best-action \/ economic-intelligence lane/
  );
  assert.equal(colin.seats.filter((seat) => seat.isDesk).length, 1);
  assert.match(seedSql, /20000000-0000-0000-0000-000000000613/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/M2ZLrLAUFFU0fFf6Aq28c/);
  assert.equal(getFallbackPack("examples", "stencil"), null);

  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url): url is string => Boolean(url));
  assert.equal(fallbackUrls.length, 1339);
  assert.equal(new Set(fallbackUrls).size, 1339);
  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  assert.equal(fallbackUrls.filter((item) => item === "https://x.ai/bot/M2ZLrLAUFFU0fFf6Aq28c").length, 1);
  assert.equal(seedUrlMatches.filter((item) => item === "https://x.ai/bot/M2ZLrLAUFFU0fFf6Aq28c").length, 1);
  assert.ok(!fallbackUrls.includes("https://x.ai/bot/l82Fnugc2EEblUuMwyeaV"));
  assert.ok(!seedSql.includes("https://x.ai/bot/l82Fnugc2EEblUuMwyeaV"));
});

test("catalog adds 1 named seat on existing pack (8pm 2026-10-02)", () => {
  const stats = fallbackStats();
  assert.equal(stats.packs, 844);
  assert.equal(stats.seats, 1339);

  const knock = getFallbackPack("suddenlyjon", "knock");
  assert.ok(knock);
  assert.equal(knock.id, "10000000-0000-0000-0000-000000000126");
  assert.equal(knock.owner.id, "00000000-0000-0000-0000-000000000118");
  assert.equal(knock.owner.githubLogin, "suddenlyjon");
  assert.equal(knock.owner.xHandle, "SuddenlyJon");
  assert.equal(knock.official, false);
  assert.equal(knock.featured, false);
  assert.equal(knock.seats.length, 44);
  assert.equal(knock.seats[0]?.id, "20000000-0000-0000-0000-000000000145");
  assert.equal(knock.seats[0]?.name, "Token Accountant");
  assert.equal(knock.seats[0]?.isDesk, true);
  assert.equal(knock.seats[0]?.sortOrder, 0);
  assert.equal(knock.seats[0]?.grokTemplateUrl, "https://x.ai/bot/zdnVIfLkNmRwZqqogojuc");
  assert.equal(knock.seats[29]?.name, "Fit Finder");
  assert.equal(knock.seats[29]?.id, "20000000-0000-0000-0000-000000000612");
  assert.equal(knock.seats[29]?.sortOrder, 29);
  assert.equal(knock.seats[30]?.id, "20000000-0000-0000-0000-000000000614");
  assert.equal(knock.seats[30]?.name, "Rebrander");
  assert.equal(knock.seats[30]?.isDesk, false);
  assert.equal(knock.seats[30]?.sortOrder, 30);
  assert.equal(knock.seats[30]?.repeatsWhen, null);
  assert.equal(knock.seats[30]?.grokTemplateUrl, "https://x.ai/bot/HGorKc5KDQLynW4JONxn_");
  assert.match(
    knock.seats[30]?.job ?? "",
    /Finds every trace of the old brand online, builds a step-by-step switchover plan and PDF report/
  );
  assert.match(
    knock.routingRule,
    /Use Rebrander only for business\/product rename \/ old-brand cleanup\./
  );
  assert.match(
    knock.readmeMd ?? "",
    /Rebrander is business\/product rename \/ old-brand cleanup only/
  );
  assert.equal(knock.seats.filter((seat) => seat.isDesk).length, 1);
  assert.match(seedSql, /20000000-0000-0000-0000-000000000614/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/HGorKc5KDQLynW4JONxn_/);
  assert.equal(getFallbackPack("examples", "stencil"), null);

  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url): url is string => Boolean(url));
  assert.equal(fallbackUrls.length, 1339);
  assert.equal(new Set(fallbackUrls).size, 1339);
  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  assert.equal(fallbackUrls.filter((item) => item === "https://x.ai/bot/HGorKc5KDQLynW4JONxn_").length, 1);
  assert.equal(seedUrlMatches.filter((item) => item === "https://x.ai/bot/HGorKc5KDQLynW4JONxn_").length, 1);
  assert.ok(!fallbackUrls.includes("https://x.ai/bot/l82Fnugc2EEblUuMwyeaV"));
  assert.ok(!seedSql.includes("https://x.ai/bot/l82Fnugc2EEblUuMwyeaV"));
});

test("catalog adds 1 new pack (8pm 2026-10-03)", () => {
  const stats = fallbackStats();
  assert.equal(stats.packs, 844);
  assert.equal(stats.seats, 1339);

  const bernard = getFallbackPack("beksvie", "bernard");
  assert.ok(bernard);
  assert.equal(bernard.id, "10000000-0000-0000-0000-000000000431");
  assert.equal(bernard.owner.id, "00000000-0000-0000-0000-000000000423");
  assert.equal(bernard.owner.githubLogin, "beksvie");
  assert.equal(bernard.owner.name, "Bernard");
  assert.equal(bernard.owner.avatarUrl, null);
  assert.equal(bernard.owner.xHandle, "beksvie");
  assert.equal(bernard.slug, "bernard");
  assert.equal(bernard.name, "Bernard");
  assert.equal(
    bernard.description,
    "Public Grok Bot templates Bernard (@beksvie / BeKs) has shared. One pack, his roster, official Grok install per seat."
  );
  assert.equal(bernard.githubUrl, null);
  assert.equal(bernard.official, false);
  assert.equal(bernard.featured, false);
  assert.deepEqual(bernard.topics, ["founder"]);
  assert.equal(bernard.likesCount, 0);
  assert.equal(bernard.installsCount, 0);
  assert.equal(bernard.visitsCount, 0);
  assert.equal(
    bernard.routingRule,
    "Random questions stay at Bot Builder. Named seats only when that job is already in this pack."
  );
  assert.match(
    bernard.readmeMd ?? "",
    /Bot Builder designs focused Grok Bot fleets \(CoS \+ specialists\), crawl→walk→run, and a Sunday skill\/roster back-check/
  );
  assert.equal(bernard.seats.length, 1);
  assert.equal(bernard.seats[0]?.id, "20000000-0000-0000-0000-000000000615");
  assert.equal(bernard.seats[0]?.name, "Bot Builder");
  assert.equal(
    bernard.seats[0]?.job,
    "Designs and creates focused Grok Bots and small fleets — clear jobs, CoS routing, verification, crawl→walk→run, and a Sunday skill/roster back-check — not catch-all helpers."
  );
  assert.equal(bernard.seats[0]?.repeatsWhen, null);
  assert.equal(bernard.seats[0]?.isDesk, true);
  assert.equal(bernard.seats[0]?.sortOrder, 0);
  assert.equal(bernard.seats[0]?.grokTemplateUrl, "https://x.ai/bot/xwzDwQIkd1LYOIN1akMxy");
  assert.equal(bernard.seats.filter((seat) => seat.isDesk).length, 1);
  assert.equal(listFallbackPacksByOwner("beksvie").length, 1);
  assert.ok(getFallbackProfile("beksvie"));
  assert.match(seedSql, /00000000-0000-0000-0000-000000000423/);
  assert.match(seedSql, /10000000-0000-0000-0000-000000000431/);
  assert.match(seedSql, /20000000-0000-0000-0000-000000000615/);
  assert.match(seedSql, /https:\/\/x\.ai\/bot\/xwzDwQIkd1LYOIN1akMxy/);
  assert.equal(getFallbackPack("examples", "stencil"), null);

  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url): url is string => Boolean(url));
  assert.equal(fallbackUrls.length, 1339);
  assert.equal(new Set(fallbackUrls).size, 1339);
  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  assert.equal(fallbackUrls.filter((item) => item === "https://x.ai/bot/xwzDwQIkd1LYOIN1akMxy").length, 1);
  assert.equal(seedUrlMatches.filter((item) => item === "https://x.ai/bot/xwzDwQIkd1LYOIN1akMxy").length, 1);
  assert.ok(!fallbackUrls.includes("https://x.ai/bot/l82Fnugc2EEblUuMwyeaV"));
  assert.ok(!seedSql.includes("https://x.ai/bot/l82Fnugc2EEblUuMwyeaV"));
});
test("catalog adds Oct 4–13 official public Grok Bot backlog", () => {
  const stats = fallbackStats();
  assert.equal(stats.packs, 844);
  assert.equal(stats.seats, 1339);

  const expected = [
  {
    "owner": "MeechYourGoals",
    "slug": "christian",
    "packName": "Christian",
    "ownerName": "Christian",
    "ownerId": "00000000-0000-0000-0000-000000000424",
    "packId": "10000000-0000-0000-0000-000000000432",
    "desk": "Google Play",
    "seatId": "20000000-0000-0000-0000-000000000616",
    "url": "https://x.ai/bot/ZPLL-JcuEjP7_vtM-TFyV",
    "seats": 4
  },
  {
    "owner": "CanadianOddity",
    "slug": "sherlock",
    "packName": "Sherlock",
    "ownerName": "Sherlock",
    "ownerId": "00000000-0000-0000-0000-000000000425",
    "packId": "10000000-0000-0000-0000-000000000433",
    "desk": "Browse",
    "seatId": "20000000-0000-0000-0000-000000000630",
    "url": "https://x.ai/bot/aPie95rXmGm4w5z0H31EH",
    "seats": 1
  },
  {
    "owner": "markcassara",
    "slug": "mark",
    "packName": "Mark",
    "ownerName": "Mark Cassara",
    "ownerId": "00000000-0000-0000-0000-000000000426",
    "packId": "10000000-0000-0000-0000-000000000434",
    "desk": "Operator",
    "seatId": "20000000-0000-0000-0000-000000000631",
    "url": "https://x.ai/bot/VRju--X8VRlzTySAh-WTd",
    "seats": 1
  },
  {
    "owner": "Ulises__gg",
    "slug": "ulises",
    "packName": "Ulises",
    "ownerName": "Ulises",
    "ownerId": "00000000-0000-0000-0000-000000000427",
    "packId": "10000000-0000-0000-0000-000000000435",
    "desk": "Warren",
    "seatId": "20000000-0000-0000-0000-000000000632",
    "url": "https://x.ai/bot/VFQeZWpVL_euCJbWzhJOF",
    "seats": 1
  },
  {
    "owner": "Foundation_Bots",
    "slug": "foundation",
    "packName": "Foundation",
    "ownerName": "Foundation Robots",
    "ownerId": "00000000-0000-0000-0000-000000000428",
    "packId": "10000000-0000-0000-0000-000000000436",
    "desk": "Right Model, Effort & Prompt",
    "seatId": "20000000-0000-0000-0000-000000000633",
    "url": "https://x.ai/bot/T3hutFteALP3ObLPxQJpn",
    "seats": 2
  },
  {
    "owner": "StuyBoyNY",
    "slug": "stuyboy",
    "packName": "StuyBoy",
    "ownerName": "StuyBoy From NYC",
    "ownerId": "00000000-0000-0000-0000-000000000429",
    "packId": "10000000-0000-0000-0000-000000000437",
    "desk": "MyPeople Bot",
    "seatId": "20000000-0000-0000-0000-000000000635",
    "url": "https://x.ai/bot/v5MedUVzGQEty_TkPMpyL",
    "seats": 1
  },
  {
    "owner": "prorookiegamer",
    "slug": "prorookiegamer",
    "packName": "prorookiegamer",
    "ownerName": "prorookiegamer",
    "ownerId": "00000000-0000-0000-0000-000000000430",
    "packId": "10000000-0000-0000-0000-000000000438",
    "desk": "Money Minute",
    "seatId": "20000000-0000-0000-0000-000000000636",
    "url": "https://x.ai/bot/k6lmP0975z3GfVpJiyN5D",
    "seats": 4
  },
  {
    "owner": "TripVoxel",
    "slug": "tokin",
    "packName": "Tokin",
    "ownerName": "Tokin Trip",
    "ownerId": "00000000-0000-0000-0000-000000000431",
    "packId": "10000000-0000-0000-0000-000000000439",
    "desk": "How To Build Any App From Idea To Shelf",
    "seatId": "20000000-0000-0000-0000-000000000640",
    "url": "https://x.ai/bot/y_5NbvloRD4oA-Fi3S7Nv",
    "seats": 1
  },
  {
    "owner": "HazeyDataFred",
    "slug": "fred",
    "packName": "Fred",
    "ownerName": "Fred Hazelton",
    "ownerId": "00000000-0000-0000-0000-000000000432",
    "packId": "10000000-0000-0000-0000-000000000440",
    "desk": "Data viz",
    "seatId": "20000000-0000-0000-0000-000000000641",
    "url": "https://x.ai/bot/xk4TYexNbnfmS8l88QR8v",
    "seats": 1
  },
  {
    "owner": "MichaelGannotti",
    "slug": "mike",
    "packName": "Mike",
    "ownerName": "Mike Gannotti",
    "ownerId": "00000000-0000-0000-0000-000000000433",
    "packId": "10000000-0000-0000-0000-000000000441",
    "desk": "First-Week Coach",
    "seatId": "20000000-0000-0000-0000-000000000642",
    "url": "https://x.ai/bot/kOQ7mWg9DLWq2-UpGKf67",
    "seats": 3
  },
  {
    "owner": "FanEditFanClub",
    "slug": "fan",
    "packName": "Fan",
    "ownerName": "Fan Edit Fan Club",
    "ownerId": "00000000-0000-0000-0000-000000000434",
    "packId": "10000000-0000-0000-0000-000000000442",
    "desk": "Fan Edit Optimus",
    "seatId": "20000000-0000-0000-0000-000000000645",
    "url": "https://x.ai/bot/DR18SV4AEeeNRcKT1U-0P",
    "seats": 1
  },
  {
    "owner": "garrettRandom99",
    "slug": "garrett",
    "packName": "Garrett",
    "ownerName": "Garrett",
    "ownerId": "00000000-0000-0000-0000-000000000435",
    "packId": "10000000-0000-0000-0000-000000000443",
    "desk": "Firefox for Bots",
    "seatId": "20000000-0000-0000-0000-000000000646",
    "url": "https://x.ai/bot/7v-lRs0HUGjU8zD_0-tGg",
    "seats": 1
  },
  {
    "owner": "BudJohnson",
    "slug": "bud",
    "packName": "Bud",
    "ownerName": "Bud Johnson",
    "ownerId": "00000000-0000-0000-0000-000000000436",
    "packId": "10000000-0000-0000-0000-000000000444",
    "desk": "Speaker",
    "seatId": "20000000-0000-0000-0000-000000000647",
    "url": "https://x.ai/bot/MYauHGRcP387M8a_2mbNT",
    "seats": 1
  },
  {
    "owner": "pjvann",
    "slug": "paul",
    "packName": "Paul",
    "ownerName": "Paul Vann",
    "ownerId": "00000000-0000-0000-0000-000000000437",
    "packId": "10000000-0000-0000-0000-000000000445",
    "desk": "Threat Intelligence Lead",
    "seatId": "20000000-0000-0000-0000-000000000648",
    "url": "https://x.ai/bot/rA0W6mLYqVJky28FKrCBf",
    "seats": 1
  },
  {
    "owner": "ByronWalkerfl",
    "slug": "byron",
    "packName": "Byron",
    "ownerName": "Byron Walker",
    "ownerId": "00000000-0000-0000-0000-000000000438",
    "packId": "10000000-0000-0000-0000-000000000446",
    "desk": "Nole",
    "seatId": "20000000-0000-0000-0000-000000000649",
    "url": "https://x.ai/bot/uMMbmNv7SbMGHezgUGoiG",
    "seats": 1
  },
  {
    "owner": "thewyattbrocato",
    "slug": "wyatt",
    "packName": "Wyatt",
    "ownerName": "Wyatt Brocato",
    "ownerId": "00000000-0000-0000-0000-000000000439",
    "packId": "10000000-0000-0000-0000-000000000447",
    "desk": "Chief of Staff",
    "seatId": "20000000-0000-0000-0000-000000000650",
    "url": "https://x.ai/bot/ztvf_N5Au60fEOZNBZ3BH",
    "seats": 2
  },
  {
    "owner": "GrokBotGod",
    "slug": "grokbotgod",
    "packName": "GrokBotGod",
    "ownerName": "GrokBotGod",
    "ownerId": "00000000-0000-0000-0000-000000000440",
    "packId": "10000000-0000-0000-0000-000000000448",
    "desk": "Grok Bot Polish",
    "seatId": "20000000-0000-0000-0000-000000000652",
    "url": "https://x.ai/bot/EN9N53oqx8y1kvHP4BAh4",
    "seats": 5
  },
  {
    "owner": "cao282828",
    "slug": "juan",
    "packName": "Juan",
    "ownerName": "Juan",
    "ownerId": "00000000-0000-0000-0000-000000000441",
    "packId": "10000000-0000-0000-0000-000000000449",
    "desk": "X Creator",
    "seatId": "20000000-0000-0000-0000-000000000657",
    "url": "https://x.ai/bot/6mKW38QZDoaNq1SQxu_PQ",
    "seats": 1
  },
  {
    "owner": "taglocklar",
    "slug": "tag",
    "packName": "Tag",
    "ownerName": "Tag",
    "ownerId": "00000000-0000-0000-0000-000000000442",
    "packId": "10000000-0000-0000-0000-000000000450",
    "desk": "Redact",
    "seatId": "20000000-0000-0000-0000-000000000658",
    "url": "https://x.ai/bot/lTECTKtNLwK_xZhTaq_d_",
    "seats": 1
  },
  {
    "owner": "saadkamal",
    "slug": "saad",
    "packName": "Saad",
    "ownerName": "Saad",
    "ownerId": "00000000-0000-0000-0000-000000000443",
    "packId": "10000000-0000-0000-0000-000000000451",
    "desk": "Lauren (@poteto)",
    "seatId": "20000000-0000-0000-0000-000000000659",
    "url": "https://x.ai/bot/4KAElqS6FCSb73vLXZ14S",
    "seats": 1
  },
  {
    "owner": "TyeInBloom",
    "slug": "tye",
    "packName": "Tye",
    "ownerName": "Tye Gordon",
    "ownerId": "00000000-0000-0000-0000-000000000444",
    "packId": "10000000-0000-0000-0000-000000000452",
    "desk": "PepeTrack",
    "seatId": "20000000-0000-0000-0000-000000000660",
    "url": "https://x.ai/bot/nooY_fiizqHxS9TB4z74g",
    "seats": 1
  },
  {
    "owner": "Arceris_btc",
    "slug": "colin",
    "packName": "Colin",
    "ownerName": "Colin Crossman ₿",
    "ownerId": "00000000-0000-0000-0000-000000000445",
    "packId": "10000000-0000-0000-0000-000000000453",
    "desk": "Sunday Table",
    "seatId": "20000000-0000-0000-0000-000000000661",
    "url": "https://x.ai/bot/m9mPH3iwvuuNBd3IOarpC",
    "seats": 2
  },
  {
    "owner": "Marlene8055",
    "slug": "marlene",
    "packName": "Marlene",
    "ownerName": "Marlene",
    "ownerId": "00000000-0000-0000-0000-000000000446",
    "packId": "10000000-0000-0000-0000-000000000454",
    "desk": "Budget Coach",
    "seatId": "20000000-0000-0000-0000-000000000663",
    "url": "https://x.ai/bot/ZJrwuDsQRM1QBC-xQ-Ext",
    "seats": 1
  },
  {
    "owner": "WaitWhat",
    "slug": "lincoln",
    "packName": "Lincoln",
    "ownerName": "Lincoln",
    "ownerId": "00000000-0000-0000-0000-000000000447",
    "packId": "10000000-0000-0000-0000-000000000455",
    "desk": "Tesla Ready",
    "seatId": "20000000-0000-0000-0000-000000000665",
    "url": "https://x.ai/bot/L5Sczwabgsf59rZ6RTChF",
    "seats": 1
  },
  {
    "owner": "melvindvivas",
    "slug": "melvin",
    "packName": "Melvin",
    "ownerName": "Melvin Vivas",
    "ownerId": "00000000-0000-0000-0000-000000000448",
    "packId": "10000000-0000-0000-0000-000000000456",
    "desk": "Devil's Advocate",
    "seatId": "20000000-0000-0000-0000-000000000666",
    "url": "https://x.ai/bot/Uj8zF0iprBX0AsSB3mU2V",
    "seats": 2
  },
  {
    "owner": "lenabuyan",
    "slug": "lena",
    "packName": "Lena",
    "ownerName": "Lena Buyan",
    "ownerId": "00000000-0000-0000-0000-000000000449",
    "packId": "10000000-0000-0000-0000-000000000457",
    "desk": "Make It Click",
    "seatId": "20000000-0000-0000-0000-000000000668",
    "url": "https://x.ai/bot/_zzfxlEvWwRKyQVPLB14i",
    "seats": 1
  },
  {
    "owner": "DrewBedard",
    "slug": "drew",
    "packName": "Drew",
    "ownerName": "Drew Bedard",
    "ownerId": "00000000-0000-0000-0000-000000000450",
    "packId": "10000000-0000-0000-0000-000000000458",
    "desk": "Car Finder",
    "seatId": "20000000-0000-0000-0000-000000000669",
    "url": "https://x.ai/bot/kT9NWT76KzlpOns_iLDAz",
    "seats": 1
  },
  {
    "owner": "TherealWitty22",
    "slug": "witty",
    "packName": "Witty",
    "ownerName": "Witty",
    "ownerId": "00000000-0000-0000-0000-000000000451",
    "packId": "10000000-0000-0000-0000-000000000459",
    "desk": "Crew Chief",
    "seatId": "20000000-0000-0000-0000-000000000670",
    "url": "https://x.ai/bot/pzOyKHLO2umBr2Flo31py",
    "seats": 1
  },
  {
    "owner": "weboperater",
    "slug": "weboperater",
    "packName": "weboperater",
    "ownerName": "weboperater",
    "ownerId": "00000000-0000-0000-0000-000000000452",
    "packId": "10000000-0000-0000-0000-000000000460",
    "desk": "Fleet Review Desk",
    "seatId": "20000000-0000-0000-0000-000000000671",
    "url": "https://x.ai/bot/KT8Px1yf07UDJOmHESqog",
    "seats": 1
  },
  {
    "owner": "LokiBytesBack",
    "slug": "loki",
    "packName": "Loki",
    "ownerName": "Loki",
    "ownerId": "00000000-0000-0000-0000-000000000453",
    "packId": "10000000-0000-0000-0000-000000000461",
    "desk": "Sanji",
    "seatId": "20000000-0000-0000-0000-000000000672",
    "url": "https://x.ai/bot/bChXlV3rCYKI7a_vMdw3Z",
    "seats": 1
  },
  {
    "owner": "hyein_cbio",
    "slug": "dr",
    "packName": "Dr.",
    "ownerName": "Dr. Hyein Cho",
    "ownerId": "00000000-0000-0000-0000-000000000454",
    "packId": "10000000-0000-0000-0000-000000000462",
    "desk": "Let's read journals",
    "seatId": "20000000-0000-0000-0000-000000000673",
    "url": "https://x.ai/bot/lSzwtEdLTJucJvzWrECA0",
    "seats": 1
  },
  {
    "owner": "Rune_King_Jake",
    "slug": "jakefromstarstruck",
    "packName": "JakeFromStarstruck.",
    "ownerName": "JakeFromStarstruck.",
    "ownerId": "00000000-0000-0000-0000-000000000455",
    "packId": "10000000-0000-0000-0000-000000000463",
    "desk": "Last Call",
    "seatId": "20000000-0000-0000-0000-000000000674",
    "url": "https://x.ai/bot/foL7wsA2OpQ6k5d0o7JZK",
    "seats": 4
  },
  {
    "owner": "ibuildthings",
    "slug": "jono",
    "packName": "Jono",
    "ownerName": "Jono Chowdhury",
    "ownerId": "00000000-0000-0000-0000-000000000456",
    "packId": "10000000-0000-0000-0000-000000000464",
    "desk": "TARS",
    "seatId": "20000000-0000-0000-0000-000000000678",
    "url": "https://x.ai/bot/fyuSERJF73FI7wFYm7cJF",
    "seats": 9
  },
  {
    "owner": "gearcaleeeb",
    "slug": "caleeeb",
    "packName": "Caleeeb",
    "ownerName": "Caleeeb",
    "ownerId": "00000000-0000-0000-0000-000000000457",
    "packId": "10000000-0000-0000-0000-000000000465",
    "desk": "WMP",
    "seatId": "20000000-0000-0000-0000-000000000687",
    "url": "https://x.ai/bot/iPOF34o7dtafNEpVhIQRt",
    "seats": 1
  },
  {
    "owner": "NickADobos",
    "slug": "nick",
    "packName": "Nick",
    "ownerName": "Nick Dobos",
    "ownerId": "00000000-0000-0000-0000-000000000458",
    "packId": "10000000-0000-0000-0000-000000000466",
    "desk": "Grimoire",
    "seatId": "20000000-0000-0000-0000-000000000695",
    "url": "https://x.ai/bot/luPJeAxuAjhqO97wU3wm0",
    "seats": 1
  },
  {
    "owner": "darkart",
    "slug": "yin",
    "packName": "Yin",
    "ownerName": "Yin Lai",
    "ownerId": "00000000-0000-0000-0000-000000000459",
    "packId": "10000000-0000-0000-0000-000000000467",
    "desk": "Live Pages",
    "seatId": "20000000-0000-0000-0000-000000000696",
    "url": "https://x.ai/bot/ignLvLJlOxOIenZPr-tTA",
    "seats": 1
  },
  {
    "owner": "stbenjam",
    "slug": "stephen",
    "packName": "Stephen",
    "ownerName": "Stephen Benjamin",
    "ownerId": "00000000-0000-0000-0000-000000000460",
    "packId": "10000000-0000-0000-0000-000000000468",
    "desk": "Travel Steward",
    "seatId": "20000000-0000-0000-0000-000000000698",
    "url": "https://x.ai/bot/WNoawju9U2WDwe2yPxGjO",
    "seats": 1
  },
  {
    "owner": "R0b3rtBaker",
    "slug": "robert",
    "packName": "Robert",
    "ownerName": "Robert",
    "ownerId": "00000000-0000-0000-0000-000000000461",
    "packId": "10000000-0000-0000-0000-000000000469",
    "desk": "Print Desk",
    "seatId": "20000000-0000-0000-0000-000000000699",
    "url": "https://x.ai/bot/9UsYLJEmqyT7mEUWqPLiL",
    "seats": 1
  },
  {
    "owner": "wikiwayne",
    "slug": "wayne",
    "packName": "Wayne",
    "ownerName": "Wayne Lowry",
    "ownerId": "00000000-0000-0000-0000-000000000462",
    "packId": "10000000-0000-0000-0000-000000000470",
    "desk": "Asana Task Master",
    "seatId": "20000000-0000-0000-0000-000000000700",
    "url": "https://x.ai/bot/S2LodAIjlLw0mB30vN3Gl",
    "seats": 4
  },
  {
    "owner": "KevinTweets1",
    "slug": "kevin",
    "packName": "Kevin",
    "ownerName": "Kevin Rank",
    "ownerId": "00000000-0000-0000-0000-000000000463",
    "packId": "10000000-0000-0000-0000-000000000471",
    "desk": "Child Activity Desk",
    "seatId": "20000000-0000-0000-0000-000000000704",
    "url": "https://x.ai/bot/Dc0ZGUypwwBQZE9pNxLYy",
    "seats": 2
  },
  {
    "owner": "neatobird",
    "slug": "useless",
    "packName": "Useless",
    "ownerName": "Useless Turkey",
    "ownerId": "00000000-0000-0000-0000-000000000464",
    "packId": "10000000-0000-0000-0000-000000000472",
    "desk": "gnome stylist",
    "seatId": "20000000-0000-0000-0000-000000000706",
    "url": "https://x.ai/bot/3nxWVqKo1tCJPc3-CM8v8",
    "seats": 1
  },
  {
    "owner": "ZachFergus",
    "slug": "zachary",
    "packName": "Zachary",
    "ownerName": "Zachary Ferguson",
    "ownerId": "00000000-0000-0000-0000-000000000465",
    "packId": "10000000-0000-0000-0000-000000000473",
    "desk": "Zephyr",
    "seatId": "20000000-0000-0000-0000-000000000707",
    "url": "https://x.ai/bot/H7sxHpPsvu7vKG16DrsDU",
    "seats": 1
  },
  {
    "owner": "msmage",
    "slug": "john",
    "packName": "John",
    "ownerName": "John L 🇺🇸",
    "ownerId": "00000000-0000-0000-0000-000000000466",
    "packId": "10000000-0000-0000-0000-000000000474",
    "desk": "Z1 CAM Shop",
    "seatId": "20000000-0000-0000-0000-000000000708",
    "url": "https://x.ai/bot/4TxZ2KVW5aM6bfOleofNb",
    "seats": 2
  },
  {
    "owner": "MarsHomestead",
    "slug": "mars",
    "packName": "Mars",
    "ownerName": "Mars",
    "ownerId": "00000000-0000-0000-0000-000000000467",
    "packId": "10000000-0000-0000-0000-000000000475",
    "desk": "PhotoFix",
    "seatId": "20000000-0000-0000-0000-000000000710",
    "url": "https://x.ai/bot/PRdnJ63L8h0FVlMAA1UN4",
    "seats": 1
  },
  {
    "owner": "fabian_thepulse",
    "slug": "fabian",
    "packName": "Fabian",
    "ownerName": "Fabian Gomez",
    "ownerId": "00000000-0000-0000-0000-000000000468",
    "packId": "10000000-0000-0000-0000-000000000476",
    "desk": "First Customers Finder",
    "seatId": "20000000-0000-0000-0000-000000000711",
    "url": "https://x.ai/bot/1vDU_ekPGWy7UztJhp2yK",
    "seats": 1
  },
  {
    "owner": "berlu135",
    "slug": "luc",
    "packName": "Luc",
    "ownerName": "Luc Bernardin",
    "ownerId": "00000000-0000-0000-0000-000000000469",
    "packId": "10000000-0000-0000-0000-000000000477",
    "desk": "Listener",
    "seatId": "20000000-0000-0000-0000-000000000712",
    "url": "https://x.ai/bot/-BXZiXKHwvcge3PviX2yK",
    "seats": 1
  },
  {
    "owner": "mikioiha",
    "slug": "mikioiha",
    "packName": "みきお",
    "ownerName": "みきお(真)",
    "ownerId": "00000000-0000-0000-0000-000000000470",
    "packId": "10000000-0000-0000-0000-000000000478",
    "desk": "Santa",
    "seatId": "20000000-0000-0000-0000-000000000713",
    "url": "https://x.ai/bot/U7Hz4bRCGQsE9T5lbpakX",
    "seats": 1
  },
  {
    "owner": "carlosbedia",
    "slug": "carlos",
    "packName": "Carlos",
    "ownerName": "Carlos Bedia",
    "ownerId": "00000000-0000-0000-0000-000000000471",
    "packId": "10000000-0000-0000-0000-000000000479",
    "desk": "Cadence",
    "seatId": "20000000-0000-0000-0000-000000000714",
    "url": "https://x.ai/bot/hXNMjR6j1A1gnOYyw-72t",
    "seats": 1
  },
  {
    "owner": "Jasonturcotte",
    "slug": "jason",
    "packName": "Jason",
    "ownerName": "Jason Turcotte",
    "ownerId": "00000000-0000-0000-0000-000000000472",
    "packId": "10000000-0000-0000-0000-000000000480",
    "desk": "Humidor",
    "seatId": "20000000-0000-0000-0000-000000000715",
    "url": "https://x.ai/bot/PiAdZRGosT0GU3e98u7z1",
    "seats": 3
  },
  {
    "owner": "randydigital",
    "slug": "randy",
    "packName": "Randy",
    "ownerName": "Randy Daniel",
    "ownerId": "00000000-0000-0000-0000-000000000473",
    "packId": "10000000-0000-0000-0000-000000000481",
    "desk": "Monty Carlo (NFL Simulator)",
    "seatId": "20000000-0000-0000-0000-000000000718",
    "url": "https://x.ai/bot/5Jph3pVZrvltgoe5lSx_z",
    "seats": 1
  },
  {
    "owner": "viprymr",
    "slug": "v-prymr",
    "packName": "vĩprymr",
    "ownerName": "vĩprymr",
    "ownerId": "00000000-0000-0000-0000-000000000474",
    "packId": "10000000-0000-0000-0000-000000000482",
    "desk": "Tired Day",
    "seatId": "20000000-0000-0000-0000-000000000719",
    "url": "https://x.ai/bot/1f_huZ_GNN0yZcOUuFRQN",
    "seats": 1
  },
  {
    "owner": "rizzy_sol",
    "slug": "rizzy",
    "packName": "rizzy",
    "ownerName": "rizzy",
    "ownerId": "00000000-0000-0000-0000-000000000475",
    "packId": "10000000-0000-0000-0000-000000000483",
    "desk": "Notion Brain",
    "seatId": "20000000-0000-0000-0000-000000000720",
    "url": "https://x.ai/bot/20ALGn4Hyzi2iVP9VTToA",
    "seats": 1
  },
  {
    "owner": "MHW42",
    "slug": "marco",
    "packName": "Marco",
    "ownerName": "Marco W",
    "ownerId": "00000000-0000-0000-0000-000000000476",
    "packId": "10000000-0000-0000-0000-000000000484",
    "desk": "Build Lead",
    "seatId": "20000000-0000-0000-0000-000000000722",
    "url": "https://x.ai/bot/fGdpITFBNM0hisTPaN_Le",
    "seats": 1
  },
  {
    "owner": "loulou_",
    "slug": "loulou",
    "packName": "Loulou",
    "ownerName": "Loulou & Co.",
    "ownerId": "00000000-0000-0000-0000-000000000477",
    "packId": "10000000-0000-0000-0000-000000000485",
    "desk": "Forever Memories",
    "seatId": "20000000-0000-0000-0000-000000000723",
    "url": "https://x.ai/bot/kx5pdQCPu3ZquoV4wcRlt",
    "seats": 1
  },
  {
    "owner": "shirubusutori",
    "slug": "marcello",
    "packName": "Marcello",
    "ownerName": "Marcello Silvestri",
    "ownerId": "00000000-0000-0000-0000-000000000478",
    "packId": "10000000-0000-0000-0000-000000000486",
    "desk": "Hunter",
    "seatId": "20000000-0000-0000-0000-000000000724",
    "url": "https://x.ai/bot/RJMxbT38CZy20YFXNgzI8",
    "seats": 1
  },
  {
    "owner": "therookiehacker",
    "slug": "reuben",
    "packName": "Reuben",
    "ownerName": "Reuben",
    "ownerId": "00000000-0000-0000-0000-000000000479",
    "packId": "10000000-0000-0000-0000-000000000487",
    "desk": "Bookmark Miner",
    "seatId": "20000000-0000-0000-0000-000000000725",
    "url": "https://x.ai/bot/2KoI66uCOtx0PSf3do4tK",
    "seats": 1
  },
  {
    "owner": "Hightv",
    "slug": "high",
    "packName": "High",
    "ownerName": "High",
    "ownerId": "00000000-0000-0000-0000-000000000480",
    "packId": "10000000-0000-0000-0000-000000000488",
    "desk": "Fantasy Football Coach",
    "seatId": "20000000-0000-0000-0000-000000000726",
    "url": "https://x.ai/bot/sw6dnxtAjKOyNS5KRuDkN",
    "seats": 1
  },
  {
    "owner": "krish1403",
    "slug": "saikrishna",
    "packName": "saikrishna",
    "ownerName": "saikrishna uppaluri",
    "ownerId": "00000000-0000-0000-0000-000000000481",
    "packId": "10000000-0000-0000-0000-000000000489",
    "desk": "Idea Crucible",
    "seatId": "20000000-0000-0000-0000-000000000727",
    "url": "https://x.ai/bot/wVlStqEQsN4UJHB0ai5xU",
    "seats": 2
  },
  {
    "owner": "GrokBotRadar",
    "slug": "fan",
    "packName": "Fan",
    "ownerName": "Fan Grok Bot Radar",
    "ownerId": "00000000-0000-0000-0000-000000000482",
    "packId": "10000000-0000-0000-0000-000000000490",
    "desk": "X Scout",
    "seatId": "20000000-0000-0000-0000-000000000729",
    "url": "https://x.ai/bot/8oUlDrGOJstb0BJN7gBUw",
    "seats": 2
  },
  {
    "owner": "qitest77",
    "slug": "qqq7qqq",
    "packName": "qqq7qqq",
    "ownerName": "qqq7qqq qqq777",
    "ownerId": "00000000-0000-0000-0000-000000000483",
    "packId": "10000000-0000-0000-0000-000000000491",
    "desk": "博主盯",
    "seatId": "20000000-0000-0000-0000-000000000731",
    "url": "https://x.ai/bot/W-77z0bXh8mPBf726Vakh",
    "seats": 2
  },
  {
    "owner": "psiesa",
    "slug": "paul",
    "packName": "Paul",
    "ownerName": "Paul Siesage",
    "ownerId": "00000000-0000-0000-0000-000000000484",
    "packId": "10000000-0000-0000-0000-000000000492",
    "desk": "Stack Cartographer",
    "seatId": "20000000-0000-0000-0000-000000000733",
    "url": "https://x.ai/bot/NjIGGseAWM32s65KGoqOK",
    "seats": 1
  },
  {
    "owner": "ItsMeTrueG",
    "slug": "devin",
    "packName": "Devin",
    "ownerName": "Devin",
    "ownerId": "00000000-0000-0000-0000-000000000485",
    "packId": "10000000-0000-0000-0000-000000000493",
    "desk": "Resume",
    "seatId": "20000000-0000-0000-0000-000000000734",
    "url": "https://x.ai/bot/q5xkbGfLpyyZ9Qsl8tmnJ",
    "seats": 2
  },
  {
    "owner": "EranHertz",
    "slug": "eran",
    "packName": "Eran",
    "ownerName": "Eran Hertz",
    "ownerId": "00000000-0000-0000-0000-000000000486",
    "packId": "10000000-0000-0000-0000-000000000494",
    "desk": "Wife Bot",
    "seatId": "20000000-0000-0000-0000-000000000736",
    "url": "https://x.ai/bot/FFhovhcaV2-0eX2uwPiBJ",
    "seats": 1
  },
  {
    "owner": "Carlos_Arthurr",
    "slug": "carlos",
    "packName": "Carlos",
    "ownerName": "Carlos Arthur",
    "ownerId": "00000000-0000-0000-0000-000000000487",
    "packId": "10000000-0000-0000-0000-000000000495",
    "desk": "Art Director",
    "seatId": "20000000-0000-0000-0000-000000000737",
    "url": "https://x.ai/bot/CPsMufoHozETWciYoiqvL",
    "seats": 1
  },
  {
    "owner": "JideLambo",
    "slug": "jide",
    "packName": "Jide",
    "ownerName": "Jide Lambo",
    "ownerId": "00000000-0000-0000-0000-000000000488",
    "packId": "10000000-0000-0000-0000-000000000496",
    "desk": "Clear Speech",
    "seatId": "20000000-0000-0000-0000-000000000738",
    "url": "https://x.ai/bot/85J64XeyKMaYXQrMhQWpl",
    "seats": 1
  },
  {
    "owner": "simonejlima",
    "slug": "simone",
    "packName": "Simone",
    "ownerName": "Simone J.Lima",
    "ownerId": "00000000-0000-0000-0000-000000000489",
    "packId": "10000000-0000-0000-0000-000000000497",
    "desk": "Geek",
    "seatId": "20000000-0000-0000-0000-000000000739",
    "url": "https://x.ai/bot/u3Mfw056_h5uLofxqXeSu",
    "seats": 2
  },
  {
    "owner": "the___GAD",
    "slug": "gilson",
    "packName": "Gilson",
    "ownerName": "Gilson Dos Santos",
    "ownerId": "00000000-0000-0000-0000-000000000490",
    "packId": "10000000-0000-0000-0000-000000000498",
    "desk": "Stock Market Portfolio Manager",
    "seatId": "20000000-0000-0000-0000-000000000741",
    "url": "https://x.ai/bot/hsP8X6sbzyqEaVeX65C-z",
    "seats": 1
  },
  {
    "owner": "williswee",
    "slug": "willis",
    "packName": "Willis",
    "ownerName": "Willis Wee",
    "ownerId": "00000000-0000-0000-0000-000000000491",
    "packId": "10000000-0000-0000-0000-000000000499",
    "desk": "Chef Bob",
    "seatId": "20000000-0000-0000-0000-000000000742",
    "url": "https://x.ai/bot/5a3AV-NVm_VOVcd2TUJs2",
    "seats": 1
  },
  {
    "owner": "CaseyChesh",
    "slug": "casey",
    "packName": "Casey",
    "ownerName": "Casey Cheshire",
    "ownerId": "00000000-0000-0000-0000-000000000492",
    "packId": "10000000-0000-0000-0000-000000000500",
    "desk": "Token Finder",
    "seatId": "20000000-0000-0000-0000-000000000743",
    "url": "https://x.ai/bot/1olDKisJ4GIsykzyxADtD",
    "seats": 1
  },
  {
    "owner": "CaliLumberJack",
    "slug": "calix",
    "packName": "CaliX",
    "ownerName": "CaliX",
    "ownerId": "00000000-0000-0000-0000-000000000493",
    "packId": "10000000-0000-0000-0000-000000000501",
    "desk": "Burn Watch",
    "seatId": "20000000-0000-0000-0000-000000000744",
    "url": "https://x.ai/bot/lkvHvaZoGSoOz-zHZ0XDn",
    "seats": 1
  },
  {
    "owner": "CyberlyticsTX",
    "slug": "cyberlytics",
    "packName": "Cyberlytics",
    "ownerName": "Cyberlytics",
    "ownerId": "00000000-0000-0000-0000-000000000494",
    "packId": "10000000-0000-0000-0000-000000000502",
    "desk": "Devil's Advocate",
    "seatId": "20000000-0000-0000-0000-000000000745",
    "url": "https://x.ai/bot/vl06Y9ix4dUpsyFfX5K6v",
    "seats": 1
  },
  {
    "owner": "RouskSour",
    "slug": "rousk",
    "packName": "Rousk",
    "ownerName": "Rousk",
    "ownerId": "00000000-0000-0000-0000-000000000495",
    "packId": "10000000-0000-0000-0000-000000000503",
    "desk": "BuildKeeper",
    "seatId": "20000000-0000-0000-0000-000000000746",
    "url": "https://x.ai/bot/AqMmDjN21kW2eeegOg8en",
    "seats": 1
  },
  {
    "owner": "Trimmer10117",
    "slug": "trimmer",
    "packName": "Trimmer",
    "ownerName": "Trimmer",
    "ownerId": "00000000-0000-0000-0000-000000000496",
    "packId": "10000000-0000-0000-0000-000000000504",
    "desk": "Hall Monitor",
    "seatId": "20000000-0000-0000-0000-000000000747",
    "url": "https://x.ai/bot/7TUTDa5cCwF0MklXGvWjB",
    "seats": 3
  },
  {
    "owner": "WesleyFranks",
    "slug": "wesley",
    "packName": "Wesley",
    "ownerName": "Wesley Franks",
    "ownerId": "00000000-0000-0000-0000-000000000497",
    "packId": "10000000-0000-0000-0000-000000000505",
    "desk": "T1DB",
    "seatId": "20000000-0000-0000-0000-000000000750",
    "url": "https://x.ai/bot/218O5pTyWOxir3VUh0WR6",
    "seats": 1
  },
  {
    "owner": "BowieHole",
    "slug": "bowie",
    "packName": "Bowie",
    "ownerName": "Bowie",
    "ownerId": "00000000-0000-0000-0000-000000000498",
    "packId": "10000000-0000-0000-0000-000000000506",
    "desk": "School Desk",
    "seatId": "20000000-0000-0000-0000-000000000754",
    "url": "https://x.ai/bot/fk_sA7YhYV3Gzb4wNNbvP",
    "seats": 3
  },
  {
    "owner": "RSebastian74",
    "slug": "rodrigo",
    "packName": "Rodrigo",
    "ownerName": "Rodrigo Sebastian",
    "ownerId": "00000000-0000-0000-0000-000000000499",
    "packId": "10000000-0000-0000-0000-000000000507",
    "desk": "Fix-It Fred",
    "seatId": "20000000-0000-0000-0000-000000000757",
    "url": "https://x.ai/bot/2KIO0IMjeDnRrWgpFaPd6",
    "seats": 1
  },
  {
    "owner": "JoshuaKCrypto",
    "slug": "joshua-krg",
    "packName": "Joshua_Krg",
    "ownerName": "Joshua_Krg",
    "ownerId": "00000000-0000-0000-0000-000000000500",
    "packId": "10000000-0000-0000-0000-000000000508",
    "desk": "Cleaner",
    "seatId": "20000000-0000-0000-0000-000000000758",
    "url": "https://x.ai/bot/mhKuHm7fVTt2G4Tx16qsc",
    "seats": 1
  },
  {
    "owner": "ArtNealKing",
    "slug": "art",
    "packName": "Art",
    "ownerName": "Art King",
    "ownerId": "00000000-0000-0000-0000-000000000501",
    "packId": "10000000-0000-0000-0000-000000000509",
    "desk": "Chase Check Links",
    "seatId": "20000000-0000-0000-0000-000000000759",
    "url": "https://x.ai/bot/QdjmrUAnmnCkgMIskyMDi",
    "seats": 1
  },
  {
    "owner": "thecsguy",
    "slug": "nick",
    "packName": "nick",
    "ownerName": "nick",
    "ownerId": "00000000-0000-0000-0000-000000000502",
    "packId": "10000000-0000-0000-0000-000000000510",
    "desk": "Realtor",
    "seatId": "20000000-0000-0000-0000-000000000760",
    "url": "https://x.ai/bot/gIPVW_A1Ygg3QBaKpOqTg",
    "seats": 2
  },
  {
    "owner": "johnp_creates",
    "slug": "john",
    "packName": "John",
    "ownerName": "John P Creates",
    "ownerId": "00000000-0000-0000-0000-000000000503",
    "packId": "10000000-0000-0000-0000-000000000511",
    "desk": "RealityCheck",
    "seatId": "20000000-0000-0000-0000-000000000762",
    "url": "https://x.ai/bot/3qFR1iwsgP36CC7ayKRfw",
    "seats": 1
  },
  {
    "owner": "acolombiadev",
    "slug": "andrea",
    "packName": "Andrea",
    "ownerName": "Andrea",
    "ownerId": "00000000-0000-0000-0000-000000000504",
    "packId": "10000000-0000-0000-0000-000000000512",
    "desk": "Changelog Stand-down",
    "seatId": "20000000-0000-0000-0000-000000000763",
    "url": "https://x.ai/bot/JiSR_7-w1GPQM0QWltAVq",
    "seats": 2
  },
  {
    "owner": "ChefMcMakin",
    "slug": "chef",
    "packName": "Chef",
    "ownerName": "Chef McMakin",
    "ownerId": "00000000-0000-0000-0000-000000000505",
    "packId": "10000000-0000-0000-0000-000000000513",
    "desk": "Personal Chef",
    "seatId": "20000000-0000-0000-0000-000000000766",
    "url": "https://x.ai/bot/gMrnNpgylgu11PImcWTdy",
    "seats": 2
  },
  {
    "owner": "jp_costa",
    "slug": "jp",
    "packName": "JP",
    "ownerName": "JP Costa",
    "ownerId": "00000000-0000-0000-0000-000000000506",
    "packId": "10000000-0000-0000-0000-000000000514",
    "desk": "BotLog",
    "seatId": "20000000-0000-0000-0000-000000000768",
    "url": "https://x.ai/bot/7r4lJlcZaqMUINspxwI3h",
    "seats": 1
  },
  {
    "owner": "GabrielaHobe",
    "slug": "gabriela",
    "packName": "Gabriela",
    "ownerName": "Gabriela Hobe 🇺🇸",
    "ownerId": "00000000-0000-0000-0000-000000000507",
    "packId": "10000000-0000-0000-0000-000000000515",
    "desk": "Pothos",
    "seatId": "20000000-0000-0000-0000-000000000769",
    "url": "https://x.ai/bot/2LAvOGcxWsyGs3-FmbwPr",
    "seats": 4
  },
  {
    "owner": "bill_mitchell_",
    "slug": "bill",
    "packName": "Bill",
    "ownerName": "Bill Mitchell",
    "ownerId": "00000000-0000-0000-0000-000000000508",
    "packId": "10000000-0000-0000-0000-000000000516",
    "desk": "Nail Clip Reminder",
    "seatId": "20000000-0000-0000-0000-000000000773",
    "url": "https://x.ai/bot/jPRs3hxe53AF32xi7JLcn",
    "seats": 1
  },
  {
    "owner": "Screaming_Chkn",
    "slug": "screaming",
    "packName": "Screaming",
    "ownerName": "Screaming Chicken",
    "ownerId": "00000000-0000-0000-0000-000000000509",
    "packId": "10000000-0000-0000-0000-000000000517",
    "desk": "Pipeline Scout",
    "seatId": "20000000-0000-0000-0000-000000000774",
    "url": "https://x.ai/bot/Ec8Orp3oBaYkmXJ_mIrlw",
    "seats": 4
  },
  {
    "owner": "EvarielSC",
    "slug": "evariel",
    "packName": "Evariel,",
    "ownerName": "Evariel, FlameBeacon of Elira",
    "ownerId": "00000000-0000-0000-0000-000000000510",
    "packId": "10000000-0000-0000-0000-000000000518",
    "desk": "Sovereign Discernment",
    "seatId": "20000000-0000-0000-0000-000000000778",
    "url": "https://x.ai/bot/0EPl4hGRjKUqGhDpr44sa",
    "seats": 1
  },
  {
    "owner": "Amervim",
    "slug": "amervim",
    "packName": "Amervim",
    "ownerName": "Amervim Bonano",
    "ownerId": "00000000-0000-0000-0000-000000000511",
    "packId": "10000000-0000-0000-0000-000000000519",
    "desk": "Property Decision OS",
    "seatId": "20000000-0000-0000-0000-000000000779",
    "url": "https://x.ai/bot/PD7LPOk0HP53QxxWWEN8R",
    "seats": 1
  },
  {
    "owner": "Limok_igit",
    "slug": "komil",
    "packName": "Komil",
    "ownerName": "Komil 🇺🇸",
    "ownerId": "00000000-0000-0000-0000-000000000512",
    "packId": "10000000-0000-0000-0000-000000000520",
    "desk": "Meeting Brief",
    "seatId": "20000000-0000-0000-0000-000000000780",
    "url": "https://x.ai/bot/JN9e1WggIKVWhCEZrySlj",
    "seats": 1
  },
  {
    "owner": "TheSystemsDad",
    "slug": "christopher",
    "packName": "Christopher",
    "ownerName": "Christopher Lynn",
    "ownerId": "00000000-0000-0000-0000-000000000513",
    "packId": "10000000-0000-0000-0000-000000000521",
    "desk": "Crave",
    "seatId": "20000000-0000-0000-0000-000000000782",
    "url": "https://x.ai/bot/scGXxrePrIAaNmU78kDqL",
    "seats": 1
  },
  {
    "owner": "xerith_darkmind",
    "slug": "xerith",
    "packName": "Xerith",
    "ownerName": "Xerith(ZEER-ith)",
    "ownerId": "00000000-0000-0000-0000-000000000514",
    "packId": "10000000-0000-0000-0000-000000000522",
    "desk": "Folklore Still",
    "seatId": "20000000-0000-0000-0000-000000000783",
    "url": "https://x.ai/bot/UGcotHqa2ABtMzfcMmR0Q",
    "seats": 1
  },
  {
    "owner": "KendrickDA_AVO",
    "slug": "kendrick",
    "packName": "Kendrick",
    "ownerName": "Kendrick",
    "ownerId": "00000000-0000-0000-0000-000000000515",
    "packId": "10000000-0000-0000-0000-000000000523",
    "desk": "Pocket",
    "seatId": "20000000-0000-0000-0000-000000000784",
    "url": "https://x.ai/bot/M7XEHcmE16KthRzg_s16b",
    "seats": 2
  },
  {
    "owner": "MadnessOfMouth",
    "slug": "mouth",
    "packName": "Mouth",
    "ownerName": "Mouth Of Madness",
    "ownerId": "00000000-0000-0000-0000-000000000516",
    "packId": "10000000-0000-0000-0000-000000000524",
    "desk": "Brand Showreel",
    "seatId": "20000000-0000-0000-0000-000000000793",
    "url": "https://x.ai/bot/r-Ctb7rwRVFOY-_p_T9eX",
    "seats": 1
  },
  {
    "owner": "SageSag53686656",
    "slug": "george",
    "packName": "George",
    "ownerName": "George Washington",
    "ownerId": "00000000-0000-0000-0000-000000000517",
    "packId": "10000000-0000-0000-0000-000000000525",
    "desk": "Construction COS",
    "seatId": "20000000-0000-0000-0000-000000000794",
    "url": "https://x.ai/bot/n8xJhv4JOSdMCmTCoFWzu",
    "seats": 1
  },
  {
    "owner": "davorb89",
    "slug": "dado",
    "packName": "Dado",
    "ownerName": "Dado",
    "ownerId": "00000000-0000-0000-0000-000000000518",
    "packId": "10000000-0000-0000-0000-000000000526",
    "desk": "CFO",
    "seatId": "20000000-0000-0000-0000-000000000795",
    "url": "https://x.ai/bot/_eLwi7ul7T9Bs_fXvB4Ha",
    "seats": 2
  },
  {
    "owner": "uzairayed",
    "slug": "syed",
    "packName": "Syed",
    "ownerName": "Syed Uzair Ahmed",
    "ownerId": "00000000-0000-0000-0000-000000000519",
    "packId": "10000000-0000-0000-0000-000000000527",
    "desk": "Calorie Police",
    "seatId": "20000000-0000-0000-0000-000000000798",
    "url": "https://x.ai/bot/yAQwdu1ppzNP98grV_uy_",
    "seats": 1
  },
  {
    "owner": "scardinafineart",
    "slug": "cary",
    "packName": "Cary",
    "ownerName": "Cary Scardina",
    "ownerId": "00000000-0000-0000-0000-000000000520",
    "packId": "10000000-0000-0000-0000-000000000528",
    "desk": "BotSec",
    "seatId": "20000000-0000-0000-0000-000000000799",
    "url": "https://x.ai/bot/1YzVIsTRcLxaqlLZouJiB",
    "seats": 1
  },
  {
    "owner": "empireoaks",
    "slug": "jeremy",
    "packName": "Jeremy",
    "ownerName": "Jeremy",
    "ownerId": "00000000-0000-0000-0000-000000000521",
    "packId": "10000000-0000-0000-0000-000000000529",
    "desk": "Hurricane Watch",
    "seatId": "20000000-0000-0000-0000-000000000800",
    "url": "https://x.ai/bot/fiVZA-y8AnlvIdb-oNBH6",
    "seats": 1
  },
  {
    "owner": "CodeSolutionsIL",
    "slug": "code",
    "packName": "Code",
    "ownerName": "Code Solutions",
    "ownerId": "00000000-0000-0000-0000-000000000522",
    "packId": "10000000-0000-0000-0000-000000000530",
    "desk": "Computer",
    "seatId": "20000000-0000-0000-0000-000000000801",
    "url": "https://x.ai/bot/Z8aPXNVasH1ogYkAuCMIZ",
    "seats": 1
  },
  {
    "owner": "edtadros",
    "slug": "edward",
    "packName": "Edward",
    "ownerName": "Edward Tadros",
    "ownerId": "00000000-0000-0000-0000-000000000523",
    "packId": "10000000-0000-0000-0000-000000000531",
    "desk": "Outsrc",
    "seatId": "20000000-0000-0000-0000-000000000802",
    "url": "https://x.ai/bot/FdogFaBe5Y2LWMc-bmsAg",
    "seats": 1
  },
  {
    "owner": "Chr1sR1chards",
    "slug": "chris",
    "packName": "Chris",
    "ownerName": "Chris Richards",
    "ownerId": "00000000-0000-0000-0000-000000000524",
    "packId": "10000000-0000-0000-0000-000000000532",
    "desk": "Coach",
    "seatId": "20000000-0000-0000-0000-000000000803",
    "url": "https://x.ai/bot/6Z5qMNahOtmaSBjcM6_h6",
    "seats": 1
  },
  {
    "owner": "TopShelfCapital",
    "slug": "top",
    "packName": "Top",
    "ownerName": "Top Shelf Capital",
    "ownerId": "00000000-0000-0000-0000-000000000525",
    "packId": "10000000-0000-0000-0000-000000000533",
    "desk": "Chief",
    "seatId": "20000000-0000-0000-0000-000000000804",
    "url": "https://x.ai/bot/A4haB5wrqQewiNFIukYZ5",
    "seats": 1
  },
  {
    "owner": "GD_009",
    "slug": "gld009",
    "packName": "GLD009",
    "ownerName": "GLD009",
    "ownerId": "00000000-0000-0000-0000-000000000526",
    "packId": "10000000-0000-0000-0000-000000000534",
    "desk": "Job Agent",
    "seatId": "20000000-0000-0000-0000-000000000805",
    "url": "https://x.ai/bot/OFHmlk--6IhVj9h0x3jc0",
    "seats": 1
  },
  {
    "owner": "Ultima_Lumina",
    "slug": "lumina",
    "packName": "Lumina",
    "ownerName": "Lumina",
    "ownerId": "00000000-0000-0000-0000-000000000527",
    "packId": "10000000-0000-0000-0000-000000000535",
    "desk": "Mizzle",
    "seatId": "20000000-0000-0000-0000-000000000806",
    "url": "https://x.ai/bot/rClEAhL7YeRSx2zE44cEY",
    "seats": 1
  },
  {
    "owner": "SomParan",
    "slug": "som",
    "packName": "Som",
    "ownerName": "Som",
    "ownerId": "00000000-0000-0000-0000-000000000528",
    "packId": "10000000-0000-0000-0000-000000000536",
    "desk": "Murphy",
    "seatId": "20000000-0000-0000-0000-000000000807",
    "url": "https://x.ai/bot/4Wrt7MIOjxepk8kdaZJ2G",
    "seats": 1
  },
  {
    "owner": "Ricky_Retard0",
    "slug": "ricky",
    "packName": "Ricky",
    "ownerName": "Ricky Retardo",
    "ownerId": "00000000-0000-0000-0000-000000000529",
    "packId": "10000000-0000-0000-0000-000000000537",
    "desk": "Deal Tracker",
    "seatId": "20000000-0000-0000-0000-000000000812",
    "url": "https://x.ai/bot/g9v8bbELyrTJpnQnnGj6m",
    "seats": 1
  },
  {
    "owner": "fomomofosol",
    "slug": "fomo",
    "packName": "fomo",
    "ownerName": "fomo",
    "ownerId": "00000000-0000-0000-0000-000000000530",
    "packId": "10000000-0000-0000-0000-000000000538",
    "desk": "Memecoin Report",
    "seatId": "20000000-0000-0000-0000-000000000813",
    "url": "https://x.ai/bot/KtMjZLEGpkN0K6XuLH2UJ",
    "seats": 1
  },
  {
    "owner": "karatademada",
    "slug": "karata",
    "packName": "Karata",
    "ownerName": "Karata",
    "ownerId": "00000000-0000-0000-0000-000000000531",
    "packId": "10000000-0000-0000-0000-000000000539",
    "desk": "Animated Story Maker",
    "seatId": "20000000-0000-0000-0000-000000000814",
    "url": "https://x.ai/bot/pwLrxtrOO9o3kwaVQVU3O",
    "seats": 3
  },
  {
    "owner": "Dylan_Texe",
    "slug": "exe",
    "packName": "ᴅʏʟᴀɴ.exe",
    "ownerName": "ᴅʏʟᴀɴ.exe",
    "ownerId": "00000000-0000-0000-0000-000000000532",
    "packId": "10000000-0000-0000-0000-000000000540",
    "desk": "Startup Kill Switch",
    "seatId": "20000000-0000-0000-0000-000000000817",
    "url": "https://x.ai/bot/VKKU1vHrUQZT8PnN44LwU",
    "seats": 1
  },
  {
    "owner": "richtabor",
    "slug": "rich",
    "packName": "Rich",
    "ownerName": "Rich Tabor",
    "ownerId": "00000000-0000-0000-0000-000000000533",
    "packId": "10000000-0000-0000-0000-000000000541",
    "desk": "Space Bot",
    "seatId": "20000000-0000-0000-0000-000000000818",
    "url": "https://x.ai/bot/XO5YsbW2UM4g-MBZdBkif",
    "seats": 1
  },
  {
    "owner": "whatsthemather",
    "slug": "will",
    "packName": "Will",
    "ownerName": "Will Mather",
    "ownerId": "00000000-0000-0000-0000-000000000534",
    "packId": "10000000-0000-0000-0000-000000000542",
    "desk": "Coding Seat Router",
    "seatId": "20000000-0000-0000-0000-000000000819",
    "url": "https://x.ai/bot/AudrKNxvnGmLlGRUBRnym",
    "seats": 1
  },
  {
    "owner": "JulietteCove",
    "slug": "juliettecove",
    "packName": "JulietteCove",
    "ownerName": "JulietteCove",
    "ownerId": "00000000-0000-0000-0000-000000000535",
    "packId": "10000000-0000-0000-0000-000000000543",
    "desk": "Hold My Stock",
    "seatId": "20000000-0000-0000-0000-000000000820",
    "url": "https://x.ai/bot/rpqMXPRdUiyk6Dc1LF3U9",
    "seats": 1
  },
  {
    "owner": "MiaAI_lab",
    "slug": "mia",
    "packName": "Mia",
    "ownerName": "Mia",
    "ownerId": "00000000-0000-0000-0000-000000000536",
    "packId": "10000000-0000-0000-0000-000000000544",
    "desk": "Sniper",
    "seatId": "20000000-0000-0000-0000-000000000821",
    "url": "https://x.ai/bot/EgPGxirvQCSHoxbnw6Ym0",
    "seats": 2
  },
  {
    "owner": "sravanjay",
    "slug": "sravan",
    "packName": "Sravan",
    "ownerName": "Sravan Jayanthi",
    "ownerId": "00000000-0000-0000-0000-000000000537",
    "packId": "10000000-0000-0000-0000-000000000545",
    "desk": "Chief of Staff Fleet",
    "seatId": "20000000-0000-0000-0000-000000000823",
    "url": "https://x.ai/bot/lQruhDeXx1KC_fXxNtpVE",
    "seats": 1
  },
  {
    "owner": "_The_Lake",
    "slug": "the-lakes",
    "packName": "The_Lakes",
    "ownerName": "The_Lakes",
    "ownerId": "00000000-0000-0000-0000-000000000538",
    "packId": "10000000-0000-0000-0000-000000000546",
    "desk": "Phoenix",
    "seatId": "20000000-0000-0000-0000-000000000824",
    "url": "https://x.ai/bot/tp4ZKqUYQHNC318aIFdKr",
    "seats": 1
  },
  {
    "owner": "xenappblog",
    "slug": "trond",
    "packName": "Trond",
    "ownerName": "Trond Eirik Haavarstein",
    "ownerId": "00000000-0000-0000-0000-000000000539",
    "packId": "10000000-0000-0000-0000-000000000547",
    "desk": "Overwatch",
    "seatId": "20000000-0000-0000-0000-000000000825",
    "url": "https://x.ai/bot/PGEVwTjv7Q9cObVSFGRlM",
    "seats": 1
  },
  {
    "owner": "KhoaHun68916646",
    "slug": "khoa",
    "packName": "Khoa",
    "ownerName": "Khoa Huỳnh",
    "ownerId": "00000000-0000-0000-0000-000000000540",
    "packId": "10000000-0000-0000-0000-000000000548",
    "desk": "Producer",
    "seatId": "20000000-0000-0000-0000-000000000826",
    "url": "https://x.ai/bot/eNCu6dmGVCAR-DSYWT57j",
    "seats": 1
  },
  {
    "owner": "MagaShawn",
    "slug": "shawn",
    "packName": "Shawn",
    "ownerName": "Shawn Lippert",
    "ownerId": "00000000-0000-0000-0000-000000000541",
    "packId": "10000000-0000-0000-0000-000000000549",
    "desk": "AIARENA",
    "seatId": "20000000-0000-0000-0000-000000000827",
    "url": "https://x.ai/bot/EWRLsDKu8gGi3vHhnxFrY",
    "seats": 7
  },
  {
    "owner": "jrk123k",
    "slug": "james",
    "packName": "James",
    "ownerName": "James Klingler",
    "ownerId": "00000000-0000-0000-0000-000000000542",
    "packId": "10000000-0000-0000-0000-000000000550",
    "desk": "Grok Voice Continuity Bot",
    "seatId": "20000000-0000-0000-0000-000000000834",
    "url": "https://x.ai/bot/X1860xFKBP7q5uPB_dsOz",
    "seats": 1
  },
  {
    "owner": "KrisHuff",
    "slug": "kris",
    "packName": "Kris",
    "ownerName": "Kris",
    "ownerId": "00000000-0000-0000-0000-000000000543",
    "packId": "10000000-0000-0000-0000-000000000551",
    "desk": "Close Loop",
    "seatId": "20000000-0000-0000-0000-000000000835",
    "url": "https://x.ai/bot/ZHSf2xajDZF6vZGyRC8eP",
    "seats": 1
  },
  {
    "owner": "wad0427",
    "slug": "ai",
    "packName": "わどAI界のマスコット",
    "ownerName": "わどAI界のマスコット",
    "ownerId": "00000000-0000-0000-0000-000000000544",
    "packId": "10000000-0000-0000-0000-000000000552",
    "desk": "X監視Bot",
    "seatId": "20000000-0000-0000-0000-000000000836",
    "url": "https://x.ai/bot/h0YtWQyxMfHnedrjMsnOR",
    "seats": 1
  },
  {
    "owner": "varunparakh",
    "slug": "varun",
    "packName": "Varun",
    "ownerName": "Varun Parakh",
    "ownerId": "00000000-0000-0000-0000-000000000545",
    "packId": "10000000-0000-0000-0000-000000000553",
    "desk": "SG Cards Guide",
    "seatId": "20000000-0000-0000-0000-000000000837",
    "url": "https://x.ai/bot/UXBrZP3ZZJYUIFJLf1SkV",
    "seats": 1
  },
  {
    "owner": "PrairieWatcher",
    "slug": "luke",
    "packName": "Luke",
    "ownerName": "Luke",
    "ownerId": "00000000-0000-0000-0000-000000000546",
    "packId": "10000000-0000-0000-0000-000000000554",
    "desk": "Bob",
    "seatId": "20000000-0000-0000-0000-000000000838",
    "url": "https://x.ai/bot/m9Cywb2QyPGZnl4l70aR-",
    "seats": 3
  },
  {
    "owner": "mcdanderson",
    "slug": "daniel",
    "packName": "Daniel",
    "ownerName": "Daniel Anderson",
    "ownerId": "00000000-0000-0000-0000-000000000547",
    "packId": "10000000-0000-0000-0000-000000000555",
    "desk": "Ancestry Bot",
    "seatId": "20000000-0000-0000-0000-000000000841",
    "url": "https://x.ai/bot/AINP9mLXBIt__NMVeFXGO",
    "seats": 1
  },
  {
    "owner": "Adrian_Bisson",
    "slug": "adrian",
    "packName": "Adrian",
    "ownerName": "Adrian Bisson",
    "ownerId": "00000000-0000-0000-0000-000000000548",
    "packId": "10000000-0000-0000-0000-000000000556",
    "desk": "Cue",
    "seatId": "20000000-0000-0000-0000-000000000842",
    "url": "https://x.ai/bot/j7ZGmU3FhqpOAj0l2qXaQ",
    "seats": 1
  },
  {
    "owner": "jmjcapital",
    "slug": "justin",
    "packName": "Justin",
    "ownerName": "Justin Cornetta",
    "ownerId": "00000000-0000-0000-0000-000000000549",
    "packId": "10000000-0000-0000-0000-000000000557",
    "desk": "Notion Organizer",
    "seatId": "20000000-0000-0000-0000-000000000843",
    "url": "https://x.ai/bot/GwxXa_RCIuWTlKE8sa2wS",
    "seats": 1
  },
  {
    "owner": "Brianhill",
    "slug": "brian",
    "packName": "Brian",
    "ownerName": "Brian Hill",
    "ownerId": "00000000-0000-0000-0000-000000000550",
    "packId": "10000000-0000-0000-0000-000000000558",
    "desk": "Gluco",
    "seatId": "20000000-0000-0000-0000-000000000844",
    "url": "https://x.ai/bot/7dHh-kr8rz5r5z_RKE-VM",
    "seats": 1
  },
  {
    "owner": "pcapsnocap",
    "slug": "collin",
    "packName": "Collin",
    "ownerName": "Collin Goedken",
    "ownerId": "00000000-0000-0000-0000-000000000551",
    "packId": "10000000-0000-0000-0000-000000000559",
    "desk": "Tesla DJ",
    "seatId": "20000000-0000-0000-0000-000000000845",
    "url": "https://x.ai/bot/7eNHk3dIdqm41qsqQxUKd",
    "seats": 1
  },
  {
    "owner": "deanwithani",
    "slug": "deian",
    "packName": "Deian",
    "ownerName": "Deian Isac",
    "ownerId": "00000000-0000-0000-0000-000000000552",
    "packId": "10000000-0000-0000-0000-000000000560",
    "desk": "Takibi Ops",
    "seatId": "20000000-0000-0000-0000-000000000846",
    "url": "https://x.ai/bot/nHK32i1egqWUdv1mhvvW2",
    "seats": 1
  },
  {
    "owner": "GregorZebicX",
    "slug": "gregor",
    "packName": "Gregor",
    "ownerName": "Gregor Zebic",
    "ownerId": "00000000-0000-0000-0000-000000000553",
    "packId": "10000000-0000-0000-0000-000000000561",
    "desk": "DG1 Admin",
    "seatId": "20000000-0000-0000-0000-000000000847",
    "url": "https://x.ai/bot/_ax4LmP0WeHz09cVh2ece",
    "seats": 2
  },
  {
    "owner": "allthemoney",
    "slug": "james",
    "packName": "James",
    "ownerName": "James Rule XRP ⟐",
    "ownerId": "00000000-0000-0000-0000-000000000554",
    "packId": "10000000-0000-0000-0000-000000000562",
    "desk": "Trading Bot 4.0",
    "seatId": "20000000-0000-0000-0000-000000000850",
    "url": "https://x.ai/bot/BcSPHebyU3Gkqqqhn3QRr",
    "seats": 1
  },
  {
    "owner": "kwstasl",
    "slug": "konstantinos",
    "packName": "Konstantinos",
    "ownerName": "Konstantinos Lekkas",
    "ownerId": "00000000-0000-0000-0000-000000000555",
    "packId": "10000000-0000-0000-0000-000000000563",
    "desk": "War Monitor",
    "seatId": "20000000-0000-0000-0000-000000000851",
    "url": "https://x.ai/bot/XygokK48OMsuZy29YRC7d",
    "seats": 1
  },
  {
    "owner": "ArunasZidonis",
    "slug": "arunas",
    "packName": "Arunas",
    "ownerName": "Arunas Zidonis",
    "ownerId": "00000000-0000-0000-0000-000000000556",
    "packId": "10000000-0000-0000-0000-000000000564",
    "desk": "JobGod",
    "seatId": "20000000-0000-0000-0000-000000000852",
    "url": "https://x.ai/bot/wbW8mPLUOhsPITGY_9rn0",
    "seats": 3
  },
  {
    "owner": "ahua0323",
    "slug": "andrew",
    "packName": "Andrew",
    "ownerName": "Andrew Hua",
    "ownerId": "00000000-0000-0000-0000-000000000557",
    "packId": "10000000-0000-0000-0000-000000000565",
    "desk": "Respawn",
    "seatId": "20000000-0000-0000-0000-000000000855",
    "url": "https://x.ai/bot/Rx9jN9P4_dVDr4gZsnK81",
    "seats": 2
  },
  {
    "owner": "BefuddledMamaw",
    "slug": "befuddledmamaw",
    "packName": "BefuddledMamaw",
    "ownerName": "BefuddledMamaw",
    "ownerId": "00000000-0000-0000-0000-000000000558",
    "packId": "10000000-0000-0000-0000-000000000566",
    "desk": "What's for Supper, Mamaw?",
    "seatId": "20000000-0000-0000-0000-000000000858",
    "url": "https://x.ai/bot/BMTY3xFpzx6-w4qUMWaRm",
    "seats": 1
  },
  {
    "owner": "aydinrisler",
    "slug": "aydin",
    "packName": "Aydin",
    "ownerName": "Aydin",
    "ownerId": "00000000-0000-0000-0000-000000000559",
    "packId": "10000000-0000-0000-0000-000000000567",
    "desk": "Ricochet",
    "seatId": "20000000-0000-0000-0000-000000000859",
    "url": "https://x.ai/bot/9zZ-CV2B5p14jbZkcdhZj",
    "seats": 1
  },
  {
    "owner": "IntelliGeneAI",
    "slug": "ira",
    "packName": "Ira",
    "ownerName": "Ira",
    "ownerId": "00000000-0000-0000-0000-000000000560",
    "packId": "10000000-0000-0000-0000-000000000568",
    "desk": "Founder's Desk",
    "seatId": "20000000-0000-0000-0000-000000000860",
    "url": "https://x.ai/bot/HICQrhoWRRdPNMszNXbtV",
    "seats": 1
  },
  {
    "owner": "TechHutTV",
    "slug": "brandon",
    "packName": "Brandon",
    "ownerName": "Brandon Hopkins",
    "ownerId": "00000000-0000-0000-0000-000000000561",
    "packId": "10000000-0000-0000-0000-000000000569",
    "desk": "NetBird Admin",
    "seatId": "20000000-0000-0000-0000-000000000861",
    "url": "https://x.ai/bot/VzRbIFRLFoIcIfsIAxNbW",
    "seats": 1
  },
  {
    "owner": "OrahOnX",
    "slug": "orah",
    "packName": "Orah",
    "ownerName": "Orah On X",
    "ownerId": "00000000-0000-0000-0000-000000000562",
    "packId": "10000000-0000-0000-0000-000000000570",
    "desk": "Signal Scout",
    "seatId": "20000000-0000-0000-0000-000000000862",
    "url": "https://x.ai/bot/CT_1GTQjGruBW3ZuYM_h2",
    "seats": 1
  },
  {
    "owner": "lmickyd",
    "slug": "lord",
    "packName": "Lord",
    "ownerName": "Lord LeVine of Wessex",
    "ownerId": "00000000-0000-0000-0000-000000000563",
    "packId": "10000000-0000-0000-0000-000000000571",
    "desk": "Finance Bot",
    "seatId": "20000000-0000-0000-0000-000000000863",
    "url": "https://x.ai/bot/MY7NJmE2egN-855ZN6vSh",
    "seats": 1
  },
  {
    "owner": "TheDevilCloud",
    "slug": "devil",
    "packName": "Devil",
    "ownerName": "Devil Cloud",
    "ownerId": "00000000-0000-0000-0000-000000000564",
    "packId": "10000000-0000-0000-0000-000000000572",
    "desk": "Adie",
    "seatId": "20000000-0000-0000-0000-000000000864",
    "url": "https://x.ai/bot/-eXRDBTLTfHxNle9joQRN",
    "seats": 1
  },
  {
    "owner": "cvey15",
    "slug": "chrisv",
    "packName": "CHRISV",
    "ownerName": "CHRISV",
    "ownerId": "00000000-0000-0000-0000-000000000565",
    "packId": "10000000-0000-0000-0000-000000000573",
    "desk": "Elon Ecosystem Desk",
    "seatId": "20000000-0000-0000-0000-000000000865",
    "url": "https://x.ai/bot/j8Znml_qB4leZhOgihZ-p",
    "seats": 1
  },
  {
    "owner": "AunySillyMe",
    "slug": "auny",
    "packName": "Auny",
    "ownerName": "Auny",
    "ownerId": "00000000-0000-0000-0000-000000000566",
    "packId": "10000000-0000-0000-0000-000000000574",
    "desk": "X-Man",
    "seatId": "20000000-0000-0000-0000-000000000866",
    "url": "https://x.ai/bot/DGIs4Ax4tU2Mi8RXyNKQ5",
    "seats": 1
  },
  {
    "owner": "orangetraveller",
    "slug": "swapnil",
    "packName": "Swapnil",
    "ownerName": "Swapnil Tiwari",
    "ownerId": "00000000-0000-0000-0000-000000000567",
    "packId": "10000000-0000-0000-0000-000000000575",
    "desk": "ChatGPT Importer",
    "seatId": "20000000-0000-0000-0000-000000000867",
    "url": "https://x.ai/bot/K16DF_U-uqR5EcGijyDuv",
    "seats": 1
  },
  {
    "owner": "CoCaptive",
    "slug": "bk",
    "packName": "Bk",
    "ownerName": "Bk Based",
    "ownerId": "00000000-0000-0000-0000-000000000568",
    "packId": "10000000-0000-0000-0000-000000000576",
    "desk": "Billing Clerk",
    "seatId": "20000000-0000-0000-0000-000000000868",
    "url": "https://x.ai/bot/TlgFUI0v3nXXmOmMdvGvR",
    "seats": 1
  },
  {
    "owner": "RiddleSphere",
    "slug": "riddle",
    "packName": "Riddle",
    "ownerName": "Riddle",
    "ownerId": "00000000-0000-0000-0000-000000000569",
    "packId": "10000000-0000-0000-0000-000000000577",
    "desk": "Character Reference Sheet",
    "seatId": "20000000-0000-0000-0000-000000000869",
    "url": "https://x.ai/bot/QYL4wlIxzVr5tBpzZLCo0",
    "seats": 1
  },
  {
    "owner": "rajkoshik",
    "slug": "koshik",
    "packName": "Koshik",
    "ownerName": "Koshik",
    "ownerId": "00000000-0000-0000-0000-000000000570",
    "packId": "10000000-0000-0000-0000-000000000578",
    "desk": "Ottopus Stock Desk",
    "seatId": "20000000-0000-0000-0000-000000000870",
    "url": "https://x.ai/bot/nxdT1HdHFwJqnfWEQZDMv",
    "seats": 1
  },
  {
    "owner": "weezilla",
    "slug": "michael",
    "packName": "Michael",
    "ownerName": "Michael Wise",
    "ownerId": "00000000-0000-0000-0000-000000000571",
    "packId": "10000000-0000-0000-0000-000000000579",
    "desk": "OSM Map Fixer",
    "seatId": "20000000-0000-0000-0000-000000000873",
    "url": "https://x.ai/bot/oi7v9ikWFvnr14b4KQ3w2",
    "seats": 1
  },
  {
    "owner": "jclinmn",
    "slug": "jim",
    "packName": "jim",
    "ownerName": "jim lundberg",
    "ownerId": "00000000-0000-0000-0000-000000000572",
    "packId": "10000000-0000-0000-0000-000000000580",
    "desk": "Text When Done",
    "seatId": "20000000-0000-0000-0000-000000000874",
    "url": "https://x.ai/bot/1_jTUvlVaOLiQLCIa1bQL",
    "seats": 1
  },
  {
    "owner": "wjonthomas",
    "slug": "jon",
    "packName": "Jon",
    "ownerName": "Jon Thomas",
    "ownerId": "00000000-0000-0000-0000-000000000573",
    "packId": "10000000-0000-0000-0000-000000000581",
    "desk": "Household Bot Bridge",
    "seatId": "20000000-0000-0000-0000-000000000876",
    "url": "https://x.ai/bot/xrh0R1k94llK_IwEuKJjR",
    "seats": 1
  },
  {
    "owner": "FranckOhrel",
    "slug": "franck",
    "packName": "Franck",
    "ownerName": "Franck Ohrel",
    "ownerId": "00000000-0000-0000-0000-000000000574",
    "packId": "10000000-0000-0000-0000-000000000582",
    "desk": "KILLSWITCH by Hikari Blue",
    "seatId": "20000000-0000-0000-0000-000000000877",
    "url": "https://x.ai/bot/28-ixNn3qnRPc0ycaWOIo",
    "seats": 1
  },
  {
    "owner": "CardCaptain",
    "slug": "joe",
    "packName": "Joe",
    "ownerName": "Joe",
    "ownerId": "00000000-0000-0000-0000-000000000575",
    "packId": "10000000-0000-0000-0000-000000000583",
    "desk": "Carl, the Card Researcher",
    "seatId": "20000000-0000-0000-0000-000000000878",
    "url": "https://x.ai/bot/iEO8AkQB-LtGikFPcR1ib",
    "seats": 1
  },
  {
    "owner": "paulkhls",
    "slug": "paul",
    "packName": "Paul",
    "ownerName": "Paul Kohlhaas bio/acc",
    "ownerId": "00000000-0000-0000-0000-000000000576",
    "packId": "10000000-0000-0000-0000-000000000584",
    "desk": "Hypothesis Swarm Starter",
    "seatId": "20000000-0000-0000-0000-000000000879",
    "url": "https://x.ai/bot/zHJ6Fi4bqDxqwUPyuuELk",
    "seats": 1
  },
  {
    "owner": "dkmitc",
    "slug": "dylan",
    "packName": "Dylan",
    "ownerName": "Dylan",
    "ownerId": "00000000-0000-0000-0000-000000000577",
    "packId": "10000000-0000-0000-0000-000000000585",
    "desk": "Presents",
    "seatId": "20000000-0000-0000-0000-000000000880",
    "url": "https://x.ai/bot/-brAwcxWN1wwOGNnu7IkU",
    "seats": 1
  },
  {
    "owner": "IM0001",
    "slug": "robert",
    "packName": "Robert",
    "ownerName": "Robert",
    "ownerId": "00000000-0000-0000-0000-000000000578",
    "packId": "10000000-0000-0000-0000-000000000586",
    "desk": "Malfoy Accio",
    "seatId": "20000000-0000-0000-0000-000000000881",
    "url": "https://x.ai/bot/B15dolZNswDwtpiA6hbs9",
    "seats": 1
  },
  {
    "owner": "Cannabis_Way",
    "slug": "cannabis",
    "packName": "Cannabis",
    "ownerName": "Cannabis Way",
    "ownerId": "00000000-0000-0000-0000-000000000579",
    "packId": "10000000-0000-0000-0000-000000000587",
    "desk": "Cannaby",
    "seatId": "20000000-0000-0000-0000-000000000882",
    "url": "https://x.ai/bot/NOlGcAeGPPz95Vaup-FRK",
    "seats": 1
  },
  {
    "owner": "riesling_29",
    "slug": "29",
    "packName": "리슬링29",
    "ownerName": "리슬링29",
    "ownerId": "00000000-0000-0000-0000-000000000580",
    "packId": "10000000-0000-0000-0000-000000000588",
    "desk": "Provenance (PI Scientist)",
    "seatId": "20000000-0000-0000-0000-000000000883",
    "url": "https://x.ai/bot/BVB4ROqmz6xQon8KskyTI",
    "seats": 1
  },
  {
    "owner": "neils4fun",
    "slug": "neil",
    "packName": "Neil",
    "ownerName": "Neil Schreiber",
    "ownerId": "00000000-0000-0000-0000-000000000581",
    "packId": "10000000-0000-0000-0000-000000000589",
    "desk": "Dining & Cooking",
    "seatId": "20000000-0000-0000-0000-000000000884",
    "url": "https://x.ai/bot/TXGBlz-AEhm_0oGiEmuB1",
    "seats": 1
  },
  {
    "owner": "anthony_y_chan",
    "slug": "anthony",
    "packName": "Anthony",
    "ownerName": "Anthony Chan",
    "ownerId": "00000000-0000-0000-0000-000000000582",
    "packId": "10000000-0000-0000-0000-000000000590",
    "desk": "Community Builder",
    "seatId": "20000000-0000-0000-0000-000000000885",
    "url": "https://x.ai/bot/Vurjod8hm5tZJxGgov6uR",
    "seats": 1
  },
  {
    "owner": "lazywinadmin",
    "slug": "fran-ois-xavier",
    "packName": "François-Xavier",
    "ownerName": "François-Xavier C",
    "ownerId": "00000000-0000-0000-0000-000000000583",
    "packId": "10000000-0000-0000-0000-000000000591",
    "desk": "Ring Backups",
    "seatId": "20000000-0000-0000-0000-000000000886",
    "url": "https://x.ai/bot/6osUBiO46B3LojHq4gRuY",
    "seats": 1
  },
  {
    "owner": "GeorgGrok",
    "slug": "georg",
    "packName": "Georg",
    "ownerName": "Georg Grok",
    "ownerId": "00000000-0000-0000-0000-000000000584",
    "packId": "10000000-0000-0000-0000-000000000592",
    "desk": "Grok Bot",
    "seatId": "20000000-0000-0000-0000-000000000887",
    "url": "https://x.ai/bot/NkkqS-Pw3l3aFan0hpU9E",
    "seats": 1
  },
  {
    "owner": "dejaVujevich",
    "slug": "stephen",
    "packName": "Stephen",
    "ownerName": "Stephen Vujevich",
    "ownerId": "00000000-0000-0000-0000-000000000585",
    "packId": "10000000-0000-0000-0000-000000000593",
    "desk": "Family Activity Tracker",
    "seatId": "20000000-0000-0000-0000-000000000888",
    "url": "https://x.ai/bot/zJx8MaAp5nsEtYSF1p551",
    "seats": 1
  },
  {
    "owner": "beinglalit21",
    "slug": "sisyphus",
    "packName": "Sisyphus",
    "ownerName": "Sisyphus",
    "ownerId": "00000000-0000-0000-0000-000000000586",
    "packId": "10000000-0000-0000-0000-000000000594",
    "desk": "Hugging Face Expert",
    "seatId": "20000000-0000-0000-0000-000000000889",
    "url": "https://x.ai/bot/Xoc5L4qMSv7OKepbDecn0",
    "seats": 1
  },
  {
    "owner": "RachelLecy11",
    "slug": "rachel",
    "packName": "Rachel",
    "ownerName": "Rachel Lecy",
    "ownerId": "00000000-0000-0000-0000-000000000587",
    "packId": "10000000-0000-0000-0000-000000000595",
    "desk": "Chef Sookie",
    "seatId": "20000000-0000-0000-0000-000000000890",
    "url": "https://x.ai/bot/5CMeft0nvC4iRV95hEBpj",
    "seats": 1
  },
  {
    "owner": "sapjpx",
    "slug": "sap",
    "packName": "SAP",
    "ownerName": "SAP JP",
    "ownerId": "00000000-0000-0000-0000-000000000588",
    "packId": "10000000-0000-0000-0000-000000000596",
    "desk": "セキュリティ点検",
    "seatId": "20000000-0000-0000-0000-000000000891",
    "url": "https://x.ai/bot/4zx8w8Oc9dm0d3Den_Abe",
    "seats": 1
  },
  {
    "owner": "TAP0APIA",
    "slug": "tap",
    "packName": "Tap",
    "ownerName": "Tap",
    "ownerId": "00000000-0000-0000-0000-000000000589",
    "packId": "10000000-0000-0000-0000-000000000597",
    "desk": "Gemini 4 死了没",
    "seatId": "20000000-0000-0000-0000-000000000892",
    "url": "https://x.ai/bot/KjAL4LmSNZFMSyHAJKXBN",
    "seats": 1
  },
  {
    "owner": "zeuss_000",
    "slug": "zeus",
    "packName": "zeus",
    "ownerName": "zeus",
    "ownerId": "00000000-0000-0000-0000-000000000590",
    "packId": "10000000-0000-0000-0000-000000000598",
    "desk": "Resume Coach",
    "seatId": "20000000-0000-0000-0000-000000000893",
    "url": "https://x.ai/bot/SdNzCOZk7UW0uzjBFMFc3",
    "seats": 2
  },
  {
    "owner": "LouisFerreira",
    "slug": "louis",
    "packName": "Louis",
    "ownerName": "Louis",
    "ownerId": "00000000-0000-0000-0000-000000000591",
    "packId": "10000000-0000-0000-0000-000000000599",
    "desk": "Reverse Engineer",
    "seatId": "20000000-0000-0000-0000-000000000895",
    "url": "https://x.ai/bot/5enZ0Vvocx2Xph7gaiPpy",
    "seats": 1
  },
  {
    "owner": "FishxCD",
    "slug": "fish",
    "packName": "Fish",
    "ownerName": "Fish",
    "ownerId": "00000000-0000-0000-0000-000000000592",
    "packId": "10000000-0000-0000-0000-000000000600",
    "desk": "Tracking Tuna Officer",
    "seatId": "20000000-0000-0000-0000-000000000896",
    "url": "https://x.ai/bot/xy9stZRQESHWGilhQl9Nf",
    "seats": 1
  },
  {
    "owner": "KendraBoswell7",
    "slug": "faithx",
    "packName": "FaithX",
    "ownerName": "FaithX",
    "ownerId": "00000000-0000-0000-0000-000000000593",
    "packId": "10000000-0000-0000-0000-000000000601",
    "desk": "Slab & Stream",
    "seatId": "20000000-0000-0000-0000-000000000897",
    "url": "https://x.ai/bot/YghnYWX5ULMyJY6D1sMlm",
    "seats": 1
  },
  {
    "owner": "gold24k9999",
    "slug": "24k",
    "packName": "24K",
    "ownerName": "24K",
    "ownerId": "00000000-0000-0000-0000-000000000594",
    "packId": "10000000-0000-0000-0000-000000000602",
    "desk": "日本語チェック",
    "seatId": "20000000-0000-0000-0000-000000000898",
    "url": "https://x.ai/bot/Szq07dsrlo5T2qcPxjqvT",
    "seats": 1
  },
  {
    "owner": "TerpGPT",
    "slug": "terpgpt",
    "packName": "TerpGPT",
    "ownerName": "TerpGPT",
    "ownerId": "00000000-0000-0000-0000-000000000595",
    "packId": "10000000-0000-0000-0000-000000000603",
    "desk": "Sizzle",
    "seatId": "20000000-0000-0000-0000-000000000899",
    "url": "https://x.ai/bot/ID30J5nWtkGs_7yNRrw0w",
    "seats": 1
  },
  {
    "owner": "CarterKoWang",
    "slug": "carter",
    "packName": "Carter",
    "ownerName": "Carter",
    "ownerId": "00000000-0000-0000-0000-000000000596",
    "packId": "10000000-0000-0000-0000-000000000604",
    "desk": "weekly wrap",
    "seatId": "20000000-0000-0000-0000-000000000900",
    "url": "https://x.ai/bot/SLtlXzmpepgcG7c5fbeCY",
    "seats": 1
  },
  {
    "owner": "HRosenstr",
    "slug": "matthias",
    "packName": "Matthias",
    "ownerName": "Matthias H. Rosenstrøm",
    "ownerId": "00000000-0000-0000-0000-000000000597",
    "packId": "10000000-0000-0000-0000-000000000605",
    "desk": "EV Oplader",
    "seatId": "20000000-0000-0000-0000-000000000901",
    "url": "https://x.ai/bot/TNGW6OH_aTkG31s1MqN6Z",
    "seats": 1
  },
  {
    "owner": "brennanzambo",
    "slug": "zambo-dev",
    "packName": "zambo.dev",
    "ownerName": "zambo.dev",
    "ownerId": "00000000-0000-0000-0000-000000000598",
    "packId": "10000000-0000-0000-0000-000000000606",
    "desk": "Zambo Receipt Bot",
    "seatId": "20000000-0000-0000-0000-000000000902",
    "url": "https://x.ai/bot/AXD8poR15Ozom1w8jJrcm",
    "seats": 1
  },
  {
    "owner": "deydercintron",
    "slug": "deyder",
    "packName": "Deyder",
    "ownerName": "Deyder Cintron",
    "ownerId": "00000000-0000-0000-0000-000000000599",
    "packId": "10000000-0000-0000-0000-000000000607",
    "desk": "Business Idea Tester",
    "seatId": "20000000-0000-0000-0000-000000000903",
    "url": "https://x.ai/bot/Vo9yBUQdIDrClM9kFhZSc",
    "seats": 1
  },
  {
    "owner": "BryanRalston10",
    "slug": "bryan",
    "packName": "Bryan",
    "ownerName": "Bryan Ralston",
    "ownerId": "00000000-0000-0000-0000-000000000600",
    "packId": "10000000-0000-0000-0000-000000000608",
    "desk": "Usage Guard",
    "seatId": "20000000-0000-0000-0000-000000000904",
    "url": "https://x.ai/bot/EYULEtHGAh0tEjQzqucBS",
    "seats": 3
  },
  {
    "owner": "TerryLosansky",
    "slug": "terry",
    "packName": "Terry",
    "ownerName": "Terry Losansky",
    "ownerId": "00000000-0000-0000-0000-000000000601",
    "packId": "10000000-0000-0000-0000-000000000609",
    "desk": "First Light",
    "seatId": "20000000-0000-0000-0000-000000000907",
    "url": "https://x.ai/bot/V7ZjfoVrCBqaMONXYjkZ4",
    "seats": 1
  },
  {
    "owner": "MangleKuo",
    "slug": "mangle",
    "packName": "mangle",
    "ownerName": "mangle kuo",
    "ownerId": "00000000-0000-0000-0000-000000000602",
    "packId": "10000000-0000-0000-0000-000000000610",
    "desk": "Voice & Visual Briefing",
    "seatId": "20000000-0000-0000-0000-000000000909",
    "url": "https://x.ai/bot/HOJ6pDC6Xara_1pDDjn6J",
    "seats": 1
  },
  {
    "owner": "daxperera",
    "slug": "dax",
    "packName": "Dax",
    "ownerName": "Dax",
    "ownerId": "00000000-0000-0000-0000-000000000603",
    "packId": "10000000-0000-0000-0000-000000000611",
    "desk": "Darmadasa",
    "seatId": "20000000-0000-0000-0000-000000000910",
    "url": "https://x.ai/bot/dzztEmmBAaXcgHi-49aeg",
    "seats": 1
  },
  {
    "owner": "dragosroua",
    "slug": "dragos",
    "packName": "Dragos",
    "ownerName": "Dragos Roua",
    "ownerId": "00000000-0000-0000-0000-000000000604",
    "packId": "10000000-0000-0000-0000-000000000612",
    "desk": "X assistant",
    "seatId": "20000000-0000-0000-0000-000000000911",
    "url": "https://x.ai/bot/J7OPBxlsIUZB7IoXoB5wE",
    "seats": 1
  },
  {
    "owner": "CryptoBandit100",
    "slug": "cryptobandit",
    "packName": "CryptoBandit",
    "ownerName": "CryptoBandit",
    "ownerId": "00000000-0000-0000-0000-000000000605",
    "packId": "10000000-0000-0000-0000-000000000613",
    "desk": "Amazon Affiliate Video Maker",
    "seatId": "20000000-0000-0000-0000-000000000912",
    "url": "https://x.ai/bot/WWH3tIZcTTiOxlYnbG-i-",
    "seats": 1
  },
  {
    "owner": "mahdi",
    "slug": "mahdi",
    "packName": "Mahdi",
    "ownerName": "Mahdi",
    "ownerId": "00000000-0000-0000-0000-000000000606",
    "packId": "10000000-0000-0000-0000-000000000614",
    "desk": "Engineer's Morning Brief",
    "seatId": "20000000-0000-0000-0000-000000000913",
    "url": "https://x.ai/bot/9b4DUFqQnCtrclcyzWs5x",
    "seats": 1
  },
  {
    "owner": "jeffasu",
    "slug": "jeff",
    "packName": "Jeff",
    "ownerName": "Jeff B.",
    "ownerId": "00000000-0000-0000-0000-000000000607",
    "packId": "10000000-0000-0000-0000-000000000615",
    "desk": "Used Car Scout",
    "seatId": "20000000-0000-0000-0000-000000000914",
    "url": "https://x.ai/bot/MGVxnwyIdbgEl67jiWQRa",
    "seats": 2
  },
  {
    "owner": "joshluftig",
    "slug": "josh",
    "packName": "Josh",
    "ownerName": "Josh Luftig",
    "ownerId": "00000000-0000-0000-0000-000000000608",
    "packId": "10000000-0000-0000-0000-000000000616",
    "desk": "Sign-in & Access Keeper",
    "seatId": "20000000-0000-0000-0000-000000000916",
    "url": "https://x.ai/bot/XN7ntfEtE4HXDGTcMagtA",
    "seats": 1
  },
  {
    "owner": "SideShopAi",
    "slug": "matt",
    "packName": "Matt",
    "ownerName": "Matt",
    "ownerId": "00000000-0000-0000-0000-000000000609",
    "packId": "10000000-0000-0000-0000-000000000617",
    "desk": "Gorf, son of Grok, of house Musk",
    "seatId": "20000000-0000-0000-0000-000000000917",
    "url": "https://x.ai/bot/a1tF2md5bMblcc2XlxWx1",
    "seats": 1
  },
  {
    "owner": "DCBK2LA",
    "slug": "david",
    "packName": "David",
    "ownerName": "David Choukroun",
    "ownerId": "00000000-0000-0000-0000-000000000610",
    "packId": "10000000-0000-0000-0000-000000000618",
    "desk": "micDrop",
    "seatId": "20000000-0000-0000-0000-000000000918",
    "url": "https://x.ai/bot/ESqSHz53pQUFjs3oAzMXF",
    "seats": 1
  },
  {
    "owner": "BrooksConkle",
    "slug": "brooks",
    "packName": "Brooks",
    "ownerName": "Brooks Conkle",
    "ownerId": "00000000-0000-0000-0000-000000000611",
    "packId": "10000000-0000-0000-0000-000000000619",
    "desk": "My AI Team's Timesheet",
    "seatId": "20000000-0000-0000-0000-000000000919",
    "url": "https://x.ai/bot/j5ZaqA3Fd6DHZ0reCZWb1",
    "seats": 1
  },
  {
    "owner": "xpixeladventure",
    "slug": "xpixel",
    "packName": "XPixel",
    "ownerName": "XPixel",
    "ownerId": "00000000-0000-0000-0000-000000000612",
    "packId": "10000000-0000-0000-0000-000000000620",
    "desk": "NoWall News",
    "seatId": "20000000-0000-0000-0000-000000000920",
    "url": "https://x.ai/bot/jmBoc2IDCVQja1xr4Jukd",
    "seats": 1
  },
  {
    "owner": "InderpreetSingh",
    "slug": "inder",
    "packName": "inder",
    "ownerName": "inder",
    "ownerId": "00000000-0000-0000-0000-000000000613",
    "packId": "10000000-0000-0000-0000-000000000621",
    "desk": "Namedesk Domain Researcher",
    "seatId": "20000000-0000-0000-0000-000000000922",
    "url": "https://x.ai/bot/JHnB7PuXTrTFsSYuhJlQl",
    "seats": 1
  },
  {
    "owner": "nikpage",
    "slug": "nik",
    "packName": "Nik",
    "ownerName": "Nik Page",
    "ownerId": "00000000-0000-0000-0000-000000000614",
    "packId": "10000000-0000-0000-0000-000000000622",
    "desk": "Scout",
    "seatId": "20000000-0000-0000-0000-000000000923",
    "url": "https://x.ai/bot/5ajAIMCNzawDbHLc01gbO",
    "seats": 1
  },
  {
    "owner": "XHabib",
    "slug": "xhabib",
    "packName": "XHabib",
    "ownerName": "XHabib",
    "ownerId": "00000000-0000-0000-0000-000000000615",
    "packId": "10000000-0000-0000-0000-000000000623",
    "desk": "X Embed Builder",
    "seatId": "20000000-0000-0000-0000-000000000924",
    "url": "https://x.ai/bot/IETRUCsQCcnketUmBizdo",
    "seats": 1
  },
  {
    "owner": "Davestt",
    "slug": "david",
    "packName": "David",
    "ownerName": "David Zebrowski",
    "ownerId": "00000000-0000-0000-0000-000000000616",
    "packId": "10000000-0000-0000-0000-000000000624",
    "desk": "Convo Archivist",
    "seatId": "20000000-0000-0000-0000-000000000925",
    "url": "https://x.ai/bot/YfUktmqlUrUbRwQX8Zinc",
    "seats": 1
  },
  {
    "owner": "sat0xshi",
    "slug": "sat0xshi",
    "packName": "sat0xshi",
    "ownerName": "sat0xshi",
    "ownerId": "00000000-0000-0000-0000-000000000617",
    "packId": "10000000-0000-0000-0000-000000000625",
    "desk": "ハッカソン報告ボット",
    "seatId": "20000000-0000-0000-0000-000000000926",
    "url": "https://x.ai/bot/HJwxtDXTD2HKFgF5T2jag",
    "seats": 1
  },
  {
    "owner": "utahpowscott",
    "slug": "optionfarm",
    "packName": "OptionFarm",
    "ownerName": "OptionFarm",
    "ownerId": "00000000-0000-0000-0000-000000000618",
    "packId": "10000000-0000-0000-0000-000000000626",
    "desk": "Portfolio Bot",
    "seatId": "20000000-0000-0000-0000-000000000927",
    "url": "https://x.ai/bot/iOMR589tsqT3asO7PsR-Y",
    "seats": 3
  },
  {
    "owner": "yuu1111main",
    "slug": "miyayu",
    "packName": "Miyayu",
    "ownerName": "Miyayu",
    "ownerId": "00000000-0000-0000-0000-000000000619",
    "packId": "10000000-0000-0000-0000-000000000627",
    "desk": "脳内会議 議長",
    "seatId": "20000000-0000-0000-0000-000000000930",
    "url": "https://x.ai/bot/32C4L8cgsewTNo-uWcT7E",
    "seats": 1
  },
  {
    "owner": "martin_pestak",
    "slug": "martin",
    "packName": "Martin",
    "ownerName": "Martin Pestak",
    "ownerId": "00000000-0000-0000-0000-000000000620",
    "packId": "10000000-0000-0000-0000-000000000628",
    "desk": "Options Desk Chief",
    "seatId": "20000000-0000-0000-0000-000000000931",
    "url": "https://x.ai/bot/v-wtDQ7dpFXNzd1P9Hz9a",
    "seats": 1
  },
  {
    "owner": "balllvest",
    "slug": "alvin",
    "packName": "Alvin",
    "ownerName": "Alvin",
    "ownerId": "00000000-0000-0000-0000-000000000621",
    "packId": "10000000-0000-0000-0000-000000000629",
    "desk": "Box Janitor",
    "seatId": "20000000-0000-0000-0000-000000000932",
    "url": "https://x.ai/bot/fRKdGqUmfUYJCs1vtGnt3",
    "seats": 1
  },
  {
    "owner": "gilman_trevor",
    "slug": "trevor",
    "packName": "Trevor",
    "ownerName": "Trevor Gilman",
    "ownerId": "00000000-0000-0000-0000-000000000622",
    "packId": "10000000-0000-0000-0000-000000000630",
    "desk": "My First CEO Bot",
    "seatId": "20000000-0000-0000-0000-000000000933",
    "url": "https://x.ai/bot/YwN_z6dgUUXP5Y9qOTbTN",
    "seats": 5
  },
  {
    "owner": "CantBeatDees",
    "slug": "bryce",
    "packName": "Bryce",
    "ownerName": "Bryce Dees | Insurance + AI",
    "ownerId": "00000000-0000-0000-0000-000000000623",
    "packId": "10000000-0000-0000-0000-000000000631",
    "desk": "Am I Covered?",
    "seatId": "20000000-0000-0000-0000-000000000938",
    "url": "https://x.ai/bot/s6-8ydSHNYZVDsnWrtv9a",
    "seats": 1
  },
  {
    "owner": "steinolina",
    "slug": "steinunn",
    "packName": "Steinunn",
    "ownerName": "Steinunn",
    "ownerId": "00000000-0000-0000-0000-000000000624",
    "packId": "10000000-0000-0000-0000-000000000632",
    "desk": "TuneBot",
    "seatId": "20000000-0000-0000-0000-000000000939",
    "url": "https://x.ai/bot/sXaJXpHNSpaFq--oIg0Tl",
    "seats": 2
  },
  {
    "owner": "penguinspecz",
    "slug": "pengz",
    "packName": "pengz",
    "ownerName": "pengz",
    "ownerId": "00000000-0000-0000-0000-000000000625",
    "packId": "10000000-0000-0000-0000-000000000633",
    "desk": "Second Opinion Eats",
    "seatId": "20000000-0000-0000-0000-000000000941",
    "url": "https://x.ai/bot/QBTyr2YiFVuUja9qkXKqP",
    "seats": 2
  },
  {
    "owner": "Jwarchol",
    "slug": "joshua",
    "packName": "Joshua",
    "ownerName": "Joshua Warchol",
    "ownerId": "00000000-0000-0000-0000-000000000626",
    "packId": "10000000-0000-0000-0000-000000000634",
    "desk": "Grok Bot Backup",
    "seatId": "20000000-0000-0000-0000-000000000943",
    "url": "https://x.ai/bot/UFe4v2bs5h0ezWzLOxxOC",
    "seats": 1
  },
  {
    "owner": "kheladi",
    "slug": "ketan",
    "packName": "Ketan",
    "ownerName": "Ketan Patel",
    "ownerId": "00000000-0000-0000-0000-000000000627",
    "packId": "10000000-0000-0000-0000-000000000635",
    "desk": "Restaurant Franchise Owner Assistant",
    "seatId": "20000000-0000-0000-0000-000000000944",
    "url": "https://x.ai/bot/W7RKxR9J74ZWJz7qCNHmM",
    "seats": 1
  },
  {
    "owner": "AnnDiegoUSA",
    "slug": "ann",
    "packName": "Ann",
    "ownerName": "Ann Adamson",
    "ownerId": "00000000-0000-0000-0000-000000000628",
    "packId": "10000000-0000-0000-0000-000000000636",
    "desk": "Daily Signpost",
    "seatId": "20000000-0000-0000-0000-000000000945",
    "url": "https://x.ai/bot/PgwfYCsiOpedVqBOlYICp",
    "seats": 1
  },
  {
    "owner": "QuinnWR",
    "slug": "quinn",
    "packName": "Quinn",
    "ownerName": "Quinn Woods-Robinson",
    "ownerId": "00000000-0000-0000-0000-000000000629",
    "packId": "10000000-0000-0000-0000-000000000637",
    "desk": "Cadence",
    "seatId": "20000000-0000-0000-0000-000000000946",
    "url": "https://x.ai/bot/loV2_2DMLL-qGrs3nExSy",
    "seats": 1
  },
  {
    "owner": "mjplaskett",
    "slug": "mike",
    "packName": "Mike",
    "ownerName": "Mike Plaskett",
    "ownerId": "00000000-0000-0000-0000-000000000630",
    "packId": "10000000-0000-0000-0000-000000000638",
    "desk": "Career & Learning",
    "seatId": "20000000-0000-0000-0000-000000000947",
    "url": "https://x.ai/bot/M_k1dhG2zdnLZd6ZAeNS2",
    "seats": 1
  },
  {
    "owner": "MiMundoConIA",
    "slug": "samuel",
    "packName": "Samuel",
    "ownerName": "Samuel Ferrero.",
    "ownerId": "00000000-0000-0000-0000-000000000631",
    "packId": "10000000-0000-0000-0000-000000000639",
    "desk": "Hermes SSH Relay",
    "seatId": "20000000-0000-0000-0000-000000000948",
    "url": "https://x.ai/bot/ZDYulalXRq8x-rVObp8bt",
    "seats": 1
  },
  {
    "owner": "TedSkeen",
    "slug": "ted",
    "packName": "Ted",
    "ownerName": "Ted Skeen",
    "ownerId": "00000000-0000-0000-0000-000000000632",
    "packId": "10000000-0000-0000-0000-000000000640",
    "desk": "Concierge",
    "seatId": "20000000-0000-0000-0000-000000000949",
    "url": "https://x.ai/bot/x1wDYeHIolh269nhPMxY8",
    "seats": 1
  },
  {
    "owner": "Gordogit",
    "slug": "gordo",
    "packName": "Gordo",
    "ownerName": "Gordo",
    "ownerId": "00000000-0000-0000-0000-000000000633",
    "packId": "10000000-0000-0000-0000-000000000641",
    "desk": "Grok Notes",
    "seatId": "20000000-0000-0000-0000-000000000950",
    "url": "https://x.ai/bot/EpuAVLnQhL53YKXuDcfMy",
    "seats": 1
  },
  {
    "owner": "nickamis",
    "slug": "nick",
    "packName": "Nick",
    "ownerName": "Nick",
    "ownerId": "00000000-0000-0000-0000-000000000634",
    "packId": "10000000-0000-0000-0000-000000000642",
    "desk": "Civic Brief",
    "seatId": "20000000-0000-0000-0000-000000000951",
    "url": "https://x.ai/bot/hw_TZZERFkp4SlPq7ybZ6",
    "seats": 1
  },
  {
    "owner": "Daniell0gda",
    "slug": "daniel",
    "packName": "Daniel",
    "ownerName": "Daniel Ferens",
    "ownerId": "00000000-0000-0000-0000-000000000635",
    "packId": "10000000-0000-0000-0000-000000000643",
    "desk": "Show-ME",
    "seatId": "20000000-0000-0000-0000-000000000952",
    "url": "https://x.ai/bot/xJubIu_1ybXeXehoCJiI8",
    "seats": 1
  },
  {
    "owner": "KittyTellesWolf",
    "slug": "k",
    "packName": "K ι",
    "ownerName": "K ι T-7Y Wolf",
    "ownerId": "00000000-0000-0000-0000-000000000636",
    "packId": "10000000-0000-0000-0000-000000000644",
    "desk": "Prompt Director",
    "seatId": "20000000-0000-0000-0000-000000000953",
    "url": "https://x.ai/bot/B8effYn7-r67lyyx22uXz",
    "seats": 1
  },
  {
    "owner": "Macro_Harder",
    "slug": "j-p",
    "packName": "J.P.",
    "ownerName": "J.P. Picard",
    "ownerId": "00000000-0000-0000-0000-000000000637",
    "packId": "10000000-0000-0000-0000-000000000645",
    "desk": "HNIC",
    "seatId": "20000000-0000-0000-0000-000000000954",
    "url": "https://x.ai/bot/gBIsnjL6CucNZAW_ByGPx",
    "seats": 1
  },
  {
    "owner": "lee_wayan",
    "slug": "wayan",
    "packName": "Wayan",
    "ownerName": "Wayan Lee",
    "ownerId": "00000000-0000-0000-0000-000000000638",
    "packId": "10000000-0000-0000-0000-000000000646",
    "desk": "Any-Language Translator (pick your 2)",
    "seatId": "20000000-0000-0000-0000-000000000955",
    "url": "https://x.ai/bot/9-CrFX198ESk90n-e3tH5",
    "seats": 1
  },
  {
    "owner": "BiancaBellChamb",
    "slug": "bianca",
    "packName": "Bianca",
    "ownerName": "Bianca Bell-Chambers",
    "ownerId": "00000000-0000-0000-0000-000000000639",
    "packId": "10000000-0000-0000-0000-000000000647",
    "desk": "CET Coach",
    "seatId": "20000000-0000-0000-0000-000000000956",
    "url": "https://x.ai/bot/Q-teSdJpR58IWD1G0J0iQ",
    "seats": 1
  },
  {
    "owner": "saushank_",
    "slug": "saushank",
    "packName": "Saushank",
    "ownerName": "Saushank",
    "ownerId": "00000000-0000-0000-0000-000000000640",
    "packId": "10000000-0000-0000-0000-000000000648",
    "desk": "Crypto Options bot",
    "seatId": "20000000-0000-0000-0000-000000000959",
    "url": "https://x.ai/bot/16QaosA_qUfqSVDqA2Yq6",
    "seats": 1
  },
  {
    "owner": "mr_easonyang",
    "slug": "eason",
    "packName": "Eason",
    "ownerName": "Eason Yang",
    "ownerId": "00000000-0000-0000-0000-000000000641",
    "packId": "10000000-0000-0000-0000-000000000649",
    "desk": "这个X账号怎么火的",
    "seatId": "20000000-0000-0000-0000-000000000960",
    "url": "https://x.ai/bot/jZdcW7oX0o60hLAw35QcB",
    "seats": 1
  },
  {
    "owner": "SleepyCovfefe",
    "slug": "m-a-r-k-u-s",
    "packName": "M|A|R|K|U|S",
    "ownerName": "M|A|R|K|U|S",
    "ownerId": "00000000-0000-0000-0000-000000000642",
    "packId": "10000000-0000-0000-0000-000000000650",
    "desk": "Public Threat Desk",
    "seatId": "20000000-0000-0000-0000-000000000961",
    "url": "https://x.ai/bot/mQslHoIhcjMpzE252Rfpd",
    "seats": 2
  },
  {
    "owner": "ashleyschendel",
    "slug": "ashley",
    "packName": "Ashley",
    "ownerName": "Ashley Schendel",
    "ownerId": "00000000-0000-0000-0000-000000000643",
    "packId": "10000000-0000-0000-0000-000000000651",
    "desk": "Deal Detective",
    "seatId": "20000000-0000-0000-0000-000000000964",
    "url": "https://x.ai/bot/p36qEKy4qL_Gksm00iJus",
    "seats": 1
  },
  {
    "owner": "MadtownJA",
    "slug": "madneurons",
    "packName": "MadNeurons",
    "ownerName": "MadNeurons",
    "ownerId": "00000000-0000-0000-0000-000000000644",
    "packId": "10000000-0000-0000-0000-000000000652",
    "desk": "Literature Watcher",
    "seatId": "20000000-0000-0000-0000-000000000965",
    "url": "https://x.ai/bot/2ckVI9ItA5Yd6dP55iuBl",
    "seats": 1
  },
  {
    "owner": "KurtGoodfellow",
    "slug": "kurt",
    "packName": "Kurt",
    "ownerName": "Kurt Goodfellow",
    "ownerId": "00000000-0000-0000-0000-000000000645",
    "packId": "10000000-0000-0000-0000-000000000653",
    "desk": "Tourguide",
    "seatId": "20000000-0000-0000-0000-000000000966",
    "url": "https://x.ai/bot/sOiYa9ibSLkF2dVHobOXc",
    "seats": 1
  },
  {
    "owner": "chrishadges1",
    "slug": "chris",
    "packName": "Chris",
    "ownerName": "Chris Hadges",
    "ownerId": "00000000-0000-0000-0000-000000000646",
    "packId": "10000000-0000-0000-0000-000000000654",
    "desk": "Token Efficiency Bot",
    "seatId": "20000000-0000-0000-0000-000000000967",
    "url": "https://x.ai/bot/MuFBacsn90IhQ20RpO2fm",
    "seats": 1
  },
  {
    "owner": "jenna8A",
    "slug": "jenna",
    "packName": "Jenna",
    "ownerName": "Jenna Ochoa",
    "ownerId": "00000000-0000-0000-0000-000000000647",
    "packId": "10000000-0000-0000-0000-000000000655",
    "desk": "Botoween",
    "seatId": "20000000-0000-0000-0000-000000000969",
    "url": "https://x.ai/bot/5mzwroI2pRFvH84Md1Ufj",
    "seats": 1
  },
  {
    "owner": "AndresFelAriza",
    "slug": "pipenew",
    "packName": "Pipenew",
    "ownerName": "Pipenew",
    "ownerId": "00000000-0000-0000-0000-000000000648",
    "packId": "10000000-0000-0000-0000-000000000656",
    "desk": "Dashy – Family Kitchen Dashboard",
    "seatId": "20000000-0000-0000-0000-000000000970",
    "url": "https://x.ai/bot/Kk1qlFzg1EWxPjFcfLdP2",
    "seats": 1
  },
  {
    "owner": "benkruger",
    "slug": "ben",
    "packName": "Ben",
    "ownerName": "Ben Kruger",
    "ownerId": "00000000-0000-0000-0000-000000000649",
    "packId": "10000000-0000-0000-0000-000000000657",
    "desk": "Joseph",
    "seatId": "20000000-0000-0000-0000-000000000972",
    "url": "https://x.ai/bot/DcC0vgfiWRnK-p9mN4b9u",
    "seats": 1
  },
  {
    "owner": "hardikvoragg",
    "slug": "hardik",
    "packName": "Hardik",
    "ownerName": "Hardik",
    "ownerId": "00000000-0000-0000-0000-000000000650",
    "packId": "10000000-0000-0000-0000-000000000658",
    "desk": "Mog Report",
    "seatId": "20000000-0000-0000-0000-000000000973",
    "url": "https://x.ai/bot/LfFSJ3HEFUzE1JbnhIKcH",
    "seats": 1
  },
  {
    "owner": "arrmnt",
    "slug": "ar",
    "packName": "AR",
    "ownerName": "AR",
    "ownerId": "00000000-0000-0000-0000-000000000651",
    "packId": "10000000-0000-0000-0000-000000000659",
    "desk": "Point matinal géopolitique + crypto",
    "seatId": "20000000-0000-0000-0000-000000000974",
    "url": "https://x.ai/bot/2iVz13zCz8-_mn8kZ_CcK",
    "seats": 1
  },
  {
    "owner": "Rockhocker",
    "slug": "cybertrucker",
    "packName": "Cybertrucker",
    "ownerName": "Cybertrucker",
    "ownerId": "00000000-0000-0000-0000-000000000652",
    "packId": "10000000-0000-0000-0000-000000000660",
    "desk": "Sage",
    "seatId": "20000000-0000-0000-0000-000000000975",
    "url": "https://x.ai/bot/czVH2_zAJ03lca6ti7cwJ",
    "seats": 1
  },
  {
    "owner": "ScottBuildsBots",
    "slug": "scott",
    "packName": "Scott",
    "ownerName": "Scott Bonge | Grok Bots",
    "ownerId": "00000000-0000-0000-0000-000000000653",
    "packId": "10000000-0000-0000-0000-000000000661",
    "desk": "Drug Savings",
    "seatId": "20000000-0000-0000-0000-000000000976",
    "url": "https://x.ai/bot/c9zxS3sqkF5h7vXvs6NVn",
    "seats": 1
  },
  {
    "owner": "SaifElsaadyX",
    "slug": "egyptian",
    "packName": "egyptian",
    "ownerName": "egyptian menace",
    "ownerId": "00000000-0000-0000-0000-000000000654",
    "packId": "10000000-0000-0000-0000-000000000662",
    "desk": "Job Application Bot",
    "seatId": "20000000-0000-0000-0000-000000000977",
    "url": "https://x.ai/bot/nVtZ62GuhvGoiMSAi4b3-",
    "seats": 1
  },
  {
    "owner": "DanBooneFerden",
    "slug": "dan",
    "packName": "Dan",
    "ownerName": "Dan Ferden",
    "ownerId": "00000000-0000-0000-0000-000000000655",
    "packId": "10000000-0000-0000-0000-000000000663",
    "desk": "Claims Finder",
    "seatId": "20000000-0000-0000-0000-000000000978",
    "url": "https://x.ai/bot/6VeOVsZzMkrKElrPi_kOR",
    "seats": 1
  },
  {
    "owner": "adamtgi",
    "slug": "adam",
    "packName": "Adam",
    "ownerName": "Adam Kelly",
    "ownerId": "00000000-0000-0000-0000-000000000656",
    "packId": "10000000-0000-0000-0000-000000000664",
    "desk": "Chief",
    "seatId": "20000000-0000-0000-0000-000000000979",
    "url": "https://x.ai/bot/pKJAbuz7Vt8BSfRonGLp3",
    "seats": 1
  },
  {
    "owner": "wmurillo_eth",
    "slug": "wil",
    "packName": "Wil",
    "ownerName": "Wil Murillo",
    "ownerId": "00000000-0000-0000-0000-000000000657",
    "packId": "10000000-0000-0000-0000-000000000665",
    "desk": "Design Assistant",
    "seatId": "20000000-0000-0000-0000-000000000980",
    "url": "https://x.ai/bot/QmhN5Wk_fhaLnYk7LYwLC",
    "seats": 1
  },
  {
    "owner": "marshallfrith",
    "slug": "marshall",
    "packName": "Marshall",
    "ownerName": "Marshall Frith",
    "ownerId": "00000000-0000-0000-0000-000000000658",
    "packId": "10000000-0000-0000-0000-000000000666",
    "desk": "Super Wedding Planning Bot",
    "seatId": "20000000-0000-0000-0000-000000000981",
    "url": "https://x.ai/bot/WyyMPlEpIvd_7so5LGvNH",
    "seats": 1
  },
  {
    "owner": "RushabhShah",
    "slug": "rx",
    "packName": "Rx",
    "ownerName": "Rx",
    "ownerId": "00000000-0000-0000-0000-000000000659",
    "packId": "10000000-0000-0000-0000-000000000667",
    "desk": "ElonBot: WWED?",
    "seatId": "20000000-0000-0000-0000-000000000982",
    "url": "https://x.ai/bot/q4olioUt37xi36P3MFGyI",
    "seats": 1
  },
  {
    "owner": "datboiCeCey",
    "slug": "c",
    "packName": "C",
    "ownerName": "C",
    "ownerId": "00000000-0000-0000-0000-000000000660",
    "packId": "10000000-0000-0000-0000-000000000668",
    "desk": "Card Finder",
    "seatId": "20000000-0000-0000-0000-000000000983",
    "url": "https://x.ai/bot/7E0pVlxQWMZLowCdSV7QL",
    "seats": 1
  },
  {
    "owner": "socalfsd",
    "slug": "socal",
    "packName": "SoCal",
    "ownerName": "SoCal FSD",
    "ownerId": "00000000-0000-0000-0000-000000000661",
    "packId": "10000000-0000-0000-0000-000000000669",
    "desk": "Fleet Efficiency",
    "seatId": "20000000-0000-0000-0000-000000000984",
    "url": "https://x.ai/bot/n3BVWJO3mwIVW2NMF_-2L",
    "seats": 1
  },
  {
    "owner": "RonJohnson562",
    "slug": "ron",
    "packName": "Ron",
    "ownerName": "Ron Johnson",
    "ownerId": "00000000-0000-0000-0000-000000000662",
    "packId": "10000000-0000-0000-0000-000000000670",
    "desk": "JANUS",
    "seatId": "20000000-0000-0000-0000-000000000985",
    "url": "https://x.ai/bot/tdEYPzh9G8vkOjkH4wQsN",
    "seats": 1
  },
  {
    "owner": "itsMaurora",
    "slug": "andy",
    "packName": "Andy",
    "ownerName": "Andy Gray",
    "ownerId": "00000000-0000-0000-0000-000000000663",
    "packId": "10000000-0000-0000-0000-000000000671",
    "desk": "SecondLookSI",
    "seatId": "20000000-0000-0000-0000-000000000986",
    "url": "https://x.ai/bot/odgJyT9m8lQkRRvi0JWoO",
    "seats": 2
  },
  {
    "owner": "bylixing",
    "slug": "bylixing",
    "packName": "张立行",
    "ownerName": "张立行",
    "ownerId": "00000000-0000-0000-0000-000000000664",
    "packId": "10000000-0000-0000-0000-000000000672",
    "desk": "Agent 重置提醒",
    "seatId": "20000000-0000-0000-0000-000000000988",
    "url": "https://x.ai/bot/O_ZPyAOXn9yBuAR-4qDo8",
    "seats": 1
  },
  {
    "owner": "kostahantzis",
    "slug": "kosta",
    "packName": "Kosta",
    "ownerName": "Kosta Hantzis",
    "ownerId": "00000000-0000-0000-0000-000000000665",
    "packId": "10000000-0000-0000-0000-000000000673",
    "desk": "CPM",
    "seatId": "20000000-0000-0000-0000-000000000989",
    "url": "https://x.ai/bot/GwmXIfLuPPIPf2hGX2Txf",
    "seats": 1
  },
  {
    "owner": "paulblanche21",
    "slug": "paul",
    "packName": "Paul",
    "ownerName": "Paul Blanche",
    "ownerId": "00000000-0000-0000-0000-000000000666",
    "packId": "10000000-0000-0000-0000-000000000674",
    "desk": "Fitness Coach",
    "seatId": "20000000-0000-0000-0000-000000000990",
    "url": "https://x.ai/bot/s98xfhpL_T32hwckQyjwg",
    "seats": 1
  },
  {
    "owner": "gota_bara",
    "slug": "gota",
    "packName": "Gota",
    "ownerName": "Gota",
    "ownerId": "00000000-0000-0000-0000-000000000667",
    "packId": "10000000-0000-0000-0000-000000000675",
    "desk": "AI Radar",
    "seatId": "20000000-0000-0000-0000-000000000991",
    "url": "https://x.ai/bot/i1xwguSTrplEdPvx96MYh",
    "seats": 1
  }
] as const;

  for (const item of expected) {
    const pack = getFallbackPack(item.owner, item.slug);
    assert.ok(pack, item.owner);
    assert.equal(pack.id, item.packId);
    assert.equal(pack.owner.id, item.ownerId);
    assert.equal(pack.owner.githubLogin, item.owner);
    assert.equal(pack.owner.name, item.ownerName);
    assert.equal(pack.owner.xHandle, item.owner);
    assert.equal(pack.slug, item.slug);
    assert.equal(pack.name, item.packName);
    assert.equal(pack.official, false);
    assert.equal(pack.featured, false);
    assert.equal(pack.githubUrl, null);
    assert.ok(pack.seats.length >= item.seats);
    assert.equal(pack.seats.filter((seat) => seat.isDesk).length, 1);
    assert.equal(pack.seats[0]?.name, item.desk);
    assert.equal(pack.seats[0]?.isDesk, true);
    assert.equal(pack.seats[0]?.sortOrder, 0);
    assert.equal(pack.seats[0]?.id, item.seatId);
    assert.equal(pack.seats[0]?.grokTemplateUrl, item.url);
    assert.equal(listFallbackPacksByOwner(item.owner).length, 1);
    assert.match(seedSql, new RegExp(item.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(seedSql, new RegExp(item.packId));
    assert.match(seedSql, new RegExp(item.seatId));
  }

  const onExisting = [
  {
    "owner": "suddenlyjon",
    "slug": "knock",
    "path": "/suddenlyjon/knock",
    "oldSeats": 31,
    "newSeats": 44,
    "added": [
      {
        "name": "Veil & Vane",
        "id": "20000000-0000-0000-0000-000000000620",
        "url": "https://x.ai/bot/eBRHmCqvGlOuGfiEJk42a",
        "sortOrder": 31,
        "job": "Hides secret messages inside images, and finds hidden data in images, audio, and PDFs. For private notes between friends, puzzles, games, and checking."
      },
      {
        "name": "Delegatron 9000",
        "id": "20000000-0000-0000-0000-000000000621",
        "url": "https://x.ai/bot/NJvHVpGC81PjsH4234BPJ",
        "sortOrder": 32,
        "job": "Give it a goal and it runs your other bots for you. It splits the work, shows you the plan to approve, hands each bot its task, and follows up until."
      },
      {
        "name": "Same Language",
        "id": "20000000-0000-0000-0000-000000000622",
        "url": "https://x.ai/bot/wdBvHoTAcc4fqxNbOkVnA",
        "sortOrder": 33,
        "job": "when a word could mean two things, ask which one the owner meant, and keep the answer. Wake:."
      },
      {
        "name": "Onboarder",
        "id": "20000000-0000-0000-0000-000000000623",
        "url": "https://x.ai/bot/Xd_NXX5Yk6_7LmkA2TGLN",
        "sortOrder": 34,
        "job": "Hold a brand-new Grok Bot customer's hand from first open to a working setup. Learn what."
      },
      {
        "name": "The Interviewer",
        "id": "20000000-0000-0000-0000-000000000624",
        "url": "https://x.ai/bot/slpciJwWffCdi6T1mR0ON",
        "sortOrder": 35,
        "job": "Authentic interview simulator. You give the job and resume; it researches the role, runs a realistic mock (voice when possible), holds scoring until."
      },
      {
        "name": "Prime Day",
        "id": "20000000-0000-0000-0000-000000000625",
        "url": "https://x.ai/bot/2ctevo34dOOaP94S4AtU8",
        "sortOrder": 36,
        "job": "Paste an Amazon Christmas or gift list — or type what you need. Watches Prime Day and big sales and sends screenshot + link + price. Buys only after you."
      },
      {
        "name": "Token Accountant",
        "id": "20000000-0000-0000-0000-000000000626",
        "url": "https://x.ai/bot/EQYrGNoU4R2bgpsltxI2B",
        "sortOrder": 37,
        "job": "Warns you once at 25, 50, 75, and 90% on the Cursor Models, Other Models, and Grok Bot weekly bars from your own spending dashboard, and audits."
      },
      {
        "name": "Costume Lab",
        "id": "20000000-0000-0000-0000-000000000627",
        "url": "https://x.ai/bot/7Mg_QYAOAYkI9qp4os8HG",
        "sortOrder": 38,
        "job": "Tell it what your kid wants to be. It shows three concept pictures to choose from, then builds a one-of-a-kind DIY Halloween costume with a blueprint."
      },
      {
        "name": "House Manager",
        "id": "20000000-0000-0000-0000-000000000628",
        "url": "https://x.ai/bot/1cYY-EQstIPJeULoCsZNM",
        "sortOrder": 39,
        "job": "Family calendar and household bills in one calm bot. Rule-based reminders, conflict alerts, a daily digest, and bill due dates, and it never books."
      },
      {
        "name": "RezBot",
        "id": "20000000-0000-0000-0000-000000000629",
        "url": "https://x.ai/bot/JnDyu7X7D2qZDR1R3IcPU",
        "sortOrder": 40,
        "job": "Books restaurant reservations for you — OpenTable, Resy, Tock, or the restaurant site. You confirm; RezBot places it."
      }
    ]
  },
  {
    "owner": "gambrill",
    "slug": "dave",
    "path": "/gambrill/dave",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "Syllabot",
        "id": "20000000-0000-0000-0000-000000000664",
        "url": "https://x.ai/bot/uLaiAPTZzDV7vfptofUov",
        "sortOrder": 1,
        "job": "Syllabot helps you build and manage courses on Kajabi. A user-built tool, not an official Kajabi product."
      }
    ]
  },
  {
    "owner": "CarolinaDill",
    "slug": "carolina",
    "path": "/CarolinaDill/carolina",
    "oldSeats": 1,
    "newSeats": 8,
    "added": [
      {
        "name": "ImmigrationGuide",
        "id": "20000000-0000-0000-0000-000000000688",
        "url": "https://x.ai/bot/GtZXU_8Lia_a2DZKAIhOO",
        "sortOrder": 1,
        "job": "Explains legal ways to immigrate to or stay in the U.S., and how to spot immigration scams, citing live official government pages. For anyone helping."
      },
      {
        "name": "KJVBible",
        "id": "20000000-0000-0000-0000-000000000689",
        "url": "https://x.ai/bot/A7LELRVRh9WorYfGaTaXT",
        "sortOrder": 2,
        "job": "Answers what the King James Bible says on any subject, with book, chapter, and verse cited, plus an optional Spanish answer from the Reina Valera. Built."
      },
      {
        "name": "TripConcierge",
        "id": "20000000-0000-0000-0000-000000000690",
        "url": "https://x.ai/bot/bze8MHCEZCkRP_Dw7uqw5",
        "sortOrder": 3,
        "job": "Travel concierge for any destination. Researches a sourced trip brief (flights, hotels, sights, safety, day-by-day, budget) and recommends only — you."
      },
      {
        "name": "FamilyBank",
        "id": "20000000-0000-0000-0000-000000000691",
        "url": "https://x.ai/bot/DKZKpx6r0GTrfLUUxqkWx",
        "sortOrder": 4,
        "job": "A pretend family bank: tracks each person's money in a private ledger, pays exact compound interest at the rate you set, and makes friendly statements."
      },
      {
        "name": "CleanText",
        "id": "20000000-0000-0000-0000-000000000692",
        "url": "https://x.ai/bot/Bz7NPA38GwTUNZNuy6Fgb",
        "sortOrder": 5,
        "job": "Paste text, a screenshot, or a file and CleanText finds hidden invisible characters (zero-width spaces, tag characters, direction marks, odd spaces)."
      },
      {
        "name": "DealScout",
        "id": "20000000-0000-0000-0000-000000000693",
        "url": "https://x.ai/bot/cYyDDpxpj7v6Yz9fct4Pk",
        "sortOrder": 6,
        "job": "Finds the best-reviewed products at good prices, compares options across stores, and can watch for price drops. For anyone who wants smart buys without."
      },
      {
        "name": "FounderSales",
        "id": "20000000-0000-0000-0000-000000000694",
        "url": "https://x.ai/bot/NWZOp_PkJhy87qGDCzGKi",
        "sortOrder": 7,
        "job": "A founder-led sales helper that researches prospects, drafts outreach for you to approve, and keeps follow-ups from slipping."
      }
    ]
  },
  {
    "owner": "UziObi",
    "slug": "uzi",
    "path": "/UziObi/uzi",
    "oldSeats": 2,
    "newSeats": 3,
    "added": [
      {
        "name": "Admissions Wizard",
        "id": "20000000-0000-0000-0000-000000000697",
        "url": "https://x.ai/bot/e7_iCDyEA6UZbFa_N3VLm",
        "sortOrder": 2,
        "job": "College and MBA admissions counselor. Interview-mode setup and Who mining—essays, testing, and recommender briefs with trackers you turn on."
      }
    ]
  },
  {
    "owner": "bwilson",
    "slug": "bryan",
    "path": "/bwilson/bryan",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "Build Scout",
        "id": "20000000-0000-0000-0000-000000000721",
        "url": "https://x.ai/bot/VDwk7u7DSMqFcj4z7VGGT",
        "sortOrder": 1,
        "job": "Scouts what real people are building and vibe coding with AI, then pitches the best finds as prototypes for you or your builder bot to ship. Read-only."
      }
    ]
  },
  {
    "owner": "the_Arow_H",
    "slug": "dartagnan",
    "path": "/the_Arow_H/dartagnan",
    "oldSeats": 1,
    "newSeats": 7,
    "added": [
      {
        "name": "Net Positive",
        "id": "20000000-0000-0000-0000-000000000751",
        "url": "https://x.ai/bot/ytfhZa89sIXn1CtO69kRY",
        "sortOrder": 1,
        "job": "Keeps a monthly ledger for your Grok Bot crew: value in (revenue, hours saved) minus AI cost. Anything it can't back with a source is marked UNKNOWN."
      },
      {
        "name": "Doorcheck",
        "id": "20000000-0000-0000-0000-000000000752",
        "url": "https://x.ai/bot/bDhYfDe0sPlaVI9zMmZ4e",
        "sortOrder": 2,
        "job": "Before you add someone else's bot template, Doorcheck reads its recipe (instructions, skills, routines, plugins it asks for) and returns reject."
      },
      {
        "name": "Liftoff",
        "id": "20000000-0000-0000-0000-000000000753",
        "url": "https://x.ai/bot/ySMQW544mSpZFty-DaGml",
        "sortOrder": 3,
        "job": "A pre-launch checklist bot for anyone shipping an app, site, or paid plan. It checks the happy path and the failure path, data access rules, leaked."
      }
    ]
  },
  {
    "owner": "a-makelky",
    "slug": "aaron",
    "path": "/a-makelky/aaron",
    "oldSeats": 3,
    "newSeats": 4,
    "added": [
      {
        "name": "Changelog Scout",
        "id": "20000000-0000-0000-0000-000000000765",
        "url": "https://x.ai/bot/_VfbyLY4aGU8KJD46l5Mk",
        "sortOrder": 3,
        "job": "Watches the official Grok Bot changelog and sends you a weekly roundup of what shipped, with recommendations personalized to how you use your bots."
      }
    ]
  },
  {
    "owner": "chasemc67",
    "slug": "chase",
    "path": "/chasemc67/chase",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "MemeBot",
        "id": "20000000-0000-0000-0000-000000000781",
        "url": "https://x.ai/bot/8RvI6fjeiNF92TwFx0RNX",
        "sortOrder": 1,
        "job": "A meme maker that turns your ideas into high-quality image and video memes using real show frames and canonical templates, with sharp captions, labels."
      }
    ]
  },
  {
    "owner": "BradShannon",
    "slug": "brad",
    "path": "/BradShannon/brad",
    "oldSeats": 2,
    "newSeats": 3,
    "added": [
      {
        "name": "Parks",
        "id": "20000000-0000-0000-0000-000000000786",
        "url": "https://x.ai/bot/p3AZnkzysvRypGWCAJXVT",
        "sortOrder": 2,
        "job": "Parks covers all 63 US National Parks: pick parks, optimize multi-park road trips, build day-by-day plans and printable day sheets, and track the parks."
      }
    ]
  },
  {
    "owner": "ryanthawks",
    "slug": "ryan",
    "path": "/ryanthawks/ryan",
    "oldSeats": 1,
    "newSeats": 7,
    "added": [
      {
        "name": "Plaud Notes",
        "id": "20000000-0000-0000-0000-000000000787",
        "url": "https://x.ai/bot/3zqAV0jdsTN4I529IKtya",
        "sortOrder": 1,
        "job": "Intake, classify, index, and route voice-recorder notes. Uses a spreadsheet as the only index, a 16-section context pack, and a sensitivity gate."
      },
      {
        "name": "Website Publisher",
        "id": "20000000-0000-0000-0000-000000000788",
        "url": "https://x.ai/bot/UuKqeb4npN9RsP1G3REFR",
        "sortOrder": 2,
        "job": "Senior web publisher for a public static site: gated deploys, SEO and indexing, docs, signup embeds, and featured-content drops — without inventing."
      },
      {
        "name": "LinkedIn Agent",
        "id": "20000000-0000-0000-0000-000000000789",
        "url": "https://x.ai/bot/2jelZnGWnAlhmvHFZOp1N",
        "sortOrder": 3,
        "job": "A LinkedIn ghostwriter and networking assistant. It finds sourced topics in your lane, drafts posts and outreach in your voice, and sends nothing until."
      },
      {
        "name": "Research Project PM",
        "id": "20000000-0000-0000-0000-000000000790",
        "url": "https://x.ai/bot/7gpN_ZuWCACFjunItHka0",
        "sortOrder": 4,
        "job": "A project manager for a research collaboration. It briefs coding agents, checks their proof itself, keeps the collaborator hub and review repo current."
      },
      {
        "name": "Research PM",
        "id": "20000000-0000-0000-0000-000000000791",
        "url": "https://x.ai/bot/3dSEPhGZq_0AXeIinhe1o",
        "sortOrder": 5,
        "job": "Senior PM for a recurring research-intelligence pipeline. It reviews nightly claim runs, drives a weekly brief cycle, and hands coding fixes to coding."
      },
      {
        "name": "Ship Evidence Auditor",
        "id": "20000000-0000-0000-0000-000000000792",
        "url": "https://x.ai/bot/5l-uALmS59Wb9hZAMvGpz",
        "sortOrder": 6,
        "job": "Audits every auto-ship from your coding agents with hard evidence (CI, verify runs, merge method, ship log) and pauses a lane when a ship fails its."
      }
    ]
  },
  {
    "owner": "Av1dlive",
    "slug": "av1d",
    "path": "/Av1dlive/av1d",
    "oldSeats": 5,
    "newSeats": 6,
    "added": [
      {
        "name": "Inference Lab",
        "id": "20000000-0000-0000-0000-000000000797",
        "url": "https://x.ai/bot/2BO1SgtlCc4OCYLrzKoZ_",
        "sortOrder": 5,
        "job": "A hands-on inference lab assistant that serves, benchmarks, and compares LLMs on your own hardware or cloud GPUs, then writes up cost, speed."
      }
    ]
  },
  {
    "owner": "farzyness",
    "slug": "farzad",
    "path": "/farzyness/farzad",
    "oldSeats": 3,
    "newSeats": 4,
    "added": [
      {
        "name": "Video Creator",
        "id": "20000000-0000-0000-0000-000000000808",
        "url": "https://x.ai/bot/RPtsHesZPgAlwMOZAX8Ef",
        "sortOrder": 3,
        "job": "Runs an explainer video team end to end: research, script, voice, invented-look animation, edit, mechanical QA, unlisted upload. A director plus four."
      }
    ]
  },
  {
    "owner": "monomyth",
    "slug": "eugene",
    "path": "/monomyth/eugene",
    "oldSeats": 2,
    "newSeats": 5,
    "added": [
      {
        "name": "Jon Slop",
        "id": "20000000-0000-0000-0000-000000000809",
        "url": "https://x.ai/bot/Ky0xwV840V9RZoTPQlne_",
        "sortOrder": 2,
        "job": "Keeps watch on X for new music videos made with Slop Cannon (slop.cc) and sends you a short line for each one. It comes with a list of 547 known videos."
      },
      {
        "name": "Handel",
        "id": "20000000-0000-0000-0000-000000000810",
        "url": "https://x.ai/bot/ex1gjM_9lKmE4pLJG8o_M",
        "sortOrder": 3,
        "job": "Hears what's playing on your Mac, Windows, or Linux machine (or a clip you attach), reverse-engineers the track, and pushes harder-slapping Suno."
      },
      {
        "name": "Truffle",
        "id": "20000000-0000-0000-0000-000000000811",
        "url": "https://x.ai/bot/22XPum6Dznc_jnPeuWGTt",
        "sortOrder": 4,
        "job": "Finds small, high-quality X accounts in your interests that you probably don't follow yet. Reads your public profile, proposes niches, and sends."
      }
    ]
  },
  {
    "owner": "liam_fallen",
    "slug": "liam",
    "path": "/liam_fallen/liam",
    "oldSeats": 8,
    "newSeats": 9,
    "added": [
      {
        "name": "Handoff",
        "id": "20000000-0000-0000-0000-000000000849",
        "url": "https://x.ai/bot/wXaXn5rj0pJIMzzonyXsl",
        "sortOrder": 8,
        "job": "Hires real people through RentAHuman or Fiverr to get things done, gets your OK on cost, and brings the result back."
      }
    ]
  },
  {
    "owner": "parkersmith",
    "slug": "parkersmith",
    "path": "/parkersmith/parkersmith",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "Morning Brief",
        "id": "20000000-0000-0000-0000-000000000857",
        "url": "https://x.ai/bot/xYZX2g2H3MEIvGgWEDc1T",
        "sortOrder": 1,
        "job": "A daily ~15-minute audio morning show from your own calendar, inbox, and X bookmarks, plus an optional text brief. Read-only: it never sends or changes."
      }
    ]
  },
  {
    "owner": "ericosiu",
    "slug": "eric-osiu",
    "path": "/ericosiu/eric-osiu",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "AEO/SEO Bot",
        "id": "20000000-0000-0000-0000-000000000871",
        "url": "https://x.ai/bot/Jyx1Lg-VzYgyjDc-y-GQi",
        "sortOrder": 1,
        "job": "Weekday content operator for search and answer-engine pages. It mines a slate from search, calls, and founder tape, scores ideas with a live judge."
      }
    ]
  },
  {
    "owner": "kleosrr",
    "slug": "mario",
    "path": "/kleosrr/mario",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "Model News",
        "id": "20000000-0000-0000-0000-000000000872",
        "url": "https://x.ai/bot/7L8cVHdWwgbgeOOa_19QD",
        "sortOrder": 1,
        "job": "Follows AI model launches, new developer and AI tools, and major tech news, and sends you a short daily digest with official links."
      }
    ]
  },
  {
    "owner": "the_davey",
    "slug": "dave",
    "path": "/the_davey/dave",
    "oldSeats": 2,
    "newSeats": 3,
    "added": [
      {
        "name": "Fight Desk",
        "id": "20000000-0000-0000-0000-000000000875",
        "url": "https://x.ai/bot/BTFxr9l6QaZ2iS9lHVpDM",
        "sortOrder": 2,
        "job": "Raise AI champions on AgentBorn: kung-fu duels, super ninja gauntlets, NFL-style football, and dungeon delves, with a public replay for every match."
      }
    ]
  },
  {
    "owner": "leechael",
    "slug": "leechael",
    "path": "/leechael/leechael",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "人生设计师",
        "id": "20000000-0000-0000-0000-000000000908",
        "url": "https://x.ai/bot/vnqVHiZauQJwpzWJShUcW",
        "sortOrder": 1,
        "job": "长期人生导师：像人生设计课多轮「反映 + 只问一句」，让人还想接着聊。指南与设计放心里用；不关场、不甩书包子、不报回访钟点。日常关心用最近/昨天。."
      }
    ]
  },
  {
    "owner": "Baconbrix",
    "slug": "baconbrix",
    "path": "/Baconbrix/baconbrix",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "Anatomy Bot",
        "id": "20000000-0000-0000-0000-000000000921",
        "url": "https://x.ai/bot/Chbbw34kaGT-ASBzoTQD7",
        "sortOrder": 1,
        "job": "Describe a machine in one line and get back an interactive isometric drawing of it, with moving parts and optional WebGL fire, water or plasma. Built on."
      }
    ]
  },
  {
    "owner": "jason_bennitt",
    "slug": "jason",
    "path": "/jason_bennitt/jason",
    "oldSeats": 1,
    "newSeats": 3,
    "added": [
      {
        "name": "Ops",
        "id": "20000000-0000-0000-0000-000000000957",
        "url": "https://x.ai/bot/T_OxP_C_2AbW68oUIqzch",
        "sortOrder": 1,
        "job": "Keeps a fleet of AI assistants healthy. Audits routines, handoffs, skills, rooms and each bot's purpose, fixes what's safe, and only pings you."
      },
      {
        "name": "Review",
        "id": "20000000-0000-0000-0000-000000000958",
        "url": "https://x.ai/bot/Lvs_OHpj5G4qHfp0o8hN4",
        "sortOrder": 2,
        "job": "An adversarial PR reviewer for a fleet of coding bots. It reads every diff, verifies CI itself, merges only when both are clean, and wakes the owning."
      }
    ]
  },
  {
    "owner": "trevin",
    "slug": "trevin",
    "path": "/trevin/trevin",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "Diana Diagrams",
        "id": "20000000-0000-0000-0000-000000000963",
        "url": "https://x.ai/bot/zw53sDf2_sPMCh872UY5h",
        "sortOrder": 1,
        "job": "A diagram specialist that turns systems, processes, and ideas into clean diagrams and charts in the illo style, with an illo character peeking from."
      }
    ]
  },
  {
    "owner": "AdventureNLearn",
    "slug": "adventure",
    "path": "/AdventureNLearn/adventure",
    "oldSeats": 3,
    "newSeats": 4,
    "added": [
      {
        "name": "RefreshBot",
        "id": "20000000-0000-0000-0000-000000000968",
        "url": "https://x.ai/bot/wm9PWYs4fY6y9RiTaS3Pq",
        "sortOrder": 3,
        "job": "A lightweight helper that rechecks pages, feeds, files, or statuses you keep refreshing and tells you when something changes."
      }
    ]
  },
  {
    "owner": "naoufalelh",
    "slug": "nao",
    "path": "/naoufalelh/nao",
    "oldSeats": 3,
    "newSeats": 6,
    "added": [
      {
        "name": "Clock",
        "id": "20000000-0000-0000-0000-000000000971",
        "url": "https://x.ai/bot/o1i1t2DhvfahqIlO5o1gd",
        "sortOrder": 3,
        "job": "Clock is an AI calendar assistant that replaces Clockwise. It finds meeting times, protects focus time, moves flexible meetings, adds breaks and travel."
      }
    ]
  }
] as const;
  for (const row of onExisting) {
    const pack = getFallbackPack(row.owner, row.slug);
    assert.ok(pack, row.path);
    assert.ok(pack.seats.length >= row.newSeats);
    assert.equal(pack.seats.filter((seat) => seat.isDesk).length, 1);
    for (const added of row.added) {
      const seat = pack.seats.find((item) => item.id === added.id);
      assert.ok(seat, added.url);
      assert.equal(seat?.name, added.name);
      assert.equal(seat?.isDesk, false);
      assert.equal(seat?.sortOrder, added.sortOrder);
      assert.equal(seat?.grokTemplateUrl, added.url);
      assert.equal(seat?.repeatsWhen, null);
      assert.match(seedSql, new RegExp(added.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    }
  }

  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url) => Boolean(url));
  assert.equal(fallbackUrls.length, 1339);
  assert.equal(new Set(fallbackUrls).size, 1339);
  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  assert.equal(new Set(seedUrlMatches.filter((url) => fallbackUrls.includes(url))).size, 1339);
  for (const url of ["https://x.ai/bot/TaE2o0Y-lp8MpmBDC1jos","https://x.ai/bot/tHo33t3IaAhpxds5IpNbD","https://x.ai/bot/sy364bgoJN8Rb5vZo4Abo","https://x.ai/bot/-j00v29rSvOvd-ht6q_vi","https://x.ai/bot/w1d4ZVJ6ag9AljTBvZqkN","https://x.ai/bot/a3EwtQPjFkXZaPZEMGHgY","https://x.ai/bot/CFLaWCGlZ6RzBSU7D1r6r","https://x.ai/bot/6XD2O5ulgL-dNxQUyU90s","https://x.ai/bot/KaC99w7qlJ0QTtrKwxqFm","https://x.ai/bot/029xyNepam5LGMNYLIDP8","https://x.ai/bot/1xkIClLvscskj-Q4LsQIy","https://x.ai/bot/EJYTBBKPwAOdZPrKZCp8v","https://x.ai/bot/XjfLn_WyeGXzwHjPLL6jW","https://x.ai/bot/_fIQxxNowoMaubTPzBnrf","https://x.ai/bot/ljvkTtXU7Qd20efplT1KN","https://x.ai/bot/7eBE-1qFTRraHtd5WpUbr","https://x.ai/bot/9VWen13yCOgJi--kDJtcW","https://x.ai/bot/pfhAjpJ4AZTTE2yfpZggS","https://x.ai/bot/xQbNgBdjjo1o2bCQNxbp7","https://x.ai/bot/QC12jiAl0xs4kd6y_RD3g","https://x.ai/bot/riczwdCYInopYttucptao","https://x.ai/bot/x3G0dAD1zxRXa5pdHw9NQ","https://x.ai/bot/8obMM4mRWRLf51EB2n4JV","https://x.ai/bot/qocgykNssAv63yc1kdNnN","https://x.ai/bot/Wu7RQdOP-OY84e4NPOKqM","https://x.ai/bot/-zRQeViL06G-7XZYeD5hZ","https://x.ai/bot/40yecp78USuXhCXVnuUSo","https://x.ai/bot/wJRcag7l4xPBW4Hc_mA0_","https://x.ai/bot/NHDcLbHnQyb1nWlfkVAjm","https://x.ai/bot/i-AGTTurx7EvXBqJ4U5Rw","https://x.ai/bot/BIukNWeAKCCDQHZUNp2jo","https://x.ai/bot/zVd3aZG061Qi2kyusWFXA","https://x.ai/bot/hOJli2-3VyJs256JXFBWY","https://x.ai/bot/qTkPQpwaJVnMknRKZN6a-","https://x.ai/bot/0E12F_0k-qpDRxdBU_gy4","https://x.ai/bot/KZEcx_uMDR-zJIXLlYw5I","https://x.ai/bot/uPcfO_n3R-y8vDn0Kru9T","https://x.ai/bot/tFa9bbghjyyqiU5Je3rhm","https://x.ai/bot/Jx7uzFMG-dQ9q636btZrS","https://x.ai/bot/jhwkYhWyRJbDs_-uHzGar","https://x.ai/bot/l8tq3o7JcvC-YFV2HaHfu","https://x.ai/bot/di6vIWc5BcaN7aghHpC8C","https://x.ai/bot/-GucfzHVWJljNVuyWjFSE","https://x.ai/bot/9AsX0Exx7P4m2IwZXJ4tp","https://x.ai/bot/EUuVhfdZMiZZYYmeK3F7I","https://x.ai/bot/3v6ebv-qBDNCFkTDeH68W","https://x.ai/bot/7X7bJpKNFugFLcLCd3F3B","https://x.ai/bot/i8zkL9ZfVEgxWJI0Meqvz","https://x.ai/bot/0I8SH6XKWmBYc2HynER9i","https://x.ai/bot/0yRl8b9gk0AYDPhTyJVKN","https://x.ai/bot/fINpFEqNy4DPyZ5hZmTKT","https://x.ai/bot/aXd23Y92YukH8W2Kj7pye","https://x.ai/bot/x42lRBd-njEddcsdVXcvb","https://x.ai/bot/GZeqDkOuBOEzGMrNH3Jhf","https://x.ai/bot/jwWCnlq7VAvEodiz8zlgX","https://x.ai/bot/NsCDfZMFctaP1WIp_48k4","https://x.ai/bot/fJoloWNDTl7ee9VwxNJxH","https://x.ai/bot/aDCypdpubEzCy_lvlLu3-","https://x.ai/bot/LjDRYoJZtHs0r3pd-kAY6","https://x.ai/bot/-ka4rm8qG-NpPgMgz6ETf","https://x.ai/bot/sdCslo3yFiCHrWZ2JVPh9","https://x.ai/bot/MNAkssnLggwp3t74suuPs","https://x.ai/bot/gpPjBLipn7IDb7AWPBnmV","https://x.ai/bot/8kas3kfny1p0N7PsT5jAT","https://x.ai/bot/z7pQN9VX-vOK5Bo69G9OJ","https://x.ai/bot/_z8j7TViBpvmQ9mlxRDec","https://x.ai/bot/TeEdtOdobgymTchbFqzzW","https://x.ai/bot/wUGvc7oqCZPj_mHaYxYbi","https://x.ai/bot/w4d1Qj-byuNtISAyyitYa","https://x.ai/bot/1gepkjYj4Ogl2nKxgopZV","https://x.ai/bot/Wcrnj5KLs35EV2LO1Jxq7","https://x.ai/bot/9eRmhgjSdrIlHfW_ZXfl3","https://x.ai/bot/IwF-RUsXtrV-_TZl8Df6I","https://x.ai/bot/TP0urJDwrm-_qRQhGI74A","https://x.ai/bot/p2u8R0kbcN5IWcQi9Cpfn","https://x.ai/bot/Ww-RXj-lLqpg_oWqzccKZ","https://x.ai/bot/tTcuv64Y0_fNnZ_qw-TJN","https://x.ai/bot/QZVEWbU8K1BeQbqTXi02N","https://x.ai/bot/HFW0hBjHobqdNUfY2cn9L","https://x.ai/bot/y_QOhpnXyS7Rap9CE4Ir8","https://x.ai/bot/TaRhODlVo4N5mKKH6gTW6","https://x.ai/bot/iQ9BMmGzaCUN8M8j6CerX","https://x.ai/bot/Y3xV-T0yxz2UihvOrlIK6","https://x.ai/bot/_jOdbfkB16zxu7MRcmReE","https://x.ai/bot/ETwbAVBi1bweFPvBqWC2E","https://x.ai/bot/61Gc886_QmH9dALQaFrr_","https://x.ai/bot/1k1nfNzus_-WXY-nOYM2V","https://x.ai/bot/rkL_NVRxxmYs4IeOObGH5","https://x.ai/bot/RgivaqZM6x_meep2iaobm","https://x.ai/bot/ZchETiHIEo5BvllONepSI","https://x.ai/bot/e5UBnGbfvCyML0pahKPNw","https://x.ai/bot/E-kJk5BzNtNzcjAYNknTE","https://x.ai/bot/RhW5Ygqpl03B7fTkBIoGH","https://x.ai/bot/b9AG0Idri9x39jYSlHkTm","https://x.ai/bot/oAfWMWKilafIUG1sod4Dp","https://x.ai/bot/XmJ-Sxch8GtvtGX63Z795","https://x.ai/bot/ojRGlp3tVO75MAzhEoVEv","https://x.ai/bot/h2c1pK5fFqKPvzfm-rvQV","https://x.ai/bot/C2hHOX-gwODZjsy1YB5FX","https://x.ai/bot/fKmJNdkjP_tN2sMqLlPko","https://x.ai/bot/onLaBYQxzixgBzJgDZ18u","https://x.ai/bot/s2YEW2exxqk-BhcWfGziz","https://x.ai/bot/iJYZ4GQ775Sts3COWP3aY","https://x.ai/bot/tSa26E3PoBOXehxJzglsR","https://x.ai/bot/uGxaqcDRbn8cO4k-p3bAg","https://x.ai/bot/WAwConHijO4KArfb4-OnP","https://x.ai/bot/d20O3Bx5NypE-O-E_vKtp","https://x.ai/bot/JcuatE94VVR3njSPDBulv","https://x.ai/bot/YtRVHX01SsOc74HBJYcOP","https://x.ai/bot/js1pBP-lLlivKHY8Q_d4v","https://x.ai/bot/Fwf_OUvMYPcvVkKsy9jNd","https://x.ai/bot/w_ZtwODCJMhKuq6k0Nz4k","https://x.ai/bot/UbUz8dhpG1Gw7NDAokBXo","https://x.ai/bot/dOR0cOKRCW1s10CTeEPIN","https://x.ai/bot/drXeYVtu5klgMh3pf0gKS","https://x.ai/bot/j8hYIlXmkEZgiU4jw76r8","https://x.ai/bot/-MWo_XFJRkd4yBmS5MHTH","https://x.ai/bot/fznImG9Tm3a0C374KERZb","https://x.ai/bot/RHzmeKCzRqayDEgEqUNea","https://x.ai/bot/ljqYGS3VUhvAf3WQbrgVZ","https://x.ai/bot/guKZ5V775hPM-RP2ufLfh","https://x.ai/bot/sZQ25eb9d1C5kFHpfE8_N","https://x.ai/bot/zJCG8H4aahs5Ex1bwrTum","https://x.ai/bot/0IhyZWxwbf2cFmsmroZQL","https://x.ai/bot/8mi67EcgDUS2FDtOAIKcJ","https://x.ai/bot/tZd9mNpvCmnm4pxr-pBpA","https://x.ai/bot/LENrKV-0QXmE_TGv3_hem","https://x.ai/bot/OY2K6DPosnK6ijDNpWJL3","https://x.ai/bot/KYUctVKUDNLG5IjsQPQ_o","https://x.ai/bot/5UgsqdCgNWCagSjvMyzfF","https://x.ai/bot/omWM6Xdf2cqSFqwCzEFIM","https://x.ai/bot/o7SoQoQE5KN4K_2pptSvV","https://x.ai/bot/ay0PGygsBxYONJRITWABE","https://x.ai/bot/sla0SUw2xJ3oc7sKdRtVO","https://x.ai/bot/Vqj_yirM0hWY4SUCFMDFm","https://x.ai/bot/4Wbza84SDv-l-1RcnVqne","https://x.ai/bot/9oAPhd9MbGIWmpO7oE5Fa","https://x.ai/bot/Eb9hedqIE_G9KXRNsYRE9","https://x.ai/bot/yF9Z-RMzHW1SpLC94-BmM","https://x.ai/bot/s8oV9Jm4Cs8MvLPGsGXyi","https://x.ai/bot/xWzmqrAs6JGivQQskJyNy","https://x.ai/bot/cAV3aRWNNP8ArGjOSJ7g9","https://x.ai/bot/C0Y39IIyol0PV6GDN9OgX","https://x.ai/bot/SLLBNwseegBForG62KVRC","https://x.ai/bot/gj3IlHOOpzecm6xpmPJOt","https://x.ai/bot/hLtN-c5Vw-JWIehFEeoTm","https://x.ai/bot/lMGxli1bCAdof_EqRRdvH","https://x.ai/bot/Qsqan7PbltFggoJukvmtT","https://x.ai/bot/B4VFNYBoeE4N3lBG_jj_g","https://x.ai/bot/W-GZduBEhE-fDFW4SwQ0k","https://x.ai/bot/wyZbu6Il_0RtaKEToCBFp","https://x.ai/bot/XkyuX648dekpInVtBr44n","https://x.ai/bot/CJvgkBx_INfugO8TtH7gp","https://x.ai/bot/zgQuwpX78Yn09ddfIJkzU","https://x.ai/bot/pegWv3F8t7KSEwQ3sxd6A","https://x.ai/bot/171bkwBAjpc2eJgdOyAPL","https://x.ai/bot/tnz0pflI7D3u1d0_Nzrgc","https://x.ai/bot/bjQEhCBsWNSK6soqaLjaM","https://x.ai/bot/_5N1Ov6ac1S_MGijPXtvO","https://x.ai/bot/zZr88f32ojF8OBvLSZ8V7","https://x.ai/bot/sGX1MPOtVLAMzSUScPaxi","https://x.ai/bot/QcUllqY5WpAPMMWjWkn71","https://x.ai/bot/lDp666Fm-QgyBGqK7ee4l","https://x.ai/bot/xbQ3-2zMNc1hma58OiaTg","https://x.ai/bot/zU2WY6PaaY2EWzuo4GxP5","https://x.ai/bot/Fm11uT5RgbXAzKNo04oWf","https://x.ai/bot/oJMtF1ij29K03tKPhEDFN","https://x.ai/bot/d48QaYERwvgtUmYsGlyz8","https://x.ai/bot/GxxsLOoweuJpbgKVwrBWU","https://x.ai/bot/VBmzZaD3abMPl53kwWuYp","https://x.ai/bot/aAeRtbjk9VJoVylt35cfh","https://x.ai/bot/PCWM_xFhmFIxpA3lTShSE","https://x.ai/bot/9vnd_iLPbZMPN3iQaVtU_","https://x.ai/bot/Nf0M-LgnNsLDvtvAKnASf","https://x.ai/bot/i8BWHsB7B1PF_6td6mlVD","https://x.ai/bot/u3dFfq5q52a_p4tZU62Dg","https://x.ai/bot/87ziT4BuuJZmtIQm7IW-e","https://x.ai/bot/MEhuzSRmddJAr5DBllCRt","https://x.ai/bot/wCkZhl2memJD5XYkcxyys","https://x.ai/bot/Q7jzCnVHMmVhhBC3hwyQb","https://x.ai/bot/KE7y0gGJRdbb-9ozqUwDc","https://x.ai/bot/Q6AwABs_6Nt0Lx8LzR-A_","https://x.ai/bot/BrNtGdBpIkprn_Nr8Hy4f","https://x.ai/bot/_BZaF6XfMK_kPsmrLSqRK"]) {
    assert.ok(!fallbackUrls.includes(url), `held url leaked ${url}`);
  }
  assert.ok(!fallbackUrls.includes("https://x.ai/bot/l82Fnugc2EEblUuMwyeaV"));
  assert.ok(!seedSql.includes("https://x.ai/bot/l82Fnugc2EEblUuMwyeaV"));
  assert.equal(getFallbackPack("examples", "stencil"), null);
  assert.ok(!listFallbackPacks().some((pack) => pack.owner.githubLogin === "examples"));
  assert.equal(getFallbackPack("rrrkren", "eric-ren")?.owner.name !== getFallbackPack("ericzakariasson", "eric")?.owner.name, true);
  assert.equal(getFallbackPack("MitchTiler", "mitch")?.owner.githubLogin, "MitchTiler");
  assert.equal(getFallbackPack("tylernishida", "tyler")?.owner.githubLogin, "tylernishida");
});


test("catalog adds Oct 14 8pm IST hunt (165 seats, 91 new packs)", () => {
  const stats = fallbackStats();
  assert.equal(stats.packs, 844);
  assert.equal(stats.seats, 1339);

  const expected = [
  {
    "owner": "1280mhz",
    "slug": "1280",
    "packName": "1280",
    "ownerName": "1280 MHz (e/acc)",
    "xHandle": "1280mhz",
    "ownerId": "00000000-0000-0000-0000-000000000668",
    "packId": "10000000-0000-0000-0000-000000000676",
    "desk": "Meetups",
    "seatId": "20000000-0000-0000-0000-000000000992",
    "url": "https://x.ai/bot/6FKqVYt2n9UH4cOYSIdr6",
    "seats": 1
  },
  {
    "owner": "_hungha",
    "slug": "hunghuc",
    "packName": "hunghuc",
    "ownerName": "Hung Ha",
    "xHandle": "_hungha",
    "ownerId": "00000000-0000-0000-0000-000000000669",
    "packId": "10000000-0000-0000-0000-000000000677",
    "desk": "ZeroTok Research",
    "seatId": "20000000-0000-0000-0000-000000001008",
    "url": "https://x.ai/bot/cy-_WGjLOPsiU5WOlzFr-",
    "seats": 1
  },
  {
    "owner": "_rudedude",
    "slug": "don",
    "packName": "Don",
    "ownerName": "Don J. Rude",
    "xHandle": "_rudedude",
    "ownerId": "00000000-0000-0000-0000-000000000670",
    "packId": "10000000-0000-0000-0000-000000000678",
    "desk": "X Guard",
    "seatId": "20000000-0000-0000-0000-000000001010",
    "url": "https://x.ai/bot/DrD3msLXqCwax7SUDyQGy",
    "seats": 1
  },
  {
    "owner": "afeastofideas",
    "slug": "mindfeast",
    "packName": "MindFeast",
    "ownerName": "Brad (MindFeast dad)",
    "xHandle": "afeastofideas",
    "ownerId": "00000000-0000-0000-0000-000000000671",
    "packId": "10000000-0000-0000-0000-000000000679",
    "desk": "Relay",
    "seatId": "20000000-0000-0000-0000-000000001011",
    "url": "https://x.ai/bot/HVbym4T7Gof6G7C9CFS-V",
    "seats": 1
  },
  {
    "owner": "alexnextd00r",
    "slug": "alex",
    "packName": "Alex",
    "ownerName": "GRID_WALKER//",
    "xHandle": "alexnextd00r",
    "ownerId": "00000000-0000-0000-0000-000000000672",
    "packId": "10000000-0000-0000-0000-000000000680",
    "desk": "Budget Coach",
    "seatId": "20000000-0000-0000-0000-000000001012",
    "url": "https://x.ai/bot/SgloJICCQNZpb0h9XJQF1",
    "seats": 1
  },
  {
    "owner": "anabology",
    "slug": "anabology",
    "packName": "anabology",
    "ownerName": "anabology",
    "xHandle": "anabology",
    "ownerId": "00000000-0000-0000-0000-000000000673",
    "packId": "10000000-0000-0000-0000-000000000681",
    "desk": "Claudia",
    "seatId": "20000000-0000-0000-0000-000000001016",
    "url": "https://x.ai/bot/zvsgYtQHUcSKGRhAb_JzM",
    "seats": 1
  },
  {
    "owner": "andrarchy",
    "slug": "andrew",
    "packName": "Andrew",
    "ownerName": "Andrew Levine",
    "xHandle": "andrarchy",
    "ownerId": "00000000-0000-0000-0000-000000000674",
    "packId": "10000000-0000-0000-0000-000000000682",
    "desk": "Tesla Covered Calls",
    "seatId": "20000000-0000-0000-0000-000000001017",
    "url": "https://x.ai/bot/mpKYGkjuVEUHYI4R7Xud9",
    "seats": 1
  },
  {
    "owner": "andrewwilkinson",
    "slug": "andrew",
    "packName": "Andrew",
    "ownerName": "Andrew",
    "xHandle": "andrewwilkinson",
    "ownerId": "00000000-0000-0000-0000-000000000675",
    "packId": "10000000-0000-0000-0000-000000000683",
    "desk": "HyperGrok Desk Lead",
    "seatId": "20000000-0000-0000-0000-000000001018",
    "url": "https://x.ai/bot/3Fjt0kR65RoGjj5JNZJWp",
    "seats": 1
  },
  {
    "owner": "anubis941",
    "slug": "rich",
    "packName": "Rich",
    "ownerName": "Rich Kosinski",
    "xHandle": "anubis941",
    "ownerId": "00000000-0000-0000-0000-000000000676",
    "packId": "10000000-0000-0000-0000-000000000684",
    "desk": "Lyric Loop",
    "seatId": "20000000-0000-0000-0000-000000001019",
    "url": "https://x.ai/bot/vDbfFTnS7RZFXtYjKaTFP",
    "seats": 1
  },
  {
    "owner": "aojdevstudi0",
    "slug": "ossie",
    "packName": "Ossie",
    "ownerName": "Ossie Irondi",
    "xHandle": "aojdevstudi0",
    "ownerId": "00000000-0000-0000-0000-000000000677",
    "packId": "10000000-0000-0000-0000-000000000685",
    "desk": "pstack Coach",
    "seatId": "20000000-0000-0000-0000-000000001020",
    "url": "https://x.ai/bot/zVv7bP2kXN3H72iSUjvlM",
    "seats": 1
  },
  {
    "owner": "ayushbherwani",
    "slug": "ayush",
    "packName": "Ayush",
    "ownerName": "Ayush",
    "xHandle": "ayushbherwani",
    "ownerId": "00000000-0000-0000-0000-000000000678",
    "packId": "10000000-0000-0000-0000-000000000686",
    "desk": "Hyperliquid Copy Trader",
    "seatId": "20000000-0000-0000-0000-000000001023",
    "url": "https://x.ai/bot/FiAZQ0URQdhtTvwNECPbb",
    "seats": 1
  },
  {
    "owner": "bigbaldasian",
    "slug": "tan",
    "packName": "Tan",
    "ownerName": "Tan",
    "xHandle": "bigbaldasian",
    "ownerId": "00000000-0000-0000-0000-000000000679",
    "packId": "10000000-0000-0000-0000-000000000687",
    "desk": "Inbox Cleanup",
    "seatId": "20000000-0000-0000-0000-000000001024",
    "url": "https://x.ai/bot/Yb5t2YL0G2Y7NJMxeFV96",
    "seats": 1
  },
  {
    "owner": "biggs237",
    "slug": "jeremy",
    "packName": "Jeremy",
    "ownerName": "Jeremy",
    "xHandle": "biggs237",
    "ownerId": "00000000-0000-0000-0000-000000000680",
    "packId": "10000000-0000-0000-0000-000000000688",
    "desk": "Money Coach",
    "seatId": "20000000-0000-0000-0000-000000001025",
    "url": "https://x.ai/bot/Wa1vflqGAIwxOpAyoz5MT",
    "seats": 6
  },
  {
    "owner": "blayonx",
    "slug": "blay",
    "packName": "blay",
    "ownerName": "blay on 𝕏",
    "xHandle": "blayonx",
    "ownerId": "00000000-0000-0000-0000-000000000681",
    "packId": "10000000-0000-0000-0000-000000000689",
    "desk": "LinkedIn Outreach",
    "seatId": "20000000-0000-0000-0000-000000001031",
    "url": "https://x.ai/bot/RoPTRP7mgY41LgyiaZVA1",
    "seats": 1
  },
  {
    "owner": "buberlo",
    "slug": "konrad",
    "packName": "Konrad",
    "ownerName": "Konrad",
    "xHandle": "buberlo",
    "ownerId": "00000000-0000-0000-0000-000000000682",
    "packId": "10000000-0000-0000-0000-000000000690",
    "desk": "Free AI Credits",
    "seatId": "20000000-0000-0000-0000-000000001032",
    "url": "https://x.ai/bot/7TNynPwVUNcjn__waDa3x",
    "seats": 7
  },
  {
    "owner": "bunkeideploy",
    "slug": "bunkei",
    "packName": "bunkei",
    "ownerName": "文系のAI実験室 | YouTube",
    "xHandle": "bunkeideploy",
    "ownerId": "00000000-0000-0000-0000-000000000683",
    "packId": "10000000-0000-0000-0000-000000000691",
    "desk": "X Account Watcher",
    "seatId": "20000000-0000-0000-0000-000000001039",
    "url": "https://x.ai/bot/e7dI4aLmitFXzNqPl_Z4U",
    "seats": 1
  },
  {
    "owner": "cadena_gus",
    "slug": "gustavo",
    "packName": "Gustavo",
    "ownerName": "Gustavo Cadena",
    "xHandle": "cadena_gus",
    "ownerId": "00000000-0000-0000-0000-000000000684",
    "packId": "10000000-0000-0000-0000-000000000692",
    "desk": "Cloudflare",
    "seatId": "20000000-0000-0000-0000-000000001040",
    "url": "https://x.ai/bot/SlYlBUem89tWGyLLmN2ul",
    "seats": 3
  },
  {
    "owner": "carm1nee",
    "slug": "carm1ne",
    "packName": "Carm1ne",
    "ownerName": "Сarm1ne",
    "xHandle": "carm1nee",
    "ownerId": "00000000-0000-0000-0000-000000000685",
    "packId": "10000000-0000-0000-0000-000000000693",
    "desk": "PTJ Playbook",
    "seatId": "20000000-0000-0000-0000-000000001043",
    "url": "https://x.ai/bot/wEnNQIjLgh0PzSB8Od8ym",
    "seats": 1
  },
  {
    "owner": "chris_vandaele",
    "slug": "christopher",
    "packName": "Christopher",
    "ownerName": "Christopher Vandaele",
    "xHandle": "chris_vandaele",
    "ownerId": "00000000-0000-0000-0000-000000000686",
    "packId": "10000000-0000-0000-0000-000000000694",
    "desk": "Domain Name Broker",
    "seatId": "20000000-0000-0000-0000-000000001045",
    "url": "https://x.ai/bot/--xvPdrEZEoqwnAn_moWw",
    "seats": 1
  },
  {
    "owner": "chrisvolkernick",
    "slug": "chrisvbtc",
    "packName": "ChrisV.btc⚡",
    "ownerName": "ChrisV.btc⚡",
    "xHandle": "chrisvolkernick",
    "ownerId": "00000000-0000-0000-0000-000000000687",
    "packId": "10000000-0000-0000-0000-000000000695",
    "desk": "Alexandra",
    "seatId": "20000000-0000-0000-0000-000000001047",
    "url": "https://x.ai/bot/sLyptC4jOKlDSqUHqqvpN",
    "seats": 2
  },
  {
    "owner": "coffeengrit",
    "slug": "coffee",
    "packName": "Coffee",
    "ownerName": "Coffee and Grit",
    "xHandle": "coffeengrit",
    "ownerId": "00000000-0000-0000-0000-000000000688",
    "packId": "10000000-0000-0000-0000-000000000696",
    "desk": "Family HQ",
    "seatId": "20000000-0000-0000-0000-000000001049",
    "url": "https://x.ai/bot/kQskeKZmuyO86rKA_IzuA",
    "seats": 2
  },
  {
    "owner": "colehollander10",
    "slug": "cole",
    "packName": "Cole",
    "ownerName": "Cole Hollander",
    "xHandle": "colehollander10",
    "ownerId": "00000000-0000-0000-0000-000000000689",
    "packId": "10000000-0000-0000-0000-000000000697",
    "desk": "FF Bot",
    "seatId": "20000000-0000-0000-0000-000000001051",
    "url": "https://x.ai/bot/E273ZIwirOOdwMfeCp97t",
    "seats": 2
  },
  {
    "owner": "congressdj",
    "slug": "dj",
    "packName": "DJ",
    "ownerName": "DJ",
    "xHandle": "congressdj",
    "ownerId": "00000000-0000-0000-0000-000000000690",
    "packId": "10000000-0000-0000-0000-000000000698",
    "desk": "Bill",
    "seatId": "20000000-0000-0000-0000-000000001053",
    "url": "https://x.ai/bot/Zq7A3Opad78rsoj8eoFay",
    "seats": 2
  },
  {
    "owner": "cyberamped",
    "slug": "myron",
    "packName": "Myron",
    "ownerName": "Myron 📐⚡️",
    "xHandle": "cyberamped",
    "ownerId": "00000000-0000-0000-0000-000000000691",
    "packId": "10000000-0000-0000-0000-000000000699",
    "desk": "Chief",
    "seatId": "20000000-0000-0000-0000-000000001055",
    "url": "https://x.ai/bot/cidS9JLYj_tbCX5wu9J80",
    "seats": 1
  },
  {
    "owner": "dallinwatts",
    "slug": "dallin",
    "packName": "Dallin",
    "ownerName": "Dallin Watts",
    "xHandle": "dallinwatts",
    "ownerId": "00000000-0000-0000-0000-000000000692",
    "packId": "10000000-0000-0000-0000-000000000700",
    "desk": "Fleet Doctor",
    "seatId": "20000000-0000-0000-0000-000000001056",
    "url": "https://x.ai/bot/v4t3NW6yfGuvTB5JKHyQm",
    "seats": 1
  },
  {
    "owner": "dduongtech",
    "slug": "david",
    "packName": "David",
    "ownerName": "David Duong",
    "xHandle": "dduongtech",
    "ownerId": "00000000-0000-0000-0000-000000000693",
    "packId": "10000000-0000-0000-0000-000000000701",
    "desk": "Horton",
    "seatId": "20000000-0000-0000-0000-000000001057",
    "url": "https://x.ai/bot/Xua2g9NGk4gPDfEb4cUhQ",
    "seats": 1
  },
  {
    "owner": "dinablachman",
    "slug": "dina",
    "packName": "Dina",
    "ownerName": "dina",
    "xHandle": "dinablachman",
    "ownerId": "00000000-0000-0000-0000-000000000694",
    "packId": "10000000-0000-0000-0000-000000000702",
    "desk": "Recruiting Helper",
    "seatId": "20000000-0000-0000-0000-000000001058",
    "url": "https://x.ai/bot/PLVl8vd5OAQr45bk-kvuo",
    "seats": 4
  },
  {
    "owner": "dirtytesla",
    "slug": "dirty",
    "packName": "Dirty",
    "ownerName": "Dirty Tesla",
    "xHandle": "dirtytesla",
    "ownerId": "00000000-0000-0000-0000-000000000695",
    "packId": "10000000-0000-0000-0000-000000000703",
    "desk": "Scam Email Detector",
    "seatId": "20000000-0000-0000-0000-000000001062",
    "url": "https://x.ai/bot/E3_qOY1VUJWZMh2inUvwT",
    "seats": 1
  },
  {
    "owner": "drakonus5774",
    "slug": "scott",
    "packName": "Scott",
    "ownerName": "Scott Hill 🇺🇸😎✝️🤖☢️",
    "xHandle": "drakonus5774",
    "ownerId": "00000000-0000-0000-0000-000000000696",
    "packId": "10000000-0000-0000-0000-000000000704",
    "desk": "Med Reminder Bot",
    "seatId": "20000000-0000-0000-0000-000000001064",
    "url": "https://x.ai/bot/OG8fZ2iPR3DTVEknm94r_",
    "seats": 1
  },
  {
    "owner": "erictschroeder",
    "slug": "eric",
    "packName": "Eric",
    "ownerName": "Eric",
    "xHandle": "erictschroeder",
    "ownerId": "00000000-0000-0000-0000-000000000697",
    "packId": "10000000-0000-0000-0000-000000000705",
    "desk": "Content Engine",
    "seatId": "20000000-0000-0000-0000-000000001065",
    "url": "https://x.ai/bot/FIi-EoU-jxY5Bo7Lp_EVa",
    "seats": 1
  },
  {
    "owner": "finaldash_",
    "slug": "david",
    "packName": "David",
    "ownerName": "David Mende",
    "xHandle": "finaldash_",
    "ownerId": "00000000-0000-0000-0000-000000000698",
    "packId": "10000000-0000-0000-0000-000000000706",
    "desk": "Chief of Staff",
    "seatId": "20000000-0000-0000-0000-000000001068",
    "url": "https://x.ai/bot/oN1aIiKSCHA61bJEiycav",
    "seats": 1
  },
  {
    "owner": "guluhehe",
    "slug": "guluhehe",
    "packName": "Guluhehe",
    "ownerName": "李简AI",
    "xHandle": "guluhehe",
    "ownerId": "00000000-0000-0000-0000-000000000699",
    "packId": "10000000-0000-0000-0000-000000000707",
    "desk": "微博追踪",
    "seatId": "20000000-0000-0000-0000-000000001069",
    "url": "https://x.ai/bot/w5SXwT0WzP0Y-55u7bIWT",
    "seats": 1
  },
  {
    "owner": "gzikry",
    "slug": "george",
    "packName": "George",
    "ownerName": "George Zikry",
    "xHandle": "gzikry",
    "ownerId": "00000000-0000-0000-0000-000000000700",
    "packId": "10000000-0000-0000-0000-000000000708",
    "desk": "Camera Gear & Firmware Watch",
    "seatId": "20000000-0000-0000-0000-000000001070",
    "url": "https://x.ai/bot/QAc9K4Ysg7Vlr3ryK5tBG",
    "seats": 2
  },
  {
    "owner": "heidibriones",
    "slug": "heidi",
    "packName": "Heidi",
    "ownerName": "Heidi",
    "xHandle": "heidibriones",
    "ownerId": "00000000-0000-0000-0000-000000000701",
    "packId": "10000000-0000-0000-0000-000000000709",
    "desk": "Website Builder",
    "seatId": "20000000-0000-0000-0000-000000001072",
    "url": "https://x.ai/bot/icbDxOYQ_2Q-Ak8T7Fyo7",
    "seats": 1
  },
  {
    "owner": "hjackson2",
    "slug": "hank",
    "packName": "Hank",
    "ownerName": "Hank Jackson",
    "xHandle": "hjackson2",
    "ownerId": "00000000-0000-0000-0000-000000000702",
    "packId": "10000000-0000-0000-0000-000000000710",
    "desk": "Concierge",
    "seatId": "20000000-0000-0000-0000-000000001073",
    "url": "https://x.ai/bot/UFz5-3wRCSjxXx7OysfLQ",
    "seats": 5
  },
  {
    "owner": "iamjoshmoulton",
    "slug": "josh",
    "packName": "Josh",
    "ownerName": "Josh Moulton",
    "xHandle": "iamjoshmoulton",
    "ownerId": "00000000-0000-0000-0000-000000000703",
    "packId": "10000000-0000-0000-0000-000000000711",
    "desk": "Messenger Inbox VA",
    "seatId": "20000000-0000-0000-0000-000000001078",
    "url": "https://x.ai/bot/eGCyiAfGvnspMLamUiXDv",
    "seats": 1
  },
  {
    "owner": "iamluis_dev",
    "slug": "luis",
    "packName": "Luis",
    "ownerName": "Luis Barragan",
    "xHandle": "iamluis_dev",
    "ownerId": "00000000-0000-0000-0000-000000000704",
    "packId": "10000000-0000-0000-0000-000000000712",
    "desk": "Release Desk",
    "seatId": "20000000-0000-0000-0000-000000001079",
    "url": "https://x.ai/bot/ywPVDeM782GnBOYmsl_h0",
    "seats": 1
  },
  {
    "owner": "jadmthw",
    "slug": "jaden",
    "packName": "Jaden",
    "ownerName": "Jaden Mathew",
    "xHandle": "jadmthw",
    "ownerId": "00000000-0000-0000-0000-000000000705",
    "packId": "10000000-0000-0000-0000-000000000713",
    "desk": "Inbox",
    "seatId": "20000000-0000-0000-0000-000000001080",
    "url": "https://x.ai/bot/LMz1PBJdEFChVoW5ZsO1y",
    "seats": 1
  },
  {
    "owner": "jasonlix993",
    "slug": "xiang",
    "packName": "XIang",
    "ownerName": "Xiang Li",
    "xHandle": "jasonlix993",
    "ownerId": "00000000-0000-0000-0000-000000000706",
    "packId": "10000000-0000-0000-0000-000000000714",
    "desk": "Whisper Roast",
    "seatId": "20000000-0000-0000-0000-000000001081",
    "url": "https://x.ai/bot/UOzzEspeL4vefpe8t3jql",
    "seats": 1
  },
  {
    "owner": "jasonrogersafb",
    "slug": "jason",
    "packName": "Jason",
    "ownerName": "Jason Rogers | Mortgage Loan Officer",
    "xHandle": "jasonrogersafb",
    "ownerId": "00000000-0000-0000-0000-000000000707",
    "packId": "10000000-0000-0000-0000-000000000715",
    "desk": "VA Offer Coach",
    "seatId": "20000000-0000-0000-0000-000000001082",
    "url": "https://x.ai/bot/PqoiUm-y63jlVMRe2h_Nw",
    "seats": 2
  },
  {
    "owner": "jaydook",
    "slug": "jay",
    "packName": "Jay",
    "ownerName": "Jay Dook",
    "xHandle": "jaydook",
    "ownerId": "00000000-0000-0000-0000-000000000708",
    "packId": "10000000-0000-0000-0000-000000000716",
    "desk": "Draftkeeper",
    "seatId": "20000000-0000-0000-0000-000000001084",
    "url": "https://x.ai/bot/36TtndSnwXMKwBZznHj28",
    "seats": 1
  },
  {
    "owner": "jennaliftslife",
    "slug": "jenna",
    "packName": "Jenna",
    "ownerName": "Jenna | Lifts + Life",
    "xHandle": "jennaliftslife",
    "ownerId": "00000000-0000-0000-0000-000000000709",
    "packId": "10000000-0000-0000-0000-000000000717",
    "desk": "Habit Coach",
    "seatId": "20000000-0000-0000-0000-000000001085",
    "url": "https://x.ai/bot/wi-v_TmB07CH5-0iFeli7",
    "seats": 1
  },
  {
    "owner": "johnnyskyfox",
    "slug": "johnny",
    "packName": "Johnny",
    "ownerName": "Johnny Hill",
    "xHandle": "johnnyskyfox",
    "ownerId": "00000000-0000-0000-0000-000000000710",
    "packId": "10000000-0000-0000-0000-000000000718",
    "desk": "Catch",
    "seatId": "20000000-0000-0000-0000-000000001086",
    "url": "https://x.ai/bot/0BXizj5Ie0OhSa3XDCXMf",
    "seats": 1
  },
  {
    "owner": "jonmartinez",
    "slug": "jjz",
    "packName": "JJz",
    "ownerName": "JJz",
    "xHandle": "jonmartinez",
    "ownerId": "00000000-0000-0000-0000-000000000711",
    "packId": "10000000-0000-0000-0000-000000000719",
    "desk": "Music Bot",
    "seatId": "20000000-0000-0000-0000-000000001087",
    "url": "https://x.ai/bot/dhED2j4hHusELAG7x97aN",
    "seats": 1
  },
  {
    "owner": "joshmeyer",
    "slug": "josh",
    "packName": "Josh",
    "ownerName": "Josh Meyer",
    "xHandle": "joshmeyer",
    "ownerId": "00000000-0000-0000-0000-000000000712",
    "packId": "10000000-0000-0000-0000-000000000720",
    "desk": "Tacks",
    "seatId": "20000000-0000-0000-0000-000000001088",
    "url": "https://x.ai/bot/Y1Xy91EjTxvZkVviy_J7W",
    "seats": 1
  },
  {
    "owner": "joshwalkos",
    "slug": "josh",
    "packName": "Josh",
    "ownerName": "Josh Walkos",
    "xHandle": "joshwalkos",
    "ownerId": "00000000-0000-0000-0000-000000000713",
    "packId": "10000000-0000-0000-0000-000000000721",
    "desk": "FOIA Bot",
    "seatId": "20000000-0000-0000-0000-000000001089",
    "url": "https://x.ai/bot/QXGfmaWApn7DeZn90zEdZ",
    "seats": 1
  },
  {
    "owner": "journeydeck",
    "slug": "patrick",
    "packName": "Patrick",
    "ownerName": "JourneyDeck by Patrick",
    "xHandle": "journeydeck",
    "ownerId": "00000000-0000-0000-0000-000000000714",
    "packId": "10000000-0000-0000-0000-000000000722",
    "desk": "Job Application Bot",
    "seatId": "20000000-0000-0000-0000-000000001090",
    "url": "https://x.ai/bot/r5gMnnIQ21PIbXKFeft-O",
    "seats": 1
  },
  {
    "owner": "jvonfsdinmd",
    "slug": "john",
    "packName": "John",
    "ownerName": "John 🇺🇸",
    "xHandle": "jvonfsdinmd",
    "ownerId": "00000000-0000-0000-0000-000000000715",
    "packId": "10000000-0000-0000-0000-000000000723",
    "desk": "Sneaky Unfollowers Caught",
    "seatId": "20000000-0000-0000-0000-000000001091",
    "url": "https://x.ai/bot/2IR-ABotGZ2crO8XoFYfc",
    "seats": 1
  },
  {
    "owner": "kchau",
    "slug": "kevin",
    "packName": "Kevin",
    "ownerName": "Kevin Chau",
    "xHandle": "kchau",
    "ownerId": "00000000-0000-0000-0000-000000000716",
    "packId": "10000000-0000-0000-0000-000000000724",
    "desk": "List Escape",
    "seatId": "20000000-0000-0000-0000-000000001092",
    "url": "https://x.ai/bot/bxxZWaTJ3NhhxAuDE6XKJ",
    "seats": 1
  },
  {
    "owner": "kelvdynasty",
    "slug": "kelvin",
    "packName": "Kelvin",
    "ownerName": "Kelv Dynasty",
    "xHandle": "kelvdynasty",
    "ownerId": "00000000-0000-0000-0000-000000000717",
    "packId": "10000000-0000-0000-0000-000000000725",
    "desk": "Explainer Video Maker",
    "seatId": "20000000-0000-0000-0000-000000001093",
    "url": "https://x.ai/bot/p0_neDDDPBaB1M262gZIo",
    "seats": 1
  },
  {
    "owner": "ken_linkwell",
    "slug": "ken",
    "packName": "Ken",
    "ownerName": "Ken",
    "xHandle": "ken_linkwell",
    "ownerId": "00000000-0000-0000-0000-000000000718",
    "packId": "10000000-0000-0000-0000-000000000726",
    "desk": "Watchtower (beta)",
    "seatId": "20000000-0000-0000-0000-000000001094",
    "url": "https://x.ai/bot/wJTXth8eiaaJpayeryWEd",
    "seats": 1
  },
  {
    "owner": "kuten26",
    "slug": "kuten26",
    "packName": "Kuten26",
    "ownerName": "kuten26",
    "xHandle": "kuten26",
    "ownerId": "00000000-0000-0000-0000-000000000719",
    "packId": "10000000-0000-0000-0000-000000000727",
    "desk": "Clopen Proof",
    "seatId": "20000000-0000-0000-0000-000000001095",
    "url": "https://x.ai/bot/f731prTfSFiKjT-arnNgH",
    "seats": 1
  },
  {
    "owner": "lamps_apple",
    "slug": "apple",
    "packName": "Apple",
    "ownerName": "Apple Lamps",
    "xHandle": "lamps_apple",
    "ownerId": "00000000-0000-0000-0000-000000000720",
    "packId": "10000000-0000-0000-0000-000000000728",
    "desk": "X Desk",
    "seatId": "20000000-0000-0000-0000-000000001096",
    "url": "https://x.ai/bot/9phVXEPdP5QHD6Wpp2dxb",
    "seats": 1
  },
  {
    "owner": "latchkeylegend",
    "slug": "genxer",
    "packName": "GenXer",
    "ownerName": "GenXer",
    "xHandle": "latchkeylegend",
    "ownerId": "00000000-0000-0000-0000-000000000721",
    "packId": "10000000-0000-0000-0000-000000000729",
    "desk": "Radar",
    "seatId": "20000000-0000-0000-0000-000000001097",
    "url": "https://x.ai/bot/2cB1nlHWzI7os1zaZ3kCg",
    "seats": 2
  },
  {
    "owner": "lucasalpes",
    "slug": "lucas",
    "packName": "Lucas",
    "ownerName": "Lucas Alpes",
    "xHandle": "lucasalpes",
    "ownerId": "00000000-0000-0000-0000-000000000722",
    "packId": "10000000-0000-0000-0000-000000000730",
    "desk": "Elis by LC Labs",
    "seatId": "20000000-0000-0000-0000-000000001099",
    "url": "https://x.ai/bot/6loWNSbGUUXVTCrTo_NMR",
    "seats": 1
  },
  {
    "owner": "martinpaulweiss",
    "slug": "martin",
    "packName": "Martin",
    "ownerName": "Martin Weiss",
    "xHandle": "martinpaulweiss",
    "ownerId": "00000000-0000-0000-0000-000000000723",
    "packId": "10000000-0000-0000-0000-000000000731",
    "desk": "Learn Grok Bot",
    "seatId": "20000000-0000-0000-0000-000000001100",
    "url": "https://x.ai/bot/Zms_Ez_je0ejEvKnULY5u",
    "seats": 1
  },
  {
    "owner": "memoriesofgreen",
    "slug": "tannhuser",
    "packName": "Tannhäuser",
    "ownerName": "Tannhäuser Gate",
    "xHandle": "memoriesofgreen",
    "ownerId": "00000000-0000-0000-0000-000000000724",
    "packId": "10000000-0000-0000-0000-000000000732",
    "desk": "Eve's Memory",
    "seatId": "20000000-0000-0000-0000-000000001101",
    "url": "https://x.ai/bot/5BC0grutyv5h_Q2NWDz6U",
    "seats": 1
  },
  {
    "owner": "minheo93698092",
    "slug": "min",
    "packName": "min",
    "ownerName": "min heo",
    "xHandle": "minheo93698092",
    "ownerId": "00000000-0000-0000-0000-000000000725",
    "packId": "10000000-0000-0000-0000-000000000733",
    "desk": "장보기",
    "seatId": "20000000-0000-0000-0000-000000001102",
    "url": "https://x.ai/bot/d5ucI08cimmef2-bIUFzo",
    "seats": 1
  },
  {
    "owner": "mrellew",
    "slug": "matt",
    "packName": "Matt",
    "ownerName": "Matt Rellew",
    "xHandle": "mrellew",
    "ownerId": "00000000-0000-0000-0000-000000000726",
    "packId": "10000000-0000-0000-0000-000000000734",
    "desk": "Fretboard Sheet Builder",
    "seatId": "20000000-0000-0000-0000-000000001103",
    "url": "https://x.ai/bot/Ar32y6x01Vbmx2EkIAj5N",
    "seats": 1
  },
  {
    "owner": "napoleon__bon",
    "slug": "napoleon",
    "packName": "Napoleon",
    "ownerName": "Napoleon Bonaparte",
    "xHandle": "napoleon__bon",
    "ownerId": "00000000-0000-0000-0000-000000000727",
    "packId": "10000000-0000-0000-0000-000000000735",
    "desk": "Product Feedback Analyzer",
    "seatId": "20000000-0000-0000-0000-000000001106",
    "url": "https://x.ai/bot/6FtdBkehLy3veK1XyqXQn",
    "seats": 1
  },
  {
    "owner": "netseg_io",
    "slug": "leon",
    "packName": "Leon",
    "ownerName": "Leon Poggioli",
    "xHandle": "netseg_io",
    "ownerId": "00000000-0000-0000-0000-000000000728",
    "packId": "10000000-0000-0000-0000-000000000736",
    "desk": "X post generator",
    "seatId": "20000000-0000-0000-0000-000000001107",
    "url": "https://x.ai/bot/182OWDI636IzNxEUUnMsU",
    "seats": 1
  },
  {
    "owner": "nil0bject",
    "slug": "nil",
    "packName": "Nil",
    "ownerName": "nil0bject",
    "xHandle": "nil0bject",
    "ownerId": "00000000-0000-0000-0000-000000000729",
    "packId": "10000000-0000-0000-0000-000000000737",
    "desk": "n0stalgia",
    "seatId": "20000000-0000-0000-0000-000000001108",
    "url": "https://x.ai/bot/mkGAa1tZ2QPZ6jFQ2j2bA",
    "seats": 1
  },
  {
    "owner": "obiwontrader",
    "slug": "anatoliy",
    "packName": "Anatoliy",
    "ownerName": "Anatoliy",
    "xHandle": "obiwontrader",
    "ownerId": "00000000-0000-0000-0000-000000000730",
    "packId": "10000000-0000-0000-0000-000000000738",
    "desk": "Square Crew, Payroll & HR Helper",
    "seatId": "20000000-0000-0000-0000-000000001109",
    "url": "https://x.ai/bot/OQZaBnEMi7H_0En2qys0a",
    "seats": 1
  },
  {
    "owner": "oprydai",
    "slug": "mustafa",
    "packName": "Mustafa",
    "ownerName": "Mustafa.",
    "xHandle": "oprydai",
    "ownerId": "00000000-0000-0000-0000-000000000731",
    "packId": "10000000-0000-0000-0000-000000000739",
    "desk": "X Marketing Bot",
    "seatId": "20000000-0000-0000-0000-000000001110",
    "url": "https://x.ai/bot/Qn3J8hO5gAMc_7BVzYm-p",
    "seats": 1
  },
  {
    "owner": "rd1963",
    "slug": "russell",
    "packName": "Russell",
    "ownerName": "Russell Davidson",
    "xHandle": "rd1963",
    "ownerId": "00000000-0000-0000-0000-000000000732",
    "packId": "10000000-0000-0000-0000-000000000740",
    "desk": "Wall Calendar Builder",
    "seatId": "20000000-0000-0000-0000-000000001111",
    "url": "https://x.ai/bot/L0br5Y_lPLCUlZiWAT2MH",
    "seats": 1
  },
  {
    "owner": "realcoachmatt23",
    "slug": "matt",
    "packName": "matt",
    "ownerName": "Matt Reichenbach",
    "xHandle": "realcoachmatt23",
    "ownerId": "00000000-0000-0000-0000-000000000733",
    "packId": "10000000-0000-0000-0000-000000000741",
    "desk": "Job Hunt Bot",
    "seatId": "20000000-0000-0000-0000-000000001112",
    "url": "https://x.ai/bot/yFcyx8WyOfB38IjqetoHX",
    "seats": 1
  },
  {
    "owner": "realjohnnewburg",
    "slug": "jonathan",
    "packName": "Jonathan",
    "ownerName": "Jonathan Newburg",
    "xHandle": "realjohnnewburg",
    "ownerId": "00000000-0000-0000-0000-000000000734",
    "packId": "10000000-0000-0000-0000-000000000742",
    "desk": "Algorithm Update Tracker",
    "seatId": "20000000-0000-0000-0000-000000001113",
    "url": "https://x.ai/bot/6_6Nef0lMZgBxKHGidZzs",
    "seats": 1
  },
  {
    "owner": "rgllm",
    "slug": "rogrio",
    "packName": "Rogério",
    "ownerName": "Rogério Moreira",
    "xHandle": "rgllm",
    "ownerId": "00000000-0000-0000-0000-000000000735",
    "packId": "10000000-0000-0000-0000-000000000743",
    "desk": "Garbo",
    "seatId": "20000000-0000-0000-0000-000000001114",
    "url": "https://x.ai/bot/ijWt4lcb_vkZ6IMYnbBNI",
    "seats": 1
  },
  {
    "owner": "russini6",
    "slug": "russell",
    "packName": "Russell",
    "ownerName": "Russell Jenson",
    "xHandle": "russini6",
    "ownerId": "00000000-0000-0000-0000-000000000736",
    "packId": "10000000-0000-0000-0000-000000000744",
    "desk": "Election Bot",
    "seatId": "20000000-0000-0000-0000-000000001116",
    "url": "https://x.ai/bot/b9XqJ0vKAgzfLn9SVmQDC",
    "seats": 1
  },
  {
    "owner": "ryanfurne",
    "slug": "ryan",
    "packName": "Ryan",
    "ownerName": "Ryan Furne",
    "xHandle": "ryanfurne",
    "ownerId": "00000000-0000-0000-0000-000000000737",
    "packId": "10000000-0000-0000-0000-000000000745",
    "desk": "Coach",
    "seatId": "20000000-0000-0000-0000-000000001117",
    "url": "https://x.ai/bot/he2XcxXmWZVLyao1esDv-",
    "seats": 1
  },
  {
    "owner": "ryanrhinkle",
    "slug": "ryan",
    "packName": "Ryan",
    "ownerName": "Ryan Hinkle",
    "xHandle": "ryanrhinkle",
    "ownerId": "00000000-0000-0000-0000-000000000738",
    "packId": "10000000-0000-0000-0000-000000000746",
    "desk": "util",
    "seatId": "20000000-0000-0000-0000-000000001118",
    "url": "https://x.ai/bot/kiqs8YlHAKuTq0gK9q3Ly",
    "seats": 1
  },
  {
    "owner": "sadiesupadoge",
    "slug": "sadie",
    "packName": "Sadie",
    "ownerName": "Sadie Supa Doge",
    "xHandle": "sadiesupadoge",
    "ownerId": "00000000-0000-0000-0000-000000000739",
    "packId": "10000000-0000-0000-0000-000000000747",
    "desk": "Job Search Bot",
    "seatId": "20000000-0000-0000-0000-000000001120",
    "url": "https://x.ai/bot/RvDW_cpNiDbk1Lc33OYE6",
    "seats": 1
  },
  {
    "owner": "sayaconsole",
    "slug": "saya",
    "packName": "Saya",
    "ownerName": "Saya Console",
    "xHandle": "sayaconsole",
    "ownerId": "00000000-0000-0000-0000-000000000740",
    "packId": "10000000-0000-0000-0000-000000000748",
    "desk": "Stock Options Strategy Visualizer (Saya Console)",
    "seatId": "20000000-0000-0000-0000-000000001121",
    "url": "https://x.ai/bot/72fTf6QYBltnUuZ-OI51m",
    "seats": 1
  },
  {
    "owner": "schienwang",
    "slug": "schien",
    "packName": "Schien",
    "ownerName": "Schien Wang",
    "xHandle": "schienwang",
    "ownerId": "00000000-0000-0000-0000-000000000741",
    "packId": "10000000-0000-0000-0000-000000000749",
    "desk": "Active Memory",
    "seatId": "20000000-0000-0000-0000-000000001122",
    "url": "https://x.ai/bot/Isa_MXoJ1kFEEBLZDlHnJ",
    "seats": 2
  },
  {
    "owner": "sivunigunta",
    "slug": "satya",
    "packName": "Satya",
    "ownerName": "Satya Sivunigunta",
    "xHandle": "sivunigunta",
    "ownerId": "00000000-0000-0000-0000-000000000742",
    "packId": "10000000-0000-0000-0000-000000000750",
    "desk": "Study Buddy",
    "seatId": "20000000-0000-0000-0000-000000001124",
    "url": "https://x.ai/bot/NP2X37LvJQ8rwWBhfKiqU",
    "seats": 1
  },
  {
    "owner": "societilili",
    "slug": "societi",
    "packName": "SOCIETI",
    "ownerName": "SOCIETI LILI",
    "xHandle": "societilili",
    "ownerId": "00000000-0000-0000-0000-000000000743",
    "packId": "10000000-0000-0000-0000-000000000751",
    "desk": "Venture Compass",
    "seatId": "20000000-0000-0000-0000-000000001125",
    "url": "https://x.ai/bot/WF54VH2_GnEvhP50GtoWj",
    "seats": 1
  },
  {
    "owner": "srcaptainthrawn",
    "slug": "darryl",
    "packName": "Darryl",
    "ownerName": "Darryl Kay",
    "xHandle": "srcaptainthrawn",
    "ownerId": "00000000-0000-0000-0000-000000000744",
    "packId": "10000000-0000-0000-0000-000000000752",
    "desk": "Sam (Sales)",
    "seatId": "20000000-0000-0000-0000-000000001127",
    "url": "https://x.ai/bot/ihsZKnZJay7kLayMUfAV1",
    "seats": 1
  },
  {
    "owner": "stsola",
    "slug": "st",
    "packName": "St",
    "ownerName": "𝕾𝖙 𝕾𝖔𝖑𝖆༄",
    "xHandle": "stsola",
    "ownerId": "00000000-0000-0000-0000-000000000745",
    "packId": "10000000-0000-0000-0000-000000000753",
    "desk": "St Alpha",
    "seatId": "20000000-0000-0000-0000-000000001128",
    "url": "https://x.ai/bot/_rIzf7dYk_REL2wxNLikq",
    "seats": 1
  },
  {
    "owner": "the_contextian",
    "slug": "contextian",
    "packName": "The Contextian",
    "ownerName": "The Contextian",
    "xHandle": "the_contextian",
    "ownerId": "00000000-0000-0000-0000-000000000746",
    "packId": "10000000-0000-0000-0000-000000000754",
    "desk": "Startsy",
    "seatId": "20000000-0000-0000-0000-000000001132",
    "url": "https://x.ai/bot/UFlRrCOYg0CbaGwAzHdtO",
    "seats": 3
  },
  {
    "owner": "the_real_issah",
    "slug": "issah",
    "packName": "ISSAH",
    "ownerName": "ISSAH ABUBAKARI",
    "xHandle": "the_real_issah",
    "ownerId": "00000000-0000-0000-0000-000000000747",
    "packId": "10000000-0000-0000-0000-000000000755",
    "desk": "Scribot",
    "seatId": "20000000-0000-0000-0000-000000001135",
    "url": "https://x.ai/bot/TRPaZaxuJ2lz60P7SbQfc",
    "seats": 1
  },
  {
    "owner": "timdoes",
    "slug": "tim",
    "packName": "Tim",
    "ownerName": "TimDOES",
    "xHandle": "timdoes",
    "ownerId": "00000000-0000-0000-0000-000000000748",
    "packId": "10000000-0000-0000-0000-000000000756",
    "desk": "trimmy",
    "seatId": "20000000-0000-0000-0000-000000001138",
    "url": "https://x.ai/bot/DLSYM3q3eUsy4Si4fTPwa",
    "seats": 2
  },
  {
    "owner": "titaniumtomp",
    "slug": "tom",
    "packName": "Tom",
    "ownerName": "Tom⚡️",
    "xHandle": "titaniumtomp",
    "ownerId": "00000000-0000-0000-0000-000000000749",
    "packId": "10000000-0000-0000-0000-000000000757",
    "desk": "Panda 🐼 Weather 🌤️",
    "seatId": "20000000-0000-0000-0000-000000001140",
    "url": "https://x.ai/bot/4jHyb0PgYowhVfxkpjv5e",
    "seats": 1
  },
  {
    "owner": "tonysimons_",
    "slug": "tony",
    "packName": "Tony",
    "ownerName": "Tony Simons",
    "xHandle": "tonysimons_",
    "ownerId": "00000000-0000-0000-0000-000000000750",
    "packId": "10000000-0000-0000-0000-000000000758",
    "desk": "𝕏-Caliber",
    "seatId": "20000000-0000-0000-0000-000000001141",
    "url": "https://x.ai/bot/4sSGX1SZk5F6KdsrJwdtA",
    "seats": 1
  },
  {
    "owner": "twilightsurfers",
    "slug": "twilight",
    "packName": "Twilight",
    "ownerName": "Twilight Surfers",
    "xHandle": "twilightsurfers",
    "ownerId": "00000000-0000-0000-0000-000000000751",
    "packId": "10000000-0000-0000-0000-000000000759",
    "desk": "Midas for the Inbox",
    "seatId": "20000000-0000-0000-0000-000000001142",
    "url": "https://x.ai/bot/7JAxnSahL4mx-cWpOv1tY",
    "seats": 1
  },
  {
    "owner": "twood_trust",
    "slug": "twood",
    "packName": "Twood",
    "ownerName": "Twood",
    "xHandle": "twood_trust",
    "ownerId": "00000000-0000-0000-0000-000000000752",
    "packId": "10000000-0000-0000-0000-000000000760",
    "desk": "玄學統計大師",
    "seatId": "20000000-0000-0000-0000-000000001143",
    "url": "https://x.ai/bot/ypw0jJWI7HEuitbV1DLWB",
    "seats": 1
  },
  {
    "owner": "unclemikeyla",
    "slug": "eacc",
    "packName": "The Observer",
    "ownerName": "The Observer (e/acc)",
    "xHandle": "unclemikeyla",
    "ownerId": "00000000-0000-0000-0000-000000000753",
    "packId": "10000000-0000-0000-0000-000000000761",
    "desk": "Video Digest",
    "seatId": "20000000-0000-0000-0000-000000001144",
    "url": "https://x.ai/bot/TeJ0KcaIa_mg_H29DumJl",
    "seats": 1
  },
  {
    "owner": "w0rldwid3vib3s",
    "slug": "worldwidevibes",
    "packName": "WorldWideVibes",
    "ownerName": "WorldWideVibes",
    "xHandle": "w0rldwid3vib3s",
    "ownerId": "00000000-0000-0000-0000-000000000754",
    "packId": "10000000-0000-0000-0000-000000000762",
    "desk": "What Would Elon Do?",
    "seatId": "20000000-0000-0000-0000-000000001145",
    "url": "https://x.ai/bot/J2UPsryIUiwJ3YYeI4Gla",
    "seats": 2
  },
  {
    "owner": "wifedirtytesla",
    "slug": "wife",
    "packName": "Wife",
    "ownerName": "Wife Of Dirty Tesla",
    "xHandle": "wifedirtytesla",
    "ownerId": "00000000-0000-0000-0000-000000000755",
    "packId": "10000000-0000-0000-0000-000000000763",
    "desk": "Scam Bot",
    "seatId": "20000000-0000-0000-0000-000000001147",
    "url": "https://x.ai/bot/TK3jh27fy9qZGcxRktI16",
    "seats": 1
  },
  {
    "owner": "willconqueror23",
    "slug": "will",
    "packName": "Will",
    "ownerName": "Will not be conquered 🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "xHandle": "willconqueror23",
    "ownerId": "00000000-0000-0000-0000-000000000756",
    "packId": "10000000-0000-0000-0000-000000000764",
    "desk": "Muskepedia",
    "seatId": "20000000-0000-0000-0000-000000001149",
    "url": "https://x.ai/bot/7yAMJNlaCIGWCScYfBwVi",
    "seats": 1
  },
  {
    "owner": "yandymccutcheon",
    "slug": "andy",
    "packName": "Andy",
    "ownerName": "Andy McCutcheon",
    "xHandle": "yandymccutcheon",
    "ownerId": "00000000-0000-0000-0000-000000000757",
    "packId": "10000000-0000-0000-0000-000000000765",
    "desk": "TAO",
    "seatId": "20000000-0000-0000-0000-000000001152",
    "url": "https://x.ai/bot/aCAskvkaRv6bFIF3ZRY6a",
    "seats": 1
  },
  {
    "owner": "zhouruijin",
    "slug": "ruijin",
    "packName": "Ruijin",
    "ownerName": "Ruijin Zhou",
    "xHandle": "zhouruijin",
    "ownerId": "00000000-0000-0000-0000-000000000758",
    "packId": "10000000-0000-0000-0000-000000000766",
    "desk": "X Stock Chatter Scout",
    "seatId": "20000000-0000-0000-0000-000000001156",
    "url": "https://x.ai/bot/5DzzCf1rJdUI4i_b4dgNg",
    "seats": 1
  }
];
  for (const item of expected) {
    const pack = getFallbackPack(item.owner, item.slug);
    assert.ok(pack, item.slug);
    assert.equal(pack.id, item.packId);
    assert.equal(pack.owner.id, item.ownerId);
    assert.equal(pack.owner.githubLogin, item.owner);
    assert.equal(pack.owner.name, item.ownerName);
    assert.equal(pack.owner.xHandle, item.xHandle);
    assert.equal(pack.slug, item.slug);
    assert.equal(pack.name, item.packName);
    assert.equal(pack.official, false);
    assert.equal(pack.featured, false);
    assert.equal(pack.githubUrl, null);
    assert.ok(pack.seats.length >= item.seats);
    assert.equal(pack.seats.filter((seat) => seat.isDesk).length, 1);
    assert.equal(pack.seats[0]?.name, item.desk);
    assert.equal(pack.seats[0]?.isDesk, true);
    assert.equal(pack.seats[0]?.sortOrder, 0);
    assert.equal(pack.seats[0]?.id, item.seatId);
    assert.equal(pack.seats[0]?.grokTemplateUrl, item.url);
    assert.equal(listFallbackPacksByOwner(item.owner).length, 1);
    assert.match(seedSql, new RegExp(item.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(seedSql, new RegExp(item.packId));
    assert.match(seedSql, new RegExp(item.seatId));
  }

  const onExisting = [
  {
    "owner": "ArunasZidonis",
    "slug": "arunas",
    "path": "/ArunasZidonis/arunas",
    "oldSeats": 3,
    "newSeats": 6,
    "added": [
      {
        "name": "Label Checker",
        "id": "20000000-0000-0000-0000-000000000993",
        "url": "https://x.ai/bot/Jsc8w9oL22s5oHXryL4bq",
        "sortOrder": 3
      }
    ]
  },
  {
    "owner": "AunySillyMe",
    "slug": "auny",
    "path": "/AunySillyMe/auny",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "Lyrically",
        "id": "20000000-0000-0000-0000-000000000994",
        "url": "https://x.ai/bot/O2xM44Mc__jdhKHr57izC",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "BradShannon",
    "slug": "brad",
    "path": "/BradShannon/brad",
    "oldSeats": 3,
    "newSeats": 5,
    "added": [
      {
        "name": "Finance",
        "id": "20000000-0000-0000-0000-000000000995",
        "url": "https://x.ai/bot/-QmsSGUOmddnC9ZAm7zdR",
        "sortOrder": 3
      },
      {
        "name": "Brick Scout",
        "id": "20000000-0000-0000-0000-000000000996",
        "url": "https://x.ai/bot/RHVbp2I2y0fIkZI54fcdf",
        "sortOrder": 4
      }
    ]
  },
  {
    "owner": "CaliLumberJack",
    "slug": "calix",
    "path": "/CaliLumberJack/calix",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "Bridge Bot",
        "id": "20000000-0000-0000-0000-000000000997",
        "url": "https://x.ai/bot/ThxY2BewUlyeEsywSdz4h",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "CarolinaDill",
    "slug": "carolina",
    "path": "/CarolinaDill/carolina",
    "oldSeats": 8,
    "newSeats": 11,
    "added": [
      {
        "name": "Gmail",
        "id": "20000000-0000-0000-0000-000000000998",
        "url": "https://x.ai/bot/ApK8jWrzfQJP9LZOjNkSp",
        "sortOrder": 8
      },
      {
        "name": "YahooMail",
        "id": "20000000-0000-0000-0000-000000000999",
        "url": "https://x.ai/bot/BV8TiWwvtXEp3miBJUWaq",
        "sortOrder": 9
      },
      {
        "name": "SpanishReviewer",
        "id": "20000000-0000-0000-0000-000000001000",
        "url": "https://x.ai/bot/wFJC3guVIn2Ke-OV9_Yuy",
        "sortOrder": 10
      }
    ]
  },
  {
    "owner": "MeechYourGoals",
    "slug": "christian",
    "path": "/MeechYourGoals/christian",
    "oldSeats": 4,
    "newSeats": 5,
    "added": [
      {
        "name": "Chief Security & Compliance Officer",
        "id": "20000000-0000-0000-0000-000000001001",
        "url": "https://x.ai/bot/Yx_UBwU10fFIIEI8Q_3u6",
        "sortOrder": 4
      }
    ]
  },
  {
    "owner": "MitchTiler",
    "slug": "mitch",
    "path": "/MitchTiler/mitch",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "Contrarian",
        "id": "20000000-0000-0000-0000-000000001002",
        "url": "https://x.ai/bot/HSnT7YbUNKs-eVVyNYgg7",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "Phil_Holland",
    "slug": "phil",
    "path": "/Phil_Holland/phil",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "Coach",
        "id": "20000000-0000-0000-0000-000000001003",
        "url": "https://x.ai/bot/3zE_2sCWH3YTIyIVw8ieK",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "PrairieWatcher",
    "slug": "luke",
    "path": "/PrairieWatcher/luke",
    "oldSeats": 3,
    "newSeats": 4,
    "added": [
      {
        "name": "Selah",
        "id": "20000000-0000-0000-0000-000000001004",
        "url": "https://x.ai/bot/YWQS1tXU1OhGVsMxBt4YP",
        "sortOrder": 3
      }
    ]
  },
  {
    "owner": "RushabhShah",
    "slug": "rx",
    "path": "/RushabhShah/rx",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "Grok Bot Tutorial",
        "id": "20000000-0000-0000-0000-000000001005",
        "url": "https://x.ai/bot/9NhyNPzB842aV0eEXnfiU",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "TerpGPT",
    "slug": "terpgpt",
    "path": "/TerpGPT/terpgpt",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "Fashion Capsule",
        "id": "20000000-0000-0000-0000-000000001006",
        "url": "https://x.ai/bot/H3IO-Kh6Gkmv2JbCwTzsB",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "WaitWhat",
    "slug": "lincoln",
    "path": "/WaitWhat/lincoln",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "Tesla Ready",
        "id": "20000000-0000-0000-0000-000000001007",
        "url": "https://x.ai/bot/SUQn0WMY2zEL9cwEmd2jv",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "_lovablecurves",
    "slug": "lovable",
    "path": "/_lovablecurves/lovable",
    "oldSeats": 5,
    "newSeats": 6,
    "added": [
      {
        "name": "Creator Brand Outreach",
        "id": "20000000-0000-0000-0000-000000001009",
        "url": "https://x.ai/bot/h38W2kv34TCuHETc0uu1w",
        "sortOrder": 5
      }
    ]
  },
  {
    "owner": "allthemoney",
    "slug": "james",
    "path": "/allthemoney/james",
    "oldSeats": 1,
    "newSeats": 6,
    "added": [
      {
        "name": "Trading Bot 5.0",
        "id": "20000000-0000-0000-0000-000000001013",
        "url": "https://x.ai/bot/I5eF4l04OvQxhMHBbprFo",
        "sortOrder": 1
      },
      {
        "name": "Crypto News Desk",
        "id": "20000000-0000-0000-0000-000000001014",
        "url": "https://x.ai/bot/232LlkmcsiCpE4rakVz5n",
        "sortOrder": 2
      },
      {
        "name": "Crypto Budget & Tax Keeper 2.0",
        "id": "20000000-0000-0000-0000-000000001015",
        "url": "https://x.ai/bot/h-l5EmqmnU91tgYOPaJE5",
        "sortOrder": 3
      }
    ]
  },
  {
    "owner": "arouch_serg",
    "slug": "serg",
    "path": "/arouch_serg/serg",
    "oldSeats": 2,
    "newSeats": 4,
    "added": [
      {
        "name": "Ledger",
        "id": "20000000-0000-0000-0000-000000001021",
        "url": "https://x.ai/bot/eIicxWVI6dT6IOHrUDO8h",
        "sortOrder": 2
      },
      {
        "name": "Forge",
        "id": "20000000-0000-0000-0000-000000001022",
        "url": "https://x.ai/bot/yCYlww8kYnABlllsN7jPT",
        "sortOrder": 3
      }
    ]
  },
  {
    "owner": "cgnot996",
    "slug": "cgnot996",
    "path": "/cgnot996/cgnot996",
    "oldSeats": 3,
    "newSeats": 4,
    "added": [
      {
        "name": "微信文章捕手",
        "id": "20000000-0000-0000-0000-000000001044",
        "url": "https://x.ai/bot/J2AgMXbgmrqq2zyRt8y7g",
        "sortOrder": 3
      }
    ]
  },
  {
    "owner": "chrishadges1",
    "slug": "chris",
    "path": "/chrishadges1/chris",
    "oldSeats": 1,
    "newSeats": 3,
    "added": [
      {
        "name": "Medical Bill Fighter",
        "id": "20000000-0000-0000-0000-000000001046",
        "url": "https://x.ai/bot/vyAGsd2VgoZjCp00GiIxS",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "dkmitc",
    "slug": "dylan",
    "path": "/dkmitc/dylan",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "Chef",
        "id": "20000000-0000-0000-0000-000000001063",
        "url": "https://x.ai/bot/Rit95fVYvgO8ulGTvVpw9",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "erinnfl",
    "slug": "erinn",
    "path": "/erinnfl/erinn",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "Bookmark Kitchen",
        "id": "20000000-0000-0000-0000-000000001066",
        "url": "https://x.ai/bot/0AeRdltc-UrzK1QxRcRJN",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "ferminrp",
    "slug": "fermin",
    "path": "/ferminrp/fermin",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "SpotiBot",
        "id": "20000000-0000-0000-0000-000000001067",
        "url": "https://x.ai/bot/db0Id7fXXTQiRZIApY-8Q",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "mustafaergisi",
    "slug": "mustafa",
    "path": "/mustafaergisi/mustafa",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "PT Bot",
        "id": "20000000-0000-0000-0000-000000001104",
        "url": "https://x.ai/bot/QFanuVCMxVH0hJ4CZCMJi",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "naoufalelh",
    "slug": "nao",
    "path": "/naoufalelh/nao",
    "oldSeats": 4,
    "newSeats": 5,
    "added": [
      {
        "name": "Eric · Gift Scout",
        "id": "20000000-0000-0000-0000-000000001105",
        "url": "https://x.ai/bot/W4gNjXXfAN_S75Y-cakHM",
        "sortOrder": 4
      }
    ]
  },
  {
    "owner": "richsilver",
    "slug": "rich",
    "path": "/richsilver/rich",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "Memory Reel",
        "id": "20000000-0000-0000-0000-000000001115",
        "url": "https://x.ai/bot/l8hF6idbwPq2cthVTQLgC",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "ryanthawks",
    "slug": "ryan",
    "path": "/ryanthawks/ryan",
    "oldSeats": 7,
    "newSeats": 8,
    "added": [
      {
        "name": "Eval Keeper",
        "id": "20000000-0000-0000-0000-000000001119",
        "url": "https://x.ai/bot/7djdBPwOw9zic7W4PGoh_",
        "sortOrder": 7
      }
    ]
  },
  {
    "owner": "sravanjay",
    "slug": "sravan",
    "path": "/sravanjay/sravan",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "Knowledgemax",
        "id": "20000000-0000-0000-0000-000000001126",
        "url": "https://x.ai/bot/NN9pHzrAZOhB2WBvOyPwU",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "suddenlyjon",
    "slug": "knock",
    "path": "/suddenlyjon/knock",
    "oldSeats": 41,
    "newSeats": 43,
    "added": [
      {
        "name": "Omnipresence",
        "id": "20000000-0000-0000-0000-000000001129",
        "url": "https://x.ai/bot/HsqCRD8q_eZII9ewRNkpm",
        "sortOrder": 41
      },
      {
        "name": "IRS Bot",
        "id": "20000000-0000-0000-0000-000000001130",
        "url": "https://x.ai/bot/jwVA_1zmbZBdEHpJHfID6",
        "sortOrder": 42
      }
    ]
  },
  {
    "owner": "the_Arow_H",
    "slug": "dartagnan",
    "path": "/the_Arow_H/dartagnan",
    "oldSeats": 4,
    "newSeats": 5,
    "added": [
      {
        "name": "Nash",
        "id": "20000000-0000-0000-0000-000000001131",
        "url": "https://x.ai/bot/96mwrkqcL-8lqFvBUtejM",
        "sortOrder": 4
      }
    ]
  },
  {
    "owner": "thecsguy",
    "slug": "nick",
    "path": "/thecsguy/nick",
    "oldSeats": 2,
    "newSeats": 4,
    "added": [
      {
        "name": "Package Pal",
        "id": "20000000-0000-0000-0000-000000001136",
        "url": "https://x.ai/bot/JG4RGdYlakSid0hw1woj1",
        "sortOrder": 2
      },
      {
        "name": "Disk Doctor",
        "id": "20000000-0000-0000-0000-000000001137",
        "url": "https://x.ai/bot/EVQ-0yhShRgL-2qAfdD-8",
        "sortOrder": 3
      }
    ]
  },
  {
    "owner": "wikiwayne",
    "slug": "wayne",
    "path": "/wikiwayne/wayne",
    "oldSeats": 4,
    "newSeats": 5,
    "added": [
      {
        "name": "The Algorithm",
        "id": "20000000-0000-0000-0000-000000001148",
        "url": "https://x.ai/bot/XilHVHieQQb5Wk1Rvw1Hu",
        "sortOrder": 4
      }
    ]
  },
  {
    "owner": "xerith_darkmind",
    "slug": "xerith",
    "path": "/xerith_darkmind/xerith",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "Job Scout",
        "id": "20000000-0000-0000-0000-000000001150",
        "url": "https://x.ai/bot/jl5W3FXsJyMZwiGTbkmfQ",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "xpixeladventure",
    "slug": "xpixel",
    "path": "/xpixeladventure/xpixel",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "YouTube Documentary Finder",
        "id": "20000000-0000-0000-0000-000000001151",
        "url": "https://x.ai/bot/UbnSwX58GkikF4fkqv98Q",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "zac70182",
    "slug": "zack",
    "path": "/zac70182/zack",
    "oldSeats": 1,
    "newSeats": 4,
    "added": [
      {
        "name": "Counsel",
        "id": "20000000-0000-0000-0000-000000001153",
        "url": "https://x.ai/bot/U34kIsyRcFfI9ucS3K74F",
        "sortOrder": 1
      },
      {
        "name": "Tax Pro",
        "id": "20000000-0000-0000-0000-000000001154",
        "url": "https://x.ai/bot/4JYyLn77nDW4T06beD6zl",
        "sortOrder": 2
      },
      {
        "name": "App Checker",
        "id": "20000000-0000-0000-0000-000000001155",
        "url": "https://x.ai/bot/jmbHtZILFugYF0alMT7yI",
        "sortOrder": 3
      }
    ]
  }
];
  for (const row of onExisting) {
    const pack = getFallbackPack(row.owner, row.slug);
    assert.ok(pack, row.path);
    assert.ok(pack.seats.length >= row.newSeats);
    assert.equal(pack.seats.filter((seat) => seat.isDesk).length, 1);
    for (const added of row.added) {
      const seat = pack.seats.find((item) => item.id === added.id);
      assert.ok(seat, added.url);
      assert.equal(seat?.name, added.name);
      assert.equal(seat?.isDesk, false);
      assert.equal(seat?.sortOrder, added.sortOrder);
      assert.equal(seat?.grokTemplateUrl, added.url);
      assert.equal(seat?.repeatsWhen, null);
      assert.match(seedSql, new RegExp(added.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    }
  }

  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url) => Boolean(url));
  assert.equal(fallbackUrls.length, 1339);
  assert.equal(new Set(fallbackUrls).size, 1339);
  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  assert.equal(new Set(seedUrlMatches.filter((url) => fallbackUrls.includes(url))).size, 1339);
  assert.ok(!fallbackUrls.includes("https://x.ai/bot/l82Fnugc2EEblUuMwyeaV"));
  assert.ok(!seedSql.includes("https://x.ai/bot/l82Fnugc2EEblUuMwyeaV"));
  assert.equal(getFallbackPack("examples", "stencil"), null);
  assert.ok(!listFallbackPacks().some((pack) => pack.owner.githubLogin === "examples"));
  assert.equal(getFallbackPack("rrrkren", "eric-ren")?.owner.name !== getFallbackPack("ericzakariasson", "eric")?.owner.name, true);
  assert.equal(getFallbackPack("MitchTiler", "mitch")?.owner.githubLogin, "MitchTiler");
  assert.equal(getFallbackPack("MitchTiler", "mitch")?.owner.name, "Tyler Thompson");
  assert.equal(getFallbackPack("tylernishida", "tyler")?.owner.githubLogin, "tylernishida");
  assert.ok(getFallbackPack("suddenlyjon", "knock")?.seats.some((seat) => seat.name === "Omnipresence"));
  assert.ok(getFallbackPack("erictschroeder", "eric"));
  assert.notEqual(getFallbackPack("erictschroeder", "eric")?.owner.name, getFallbackPack("ericzakariasson", "eric")?.owner.name);
  assert.ok(!getFallbackPack("poteto", "lauren")?.seats.some((seat) => /point peddler/i.test(seat.name)));
  assert.ok(!getFallbackPack("poteto", "lauren")?.seats.some((seat) => /box inspector/i.test(seat.name)));
});


test("catalog adds Oct 15 8pm IST hunt (184 seats, 88 new packs)", () => {
  const stats = fallbackStats();
  assert.equal(stats.packs, 844);
  assert.equal(stats.seats, 1339);

  const expected = [
  {
    "owner": "0xcodila",
    "slug": "codila",
    "packName": "Codila",
    "ownerName": "codila",
    "xHandle": "0xcodila",
    "ownerId": "00000000-0000-0000-0000-000000000759",
    "packId": "10000000-0000-0000-0000-000000000767",
    "desk": "Andrej Karpathy-style",
    "seatId": "20000000-0000-0000-0000-000000001157",
    "url": "https://x.ai/bot/MxgOLBbOpSBsrnYcUulNh",
    "seats": 1
  },
  {
    "owner": "_philpl",
    "slug": "phil",
    "packName": "Phil",
    "ownerName": "phil 🫠",
    "xHandle": "_philpl",
    "ownerId": "00000000-0000-0000-0000-000000000760",
    "packId": "10000000-0000-0000-0000-000000000768",
    "desk": "Expo Builder",
    "seatId": "20000000-0000-0000-0000-000000001158",
    "url": "https://x.ai/bot/JjH-pvNlzX_wMv-YgSrb8",
    "seats": 1
  },
  {
    "owner": "all_jonah",
    "slug": "jonah",
    "packName": "Jonah",
    "ownerName": "Jonah Anthony",
    "xHandle": "all_jonah",
    "ownerId": "00000000-0000-0000-0000-000000000761",
    "packId": "10000000-0000-0000-0000-000000000769",
    "desk": "Xssistant",
    "seatId": "20000000-0000-0000-0000-000000001159",
    "url": "https://x.ai/bot/fObiyZbdETsAwYyS0nTup",
    "seats": 1
  },
  {
    "owner": "amitgandhi",
    "slug": "amit",
    "packName": "Amit",
    "ownerName": "Amit Gandhi",
    "xHandle": "amitgandhi",
    "ownerId": "00000000-0000-0000-0000-000000000762",
    "packId": "10000000-0000-0000-0000-000000000770",
    "desk": "Inbox",
    "seatId": "20000000-0000-0000-0000-000000001163",
    "url": "https://x.ai/bot/eVTdsEMUFrKpeF81qbA5J",
    "seats": 2
  },
  {
    "owner": "averyjparker",
    "slug": "avery",
    "packName": "Avery",
    "ownerName": "Avery J. Parker",
    "xHandle": "averyjparker",
    "ownerId": "00000000-0000-0000-0000-000000000763",
    "packId": "10000000-0000-0000-0000-000000000771",
    "desk": "Infra & Reliability Ops",
    "seatId": "20000000-0000-0000-0000-000000001169",
    "url": "https://x.ai/bot/PE1c8og0QiD3pRmcU2xB_",
    "seats": 2
  },
  {
    "owner": "ben_pedley",
    "slug": "ben",
    "packName": "Ben",
    "ownerName": "Ben Pedley",
    "xHandle": "ben_pedley",
    "ownerId": "00000000-0000-0000-0000-000000000764",
    "packId": "10000000-0000-0000-0000-000000000772",
    "desk": "The Director",
    "seatId": "20000000-0000-0000-0000-000000001171",
    "url": "https://x.ai/bot/yyBdZJpc8kcndrs-e5TKi",
    "seats": 1
  },
  {
    "owner": "benjammin_sol",
    "slug": "benjamin",
    "packName": "Benjamin",
    "ownerName": "Benjamin Ignacio",
    "xHandle": "benjammin_sol",
    "ownerId": "00000000-0000-0000-0000-000000000765",
    "packId": "10000000-0000-0000-0000-000000000773",
    "desk": "AI Bookkeeper & Tax Assistant (Beancount)",
    "seatId": "20000000-0000-0000-0000-000000001172",
    "url": "https://x.ai/bot/XSWze_slwQwS96bVcVN-j",
    "seats": 1
  },
  {
    "owner": "bierlingm",
    "slug": "moritz",
    "packName": "Moritz",
    "ownerName": "Moritz Bierling",
    "xHandle": "bierlingm",
    "ownerId": "00000000-0000-0000-0000-000000000766",
    "packId": "10000000-0000-0000-0000-000000000774",
    "desk": "Inbox Zero Chief of Staff",
    "seatId": "20000000-0000-0000-0000-000000001173",
    "url": "https://x.ai/bot/-hFhR6u_HxM1mlGX92HK9",
    "seats": 10
  },
  {
    "owner": "breezeeoo",
    "slug": "breezeeoo",
    "packName": "breezeeoo",
    "ownerName": "breezeeoo",
    "xHandle": "breezeeoo",
    "ownerId": "00000000-0000-0000-0000-000000000767",
    "packId": "10000000-0000-0000-0000-000000000775",
    "desk": "Shawty",
    "seatId": "20000000-0000-0000-0000-000000001195",
    "url": "https://x.ai/bot/UGpYK57Qm6BSIK8ejoiar",
    "seats": 1
  },
  {
    "owner": "brianroemmele",
    "slug": "brian",
    "packName": "Brian",
    "ownerName": "Brian Roemmele",
    "xHandle": "brianroemmele",
    "ownerId": "00000000-0000-0000-0000-000000000768",
    "packId": "10000000-0000-0000-0000-000000000776",
    "desk": "Universal Local File Inventory",
    "seatId": "20000000-0000-0000-0000-000000001196",
    "url": "https://x.ai/bot/esUBlwCDVvKUlr77LY8Rs",
    "seats": 2
  },
  {
    "owner": "c4chaos",
    "slug": "c4chaos",
    "packName": "𝕏C4Chaos𝕏",
    "ownerName": "~C4Chaos",
    "xHandle": "c4chaos",
    "ownerId": "00000000-0000-0000-0000-000000000769",
    "packId": "10000000-0000-0000-0000-000000000777",
    "desk": "SNAIL Worker",
    "seatId": "20000000-0000-0000-0000-000000001198",
    "url": "https://x.ai/bot/_ZqhiujOChsn7lcoTbdYh",
    "seats": 1
  },
  {
    "owner": "callam53",
    "slug": "callam",
    "packName": "Callam",
    "ownerName": "Callam",
    "xHandle": "callam53",
    "ownerId": "00000000-0000-0000-0000-000000000770",
    "packId": "10000000-0000-0000-0000-000000000778",
    "desk": "thrift-bot",
    "seatId": "20000000-0000-0000-0000-000000001199",
    "url": "https://x.ai/bot/0lbrUuAvdnoE4kMX-AfO1",
    "seats": 1
  },
  {
    "owner": "chansoo",
    "slug": "chansoo",
    "packName": "Chansoo",
    "ownerName": "Chansoo Byeon",
    "xHandle": "chansoo",
    "ownerId": "00000000-0000-0000-0000-000000000771",
    "packId": "10000000-0000-0000-0000-000000000779",
    "desk": "Tesla Bot",
    "seatId": "20000000-0000-0000-0000-000000001202",
    "url": "https://x.ai/bot/TP4h8GNr4hrVT5mBhQGBr",
    "seats": 1
  },
  {
    "owner": "chaoslensx",
    "slug": "chaoslensx",
    "packName": "ChaosLensX",
    "ownerName": "ChaosLensX",
    "xHandle": "chaoslensx",
    "ownerId": "00000000-0000-0000-0000-000000000772",
    "packId": "10000000-0000-0000-0000-000000000780",
    "desk": "Explainer Video bot",
    "seatId": "20000000-0000-0000-0000-000000001203",
    "url": "https://x.ai/bot/rFn9Q2pLJKFkSF4JN3Spx",
    "seats": 1
  },
  {
    "owner": "chevonphillip",
    "slug": "chevy",
    "packName": "Chevy",
    "ownerName": "Chevy Phillip",
    "xHandle": "chevonphillip",
    "ownerId": "00000000-0000-0000-0000-000000000773",
    "packId": "10000000-0000-0000-0000-000000000781",
    "desk": "Tailscale Admin",
    "seatId": "20000000-0000-0000-0000-000000001204",
    "url": "https://x.ai/bot/xoIfh7oH4feicifYOgRMg",
    "seats": 1
  },
  {
    "owner": "contenttocommas",
    "slug": "brandon",
    "packName": "Brandon",
    "ownerName": "Brandon Smithwrick 🧠 | AI + Marketing",
    "xHandle": "contenttocommas",
    "ownerId": "00000000-0000-0000-0000-000000000774",
    "packId": "10000000-0000-0000-0000-000000000782",
    "desk": "Mogul",
    "seatId": "20000000-0000-0000-0000-000000001208",
    "url": "https://x.ai/bot/IGWqGQHWgzcK5Yl7kr5B7",
    "seats": 1
  },
  {
    "owner": "cummingsrob",
    "slug": "rob",
    "packName": "Rob",
    "ownerName": "Rob Cummings",
    "xHandle": "cummingsrob",
    "ownerId": "00000000-0000-0000-0000-000000000775",
    "packId": "10000000-0000-0000-0000-000000000783",
    "desk": "Private Bot",
    "seatId": "20000000-0000-0000-0000-000000001209",
    "url": "https://x.ai/bot/iOmZRCO0xoOyeTd6Mj6Wl",
    "seats": 1
  },
  {
    "owner": "daafdaan",
    "slug": "david",
    "packName": "David",
    "ownerName": "David Notté",
    "xHandle": "daafdaan",
    "ownerId": "00000000-0000-0000-0000-000000000776",
    "packId": "10000000-0000-0000-0000-000000000784",
    "desk": "scout",
    "seatId": "20000000-0000-0000-0000-000000001210",
    "url": "https://x.ai/bot/-pSLh59tqErNj2AtsB_10",
    "seats": 1
  },
  {
    "owner": "daimenhutchison",
    "slug": "daimen",
    "packName": "Daimen",
    "ownerName": "Daimen Hutchison",
    "xHandle": "daimenhutchison",
    "ownerId": "00000000-0000-0000-0000-000000000777",
    "packId": "10000000-0000-0000-0000-000000000785",
    "desk": "Kiwi Pocket",
    "seatId": "20000000-0000-0000-0000-000000001211",
    "url": "https://x.ai/bot/TBDkrl21y6qX-wk5G107W",
    "seats": 1
  },
  {
    "owner": "danninetyseven",
    "slug": "dan",
    "packName": "Dan",
    "ownerName": "Daniel Dewhurst",
    "xHandle": "danninetyseven",
    "ownerId": "00000000-0000-0000-0000-000000000778",
    "packId": "10000000-0000-0000-0000-000000000786",
    "desk": "Bills",
    "seatId": "20000000-0000-0000-0000-000000001214",
    "url": "https://x.ai/bot/W4QR9L1qUuMaTIv61t8tl",
    "seats": 3
  },
  {
    "owner": "dannybuck",
    "slug": "danny",
    "packName": "Danny",
    "ownerName": "Danny Buck",
    "xHandle": "dannybuck",
    "ownerId": "00000000-0000-0000-0000-000000000779",
    "packId": "10000000-0000-0000-0000-000000000787",
    "desk": "Super Intelligence Bot",
    "seatId": "20000000-0000-0000-0000-000000001217",
    "url": "https://x.ai/bot/zVgZS00x5Z8LDDwsAMKl_",
    "seats": 1
  },
  {
    "owner": "darrxgh",
    "slug": "darragh",
    "packName": "Darragh",
    "ownerName": "Darragh",
    "xHandle": "darrxgh",
    "ownerId": "00000000-0000-0000-0000-000000000780",
    "packId": "10000000-0000-0000-0000-000000000788",
    "desk": "Clip Bot",
    "seatId": "20000000-0000-0000-0000-000000001218",
    "url": "https://x.ai/bot/6MmRZHFXNkFjwZZn9b3bv",
    "seats": 1
  },
  {
    "owner": "darthjml",
    "slug": "cyber",
    "packName": "Cyber",
    "ownerName": "Cyber Viking Johnny",
    "xHandle": "darthjml",
    "ownerId": "00000000-0000-0000-0000-000000000781",
    "packId": "10000000-0000-0000-0000-000000000789",
    "desk": "Job Hunter",
    "seatId": "20000000-0000-0000-0000-000000001219",
    "url": "https://x.ai/bot/6hqKLQUA0hV-arRXt5MjJ",
    "seats": 1
  },
  {
    "owner": "davidtranai",
    "slug": "david",
    "packName": "David",
    "ownerName": "David Tran",
    "xHandle": "davidtranai",
    "ownerId": "00000000-0000-0000-0000-000000000782",
    "packId": "10000000-0000-0000-0000-000000000790",
    "desk": "Lane Planner",
    "seatId": "20000000-0000-0000-0000-000000001220",
    "url": "https://x.ai/bot/QZ59mNTczWx2fi92XUbcD",
    "seats": 1
  },
  {
    "owner": "dayyanl",
    "slug": "dayyan",
    "packName": "Dayyán",
    "ownerName": "Dayton",
    "xHandle": "dayyanl",
    "ownerId": "00000000-0000-0000-0000-000000000783",
    "packId": "10000000-0000-0000-0000-000000000791",
    "desk": "Daily Local Brief",
    "seatId": "20000000-0000-0000-0000-000000001221",
    "url": "https://x.ai/bot/GWry7SgjF38fiXBApYlit",
    "seats": 2
  },
  {
    "owner": "dbcrypt0",
    "slug": "dbcrypto",
    "packName": "DBCrypto",
    "ownerName": "DBCrypto",
    "xHandle": "dbcrypt0",
    "ownerId": "00000000-0000-0000-0000-000000000784",
    "packId": "10000000-0000-0000-0000-000000000792",
    "desk": "Fleet Doctor",
    "seatId": "20000000-0000-0000-0000-000000001223",
    "url": "https://x.ai/bot/dO9rojWVgFL5kjmWYYu_y",
    "seats": 1
  },
  {
    "owner": "dcostaverage",
    "slug": "jared",
    "packName": "Jared",
    "ownerName": "Jared Machado",
    "xHandle": "dcostaverage",
    "ownerId": "00000000-0000-0000-0000-000000000785",
    "packId": "10000000-0000-0000-0000-000000000793",
    "desk": "Order Aftercare",
    "seatId": "20000000-0000-0000-0000-000000001224",
    "url": "https://x.ai/bot/p8UyBNXk45v8hpd8_gR08",
    "seats": 5
  },
  {
    "owner": "dhalgrenmarquis",
    "slug": "marquis",
    "packName": "Marquis",
    "ownerName": "Dhalgren Marquis",
    "xHandle": "dhalgrenmarquis",
    "ownerId": "00000000-0000-0000-0000-000000000786",
    "packId": "10000000-0000-0000-0000-000000000794",
    "desk": "Watch Notes",
    "seatId": "20000000-0000-0000-0000-000000001229",
    "url": "https://x.ai/bot/x3r1lzVhcU0G5vfX62Y7q",
    "seats": 1
  },
  {
    "owner": "digitaldaisyx",
    "slug": "daisy",
    "packName": "Digital",
    "ownerName": "Digital Daisy🌸",
    "xHandle": "digitaldaisyx",
    "ownerId": "00000000-0000-0000-0000-000000000787",
    "packId": "10000000-0000-0000-0000-000000000795",
    "desk": "Tax Helper",
    "seatId": "20000000-0000-0000-0000-000000001230",
    "url": "https://x.ai/bot/f0gQy2zw6_b78Ymh45aX0",
    "seats": 1
  },
  {
    "owner": "dkkkkd",
    "slug": "dhiraj",
    "packName": "Dhiraj",
    "ownerName": "Dhiraj Das (धीरज) (वन्दे मातरम् 🇮🇳)",
    "xHandle": "dkkkkd",
    "ownerId": "00000000-0000-0000-0000-000000000788",
    "packId": "10000000-0000-0000-0000-000000000796",
    "desk": "GreenBuild",
    "seatId": "20000000-0000-0000-0000-000000001232",
    "url": "https://x.ai/bot/Y4m1o1g_TWG5he7mG1ZHb",
    "seats": 1
  },
  {
    "owner": "dongerino_",
    "slug": "donger",
    "packName": "Donger",
    "ownerName": "Donger",
    "xHandle": "dongerino_",
    "ownerId": "00000000-0000-0000-0000-000000000789",
    "packId": "10000000-0000-0000-0000-000000000797",
    "desk": "Alexandria",
    "seatId": "20000000-0000-0000-0000-000000001233",
    "url": "https://x.ai/bot/mG3DUMB_d3UREDHEQFkf5",
    "seats": 2
  },
  {
    "owner": "drsarah",
    "slug": "sarah",
    "packName": "sarah",
    "ownerName": "sarahサラ",
    "xHandle": "drsarah",
    "ownerId": "00000000-0000-0000-0000-000000000790",
    "packId": "10000000-0000-0000-0000-000000000798",
    "desk": "Gift Bot",
    "seatId": "20000000-0000-0000-0000-000000001235",
    "url": "https://x.ai/bot/ZMwukO1eaUg62QTiMf2sp",
    "seats": 1
  },
  {
    "owner": "ecomchasedimond",
    "slug": "chase",
    "packName": "Chase",
    "ownerName": "Chase Dimond | Email Marketing Nerd 📧",
    "xHandle": "ecomchasedimond",
    "ownerId": "00000000-0000-0000-0000-000000000791",
    "packId": "10000000-0000-0000-0000-000000000799",
    "desk": "BFCM Email Planner",
    "seatId": "20000000-0000-0000-0000-000000001236",
    "url": "https://x.ai/bot/Uf1bydmjxYZZpgymtOzSZ",
    "seats": 1
  },
  {
    "owner": "epic_scribe",
    "slug": "meganator",
    "packName": "meganator",
    "ownerName": "The Meganator",
    "xHandle": "epic_scribe",
    "ownerId": "00000000-0000-0000-0000-000000000792",
    "packId": "10000000-0000-0000-0000-000000000800",
    "desk": "Small Business Social Media Manager",
    "seatId": "20000000-0000-0000-0000-000000001237",
    "url": "https://x.ai/bot/wDVFJmSK67btMnZBwcgic",
    "seats": 1
  },
  {
    "owner": "fakharkhan",
    "slug": "fakhar",
    "packName": "Fakhar",
    "ownerName": "Fakhar Khan",
    "xHandle": "fakharkhan",
    "ownerId": "00000000-0000-0000-0000-000000000793",
    "packId": "10000000-0000-0000-0000-000000000801",
    "desk": "Document to Action",
    "seatId": "20000000-0000-0000-0000-000000001238",
    "url": "https://x.ai/bot/Zxg0PozHb7frMrHCoDXmn",
    "seats": 1
  },
  {
    "owner": "felixleezd",
    "slug": "felix",
    "packName": "Felix",
    "ownerName": "Felix Lee",
    "xHandle": "felixleezd",
    "ownerId": "00000000-0000-0000-0000-000000000794",
    "packId": "10000000-0000-0000-0000-000000000802",
    "desk": "Mono Lisa",
    "seatId": "20000000-0000-0000-0000-000000001239",
    "url": "https://x.ai/bot/1SnvqJd1RMwYsWdwh8kYI",
    "seats": 1
  },
  {
    "owner": "finebutwhy",
    "slug": "yair",
    "packName": "Yair",
    "ownerName": "Yair",
    "xHandle": "finebutwhy",
    "ownerId": "00000000-0000-0000-0000-000000000795",
    "packId": "10000000-0000-0000-0000-000000000803",
    "desk": "Vera",
    "seatId": "20000000-0000-0000-0000-000000001241",
    "url": "https://x.ai/bot/sYQB5x1UJeST75ZUGn3nR",
    "seats": 1
  },
  {
    "owner": "friedglue",
    "slug": "josh",
    "packName": "Josh",
    "ownerName": "Joshua Hayes",
    "xHandle": "friedglue",
    "ownerId": "00000000-0000-0000-0000-000000000796",
    "packId": "10000000-0000-0000-0000-000000000804",
    "desk": "pstack Digest",
    "seatId": "20000000-0000-0000-0000-000000001242",
    "url": "https://x.ai/bot/04jz-n3trSsg4SXsF14XY",
    "seats": 1
  },
  {
    "owner": "gbmksquare",
    "slug": "bummo",
    "packName": "Bummo",
    "ownerName": "Bummo Koo",
    "xHandle": "gbmksquare",
    "ownerId": "00000000-0000-0000-0000-000000000797",
    "packId": "10000000-0000-0000-0000-000000000805",
    "desk": "테슬라 펌웨어 뉴스",
    "seatId": "20000000-0000-0000-0000-000000001243",
    "url": "https://x.ai/bot/MMBZG5FBq-pNBSjRNmciH",
    "seats": 2
  },
  {
    "owner": "groccy1",
    "slug": "luke",
    "packName": "Luke",
    "ownerName": "Luke",
    "xHandle": "groccy1",
    "ownerId": "00000000-0000-0000-0000-000000000798",
    "packId": "10000000-0000-0000-0000-000000000806",
    "desk": "Team Slack Watch",
    "seatId": "20000000-0000-0000-0000-000000001246",
    "url": "https://x.ai/bot/oDhkgG2h_8Lv1zKqlqm5T",
    "seats": 1
  },
  {
    "owner": "heavymetalship",
    "slug": "empress",
    "packName": "Empress",
    "ownerName": "Empress Heavy",
    "xHandle": "heavymetalship",
    "ownerId": "00000000-0000-0000-0000-000000000799",
    "packId": "10000000-0000-0000-0000-000000000807",
    "desk": "Playlist Converter",
    "seatId": "20000000-0000-0000-0000-000000001248",
    "url": "https://x.ai/bot/9SrJdyJ6W4WC3GOxXWRtA",
    "seats": 1
  },
  {
    "owner": "hectorir",
    "slug": "hector",
    "packName": "Hector",
    "ownerName": "Hector Alejandro 🇵🇷",
    "xHandle": "hectorir",
    "ownerId": "00000000-0000-0000-0000-000000000800",
    "packId": "10000000-0000-0000-0000-000000000808",
    "desk": "Cleo",
    "seatId": "20000000-0000-0000-0000-000000001249",
    "url": "https://x.ai/bot/HoTdd2YekB-DPaAthBkuZ",
    "seats": 1
  },
  {
    "owner": "herbonx",
    "slug": "herb",
    "packName": "Herb",
    "ownerName": "herb.mp4",
    "xHandle": "herbonx",
    "ownerId": "00000000-0000-0000-0000-000000000801",
    "packId": "10000000-0000-0000-0000-000000000809",
    "desk": "Ember",
    "seatId": "20000000-0000-0000-0000-000000001252",
    "url": "https://x.ai/bot/TB2N_wq4f0YBSa-phO6ku",
    "seats": 1
  },
  {
    "owner": "ilyafrol",
    "slug": "ilya",
    "packName": "Ilya",
    "ownerName": "Ilya",
    "xHandle": "ilyafrol",
    "ownerId": "00000000-0000-0000-0000-000000000802",
    "packId": "10000000-0000-0000-0000-000000000810",
    "desk": "Fact Check Bot",
    "seatId": "20000000-0000-0000-0000-000000001253",
    "url": "https://x.ai/bot/8RyeqTp5cgrjbzO9t2wXb",
    "seats": 1
  },
  {
    "owner": "itsnull69",
    "slug": "null",
    "packName": "Null",
    "ownerName": "Null",
    "xHandle": "itsnull69",
    "ownerId": "00000000-0000-0000-0000-000000000803",
    "packId": "10000000-0000-0000-0000-000000000811",
    "desk": "Privacy",
    "seatId": "20000000-0000-0000-0000-000000001255",
    "url": "https://x.ai/bot/RqJusziCw_I6nivbbXC3P",
    "seats": 1
  },
  {
    "owner": "jackdesignss",
    "slug": "jack",
    "packName": "Jack",
    "ownerName": "Jack",
    "xHandle": "jackdesignss",
    "ownerId": "00000000-0000-0000-0000-000000000804",
    "packId": "10000000-0000-0000-0000-000000000812",
    "desk": "Chef",
    "seatId": "20000000-0000-0000-0000-000000001256",
    "url": "https://x.ai/bot/PuMm5kYCJgtjzlIMBVkai",
    "seats": 1
  },
  {
    "owner": "jihoonhci",
    "slug": "jihoon",
    "packName": "Jihoon",
    "ownerName": "Jihoon",
    "xHandle": "jihoonhci",
    "ownerId": "00000000-0000-0000-0000-000000000805",
    "packId": "10000000-0000-0000-0000-000000000813",
    "desk": "Ambitious",
    "seatId": "20000000-0000-0000-0000-000000001259",
    "url": "https://x.ai/bot/y6tzA4pwUoQmefjiH3ZZj",
    "seats": 1
  },
  {
    "owner": "jorsisu",
    "slug": "jorge",
    "packName": "Jorge",
    "ownerName": "Jorge Galarza",
    "xHandle": "jorsisu",
    "ownerId": "00000000-0000-0000-0000-000000000806",
    "packId": "10000000-0000-0000-0000-000000000814",
    "desk": "Habito",
    "seatId": "20000000-0000-0000-0000-000000001260",
    "url": "https://x.ai/bot/NSx13j49zrCfjGRnJVQ2I",
    "seats": 1
  },
  {
    "owner": "joshuarcook",
    "slug": "jc",
    "packName": "JC",
    "ownerName": "JC - Texas Tea Man",
    "xHandle": "joshuarcook",
    "ownerId": "00000000-0000-0000-0000-000000000807",
    "packId": "10000000-0000-0000-0000-000000000815",
    "desk": "Social Ops Bot",
    "seatId": "20000000-0000-0000-0000-000000001261",
    "url": "https://x.ai/bot/A5g9s0QB5zZtaOWZPoawT",
    "seats": 1
  },
  {
    "owner": "justin19930606",
    "slug": "justin19930606",
    "packName": "哈哈雷",
    "ownerName": "哈哈雷",
    "xHandle": "justin19930606",
    "ownerId": "00000000-0000-0000-0000-000000000808",
    "packId": "10000000-0000-0000-0000-000000000816",
    "desk": "旅遊通",
    "seatId": "20000000-0000-0000-0000-000000001262",
    "url": "https://x.ai/bot/h7rMQUCiTAtGLl6ll6tFw",
    "seats": 1
  },
  {
    "owner": "jvr0x",
    "slug": "javier",
    "packName": "Javier",
    "ownerName": "Javier • priv/acc",
    "xHandle": "jvr0x",
    "ownerId": "00000000-0000-0000-0000-000000000809",
    "packId": "10000000-0000-0000-0000-000000000817",
    "desk": "RepoBeagle",
    "seatId": "20000000-0000-0000-0000-000000001263",
    "url": "https://x.ai/bot/bTuuNK785OULBheQ5rPZ-",
    "seats": 1
  },
  {
    "owner": "khanhnqc",
    "slug": "khanh",
    "packName": "Khanh",
    "ownerName": "Khanh Nguyen",
    "xHandle": "khanhnqc",
    "ownerId": "00000000-0000-0000-0000-000000000810",
    "packId": "10000000-0000-0000-0000-000000000818",
    "desk": "Builder Circle",
    "seatId": "20000000-0000-0000-0000-000000001264",
    "url": "https://x.ai/bot/SuQygIR-87wSS6D7aA5J0",
    "seats": 1
  },
  {
    "owner": "lbpetrillo",
    "slug": "luis",
    "packName": "Luis",
    "ownerName": "Luis Bryant-Petrillo",
    "xHandle": "lbpetrillo",
    "ownerId": "00000000-0000-0000-0000-000000000811",
    "packId": "10000000-0000-0000-0000-000000000819",
    "desk": "Megamind",
    "seatId": "20000000-0000-0000-0000-000000001268",
    "url": "https://x.ai/bot/ec6mm073uBuqDcvAKR9h_",
    "seats": 1
  },
  {
    "owner": "lebeaujm",
    "slug": "jm",
    "packName": "JM",
    "ownerName": "JM Lebeau",
    "xHandle": "lebeaujm",
    "ownerId": "00000000-0000-0000-0000-000000000812",
    "packId": "10000000-0000-0000-0000-000000000820",
    "desk": "Clanker Collector",
    "seatId": "20000000-0000-0000-0000-000000001269",
    "url": "https://x.ai/bot/MqdUhT_uY9SoPKKwrDyKg",
    "seats": 1
  },
  {
    "owner": "liberteacher",
    "slug": "brian",
    "packName": "Brian",
    "ownerName": "Brian",
    "xHandle": "liberteacher",
    "ownerId": "00000000-0000-0000-0000-000000000813",
    "packId": "10000000-0000-0000-0000-000000000821",
    "desk": "Trading News Bot",
    "seatId": "20000000-0000-0000-0000-000000001270",
    "url": "https://x.ai/bot/77b0h9PaDKOkq89jccutR",
    "seats": 4
  },
  {
    "owner": "look4terry",
    "slug": "terry",
    "packName": "Terry",
    "ownerName": "Terry Haynes",
    "xHandle": "look4terry",
    "ownerId": "00000000-0000-0000-0000-000000000814",
    "packId": "10000000-0000-0000-0000-000000000822",
    "desk": "EG4 Monitor",
    "seatId": "20000000-0000-0000-0000-000000001274",
    "url": "https://x.ai/bot/9rxPP70OSzuTtTaOrzeqz",
    "seats": 1
  },
  {
    "owner": "lowtimeprefrenz",
    "slug": "grease",
    "packName": "Grease",
    "ownerName": "Grease",
    "xHandle": "lowtimeprefrenz",
    "ownerId": "00000000-0000-0000-0000-000000000815",
    "packId": "10000000-0000-0000-0000-000000000823",
    "desk": "Fitness Coach",
    "seatId": "20000000-0000-0000-0000-000000001275",
    "url": "https://x.ai/bot/cA9uzca3M66V1hk6Au94p",
    "seats": 1
  },
  {
    "owner": "maarmapa",
    "slug": "maar",
    "packName": "Maar",
    "ownerName": "maarmapa.eth",
    "xHandle": "maarmapa",
    "ownerId": "00000000-0000-0000-0000-000000000816",
    "packId": "10000000-0000-0000-0000-000000000824",
    "desk": "MEL preguntas",
    "seatId": "20000000-0000-0000-0000-000000001276",
    "url": "https://x.ai/bot/YvxsAro5SITkzr5x6TsWg",
    "seats": 1
  },
  {
    "owner": "madebydia",
    "slug": "diana",
    "packName": "Diana",
    "ownerName": "Diana Park",
    "xHandle": "madebydia",
    "ownerId": "00000000-0000-0000-0000-000000000817",
    "packId": "10000000-0000-0000-0000-000000000825",
    "desk": "Signal Scout",
    "seatId": "20000000-0000-0000-0000-000000001278",
    "url": "https://x.ai/bot/O2I4tNlGxXMtGjG-NC5xC",
    "seats": 2
  },
  {
    "owner": "markmeyerbuilds",
    "slug": "mark",
    "packName": "Mark",
    "ownerName": "Mark Meyer",
    "xHandle": "markmeyerbuilds",
    "ownerId": "00000000-0000-0000-0000-000000000818",
    "packId": "10000000-0000-0000-0000-000000000826",
    "desk": "Mac Job Runner",
    "seatId": "20000000-0000-0000-0000-000000001281",
    "url": "https://x.ai/bot/7nhakUQr96anAP0mtUXV0",
    "seats": 1
  },
  {
    "owner": "michaelheckert",
    "slug": "michael",
    "packName": "Michael",
    "ownerName": "Mike Heckert",
    "xHandle": "michaelheckert",
    "ownerId": "00000000-0000-0000-0000-000000000819",
    "packId": "10000000-0000-0000-0000-000000000827",
    "desk": "Rematch",
    "seatId": "20000000-0000-0000-0000-000000001295",
    "url": "https://x.ai/bot/_abcO9nWji9H9yX1r9XGV",
    "seats": 1
  },
  {
    "owner": "michaelindev",
    "slug": "michael",
    "packName": "Michael",
    "ownerName": "MichaelInDev",
    "xHandle": "michaelindev",
    "ownerId": "00000000-0000-0000-0000-000000000820",
    "packId": "10000000-0000-0000-0000-000000000828",
    "desk": "Events",
    "seatId": "20000000-0000-0000-0000-000000001296",
    "url": "https://x.ai/bot/hJpHNyYyMkUp5y0dXrZiU",
    "seats": 1
  },
  {
    "owner": "minimalduck",
    "slug": "arash",
    "packName": "Arash",
    "ownerName": "Arash",
    "xHandle": "minimalduck",
    "ownerId": "00000000-0000-0000-0000-000000000821",
    "packId": "10000000-0000-0000-0000-000000000829",
    "desk": "Spam-Call Scrubber",
    "seatId": "20000000-0000-0000-0000-000000001297",
    "url": "https://x.ai/bot/fUj6TYhiW_cjtzWvbsFgz",
    "seats": 1
  },
  {
    "owner": "mrsilhouette",
    "slug": "silhouette",
    "packName": "MrSilhouette",
    "ownerName": "MrSilhouette",
    "xHandle": "mrsilhouette",
    "ownerId": "00000000-0000-0000-0000-000000000822",
    "packId": "10000000-0000-0000-0000-000000000830",
    "desk": "Small-Business Ops Consultant",
    "seatId": "20000000-0000-0000-0000-000000001298",
    "url": "https://x.ai/bot/FW8YwixypSC1YZD5Xqp0R",
    "seats": 1
  },
  {
    "owner": "natelorenzen",
    "slug": "nate",
    "packName": "Nate",
    "ownerName": "NΛTΞ LORΞNZΞN",
    "xHandle": "natelorenzen",
    "ownerId": "00000000-0000-0000-0000-000000000823",
    "packId": "10000000-0000-0000-0000-000000000831",
    "desk": "X ALPHA",
    "seatId": "20000000-0000-0000-0000-000000001301",
    "url": "https://x.ai/bot/EATrfsW73LbCgHF7UIWTz",
    "seats": 1
  },
  {
    "owner": "netroverthq",
    "slug": "netrovert",
    "packName": "Netrovert",
    "ownerName": "Netrovert 🦊",
    "xHandle": "netroverthq",
    "ownerId": "00000000-0000-0000-0000-000000000824",
    "packId": "10000000-0000-0000-0000-000000000832",
    "desk": "Job Seeking",
    "seatId": "20000000-0000-0000-0000-000000001302",
    "url": "https://x.ai/bot/ffCmnFXv1WnxgfgaYB9Rc",
    "seats": 1
  },
  {
    "owner": "nickrae",
    "slug": "nick",
    "packName": "Nick",
    "ownerName": "Nick",
    "xHandle": "nickrae",
    "ownerId": "00000000-0000-0000-0000-000000000825",
    "packId": "10000000-0000-0000-0000-000000000833",
    "desk": "PPL Checkride DPE",
    "seatId": "20000000-0000-0000-0000-000000001303",
    "url": "https://x.ai/bot/RzyCs1gMOvwYULk3Wsm-f",
    "seats": 1
  },
  {
    "owner": "notswizz",
    "slug": "jack",
    "packName": "Jack",
    "ownerName": "jack",
    "xHandle": "notswizz",
    "ownerId": "00000000-0000-0000-0000-000000000826",
    "packId": "10000000-0000-0000-0000-000000000834",
    "desk": "Fantasy Football GM",
    "seatId": "20000000-0000-0000-0000-000000001305",
    "url": "https://x.ai/bot/hIFPpNZzUvd7zLg9juZ_a",
    "seats": 1
  },
  {
    "owner": "ondrejposts",
    "slug": "ondrej",
    "packName": "Ondřej",
    "ownerName": "Ondrej",
    "xHandle": "ondrejposts",
    "ownerId": "00000000-0000-0000-0000-000000000827",
    "packId": "10000000-0000-0000-0000-000000000835",
    "desk": "Emergency Watch",
    "seatId": "20000000-0000-0000-0000-000000001307",
    "url": "https://x.ai/bot/Si9n5hZAER499milmvMvd",
    "seats": 1
  },
  {
    "owner": "opti_xy",
    "slug": "opti",
    "packName": "Opti",
    "ownerName": "Opti",
    "xHandle": "opti_xy",
    "ownerId": "00000000-0000-0000-0000-000000000828",
    "packId": "10000000-0000-0000-0000-000000000836",
    "desk": "Gen Z Bot",
    "seatId": "20000000-0000-0000-0000-000000001308",
    "url": "https://x.ai/bot/RyURXDgqz0Sz0zMHwtGTm",
    "seats": 1
  },
  {
    "owner": "pmcclelland",
    "slug": "paul",
    "packName": "Paul",
    "ownerName": "Paul McClelland",
    "xHandle": "pmcclelland",
    "ownerId": "00000000-0000-0000-0000-000000000829",
    "packId": "10000000-0000-0000-0000-000000000837",
    "desk": "Gale",
    "seatId": "20000000-0000-0000-0000-000000001312",
    "url": "https://x.ai/bot/ITXBFiy3DJRQOfHEh0-O7",
    "seats": 1
  },
  {
    "owner": "quijss",
    "slug": "donovan",
    "packName": "Donovan",
    "ownerName": "Donovan Quijada",
    "xHandle": "quijss",
    "ownerId": "00000000-0000-0000-0000-000000000830",
    "packId": "10000000-0000-0000-0000-000000000838",
    "desk": "Podcast Recommender from X Bookmarks",
    "seatId": "20000000-0000-0000-0000-000000001313",
    "url": "https://x.ai/bot/P-60edcD-vkizd08dh2g7",
    "seats": 1
  },
  {
    "owner": "realspqrk",
    "slug": "spqrk",
    "packName": "SPQRK",
    "ownerName": "SPQRK",
    "xHandle": "realspqrk",
    "ownerId": "00000000-0000-0000-0000-000000000831",
    "packId": "10000000-0000-0000-0000-000000000839",
    "desk": "Desk Doorbell",
    "seatId": "20000000-0000-0000-0000-000000001316",
    "url": "https://x.ai/bot/Q_-PLlmHrV1l2h3Tk1ejJ",
    "seats": 1
  },
  {
    "owner": "riaanvanderme14",
    "slug": "riaan",
    "packName": "RIAAN",
    "ownerName": "Rvdm",
    "xHandle": "riaanvanderme14",
    "ownerId": "00000000-0000-0000-0000-000000000832",
    "packId": "10000000-0000-0000-0000-000000000840",
    "desk": "Dr Grok",
    "seatId": "20000000-0000-0000-0000-000000001317",
    "url": "https://x.ai/bot/5ugiIXTxpQY7tr5j9tt6r",
    "seats": 1
  },
  {
    "owner": "rodrigouroz",
    "slug": "rodrigo",
    "packName": "Rodrigo",
    "ownerName": "Rodrigo Uroz",
    "xHandle": "rodrigouroz",
    "ownerId": "00000000-0000-0000-0000-000000000833",
    "packId": "10000000-0000-0000-0000-000000000841",
    "desk": "Wallbit",
    "seatId": "20000000-0000-0000-0000-000000001318",
    "url": "https://x.ai/bot/YKuyXcI_7iX9Ur4psTUBL",
    "seats": 1
  },
  {
    "owner": "satsnode",
    "slug": "sats",
    "packName": "sats",
    "ownerName": "SatsNode",
    "xHandle": "satsnode",
    "ownerId": "00000000-0000-0000-0000-000000000834",
    "packId": "10000000-0000-0000-0000-000000000842",
    "desk": "Egress Engineer",
    "seatId": "20000000-0000-0000-0000-000000001319",
    "url": "https://x.ai/bot/sSiZrIbYNGqtqtTmO3Btf",
    "seats": 1
  },
  {
    "owner": "spinerazor1",
    "slug": "spinerazor",
    "packName": "Spinerazor",
    "ownerName": "Spinerazor | o0🎀0o",
    "xHandle": "spinerazor1",
    "ownerId": "00000000-0000-0000-0000-000000000835",
    "packId": "10000000-0000-0000-0000-000000000843",
    "desk": "Newsletter Editor",
    "seatId": "20000000-0000-0000-0000-000000001321",
    "url": "https://x.ai/bot/FY3fh36XzhLj8G_ZPKfyN",
    "seats": 1
  },
  {
    "owner": "szavinny",
    "slug": "vinicius",
    "packName": "Vinícius",
    "ownerName": "Vinicius Pereira de Souza",
    "xHandle": "szavinny",
    "ownerId": "00000000-0000-0000-0000-000000000836",
    "packId": "10000000-0000-0000-0000-000000000844",
    "desk": "AI Credits",
    "seatId": "20000000-0000-0000-0000-000000001323",
    "url": "https://x.ai/bot/ZF5333Z2Ool2V6h3WtgUW",
    "seats": 1
  },
  {
    "owner": "taycaldwell",
    "slug": "taylor",
    "packName": "Taylor",
    "ownerName": "Taylor Caldwell",
    "xHandle": "taycaldwell",
    "ownerId": "00000000-0000-0000-0000-000000000837",
    "packId": "10000000-0000-0000-0000-000000000845",
    "desk": "Food Ordering",
    "seatId": "20000000-0000-0000-0000-000000001324",
    "url": "https://x.ai/bot/esVOjO-VVkdgvxX_kxODM",
    "seats": 1
  },
  {
    "owner": "taylorhbuilds",
    "slug": "taylor",
    "packName": "Taylor",
    "ownerName": "taylor",
    "xHandle": "taylorhbuilds",
    "ownerId": "00000000-0000-0000-0000-000000000838",
    "packId": "10000000-0000-0000-0000-000000000846",
    "desk": "Reply Radar",
    "seatId": "20000000-0000-0000-0000-000000001325",
    "url": "https://x.ai/bot/puPDbZveO1FFvjCXERZoj",
    "seats": 1
  },
  {
    "owner": "thebowlboy",
    "slug": "bowlboy",
    "packName": "Bowlboy",
    "ownerName": "Bowlboy (Jeremy)",
    "xHandle": "thebowlboy",
    "ownerId": "00000000-0000-0000-0000-000000000839",
    "packId": "10000000-0000-0000-0000-000000000847",
    "desk": "Phone Call Bot",
    "seatId": "20000000-0000-0000-0000-000000001330",
    "url": "https://x.ai/bot/5VOzTZvBuUv2bhQUqIXjj",
    "seats": 1
  },
  {
    "owner": "thephyschal",
    "slug": "chris",
    "packName": "Chris",
    "ownerName": "Chris Higgins",
    "xHandle": "thephyschal",
    "ownerId": "00000000-0000-0000-0000-000000000840",
    "packId": "10000000-0000-0000-0000-000000000848",
    "desk": "Food Run",
    "seatId": "20000000-0000-0000-0000-000000001331",
    "url": "https://x.ai/bot/Q2Vgl6zU_M2PE142tmJnI",
    "seats": 1
  },
  {
    "owner": "vikashsparxit",
    "slug": "vikash",
    "packName": "Vikash",
    "ownerName": "Vikash Sharma",
    "xHandle": "vikashsparxit",
    "ownerId": "00000000-0000-0000-0000-000000000841",
    "packId": "10000000-0000-0000-0000-000000000849",
    "desk": "Baba",
    "seatId": "20000000-0000-0000-0000-000000001332",
    "url": "https://x.ai/bot/ZMV5G-lqKqWoirt8rq8ws",
    "seats": 1
  },
  {
    "owner": "vominux",
    "slug": "nux",
    "packName": "Nux",
    "ownerName": "Nux",
    "xHandle": "vominux",
    "ownerId": "00000000-0000-0000-0000-000000000842",
    "packId": "10000000-0000-0000-0000-000000000850",
    "desk": "Homeschool Planner",
    "seatId": "20000000-0000-0000-0000-000000001333",
    "url": "https://x.ai/bot/yg8OPH2uwTu7u5Wwh9C7k",
    "seats": 1
  },
  {
    "owner": "wifibaby4u",
    "slug": "wifibaby4u",
    "packName": "wifibaby4u",
    "ownerName": "wifibaby4u",
    "xHandle": "wifibaby4u",
    "ownerId": "00000000-0000-0000-0000-000000000843",
    "packId": "10000000-0000-0000-0000-000000000851",
    "desk": "渐语",
    "seatId": "20000000-0000-0000-0000-000000001334",
    "url": "https://x.ai/bot/65H9NnbGj43kGNcv7iJRL",
    "seats": 3
  },
  {
    "owner": "wizardkq",
    "slug": "wizard",
    "packName": "Wizard",
    "ownerName": "Wizard",
    "xHandle": "wizardkq",
    "ownerId": "00000000-0000-0000-0000-000000000844",
    "packId": "10000000-0000-0000-0000-000000000852",
    "desk": "Faith General",
    "seatId": "20000000-0000-0000-0000-000000001337",
    "url": "https://x.ai/bot/s-74qExDQH7an6O5yTaPy",
    "seats": 1
  },
  {
    "owner": "yannisbuilds",
    "slug": "yannis",
    "packName": "Yannis",
    "ownerName": "Yannis",
    "xHandle": "yannisbuilds",
    "ownerId": "00000000-0000-0000-0000-000000000845",
    "packId": "10000000-0000-0000-0000-000000000853",
    "desk": "AI Repo Scout",
    "seatId": "20000000-0000-0000-0000-000000001339",
    "url": "https://x.ai/bot/U7OJP_oa9n0ygDKp2Dlex",
    "seats": 1
  },
  {
    "owner": "ziwenxu_",
    "slug": "ziwen",
    "packName": "Ziwen",
    "ownerName": "Ziwen",
    "xHandle": "ziwenxu_",
    "ownerId": "00000000-0000-0000-0000-000000000846",
    "packId": "10000000-0000-0000-0000-000000000854",
    "desk": "Growth Advisor",
    "seatId": "20000000-0000-0000-0000-000000001340",
    "url": "https://x.ai/bot/J-9TG44LFHNvJQijaW_ub",
    "seats": 1
  }
];
  for (const item of expected) {
    const pack = getFallbackPack(item.owner, item.slug);
    assert.ok(pack, item.slug);
    assert.equal(pack.id, item.packId);
    assert.equal(pack.owner.id, item.ownerId);
    assert.equal(pack.owner.githubLogin, item.owner);
    assert.equal(pack.owner.name, item.ownerName);
    assert.equal(pack.owner.xHandle, item.xHandle);
    assert.equal(pack.slug, item.slug);
    assert.equal(pack.name, item.packName);
    assert.equal(pack.official, false);
    assert.equal(pack.featured, false);
    assert.equal(pack.githubUrl, null);
    assert.ok(pack.seats.length >= item.seats);
    assert.equal(pack.seats.filter((seat) => seat.isDesk).length, 1);
    assert.equal(pack.seats[0]?.name, item.desk);
    assert.equal(pack.seats[0]?.isDesk, true);
    assert.equal(pack.seats[0]?.sortOrder, 0);
    assert.equal(pack.seats[0]?.id, item.seatId);
    assert.equal(pack.seats[0]?.grokTemplateUrl, item.url);
    assert.equal(listFallbackPacksByOwner(item.owner).length, 1);
    assert.match(seedSql, new RegExp(item.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(seedSql, new RegExp(item.packId));
    assert.match(seedSql, new RegExp(item.seatId));
  }

  const onExisting = [
  {
    "owner": "allthemoney",
    "slug": "james",
    "path": "/allthemoney/james",
    "oldSeats": 4,
    "newSeats": 6,
    "added": [
      {
        "name": "Crypto Coach 2.0",
        "id": "20000000-0000-0000-0000-000000001160",
        "url": "https://x.ai/bot/7sk1TKf3spNkOpMk7WLvU",
        "sortOrder": 4
      },
      {
        "name": "Crypto Scam Shield",
        "id": "20000000-0000-0000-0000-000000001161",
        "url": "https://x.ai/bot/yu5DTLbi2VHKOSGJdZ6zk",
        "sortOrder": 5
      }
    ]
  },
  {
    "owner": "Amervim",
    "slug": "amervim",
    "path": "/Amervim/amervim",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "Tax Firm OS",
        "id": "20000000-0000-0000-0000-000000001162",
        "url": "https://x.ai/bot/vMr8x1Lm8mpo-jKBrdxCh",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "ArunasZidonis",
    "slug": "arunas",
    "path": "/ArunasZidonis/arunas",
    "oldSeats": 4,
    "newSeats": 6,
    "added": [
      {
        "name": "Qualification Coach",
        "id": "20000000-0000-0000-0000-000000001165",
        "url": "https://x.ai/bot/ulaxnHIZLneDmUszBpoIA",
        "sortOrder": 4
      },
      {
        "name": "Exam Coach",
        "id": "20000000-0000-0000-0000-000000001166",
        "url": "https://x.ai/bot/VHerNPFs8KalH1G_u94zx",
        "sortOrder": 5
      }
    ]
  },
  {
    "owner": "ashleyschendel",
    "slug": "ashley",
    "path": "/ashleyschendel/ashley",
    "oldSeats": 1,
    "newSeats": 3,
    "added": [
      {
        "name": "Dinner Decided",
        "id": "20000000-0000-0000-0000-000000001167",
        "url": "https://x.ai/bot/ut4lZu2vLMn2mq4dzZP6G",
        "sortOrder": 1
      },
      {
        "name": "Trend Scout for X",
        "id": "20000000-0000-0000-0000-000000001168",
        "url": "https://x.ai/bot/Q6YX1p5zlhRZZjEmDYfzA",
        "sortOrder": 2
      }
    ]
  },
  {
    "owner": "biggs237",
    "slug": "jeremy",
    "path": "/biggs237/jeremy",
    "oldSeats": 6,
    "newSeats": 17,
    "added": [
      {
        "name": "Fitness Coach Pro",
        "id": "20000000-0000-0000-0000-000000001183",
        "url": "https://x.ai/bot/dDQlyGHOFnYxmE_DJ0XzK",
        "sortOrder": 6
      },
      {
        "name": "Meal Planner Pro",
        "id": "20000000-0000-0000-0000-000000001184",
        "url": "https://x.ai/bot/-p27Q3hffcw92siKdddfK",
        "sortOrder": 7
      },
      {
        "name": "PCS Ready",
        "id": "20000000-0000-0000-0000-000000001185",
        "url": "https://x.ai/bot/UbxBf2Svgb68hlDaCzsVf",
        "sortOrder": 8
      },
      {
        "name": "Job Loss Reset",
        "id": "20000000-0000-0000-0000-000000001186",
        "url": "https://x.ai/bot/rdAGLfHpnVrcBBi4T-0G9",
        "sortOrder": 9
      },
      {
        "name": "Fed Path",
        "id": "20000000-0000-0000-0000-000000001187",
        "url": "https://x.ai/bot/YSGfTXPjbAQZuzDoum3KK",
        "sortOrder": 10
      },
      {
        "name": "Unclaimed Money Finder",
        "id": "20000000-0000-0000-0000-000000001188",
        "url": "https://x.ai/bot/dP8GqGwcRv2waTtluguj6",
        "sortOrder": 11
      },
      {
        "name": "Fit & Fuel",
        "id": "20000000-0000-0000-0000-000000001189",
        "url": "https://x.ai/bot/ut-RMpK1WeJ1W29WNdmsT",
        "sortOrder": 12
      },
      {
        "name": "Money Coach",
        "id": "20000000-0000-0000-0000-000000001190",
        "url": "https://x.ai/bot/jkzfj_gAvDLT8WGMhDLuI",
        "sortOrder": 13
      },
      {
        "name": "Estate Helper",
        "id": "20000000-0000-0000-0000-000000001191",
        "url": "https://x.ai/bot/pwoUgzm6dJenHVTFVZwtl",
        "sortOrder": 14
      },
      {
        "name": "Neighborhood Digest",
        "id": "20000000-0000-0000-0000-000000001192",
        "url": "https://x.ai/bot/i7vyV8k0y2xi1GVDPmkl5",
        "sortOrder": 15
      },
      {
        "name": "Business Builder",
        "id": "20000000-0000-0000-0000-000000001193",
        "url": "https://x.ai/bot/IfXjrbqsCA2B_YG2hEzL5",
        "sortOrder": 16
      }
    ]
  },
  {
    "owner": "BradShannon",
    "slug": "brad",
    "path": "/BradShannon/brad",
    "oldSeats": 5,
    "newSeats": 6,
    "added": [
      {
        "name": "Meetup Bot",
        "id": "20000000-0000-0000-0000-000000001194",
        "url": "https://x.ai/bot/t-003szrfP5UlKnp26c0K",
        "sortOrder": 5
      }
    ]
  },
  {
    "owner": "carm1nee",
    "slug": "carm1ne",
    "path": "/carm1nee/carm1ne",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "Charlie Munger",
        "id": "20000000-0000-0000-0000-000000001200",
        "url": "https://x.ai/bot/gsMvBGnKZFIjRU4bCsLR2",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "CarolinaDill",
    "slug": "carolina",
    "path": "/CarolinaDill/carolina",
    "oldSeats": 11,
    "newSeats": 12,
    "added": [
      {
        "name": "Gemini",
        "id": "20000000-0000-0000-0000-000000001201",
        "url": "https://x.ai/bot/WfZ3x5iRCgsCJOzmdIc0n",
        "sortOrder": 11
      }
    ]
  },
  {
    "owner": "chrishadges1",
    "slug": "chris",
    "path": "/chrishadges1/chris",
    "oldSeats": 2,
    "newSeats": 3,
    "added": [
      {
        "name": "Property Tax Appeal",
        "id": "20000000-0000-0000-0000-000000001205",
        "url": "https://x.ai/bot/raHfEQQz1Wbrszn27LgNU",
        "sortOrder": 2
      }
    ]
  },
  {
    "owner": "cjblev",
    "slug": "corey",
    "path": "/cjblev/corey",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "Botcast",
        "id": "20000000-0000-0000-0000-000000001206",
        "url": "https://x.ai/bot/6OpEFsd4cJgpIKH9y3I4K",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "congressdj",
    "slug": "dj",
    "path": "/congressdj/dj",
    "oldSeats": 2,
    "newSeats": 3,
    "added": [
      {
        "name": "Arthur",
        "id": "20000000-0000-0000-0000-000000001207",
        "url": "https://x.ai/bot/0n3_NyM3Y_LZ8dbMnncmc",
        "sortOrder": 2
      }
    ]
  },
  {
    "owner": "daisuke",
    "slug": "daisuke",
    "path": "/daisuke/daisuke",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "Watch Assistant",
        "id": "20000000-0000-0000-0000-000000001212",
        "url": "https://x.ai/bot/HShNRJXkQBDIlJnwtZP1J",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "Daniel_Farinax",
    "slug": "daniel-farinax",
    "path": "/Daniel_Farinax/daniel-farinax",
    "oldSeats": 2,
    "newSeats": 3,
    "added": [
      {
        "name": "BingoBot",
        "id": "20000000-0000-0000-0000-000000001213",
        "url": "https://x.ai/bot/80KFj0QoUGsY8PI1Vi2CV",
        "sortOrder": 2
      }
    ]
  },
  {
    "owner": "dirtytesla",
    "slug": "dirty",
    "path": "/dirtytesla/dirty",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "Fine Print",
        "id": "20000000-0000-0000-0000-000000001231",
        "url": "https://x.ai/bot/Yetb1ei_7VvPfWlYqYwAM",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "finaldash_",
    "slug": "david",
    "path": "/finaldash_/david",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "Travel agent",
        "id": "20000000-0000-0000-0000-000000001240",
        "url": "https://x.ai/bot/0hD-M0m0boT7nmRKuQKOD",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "GeorgGrok",
    "slug": "georg",
    "path": "/GeorgGrok/georg",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "Weltzeit-Rechner",
        "id": "20000000-0000-0000-0000-000000001245",
        "url": "https://x.ai/bot/gDPOM4zR1g4iIu7ha0NtM",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "GrokBotRadar",
    "slug": "fan",
    "path": "/GrokBotRadar/fan",
    "oldSeats": 2,
    "newSeats": 3,
    "added": [
      {
        "name": "Lead Scout",
        "id": "20000000-0000-0000-0000-000000001247",
        "url": "https://x.ai/bot/bFY4jZu-Wwf3LNencvnzD",
        "sortOrder": 2
      }
    ]
  },
  {
    "owner": "heidibriones",
    "slug": "heidi",
    "path": "/heidibriones/heidi",
    "oldSeats": 1,
    "newSeats": 3,
    "added": [
      {
        "name": "Deal Finder",
        "id": "20000000-0000-0000-0000-000000001250",
        "url": "https://x.ai/bot/Iwo67RW41Q_QXkgQhOL09",
        "sortOrder": 1
      },
      {
        "name": "Phone Call Expert",
        "id": "20000000-0000-0000-0000-000000001251",
        "url": "https://x.ai/bot/klUNCIuB1VMh6ERrVISN5",
        "sortOrder": 2
      }
    ]
  },
  {
    "owner": "ItsMeTrueG",
    "slug": "devin",
    "path": "/ItsMeTrueG/devin",
    "oldSeats": 2,
    "newSeats": 3,
    "added": [
      {
        "name": "Dump",
        "id": "20000000-0000-0000-0000-000000001254",
        "url": "https://x.ai/bot/3_STyUFj2hVSyC5R-cQGi",
        "sortOrder": 2
      }
    ]
  },
  {
    "owner": "jasonrogersafb",
    "slug": "jason",
    "path": "/jasonrogersafb/jason",
    "oldSeats": 2,
    "newSeats": 3,
    "added": [
      {
        "name": "PCS Move Planner",
        "id": "20000000-0000-0000-0000-000000001257",
        "url": "https://x.ai/bot/tPozm7540u3Z81elSwdl0",
        "sortOrder": 2
      }
    ]
  },
  {
    "owner": "jennaliftslife",
    "slug": "jenna",
    "path": "/jennaliftslife/jenna",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "App Builder",
        "id": "20000000-0000-0000-0000-000000001258",
        "url": "https://x.ai/bot/VXROxGhxgARRuPLwrlixB",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "latchkeylegend",
    "slug": "genxer",
    "path": "/latchkeylegend/genxer",
    "oldSeats": 2,
    "newSeats": 5,
    "added": [
      {
        "name": "Damwright",
        "id": "20000000-0000-0000-0000-000000001265",
        "url": "https://x.ai/bot/u9YedcQf8xZY-wfQ_BBc0",
        "sortOrder": 2
      },
      {
        "name": "Extrude",
        "id": "20000000-0000-0000-0000-000000001266",
        "url": "https://x.ai/bot/tFWE6qR2JNDApg94FobmA",
        "sortOrder": 3
      },
      {
        "name": "Sherlock Jobs",
        "id": "20000000-0000-0000-0000-000000001267",
        "url": "https://x.ai/bot/Cps9-fNoujd6c81eHg_SJ",
        "sortOrder": 4
      }
    ]
  },
  {
    "owner": "Macro_Harder",
    "slug": "j-p",
    "path": "/Macro_Harder/j-p",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "Poteto",
        "id": "20000000-0000-0000-0000-000000001277",
        "url": "https://x.ai/bot/Jodoh3TnuH8iQhxkGqMaI",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "MarcusRamsey",
    "slug": "marcus",
    "path": "/MarcusRamsey/marcus",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "Dinner Plan",
        "id": "20000000-0000-0000-0000-000000001280",
        "url": "https://x.ai/bot/yrWT9QgctKunkUQkWeo2b",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "martinpaulweiss",
    "slug": "martin",
    "path": "/martinpaulweiss/martin",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "Grok Bot Windows PC Coach",
        "id": "20000000-0000-0000-0000-000000001282",
        "url": "https://x.ai/bot/Lq99Ae_XEKq_T_aXTQn5c",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "massimodeluisa",
    "slug": "massimo",
    "path": "/massimodeluisa/massimo",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "GBrain",
        "id": "20000000-0000-0000-0000-000000001283",
        "url": "https://x.ai/bot/ynoVbairpAPDOtdrS51Rf",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "MeechYourGoals",
    "slug": "christian",
    "path": "/MeechYourGoals/christian",
    "oldSeats": 5,
    "newSeats": 6,
    "added": [
      {
        "name": "Privacy Prince",
        "id": "20000000-0000-0000-0000-000000001284",
        "url": "https://x.ai/bot/P8_6R--AZMCWOfs085X7K",
        "sortOrder": 5
      }
    ]
  },
  {
    "owner": "MichaelGannotti",
    "slug": "mike",
    "path": "/MichaelGannotti/mike",
    "oldSeats": 3,
    "newSeats": 13,
    "added": [
      {
        "name": "Grok Studio",
        "id": "20000000-0000-0000-0000-000000001285",
        "url": "https://x.ai/bot/QXZCVsfDe4hNuHRLxkfRb",
        "sortOrder": 3
      },
      {
        "name": "Acceptance Coach",
        "id": "20000000-0000-0000-0000-000000001286",
        "url": "https://x.ai/bot/icXWlm7EPEs3khWmXVoD1",
        "sortOrder": 4
      },
      {
        "name": "Fare Hawk",
        "id": "20000000-0000-0000-0000-000000001287",
        "url": "https://x.ai/bot/tpDfMhi6UIk9Equ6jqpfu",
        "sortOrder": 5
      },
      {
        "name": "Ledger",
        "id": "20000000-0000-0000-0000-000000001288",
        "url": "https://x.ai/bot/XWuhGoPY9Ak9b-1QqQ_q0",
        "sortOrder": 6
      },
      {
        "name": "Night Owl Scout",
        "id": "20000000-0000-0000-0000-000000001289",
        "url": "https://x.ai/bot/aF1pTFYqb_cM2kTdxu60M",
        "sortOrder": 7
      },
      {
        "name": "Offer Hunter",
        "id": "20000000-0000-0000-0000-000000001290",
        "url": "https://x.ai/bot/v3KEiMUjQVaiWWBRusvX1",
        "sortOrder": 8
      },
      {
        "name": "Pantry Pilot",
        "id": "20000000-0000-0000-0000-000000001291",
        "url": "https://x.ai/bot/9cKnt1JbVEqPMaEQgcJq0",
        "sortOrder": 9
      },
      {
        "name": "Tally",
        "id": "20000000-0000-0000-0000-000000001292",
        "url": "https://x.ai/bot/H2J0Lap9NaVoHCz7uC_gv",
        "sortOrder": 10
      },
      {
        "name": "Magical Music Video Maker",
        "id": "20000000-0000-0000-0000-000000001293",
        "url": "https://x.ai/bot/I_-3solZeQXm-Pn2_C55A",
        "sortOrder": 11
      },
      {
        "name": "Healthspan Coach",
        "id": "20000000-0000-0000-0000-000000001294",
        "url": "https://x.ai/bot/3Ym82dfQRKTgV6m-ZE7dw",
        "sortOrder": 12
      }
    ]
  },
  {
    "owner": "naoufalelh",
    "slug": "nao",
    "path": "/naoufalelh/nao",
    "oldSeats": 5,
    "newSeats": 6,
    "added": [
      {
        "name": "Starlink Flights",
        "id": "20000000-0000-0000-0000-000000001299",
        "url": "https://x.ai/bot/ChRqh1qs7aS87bsjva7B9",
        "sortOrder": 5
      }
    ]
  },
  {
    "owner": "napoleon__bon",
    "slug": "napoleon",
    "path": "/napoleon__bon/napoleon",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "Documentary Filmmaker",
        "id": "20000000-0000-0000-0000-000000001300",
        "url": "https://x.ai/bot/vAy6K29DQMJJAlXbn_VmH",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "nil0bject",
    "slug": "nil",
    "path": "/nil0bject/nil",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "grokcli",
        "id": "20000000-0000-0000-0000-000000001304",
        "url": "https://x.ai/bot/0B7CBnzSyIA3aVLjMTwoF",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "old-pgmrs-will",
    "slug": "will",
    "path": "/old-pgmrs-will/will",
    "oldSeats": 2,
    "newSeats": 3,
    "added": [
      {
        "name": "MV Forge",
        "id": "20000000-0000-0000-0000-000000001306",
        "url": "https://x.ai/bot/mnZV-Y3B9Oyzhh0Yd7Ytq",
        "sortOrder": 2
      }
    ]
  },
  {
    "owner": "Ortix008",
    "slug": "xo",
    "path": "/Ortix008/xo",
    "oldSeats": 2,
    "newSeats": 4,
    "added": [
      {
        "name": "Genie",
        "id": "20000000-0000-0000-0000-000000001309",
        "url": "https://x.ai/bot/XjCU_de7y8cuw4T1YRnGD",
        "sortOrder": 2
      },
      {
        "name": "Sazón",
        "id": "20000000-0000-0000-0000-000000001310",
        "url": "https://x.ai/bot/tyRlsV6jn7_vZpeNpFy-s",
        "sortOrder": 3
      }
    ]
  },
  {
    "owner": "pjvann",
    "slug": "paul",
    "path": "/pjvann/paul",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "Am I Being Phished?",
        "id": "20000000-0000-0000-0000-000000001311",
        "url": "https://x.ai/bot/ZPBt18dahGDQ2tmr10D-T",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "QuinnWR",
    "slug": "quinn",
    "path": "/QuinnWR/quinn",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "Ink",
        "id": "20000000-0000-0000-0000-000000001314",
        "url": "https://x.ai/bot/jKCF30ndOxkjzXXdhFNzd",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "realMattAbrams",
    "slug": "matt",
    "path": "/realMattAbrams/matt",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "Collaboration Bot",
        "id": "20000000-0000-0000-0000-000000001315",
        "url": "https://x.ai/bot/SVz86tYbkiggizWQ_9vca",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "SleepyCovfefe",
    "slug": "m-a-r-k-u-s",
    "path": "/SleepyCovfefe/m-a-r-k-u-s",
    "oldSeats": 2,
    "newSeats": 3,
    "added": [
      {
        "name": "Inbox Triage",
        "id": "20000000-0000-0000-0000-000000001320",
        "url": "https://x.ai/bot/RBK79O-MXl4ZRHyuJYag6",
        "sortOrder": 2
      }
    ]
  },
  {
    "owner": "suddenlyjon",
    "slug": "knock",
    "path": "/suddenlyjon/knock",
    "oldSeats": 43,
    "newSeats": 44,
    "added": [
      {
        "name": "Pin Bot",
        "id": "20000000-0000-0000-0000-000000001322",
        "url": "https://x.ai/bot/U2it9uoAiBGz5W_Qf7h81",
        "sortOrder": 43
      }
    ]
  },
  {
    "owner": "TexasBasedGpa",
    "slug": "texas",
    "path": "/TexasBasedGpa/texas",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "Sift",
        "id": "20000000-0000-0000-0000-000000001326",
        "url": "https://x.ai/bot/PX8eADZlGTF6uPc9LyO4j",
        "sortOrder": 1
      }
    ]
  },
  {
    "owner": "the_Arow_H",
    "slug": "dartagnan",
    "path": "/the_Arow_H/dartagnan",
    "oldSeats": 5,
    "newSeats": 8,
    "added": [
      {
        "name": "Loose Ends",
        "id": "20000000-0000-0000-0000-000000001327",
        "url": "https://x.ai/bot/aY2mo4j9qPhDOIj0MAygy",
        "sortOrder": 5
      },
      {
        "name": "Crewfold",
        "id": "20000000-0000-0000-0000-000000001328",
        "url": "https://x.ai/bot/1luxc18rF9aZTqr31pET1",
        "sortOrder": 6
      },
      {
        "name": "LaneKeep",
        "id": "20000000-0000-0000-0000-000000001329",
        "url": "https://x.ai/bot/IvGrljJfOW6biGe_8eOJ0",
        "sortOrder": 7
      }
    ]
  },
  {
    "owner": "xenappblog",
    "slug": "trond",
    "path": "/xenappblog/trond",
    "oldSeats": 1,
    "newSeats": 2,
    "added": [
      {
        "name": "CSO",
        "id": "20000000-0000-0000-0000-000000001338",
        "url": "https://x.ai/bot/IryynPCY3xK65akHLcubp",
        "sortOrder": 1
      }
    ]
  }
];
  for (const row of onExisting) {
    const pack = getFallbackPack(row.owner, row.slug);
    assert.ok(pack, row.path);
    assert.equal(pack.seats.length, row.newSeats);
    assert.equal(pack.seats.filter((seat) => seat.isDesk).length, 1);
    for (const added of row.added) {
      const seat = pack.seats.find((item) => item.id === added.id);
      assert.ok(seat, added.url);
      assert.equal(seat?.name, added.name);
      assert.equal(seat?.isDesk, false);
      assert.equal(seat?.sortOrder, added.sortOrder);
      assert.equal(seat?.grokTemplateUrl, added.url);
      assert.equal(seat?.repeatsWhen, null);
      assert.match(seedSql, new RegExp(added.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    }
  }

  const fallbackUrls = listFallbackPacks()
    .flatMap((pack) => getFallbackPack(pack.owner.githubLogin, pack.slug)?.seats ?? [])
    .map((seat) => seat.grokTemplateUrl)
    .filter((url) => Boolean(url));
  assert.equal(fallbackUrls.length, 1339);
  assert.equal(new Set(fallbackUrls).size, 1339);
  const seedUrlMatches = [...seedSql.matchAll(/https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+/g)].map(
    (match) => match[0]
  );
  assert.equal(new Set(seedUrlMatches.filter((url) => fallbackUrls.includes(url))).size, 1339);
  assert.ok(!fallbackUrls.includes("https://x.ai/bot/l82Fnugc2EEblUuMwyeaV"));
  assert.ok(!seedSql.includes("https://x.ai/bot/l82Fnugc2EEblUuMwyeaV"));
  assert.equal(getFallbackPack("examples", "stencil"), null);
  assert.ok(!listFallbackPacks().some((pack) => pack.owner.githubLogin === "examples"));
  assert.equal(getFallbackPack("rrrkren", "eric-ren")?.owner.name !== getFallbackPack("ericzakariasson", "eric")?.owner.name, true);
  assert.equal(getFallbackPack("MitchTiler", "mitch")?.owner.githubLogin, "MitchTiler");
  assert.equal(getFallbackPack("MitchTiler", "mitch")?.owner.name, "Tyler Thompson");
  assert.equal(getFallbackPack("tylernishida", "tyler")?.owner.githubLogin, "tylernishida");
  const potetoSeat = getFallbackPack("Macro_Harder", "j-p")?.seats.find((seat) => seat.name === "Poteto");
  assert.ok(potetoSeat);
  assert.equal(potetoSeat?.grokTemplateUrl, "https://x.ai/bot/Jodoh3TnuH8iQhxkGqMaI");
  assert.ok(!getFallbackPack("poteto", "lauren")?.seats.some((seat) => seat.name === "Poteto"));
  assert.ok(!getFallbackPack("poteto", "lauren")?.seats.some((seat) => /point peddler/i.test(seat.name)));
  assert.ok(!getFallbackPack("poteto", "lauren")?.seats.some((seat) => /box inspector/i.test(seat.name)));
  assert.ok(getFallbackPack("suddenlyjon", "knock")?.seats.some((seat) => seat.name === "Pin Bot"));
  assert.ok(getFallbackPack("suddenlyjon", "knock")?.seats.some((seat) => seat.name === "Box Inspector"));
});
