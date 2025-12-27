import axios from "axios";
import type { NewsItem } from "../model/news";

export const getNewsList = async (query: string): Promise<NewsItem[]> => {
	const response = await axios.get(`/api/news`, { params: { query } });
	return response.data.items;
};
