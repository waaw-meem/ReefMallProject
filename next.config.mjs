/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_BUCKET_URL,
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_BACKEND_URL,
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_FRONT_URL,
      },
    ],
    domains: [process.env.NEXT_BUCKET_URL],
  },
  env: {
    MEILI_SEARCH_ENDPOINT: process.env.MEILI_SEARCH_ENDPOINT,
    MEILI_SEARCH_KEY: process.env.MEILI_SEARCH_KEY,
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 100000,
        },
      },
    });
    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
