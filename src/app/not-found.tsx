"use client";

import Image from "next/image";
import { useEffect } from "react";
import errorImage from "@/shared/assets/error.svg";
import NavigationSidebar from "@/widgets/sidebar/ui/navigationSidebar";

interface ErrorProps {
	error: Error;
	reset: () => void;
}

export default function Notfound({ error, reset }: ErrorProps) {
	useEffect(() => {
		console.error("An error occurred:", error);
	}, [error]);

	// [TODO] 화면 불일치
	return (
		<>
			<NavigationSidebar />
			<div className="flex justify-center items-center relative flex-row h-full">
				<div>
					<h2>404</h2>
				</div>

				<div className=" w-[31rem] h-[21rem]">
					<Image src={errorImage} alt="에러 돼지" fill />
				</div>
			</div>
		</>
	);
}
