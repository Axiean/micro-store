import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/cart",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
