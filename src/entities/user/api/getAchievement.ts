import { instance } from "@/shared/api/instance";
import type { Achievement } from "../model/achievement";

export const getAchievement = async (): Promise<Achievement[] | []> => {
	const response = await instance.get("/grow/prizes");
	return response.data ?? [];
};
