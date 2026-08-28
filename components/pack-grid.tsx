import { PackCardView } from "@/components/pack-card";
import type { PackCard } from "@/lib/pack";

export function PackGrid({ packs }: { packs: PackCard[] }) {
  if (packs.length === 0) {
    return (
      <p className="border border-dashed border-border px-4 py-10 text-center text-[13px] text-muted-foreground">
        No packs match.
      </p>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {packs.map((pack) => (
        <PackCardView key={pack.id} pack={pack} />
      ))}
    </div>
  );
}
