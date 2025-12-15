// src/shared/api/instance.ts
import axios from "axios";

export const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	timeout: 10000,
	withCredentials: true,
});

<<<<<<< HEAD
// 쿠키에서 값을 읽는 헬퍼 함수
function getCookie(name: string): string | null {
	if (typeof window === 'undefined') return null;
	
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	
	if (parts.length === 2) {
		return parts.pop()?.split(';').shift() || null;
	}
	
	return null;
}
=======
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
>>>>>>> develop

instance.interceptors.request.use(
	(config) => {
		try {
			// Client-side에서만 쿠키 읽기
			if (typeof window !== 'undefined') {
				const idToken = getCookie("idToken");

				if (idToken) {
					config.headers.Authorization = `Bearer ${idToken}`;
				} else {
					console.warn("No idToken in cookies");
				}
			}

			return config;
		} catch (error) {
			console.error("Error reading cookie:", error);
			return config;
		}
	},
	(error) => {
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const status = error.response?.status;

		if (status === 401 || status === 403) {
			console.error("Authentication failed - Re-authentication needed");

			// Client-side에서 로그인 페이지로 리다이렉트
			if (typeof window !== 'undefined') {
				window.location.href = '/login';
			}

			const authError = new Error("Authentication failed");
			return Promise.reject(authError);
		}

		return Promise.reject(error);
	}
);