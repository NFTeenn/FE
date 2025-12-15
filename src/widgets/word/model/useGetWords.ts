import { useQuery } from "@tanstack/react-query";
import { getWords } from "../api/getWords";

export const useGetWords = () => {
	return useQuery({
		queryKey: ["word"],
		queryFn: () => getWords(),
	});
};
