"use client";

import MissionListComponent from "@/widgets/home/mission";
import ProcessComponent from "@/widgets/home/process";
import MiniDictionaryList from "@/widgets/home/dictionary";
import QuizComponent from "@/widgets/home/quiz";
import type { HomeData } from "@/types/home/";

export default function Main() {
  // API 호출 제거: 스펙 예시를 그대로 사용
  const homeData: HomeData = {
    day: 1,
    level: 2,
    mission: ["1", "1", "0", "0"],
    quizCount: 3,
    quiz: "다음 중 헤징(Hedging)에 관한 설명으로 옳지 않은 것은 무엇인가?",
    a: [
      "파생상품을 이용하여 현물과 반대되는 포지션을 설정하는 것이다.",
      "어느 한 쪽의 손실이 다른 쪽의 이익으로 서로 상쇄된다.",
      "헤징은 옵션을 이용해서는 불가능하다.",
      "매입헤지(Long Hedge)와 매도헤지(Short Hedge)로 구분된다.",
    ],
    words: [
      "30-50클럽",
      "Barclays Global Aggregate",
      "1인 창조기업",
      "AEO(Authorized Economic Operator, 수출입 안전관리 우수 공인업체)",
      "BIC",
      "20-20-20 계획",
    ],
    result: 2,
    content:
      "헤징은 옵션을 이용해서도 가능하다. 현물가격의 하락위험을 방지하기 위해 풋옵션을 매입(Protective Put)하거나 콜옵션을 매도(Covered Call)해 위험을 헤지할 수 있다.",
  };

  const titles = [
    "돈돈 출석체크 하기",
    "오늘의 단어 퀴즈 풀기",
    "돈돈 경제 뉴스 보기",
    "돈돈 경제 단어 검색하기",
  ];

  return (
    <>
      <Sidebar />

      <div className="w-screen min-h-screen bg-gray-50 flex flex-row gap-[5vw] pl-64 py-[4vh]">
        {/* 가운데 섹션 */}
        <div className="w-[920px] h-auto flex flex-col ml-20 gap-4">
          {/* 진행사항 */}
          <div className="w-full h-[250px] rounded-2xl border border-black/20 bg-brand-b3">
            <ProcessComponent
              sequenceDays={homeData.day}
              level={homeData.level}
            />
          </div>

          {/* 사전 */}
          <div className="w-full h-auto px-[3rem] pt-[1rem] rounded-2xl border border-black/20 bg-white pb-8">
            <h2 className="text-xl font-semibold">경제 사전</h2>

            <input
              className="w-full h-[3rem] rounded-[18px] border border-black/20 pl-4 mt-4"
              placeholder="경제 단어 검색하기"
            />

            <MiniDictionaryList words={homeData.words ?? []} />
          </div>

          {/* 뉴스 */}
          <div className="w-full h-[620px] rounded-2xl border border-black/20 bg-white p-6">
            <h2 className="text-xl font-semibold mb-4">경제 뉴스</h2>
          </div>
        </div>

        {/* 오른쪽 섹션 */}
        <div className="w-[360px] h-auto gap-10 flex flex-col">
          {/* 데일리 미션 */}
          <div className="w-full h-[20rem] bg-white rounded-[1.125rem] border border-black/20 flex flex-col pt-[1.75rem] pl-[2rem]">
            <span className="text-[1rem] font-semibold">Daily 미션</span>
            <hr className="w-[calc(100%+2rem)] border-t border-black/20 ml-[-2rem] mt-4" />

            <div className="flex flex-col w-[80%] items-center mt-4">
              {titles.map((title, index) => (
                <MissionListComponent
                  key={index}
                  title={title}
                  cleared={homeData.mission?.[index] ?? "0"}
                />
              ))}
            </div>
          </div>

          {/* 일일 경제 퀴즈 */}
          <div className="w-full h-auto bg-white rounded-[1.125rem] border border-black/20 flex flex-col p-6">
            <QuizComponent
              quiz={homeData.quiz ?? ""}
              a={homeData.a ?? null}
              result={homeData.result ?? 0}
              count={homeData.quizCount ?? 0}
            />
          </div>
        </div>
      </div>
    </>
  );
}