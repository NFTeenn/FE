import { NextResponse } from "next/server";
import { getGeminiModel } from "@/shared/lib/gemini";

export async function POST(req: Request) {
	try {
		const { word, description } = await req.json();

		if (!word || !description) {
			return NextResponse.json(
				{ error: "단어와 설명이 필요합니다." },
				{ status: 400 },
			);
		}

		const model = getGeminiModel();

		const prompt = `
      다음 경제 단어에 대해 요약과 유의어를 추천해줘.
      - 단어: ${word}
      - 기존 설명: ${description}

      요구사항:
      1. 요약은 경제 입문자의 눈높이에 맞춰 1~2문장으로 쉽고 핵심만 설명해줘.
      2. 유의어는 해당 단어와 경제적 맥락에서 유사한 단어 4개를 배열 형태로 추천해줘.
      3. 반드시 다음 JSON 형식을 유지해줘:
      {
        "summary": "요약 내용",
        "synonyms": ["단어1", "단어2", "단어3", "단어4"]
      }
    `;

		const result = await model.generateContent(prompt);
		const response = result.response;
		const text = response.text();

		return NextResponse.json(JSON.parse(text));
	} catch (error) {
		console.error("Gemini API Error:", error);
		return NextResponse.json(
			{ error: "AI 요약 생성 중 오류가 발생했습니다." },
			{ status: 500 },
		);
	}
}
