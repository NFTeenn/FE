import { useQuery } from "@tanstack/react-query";
import { type GetLikesParams, getLikes } from "../api/getLikes";

export const useGetLikes = ({ targetId }: GetLikesParams) => {
	return useQuery({
		queryKey: ["likes", targetId],
		queryFn: () => getLikes({ targetId }),
	});
};
