import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../api/getMyInfo";

export const useGetMyInfo = () => {
	return useQuery({
		queryKey: ["myInfo"],
		queryFn: getMyInfo,
	});
};
