"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import TodayWord from "@/widgets/dictionary/ui/todayWord";
import WordSearchResult from "@/widgets/dictionary/ui/wordSearchResult";

function DictionaryContent() {
	const searchParams = useSearchParams();
	const word = searchParams.get("word");
	const isWord = word !== null && word.length > 0;

	return isWord ? <WordSearchResult /> : <TodayWord />;
}

export default function Dictionary() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<DictionaryContent />
		</Suspense>
	);
}
