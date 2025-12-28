import { useQuery } from "@tanstack/react-query";
import santas_hat from "@/shared/assets/santas_hat.svg";
import { getAccessories } from "../api/getAccessories";

export const useGetAccessories = () => {
	return useQuery({
		queryKey: ["accessories"],
		queryFn: () => getAccessories(),
		select: (data) => {
			return data.map((accessory) => {
				return {
					...accessory,
					image: accessory.id === 1 ? santas_hat : null,
				};
			});
		},
	});
};
