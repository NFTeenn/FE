import { useRouter } from "next/navigation";
import { useGetLikes } from "@/features/likes/model/useGetLikes";
import { useSaveLikes } from "@/features/likes/model/useSaveLikes";
import Arrow from "@/shared/assets/arrow";
import Star from "@/shared/assets/star";
import X from "@/shared/assets/x";

export const Modal = ({
	setIsModalOpen,
}: {
	setIsModalOpen: (value: boolean) => void;
}) => {
	const { data: likes } = useGetLikes({});
	const { mutate: saveLikes } = useSaveLikes();
	const router = useRouter();

	return (
		<div
			role="listbox"
			className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4"
			onClick={() => setIsModalOpen(false)}
		>
			<div
				className="bg-white p-4 md:p-6 rounded-lg shadow-lg flex flex-col w-full md:w-3/4 lg:w-1/2 h-[90vh] md:h-[70vh] lg:h-1/2 overflow-hidden"
				onClick={(e) => e.stopPropagation()}
				role="dialog"
			>
				<div className="flex justify-between items-center mb-4">
					<p className="font-bold text-lg md:text-xl">즐겨찾기 목록</p>
					<X
						className="w-5 h-5 md:w-4 md:h-4 cursor-pointer flex-shrink-0"
						onClick={() => setIsModalOpen(false)}
					/>
				</div>

				<div className="flex flex-col flex-1 overflow-hidden">
					<div className="flex items-center justify-center border border-b-0 border-black/20 w-full md:w-1/2 p-2 rounded-tl-xl bg-brand-bg overflow-hidden">
						<p className="text-sm md:text-base">단어</p>
					</div>

					<ul className="flex flex-col flex-1 gap-2 md:gap-3 border border-black/20 p-3 md:p-4 rounded-xl rounded-tl-none overflow-y-auto">
						{!likes?.length ? (
							<li className="text-center text-black/40 py-8">
								즐겨찾기한 단어가 없습니다.
							</li>
						) : (
							likes.map((like) => (
								<article
									key={like.targetId}
									className="flex flex-col md:flex-row gap-3 md:gap-4 p-3 md:p-4 rounded-xl border border-black/20"
								>
									<div className="flex-1 flex flex-col min-w-0">
										<p className="font-bold text-base md:text-xl line-clamp-1">
											{like.word}
										</p>
										<p className="line-clamp-2 text-sm md:text-base text-black/70">
											{like.description}
										</p>
									</div>

									<div className="flex md:flex-col justify-between md:justify-between items-center md:items-end gap-2">
										<Star
											color={like.liked === true ? "#FFD63A" : "none"}
											className="cursor-pointer w-6 h-6 md:w-5 md:h-5 flex-shrink-0"
											onClick={() => {
												saveLikes({ targetId: like.targetId });
											}}
										/>
										<div className="flex items-center cursor-pointer group">
											<p
												className="text-[#fb923c] text-sm md:text-base whitespace-nowrap group-hover:underline"
												onClick={() =>
													router.push(`/dictionary?word=${like.word}`)
												}
											>
												보러가기
											</p>
											<Arrow className="w-4 h-4 flex-shrink-0" />
										</div>
									</div>
								</article>
							))
						)}
					</ul>
				</div>
			</div>
		</div>
	);
};
