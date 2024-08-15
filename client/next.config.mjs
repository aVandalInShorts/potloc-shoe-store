/** @type {import('next').NextConfig} */
const nextConfig = {
	i18n: {
		locales: ["en", "fr"],
    defaultLocale: "en",
  },
	webpack(config) {
		config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
	}
};

export default nextConfig;
