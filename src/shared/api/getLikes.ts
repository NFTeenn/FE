import type { Likes, LikesParams } from "../model/likes";
import { instance } from "./instance";

type ChangeType<T> = {
	[K in keyof T]?: T[K];
};

export type GetLikesParams = ChangeType<LikesParams>;

export const getLikes = async ({
	type,
	targetId,
}: GetLikesParams): Promise<Likes[]> => {
	const response = await instance.get("/grow/likes", {
		params: { type, targetId },
	});
	return response.data;
};
