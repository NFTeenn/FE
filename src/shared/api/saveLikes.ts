import { LikesParams } from "../model/likes";
import { instance } from "./instance";

interface SaveLikesResponse {
  liked: boolean;
}

export const saveLikes = async ({targetId, type}: LikesParams): Promise<SaveLikesResponse> => {
  const response = await instance.post("/grow/likes", {targetId, type});
  return response.data;
}