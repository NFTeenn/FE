"use client"

import X from "@/shared/assets/x";
import { useGetAchievement } from "@/widgets/grow/model/useGetAchievement";
import { useGetCustomItem } from "@/widgets/grow/model/useGetCustomItem";
import { useGetHallOfFame } from "@/widgets/grow/model/useGetHallOfFame";

export default function MyPageSidebar() {

  const { data: dondons = [{
    gen: 1,
    nickname: "서정민",
    level: 3,
    enterDate: "2025-09-17",
    graduationDate: "2025-09-17",
    style: 1
  }, {
    gen: 2,
    nickname: "정민이",
    level: 12,
    enterDate: "2025-09-17",
    graduationDate: "2025-09-18",
    style: 3
  }] } = useGetHallOfFame();

  const { data: achievements = [{
    code: "FIRST_DONDON",
    title: "첫돈돈",
    description: "돈돈이를 처음 분양했어요!",
    achieved: true
  }] } = useGetAchievement();

  const { data: customItems = [{
    id: 1,
    name: "반짝이 모자",
    description: "특별한 모자",
    price: 100
  }] } = useGetCustomItem();

  return (
    <div className="fixed z-50 top-0 right-0 px-8 py-6 min-w-max h-full space-y-8 bg-white">
      <section className="flex justify-between">
        <h3>졸업한 돈돈</h3>
        <X className="cursor-pointer w-4 h-4" onClick={() => { }} />
      </section>
      <section className="grid grid-cols-2 gap-8">
        {dondons?.map((dondon) => (
          <article key={dondon.gen} className="flex flex-col w-fit">
            <div className="bg-gray-500 min-w-max aspect-[16/10] rounded-2xl"></div>
            <p>{dondon.gen}대 돈돈</p>
            <b>{dondon.nickname}</b>
            <small>{dondon.enterDate} ~ {dondon.graduationDate}</small>
          </article>
        ))}
        {achievements?.map((achievement) => (
          <article key={achievement.code} className="flex flex-col items-center w-fit">
            <div className="bg-gray-500 min-w-max aspect-[16/10] rounded-2xl"></div>
            <p>{achievement.code}</p>
            <b>{achievement.title}</b>
            <small>{achievement.description}</small>
          </article>
        ))}
        {customItems?.map((customItem) => (
          <article key={customItem.id} className="flex flex-col items-center w-fit border border-black/20 rounded-2xl p-4">
            <div className="bg-gray-500 min-w-max aspect-[16/10] rounded-2xl"></div>
            <p>{customItem.id}</p>
            <b>{customItem.name}</b>
            <b>{customItem.price}C</b>
            <small>{customItem.description}</small>
            <p className="cursor-pointer">구매하기</p>
          </article>
        ))}
      </section>
    </div>
  )
}
