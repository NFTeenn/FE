import withPWAInit from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,

	images: {
		domains: ["images.unsplash.com", "source.unsplash.com"],
	},

	swcMinify: true,
};

const withPWA = withPWAInit({
	dest: "public",
	disable: process.env.NODE_ENV === "development",
	register: true,
	skipWaiting: true,
	buildExcludes: [/middleware-manifest\.json$/],
	cacheOnFrontEndNav: true,
	reloadOnOnline: true,
	swcMinify: true,
	workboxOptions: {
		disableDevLogs: true,
	},
});

export default withPWA(nextConfig);
