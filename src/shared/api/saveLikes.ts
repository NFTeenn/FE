import type { LikesParams } from "../model/likes";
import { instance } from "./instance";

interface SaveLikesResponse {
  liked: boolean;
}

export const saveLikes = async ({
  targetId
}: LikesParams): Promise<SaveLikesResponse> => {
  const response = await instance.post("/grow/likes", { targetId });
  return response.data;
};
