import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.cdn4dd.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "doordash-static.s3.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "imagedelivery.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "kzmps94w6wprloamplrj.lite.vusercontent.net",
        pathname: "/**",
      },
    ],
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
