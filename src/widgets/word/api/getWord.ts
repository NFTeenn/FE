import { instance } from "@/shared/api/instance";

export const getWord = async (): Promise<string[]> => {
	const response = await instance.get("/home/word");
	return response.data.words;
};
