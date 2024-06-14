/** @type {import('next').NextConfig} */
const path = require("path");
const nextTranspileModules = require("next-transpile-modules");

const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    fiber: false,
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "main.jobs3.io",
        port: "",
        pathname: "/**",
      },
    ],
    domains: ["localhost", "127.0.0.1", "jobs3-backend.vercel.app"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextTranspileModules([
  /* modules to transpile */
])(nextConfig);
