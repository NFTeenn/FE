import { instance } from "@/shared/api/instance";

export const unEquipAccessory = async ({ accId }: { accId: number }) => {
	const response = await instance.post("/grow/shop/unequip", { accId });
	return response.data;
};
