"use client";

import { useRouter } from "next/navigation";

export default function MiniDictionaryList({ words }: { words: string[] }) {
	const router = useRouter();

	const handleWordClick = (word: string) => {
		router.push(`/dictionary?word=${encodeURIComponent(word)}`);
	};

	return (
		<div className="w-full mt-4">
			<div className="grid max-sm:grid-cols-1 grid-cols-2 gap-4">
				{words.map((word) => (
					<button
						key={word}
						onClick={() => handleWordClick(word)}
						className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
					>
						<p className="text-center font-medium">{word}</p>
					</button>
				))}
			</div>
		</div>
	);
}
