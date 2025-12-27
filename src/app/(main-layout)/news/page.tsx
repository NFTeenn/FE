"use client";

import { useState } from "react";
import { useGetNewsList } from "@/entities/news/model/useGetNewsList";
import Search from "@/shared/assets/search";
import Loading from "@/shared/ui/loading";

export default function EconomicNews() {
	const [query, setQuery] = useState("경제");

	const {
		data: news,
		refetch,
		isLoading,
		isSuccess,
		isError,
	} = useGetNewsList({ query: query, display: 20 });

	const formatDate = (dateString: string): string => {
		const date = new Date(dateString);
		return date.toLocaleString("ko-KR", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const handleSearch = () => {
		if (query.trim()) {
			refetch();
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.nativeEvent.isComposing) return;
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	if (isError || !isSuccess) {
		return (
			<div className="text-center py-12">
				<p className="mt-4 text-gray-600">뉴스를 불러올 수 없습니다.</p>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6 text-gray-800">경제 뉴스</h1>

			<div className="mb-6">
				<div className="flex justify-center items-center relative overflow-hidden flex-1 px-5 py-4 rounded-2xl bg-white border border-black/20">
					<input
						className="flex-1 border-0 outline-0"
						placeholder="경제 단어 검색하기"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
					<Search className="cursor-pointer" onClick={handleSearch} />
				</div>
			</div>

			<div className="flex gap-2 mb-6 flex-wrap">
				{["경제", "증시", "금융", "부동산", "금리"].map((keyword) => (
					<button
						key={keyword}
						onClick={() => {
							setQuery(keyword);
							refetch();
						}}
						className="px-4 py-1 cursor-pointer bg-gray-200 rounded-full hover:bg-gray-300 transition-colors text-sm"
					>
						{keyword}
					</button>
				))}
			</div>

			{isLoading ? (
				<Loading />
			) : (
				<div className="space-y-4">
					{news.length === 0 ? (
						<p className="text-center text-gray-500 py-8">
							검색 결과가 없습니다.
						</p>
					) : (
						news.map((item) => (
							<article
								key={item.title}
								className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
							>
								<a
									href={item.link}
									target="_blank"
									rel="noopener noreferrer"
									className="block"
								>
									<h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-200 transition-colors">
										{item.title}
									</h2>
									<p className="text-gray-600 mb-3 line-clamp-2">
										{item.description}
									</p>
									<time className="text-sm text-gray-400">
										{formatDate(item.pubDate)}
									</time>
								</a>
							</article>
						))
					)}
				</div>
			)}

			<p className="text-center text-gray-500 mt-6 text-sm">
				총 {news.length}개의 뉴스
			</p>
		</div>
	);
}
