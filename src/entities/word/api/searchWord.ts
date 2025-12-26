import { instance } from "@/shared/api/instance";
import type { Word } from "../model/word";

export const searchWord = async ({
	search,
}: {
	search: string;
}): Promise<Word[]> => {
	const response = await instance.post("/home/words/search", { search });
	return response.data;
};
