import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { safeNextPath } from "@/lib/auth-path";
import { createRouteHandlerClient } from "@/lib/supabase/route-client";

function loginRedirect(request: NextRequest, next: string) {
  const login = request.nextUrl.clone();
  login.pathname = "/login";
  login.search = "";
  login.searchParams.set("error", "auth");
  login.searchParams.set("next", next);
  return NextResponse.redirect(login);
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const next = safeNextPath(searchParams.get("next"), "/");
  const destination = NextResponse.redirect(new URL(next, origin));
  const supabase = createRouteHandlerClient(request, destination);
  if (supabase && (await exchangeAuthReturn(supabase, searchParams))) {
    return destination;
  }
  return loginRedirect(request, next);
}

async function exchangeAuthReturn(
  supabase: NonNullable<ReturnType<typeof createRouteHandlerClient>>,
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
