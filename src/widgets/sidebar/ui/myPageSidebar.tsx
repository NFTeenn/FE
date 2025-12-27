"use client";

import Image from "next/image";
import achievement_logo from "src/shared/assets/achievement_logo.svg";
import dondon_logo from "src/shared/assets/mypage_dondon.svg";
import santas_hat from "src/shared/assets/santas_hat.svg";
import type { MyPageSidebarOperation } from "@/app/(main-layout)/mypage/page";
import { useGetHallOfFame } from "@/entities/dondon/model/useGetHallOfFame";
import { useGetAchievement } from "@/entities/user/model/useGetAchievement";
import type { Accessory } from "@/features/shop/model/accessory";
import { usePurchaseCustomItem } from "@/features/shop/model/useBuyAccessory";
import { useGetCustomItem } from "@/features/shop/model/useGetAccessories";
import X from "@/shared/assets/x";

const Storage = () => {
	const { data: dondons } = useGetHallOfFame();

	if (!dondons?.length)
		return <p className="text-xl text-black/40">졸업한 돈돈이 없습니다.</p>;

	return (
		<>
			{dondons?.map((dondon) => (
				<article key={dondon.gen} className="flex flex-col w-fit">
					<div className="bg-brand-b3 aspect-[16/10] py-6 px-16 rounded-2xl">
						<Image src={dondon_logo} alt="dondon" className="object-cover" />
					</div>
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
					<Image src={achievement_logo} alt="achievement" />
					<b>{achievement.title}</b>
					<small className="text-black/40">{achievement.description}</small>
				</article>
			))}
		</>
	);
};

const ShopItem = ({ customItem }: { customItem: Accessory }) => {
	const { mutate: buyCustomItem, isPending: isBuyingCustomItem } =
		usePurchaseCustomItem();

	return (
		<article className="flex flex-col items-center w-fit border border-black/20 rounded-2xl">
			<div className="w-full px-8 py-4 flex flex-col items-center">
				<div className="bg-gray-500 min-w-max aspect-[16/10] rounded-2xl"></div>
				<Image src={santas_hat} alt="santa" />
				<b>{customItem.name}</b>
				<small className="text-black/40">{customItem.description}</small>
				<b className="text-[#fb923c]">{customItem.price}C</b>
			</div>
			<button
				className={`w-full text-center border-t border-black/20 p-2 ${customItem.owned ? "text-black/40 cursor-not-allowed" : "text-black cursor-pointer"}`}
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
		return <p className="text-xl text-black/40">상품이 없습니다.</p>;

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
			<section className="grid grid-cols-2 gap-8 min-w-sm max-w-xl">
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
