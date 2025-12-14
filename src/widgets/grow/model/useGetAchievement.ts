import { useQuery } from "@tanstack/react-query"
import { getAchievement } from "../api/getAchievement"

export const useGetAchievement = () => {
    return  useQuery({
      queryKey: ["achievement"],
      queryFn: () => getAchievement(),
    })
}