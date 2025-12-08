import type { NextConfig } from "next";

 //[new URL('https://d4ixhj8jfp690.cloudfront.net/**'), new URL('https://items-images-production.s3.us-west-2.amazonaws.com/**')], // allow external image domains

const nextConfig: NextConfig = {
  images: {
    qualities: [60, 75],
    remotePatterns:  [
     {
        protocol: 'https',
        hostname: 'd4ixhj8jfp690.cloudfront.net',
        pathname: "/**"
    },
    {
      protocol: 'https',
      hostname: 'items-images-production.s3.us-west-2.amazonaws.com',
      pathname: "/**"
    }
  ]
   
  },
};

export default nextConfig;


 