import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isAuthSessionCookie } from "@/lib/supabase/auth-cookie";
import { supabaseAnonKey, supabaseUrl } from "@/lib/supabase/env";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });
  const url = supabaseUrl();
  const key = supabaseAnonKey();
  if (!url || !key) return supabaseResponse;

  // PKCE lives in cookies on /auth/callback. Do not refresh or rewrite them here.
  if (request.nextUrl.pathname.startsWith("/auth/")) {
    return supabaseResponse;
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
        Object.entries(headers).forEach(([header, value]) => {
          supabaseResponse.headers.set(header, value);
        });
      },
    },
  });

  const hasSession = request.cookies
    .getAll()
    .some((cookie) => isAuthSessionCookie(cookie.name));
  if (!hasSession) return supabaseResponse;

  try {
    await supabase.auth.getClaims();
  } catch {
    return supabaseResponse;
  }
  return supabaseResponse;
}
