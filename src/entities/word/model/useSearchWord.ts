import { useQuery } from "@tanstack/react-query";
import { MOCK_DICTIONARY_DATA } from "@/entities/mocks/model/dictionary";
import { MOCK_LIKES_DATA } from "@/entities/user/mock/user";
import { getLikes } from "@/features/likes/api/getLikes";
import { searchWord } from "../api/searchWord";

export default function useSearchWord(search: string) {
	const { data: words } = useQuery({
		queryKey: ["word", "search", search],
		queryFn: async () => searchWord({ search }),
		placeholderData: MOCK_DICTIONARY_DATA,
		enabled: !!search,
	});

	const { data: likes } = useQuery({
		queryKey: ["likes", "word"],
		queryFn: async () => getLikes({}),
		placeholderData: MOCK_LIKES_DATA,
		enabled: !!words,
	})

	const combinedData = words?.map((word) => {
		const likeData = likes?.find((like) => like.targetId === word.num);

		return {
			...word,
			liked: likeData?.liked || false,
		};
	});

	return { data: combinedData };
}
