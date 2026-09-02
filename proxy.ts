import { NextResponse, type NextRequest } from "next/server";
import { authCallbackBounceUrl } from "@/lib/auth-path";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  if (request.method === "GET" || request.method === "HEAD") {
    const bounce = authCallbackBounceUrl(request.nextUrl);
    if (bounce) return NextResponse.redirect(bounce);
  }
  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!ogb-ph|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
