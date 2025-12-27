import { useQuery } from "@tanstack/react-query";
import { getAccessories } from "../api/getAccessories";

export const useGetAccessories = () => {
	return useQuery({
		queryKey: ["accessories"],
		queryFn: () => getAccessories(),
	});
};
