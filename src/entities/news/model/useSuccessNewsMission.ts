import { useMutation } from "@tanstack/react-query"
import { successNewsMission } from "../api/successNewsMission"

export const useSuccessNewsMission = () => {
  return useMutation({
    mutationFn: () => successNewsMission(),
  })
}