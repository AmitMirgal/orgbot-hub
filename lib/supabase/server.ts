import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { SessionUser } from "@/lib/session-user";
import { isAuthSessionCookie } from "@/lib/supabase/auth-cookie";
import { supabaseAnonKey, supabaseUrl } from "@/lib/supabase/env";

export type { SessionUser };

function hasAuthCookie(
  cookieStore: { getAll: () => { name: string }[] }
): boolean {
  return cookieStore.getAll().some((cookie) => isAuthSessionCookie(cookie.name));
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

function sessionUserFromClaims(claims: Record<string, unknown>): SessionUser | null {
  const userId = typeof claims.sub === "string" ? claims.sub : null;
  if (!userId) return null;
  const meta =
    claims.user_metadata && typeof claims.user_metadata === "object"
      ? (claims.user_metadata as Record<string, unknown>)
      : {};
  const stringField = (...values: unknown[]) => {
    for (const value of values) {
      if (typeof value === "string" && value.trim()) return value;
    }
    return null;
  };
  return {
    userId,
    email: stringField(claims.email),
    name: stringField(meta.full_name, meta.name, meta.user_name, meta.preferred_username),
    avatarUrl: stringField(meta.avatar_url, meta.picture),
  };
}

export async function getSessionUserId() {
  const supabase = await createClient();
  if (!supabase) return { supabase: null, userId: null as string | null };
  if (!hasAuthCookie(await cookies())) {
    return { supabase, userId: null as string | null };
  }
  try {
    const { data } = await supabase.auth.getClaims();
    const claims = data?.claims as Record<string, unknown> | undefined;
    const userId = typeof claims?.sub === "string" ? claims.sub : null;
    return { supabase, userId };
  } catch {
    return { supabase, userId: null as string | null };
  }
}

export async function getSessionUser() {
  const supabase = await createClient();
  if (!supabase) return { supabase: null, user: null as SessionUser | null };
  if (!hasAuthCookie(await cookies())) {
    return { supabase, user: null as SessionUser | null };
  }
  try {
    const { data } = await supabase.auth.getClaims();
    const claims = data?.claims as Record<string, unknown> | undefined;
    return { supabase, user: claims ? sessionUserFromClaims(claims) : null };
  } catch {
    return { supabase, user: null as SessionUser | null };
  }
}
