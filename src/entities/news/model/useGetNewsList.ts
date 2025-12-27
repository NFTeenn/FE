import { useQuery } from "@tanstack/react-query";
import { getNewsList } from "../api/getNewsList";
import { cleanText } from "../lib/cleanText";

export const useGetNewsList = (query: string) => {
	return useQuery({
		queryKey: ["news", query],
		queryFn: async () => {
			const data = await getNewsList(query);
			return (data || []).slice(0, 6).map((item) => ({
				...item,
				title: cleanText(item.title),
				description: cleanText(item.description),
			}));
		},
	});
};
