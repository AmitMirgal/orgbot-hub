import { notFound } from "next/navigation";
import { AuthNav } from "@/components/auth-nav";
import { ModeToggle } from "@/components/mode-toggle";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Account menu preview",
};

export default function AccountMenuPreviewPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-background">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-end gap-3 px-4">
          <AuthNav
            user={{
              userId: "00000000-0000-0000-0000-000000000003",
              email: "kristaletz@orgbots.dev",
              name: "Krista Letz",
              avatarUrl: "https://avatars.githubusercontent.com/u/225127725?v=4",
            }}
          />
          <ModeToggle />
        </div>
      </header>
    </div>
  );
}
