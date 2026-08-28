import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseAnonKey, supabaseUrl } from "@/lib/supabase/env";

function hasAuthCookie(
  cookieStore: { getAll: () => { name: string }[] }
): boolean {
  return cookieStore.getAll().some((cookie) => cookie.name.includes("auth-token"));
}

export async function createClient() {
  const url = supabaseUrl();
  const key = supabaseAnonKey();
  if (!url || !key) return null;

  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Cookie writes from a Server Component are ignored; proxy.ts refreshes the session.
        }
      },
    },
  });
}

export async function getSessionUserId() {
  const supabase = await createClient();
  if (!supabase) return { supabase: null, userId: null as string | null };
  if (!hasAuthCookie(await cookies())) {
    return { supabase, userId: null as string | null };
  }
  try {
    const { data } = await supabase.auth.getClaims();
    const userId = typeof data?.claims?.sub === "string" ? data.claims.sub : null;
    return { supabase, userId };
  } catch {
    return { supabase, userId: null as string | null };
  }
}
