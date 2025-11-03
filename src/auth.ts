import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
			authorization: {
				params: {
					access_type: "offline",
					prompt: "consent",
				},
			},
		}),
	],
	callbacks: {
		async jwt({ token, account, user }) {
			console.log("=== JWT CALLBACK ===");
			console.log("Account:", account);

			if (account) {
				// ID Token 저장 (Spring으로 보낼 토큰)
				token.idToken = account.id_token;
				token.accessToken = account.access_token;
				token.refreshToken = account.refresh_token;
				token.userId = user?.id;

				console.log("ID Token:", account.id_token?.substring(0, 30));
			}

			return token;
		},
		async session({ session, token }) {
			console.log("=== SESSION CALLBACK ===");
			console.log("Token has idToken:", !!token.idToken);

			session.idToken = token.idToken as string;
			session.accessToken = token.accessToken as string;
			session.refreshToken = token.refreshToken as string;

			if (session.user) {
				session.user.id = token.userId as string;
			}

			return session;
		},
	},
	session: {
		strategy: "jwt",
	},
});
