import { useQuery } from "@tanstack/react-query";
import { getWord } from "../api/getWord";

export default function useGetWord() {
	return useQuery({
		queryKey: ["word"],
		queryFn: () => getWord(),
	});
}
