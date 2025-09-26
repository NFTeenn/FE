// app/api/auth/google/route.ts
import { NextResponse } from "next/server";

export async function GET() {
	const url = `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorization/google`;
	return NextResponse.redirect(url);
}
