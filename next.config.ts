import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    // Remove default SVG handling from Next.js
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.(".svg")
    );

    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/;
    }

    // Add SVGR for importing SVGs as components
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(ts|tsx|js|jsx)$/],
      },
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: [
      "pictures-nigeria.jijistatic.net",
      "rargccvfdicjywxxgktk.supabase.co",
    ], // 👈 add Jiji's domain
  },
};

export default nextConfig;
