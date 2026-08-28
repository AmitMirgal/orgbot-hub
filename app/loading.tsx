import { PackGridSkeleton, TableSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10">
      <div className="flex max-w-2xl flex-col gap-4">
        <div className="h-3 w-24 rounded bg-muted" />
        <div className="h-9 w-72 rounded bg-muted" />
        <div className="h-11 w-full rounded-md bg-muted" />
      </div>
      <TableSkeleton />
      <PackGridSkeleton />
    </main>
  );
}
