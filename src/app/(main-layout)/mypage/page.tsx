"use client";

import Image from "next/image";
import { useState } from "react";
import bowl from "src/shared/assets/bowl.svg";
import medal from "src/shared/assets/medal.svg";
import dondon from "src/shared/assets/mypage_dondon.svg";
import shop from "src/shared/assets/shop.svg";
import storage from "src/shared/assets/storage.svg";
import MyPageSidebar from "@/widgets/sidebar/ui/myPageSidebar";

export type MyPageSidebarOperation = "STORAGE" | "ACHIEVEMENT" | "SHOP";

interface Card {
  id: number;
  img: string;
  label: string;
  size: number;
  method: MyPageSidebarOperation;
}

const cardList: Card[] = [
  {
    id: 1,
    img: storage,
    label: "독립한 돈돈",
    size: 50,
    method: "STORAGE",
  },
  {
    id: 2,
    img: medal,
    label: "업적",
    size: 45,
    method: "ACHIEVEMENT",
  },
  {
    id: 3,
    img: shop,
    label: "상점",
    size: 40,
    method: "SHOP",
  },
];

export default function MyPage() {
  const [sidebarOperation, setSidebarOperation] = useState<MyPageSidebarOperation | null>(null);

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex w-full bg-brand-b4 h-[70vh]">
        <div className="w-full flex justify-between m-12">

          <div className="flex w-240">
            <div className="flex-1 h-20  bg-white border border-gray-300 rounded-l-2xl" />
            <div className="flex-1 h-20  bg-white border border-gray-300" />
            <div className="flex-1 h-20  bg-white border border-gray-300 rounded-r-2xl flex items-center justify-center">
              즐겨찾기목록
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {cardList.map((item) => (
              <button
                type="button"
                key={item.id}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => {
                  setSidebarOperation(item.method);
                }}
              >
                <Image
                  src={item.img}
                  alt={item.label}
                  width={item.size}
                  height={item.size}
                  className="w-[4rem] z-10"
                />
                <div className="w-20 h-12 bg-white border border-black/20 rounded-xl -mt-3 flex items-center justify-center text-sm">
                  {item.label}
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>

      <div className="flex flex-col justify-end bg-white flex-1 pb-[3rem] px-[6rem]">
        <section className="relative flex flex-1 h-full">
          <div className="absolute -top-5 left-30">
            <Image
              src={bowl}
              alt="bowl"
              className="w-[19vw]"
            />
          </div>

          <div className="absolute -top-60 right-30">
            <Image
              src={dondon}
              alt="dondon"
              className="w-[25vw]"
            />
          </div>

        </section>
        <section className="flex flex-1 items-end ">
          <article className="flex flex-1 items-start gap-6">

            <div className="flex flex-col min-w-40">
              <span className="text-gray-500 mb-2">누적된 코인:</span>
              <div className="h-10 border border-gray-300 rounded-3xl px-4 flex items-center">
                <div className="w-5 h-5 bg-brand-main rounded-full" />
              </div>
            </div>

            <div className="flex flex-col min-w-120">
              <span className="text-gray-500 mb-2">성장도:</span>
              <div className="h-10 border border-gray-300 rounded-3xl px-4 flex items-center">
                <div className="w-5 h-5 bg-brand-main rounded-full" />
              </div>
            </div>
          </article>

          <article className="flex flex-col">
            <div className="w-[6rem] h-[1.5rem] bg-brand-main rounded-t-md flex items-center justify-center">
              돈돈의 이름
            </div>
            <div className="w-[10rem] h-[3.5rem] bg-white border border-gray-300 rounded-xl flex items-center justify-center">
              이름
            </div>
          </article>
        </section>

      </div>
      {sidebarOperation && (
        <MyPageSidebar
          operation={sidebarOperation}
          setSidebarOpen={setSidebarOperation}
        />
      )}
    </div>
  );
}
