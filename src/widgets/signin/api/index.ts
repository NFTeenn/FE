"use server";
import { auth } from "@/auth";
import { instance } from "@/shared/api/instance";

export const authCheck = async () => {
	const session = await auth();
	try {
		const response = instance.get("/api/test/auth-check", {
			headers: { Authorization: `Bearer ${session?.idToken}` },
		});
		console.log("Response:", response);
	} catch (error) {
		console.error("Error:", error);
	}
};
