import { instance } from "@/shared/api/instance";

interface Word {
	num: number;
	word: string;
	description: string;
	subject: string;
}

export const getWords = async (): Promise<Word[]> => {
	const response = await instance.get("/home/words");
	return response.data;
};
