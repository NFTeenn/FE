import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import withPWAInit from "@ducanh2912/next-pwa";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,

	webpack: (config) => {
		config.resolve.alias = {
			...config.resolve.alias,
			"@": path.resolve(__dirname, "src"),
			"@app": path.resolve(__dirname, "src/app"),
			"@entities": path.resolve(__dirname, "src/entities"),
			"@features": path.resolve(__dirname, "src/features"),
			"@shared": path.resolve(__dirname, "src/shared"),
			"@widgets": path.resolve(__dirname, "src/widgets"),
		};

		return config;
	},

	pageExtensions: ["tsx", "ts", "jsx", "js"],

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
});

export default withPWA(nextConfig);
