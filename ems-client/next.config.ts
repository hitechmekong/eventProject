import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true, // Generates /admin/index.html for clean URLs
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
