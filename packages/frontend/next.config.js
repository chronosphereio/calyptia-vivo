/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_VIVO_BASE_PATH,
  reactStrictMode: true,
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE == 'true'
})

module.exports = withBundleAnalyzer({
  ...nextConfig
})
