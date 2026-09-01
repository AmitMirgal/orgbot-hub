import assert from "node:assert/strict";
import { test } from "node:test";
import { looksLikeSecret, parseGrokTemplateUrl } from "./grok-url.ts";

test("accepts official x.ai bot URLs", () => {
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/93gOz3op1UQdBdbekQFLK"),
    "https://x.ai/bot/93gOz3op1UQdBdbekQFLK"
  );
  assert.equal(
    parseGrokTemplateUrl("https://www.x.ai/bot/s/PFD95widaEeqjkYLLUZmD/"),
    "https://x.ai/bot/s/PFD95widaEeqjkYLLUZmD"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/fcJJMM58AdXSTBdW3xWyW"),
    "https://x.ai/bot/fcJJMM58AdXSTBdW3xWyW"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/ph5mcXqVy2p176Br7BJYi"),
    "https://x.ai/bot/ph5mcXqVy2p176Br7BJYi"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/FU-Ev6_Ju4lFGWwWRD0GD"),
    "https://x.ai/bot/FU-Ev6_Ju4lFGWwWRD0GD"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/o4gWkNGmffEaVtOhaEsA7"),
    "https://x.ai/bot/o4gWkNGmffEaVtOhaEsA7"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/9dtfHw4LHmwc5uBC-a9vj"),
    "https://x.ai/bot/9dtfHw4LHmwc5uBC-a9vj"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/mqVPHm0oB3WPsnxbU1qB9"),
    "https://x.ai/bot/mqVPHm0oB3WPsnxbU1qB9"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/pNLwpHs8rmtMzAkUi-Zu2"),
    "https://x.ai/bot/pNLwpHs8rmtMzAkUi-Zu2"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/cGcG0msqfz7o7J3QMLhbE"),
    "https://x.ai/bot/cGcG0msqfz7o7J3QMLhbE"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/OR72i4SNc0_F1IzbCfg-D"),
    "https://x.ai/bot/OR72i4SNc0_F1IzbCfg-D"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/VMwfgQlHkYfFkbPYDWzAA"),
    "https://x.ai/bot/VMwfgQlHkYfFkbPYDWzAA"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/JeFTvcDX-7QT2evKGIb52"),
    "https://x.ai/bot/JeFTvcDX-7QT2evKGIb52"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/uFRK1GoAsiopBLPY19QCe"),
    "https://x.ai/bot/uFRK1GoAsiopBLPY19QCe"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/N0J32FbnVRuetJi1oJggh"),
    "https://x.ai/bot/N0J32FbnVRuetJi1oJggh"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/vekulzIMXM8hDjkp-mDkX"),
    "https://x.ai/bot/vekulzIMXM8hDjkp-mDkX"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/oSvAMKX_ahD56ZmgwtRys"),
    "https://x.ai/bot/oSvAMKX_ahD56ZmgwtRys"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/JZAccYtlRFvDSU2CnMnkZ"),
    "https://x.ai/bot/JZAccYtlRFvDSU2CnMnkZ"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/Ja9NzNTRz2ozzQLNfrJwI"),
    "https://x.ai/bot/Ja9NzNTRz2ozzQLNfrJwI"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/lFDR77qKaT3Iglzv9pUac"),
    "https://x.ai/bot/lFDR77qKaT3Iglzv9pUac"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/suKVjDAR-hSr_PTBxgdRw"),
    "https://x.ai/bot/suKVjDAR-hSr_PTBxgdRw"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/BsExflSUXpW0hs21OTBzu"),
    "https://x.ai/bot/BsExflSUXpW0hs21OTBzu"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/HtClSXO_AmiQoyYH9aXV9"),
    "https://x.ai/bot/HtClSXO_AmiQoyYH9aXV9"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/eiVFbd0nIdH2gzSwHOs0D"),
    "https://x.ai/bot/eiVFbd0nIdH2gzSwHOs0D"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/c4fYduVVic2YtbcjXquD0"),
    "https://x.ai/bot/c4fYduVVic2YtbcjXquD0"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/IciOb-9jMtlkc1RJj6MQe"),
    "https://x.ai/bot/IciOb-9jMtlkc1RJj6MQe"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/RuCu3IpKAvrx00H0MDI0t"),
    "https://x.ai/bot/RuCu3IpKAvrx00H0MDI0t"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/2PSNlIROOJPj9qZlfRy0w"),
    "https://x.ai/bot/2PSNlIROOJPj9qZlfRy0w"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/Nx4wpKeM_NYx577xlJFMD"),
    "https://x.ai/bot/Nx4wpKeM_NYx577xlJFMD"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/SwTxLoOaIwDqTSvhTIhrK"),
    "https://x.ai/bot/SwTxLoOaIwDqTSvhTIhrK"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/NU02qQ9iahZtAM0i0x1KT"),
    "https://x.ai/bot/NU02qQ9iahZtAM0i0x1KT"
  );
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/eydijdzrfgtnmlnUyPSI-"),
    "https://x.ai/bot/eydijdzrfgtnmlnUyPSI-"
  );
});

test("strips username suffixes from official bot URLs", () => {
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/N0J32FbnVRuetJi1oJggh/talsiach"),
    "https://x.ai/bot/N0J32FbnVRuetJi1oJggh"
  );
});

test("rejects unofficial or unsafe install targets", () => {
  assert.equal(parseGrokTemplateUrl("http://x.ai/bot/93gOz3op1UQdBdbekQFLK"), null);
  assert.equal(parseGrokTemplateUrl("https://grokbot.dev/bot/93gOz3op1UQdBdbekQFLK"), null);
  assert.equal(parseGrokTemplateUrl("https://x.ai/marketplace/foo"), null);
  assert.equal(parseGrokTemplateUrl("https://x.ai/bot/93gOz3op1UQdBdbekQFLK?key=1"), null);
  assert.equal(parseGrokTemplateUrl("https://user:pass@x.ai/bot/93gOz3op1UQdBdbekQFLK"), null);
  assert.equal(parseGrokTemplateUrl("https://127.0.0.1/bot/93gOz3op1UQdBdbekQFLK"), null);
});

test("rejects secret-shaped strings", () => {
  assert.equal(looksLikeSecret("sk-live-secret"), true);
  assert.equal(
    parseGrokTemplateUrl("https://x.ai/bot/93gOz3op1UQdBdbekQFLK#api_key=1"),
    null
  );
});
