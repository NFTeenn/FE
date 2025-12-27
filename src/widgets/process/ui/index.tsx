import { MyPageDondon } from "@/shared/assets/mypage_dondon";

export default function ProcessComponent(props: {
	sequenceDays: number;
	level: number;
}) {
	const today = new Date();
	const formattedDate = `${today.getFullYear()}.${today.getMonth() + 1}.${today.getDate()}`;

	return (
		<section className="w-full h-full px-10 py-6 overflow-hidden">
			<div className="flex items-start justify-between gap-8">
				<div className="flex flex-col gap-4 w-full">
					<p className=" text-black  text-lg font-bold">
						{formattedDate}
					</p>
					<h2 className="text-black font-normal text-8xl">
						{props.sequenceDays}
						<span className="text-6xl font-medium">일차</span>
					</h2>
					<div className="flex items-center gap-2">
						<span className="bg-[#E67E22] text-black text-[1rem] font-semibold px-4 py-2 rounded-full">
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
				<div className="w-1/2 flex justify-end">
					<MyPageDondon className="h-full" />
				</div>
			</div>
		</section>
	);
}
