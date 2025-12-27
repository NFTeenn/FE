import { useMutation, useQueryClient } from "@tanstack/react-query";
import { solveQuiz } from "../api/solveQuiz";

export const useSolveQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: solveQuiz,
    onSettled: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["quiz"] });
      }, 1000);
    }
  });
} 