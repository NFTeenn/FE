import { instance } from "@/shared/api/instance";

interface WordType {
	subject: string;
	word: string;
	description: string;
}

export const getWord = async (): Promise<WordType[]> => {
	const response = await instance.get("/home/word");
	return response.data;
};
