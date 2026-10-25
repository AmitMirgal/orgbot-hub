import { listStartHereCards } from "@/lib/start-here";

const USER_AGENT =
  "orgbots-start-here-link-check/1.0 (+https://github.com/orgbots/orgbot-hub)";

type LinkReport = {
  persona: string;
  botName: string;
  byline: string;
  url: string;
  status: number | "fetch_error";
  bylineFound: boolean;
  error?: string;
};

function reportOnly(message: string): void {
  console.log(message);
}

async function checkCard(input: {
  persona: string;
  botName: string;
  byline: string;
  url: string;
}): Promise<LinkReport> {
  try {
    const response = await fetch(input.url, {
      redirect: "follow",
      headers: { "user-agent": USER_AGENT, accept: "text/html,application/xhtml+xml" },
    });
    const body = await response.text();
    const haystack = body.toLowerCase();
    return {
      persona: input.persona,
      botName: input.botName,
      byline: input.byline,
      url: input.url,
      status: response.status,
      bylineFound: haystack.includes(input.byline.toLowerCase()),
    };
  } catch (error) {
    return {
      persona: input.persona,
      botName: input.botName,
      byline: input.byline,
      url: input.url,
      status: "fetch_error",
      bylineFound: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function main(): Promise<void> {
  const cards = listStartHereCards();
  reportOnly(`Start Here link re-check: ${cards.length} official x.ai URLs`);
  const reports = [];
  for (const { persona, card } of cards) {
    const report = await checkCard({
      persona: persona.slug,
      botName: card.botName,
      byline: card.byline,
      url: card.grokTemplateUrl,
    });
    reports.push(report);
    const ok = report.status === 200 && report.bylineFound;
    reportOnly(
      `${ok ? "ok" : "DRIFT"} ${report.persona} ${report.botName} by ${report.byline} ${report.url} status=${report.status} byline=${report.bylineFound ? "unchanged" : "missing"}`
    );
    if (report.error) reportOnly(`  ${report.error}`);
  }

  const failed = reports.filter((report) => report.status !== 200 || !report.bylineFound);
  if (failed.length === 0) {
    reportOnly("All Start Here x.ai URLs returned 200 and still show their by-line.");
    return;
  }

  reportOnly("Start Here link drift (report only; this script never edits the catalog):");
  for (const report of failed) {
    if (report.status !== 200) {
      reportOnly(`- ${report.url} is not 200 (got ${report.status})`);
    }
    if (!report.bylineFound) {
      reportOnly(`- ${report.url} no longer shows by-line "${report.byline}"`);
    }
  }
  process.exitCode = 1;
}

await main();
