import { NextResponse, type NextRequest } from "next/server";
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
  const code = searchParams.get("code");
  const next = safeNextPath(searchParams.get("next"), "/");

  if (!code) return loginRedirect(request, next);

  const destination = NextResponse.redirect(new URL(next, origin));
  const supabase = createRouteHandlerClient(request, destination);
  if (!supabase) return loginRedirect(request, next);

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return loginRedirect(request, next);

  return destination;
}
