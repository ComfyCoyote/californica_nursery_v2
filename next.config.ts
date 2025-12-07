import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://d4ixhj8jfp690.cloudfront.net/**'), new URL('https://items-images-production.s3.us-west-2.amazonaws.com/**')], // allow external image domains
  },
};

export default nextConfig;
