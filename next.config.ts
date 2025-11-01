import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://d4ixhj8jfp690.cloudfront.net/**')], // allow external image domains
  },
};

export default nextConfig;
