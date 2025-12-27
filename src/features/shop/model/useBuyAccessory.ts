import { useMutation } from "@tanstack/react-query";
import { buyAccessory } from "../api/buyAccessory";

export const useBuyAccessory = () => {
	return useMutation({
		mutationFn: buyAccessory,
	});
};
