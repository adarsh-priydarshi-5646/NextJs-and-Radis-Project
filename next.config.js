/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removing 'output: export' to allow server-side features like Redis
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;