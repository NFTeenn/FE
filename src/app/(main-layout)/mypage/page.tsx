import Image from "next/image";
import bowl from "src/shared/assets/bowl.svg";
import dondon from "src/shared/assets/mypage_dondon.svg";
import storage from "src/shared/assets/storage.svg";
import medal from "src/shared/assets/medal.svg";
import shop from "src/shared/assets/shop.svg";
import MyPageSidebar from "@/widgets/sidebar/ui/myPageSidebar";

export default function MyPage() {
  return (
    <div className="w-full h-screen flex flex-col overflow-hidden fixed">

      {/* 상단 영역 */}
      <div className="flex w-full bg-brand-b4 relative h-[70vh]">
        <div className="absolute inset-0 pointer-events-none">

          {/* 즐겨찾기 박스 */}
          <div className="absolute top-[3vh] left-1/2 -translate-x-[45vw] flex w-[40%] z-[99]">

            <div className="flex-1 h-20  bg-white border border-gray-300 rounded-l-2xl" />
            <div className="flex-1 h-20  bg-white border border-gray-300" />
            <div className="flex-1 h-20  bg-white border border-gray-300 rounded-r-2xl flex items-center justify-center">
              즐겨찾기목록
            </div>
          </div>

          <div className="absolute right-0  bottom-[3vw] mr-[20vw] flex flex-col items-center gap-[2vw] z-[999]">

            {/* 공통 카드 컴포넌트 구조 */}
            {[
              { img: storage, label: "독립한 돈돈", size: 50 },
              { img: medal, label: "업적", size: 45 },
              { img: shop, label: "상점", size: 40 },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <Image src={item.img} alt={item.label} width={item.size} height={item.size} className="w-[4rem] z-10" />
                <div className="w-20 h-12 bg-white border border-black/20 rounded-xl -mt-3 
                                flex items-center justify-center text-sm">
                  {item.label}
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* 캐릭터 */}
        <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 z-[999] ">
          <Image src={dondon} alt="dondon" className="w-[25vw] h-auto pointer-events-none"
          />
        </div>

        {/* Bowl */}
        <div className="absolute bottom-[-10%] left-[20%] -translate-x-1/2 z-[999] ">
          <Image src={bowl} alt="bowl" className="w-[19vw] h-auto pointer-events-none" />
        </div>
      </div>


      {/* 하단 정보 박스 */}
      <div className="w-full bg-white h-[30vh]
                      py-8 px-6 sm:px-10 md:px-16 flex flex-col  gap-8 relative">

        <div className="flex flex-row w-full items-start gap-6 mt-[2%]">

          {/* 누적 코인 */}
          <div className="flex flex-col w-[13%] ">
            <span className="text-gray-500 mb-2">누적된 코인:</span>
            <div className="h-10 border border-gray-300 rounded-3xl px-4 flex items-center">
              <div className="w-5 h-5 bg-brand-main rounded-full" />
            </div>
          </div>

          {/* 성장도 */}
          <div className="flex flex-col w-[30%]">
            <span className="text-gray-500 mb-2">성장도:</span>
            <div className="h-10 border border-gray-300 rounded-3xl px-4 flex items-center">
              <div className="w-5 h-5 bg-brand-main rounded-full" />
            </div>
          </div>
        </div>

        {/* 돈돈 이름 박스 */}
        <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 ml-[20%]">
          <div className="w-[6rem] h-[1.5rem] bg-brand-main rounded-t-md flex items-center justify-center mx-auto">
            돈돈의 이름
          </div>
          <div className="w-[10rem] h-[3.5rem] bg-white border border-gray-300 rounded-xl flex items-center justify-center">
            이름
          </div>
        </div>
      </div>
      <MyPageSidebar />

    </div>
  );
}
