import { useQuery } from "@tanstack/react-query";
import { getHomeData } from "../api/getHomeData";

export const useGetHomeData = () => {
  return useQuery({
    queryKey: ["homeData"],
    queryFn: getHomeData,
  });
};
