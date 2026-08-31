import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { safeNextPath } from "@/lib/auth-path";
import { getSessionUserId } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Sign in",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const params = await searchParams;
  const next = safeNextPath(params.next);
  const { userId } = await getSessionUserId();
  if (userId) redirect(next);

  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-6 px-4 py-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Sign in</h1>
        <p className="text-[15px] text-muted-foreground">Sign in to build a team.</p>
      </div>
      <LoginForm next={next} error={params.error ? "Sign-in failed. Try again." : null} />
    </main>
  );
}
