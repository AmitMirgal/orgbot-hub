import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type Seat } from "@/lib/pack";

export function RosterTable({ seats }: { seats: Seat[] }) {
  const rows = seats.slice().sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-[11px] tracking-wide text-muted-foreground uppercase">
              Seat
            </TableHead>
            <TableHead className="text-[11px] tracking-wide text-muted-foreground uppercase">
              Job
            </TableHead>
            <TableHead className="hidden text-[11px] tracking-wide text-muted-foreground uppercase md:table-cell">
              Repeats when
            </TableHead>
            <TableHead className="text-[11px] tracking-wide text-muted-foreground uppercase">
              Desk
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((seat) => (
            <TableRow key={seat.id}>
              <TableCell className="text-[13px] font-medium">{seat.name}</TableCell>
              <TableCell className="max-w-[28rem] whitespace-normal text-[13px] text-muted-foreground">
                {seat.job}
              </TableCell>
              <TableCell className="hidden max-w-[20rem] whitespace-normal text-[13px] text-muted-foreground md:table-cell">
                {seat.isDesk ? "holds whatever is not a repeating job" : seat.repeatsWhen ?? "—"}
              </TableCell>
              <TableCell>
                {seat.isDesk ? (
                  <Badge variant="secondary" className="rounded-md font-normal">
                    yes
                  </Badge>
                ) : (
                  <span className="text-[12px] text-muted-foreground">no</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
