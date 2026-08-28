import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { botCount, formatCount, packHref, type PackCard } from "@/lib/pack";

export function Leaderboard({ packs }: { packs: PackCard[] }) {
  if (packs.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-10 text-[11px] tracking-wide text-muted-foreground uppercase">
              #
            </TableHead>
            <TableHead className="text-[11px] tracking-wide text-muted-foreground uppercase">
              Pack
            </TableHead>
            <TableHead className="hidden text-[11px] tracking-wide text-muted-foreground uppercase sm:table-cell">
              Author
            </TableHead>
            <TableHead className="hidden text-[11px] tracking-wide text-muted-foreground uppercase md:table-cell">
              Bots
            </TableHead>
            <TableHead className="text-right text-[11px] tracking-wide text-muted-foreground uppercase">
              Clones
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packs.map((pack, index) => (
            <TableRow key={pack.id}>
              <TableCell className="font-mono text-[12px] text-muted-foreground">
                {index + 1}
              </TableCell>
              <TableCell>
                <Link href={packHref(pack)} className="flex items-center gap-2">
                  <span className="text-[13px] font-medium">{pack.name}</span>
                  {pack.official ? (
                    <Badge variant="outline" className="rounded-md font-normal">
                      Official
                    </Badge>
                  ) : null}
                </Link>
              </TableCell>
              <TableCell className="hidden font-mono text-[12px] text-muted-foreground sm:table-cell">
                <Link href={`/${pack.owner.githubLogin}`}>{pack.owner.githubLogin}</Link>
              </TableCell>
              <TableCell className="hidden font-mono text-[12px] text-muted-foreground md:table-cell">
                {botCount(pack)}
              </TableCell>
              <TableCell className="text-right font-mono text-[12px]">
                {formatCount(pack.clonesCount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
