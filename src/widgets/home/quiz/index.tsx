"use client";

import { useState } from "react";

interface QuizComponentProps {
  quiz: string;
  a: string[] | null;
  result: number;
  count: number;
}

export default function QuizComponent({
  quiz,
  a,
  result,
  count,
}: QuizComponentProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (index: number) => {
    if (submitted) return;
    setSelected(index);
  };

  const handleSubmit = async () => {
    if (selected === null || submitted) return;

    setSubmitted(true);

    try {
      // 문제를 풀기만 하면 무조건 true
      await sendSolveResult(true);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };


  const sendSolveResult = async (solve: boolean) => {
    try {
      const res = await fetch("/home", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          solve: solve,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "퀴즈 결과 전송 실패");
      }

      return await res.json();
    } catch (error) {
      console.error("퀴즈 결과 전송 오류:", error);
      throw error;
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">오늘의 경제 퀴즈</h3>

      <span className="font-[pretendard] font-semibold text-xl">
        {quiz}
      </span>

      {Array.isArray(a) ? (
        <div className="mt-3 flex flex-col gap-2">
          {a.map((option, index) => {
            const getMultipleChoiceClassName = () => {
              if (submitted) {
                if (index === result) return "bg-green-100 border-green-500";
                if (index === selected) return "bg-red-100 border-red-500";
                return "bg-brand-bg border-black/20";
              }
              if (selected === index) return "bg-brand-b2 border-black/40";
              return "bg-brand-bg border-black/20 hover:bg-brand-b2";
            };
            
            return (
              <button
                key={index}
                disabled={submitted}
                onClick={() => handleSelect(index)}
                className={`w-full h-[2.875rem] pl-4 text-left rounded-[27px] border transition-colors ${getMultipleChoiceClassName()}`}
              >
                {index + 1}. {option}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="mt-3 flex gap-4">
          {["O", "X"].map((label, index) => {
            const getOXClassName = () => {
              if (submitted) {
                if (index === result) return "bg-green-100 border-green-500";
                if (index === selected) return "bg-red-100 border-red-500";
                return "bg-brand-bg border-black/20";
              }
              if (selected === index) return "bg-brand-b2 border-black/40";
              return "bg-brand-bg border-black/20 hover:bg-brand-b2";
            };
            
            return (
              <button
                key={label}
                disabled={submitted}
                onClick={() => handleSelect(index)}
                className={`w-full h-[2.875rem] rounded-[27px] border transition-colors font-semibold ${getOXClassName()}`}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={selected === null}
        className={
          selected === null
            ? "w-full h-[2.875rem] mt-4 rounded-[27px] font-semibold transition-colors bg-gray-300 text-gray-500 cursor-not-allowed"
            : submitted && selected !== result
            ? "w-full h-[2.875rem] mt-4 rounded-[27px] font-semibold transition-colors bg-red-500 text-white hover:bg-red-600"
            : "w-full h-[2.875rem] mt-4 rounded-[27px] font-semibold transition-colors bg-blue-500 text-white hover:bg-blue-600"
        }
      >
        {submitted && selected !== result ? "다시 풀기" : submitted ? "제출 완료" : "제출하기"}
      </button>

      <div className="w-full flex justify-center mt-4">
        <span className="text-[15px] font-semibold font-[pretendard]">
          {count + 1}/5
        </span>
      </div>
    </div>
  );
}