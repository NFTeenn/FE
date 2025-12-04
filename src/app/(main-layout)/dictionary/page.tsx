"use client"

import Link from "next/link";
import Search from "@/shared/assets/search";
import useGetWord from "@/widgets/word/model/useGetWord";

export default function Dictionary() {
    const { data: words } = useGetWord();

    return (
        <div className="flex flex-col justify-center items-center w-full h-screen px-40">
            <h1 className="text-[4rem] font-semibold">돈돈 경제사전</h1>
            <div className="flex justify-center items-center relative overflow-hidden w-full px-5 py-4 rounded-2xl bg-white border border-black/20">
                <input
                    type="text"
                    placeholder="검색할 경제 단어를 입력해주세요"
                    className="flex-1 border-0 outline-0"
                />
                <Search className="cursor-pointer" />
            </div>
            <div className="flex flex-col justify-center items-start w-full mt-4">
                <p className="text-200 font-semibold indent-1">오늘의 경제 단어</p>
                <div className="grid grid-cols-2 gap-2 w-full">
                    {words?.map((word) => (
                        <Link
                            key={word.word}
                            href={""}
                            className="flex justify-start items-center relative gap-2.5 px-5 py-[13px] rounded-[9px] bg-white border-[0.95px] border-black/20"
                        >
                            <p className="font-medium text-left text-black">
                                사회보장제도
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
