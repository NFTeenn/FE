import { useMutation } from "@tanstack/react-query";
import { unEquipAccessory } from "../api/unEquipAccessory";

export const useUnEquipAccessory = () => {
	return useMutation({
		mutationFn: unEquipAccessory,
	});
};
