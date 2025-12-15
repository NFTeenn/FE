import { useQuery } from "@tanstack/react-query";
import { type GetLikesParams, getLikes } from "../api/getLikes";

export const useGetLikes = ({ targetId, type }: GetLikesParams) => {
	return useQuery({
		queryKey: ["likes", type, targetId],
		queryFn: () => getLikes({ targetId, type }),
	});
};
