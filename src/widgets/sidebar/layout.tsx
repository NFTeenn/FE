"use client";

import globalStyle from "@/styles/global.module.css";
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const pathname = usePathname();

    const menuItems = [
        { name: '메인페이지', path: '/main' },
        { name: '경제사전', path: '/dictionary' },
        { name: '경제뉴스', path: '/news' },
        { name: '돈돈이 & 마이페이지', path: '/mypage' },
    ];

    return (
        <>
            <div id="sidebar" className={globalStyle.sidebar}>
                <div id="logo" className={globalStyle.logo}></div>
                <div id="menu" className={globalStyle.menu}>
                    <ul className="flex flex-col gap-[2vh] w-full items-center ">
                        {menuItems.map((item) => (
                            <li key={item.name}
                                className={`${globalStyle.menuLi} ${pathname === item.path ? globalStyle.active : ''}`}>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div id="logout" className={globalStyle.logout}>
                    <button className="w-[80%] h-[2.2rem] rounded-[8px] border-[1px] border-[#00000033] cursor-pointer">로그아웃</button>
                </div>
            </div>
        </>
    );  
}