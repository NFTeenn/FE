"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo from "@/shared/assets/logo.svg";
import { logout } from "@/shared/lib/logout";

export default function NavigationSidebar() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	const menuItems = [
		{
			name: "메인페이지",
			path: "/main",
		},
		{
			name: "경제사전",
			path: "/dictionary",
		},
		{
			name: "경제뉴스",
			path: "/news",
		},
		{
			name: "돈돈이 & 마이페이지",
			path: "/mypage",
		},
	];

	return (
		<>
			{/* 모바일 햄버거 버튼 */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5 bg-white rounded-lg border border-gray-300 cursor-pointer"
				aria-label="메뉴 열기"
			>
				<span
					className={`w-6 h-0.5 bg-gray-700 transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`}
				></span>
				<span
					className={`w-6 h-0.5 bg-gray-700 transition-opacity ${isOpen ? "opacity-0" : ""}`}
				></span>
				<span
					className={`w-6 h-0.5 bg-gray-700 transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
				></span>
			</button>

			{/* 모바일 오버레이 */}
			{isOpen && (
				<button
					onClick={() => setIsOpen(false)}
					className="lg:hidden fixed inset-0 bg-black/50 z-30"
				></button>
			)}

			{/* 사이드바 */}
			<div
				className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-300 flex flex-col items-center gap-10 py-10 px-6 z-40 transition-transform duration-300 ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				} lg:translate-x-0`}
			>
				<Image src={logo} alt="logo" width={100} height={100} />
				<div className="flex-1 w-full">
					<ul className="flex flex-col gap-4 w-full items-center">
						{menuItems.map((item) => (
							<Link
								key={item.name}
								href={item.path}
								onClick={() => setIsOpen(false)}
								className={`w-full h-12 flex justify-start items-center rounded-lg cursor-pointer hover:bg-gray-100 transition-colors px-2 ${
									pathname === item.path ? "bg-gray-100" : ""
								}`}
							>
								<span
									className={`flex w-full items-center gap-3 whitespace-nowrap ${
										pathname === item.path
											? "text-black font-medium"
											: "text-gray-500 font-medium"
									}`}
								>
									{item.name}
								</span>
							</Link>
						))}
					</ul>
				</div>
				<div className="w-full flex justify-center mb-10">
					<button
						onClick={() => logout()}
						className="w-full h-9 flex items-center justify-center rounded-lg border border-gray-300 text-black font-medium hover:bg-gray-100 transition-colors cursor-pointer"
					>
						로그아웃
					</button>
				</div>
			</div>
		</>
	);
}
