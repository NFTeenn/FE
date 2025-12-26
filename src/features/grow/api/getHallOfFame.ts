import { instance } from "@/shared/api/instance";

interface AdultDonDon {
	gen: number;
	nickname: string;
	level: number;
	enterDate: string;
	graduationDate: string;
	style: number;
}

export const getHallOfFame = async (): Promise<AdultDonDon[]> => {
	const response = await instance.get("/grow/adult");
	return response.data;
};
