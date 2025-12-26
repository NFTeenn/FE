import { instance } from "@/shared/api/instance";
import type { Likes, LikesParams } from "../model/types";

type ChangeType<T> = {
	[K in keyof T]?: T[K];
};

export type GetLikesParams = ChangeType<LikesParams>;

export const getLikes = async ({
	targetId,
}: GetLikesParams): Promise<Likes[]> => {
	const response = await instance.get("/grow/likes", {
		params: { targetId },
	});
	return response.data;
};
