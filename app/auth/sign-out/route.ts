import { NextResponse, type NextRequest } from "next/server";
import { createRouteHandlerClient } from "@/lib/supabase/route-client";

export async function POST(request: NextRequest) {
  const destination = NextResponse.redirect(new URL("/", request.url), {
    status: 303,
  });
  const supabase = createRouteHandlerClient(request, destination);
  if (supabase) {
    await supabase.auth.signOut();
  }
  return destination;
}
