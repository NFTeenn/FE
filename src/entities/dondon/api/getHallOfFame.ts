import { instance } from "@/shared/api/instance";
import type { DonDon } from "../model/dondon";

export const getHallOfFame = async (): Promise<DonDon[]> => {
	const response = await instance.get("/grow/adult");
	return response.data;
};
