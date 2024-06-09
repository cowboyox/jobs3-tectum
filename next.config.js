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
	},
}