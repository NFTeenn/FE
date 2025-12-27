"use client";

import { useGetNewsList } from "@/entities/news/model/useGetNewsList";
import { useSuccessNewsMission } from "@/entities/news/model/useSuccessNewsMission";
import Loading from "@/shared/ui/loading";

export default function MainNewsList() {
	const { data: news, isLoading, isError, isSuccess } = useGetNewsList({ query: "경제", display: 6 });
	const { mutate } = useSuccessNewsMission();

	const handleNewsClick = async (newsUrl: string) => {
		mutate();
		window.open(newsUrl, "_blank");
	};

	if (isLoading) {
		return <Loading />;
	}

	if (isError || !isSuccess) {
		return (
			<div className="flex items-center justify-center h-40 text-gray-500">
				뉴스를 불러올 수 없습니다.
			</div>
		)
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
