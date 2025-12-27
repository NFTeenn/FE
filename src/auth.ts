import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { refreshAccessToken } from "@/shared/lib/refreshAccessToken";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            authorization: {
                params: {
                    access_type: "offline",
                    prompt: "consent",
                    scope: ["openid", "email", "profile"].join(" "),
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            if (account && user) {
                console.log("=== 초기 로그인 ===");
                console.log("ID Token 존재 여부:", !!account.id_token);
                if (account.id_token) {
                    console.log("ID Token 크기:", account.id_token.length);
                }

                const accessTokenExpires = account.expires_at
                    ? account.expires_at * 1000
                    : Date.now() + 3600 * 1000;

                return {
                    ...token,
                    idToken: account.id_token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    accessTokenExpires,
                    userId: user.id as string,
                };
            }

            if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
                const minutesLeft = Math.floor((token.accessTokenExpires - Date.now()) / 1000 / 60);
                console.log(`✅ Token still valid (${minutesLeft} minutes left)`);
                return token;
            }

            console.log("⚠️ Token expired or missing expiration, refreshing...");
            return refreshAccessToken(token);
        },

        async session({ session, token }) {
            if (token.error) {
                console.error("❌ Token error:", token.error);
                session.error = token.error;
                return session;
            }

            if (session.user) {
                session.user.id = token.userId as string;
            }

            session.idToken = token.idToken as string | undefined;
            
            if (!session.idToken) {
                console.warn("⚠️ [Auth.js] idToken is missing in session callback", {
                    hasTokenInJWT: !!token.idToken
                });
            }

            if (token.accessTokenExpires) {
                const expiresAt = token.accessTokenExpires;
                const timeUntilExpiry = expiresAt - Date.now();
                const minutesUntilExpiry = Math.floor(timeUntilExpiry / 1000 / 60);
                session.expiresIn = minutesUntilExpiry;

                console.log(
                    `⏰ Token expires in ${minutesUntilExpiry} minutes (at ${new Date(expiresAt).toISOString()})`
                );
            }

            return session;
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30일
    },
    pages: {
        signIn: "/",
    },
    debug: true,
});
