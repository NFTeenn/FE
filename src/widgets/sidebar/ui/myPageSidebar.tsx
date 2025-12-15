"use client";

import type { MyPageSidebarOperation } from "@/app/(main-layout)/mypage/page";
import X from "@/shared/assets/x";
import { useGetAchievement } from "@/widgets/grow/model/useGetAchievement";
import { useGetCustomItem } from "@/widgets/grow/model/useGetCustomItem";
import { useGetHallOfFame } from "@/widgets/grow/model/useGetHallOfFame";

const Storage = () => {
  const { data: dondons } = useGetHallOfFame();

  if (!dondons?.length)
    return <p className="text-xl text-black/40">졸업한 돈돈이 없습니다.</p>;

  return (
    <>
      {dondons?.map((dondon) => (
        <article key={dondon.gen} className="flex flex-col w-fit">
          <div className="bg-gray-500 min-w-max aspect-[16/10] rounded-2xl"></div>
          <p>{dondon.gen}대 돈돈</p>
          <b>{dondon.nickname}</b>
          <small>
            {dondon.enterDate} ~ {dondon.graduationDate}
          </small>
        </article>
      ))}
    </>
  );
};

const Achievement = () => {
  const { data: achievements } = useGetAchievement();

  if (!achievements?.length)
    return <p className="text-xl text-black/40">업적이 없습니다.</p>;

  return (
    <>
      {achievements?.map((achievement) => (
        <article
          key={achievement.code}
          className="flex flex-col items-center w-fit"
        >
          <p>{achievement.code}</p>
          <b>{achievement.title}</b>
          <small>{achievement.description}</small>
        </article>
      ))}
    </>
  );
};

const Shop = () => {
  const { data: customItems } = useGetCustomItem();

  if (!customItems?.length)
    return <p className="text-xl text-black/40">상품이 없습니다.</p>;

  return (
    <>
      {customItems?.map((customItem) => (
        <article
          key={customItem.id}
          className="flex flex-col items-center w-fit border border-black/20 rounded-2xl p-4"
        >
          <div className="bg-gray-500 min-w-max aspect-[16/10] rounded-2xl"></div>
          <p>{customItem.id}</p>
          <b>{customItem.name}</b>
          <b>{customItem.price}C</b>
          <small>{customItem.description}</small>
          <p className="cursor-pointer">구매하기</p>
        </article>
      ))}
    </>
  );
};

const titles = {
  STORAGE: "졸업한 돈돈",
  ACHIEVEMENT: "업적",
  SHOP: "상점",
};

export default function MyPageSidebar({
  operation,
  setSidebarOpen,
}: {
  operation: MyPageSidebarOperation;
  setSidebarOpen: (operation: MyPageSidebarOperation | null) => void;
}) {
  return (
    <div className="fixed z-50 top-0 right-0 px-8 py-6 min-w-max h-full space-y-8 bg-white">
      <section className="flex justify-between">
        <h3>{titles[operation]}</h3>
        <X
          className="cursor-pointer w-4 h-4"
          onClick={() => {
            setSidebarOpen(null);
          }}
        />
      </section>
      <section className="grid grid-cols-2 gap-8">
        {(() => {
          switch (operation) {
            case "STORAGE":
              return <Storage />;
            case "ACHIEVEMENT":
              return <Achievement />;
            case "SHOP":
              return <Shop />;
            default:
              return null;
          }
        })()}
      </section>
    </div>
  );
}
