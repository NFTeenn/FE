import { useQuery } from "@tanstack/react-query";
import { MOCK_LIKES_DATA } from "@/data/mocks/user";
import { type GetLikesParams, getLikes } from "../api/getLikes";

export const useGetLikes = ({ targetId }: GetLikesParams) => {
	return useQuery({
		queryKey: ["likes", targetId],
		queryFn: async () => {
			try {
				return await getLikes({ targetId });
			} catch (error) {
				console.error(
					"Likes API fetch failed, falling back to mock data:",
					error,
				);
				return MOCK_LIKES_DATA;
			}
		},
	});
};
