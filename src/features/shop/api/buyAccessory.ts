import { instance } from "@/shared/api/instance";

export const buyAccessory = async ({ accId }: { accId: number }) => {
	const response = await instance.post("/grow/shop/buy", { accId });
	return response.data;
};
