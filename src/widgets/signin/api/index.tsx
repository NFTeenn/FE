import { instance } from "@/shared/api";

export const signin = () => instance.get("/oauth2/authorization/google");
