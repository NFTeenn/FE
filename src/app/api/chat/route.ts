import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json();
    
    if (!message) {
      return NextResponse.json({ error: "메시지를 입력해주세요." }, { status: 400 });
    }

    const conversationHistory = history.slice(-6).map((msg: any) => ({
      role: msg.role === "bot" ? "assistant" : msg.role,
      content: msg.content
    }));

    const apiRes = await fetch("http://localhost:4891/v1/chat/completions", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "Llama 3 8B Instruct",
        messages: [
          { 
            role: "system", 
            content: "당신은 친절한 학생들에게 경제관련 단어를 설명해주기 위한 한국어 AI 어시스턴트입니다. 오로지 한국어만 사용을 해야해. 항상 한국어로만 답변해주세요. 답변은 간결하고 명확하게 해주세요."
          },
          ...conversationHistory,
          { 
            role: "user", 
            content: message 
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!apiRes.ok) {
      return NextResponse.json(
        { error: "챗봇 서버 오류가 발생했습니다." }, 
        { status: 500 }
      );
    }

    const data = await apiRes.json();
    const botMessage = data.choices?.[0]?.message?.content || "응답 없음";

    return NextResponse.json({ bot: botMessage });
    
  } catch (err) {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." }, 
      { status: 500 }
    );
  }
}