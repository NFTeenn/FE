import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveLikes } from "../api/saveLikes";
import type { Likes, LikesParams } from "./like";

export const useSaveLikes = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: LikesParams) => saveLikes(data),
		onMutate: async (data: LikesParams) => {
			await queryClient.cancelQueries({
				queryKey: ["likes", "word", data.targetId],
			});

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
		onError: (_err, variables, context) => {
			if (context?.previousData) {
				queryClient.setQueryData(
					["likes", "word", variables.targetId],
					context.previousData,
				);
			}
		},
		onSettled: (_data, _error, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["likes", "word", variables.targetId],
			});
			queryClient.invalidateQueries({
				queryKey: ["likes"],
			});
			queryClient.invalidateQueries({
				queryKey: ["search", "word"],
			});
		},
	});
};
