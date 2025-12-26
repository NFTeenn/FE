import type { Word } from "@/entities/word/model/word";
import type { MyInfo } from "../model/user";

export const MOCK_USER_DATA: MyInfo = {
	myInfo: {
		username: "김돈돈",
		days: 42,
		quizStack: 15,
		newsStack: 28,
		coin: 3500,
		recentGen: 3,
	},
	latestDondon: {
		nickname: "부자되고싶돈",
		gen: 3,
		level: 75,
		accId: 1,
		enterDate: "2025-12-27",
		graduationDate: "2025-12-27",
		style: 1,
	},
};

export const MOCK_LIKES_DATA: Word[] = [
	{
		targetId: 101,
		word: "GDP",
		description:
			"국내총생산. 일정 기간 동안 한 국가 내에서 생산된 모든 재화와 서비스의 시장 가치 합계입니다.",
		liked: true,
	},
	{
		targetId: 102,
		word: "기회비용",
		description:
			"하나의 대안을 선택함으로 인해 포기하게 되는 다른 대안들 중 가장 가치 있는 것의 가치를 말합니다.",
		liked: true,
	},
	{
		targetId: 103,
		word: "환율",
		description:
			"서로 다른 통화 간의 교환 비율로, 한 나라의 화폐 가치를 다른 나라의 화폐 가치로 표시한 것입니다.",
		liked: true,
	},
];
