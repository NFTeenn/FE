import { useMutation } from "@tanstack/react-query";
import { searchWord } from "../api/searchWord";

export default function useSearchWord() {
	return useMutation({
		mutationFn: (search: string) => searchWord({search}),
	});
}
