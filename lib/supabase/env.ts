import { httpUrl } from "@/lib/env-url";

export function parseSupabaseUrl(value: string | undefined): string | undefined {
  return httpUrl(value);
}

export function supabaseUrl(): string | undefined {
  return parseSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
}

export function supabaseAnonKey(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );
}

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl() && supabaseAnonKey());
}
