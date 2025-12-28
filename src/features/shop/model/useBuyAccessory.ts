import { useMutation, useQueryClient } from "@tanstack/react-query";
import { buyAccessory } from "../api/buyAccessory";

export const useBuyAccessory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: buyAccessory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["accessories"] });
		},
	});
};
