export type GithubRepoRef = {
  owner: string;
  repo: string;
  branch: string;
};

const GITHUB_REPO =
  /^https?:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?(?:\/(?:tree|blob)\/([^/]+))?\/?$/i;

export function parseGithubRepoUrl(input: string): GithubRepoRef {
  const trimmed = input.trim();
  const match = trimmed.match(GITHUB_REPO);
  if (!match) {
    throw new Error("Paste a GitHub repo URL, like https://github.com/owner/repo");
  }
  return {
    owner: match[1],
    repo: match[2],
    branch: match[3] ?? "HEAD",
  };
}

async function fetchRaw(ref: GithubRepoRef, path: string): Promise<string | null> {
  const url = `https://raw.githubusercontent.com/${ref.owner}/${ref.repo}/${ref.branch}/${path}`;
  const response = await fetch(url, {
    headers: { "User-Agent": "orgbots-directory" },
    cache: "no-store",
  });
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`GitHub returned ${response.status} for ${path}`);
  }
  return response.text();
}

export async function fetchPackFiles(repoUrl: string): Promise<{
  yaml: string;
  readme: string | null;
  githubUrl: string;
}> {
  const ref = parseGithubRepoUrl(repoUrl);
  const branches = ref.branch === "HEAD" ? ["HEAD", "main", "master"] : [ref.branch];
  let yaml: string | null = null;
  let used = ref;

  for (const branch of branches) {
    const candidate = { ...ref, branch };
    yaml = await fetchRaw(candidate, "orgbots.yaml");
    if (yaml) {
      used = candidate;
      break;
    }
  }

  if (!yaml) {
    throw new Error("No orgbots.yaml found at the repo root.");
  }

  const readme =
    (await fetchRaw(used, "README.md")) ?? (await fetchRaw(used, "readme.md"));

  return {
    yaml,
    readme,
    githubUrl: `https://github.com/${used.owner}/${used.repo}`,
  };
}
