import { instance } from "@/shared/api/instance";

export interface CustomItem {
	id: number;
	name: string;
	description: string;
	price: number;
}

export const getCustomItem = async (): Promise<CustomItem[]> => {
	const response = await instance.get("/grow/shop");
	return response.data;
};
