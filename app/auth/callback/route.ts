import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { safeNextPath } from "@/lib/auth-path";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const next = safeNextPath(searchParams.get("next"), "/");
  const supabase = await createClient();
  if (supabase && (await exchangeAuthReturn(supabase, searchParams))) {
    return NextResponse.redirect(`${origin}${next}`);
  }

  const login = new URL("/login", origin);
  login.searchParams.set("error", "auth");
  login.searchParams.set("next", next);
  return NextResponse.redirect(login);
}

async function exchangeAuthReturn(
  supabase: NonNullable<Awaited<ReturnType<typeof createClient>>>,
  params: URLSearchParams
): Promise<boolean> {
  const code = params.get("code");
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    return !error;
  }
  const tokenHash = params.get("token_hash");
  const otpType = emailOtpType(params.get("type"));
  if (tokenHash && otpType) {
    const { error } = await supabase.auth.verifyOtp({
      type: otpType,
      token_hash: tokenHash,
    });
    return !error;
  }
  return false;
}

function emailOtpType(raw: string | null): EmailOtpType | null {
  switch (raw) {
    case "email":
    case "signup":
    case "invite":
    case "magiclink":
    case "recovery":
    case "email_change":
      return raw;
    default:
      return null;
  }
}
