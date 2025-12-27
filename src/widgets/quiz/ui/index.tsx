"use client";

import Image from "next/image";
import { useState } from "react";
import { useGetQuizs } from "@/entities/quiz/model/useGetQuizs";
import { useSolveQuiz } from "@/entities/quiz/model/useSolveQuiz";
import finishQuiz from "@/shared/assets/finishQuiz.svg";

export default function QuizComponent() {
	const [selected, setSelected] = useState<number | null>(null);
	const [submitted, setSubmitted] = useState(false);

	const { data: quizData, isLoading, isSuccess, isError } = useGetQuizs();

	const { mutate } = useSolveQuiz();

	const handleSelect = (index: number) => {
		if (submitted) return;
		setSelected(index);
	};

	const handleSubmit = () => {
		if (selected === null || submitted) return;
		setSubmitted(true);
		mutate(true, {
			onSettled: () => {
				setTimeout(() => {
					setSelected(null);
					setSubmitted(false);
				}, 1000);
			}
		});
	};

	if (isLoading) {
		return (
			<div className="flex justify-center items-center p-8">
				<div className="text-gray-500">퀴즈 로딩 중...</div>
			</div>
		);
	}

	if (isError || !isSuccess) {
		return (
			<div className="flex justify-center items-center p-8">
				<div className="text-red-500">퀴즈를 불러올 수 없습니다.</div>
			</div>
		);
	}

	if (quizData.quiz === null || quizData.quizCount >= 5) {
		return (
			<div className="flex flex-col items-center justify-center p-8 space-y-4">
				<Image
					src={finishQuiz}
					alt="퀴즈 완료"
					height={32}
					width={32}
					className="w-32 h-32"
				/>
				<h3 className="text-xl font-bold text-center">
					오늘의 퀴즈를 모두 풀었습니다!
				</h3>
			</div>
		);
	}

	return (
		<div>
			<h3 className="text-lg font-semibold mb-4">오늘의 경제 퀴즈</h3>

			<span className="font-[pretendard] font-semibold text-xl">
				{quizData.quiz}
			</span>

			{quizData.a ? (
				<div className="mt-3 flex flex-col gap-2">
					{quizData.a.map((option, index) => {
						const getMultipleChoiceClassName = () => {
							if (submitted) {
								if (index === quizData.result) return "bg-green-100 border-green-500";
								if (index === selected) return "bg-red-100 border-red-500";
								return "bg-brand-bg border-black/20";
							}
							if (selected === index) return "bg-brand-b2 border-black/40";
							return "bg-brand-bg border-black/20 hover:bg-brand-b2";
						};

						return (
							<button
								key={option}
								disabled={submitted}
								onClick={() => handleSelect(index)}
								className={`w-full min-h-[2.875rem] p-4 text-left rounded-[27px] border transition-colors cursor-pointer ${getMultipleChoiceClassName()}`}
							>
								{index + 1}. {option}
							</button>
						);
					})}
				</div>
			) : (
				<div className="mt-3 flex gap-4">
					{["O", "X"].map((label, index) => {
						const getOXClassName = () => {
							if (submitted) {
								if (index === quizData.result) return "bg-green-100 border-green-500";
								if (index === selected) return "bg-red-100 border-red-500";
								return "bg-brand-bg border-black/20";
							}
							if (selected === index) return "bg-brand-b2 border-black/40";
							return "bg-brand-bg border-black/20 hover:bg-brand-b2";
						};

						return (
							<button
								key={label}
								disabled={submitted}
								onClick={() => handleSelect(index)}
								className={`w-full h-[2.875rem] rounded-[27px] border transition-colors font-semibold cursor-pointer ${getOXClassName()}`}
							>
								{label}
							</button>
						);
					})}
				</div>
			)}

			<button
				onClick={handleSubmit}
				disabled={selected === null}
				className={
					selected === null
						? "w-full h-[2.875rem] mt-4 rounded-[27px] font-semibold transition-colors bg-gray-300 text-gray-500 cursor-not-allowed"
						: submitted && selected !== quizData.result
							? "w-full h-[2.875rem] mt-4 rounded-[27px] font-semibold transition-colors bg-red-500 text-white hover:bg-red-600"
							: "w-full h-[2.875rem] mt-4 rounded-[27px] font-semibold transition-colors bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
				}
			>
				{submitted && selected !== quizData.result
					? "다시 풀기"
					: submitted
						? "제출 완료"
						: "제출하기"}
			</button>

			<div className="w-full flex justify-center mt-4">
				<span className="text-[15px] font-semibold font-[pretendard]">
					{quizData.quizCount + 1}/5
				</span>
			</div>
		</div>
	);
}
