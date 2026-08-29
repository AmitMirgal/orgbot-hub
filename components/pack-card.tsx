import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  formatCount,
  ownerHandle,
  packHref,
  rosterNames,
  type PackCard,
} from "@/lib/pack";

export function PackCardView({ pack }: { pack: PackCard }) {
  const names = rosterNames(pack).slice(0, 5);

  return (
    <Link href={packHref(pack)} className="block h-full">
      <Card
        size="sm"
        className="h-full rounded-lg bg-card py-0 ring-1 ring-border transition-colors hover:bg-accent/40"
      >
        <CardHeader className="gap-1.5 border-b border-border px-4 py-3">
          <CardTitle className="text-lg font-medium tracking-tight">
            {pack.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {pack.description}
          </p>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-3 px-4 py-3">
          <div className="flex flex-wrap gap-1.5">
            {pack.featured ? (
              <Badge variant="accent" className="rounded-md font-normal">
                Featured
              </Badge>
            ) : null}
            {pack.topics.map((topic) => (
              <Badge
                key={topic}
                variant="accent"
                className="rounded-md font-normal"
              >
                {topic}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            {names.join(" · ")}
          </p>
          <div className="mt-auto flex items-center justify-between gap-2 pt-1">
            <span className="font-mono text-xs text-muted-foreground">
              shared by {ownerHandle(pack)}
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              {formatCount(pack.installsCount)} installs
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
