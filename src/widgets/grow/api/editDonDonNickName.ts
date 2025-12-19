import { instance } from "@/shared/api/instance";

export const editDonDonNickName = async ({ nickname }: { nickname: string }) => {
  const response = await instance.patch("/grow/nickname", { nickname });
  return response.data;
};
