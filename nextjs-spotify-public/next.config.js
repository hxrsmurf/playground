/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    largePageDataBytes: 8750000,
  },
  staticPageGenerationTimeout: 60
}

module.exports = nextConfig
