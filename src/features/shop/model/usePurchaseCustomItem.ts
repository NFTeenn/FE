import { useMutation } from "@tanstack/react-query";
import { purchaseCustomItem } from "../api/purchaseCustomItem";

export const usePurchaseCustomItem = () => {
	return useMutation({
		mutationFn: purchaseCustomItem,
	});
};
