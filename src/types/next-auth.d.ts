import type { DefaultSession } from "next-auth";
import type { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
	interface Session extends DefaultSession {
		error?: string;
		expiresIn?: number;
		user: {
			id: string;
		} & DefaultSession["user"];
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
