import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/pricing',
        destination: '/contact',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
