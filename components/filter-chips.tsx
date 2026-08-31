import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { TOPICS, type SeatBand } from "@/lib/topics";

type Filters = {
  pathname: string;
  q?: string;
  topic?: string;
  featured?: boolean;
  seatBand?: SeatBand;
};

function hrefFor(filters: Filters, next: Partial<Filters>): string {
  const params = new URLSearchParams();
  const q = next.q ?? filters.q;
  const topic = next.topic === "" ? undefined : (next.topic ?? filters.topic);
  const featured = next.featured ?? filters.featured;
  const seatBand =
    next.seatBand === undefined && "seatBand" in next
      ? undefined
      : (next.seatBand ?? filters.seatBand);
  const path = q
    ? "/search"
    : topic
      ? `/topics/${topic}`
      : filters.pathname.startsWith("/topics/")
        ? "/marketplace"
        : filters.pathname;
  if (q) params.set("q", q);
  if (q && topic) params.set("topic", topic);
  if (featured) params.set("featured", "1");
  if (seatBand) params.set("seats", seatBand);
  const query = params.toString();
  return query ? `${path}?${query}` : path;
}

export function FilterChips(filters: Filters) {
  const allActive = !filters.topic && !filters.featured;

  return (
    <nav aria-label="Filter packs" className="flex flex-wrap gap-1.5">
      <Chip href={hrefFor(filters, { topic: "", featured: false })} active={allActive} label="All" />
      <Chip
        href={hrefFor(filters, { topic: "", featured: true })}
        active={Boolean(filters.featured) && !filters.topic}
        label="Featured"
        accent
      />
      {TOPICS.map((topic) => (
        <Chip
          key={topic}
          href={hrefFor(filters, { topic, featured: false })}
          active={filters.topic === topic && !filters.featured}
          label={topic}
          accent
        />
      ))}
    </nav>
  );
}

function Chip({
  href,
  active,
  label,
  accent,
}: {
  href: string;
  active: boolean;
  label: string;
  accent?: boolean;
}) {
  return (
    <Link href={href} className="inline-flex min-h-11 items-center">
      <Badge
        variant={accent ? "accent" : active ? "default" : "outline"}
        className={
          active && accent
            ? "rounded-md px-2.5 py-1 font-medium"
            : "rounded-md px-2.5 py-1 font-normal"
        }
      >
        {label}
      </Badge>
    </Link>
  );
}
