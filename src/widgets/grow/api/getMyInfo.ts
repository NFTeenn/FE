import { instance } from "@/shared/api/instance";

interface MyInfo {
	myInfo: {
		username: string;
		days: number;
		quizStack: number;
		newsStack: number;
		recentGen: number;
		coin: number;
	};
	latestDondon: {
		gen: number;
		nickname: string;
		level: number;
		enterDate: string;
		graduationDate: string | null;
		style: number;
		accId: number;
	};
}

export const getMyInfo = async (): Promise<MyInfo> => {
	const response = await instance.get("/grow/");
	return response.data;
};
