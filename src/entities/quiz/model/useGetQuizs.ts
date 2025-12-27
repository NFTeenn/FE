import { useQuery } from "@tanstack/react-query";
import { getQuizs } from "../api/getQuizs";

export const useGetQuizs = () => {
  return useQuery({
    queryKey: ["quiz"],
    queryFn: getQuizs,
  });
};