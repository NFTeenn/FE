"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface NewsItem {
	title: string;
	description: string;
	link: string;
	pubDate: string;
}

const SKELETON_ITEMS = Array.from({ length: 6 }, (_, i) => `skeleton-${i}`);

export default function MainNewsList() {
	const cleanText = (text: string): string => {
		return text
			.replace(/<[^>]*>/g, "")
			.replace(/&quot;/g, '"')
			.replace(/&apos;/g, "'")
			.replace(/&amp;/g, "&")
			.replace(/&lt;/g, "<")
			.replace(/&gt;/g, ">");
	};

	const { data: news = [], isLoading: loading } = useQuery<NewsItem[]>({
		queryKey: ["news", "economy"],
		queryFn: async () => {
			const response = await axios.get(`/api/news`, {
				params: { query: "경제" },
			});
			const data = response.data;
			return (data.items || []).slice(0, 6).map((item: any) => ({
				...item,
				title: cleanText(item.title),
				description: cleanText(item.description),
			}));
		},
	});

	const handleNewsClick = async (newsUrl: string) => {
		try {
			console.log("=== 뉴스 클릭 ===");
			console.log("뉴스 URL:", newsUrl);

			// 저장된 토큰 가져오기
			const token =
				localStorage.getItem("idToken") || sessionStorage.getItem("idToken");

			if (!token) {
				console.warn("토큰이 없습니다 - 뉴스만 열기");
				window.open(newsUrl, "_blank");
				return;
			}

			// 백엔드 API 호출
			const response = await axios.post(
				"/api/news",
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
					withCredentials: true,
				},
			);

			console.log("Response Status:", response.status);
			console.log("Response Data:", response.data);

			// 성공 여부와 관계없이 뉴스 열기
			window.open(newsUrl, "_blank");
		} catch (error) {
			console.error("뉴스 처리 오류:", error);
			// 에러 발생해도 뉴스는 열기
			window.open(newsUrl, "_blank");
		}
	};

	if (loading) {
		return (
			<div className="grid grid-cols-3 gap-4 mt-4">
				{SKELETON_ITEMS.map((key) => (
					<div
						key={key}
						className="h-[140px] bg-gray-100 rounded-lg animate-pulse"
					/>
				))}
			</div>
		);
	}

	if (news.length === 0) {
		return (
			<div className="flex items-center justify-center h-40 text-gray-500">
				뉴스를 불러올 수 없습니다.
			</div>
		);
	}

	return (
		<div className="grid grid-cols-3 gap-4 mt-4">
			{news.map((item) => (
				<button
					key={item.link}
					onClick={() => handleNewsClick(item.link)}
					className="h-[140px] border border-black/10 rounded-lg p-4 hover:border-black/30 hover:shadow-md transition-all cursor-pointer"
				>
					<h3 className="font-semibold text-sm line-clamp-2 mb-2">
						{item.title}
					</h3>
					<p className="text-xs text-gray-600 line-clamp-3">
						{item.description}
					</p>
				</button>
			))}
			<div></div>
			<div className="w-full flex justify-center cursor-pointer">
				<a href="/news">더보기</a>
			</div>
		</div>
	);
}
