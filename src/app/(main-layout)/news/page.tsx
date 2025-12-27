"use client";

import { useState } from "react";
import { useGetNewsList } from "@/entities/news/model/useGetNewsList";

const EconomicNews = () => {
	const [query, setQuery] = useState("경제");

	const { data: news, refetch, isLoading, isSuccess, isError } = useGetNewsList(query);

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

	if (isLoading) {
		return (
			<div className="text-center py-12">
				<div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
				<p className="mt-4 text-gray-600">뉴스를 불러오는 중...</p>
			</div>
		)
	}

	if (isError || !isSuccess) {
		return (
			<div className="text-center py-12">
				<p className="mt-4 text-gray-600">뉴스를 불러올 수 없습니다.</p>
			</div>
		)
	}

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6 text-gray-800">경제 뉴스</h1>

			<div className="mb-6">
				<div className="flex gap-2">
					<input
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						onKeyPress={(e) => e.key === "Enter" && refetch()}
						placeholder="검색어를 입력하세요 (예: 경제, 증시, 부동산)"
						className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<button
						onClick={() => refetch()}
						className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
					>
						검색
					</button>
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
						className="px-4 py-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors text-sm"
					>
						{keyword}
					</button>
				))}
			</div>

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
								<h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
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

			<p className="text-center text-gray-500 mt-6 text-sm">
				총 {news.length}개의 뉴스
			</p>
		</div>
	);
};

export default EconomicNews;
