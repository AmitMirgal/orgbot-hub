"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-20">
      <h1 className="text-2xl font-medium tracking-tight">Something broke</h1>
      <p className="text-[14px] text-muted-foreground">
        The directory failed to load. Try again, or check that local Supabase is running.
      </p>
      <Button variant="outline" className="w-fit" onClick={reset}>
        Retry
      </Button>
    </main>
  );
}
