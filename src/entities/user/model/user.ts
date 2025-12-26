import type { DonDon } from "@/entities/dondon/model/dondon";

export interface User {
	username: string;
	days: number;
	quizStack: number;
	newsStack: number;
	recentGen: number;
	coin: number;
}

export interface MyInfo {
	myInfo: User;
	latestDondon: DonDon;
}
