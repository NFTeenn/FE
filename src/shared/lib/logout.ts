"use server";

import { cookies } from "next/headers";
import { signOut } from "@/auth";

export const logout = async () => {
	cookies().delete("idToken");
	await signOut();
};
