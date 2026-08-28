import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteHeader } from "@/components/site-header";
import { currentProfile, listPacks } from "@/lib/catalog";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "orgbots",
    template: "%s · orgbots",
  },
  description:
    "An open directory of org-bot packs. A roster, not a prompt. Front desk plus named seats.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const configured = isSupabaseConfigured();
  const [profile, packs] = configured
    ? await Promise.all([
        currentProfile().catch(() => null),
        listPacks().catch(() => []),
      ])
    : [null, []];

  const options = packs.map((pack) => ({
    owner: pack.owner.githubLogin,
    slug: pack.slug,
    name: pack.name,
    official: pack.official,
  }));

  return (
    <html
      lang="en"
      className={`dark ${GeistSans.variable} ${GeistMono.variable} ${GeistSans.className} h-full`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <TooltipProvider>
          <SiteHeader profile={profile} packs={options} />
          <div className="flex-1">{children}</div>
          <footer className="border-t border-border">
            <p className="mx-auto max-w-6xl px-4 py-4 text-[12px] text-muted-foreground">
              Packs are files. Git is the source of truth. The catalog does not run the bots.
            </p>
          </footer>
        </TooltipProvider>
      </body>
    </html>
  );
}
