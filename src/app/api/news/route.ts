import { type NextRequest, NextResponse } from 'next/server';

// 뉴스 목록 조회 (GET)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query') || '경제';

    const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { error: '네이버 API 클라이언트 정보가 설정되지 않았습니다' },
        { status: 500 }
      );
    }

    const encodedQuery = encodeURIComponent(query);
    const url = `https://openapi.naver.com/v1/search/news.json?query=${encodedQuery}&display=20&sort=date`;

    const response = await fetch(url, {
      headers: {
        'X-Naver-Client-Id': clientId,
        'X-Naver-Client-Secret': clientSecret,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('네이버 API 오류:', response.status, errorText);
      return NextResponse.json(
        { error: '뉴스를 불러오는데 실패했습니다' },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('뉴스 API 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

// 뉴스 리다이렉트 처리 (POST)
// /api/news/route.ts의 POST 부분
export async function POST(request: NextRequest) {
  try {
    // 세션 ID 생성
    const sessionId = `JSESSIONID_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // body를 단순 텍스트 '1'로 반환 (JSON이 아님)
    const response = new NextResponse('1', {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Set-Cookie': `JSESSIONID=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`,
        'Location': 'https://accounts.google.com/oauth/authorize?client_id=...', // 실제 OAuth URL로 변경
      },
    });
    
    return response;
  } catch (error) {
    console.error('뉴스 리다이렉트 오류:', error);
    return NextResponse.json(
      { error: '처리 실패' },
      { status: 500 }
    );
  }
}