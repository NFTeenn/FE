import { useMutation } from "@tanstack/react-query";
import { editDonDonNickName } from "../api/editDonDonNickName";

export const useEditDonDonNickName = () => {
  return useMutation({
    mutationFn: editDonDonNickName,
  });
};
