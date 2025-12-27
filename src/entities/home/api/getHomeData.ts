import axios from "axios";
import type { HomeData } from "../model/home";

export const getHomeData = async (): Promise<HomeData> => {
  const response = await axios.get("/api/home");
  return response.data;
};
