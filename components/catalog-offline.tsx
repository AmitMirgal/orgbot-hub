import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function CatalogOffline({ message }: { message?: string }) {
  return (
    <Alert>
      <AlertTitle>Catalog offline</AlertTitle>
      <AlertDescription>
        {message ??
          "Start local Supabase, then set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY. Browse still works from the bundled seed if those are unset."}
      </AlertDescription>
    </Alert>
  );
}
