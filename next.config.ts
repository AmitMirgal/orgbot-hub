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
  async redirects() {
    return [
      { source: "/featured/lauren", destination: "/poteto/lauren", permanent: false },
      { source: "/publish", destination: "/submit", permanent: false },
      { source: "/official", destination: "/about", permanent: false },
    ];
  },
};

export default nextConfig;
