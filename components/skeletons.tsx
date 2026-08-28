import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PackGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <Card
          key={index}
          className="gap-3 rounded-lg bg-transparent p-4 ring-1 ring-border"
        >
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-10 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-14" />
            <Skeleton className="h-5 w-20" />
          </div>
        </Card>
      ))}
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="space-y-2 rounded-lg border border-border p-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
}
