/** @type {import('next').NextConfig} */
 const nextConfig = {
  images: {
    deviceSizes: [640, 750, 1080, 1920],
    imageSizes: [16, 32, 64, 128],
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


 