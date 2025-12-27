import { instance } from "@/shared/api/instance";
import type { Accessory } from "../model/accessory";

export const getCustomItem = async (): Promise<Accessory[]> => {
	const response = await instance.get("/grow/shop");
	return response.data;
};
