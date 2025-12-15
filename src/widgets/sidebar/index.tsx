"use client";

import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const router = useRouter();

  const menuItems = [
    { name: '메인페이지', path: '/main' },
    { name: '경제사전', path: '/dictionary' },
    { name: '경제뉴스', path: '/news' },
    { name: '돈돈이 & 마이페이지', path: '/mypage' },
  ];

    return (
        <div className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-300 flex flex-col items-center pt-10">
            {/* 로고 */}
            <div className="w-full h-24 flex justify-center items-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
            </div>

            {/* Menu */}
            <div className="w-4/5 mt-10">
                <ul className="flex flex-col gap-4 w-full items-center">
                    {menuItems.map((item) => (
                        <li key={item.name} onClick={() => router.push(item.path)}
                        className="w-full h-12 flex justify-center items-center rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Logout */}
            <div className=" w-full flex justify-center absolute bottom-10">
                <button className="w-4/5 h-9 rounded-lg border border-gray-300 text-black font-medium hover:bg-gray-100 transition-colors cursor-pointer">로그아웃</button>
            </div>
        </div>
    );
}
