"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import bowl from "src/shared/assets/bowl.svg";
import medal from "src/shared/assets/medal.svg";
import shop from "src/shared/assets/shop.svg";
import storage from "src/shared/assets/storage.svg";
import { useEditDonDonNickName } from "@/entities/dondon/model/useEditDonDonNickName";
import { useGetMyInfo } from "@/entities/user/model/useGetMyInfo";
import { MyPageDondon } from "@/shared/assets/mypage_dondon";
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
	const [sidebarOperation, setSidebarOperation] = useState<MyPageSidebarOperation | null>(null);
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
		<div className="w-full h-screen flex flex-col">
			{isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
			<div className="flex w-full bg-brand-b4 h-[70vh]">
				<div className="w-full flex justify-between m-12">
					<div className="flex">
						<div className="flex flex-col items-start justify-center px-8 py-4 h-20  bg-white border border-gray-300 rounded-l-2xl">
							<p className="text-2xl font-semibold">
								{myInfo?.myInfo.username}님
							</p>
							<p>{myInfo?.myInfo.days}일차 도전중!</p>
						</div>
						<div className="flex justify-center items-center gap-8 px-8 py-4  h-20 bg-white border border-gray-300">
							<div>
								<p>맞춘 퀴즈</p>
								<p className="text-2xl font-semibold">
									{myInfo?.myInfo.quizStack}개
								</p>
							</div>
							<div>
								<p>돈돈</p>
								<p className="text-2xl font-semibold">
									{myInfo?.latestDondon.gen}세대
								</p>
							</div>
							<div>
								<p>읽은 뉴스</p>
								<p className="text-2xl font-semibold">
									{myInfo?.myInfo.newsStack}개
								</p>
							</div>
						</div>
						<button
							className="px-8 py-4 h-20 bg-white border border-gray-300 rounded-r-2xl flex items-center justify-center cursor-pointer"
							onClick={() => setIsModalOpen(true)}
						>
							즐겨찾기 목록
						</button>
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
						<Image src={bowl} alt="bowl" className="w-[19vw]" />
					</div>

					<div className="absolute -top-60 right-30">
						<MyPageDondon className="w-[25vw]" />
					</div>
				</section>
				<section className="flex flex-1 items-end ">
					<article className="flex flex-1 items-start gap-6">
						<div className="flex flex-col min-w-40">
							<span className="text-gray-500 mb-2">누적된 코인:</span>
							<div className="flex gap-2 h-10 border border-gray-300 rounded-3xl px-4 items-center">
								<div className="w-5 h-5 bg-brand-main rounded-full" />
								<p>{myInfo?.myInfo.coin}</p>
							</div>
						</div>

						<div className="flex flex-col min-w-120">
							<span className="text-gray-500 mb-2">성장도:</span>
							<div className="h-10 border border-gray-300 rounded-3xl px-4 flex items-center">
								<div
									className="h-5 flex items-center justify-center bg-brand-main rounded-full transition-all duration-300"
									style={{ width: `${myInfo?.latestDondon.level ?? 0}%` }}
								>
									<div className="bg-brand text-xs font-medium text-white text-center p-0.5 leading-none rounded-full h-4 flex items-center justify-center">
										{myInfo?.latestDondon.level ?? 0}%
									</div>
								</div>
							</div>
						</div>
					</article>

					<article className="flex flex-col items-end">
						<div className="w-[6rem] h-[1.5rem] bg-brand-main mr-2 rounded-t-md flex items-center justify-center">
							돈돈의 이름
						</div>
						<div className="text-6xl font-bold py-6 px-8 bg-white border border-gray-300 rounded-xl inline-flex items-center justify-center">
							<input
								className="outline-none text-center"
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
