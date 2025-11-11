import type { DefaultSession, DefaultUser } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
	interface Session extends DefaultSession {
		error?: string; 
		expiresIn?: number;
		user: {
			id: string;
		} & DefaultSession["user"];
	}

	interface User extends DefaultUser {
		// OAuth 제공자로부터 받은 사용자 정보
	}
}

declare module "next-auth/jwt" {
	interface JWT extends DefaultJWT {
		idToken?: string; 
		accessToken?: string; 
		refreshToken?: string;
		userId?: string; 
		accessTokenExpires?: number; 
		error?: string; 
	}
}
