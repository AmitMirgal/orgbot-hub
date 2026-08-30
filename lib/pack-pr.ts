export type PackFileDraft = {
  owner: string;
  slug: string;
  name: string;
  description: string;
  githubUrl: string | null;
  official: false;
  featured: false;
  seats: Array<{
    name: string;
    job: string;
    isDesk: boolean;
    grokTemplateUrl: string;
  }>;
};

const REPO = "AmitMirgal/orgbot-hub";
const BASE = "main";

export type OpenPrResult =
  | { kind: "opened"; url: string; branch: string }
  | { kind: "paste"; json: string; reason: "missing_token" | "github_error"; detail: string };

function branchName(draft: PackFileDraft): string {
  return `pack/${draft.owner}-${draft.slug}`;
}

function filePath(draft: PackFileDraft): string {
  return `catalog/packs/${draft.owner}/${draft.slug}.json`;
}

function prBody(draft: PackFileDraft): string {
  const urls = draft.seats.map((seat) => `- ${seat.name}: ${seat.grokTemplateUrl}`).join("\n");
  return [
    `Add pack ${draft.owner}/${draft.slug}.`,
    "",
    "Official URLs:",
    urls,
    "",
    "Amit must merge. Origin sync is separate. Do not treat GitHub merge as Origin main.",
  ].join("\n");
}

async function github(
  token: string,
  path: string,
  init?: RequestInit
): Promise<Response> {
  return fetch(`https://api.github.com/repos/${REPO}${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "orgbots-directory",
      ...init?.headers,
    },
  });
}

export function packFileJson(draft: PackFileDraft): string {
  return `${JSON.stringify(draft, null, 2)}\n`;
}

export async function openPackPr(draft: PackFileDraft): Promise<OpenPrResult> {
  const json = packFileJson(draft);
  const token = process.env.ORGBOTS_GITHUB_TOKEN?.trim();
  if (!token) {
    return {
      kind: "paste",
      json,
      reason: "missing_token",
      detail: "ORGBOTS_GITHUB_TOKEN is missing. Paste this JSON into a PR yourself.",
    };
  }

  const branch = branchName(draft);
  const path = filePath(draft);

  try {
    const mainRef = await github(token, `/git/ref/heads/${BASE}`);
    if (!mainRef.ok) {
      return {
        kind: "paste",
        json,
        reason: "github_error",
        detail: `Could not read ${BASE}: ${mainRef.status}`,
      };
    }
    const main = (await mainRef.json()) as { object?: { sha?: string } };
    const sha = main.object?.sha;
    if (!sha) {
      return { kind: "paste", json, reason: "github_error", detail: "Main SHA missing." };
    }

    const existing = await github(token, `/git/ref/heads/${branch}`);
    if (existing.status === 404) {
      const created = await github(token, "/git/refs", {
        method: "POST",
        body: JSON.stringify({ ref: `refs/heads/${branch}`, sha }),
      });
      if (!created.ok) {
        return {
          kind: "paste",
          json,
          reason: "github_error",
          detail: `Could not create branch ${branch}: ${created.status}`,
        };
      }
    } else if (!existing.ok) {
      return {
        kind: "paste",
        json,
        reason: "github_error",
        detail: `Could not check branch ${branch}: ${existing.status}`,
      };
    }

    const current = await github(token, `/contents/${path}?ref=${branch}`);
    const currentMeta = current.ok
      ? ((await current.json()) as { sha?: string })
      : {};

    const encoded = Buffer.from(json, "utf8").toString("base64");
    const written = await github(token, `/contents/${path}`, {
      method: "PUT",
      body: JSON.stringify({
        message: `Add pack ${draft.owner}/${draft.slug}`,
        content: encoded,
        branch,
        ...(currentMeta.sha ? { sha: currentMeta.sha } : {}),
      }),
    });
    if (!written.ok) {
      return {
        kind: "paste",
        json,
        reason: "github_error",
        detail: `Could not write ${path}: ${written.status}`,
      };
    }

    const pulls = await github(
      token,
      `/pulls?head=AmitMirgal:${branch}&base=${BASE}&state=open`
    );
    if (pulls.ok) {
      const open = (await pulls.json()) as Array<{ html_url?: string }>;
      if (open[0]?.html_url) {
        return { kind: "opened", url: open[0].html_url, branch };
      }
    }

    const createdPr = await github(token, "/pulls", {
      method: "POST",
      body: JSON.stringify({
        title: `Add pack ${draft.owner}/${draft.slug}`,
        head: branch,
        base: BASE,
        body: prBody(draft),
        draft: false,
      }),
    });
    if (!createdPr.ok) {
      return {
        kind: "paste",
        json,
        reason: "github_error",
        detail: `Could not open PR: ${createdPr.status}`,
      };
    }
    const pr = (await createdPr.json()) as { html_url?: string };
    if (!pr.html_url) {
      return { kind: "paste", json, reason: "github_error", detail: "PR URL missing." };
    }
    return { kind: "opened", url: pr.html_url, branch };
  } catch (error) {
    return {
      kind: "paste",
      json,
      reason: "github_error",
      detail: error instanceof Error ? error.message : "GitHub request failed.",
    };
  }
}