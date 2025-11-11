import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { auth } from "@/auth";

export default auth(async (req) => {
	const response = NextResponse.next();

	if (req.auth) {
		try {
			const token = await getToken({
				req,
				secret: process.env.AUTH_SECRET,
			});

			if (token?.idToken) {
				response.cookies.set("idToken", token.idToken, {
					httpOnly: true,
					secure: process.env.NODE_ENV === "production",
					sameSite: "lax",
					maxAge: 30 * 24 * 60 * 60, // 30일
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
