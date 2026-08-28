import { PackGridSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10">
      <div className="h-3 w-24 rounded bg-muted" />
      <div className="h-8 w-64 rounded bg-muted" />
      <div className="h-11 max-w-2xl rounded-md bg-muted" />
      <PackGridSkeleton count={3} />
    </main>
  );
}
