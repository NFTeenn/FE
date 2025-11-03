import type { DefaultSession, DefaultUser } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
	/**
	 * @property {string} idToken - Spring 백엔드 인증용 (사용자 신원 확인)
	 * @property {string} accessToken - Google API 호출용 (Drive, Gmail 등)
	 * @property {string} refreshToken - Access Token 갱신용 (만료 시 재발급)
	 */
	interface Session extends DefaultSession {
		idToken?: string;
		accessToken?: string;
		refreshToken?: string;
		user: {
			id: string;
		} & DefaultSession["user"];
	}

	interface User extends DefaultUser {
		accessToken?: string;
		refreshToken?: string;
	}
}

declare module "next-auth/jwt" {
	interface JWT extends DefaultJWT {
		idToken?: string; // ← 추가
		accessToken?: string;
		refreshToken?: string;
		userId?: string;
	}
}
