/** @type {import('next').NextConfig} */
const nextConfig = {
	i18n: {
		locales: ["fr", "en"],
		defaultLocale: "fr",
		localeDetection: false,
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});

		return config;
	},
};

export default nextConfig;
