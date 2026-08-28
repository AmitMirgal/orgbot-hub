import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  botCount,
  deskOf,
  formatCount,
  namedSeats,
  packHref,
  type PackCard,
} from "@/lib/pack";

export function PackCardView({ pack }: { pack: PackCard }) {
  const desk = deskOf(pack);
  const seats = namedSeats(pack).slice(0, 5);

  return (
    <Link href={packHref(pack)} className="block h-full">
      <Card
        size="sm"
        className="h-full rounded-lg bg-transparent py-0 ring-1 ring-border transition-colors hover:bg-card/60 hover:ring-foreground/15"
      >
        <CardHeader className="gap-1 border-b border-border px-4 py-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-[14px] font-medium tracking-tight">
              {pack.name}
            </CardTitle>
            {pack.official ? (
              <Badge variant="outline" className="rounded-md font-normal">
                Official
              </Badge>
            ) : pack.topics.includes("example") ? (
              <Badge variant="ghost" className="rounded-md font-normal text-muted-foreground">
                example
              </Badge>
            ) : null}
          </div>
          <p className="font-mono text-[11px] text-muted-foreground">
            {pack.owner.githubLogin}/{pack.slug}
          </p>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-3 px-4 py-3">
          <p className="text-[13px] text-muted-foreground">
            {desk?.job ?? pack.description}
          </p>
          <p className="text-[11px] tracking-wide text-muted-foreground uppercase">
            {botCount(pack)} bots
          </p>
          <div className="flex flex-wrap gap-1.5">
            {seats.map((seat) => (
              <span
                key={seat.id}
                className="rounded-md border border-border px-1.5 py-0.5 text-[11px] text-muted-foreground"
              >
                {seat.name}
              </span>
            ))}
          </div>
          <div className="mt-auto flex items-center justify-between gap-2 pt-1">
            <div className="flex flex-wrap gap-1">
              {pack.runtimes.slice(0, 3).map((runtime) => (
                <Badge
                  key={runtime}
                  variant="secondary"
                  className="rounded-md font-mono text-[10px] font-normal"
                >
                  {runtime}
                </Badge>
              ))}
            </div>
            <span className="font-mono text-[11px] text-muted-foreground">
              {formatCount(pack.clonesCount)} clones
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
