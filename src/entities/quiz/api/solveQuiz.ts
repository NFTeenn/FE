import axios from "axios";

export const solveQuiz = async (solve: boolean): Promise<void> => {
  const response = await axios.post("/api/home", { solve });
  return response.data;
}