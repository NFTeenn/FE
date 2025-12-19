"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import finishQuiz from "@/shared/assets/finishQuiz.svg"


interface QuizData {
  quiz: string | null;
  a: string[] | null;
  result: number;
  quizCount: number;
}

export default function QuizComponent() {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // 퀴즈 데이터 가져오기
  const fetchQuizData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/home");
      if (!res.ok) throw new Error("퀴즈 데이터 가져오기 실패");
      
      const data = await res.json();
      setQuizData(data);
    } catch (error) {
      console.error("퀴즈 데이터 로딩 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    fetchQuizData();
  }, []);

  // 퀴즈 다시 풀기 (컴포넌트만 새로고침)
  const resetQuiz = () => {
    setSelected(null);
    setSubmitted(false);
    fetchQuizData();
  };

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

      // 1초 후 새로운 퀴즈 데이터 가져오기 (페이지 새로고침 대신)
      setTimeout(() => {
        resetQuiz();
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        resetQuiz();
      }, 1000);
    }
  };

  const sendSolveResult = async (solve: boolean) => {
    try {
      const res = await fetch("/api/home", {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-gray-500">퀴즈 로딩 중...</div>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-red-500">퀴즈를 불러올 수 없습니다.</div>
      </div>
    );
  }

  // 퀴즈를 모두 완료한 경우
  if (quizData.quiz === null || quizData.quizCount >= 5) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <Image src={finishQuiz}  alt="퀴즈 완료" height={32} width={32} className="w-32 h-32"/>
        <h3 className="text-xl font-bold text-center">오늘의 퀴즈를 모두 풀었습니다!</h3>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">오늘의 경제 퀴즈</h3>

      <span className="font-[pretendard] font-semibold text-xl">
        {quizData.quiz}
      </span>

      {Array.isArray(quizData.a) ? (
        <div className="mt-3 flex flex-col gap-2">
          {quizData.a.map((option, index) => {
            const getMultipleChoiceClassName = () => {
              if (submitted) {
                if (index === quizData.result) return "bg-green-100 border-green-500";
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
                if (index === quizData.result) return "bg-green-100 border-green-500";
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
            : submitted && selected !== quizData.result
            ? "w-full h-[2.875rem] mt-4 rounded-[27px] font-semibold transition-colors bg-red-500 text-white hover:bg-red-600"
            : "w-full h-[2.875rem] mt-4 rounded-[27px] font-semibold transition-colors bg-blue-500 text-white hover:bg-blue-600"
        }
      >
        {submitted && selected !== quizData.result ? "다시 풀기" : submitted ? "제출 완료" : "제출하기"}
      </button>

      <div className="w-full flex justify-center mt-4">
        <span className="text-[15px] font-semibold font-[pretendard]">
          {quizData.quizCount + 1}/5
        </span>
      </div>
    </div>
  );
}