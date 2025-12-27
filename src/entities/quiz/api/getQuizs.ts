import axios from "axios";
import type { QuizData } from "../model/quiz";

export const getQuizs = async (): Promise<QuizData> => {
  const response = await axios.get("/api/home");
  return response.data;
};
