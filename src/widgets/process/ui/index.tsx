import { MyPageDondon } from "@/shared/assets/mypage_dondon";

export default function ProcessComponent(props: {
	sequenceDays: number;
	level: number;
}) {
	const today = new Date();
	const formattedDate = `${today.getFullYear()}.${today.getMonth() + 1}.${today.getDate()}`;

	return (
		<section className="relative w-full h-full p-8 overflow-hidden">
			{/* Flex Container */}
			<div className="flex items-center w-[80%] justify-between">
				{/* Left Section - 텍스트 콘텐츠 */}
				<div className="flex flex-col gap-4 w-full z-10">
					{/*오늘 날짜*/}
					<p className=" text-black font-[pretendard] text-lg font-bold">
						{formattedDate}
					</p>
					{/*연속 일수*/}
					<h2 className="text-balck font-normal font-[pretendard] text-8xl">
						{props.sequenceDays}
						<span className="text-6xl font-[pretendard] font-medium">일차</span>
					</h2>
					{/* 성장도 진행 */}
					<div className="flex items-center gap-2">
						<span className="bg-[#E67E22] text-black text-[1rem] font-[pretendard] font-semibold px-4 py-2 rounded-full">
							성장도
						</span>
						<div className="flex-1 h-3 bg-white/40 rounded-full overflow-hidden">
							<div
								className="h-full bg-[#E67E22] rounded-full"
								style={{ width: `${props.level}%` }}
							></div>
						</div>
					</div>
				</div>
				{/* Right Section - 캐릭터 이미지 */}
				<div className="relative w-1/2 flex justify-end">
					<MyPageDondon />
				</div>
			</div>
		</section>
	);
}
