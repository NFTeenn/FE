"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { useSaveLikes } from "@/features/likes/model/useSaveLikes";
import Search from "@/shared/assets/search";
import Star from "@/shared/assets/star";
import useSearchWord from "../../../entities/word/model/useSearchWord";

export default function WordSearchResult() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const initialWord = searchParams.get("word") || "";
	const [word, setWord] = useState(initialWord);

	const { mutate: saveLikes } = useSaveLikes();
	const { data: words } = useSearchWord(initialWord);

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

	useEffect(() => {
		if (initialWord) {
			setWord(initialWord);
		}
	}, [initialWord]);

	return (
		<div className="flex flex-col justify-center items-center w-full h-full p-6 mx-auto">
			<header className="w-full flex items-center gap-6">
				<h1 className="text-[2rem] font-semibold">돈돈 경제사전</h1>
				<div className="flex justify-center items-center relative overflow-hidden flex-1 px-5 py-4 rounded-2xl bg-white border border-black/20">
					<input
						type="text"
						placeholder="검색할 경제 단어를 입력해주세요"
						className="flex-1 border-0 outline-0"
						value={word}
						onChange={(e) => setWord(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
					<Search className="cursor-pointer" onClick={handleSearch} />
				</div>
			</header>
			<div className="flex flex-col justify-center items-start w-full h-full mt-4 bg-white py-9 px-9 rounded-lg">
				<p className="text-200 font-semibold">검색 결과 {words?.length}</p>
				<div className="flex flex-col gap-2 w-full h-full overflow-y-scroll">
					{words?.map((word) => (
						<article
							key={word.num}
							className="flex flex-col gap-2 py-4 border-b border-b-black/20 last:border-b-0"
						>
							<div className="flex items-baseline gap-3">
								<p
									onClick={() => router.push(`/word/${word.num}`)}
									className="text-2xl text-left text-black line-clamp-1 cursor-pointer"
								>
									{word.word}
								</p>
								<p className="text-base text-left text-black/40 line-clamp-1">
									{word.subject}
								</p>
								<Star
									color={word.liked === true ? "#FFD63A" : "none"}
									className="cursor-pointer"
									onClick={() => {
										saveLikes({ targetId: word.num });
									}}
								/>
							</div>
							<p className="text-xl font-light text-left text-black line-clamp-3">
								{word.description}
							</p>
						</article>
					))}
				</div>
			</div>
		</div>
	);
}
