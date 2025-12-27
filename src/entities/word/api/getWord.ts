import { instance } from "@/shared/api/instance";
import type { Word } from "../model/word";

export const getWord = async ({ num }: { num: number }): Promise<Word> => {
	const response = await instance.post("/home/words/one", { num });
	return response.data;
};
