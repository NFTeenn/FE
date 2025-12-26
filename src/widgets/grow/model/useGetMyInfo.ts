import { useQuery } from "@tanstack/react-query";
import { MOCK_USER_DATA } from "@/data/mocks/user";
import { getMyInfo } from "../api/getMyInfo";

export const useGetMyInfo = () => {
	return useQuery({
		queryKey: ["myInfo"],
		queryFn: async () => {
			try {
				return await getMyInfo();
			} catch (error) {
				console.error(
					"MyInfo API fetch failed, falling back to mock data:",
					error,
				);
				return MOCK_USER_DATA;
			}
		},
	});
};
