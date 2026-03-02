import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'dev.blob.core.windows.net', // For Azure dev/emulator
      },
      {
        protocol: 'https',
        hostname: '*.blob.core.windows.net', // For real Azure
      }
    ],
  },
};

export default nextConfig;
