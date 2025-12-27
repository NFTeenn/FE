"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGetWords } from "@/entities/word/model/useGetWords";
import Search from "@/shared/assets/search";

export default function TodayWord() {
	const router = useRouter();
	const [word, setWord] = useState("");

	const { data: words } = useGetWords();

	const handleSearch = () => {
		if (word.trim()) {
			router.push(`/dictionary?word=${word}`);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.nativeEvent.isComposing) return;
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	return (
		<div className="flex flex-col justify-center items-center w-full h-screen px-6">
			<h1 className="text-[4rem] font-semibold">돈돈 경제사전</h1>
			<div className="flex justify-center items-center relative overflow-hidden w-full px-5 py-4 rounded-2xl bg-white border border-black/20">
				<input
					type="text"
					placeholder="검색할 경제 단어를 입력해주세요"
					className="flex-1 border-0 outline-0"
					value={word}
					onChange={(e) => setWord(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
				<Search
					className="cursor-pointer"
					onClick={handleSearch}
				/>
			</div>
			<div className="flex flex-col justify-center items-start w-full mt-4">
				<p className="text-200 font-semibold indent-1">오늘의 경제 단어</p>
				<div className="grid grid-cols-2 gap-2 w-full">
					{words?.map((word) => (
						<Link
							key={word.num}
							href={`/dictionary?word=${word.word}`}
							className="flex justify-start items-center relative gap-2.5 px-5 py-[13px] rounded-[9px] bg-white border-[0.95px] border-black/20"
						>
							<p className="font-medium text-left text-black">{word.word}</p>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
