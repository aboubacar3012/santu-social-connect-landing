import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Évite que Turbopack prenne le monorepo parent comme racine de résolution.
  turbopack: {
    root: projectRoot,
  },
  outputFileTracingRoot: projectRoot,
  async redirects() {
    return [
      {
        source: "/confidentialite",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/cgu",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/mentions-legales",
        destination: "/legal-notice",
        permanent: true,
      },
    ];
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
