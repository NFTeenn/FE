import axios from "axios";

export const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	timeout: 10000,
	withCredentials: true,
});

instance.interceptors.request.use(
	async (config) => {
		try {
			let idToken = null;
			if (typeof window === "undefined") {
				const { cookies } = await import("next/headers");
				const cookieStore = cookies();
				idToken = cookieStore.get("idToken")?.value;
			} else {
				idToken = document.cookie.split("idToken=")[1].split(";")[0];
			}

			if (idToken) {
				config.headers.Authorization = `Bearer ${idToken}`;
			} else {
				console.warn("No idToken in cookies");
			}

			return config;
		} catch (error) {
			console.error("Error reading cookie:", error);
			return config;
		}
	},
	(error) => {
		return Promise.reject(error);
	},
);

instance.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const status = error.response?.status;

		if (status === 401 || status === 403) {
			console.error("Authentication failed - Re-authentication needed");

			const authError = new Error("Authentication failed");

			return Promise.reject(authError);
		}

		return Promise.reject(error);
	},
);