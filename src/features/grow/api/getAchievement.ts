import { instance } from "@/shared/api/instance";

export type AchievementCode = "FIRST_DONDON";

interface Achievement {
	code: AchievementCode;
	title: string;
	description: string;
	achieved: boolean;
}

export const getAchievement = async (): Promise<Achievement[] | []> => {
	const response = await instance.get("/grow/prizes");
	return response.data ?? [];
};
