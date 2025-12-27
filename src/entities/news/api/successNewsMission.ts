import axios from "axios";

export const successNewsMission = async (): Promise<void> => {
  const response = await axios.post("/api/news");
  return response.data
}