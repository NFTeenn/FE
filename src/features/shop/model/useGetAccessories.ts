import { useQuery } from "@tanstack/react-query";
import { getCustomItem } from "../api/getAccessories";

export const useGetCustomItem = () => {
	return useQuery({
		queryKey: ["custom-item"],
		queryFn: () => getCustomItem(),
	});
};
