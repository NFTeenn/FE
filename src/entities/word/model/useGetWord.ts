import { useQuery } from "@tanstack/react-query";
import { getWord } from "../api/getWord";

export const useGetWord = ({ num }: { num: number }) => {
	return useQuery({
		queryKey: ["word"],
		queryFn: () => getWord({ num }),
	});
};
