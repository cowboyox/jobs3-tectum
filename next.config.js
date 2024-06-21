const path = require('path')

module.exports = {
	reactStrictMode: false,
	sassOptions: {
		fiber: false,
		includePaths: [path.join(__dirname, 'styles')],
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
		domains: ['localhost', '127.0.0.1', 'jobs3-backend.vercel.app']
	},
	eslint: {
    ignoreDuringBuilds: true,
  }
}