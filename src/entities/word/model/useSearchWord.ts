import { useQueries, useQuery } from "@tanstack/react-query";
import { MOCK_DICTIONARY_DATA } from "@/entities/mocks/model/dictionary";
import { MOCK_LIKES_DATA } from "@/entities/user/mock/user";
import { getLikes } from "@/features/likes/api/getLikes";
import { searchWord } from "../api/searchWord";

export default function useSearchWord(search: string) {
	const { data: words } = useQuery({
		queryKey: ["search", search],
		queryFn: async () => {
			try {
				return await searchWord({ search });
			} catch (error) {
				console.error(
					"Search API fetch failed, falling back to mock data:",
					error,
				);
				return MOCK_DICTIONARY_DATA.filter((w) => w.word.includes(search));
			}
		},
		enabled: !!search,
	});

	const likeQueries = useQueries({
		queries: (words || []).map((word) => ({
			queryKey: ["likes", "word", word.num],
			queryFn: async () => {
				try {
					return await getLikes({ targetId: word.num });
				} catch (error) {
					console.error(
						`Likes API fetch failed for word ${word.num}, falling back to mock data:`,
						error,
					);
					return MOCK_LIKES_DATA.filter((l) => l.targetId === word.num);
				}
			},
		})),
	});

	const combinedData = words?.map((word, index) => {
		const likeData = likeQueries[index]?.data;
		const isLiked = Array.isArray(likeData)
			? likeData[0]?.liked
			: likeData?.liked;
		return {
			...word,
			liked: isLiked || false,
		};
	});

	return { data: combinedData };
}
