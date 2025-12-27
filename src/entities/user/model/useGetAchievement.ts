import { useQuery } from "@tanstack/react-query";
import first_dondon from "@/shared/assets/achievement/first_dondon.svg";
import happy_dondon from "@/shared/assets/achievement/happy_dondon.svg";
import master_of_dondon from "@/shared/assets/achievement/master_of_dondon.svg";
import { getAchievement } from "../api/getAchievement";
import type { Achievement } from "./achievement";

export const useGetAchievement = () => {
	return useQuery({
		queryKey: ["achievement"],
		queryFn: () => getAchievement(),
		select: (data) => {
			return data.map((achievement: Achievement) => {
				return {
					...achievement,
					image:
						achievement.code === "FIRST_DONDON"
							? first_dondon
							: achievement.code === "HAPPY_DONDON"
								? happy_dondon
								: master_of_dondon,
				};
			});
		},
	});
};
