import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "@mastra/core",
    "@mastra/ai-sdk",
    "@prisma/client",
    "@prisma/adapter-pg",
    "pg",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      { source: "/featured/lauren", destination: "/poteto/lauren", permanent: false },
      { source: "/publish", destination: "/submit", permanent: false },
      { source: "/official", destination: "/about", permanent: false },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/ogb-ph/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ogb-ph/array/:path*",
        destination: "https://us-assets.i.posthog.com/array/:path*",
      },
      {
        source: "/ogb-ph/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
};

export default nextConfig;
