"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useEditDonDonNickName } from "@/entities/dondon/model/useEditDonDonNickName";
import { useGetMyInfo } from "@/entities/user/model/useGetMyInfo";
import bowl from "@/shared/assets/bowl.svg";
import medal from "@/shared/assets/medal.svg";
import { MyPageDondon } from "@/shared/assets/mypage_dondon";
import shop from "@/shared/assets/shop.svg";
import storage from "@/shared/assets/storage.svg";
import { Modal } from "@/widgets/modal/ui";
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
	const { data: myInfo } = useGetMyInfo();
	const { mutate: editNickname } = useEditDonDonNickName();
	const [sidebarOperation, setSidebarOperation] =
		useState<MyPageSidebarOperation | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [nickname, setNickname] = useState(myInfo?.latestDondon.nickname || "");
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		if (myInfo && !isInitialized) {
			setNickname(myInfo.latestDondon.nickname);
			setIsInitialized(true);
		}
	}, [myInfo, isInitialized]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (
			e.key === "Enter" &&
			!e.nativeEvent.isComposing &&
			nickname.length >= 1
		) {
			editNickname({ nickname: String(nickname) });
		}
	};

	return (
		<div className="w-full h-screen flex flex-col overflow-hidden">
			{isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}

			{/* 상단 정보 영역 */}
			<div className="flex w-full bg-brand-b4 h-[50vh] md:h-[70vh]">
				<div className="w-full flex flex-col md:justify-between m-4 md:m-12 overflow-x-hidden">
					{/* 사용자 정보 */}
					<div className="flex flex-col md:flex-row gap-0">
						<div className="flex flex-col items-start justify-center px-4 md:px-8 py-3 md:py-4 h-auto md:h-20 bg-white border border-gray-300 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
							<p className="text-lg md:text-2xl font-semibold">
								{myInfo?.myInfo.username}님
							</p>
							<p className="text-sm md:text-base">
								{myInfo?.myInfo.days}일차 도전중!
							</p>
						</div>
						<div className="flex justify-around md:justify-center items-center gap-4 md:gap-8 px-4 md:px-8 py-3 md:py-4 h-auto md:h-20 bg-white border border-gray-300 border-t-0 md:border-t md:border-l-0">
							<div className="text-center">
								<p className="text-sm md:text-base">맞춘 퀴즈</p>
								<p className="text-xl md:text-2xl font-semibold">
									{myInfo?.myInfo.quizStack}개
								</p>
							</div>
							<div className="text-center">
								<p className="text-sm md:text-base">돈돈</p>
								<p className="text-xl md:text-2xl font-semibold">
									{myInfo?.latestDondon.gen}세대
								</p>
							</div>
							<div className="text-center">
								<p className="text-sm md:text-base">읽은 뉴스</p>
								<p className="text-xl md:text-2xl font-semibold">
									{myInfo?.myInfo.newsStack}개
								</p>
							</div>
						</div>
						<button
							className="px-4 md:px-8 py-3 md:py-4 h-auto md:h-20 bg-white border border-gray-300 border-t-0 md:border-t md:border-l-0 rounded-b-2xl md:rounded-bl-none md:rounded-r-2xl flex items-center justify-center cursor-pointer text-sm md:text-base"
							onClick={() => setIsModalOpen(true)}
						>
							즐겨찾기 목록
						</button>
					</div>

					{/* 카드 목록 */}
					<div className="hidden md:flex flex-col items-end gap-4 mt-auto">
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

			{/* 하단 돈돈 영역 */}
			<div className="flex flex-col justify-end bg-white flex-1 pb-8 md:pb-[3rem] px-4 md:px-[6rem]">
				<section className="relative flex flex-1 gap-4 h-full">
					<div className="absolute bottom-0 left-4 md:left-10">
						<Image src={bowl} alt="bowl" className="w-[30vw] md:w-[19vw]" />
					</div>
					<div className="absolute bottom-0 right-4 md:right-10">
						<MyPageDondon className="w-[35vw] h-fit md:w-[25vw]" />
					</div>
				</section>

				<section className="flex flex-col md:flex-row gap-6 md:flex-1 items-end z-10">
					{/* 코인 및 성장도 */}
					<article className="flex flex-col md:flex-row w-full md:flex-1 items-start gap-4 md:gap-6">
						<div className="flex flex-col w-full md:w-auto md:min-w-40">
							<span className="text-gray-500 mb-2 text-sm md:text-base">
								누적된 코인:
							</span>
							<div className="flex gap-2 h-10 border border-gray-300 rounded-3xl px-4 items-center">
								<div className="w-5 h-5 bg-brand-main rounded-full flex-shrink-0" />
								<p className="text-sm md:text-base">{myInfo?.myInfo.coin}</p>
							</div>
						</div>
						<div className="flex flex-col w-full md:flex-1 md:min-w-[300px]">
							<span className="text-gray-500 mb-2 text-sm md:text-base">
								성장도: {myInfo?.latestDondon.level ?? 0}%
							</span>
							<div className="h-10 border border-gray-300 rounded-3xl px-4 flex items-center">
								<div
									className="h-5 flex items-center justify-center bg-brand-main rounded-full transition-all duration-300"
									style={{ width: `${myInfo?.latestDondon.level ?? 0}%` }}
								/>
							</div>
						</div>
					</article>

					{/* 돈돈 이름 */}
					<article className="flex flex-col items-center md:items-end w-full md:w-auto">
						<div className="w-24 md:w-[6rem] h-6 md:h-[1.5rem] bg-brand-main md:mr-2 rounded-t-md flex items-center justify-center text-xs md:text-sm">
							돈돈의 이름
						</div>
						<div className="text-3xl md:text-6xl font-bold py-4 md:py-6 px-6 md:px-8 bg-white border border-gray-300 rounded-xl inline-flex items-center justify-center w-full md:w-auto">
							<input
								className="outline-none text-center w-full"
								size={nickname?.length || 1}
								value={nickname}
								maxLength={10}
								onChange={(e) => {
									setNickname(e.target.value);
								}}
								onKeyDown={(e) => handleKeyDown(e)}
							/>
						</div>
					</article>
				</section>

				{/* 모바일 카드 목록 - 하단 정렬 */}
				<div className="flex md:hidden justify-around gap-4 mt-6 items-end">
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
								className="w-12 z-10"
							/>
							<div className="w-16 h-10 bg-white border border-black/20 rounded-xl -mt-2 flex items-center justify-center text-xs whitespace-nowrap px-2">
								{item.label}
							</div>
						</button>
					))}
				</div>
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
