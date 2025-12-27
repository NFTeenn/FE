import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editDonDonNickName } from "../api/editDonDonNickName";

export const useEditDonDonNickName = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: editDonDonNickName,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["myInfo"],
			});
		},
	});
};
