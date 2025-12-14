import { useQuery } from "@tanstack/react-query"
import { getHallOfFame } from "../api/getHallOfFame"

export const useGetHallOfFame = () => {
    return  useQuery({
      queryKey: ["hall-of-fame"],
      queryFn: () => getHallOfFame(),
    })
}