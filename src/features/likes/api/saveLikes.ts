import { instance } from "@/shared/api/instance";
import type { LikesParams } from "../model/types";

interface SaveLikesResponse {
	liked: boolean;
}

export const saveLikes = async ({
	targetId,
}: LikesParams): Promise<SaveLikesResponse> => {
	const response = await instance.post("/grow/likes", { targetId });
	return response.data;
};
