import { useQuery } from "@tanstack/react-query";
import { getWords } from "../../../entities/word/api/getWords";

export const useGetWords = () => {
	return useQuery({
		queryKey: ["word"],
		queryFn: () => getWords(),
	});
};
