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

                const accessTokenExpires = account.expires_at
                    ? account.expires_at * 1000
                    : Date.now() + 3600 * 1000; // 기본 1시간

                const tokenData = {
                    ...token,
                    idToken: account.id_token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    accessTokenExpires: accessTokenExpires,
                    userId: user.id,
                };

                console.log({
                    userId: user.id,
                    accessTokenExpires: new Date(accessTokenExpires).toISOString(),
                    hasRefreshToken: !!account.refresh_token,
                });

                return tokenData;
            }

            const accessTokenExpires = token.accessTokenExpires;

            if (Date.now() < accessTokenExpires) {
                const minutesLeft = Math.floor((accessTokenExpires - Date.now()) / 1000 / 60);
                console.log(`✅ Token still valid (${minutesLeft} minutes left)`);
                return token;
            }

            console.log("⚠️ Token expired, refreshing...");
            return refreshAccessToken(token);
        },

        async session({ session, token }) {
            if (token.error) {
                console.error("❌ Token error:", token.error);
                return {
                    ...session,
                    error: token.error,
                } as any;
            }

            if (session.user) {
                session.user.id = token.userId;
            }

            const expiresAt = token.accessTokenExpires;
            const timeUntilExpiry = expiresAt - Date.now();
            const minutesUntilExpiry = Math.floor(timeUntilExpiry / 1000 / 60);

            (session as any).expiresIn = minutesUntilExpiry;

            console.log(
                `⏰ Token expires in ${minutesUntilExpiry} minutes (at ${new Date(expiresAt).toISOString()})`
            );

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
