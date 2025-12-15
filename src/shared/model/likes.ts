export type LikesType = "WORD" | "NEWS" | "MISSION";

export interface LikesParams {
	targetId: number;
	type: LikesType;
}

export interface Likes {
	targetId: number;
	type: LikesType;
	liked: boolean;
}
