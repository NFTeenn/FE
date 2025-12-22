"use server"

import { signOut } from "@/auth"
import { cookies } from "next/headers"

export const logout = async () => {
  cookies().delete("idToken")
  await signOut()
}
