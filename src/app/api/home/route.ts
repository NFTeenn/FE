import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { instance } from "@/shared/api/instance";

// 퀴즈 데이터 가져오기
export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("idToken")?.value;

        if (!token) {
            return NextResponse.json({ error: "token이 없습니다." }, { status: 401 });
        }

        // 백엔드 API 호출
        const response = await instance.post(
            "/home",
            {
                token: token,
                solve: false,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );

        // 응답 데이터 확인
        if (!response.data) {
            return NextResponse.json(
                { error: "서버에서 데이터를 받지 못했습니다." },
                { status: 500 },
            );
        }

        // 에러 속성이 있는 경우
        if (
            response.data &&
            typeof response.data === "object" &&
            "error" in response.data
        ) {
            return NextResponse.json(
                { error: response.data.error },
                { status: response.status >= 400 ? response.status : 500 },
            );
        }

        // 성공 응답 반환
        return NextResponse.json(response.data);
    } catch (err: any) {
        console.error("Home API fetch error:", err);

        // 에러 메시지 추출
        let errorMessage = "데이터를 불러오는데 실패했습니다.";

        if (err.response?.data) {
            if (typeof err.response.data === "string") {
                errorMessage = err.response.data;
            } else if (err.response.data.error) {
                errorMessage = err.response.data.error;
            } else if (err.response.data.message) {
                errorMessage = err.response.data.message;
            }
        } else if (err.message) {
            errorMessage = err.message;
        }

        return NextResponse.json(
            { error: errorMessage },
            { status: err.response?.status || 500 },
        );
    }
}

// 퀴즈 결과 제출
export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("idToken")?.value;

        if (!token) {
            return NextResponse.json({ error: "token이 없습니다." }, { status: 401 });
        }

        // 요청 바디에서 solve 값 가져오기
        const body = await request.json();
        const { solve } = body;

        if (typeof solve !== "boolean") {
            return NextResponse.json(
                { error: "solve 값이 유효하지 않습니다." },
                { status: 400 }
            );
        }

        // 백엔드 API 호출
        const response = await instance.post(
            "/home",
            {
                token: token,
                solve: solve,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );

        // 응답 데이터 확인
        if (!response.data) {
            return NextResponse.json(
                { error: "서버에서 데이터를 받지 못했습니다." },
                { status: 500 },
            );
        }

        // 에러 속성이 있는 경우
        if (
            response.data &&
            typeof response.data === "object" &&
            "error" in response.data
        ) {
            return NextResponse.json(
                { error: response.data.error },
                { status: response.status >= 400 ? response.status : 500 },
            );
        }

        // 성공 응답 반환
        return NextResponse.json(response.data);
    } catch (err: any) {
        console.error("Home API submit error:", err);

        // 에러 메시지 추출
        let errorMessage = "퀴즈 결과 전송에 실패했습니다.";

        if (err.response?.data) {
            if (typeof err.response.data === "string") {
                errorMessage = err.response.data;
            } else if (err.response.data.error) {
                errorMessage = err.response.data.error;
            } else if (err.response.data.message) {
                errorMessage = err.response.data.message;
            }
        } else if (err.message) {
            errorMessage = err.message;
        }

        return NextResponse.json(
            { error: errorMessage },
            { status: err.response?.status || 500 },
        );
    }
}