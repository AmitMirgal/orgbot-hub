"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toggleLike } from "@/lib/actions";
import { formatCount } from "@/lib/pack";
import { createClient } from "@/lib/supabase/client";

export function LikeButton({
  packId,
  owner,
  slug,
  likes,
  liked,
  signedIn,
}: {
  packId: string;
  owner: string;
  slug: string;
  likes: number;
  liked: boolean;
  signedIn: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function onLike() {
    if (!signedIn) {
      const supabase = createClient();
      if (!supabase) {
        setError("Sign in is not configured.");
        return;
      }
      await supabase.auth.signInWithOAuth({
        provider: "github",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      return;
    }
    startTransition(async () => {
      const result = await toggleLike(packId, owner, slug);
      if (result.error) setError(result.error);
      else {
        setError(null);
        router.refresh();
      }
    });
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <Button
        variant={liked ? "secondary" : "outline"}
        size="sm"
        onClick={onLike}
        disabled={pending}
      >
        {liked ? "Liked" : "Like"}
        <span className="font-mono text-[11px] text-muted-foreground">
          {formatCount(likes)}
        </span>
      </Button>
      {error ? <p className="text-[11px] text-destructive">{error}</p> : null}
    </div>
  );
}
