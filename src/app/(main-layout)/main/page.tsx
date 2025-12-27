"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { useGetHomeData } from "@/entities/home/model/useGetHomeData";
import Search from "@/shared/assets/search";
import Loading from "@/shared/ui/loading";
import ChatBotModal from "@/widgets/chatbot/ui";
import MiniDictionaryList from "@/widgets/dictionary/ui";
import MissionListComponent from "@/widgets/mission/ui";
import MainNewsList from "@/widgets/news/ui";
import ProcessComponent from "@/widgets/process/ui";
import QuizComponent from "@/widgets/quiz/ui";

const titles = [
	"돈돈 출석체크 하기",
	"오늘의 단어 퀴즈 풀기",
	"돈돈 경제 단어 검색하기",
	"돈돈 경제 뉴스 보기",
];

export default function Main() {
	const router = useRouter();
	const [searchWord, setSearchWord] = useState("");
	const [chatOpen, setChatOpen] = useState(false);
	const { data: homeData, isLoading, isSuccess, isError } = useGetHomeData();

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

	if (isLoading) {
		return <Loading />;
	}

	if (isError || !isSuccess) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-lg text-red-500">데이터를 불러올 수 없습니다.</div>
			</div>
		);
	}

	return (
		<>
			<div className="min-h-screen bg-gray-50">
				<div className="w-full px-4 sm:px-6 lg:px-20 py-6 lg:py-[4vh]">
					<div className="grid grid-cols-1 lg:grid-cols-6 gap-4 lg:gap-[5vw]">
						{/* 메인 콘텐츠 영역 */}
						<div className="lg:col-span-4 flex flex-col gap-4">
							{/* 프로세스 컴포넌트 */}
							<div className="w-full max-h-50 sm:max-h-62.5 rounded-2xl border border-black/20 bg-brand-b3">
								<ProcessComponent
									sequenceDays={homeData.day}
									level={homeData.level}
								/>
							</div>

							{/* 경제 사전 */}
							<div className="w-full h-auto px-6 sm:px-12 pt-4 rounded-2xl border border-black/20 bg-white pb-8">
								<h2 className="text-lg sm:text-xl font-semibold mb-3">
									경제 사전
								</h2>
								<div className="flex justify-center items-center relative overflow-hidden flex-1 px-4 sm:px-5 py-3 sm:py-4 rounded-2xl bg-white border border-black/20">
									<input
										className="flex-1 border-0 outline-0 text-sm sm:text-base"
										placeholder="경제 단어 검색하기"
										value={searchWord}
										onChange={(e) => setSearchWord(e.target.value)}
										onKeyDown={handleKeyDown}
									/>
									<Search className="cursor-pointer" onClick={handleSearch} />
								</div>
								<MiniDictionaryList words={homeData.words ?? []} />
							</div>

							{/* 경제 뉴스 */}
							<div className="w-full h-auto pb-4 rounded-2xl border border-black/20 bg-white p-4 sm:p-6">
								<h2 className="text-lg sm:text-xl font-semibold mb-4">
									경제 뉴스
								</h2>
								<div className="text-sm text-gray-700 whitespace-pre-wrap">
									<MainNewsList />
								</div>
							</div>
						</div>

						{/* 사이드 콘텐츠 영역 */}
						<div className="lg:col-span-2 flex flex-col gap-6 lg:gap-10">
							{/* Daily 미션 */}
							<div className="w-full min-h-[20rem] bg-white rounded-[1.125rem] border border-black/20 flex flex-col py-6 sm:py-7 px-6 sm:px-8">
								<span className="text-base sm:text-[1rem] font-semibold">
									Daily 미션
								</span>
								<hr className="border-t border-black/20 mt-4" />
								<div className="flex flex-col items-center mt-4">
									{titles.map((title, index) => (
										<MissionListComponent
											key={title}
											title={title}
											cleared={homeData.mission?.[index] ?? "0"}
										/>
									))}
								</div>
							</div>

							{/* 퀴즈 컴포넌트 */}
							<div className="w-full h-auto bg-white rounded-[1.125rem] border border-black/20 flex flex-col p-4 sm:p-6">
								<QuizComponent />
							</div>
						</div>
					</div>
				</div>

				{/* 챗봇 버튼 */}
				<div className="fixed bottom-4 right-4 z-30">
					<button
						className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition"
						onClick={() => setChatOpen(true)}
					>
						<FiMessageSquare size={24} />
					</button>
				</div>
			</div>

			{chatOpen && <ChatBotModal onClose={() => setChatOpen(false)} />}
		</>
	);
}
