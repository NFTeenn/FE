import { useQueries } from "@tanstack/react-query";
import { getLikes } from "@/features/likes/api/getLikes";
import { getWord } from "../api/getWord";

export const useGetWordWithLike = ({ num }: { num: number }) => {
	const results = useQueries({
		queries: [
			{
				queryKey: ["word", num],
				queryFn: () => getWord({ num }),
			},
			{
				queryKey: ["likes", num],
				queryFn: () => getLikes({ targetId: num }),
			},
		],
	});

	const [wordQuery, likesQuery] = results;

	const word = wordQuery.data;
	const likes = likesQuery.data;

	const likeData = likes?.find((like) => like.targetId === num);

	const combinedData = word
		? {
				...word,
				liked: likeData?.liked || false,
			}
		: undefined;

	return {
		data: combinedData,
		isLoading: results.some((result) => result.isLoading),
		isError: results.some((result) => result.isError),
		isPending: results.some((result) => result.isPending),
		error: results.find((result) => result.error)?.error,
	};
};
