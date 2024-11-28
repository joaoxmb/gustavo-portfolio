const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placeholder.com"
      },
      {
        protocol: "https",
        hostname: "vhcrsohenlhrvpwlteft.supabase.co"
      }
    ]
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ensure that all imports of 'yjs' resolve to the same instance
      config.resolve.alias['yjs'] = path.resolve(__dirname, 'node_modules/yjs')
    }
    return config
  },
};

module.exports = nextConfig;