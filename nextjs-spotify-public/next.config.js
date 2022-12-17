/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    largePageDataBytes: 8750000,
  },
  staticPageGenerationTimeout: 300
}

module.exports = nextConfig
