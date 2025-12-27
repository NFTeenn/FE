import Image from "next/image";
import dondon_artwork from "@/shared/assets/dondon_artwork.svg";
import google_logo from "@/shared/assets/google_logo.svg";

export default function Home() {
	return (
		<div className="flex flex-col lg:flex-row w-[100vw] h-[100vh] relative lg:pl-10 lg:py-10 bg-white">
			<div className="relative lg:basis-1/2 h-[30vh] lg:h-[90vh] bg-brand-main lg:rounded-[12px]">
				<Image
					src={dondon_artwork}
					alt="dondon_artwork"
					fill
					className="object-contain object-left-bottom"
				/>
			</div>
			<div className="lg:basis-1/2 flex flex-col items-center justify-center flex-1 px-5">
				<h1 className="text-[2.5rem] lg:text-[4rem] font-semibold mb-8 lg:mb-31">
					돈돈 로그인
				</h1>
				<a
					href="api/auth/google"
					className="flex justify-center items-center w-auto py-4 lg:py-5 px-8 lg:px-15 gap-3 lg:gap-5 border border-300 rounded-[36px] cursor-pointer"
				>
					<Image src={google_logo} alt="logo" width={28} height={28} />
					<span className="text-[1rem] lg:text-[1.25rem] font-roboto">
						Google계정으로 로그인
					</span>
				</a>
			</div>
		</div>
	);
}
