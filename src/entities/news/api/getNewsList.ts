import axios from "axios";
import type { NewsItem } from "../model/news";

export const getNewsList = async ({ query, display }: { query: string, display: number }): Promise<NewsItem[]> => {
	const response = await axios.get(`/api/news`, { params: { query, display } });
	return response.data.items;
};
