export type TopAuthor = {
  githubLogin: string;
  name: string | null;
  avatarUrl: string | null;
};

type RankedPack = {
  owner: {
    githubLogin: string;
    name: string | null;
    avatarUrl: string | null;
  };
  visitsCount: number;
  featured?: boolean;
};

export function topAuthors(packs: RankedPack[], limit = 5): TopAuthor[] {
  const byLogin = new Map<
    string,
    { author: TopAuthor; visits: number; featured: boolean }
  >();

  for (const pack of packs) {
    const login = pack.owner.githubLogin;
    const current = byLogin.get(login);
    if (!current) {
      byLogin.set(login, {
        author: {
          githubLogin: login,
          name: pack.owner.name,
          avatarUrl: pack.owner.avatarUrl,
        },
        visits: pack.visitsCount,
        featured: Boolean(pack.featured),
      });
      continue;
    }
    current.visits += pack.visitsCount;
    current.featured = current.featured || Boolean(pack.featured);
  }

  return [...byLogin.values()]
    .sort((left, right) => {
      if (right.visits !== left.visits) return right.visits - left.visits;
      if (left.featured !== right.featured) return left.featured ? -1 : 1;
      return left.author.githubLogin.localeCompare(right.author.githubLogin);
    })
    .slice(0, limit)
    .map((row) => row.author);
}
