import type { NextConfig } from 'next'

// Static export: this app ships as pre-rendered HTML/JS/CSS served directly
// from an S3 bucket, with no Node server and no API routes. All health
// checks run client-side in the browser after load.
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  eslint: {
    dirs: ['app', 'components', 'hooks', 'lib', 'config']
  }
}

export default nextConfig
