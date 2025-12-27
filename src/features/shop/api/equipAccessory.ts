import { instance } from "@/shared/api/instance";

export const equipAccessory = async ({ accId }: { accId: number }) => {
	const response = await instance.post("/grow/shop/equip", { accId });
	return response.data;
};
