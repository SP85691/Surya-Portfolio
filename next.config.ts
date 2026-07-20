import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep `next dev` and `next build` from racing over the same manifests.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  experimental: {
    optimizePackageImports: ["@material-symbols-svg/react"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
