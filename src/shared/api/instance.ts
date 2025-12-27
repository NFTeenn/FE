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
				try {
					const { cookies } = await import("next/headers");
					idToken = cookies().get("idToken")?.value;
				} catch (e) {
					// Likely outside of request context
				}
			} else {
				try {
                    // Accessing document.cookie can throw DOMException in some restricted environments
					if (typeof document !== "undefined") {
                        const match = document.cookie.match(/(^|;)\s*idToken\s*=\s*([^;]+)/);
                        idToken = match ? match[2] : null;
                    }
				} catch (e) {
					console.warn("⚠️ [Axios] Browser blocked direct cookie access (Insecure context or privacy settings)");
				}
			}

			if (idToken) {
				config.headers.Authorization = `Bearer ${idToken}`;
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
