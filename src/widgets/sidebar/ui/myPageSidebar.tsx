"use client";

import Image from "next/image";
import type { MyPageSidebarOperation } from "@/app/(main-layout)/mypage/page";
import { useGetHallOfFame } from "@/entities/dondon/model/useGetHallOfFame";
import { useGetAchievement } from "@/entities/user/model/useGetAchievement";
import type { Accessory } from "@/features/shop/model/accessory";
import { usePurchaseCustomItem } from "@/features/shop/model/useBuyAccessory";
import { useGetCustomItem } from "@/features/shop/model/useGetAccessories";
import achievement_logo from "@/shared/assets/achievement_logo.svg";
import { MyPageDondon } from "@/shared/assets/mypage_dondon";
import santas_hat from "@/shared/assets/santas_hat.svg";
import X from "@/shared/assets/x";

const Storage = () => {
	const { data: dondons } = useGetHallOfFame();

	if (!dondons?.length)
		return (
			<p className="text-lg md:text-xl text-black/40 col-span-full text-center py-8">
				졸업한 돈돈이 없습니다.
			</p>
		);

	return (
		<>
			{dondons?.map((dondon) => (
				<article key={dondon.gen} className="flex flex-col w-full">
					<div className="bg-brand-b3 aspect-[16/10] py-4 md:py-6 px-8 md:px-12 rounded-2xl flex items-center justify-center">
						<MyPageDondon className="w-20 h-20 md:w-24 md:h-24" />
					</div>
					<p className="mt-2 text-sm md:text-base">{dondon.gen}대 돈돈</p>
					<b className="text-base md:text-lg">{dondon.nickname}</b>
					<small className="text-xs md:text-sm">
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
		return (
			<p className="text-lg md:text-xl text-black/40 col-span-full text-center py-8">
				업적이 없습니다.
			</p>
		);

	return (
		<>
			{achievements?.map((achievement) => (
				<article
					key={achievement.code}
					className="flex flex-col items-center w-full"
				>
					<Image
						src={achievement_logo}
						alt="achievement"
						className="w-16 h-16 md:w-20 md:h-20"
					/>
					<b className="mt-2 text-sm md:text-base text-center">
						{achievement.title}
					</b>
					<small className="text-black/40 text-xs md:text-sm text-center">
						{achievement.description}
					</small>
				</article>
			))}
		</>
	);
};

const ShopItem = ({ customItem }: { customItem: Accessory }) => {
	const { mutate: buyCustomItem, isPending: isBuyingCustomItem } =
		usePurchaseCustomItem();

	return (
		<article className="flex flex-col items-center w-full border border-black/20 rounded-2xl">
			<div className="w-full px-4 md:px-8 py-3 md:py-4 flex flex-col items-center">
				<Image
					src={santas_hat}
					alt="santa"
					className="mt-2 w-16 h-16 md:w-20 md:h-20"
				/>
				<b className="mt-2 text-sm md:text-base text-center">
					{customItem.name}
				</b>
				<small className="text-black/40 text-xs md:text-sm text-center">
					{customItem.description}
				</small>
				<b className="text-[#fb923c] text-sm md:text-base mt-1">
					{customItem.price}C
				</b>
			</div>
			<button
				className={`w-full text-center border-t border-black/20 p-2 text-sm md:text-base ${customItem.owned ? "text-black/40 cursor-not-allowed" : "text-black cursor-pointer"}`}
				onClick={() => {
					buyCustomItem({
						accId: customItem.id,
					});
				}}
				disabled={customItem.owned || isBuyingCustomItem}
			>
				{customItem.owned
					? "보유 중"
					: isBuyingCustomItem
						? "구매중..."
						: "구매하기"}
			</button>
		</article>
	);
};

const Shop = () => {
	const { data: customItems } = useGetCustomItem();

	if (!customItems?.length)
		return (
			<p className="text-lg md:text-xl text-black/40 col-span-full text-center py-8">
				상품이 없습니다.
			</p>
		);

	return (
		<>
			{customItems?.map((customItem) => (
				<ShopItem key={customItem.id} customItem={customItem} />
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
		<>
			{/* 모바일: 오버레이 배경 */}
			<button
				className="fixed inset-0 bg-black/20 z-40 md:hidden"
				onClick={() => setSidebarOpen(null)}
			/>

			{/* 사이드바 */}
			<div className="fixed z-50 top-0 right-0 w-full md:w-auto md:min-w-[500px] lg:min-w-[600px] h-full bg-white overflow-y-auto">
				<div className="px-4 md:px-8 py-4 md:py-6 space-y-6 md:space-y-8">
					<section className="flex justify-between items-center sticky top-0 bg-white pb-4 border-b border-black/10">
						<h3 className="text-xl md:text-2xl font-bold">
							{titles[operation]}
						</h3>
						<X
							className="cursor-pointer w-5 h-5 md:w-4 md:h-4"
							onClick={() => {
								setSidebarOpen(null);
							}}
						/>
					</section>
					<section className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 pb-6">
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
			</div>
		</>
	);
}
