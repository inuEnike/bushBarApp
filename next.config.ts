import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
  images: {
    remotePatterns: [new URL("https://via.placeholder.com/600x400/c2185b/**")],
  },
};

export default nextConfig;
