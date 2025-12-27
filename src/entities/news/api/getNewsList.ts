import axios from "axios";
import type { NewsItem } from "../model/news";

export const getNewsList = async (): Promise<NewsItem[]> => {
	const response = await axios.get(`/api/news`, { params: { query: "경제" } });
	return response.data.items;
};
