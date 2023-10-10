/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_VIVO_BASE_PATH,
  reactStrictMode: true,
}

async function developmentRewrites() {
  return [{
    source: '/logs',
    destination: `http://127.0.0.1:2025/logs`
  }, {
    source: '/metrics',
    destination: `http://127.0.0.1:2025/metrics`
  }, {
    source: '/traces',
    destination: `http://127.0.0.1:2025/traces`
  }];
}

const dev = process.env.NODE_ENV !== 'production'
if (dev) {
  nextConfig.rewrites = developmentRewrites;
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE == 'true'
})

module.exports = withBundleAnalyzer({
  ...nextConfig
})
