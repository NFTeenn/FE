import { useQuery } from "@tanstack/react-query";
import santa_dondon from "@/shared/assets/shop/santa_dondon.svg"
import { getMyInfo } from "../api/getMyInfo";

export const useGetMyInfo = () => {
	return useQuery({
		queryKey: ["myInfo"],
		queryFn: getMyInfo,
		select: (data) => ({
			...data,
			latestDondon: {
				...data.latestDondon,
				accessory: data.latestDondon.accId === 1 ? santa_dondon : null,
			},
		}),
	});
};
