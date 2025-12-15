import { instance } from "@/shared/api/instance";

interface Word {
	num: number;
	word: string;
	description: string;
	subject: string;
}

export const searchWord = async ({search}: {search: string}): Promise<Word[]> => {
  const response = await instance.post("/home/words/search", {search});
  return response.data;
};
