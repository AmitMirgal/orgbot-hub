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
  const seatBands: Array<{ value?: SeatBand; label: string }> = [
    { value: undefined, label: "Any seats" },
    { value: "1", label: "1 seat" },
    { value: "2-3", label: "2–3 seats" },
    { value: "4+", label: "4+ seats" },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-1.5">
        <Chip
          href={hrefFor(filters, { topic: "" })}
          active={!filters.topic}
          label="All topics"
        />
        {TOPICS.map((topic) => (
          <Chip
            key={topic}
            href={hrefFor(filters, { topic })}
            active={filters.topic === topic}
            label={topic}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        <Chip
          href={hrefFor(filters, { featured: false })}
          active={!filters.featured}
          label="All packs"
        />
        <Chip
          href={hrefFor(filters, { featured: true })}
          active={Boolean(filters.featured)}
          label="Featured"
        />
        {seatBands.map((band) => (
          <Chip
            key={band.label}
            href={hrefFor(filters, { seatBand: band.value })}
            active={(filters.seatBand ?? undefined) === band.value}
            label={band.label}
          />
        ))}
      </div>
    </div>
  );
}

function Chip({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <Link href={href} className="inline-flex min-h-11 items-center">
      <Badge
        variant={active ? "default" : "outline"}
        className="rounded-md px-2.5 py-1 font-normal"
      >
        {label}
      </Badge>
    </Link>
  );
}
