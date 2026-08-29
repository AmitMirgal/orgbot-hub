import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { packHref, type PackCard } from "@/lib/pack";

export function Leaderboard({ packs }: { packs: PackCard[] }) {
  if (packs.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-[11px] tracking-wide text-muted-foreground uppercase">
              Name
            </TableHead>
            <TableHead className="text-[11px] tracking-wide text-muted-foreground uppercase">
              What it does
            </TableHead>
            <TableHead className="hidden text-[11px] tracking-wide text-muted-foreground uppercase sm:table-cell">
              Topic
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packs.map((pack) => (
            <TableRow key={pack.id}>
              <TableCell>
                <Link href={packHref(pack)} className="text-[13px] font-medium">
                  {pack.name}
                </Link>
              </TableCell>
              <TableCell className="max-w-[28rem] whitespace-normal text-[13px] text-muted-foreground">
                {pack.description}
              </TableCell>
              <TableCell className="hidden font-mono text-[12px] text-muted-foreground sm:table-cell">
                {pack.topics[0] ?? "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
