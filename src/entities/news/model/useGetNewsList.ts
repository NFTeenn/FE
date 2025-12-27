import { useQuery } from "@tanstack/react-query";
import { getNewsList } from "../api/getNewsList";
import { cleanText } from "../lib/cleanText";

export const useGetNewsList = ({ query, display }: { query: string, display: number }) => {
	return useQuery({
		queryKey: ["news", query, display],
		queryFn: async () => {
			const data = await getNewsList({ query, display });
			return data.map((item) => ({
				...item,
				title: cleanText(item.title),
				description: cleanText(item.description),
			}));
		},
	});
};
