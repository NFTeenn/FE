import { useQuery } from "@tanstack/react-query";
import { getLikes } from "@/features/likes/api/getLikes";
import { searchWord } from "../api/searchWord";

export default function useSearchWord(search: string) {
	const { data: words } = useQuery({
		queryKey: ["word", "search", search],
		queryFn: async () => searchWord({ search }),
		enabled: !!search,
	});

	const { data: likes } = useQuery({
		queryKey: ["likes", "word"],
		queryFn: async () => getLikes({}),
		enabled: !!words,
	});

	const combinedData = words?.map((word) => {
		const likeData = likes?.find((like) => like.targetId === word.num);

		return {
			...word,
			liked: likeData?.liked || false,
		};
	});

	return { data: combinedData };
}
