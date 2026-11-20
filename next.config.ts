import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    qualities: [75, 90],
    unoptimized: true, // serve the original .jpg files from public/collection as-is (no WebP)
  },
};

export default nextConfig;
