import { type NextRequest, NextResponse } from "next/server";
import { getGeminiModel } from "@/shared/lib/gemini";

export async function POST(req: NextRequest) {
	try {
		const { message, history = [] } = await req.json();

		if (!message) {
			return NextResponse.json(
				{ error: "메시지를 입력해주세요." },
				{ status: 400 },
			);
		}

		const model = getGeminiModel();

		// 대화 기록을 Gemini 형식으로 변환
		const conversationHistory = history.slice(-6).map((msg: any) => ({
			role: msg.role === "bot" ? "model" : "user",
			parts: [{ text: msg.content }],
		}));

		const chat = model.startChat({
			history: conversationHistory,
			generationConfig: {
				maxOutputTokens: 300,
				temperature: 0.7,
			},
			systemInstruction: {
				role: "user",
				parts: [
					{
						text: "당신은 친절한 학생들에게 경제관련 단어를 설명해주기 위한 한국어 AI 어시스턴트입니다. 오로지 한국어만 사용을 해야해. 항상 한국어로만 답변해주세요. 답변은 간결하고 명확하게 해주세요.",
					},
				],
			},
		});

		const result = await chat.sendMessage(message);
		const botMessage = result.response.text();

		return NextResponse.json({ bot: botMessage });
	} catch (err: any) {
		console.error(err);
		return NextResponse.json(
			{ error: "챗봇 서버 오류가 발생했습니다." },
			{ status: 500 },
		);
	}
}
