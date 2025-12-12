import { instance } from "@/shared/api/instance";

interface WordType {
  subject: string;
  word: string;
  description: string;
}

export const searchWord = async ({search}: {search: string}): Promise<WordType[]> => {
  const response = await instance.post("/home/word/search", {search});
  return response.data;
};
