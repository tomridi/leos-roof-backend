// next.config.mjs
import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  output: 'standalone', // <-- ADD THIS LINE
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
