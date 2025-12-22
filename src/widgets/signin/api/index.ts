"use server";
import { isAxiosError } from "axios";
import { instance } from "@/shared/api/instance";

export const authCheck = async () => {
	try {
		const response = await instance.get("/api/test/auth-check");
		console.log("✅ Auth check success:", response.data);
		
		return { success: true, data: response.data };
	} catch (error: unknown) {
		if (isAxiosError(error)) {
			console.error("Auth check failed:", error.message);
		}

		throw error;
	}
};
