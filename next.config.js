const path = require('path');

module.exports = {
  images: {
    domains: ['localhost', '127.0.0.1', 'jobs3-backend.vercel.app', 'images.ctfassets.net'],
    remotePatterns: [
      {
        hostname: 'main.jobs3.io',
        pathname: '/**',
        port: '',
        protocol: 'https',
      },
      {
        hostname: 'jobs3.s3.eu-north-1.amazonaws.com',
        pathname: '/**',
        port: '',
        protocol: 'https',
      },
    ],
  },
  reactStrictMode: false,
  sassOptions: {
    fiber: false,
    includePaths: [path.join(__dirname, 'styles')],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
