"use client"

import TodayWord from "@/widgets/word/ui/todayWord";
import WordSearchResult from "@/widgets/word/ui/wordSearchResult";
import { useSearchParams } from "next/navigation";

export default function Dictionary() {
    const searchParams = useSearchParams();
    const isWord = String(searchParams.get("word"))?.length > 0 ? true : false;
    console.log(isWord)

    return (
        isWord ? <WordSearchResult /> : <TodayWord />
    );
}
