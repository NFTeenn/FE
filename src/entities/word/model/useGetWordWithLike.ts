import { useQueries } from "@tanstack/react-query";
import { MOCK_LIKES_DATA } from "@/entities/user/mock/user";
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
				queryFn: async () => {
					try {
						return await getLikes({ targetId: num });
					} catch (error) {
						console.error(
							"Likes API fetch failed, falling back to mock data:",
							error,
						);
						return MOCK_LIKES_DATA;
					}
				},
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
