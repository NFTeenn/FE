"use client";

import { useSearchParams } from "next/navigation";
import TodayWord from "@/widgets/word/ui/todayWord";
import WordSearchResult from "@/widgets/word/ui/wordSearchResult";

export default function Dictionary() {
    const searchParams = useSearchParams();
    const word = searchParams.get("word");
    const isWord = word !== null && word.length > 0;

    return isWord ? <WordSearchResult /> : <TodayWord />;
}
