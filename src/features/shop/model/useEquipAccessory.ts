import { useMutation } from "@tanstack/react-query";
import { equipAccessory } from "../api/equipAccessory";

export const useEquipAccessory = () => {
	return useMutation({
		mutationFn: equipAccessory,
	});
};
