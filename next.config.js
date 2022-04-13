module.exports = {
	swcMinify: true,
	reactStrictMode: true,
	experimental: {
		outputStandalone: true,
	},
	i18n: {
		locales: ['en', 'tr'],
		defaultLocale: 'en',
		localeDetection: false,
		trailingSlash: false,
		domains: [
			{
				domain: 'example.com',
				defaultLocale: 'en',
			},
			{
				domain: 'example.com.tr',
				defaultLocale: 'tr',
			},
		],
	},
	async redirects() {
		return [
			{
				source: '/:path*',
				has: [{ type: 'host', value: 'www.example.com' }],
				destination: 'https://example.com/:path*',
				permanent: true,
			},
			{
				source: '/:path*',
				has: [{ type: 'host', value: 'www.example.com.tr' }],
				destination: 'https://example.com.tr/:path*',
				permanent: true,
			},
			{
				source: '/en',
				has: [{ type: 'host', value: 'www.example.com' }],
				destination: 'https://example.com',
				locale: false,
				permanent: false,
			},
			{
				source: '/tr',
				has: [{ type: 'host', value: 'www.example.com.tr' }],
				destination: 'https://example.com.tr',
				locale: false,
				permanent: false,
			},
		]
	},
	productionBrowserSourceMaps: true,
}
