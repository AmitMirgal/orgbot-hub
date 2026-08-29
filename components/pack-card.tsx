import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  formatCount,
  namedSeats,
  ownerHandle,
  packHref,
  seatCount,
  type PackCard,
} from "@/lib/pack";

export function PackCardView({ pack }: { pack: PackCard }) {
  const seats = namedSeats(pack).slice(0, 5);
  const desk = pack.seats.find((seat) => seat.isDesk);

  return (
    <Link href={packHref(pack)} className="block h-full">
      <Card
        size="sm"
        className="h-full rounded-lg bg-card py-0 ring-1 ring-border transition-colors hover:bg-accent/40"
      >
        <CardHeader className="gap-1.5 border-b border-border px-4 py-3">
          <CardTitle className="text-[15px] font-medium tracking-tight">
            {pack.name}
          </CardTitle>
          <p className="text-[13px] text-muted-foreground">
            {pack.description}
          </p>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-3 px-4 py-3">
          <div className="flex flex-wrap gap-1.5">
            {pack.topics.map((topic) => (
              <Badge
                key={topic}
                variant="outline"
                className="rounded-md font-normal"
              >
                {topic}
              </Badge>
            ))}
            <Badge variant="secondary" className="rounded-md font-normal">
              {seatCount(pack)} seats
            </Badge>
          </div>
          <p className="text-[12px] text-muted-foreground">
            {[desk?.name, ...seats.map((seat) => seat.name)]
              .filter(Boolean)
              .slice(0, 5)
              .join(" · ")}
          </p>
          <div className="mt-auto flex items-center justify-between gap-2 pt-1">
            <span className="font-mono text-[12px] text-muted-foreground">
              shared by {ownerHandle(pack)}
            </span>
            <span className="font-mono text-[11px] text-muted-foreground">
              {formatCount(pack.installsCount)} installs
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
