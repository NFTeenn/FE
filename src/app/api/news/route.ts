import axios from "axios";
import { type NextRequest, NextResponse } from "next/server";

// 뉴스 목록 조회 (GET)
export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const query = searchParams.get("query") || "경제";

		const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
		const clientSecret = process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET;

		if (!clientId || !clientSecret) {
			return NextResponse.json(
				{ error: "네이버 API 클라이언트 정보가 설정되지 않았습니다" },
				{ status: 500 },
			);
		}

		const encodedQuery = encodeURIComponent(query);
		const url = `https://openapi.naver.com/v1/search/news.json?query=${encodedQuery}&display=20&sort=date`;

		const response = await axios.get(url, {
			headers: {
				"X-Naver-Client-Id": clientId,
				"X-Naver-Client-Secret": clientSecret,
			},
		});

		const data = response.data;

		return NextResponse.json(data, {
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST",
				"Access-Control-Allow-Headers": "Content-Type, Authorization",
			},
		});
	} catch (error) {
		console.error("뉴스 API 오류:", error);
		return NextResponse.json(
			{ error: "서버 오류가 발생했습니다" },
			{ status: 500 },
		);
	}
}

// 뉴스 클릭 처리 (POST) - 백엔드로 프록시
export async function POST(request: NextRequest) {
	try {
		// 쿠키에서 토큰 가져오기
		const cookieStore = request.cookies;
		const token = cookieStore.get("idToken")?.value;

		if (!token) {
			console.error("토큰이 없습니다.");
			return NextResponse.json({ error: "token이 없습니다." }, { status: 401 });
		}

		// 백엔드 서버 URL
		const backendUrl = process.env.NEXT_PUBLIC_BASE_URL;

		if (!backendUrl) {
			console.error("NEXT_PUBLIC_BASE_URL이 설정되지 않았습니다.");
			return NextResponse.json(
				{ error: "백엔드 서버 URL이 설정되지 않았습니다." },
				{ status: 500 },
			);
		}

		console.log("=== 백엔드 요청 시작 ===");
		console.log("URL:", `${backendUrl}/home/news`);
		console.log("Token:", token.substring(0, 20) + "...");

		// 백엔드 서버로 요청 전달
		const backendResponse = await fetch(`${backendUrl}/home/news`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			// body 없이 전송
		});

		console.log("=== 백엔드 응답 ===");
		console.log("Status:", backendResponse.status);
		console.log("Status Text:", backendResponse.statusText);

		if (!backendResponse.ok) {
			const errorText = await backendResponse.text();
			console.error("백엔드 오류 응답:", errorText);
			return NextResponse.json(
				{ error: errorText || "백엔드 서버 오류" },
				{ status: backendResponse.status },
			);
		}

		// 백엔드 응답을 그대로 전달
		const responseData = await backendResponse.text();
		console.log("Response Body:", responseData);

		// 헤더 추출
		const setCookie = backendResponse.headers.get("Set-Cookie");
		const location = backendResponse.headers.get("Location");

		console.log("Set-Cookie:", setCookie);
		console.log("Location:", location);

		const headers: Record<string, string> = {
			"Content-Type": "text/plain",
		};

		if (setCookie) {
			headers["Set-Cookie"] = setCookie;
		}
		if (location) {
			headers["Location"] = location;
		}

		console.log("=== 응답 전달 완료 ===");

		return new NextResponse(responseData, {
			status: backendResponse.status,
			headers,
		});
	} catch (error: any) {
		console.error("=== 요청 실패 ===");
		console.error("Error:", error);
		console.error("Message:", error.message);
		return NextResponse.json(
			{ error: `서버 요청 실패: ${error.message}` },
			{ status: 500 },
		);
	}
}
