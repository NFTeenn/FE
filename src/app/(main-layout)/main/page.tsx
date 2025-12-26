"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import type { HomeData } from "@/types/home";
import ChatBotModal from "@/widgets/chatbot/";
import MiniDictionaryList from "@/widgets/home/dictionary";
import MissionListComponent from "@/widgets/home/mission";
import MainNewsList from "@/widgets/home/news";
import ProcessComponent from "@/widgets/home/process";
import QuizComponent from "@/widgets/home/quiz";

const titles = [
	"돈돈 출석체크 하기",
	"오늘의 단어 퀴즈 풀기",
	"돈돈 경제 단어 검색하기",
	"돈돈 경제 뉴스 보기",
];

/* ... inside Main component ... */

export default function Main() {
	const router = useRouter();

	const [searchWord, setSearchWord] = useState("");
	const [chatOpen, setChatOpen] = useState(false);
	const {
		data: homeData,
		isLoading: loading,
		isError,
	} = useQuery<HomeData>({
		queryKey: ["homeData"],
		queryFn: async () => {
			const response = await axios.get("/api/home");
			return response.data;
		},
	});

	// 검색 기능 함수들
	const handleSearch = () => {
		if (searchWord.trim()) {
			router.push(`/dictionary?word=${encodeURIComponent(searchWord)}`);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.nativeEvent.isComposing) return;
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	if (loading) {
		return (
			<div className="w-screen min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-lg">로딩 중...</div>
			</div>
		);
	}

	if (isError || !homeData) {
		return (
			<div className="w-screen min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-lg text-red-500">데이터를 불러올 수 없습니다.</div>
			</div>
		);
	}

	return (
		<>
			<div className="w-screen min-h-screen bg-gray-50 flex flex-row gap-[5vw] py-[4vh]">
				<div className="w-[920px] h-auto flex flex-col ml-20 gap-4">
					<div className="w-full h-[250px] rounded-2xl border border-black/20 bg-brand-b3">
						<ProcessComponent
							sequenceDays={homeData.day}
							level={homeData.level}
						/>
					</div>

					<div className="w-full h-auto px-[3rem] pt-[1rem] rounded-2xl border border-black/20 bg-white pb-8">
						<h2 className="text-xl font-semibold">경제 사전</h2>
						<input
							className="w-full h-[3rem] rounded-[18px] border border-black/20 pl-4 mt-4"
							placeholder="경제 단어 검색하기"
							value={searchWord}
							onChange={(e) => setSearchWord(e.target.value)}
							onKeyDown={handleKeyDown}
						/>
						<MiniDictionaryList words={homeData.words ?? []} />
					</div>

					<div className="w-full h-auto pb-4 rounded-2xl border border-black/20 bg-white p-6">
						<h2 className="text-xl font-semibold mb-4">경제 뉴스</h2>
						<div className="text-sm text-gray-700 whitespace-pre-wrap">
							<MainNewsList />
						</div>
					</div>
				</div>

				<div className="w-[360px] h-auto gap-10 flex flex-col">
					<div className="w-full h-[20rem] bg-white rounded-[1.125rem] border border-black/20 flex flex-col pt-[1.75rem] pl-[2rem]">
						<span className="text-[1rem] font-semibold">Daily 미션</span>
						<hr className="w-[calc(100%+2rem)] border-t border-black/20 ml-[-2rem] mt-4" />
						<div className="flex flex-col w-[80%] items-center mt-4">
							{titles.map((title, index) => (
								<MissionListComponent
									key={title}
									title={title}
									cleared={homeData.mission?.[index] ?? "0"}
								/>
							))}
						</div>
					</div>

					<div className="w-full h-auto bg-white rounded-[1.125rem] border border-black/20 flex flex-col p-6">
						<QuizComponent />
					</div>

					<div className="flex justify-end mt-4">
						<button
							className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition"
							onClick={() => setChatOpen(true)}
						>
							<FiMessageSquare size={24} />
						</button>
					</div>
				</div>
			</div>

			{chatOpen && <ChatBotModal onClose={() => setChatOpen(false)} />}
		</>
	);
}
