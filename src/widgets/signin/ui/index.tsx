"use client";

import Image from "next/image";
import google_logo from "@/shared/assets/google_logo.svg";
import { authCheck } from "../api";

export default function Signin() {

	const handleAuthCheck = async () => {
		try {
			const result = await authCheck();
			console.log("Auth check result:", result);

		} catch (error) {
			console.error("❌ 예상치 못한 에러:", error);
		}
	};

	return (
		<div className="flex w-[100vw] h-[100vh] relative pl-10 py-10 bg-white">
			<div className="basis-1/2 h-[90vh] bg-brand-main rounded-[12px]"></div>
			<div className="basis-1/2 flex flex-col items-center justify-center">
				<h1 className="text-[4rem] font-semibold mb-31">로그인</h1>
				<a
					href="api/auth/google"
					className="flex justify-center items-center w-auto py-5 px-15 gap-5 border border-300 rounded-[36px] cursor-pointer"
				>
					<Image src={google_logo} alt="logo" width={28} height={28} />
					<span className="text-[1.25rem] font-roboto">
						Google계정으로 로그인
					</span>
				</a>
				<button
					type="button"
					onClick={handleAuthCheck}
					className="mt-4 px-6 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
				>
					인증 확인
				</button>
			</div>
		</div>
	)
}
