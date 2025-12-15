"use client"

import TodayWord from "@/widgets/word/ui/todayWord";
import WordSearchResult from "@/widgets/word/ui/wordSearchResult";
import { useSearchParams } from "next/navigation";

export default function Dictionary() {
    const searchParams = useSearchParams();
    const word = searchParams.get("word");
    const isWord = word !== null && word.length > 0;

    return (
        isWord ? <WordSearchResult /> : <TodayWord />
    );
}
