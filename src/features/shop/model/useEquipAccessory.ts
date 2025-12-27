import { useMutation, useQueryClient } from "@tanstack/react-query";
import { equipAccessory } from "../api/equipAccessory";

export const useEquipAccessory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: equipAccessory,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["accessories"],
			});
			queryClient.invalidateQueries({
				queryKey: ["myInfo"],
			});
		},
	});
};
