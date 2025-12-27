import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { auth } from "@/auth";
import { refreshAccessToken } from "@/shared/lib/refreshAccessToken";

export default auth(async (req: NextRequest & { auth?: any }) => {
	const { pathname } = req.nextUrl;

	// 1. Static resources and internal APIs exclusions
	if (
		pathname.startsWith("/api/auth") ||
		pathname.startsWith("/_next") ||
		pathname.includes("favicon.ico") ||
		pathname.includes("icon") ||
		pathname.includes("manifest") ||
		pathname.endsWith(".js") ||
		pathname.endsWith(".css") ||
		pathname.endsWith(".png") ||
		pathname.endsWith(".json") ||
		pathname.endsWith(".txt")
	) {
		return NextResponse.next();
	}

	// 2. Token Retrieval from session (req.auth)
	const session = req.auth;
	let idToken = (session as any)?.idToken;

	if (session && !idToken) {
		console.warn("⚠️ [Middleware] Session found but idToken is missing. Session keys:", Object.keys(session));
	}

	// Fallback to cookie if session retrieval failed
	if (!idToken) {
		idToken = req.cookies.get("idToken")?.value;
        if (idToken) console.log("✅ [Middleware] idToken retrieved from cookie fallback");
	}

	// 3. Routing Logic Definition
	const isAuthenticated = !!idToken;
	const isGuestOnlyRoute = pathname === "/" || pathname === "/signup";

	// 4. Redirection Logic

	// Case A: Not authenticated but trying to access protected routes
	if (!isAuthenticated && !isGuestOnlyRoute) {
		console.log(`🔄 [Middleware] Redirecting guest: ${pathname} → /`);
		const response = NextResponse.redirect(new URL("/", req.url));
		response.cookies.delete("idToken");
		return response;
	}

	// Case B: Authenticated but trying to access guest-only root page
	if (isAuthenticated && pathname === "/") {
		console.log(`🔄 [Middleware] Authenticated user on root, redirecting to /main. idToken length: ${idToken?.length}`);
		const response = NextResponse.redirect(new URL("/main", req.url));
		// Ensure cookie is set on redirect
		setTokenCookie(response, idToken!);
		return response;
	}

	// 5. Default Response (Proceed)
	const response = NextResponse.next();
	if (isAuthenticated) {
		setTokenCookie(response, idToken!);
	}

	return response;
});

/**
 * Helper to set idToken cookie consistently
 */
function setTokenCookie(response: NextResponse, idToken: string) {
	response.cookies.set("idToken", idToken, {
		httpOnly: false, // Accessible by client-side axios interceptors
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 30 * 24 * 60 * 60, // 30 days
		path: "/",
	});
}

export const config = {
	matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.js$|.*\\.css$|.*\\.png$).*)"],
};
