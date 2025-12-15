"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface QuizComponentProps {
  quiz: string;
  a: string[] | null; // null = OX, array = 4지선다
  result: number;     // 정답 인덱스 (OX: 0=O, 1=X)
  count: number;
}

export default function QuizComponent({
  quiz,
  a,
  result,
  count,
}: QuizComponentProps) {
  const router = useRouter();

  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // 보기 선택 처리
  const handleSelect = async (index: number) => {
    if (submitted) return;

    setSelected(index);
    setSubmitted(true);

    const isCorrect = index === result;

    if (isCorrect) {
      await sendSolveResult(true);

      // ✅ 깜빡임 거의 없는 새로고침
      setTimeout(() => {
        router.refresh();
      }, 200);
    }
  };

  // 퀴즈 해결 결과 전송
  const sendSolveResult = async (solve: boolean) => {
    try {
      const res = await fetch("/api/quiz/solve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: "google_id_token",
          email: "s24026@gsm.hs.kr",
          solve: solve,
        }),
      });

      if (!res.ok) {
        throw new Error("퀴즈 결과 전송 실패");
      }
    } catch (error) {
      console.error("퀴즈 결과 전송 오류:", error);
    }
  };

  return (
    <>
      <h3 className="text-lg font-semibold mb-4">오늘의 경제 퀴즈</h3>

      {/* 질문 */}
      <span className="font-[pretendard] font-semibold text-xl">
        {quiz}
      </span>

      {/* 보기 렌더링 */}
      {Array.isArray(a) ? (
        // 4지선다형
        <div className="mt-3 flex flex-col gap-2">
          {a.map((option, index) => (
            <button
              key={index}
              disabled={submitted}
              onClick={() => handleSelect(index)}
              className={`w-full h-[2.875rem] pl-4 text-left rounded-[27px] border transition-colors
                ${
                  submitted
                    ? index === result
                      ? "bg-green-100 border-green-500"
                      : index === selected
                      ? "bg-red-100 border-red-500"
                      : "bg-brand-bg border-black/20"
                    : "bg-brand-bg border-black/20 hover:bg-brand-b2"
                }
              `}
            >
              {index + 1}. {option}
            </button>
          ))}
        </div>
      ) : (
        // OX 퀴즈
        <div className="mt-3 flex gap-4">
          {["O", "X"].map((label, index) => (
            <button
              key={label}
              disabled={submitted}
              onClick={() => handleSelect(index)}
              className={`w-full h-[2.875rem] rounded-[27px] border transition-colors
                ${
                  submitted
                    ? index === result
                      ? "bg-green-100 border-green-500"
                      : index === selected
                      ? "bg-red-100 border-red-500"
                      : "bg-brand-bg border-black/20"
                    : "bg-brand-bg border-black/20 hover:bg-brand-b2"
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* 오늘 퀴즈 푼 횟수 */}
      <div className="w-full flex justify-center mt-4">
        <span className="text-[15px] font-semibold font-[pretendard]">
          {count + 1}/5
        </span>
      </div>
    </>
  );
}
