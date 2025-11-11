import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth(async (req) => {
    const response = NextResponse.next();

    if (req.auth) {
        try {
            const { getToken } = await import("next-auth/jwt");
            
            const token = await getToken({
                req,
                secret: process.env.AUTH_SECRET,
            });

            if (token?.idToken) {

                response.cookies.set("idToken", token.idToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax",
                    maxAge: 60 * 60, // 1시간
                    path: "/",
                });

                console.log("✅ [Middleware] ID Token synced to cookie");
            } else {
                console.warn("⚠️ [Middleware] No idToken in JWT");
            }
        } catch (error) {
            console.error("❌ [Middleware] Error syncing token:", error);
        }
    }

    return response;
});

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
