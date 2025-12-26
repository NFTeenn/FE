import { useQuery } from "@tanstack/react-query";
import { getAchievement } from "../../../features/grow/api/getAchievement";

export const useGetAchievement = () => {
	return useQuery({
		queryKey: ["achievement"],
		queryFn: () => getAchievement(),
	});
};
