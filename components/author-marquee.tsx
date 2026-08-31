import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Marquee } from "@/components/ui/marquee";
import { authorHref } from "@/lib/pack";
import type { TopAuthor } from "@/lib/top-authors";
import { cn } from "@/lib/utils";

function authorInitials(author: TopAuthor): string {
  return (author.name ?? author.githubLogin).slice(0, 1).toUpperCase();
}

function AuthorChip({ author }: { author: TopAuthor }) {
  const src = author.avatarUrl ?? `https://github.com/${author.githubLogin}.png`;
  return (
    <Link
      href={authorHref(author.githubLogin)}
      className="flex shrink-0 items-center gap-2 text-[12px] text-muted-foreground hover:text-foreground"
    >
      <Avatar size="sm">
        <AvatarImage src={src} alt="" />
        <AvatarFallback>{authorInitials(author)}</AvatarFallback>
      </Avatar>
      <span className="font-mono">@{author.githubLogin}</span>
    </Link>
  );
}

export function AuthorMarquee({
  authors,
  className,
}: {
  authors: TopAuthor[];
  className?: string;
}) {
  if (authors.length === 0) return null;

  return (
    <div
      role="region"
      aria-label="Top authors"
      className={cn(
        "mx-auto w-full max-w-[22rem] sm:max-w-lg md:max-w-xl",
        className
      )}
    >
      <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-3">
        <p className="shrink-0 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
          Top authors
        </p>
        <div className="min-w-0 w-full flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent)]">
          <Marquee
            pauseOnHover
            repeat={3}
            className="p-0 [--duration:28s] [--gap:1.25rem] motion-reduce:hidden"
          >
            {authors.map((author) => (
              <AuthorChip key={author.githubLogin} author={author} />
            ))}
          </Marquee>
          <div className="hidden flex-wrap justify-center gap-x-4 gap-y-2 motion-reduce:flex">
            {authors.map((author) => (
              <AuthorChip key={author.githubLogin} author={author} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
