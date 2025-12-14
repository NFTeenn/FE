import { instance } from "@/shared/api/instance";

interface Achievement {
    code: string;
    title: string;
    description: string;
    achieved: boolean;
}

export const getAchievement = async (): Promise<Achievement[]> => {
  const response = await instance.get("/grow/prize");
  return response.data.prizes;
}
