import { AddToGrok } from "@/components/add-to-grok";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { orderedSeats, type Seat } from "@/lib/pack";

export function RosterList({
  seats,
  packId,
  owner,
  slug,
}: {
  seats: Seat[];
  packId: string;
  owner: string;
  slug: string;
}) {
  const rows = orderedSeats({ seats });

  return (
    <>
      <div className="hidden overflow-hidden rounded-lg border border-border md:block">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[11px] tracking-wide text-muted-foreground uppercase">
                Seat
              </TableHead>
              <TableHead className="text-[11px] tracking-wide text-muted-foreground uppercase">
                Job
              </TableHead>
              <TableHead className="text-[11px] tracking-wide text-muted-foreground uppercase">
                Install
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((seat) => (
              <TableRow key={seat.id}>
                <TableCell className="align-top">
                  <div className="flex flex-col gap-1">
                    <span className="text-[13px] font-medium">{seat.name}</span>
                    {seat.isDesk ? (
                      <Badge variant="secondary" className="w-fit rounded-md font-normal">
                        desk
                      </Badge>
                    ) : null}
                  </div>
                </TableCell>
                <TableCell className="max-w-[28rem] whitespace-normal align-top text-[13px] text-muted-foreground">
                  {seat.job}
                </TableCell>
                <TableCell className="align-top">
                  <AddToGrok
                    url={seat.grokTemplateUrl}
                    label="add to grok bot"
                    packId={packId}
                    owner={owner}
                    slug={slug}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 md:hidden">
        {rows.map((seat) => (
          <div key={seat.id} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-[14px] font-medium">{seat.name}</p>
              {seat.isDesk ? (
                <Badge variant="secondary" className="rounded-md font-normal">
                  desk
                </Badge>
              ) : null}
            </div>
            <p className="mt-1 text-[13px] text-muted-foreground">{seat.job}</p>
            <Separator className="my-3" />
            <AddToGrok
              url={seat.grokTemplateUrl}
              label="add to grok bot"
              packId={packId}
              owner={owner}
              slug={slug}
            />
          </div>
        ))}
      </div>
    </>
  );
}
