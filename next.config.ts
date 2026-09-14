import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cool-lms.t3.storage.dev",
      },
    ],
  },
};

export default nextConfig;
