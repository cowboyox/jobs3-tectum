const path = require('path')

module.exports = {
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