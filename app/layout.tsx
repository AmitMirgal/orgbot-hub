import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { Providers } from "@/app/providers";
import { listPacks } from "@/lib/catalog";
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
      <body className="flex min-h-full flex-col font-sans">
        <Providers>
          <SiteHeader packs={options} />
          <div className="flex-1">{children}</div>
          <footer className="border-t border-border">
            <p className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-4 text-[12px] text-muted-foreground">
              <span>orgbots is a directory of Grok Bot teams you can install.</span>
              <Link href="/about" className="hover:text-foreground">
                About
              </Link>
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
