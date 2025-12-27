"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/shared/assets/logo.svg";
import { logout } from "@/shared/lib/logout";

export default function NavigationSidebar() {
    const pathname = usePathname();

    const menuItems = [
        { name: "메인페이지", path: "/main" },
        { name: "경제사전", path: "/dictionary" },
        { name: "경제뉴스", path: "/news" },
        { name: "돈돈이 & 마이페이지", path: "/mypage" },
    ];

    return (
        <div className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-300 flex flex-col items-center pt-10">
            <Image src={logo} alt="logo" width={100} height={100} />

            <div className="flex-1 mt-10">
                <ul className="flex flex-col gap-4 w-full items-center">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.path}
                            className="w-full h-12 flex justify-center items-center rounded-xl cursor-pointer hover:bg-gray-100 transition-colors px-2"
                        >
                            <span className={pathname === item.path ? "text-black font-medium" : "text-gray-500 font-medium"}>
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </ul>
            </div>

            <div className="w-full flex justify-center mb-10">
                <button
                    onClick={() => logout()}
                    className="w-4/5 h-9 flex items-center justify-center rounded-lg border border-gray-300 text-black font-medium hover:bg-gray-100 transition-colors cursor-pointer"
                >
                    로그아웃
                </button>
            </div>
        </div>
    );
}
