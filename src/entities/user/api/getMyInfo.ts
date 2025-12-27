import { instance } from "@/shared/api/instance";
import type { MyInfo } from "../model/user";

export const getMyInfo = async (): Promise<MyInfo> => {
	const response = await instance.get("/grow");
	return response.data;
};
