export function CatalogOffline({ message }: { message?: string }) {
  return (
    <div className="border border-dashed border-border px-4 py-10 text-center">
      <p className="text-[13px] text-muted-foreground">
        {message ??
          "The catalog is offline. Start local Supabase, then set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."}
      </p>
    </div>
  );
}
