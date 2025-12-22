import { useQueries, useQuery } from "@tanstack/react-query";
import { getLikes } from "@/shared/api/getLikes";
import { searchWord } from "../api/searchWord";

export default function useSearchWord(search: string) {
	const { data: words } = useQuery({
		queryKey: ["search", search],
		queryFn: () => searchWord({ search }),
		enabled: !!search,
	});

	const likeQueries = useQueries({
		queries: (words || []).map((word) => ({
			queryKey: ["likes", "word", word.num],
			queryFn: () => getLikes({ targetId: word.num }),
		})),
	});

	const combinedData = words?.map((word, index) => {
		const likeData = likeQueries[index]?.data;
		const isLiked = likeData ? likeData[0]?.liked : false;
		return {
			...word,
			liked: isLiked,
		};
	});

	return { data: combinedData };
}
