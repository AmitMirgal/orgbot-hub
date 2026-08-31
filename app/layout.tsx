import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Providers } from "@/app/providers";
import { listPacks } from "@/lib/catalog";
import { getSessionUser } from "@/lib/supabase/server";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "orgbot-hub",
    template: "%s · orgbot-hub",
  },
  description: "orgbots is a directory of Grok Bot teams you can install.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const packs = await listPacks().catch(() => []);
  const { user } = await getSessionUser();

  const options = packs.map((pack) => ({
    owner: pack.owner.githubLogin,
    slug: pack.slug,
    name: pack.name,
    featured: pack.featured,
  }));

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable} h-full`}
    >
      <body className="flex min-h-dvh flex-col font-sans">
        <Providers>
          <SiteHeader packs={options} user={user} />
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
