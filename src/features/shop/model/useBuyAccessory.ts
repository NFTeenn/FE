import { useMutation } from "@tanstack/react-query";
import { purchaseCustomItem } from "../api/buyAccessory";

export const usePurchaseCustomItem = () => {
	return useMutation({
		mutationFn: purchaseCustomItem,
	});
};
