import { instance } from "@/shared/api/instance";
import type { Word } from "../model/word";

export const getWords = async (): Promise<Word[]> => {
	const response = await instance.get("/home/words");
	return response.data;
};
