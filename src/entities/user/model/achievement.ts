export type AchievementCode = "FIRST_DONDON";

export interface Achievement {
	code: AchievementCode;
	title: string;
	description: string;
	achieved: boolean;
}
