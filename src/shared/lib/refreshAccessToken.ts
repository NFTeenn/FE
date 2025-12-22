import axios from "axios";
import type { JWT } from "next-auth/jwt";

interface GoogleTokenResponse {
	access_token: string;
	expires_in: number;
	id_token: string;
	refresh_token?: string;
	token_type: string;
}

export async function refreshAccessToken(token: JWT): Promise<JWT> {
	try {
		const params = new URLSearchParams({
			client_id: process.env.AUTH_GOOGLE_ID || "",
			client_secret: process.env.AUTH_GOOGLE_SECRET || "",
			grant_type: "refresh_token",
			refresh_token: token.refreshToken || "",
		});

		const response = await axios.post<GoogleTokenResponse>(
			"https://oauth2.googleapis.com/token",
			params.toString(),
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			},
		);

		const refreshedTokens = response.data;

		return {
			...token,
			idToken: refreshedTokens.id_token,
			accessToken: refreshedTokens.access_token,
			accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
			refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
		};
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			console.error("❌ Error refreshing access token:", error.response?.data || error.message);
		}

		return {
			...token,
			error: "RefreshAccessTokenError",
		};
	}
}
