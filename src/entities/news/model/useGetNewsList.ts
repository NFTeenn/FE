import { useQuery } from "@tanstack/react-query";
import { getNewsList } from "../api/getNewsList";
import { cleanText } from "../lib/cleanText";

export const useGetNewsList = () => {
	return useQuery({
		queryKey: ["news", "economy"],
		queryFn: async () => {
			const data = await getNewsList();
			return (data || []).slice(0, 6).map((item) => ({
				...item,
				title: cleanText(item.title),
				description: cleanText(item.description),
			}));
		},
	});
};
