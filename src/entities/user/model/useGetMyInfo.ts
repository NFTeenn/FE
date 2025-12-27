import { useQuery } from "@tanstack/react-query";
import santa_hat from "@/shared/assets/santas_hat.svg";
import { getMyInfo } from "../api/getMyInfo";

export const useGetMyInfo = () => {
	return useQuery({
		queryKey: ["myInfo"],
		queryFn: getMyInfo,
		select: (data) => ({
			...data,
			latestDondon: {
				...data.latestDondon,
				accessory: data.latestDondon.accId === 1 ? santa_hat : null,
			},
		}),
	});
};
