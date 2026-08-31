import { NextResponse } from "next/server";
import { safeNextPath } from "@/lib/auth-path";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = safeNextPath(searchParams.get("next"), "/");

  if (code) {
    const supabase = await createClient();
    if (supabase) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  const login = new URL("/login", origin);
  login.searchParams.set("error", "auth");
  login.searchParams.set("next", next);
  return NextResponse.redirect(login);
}
