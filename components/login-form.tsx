"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GitHubLogo, XLogo } from "@/components/network-icons";
import { authCallbackUrl, authRedirectOrigin, safeNextPath } from "@/lib/auth-path";
import { createClient } from "@/lib/supabase/client";

export function LoginForm({
  next,
  error,
}: {
  next: string;
  error?: string | null;
}) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [localError, setLocalError] = useState<string | null>(error ?? null);
  const dest = safeNextPath(next);

  async function oauth(provider: "github" | "x") {
    const supabase = createClient();
    if (!supabase) {
      setLocalError("Auth is not configured.");
      return;
    }
    setBusy(true);
    setLocalError(null);
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: authCallbackUrl(
          authRedirectOrigin(window.location.origin),
          dest
        ),
      },
    });
    if (oauthError) {
      setBusy(false);
      setLocalError(oauthError.message);
    }
  }

  async function sendMagicLink(event: FormEvent) {
    event.preventDefault();
    const value = email.trim();
    if (!value) return;
    const supabase = createClient();
    if (!supabase) {
      setLocalError("Auth is not configured.");
      return;
    }
    setBusy(true);
    setLocalError(null);
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email: value,
      options: {
        emailRedirectTo: authCallbackUrl(
          authRedirectOrigin(window.location.origin),
          dest
        ),
      },
    });
    setBusy(false);
    if (otpError) {
      setLocalError(otpError.message);
      return;
    }
    setSent(true);
  }

  return (
    <div className="flex flex-col gap-4">
      <Button
        type="button"
        variant="outline"
        className="h-11 w-full justify-center"
        disabled={busy}
        onClick={() => void oauth("github")}
      >
        <GitHubLogo className="size-4" />
        Continue with GitHub
      </Button>
      <Button
        type="button"
        variant="outline"
        className="h-11 w-full justify-center"
        disabled={busy}
        onClick={() => void oauth("x")}
      >
        <XLogo className="size-4" />
        Continue with X
      </Button>
      {sent ? (
        <p className="text-[13px] text-muted-foreground">Check your email.</p>
      ) : (
        <form onSubmit={(event) => void sendMagicLink(event)} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              disabled={busy}
              required
              className="h-11"
            />
          </div>
          <Button type="submit" className="h-11 w-full" disabled={busy || !email.trim()}>
            Send magic link
          </Button>
        </form>
      )}
      {localError ? (
        <p className="text-[13px] text-destructive" role="alert">
          {localError}
        </p>
      ) : null}
    </div>
  );
}
