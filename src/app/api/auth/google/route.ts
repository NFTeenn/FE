import { signIn } from "@/auth";

export const GET = () => {
	return signIn("google");
};
