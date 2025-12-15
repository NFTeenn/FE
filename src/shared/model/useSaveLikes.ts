import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveLikes } from "../api/saveLikes";
import type { Likes, LikesParams } from "./likes";

export const useSaveLikes = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: LikesParams) => saveLikes(data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["likes"],
			});
			queryClient.invalidateQueries({
				queryKey: ["search", "word"],
			});
		},
		onMutate: (data: LikesParams) => {
			const previousData: Likes[] | undefined = queryClient.getQueryData([
				"likes",
				"word",
				data.targetId,
			]);

			const newData = previousData?.map((item) => {
				if (item.targetId === data.targetId) {
					return { ...item, liked: !item.liked };
				}
				return item;
			});

			queryClient.setQueryData(["likes", "word", data.targetId], newData);

			return { previousData };
		},
	});
};
