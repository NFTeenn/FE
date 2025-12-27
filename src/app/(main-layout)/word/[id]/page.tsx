"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGetWordWithLike } from "@/entities/word/model/useGetWordWithLike";
import { useSaveLikes } from "@/features/likes/model/useSaveLikes";
import Search from "@/shared/assets/search";
import Star from "@/shared/assets/star";
import Loading from "@/shared/ui/loading";

interface AIResponse {
	summary: string;
	synonyms: string[];
}

export default function WordPage({ params }: { params: { id: string } }) {
	const router = useRouter();
	const [searchWord, setSearchWord] = useState("");
	const { data: word, isLoading } = useGetWordWithLike({
		num: Number(params.id),
	});
	const { mutate: saveLikes } = useSaveLikes();

	const [aiData, setAiData] = useState<AIResponse | null>(null);
	const [isAiLoading, setIsAiLoading] = useState(false);

	const handleAiSummary = async () => {
		if (!word) return;
		setIsAiLoading(true);
		try {
			const res = await axios.post("/api/ai/word", {
				word: word.word,
				description: word.description,
			});
			setAiData(res.data);
		} catch (error) {
			console.error(error);
			alert("AI 요약 중 오류가 발생했습니다.");
		} finally {
			setIsAiLoading(false);
		}
	};

	const handleSearch = () => {
		if (searchWord.trim()) {
			router.push(`/dictionary?word=${searchWord}`);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.nativeEvent.isComposing) return;
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	if (isLoading) return <Loading />;
	if (!word) return <div>데이터를 찾을 수 없습니다.</div>;

	return (
		<div className="flex flex-col gap-4 px-24 py-16">
			<header className="w-full flex items-center gap-6">
				<h1 className="text-[2rem] font-semibold">돈돈 경제사전</h1>
				<div className="flex justify-center items-center relative overflow-hidden flex-1 px-5 py-4 rounded-2xl bg-white border border-black/20">
					<input
						type="text"
						placeholder="검색할 경제 단어를 입력해주세요"
						className="flex-1 border-0 outline-0"
						value={searchWord}
						onChange={(e) => setSearchWord(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
					<Search className="cursor-pointer" onClick={handleSearch} />
				</div>
			</header>
			<article
				key={word.num}
				className="flex flex-col gap-8 bg-white rounded-xl p-12 border border-black/20"
			>
				<div className="flex justify-between items-center gap-8">
					<div className="flex-1 flex flex-col gap-3">
						<div className="flex items-baseline gap-3">
							<p className="text-5xl text-left text-black line-clamp-1">
								{word.word}
							</p>
							<p className="text-2xl text-left text-black/40 line-clamp-1">
								{word.subject}
							</p>
							<Star
								color={word.liked === true ? "#FFD63A" : "none"}
								className="cursor-pointer w-8 h-8"
								onClick={() => {
									saveLikes({ targetId: word.num });
								}}
							/>
						</div>
						<p className="text-xl font-light text-left text-black line-clamp-3">
							{word.description}
						</p>
					</div>
					<button
						className="bg-brand-b1 text-white text-xl font-semibold py-4 px-11 rounded-lg cursor-pointer disabled:opacity-50"
						onClick={handleAiSummary}
						disabled={isAiLoading}
					>
						{isAiLoading ? "요약 중..." : "AI로 요약하기"}
					</button>
				</div>
				{aiData && (
					<div className="border-brand-b1 border-3 text-black p-8 rounded-xl animate-in fade-in slide-in-from-top-4 duration-300">
						<p className="text-sm opacity-80 mb-2">AI 핵심 요약</p>
						<p className="text-xl font-medium">{aiData.summary}</p>
					</div>
				)}
			</article>

			<article
				key={`${word.num}-synonyms`}
				className="flex flex-col gap-8 bg-white rounded-xl p-12 border border-black/20"
			>
				<div>
					<p className="font-semibold">유의어</p>
					<p className="text-sm text-black/40">
						*유의어에 대한 설명은 챗봇에게 질문해주세요.
					</p>
				</div>
				<div className="grid grid-cols-4 gap-4">
					{aiData ? (
						aiData.synonyms.map((synonym) => (
							<article
								key={synonym}
								className="flex items-center justify-center gap-8 bg-white rounded-md px-5 py-4 border border-black/20 cursor-pointer hover:bg-black/5 transition-colors"
								onClick={() => router.push(`/dictionary?word=${synonym}`)}
							>
								<p className="text-lg font-medium">{synonym}</p>
							</article>
						))
					) : (
						<div className="col-span-4 text-center text-black/40 py-4">
							AI 요약을 실행하면 유의어가 나타납니다.
						</div>
					)}
				</div>
			</article>
		</div>
	);
}
