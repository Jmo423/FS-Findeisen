import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.fahrschule-findeisen.de',
      },
    ],
  },
}

export default nextConfig
