import { instance } from "@/shared/api/instance";

export const editDonDonNickName = async ({ nickName }: { nickName: string }) => {
  const response = await instance.patch("/grow/nickname", { nickName });
  return response.data;
};
