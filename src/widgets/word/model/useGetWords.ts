import { useQuery } from "@tanstack/react-query";
import { getWords } from "../api/getWords";

export default function useGetWord() {
	return useQuery({
		queryKey: ["word"],
		queryFn: () => getWords(),
	});
}
