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
		pathname.includes("favicon.ico")
	) {
		return NextResponse.next();
	}

	// 2. Token Retrieval from session (req.auth)
	const session = req.auth;
	let idToken = session?.idToken;

	if (session && !idToken) {
		console.warn("⚠️ [Middleware] Session exists but idToken is missing");
	}

	// Fallback to cookie if JWT retrieval failed (last resort)
	if (!idToken) {
		idToken = req.cookies.get("idToken")?.value;
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
		console.log(`🔄 [Middleware] Redirecting authenticated: / → /main`);
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
	matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
