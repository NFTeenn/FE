import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unEquipAccessory } from "../api/unEquipAccessory";

export const useUnEquipAccessory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: unEquipAccessory,
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
