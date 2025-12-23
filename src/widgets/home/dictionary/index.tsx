"use client"

import { useRouter } from 'next/navigation'

export default function MiniDictionaryList({ words }: { words: string[] }) {
    const router = useRouter()

    const handleWordClick = (word: string) => {
        // 단어사전 페이지로 이동하면서 쿼리 파라미터로 단어 전달
        router.push(`/dictionary?word=${encodeURIComponent(word)}`)
    }

    return (
        <div className="w-full mt-4">
            {/* 2열 그리드 레이아웃 (가로 2개) */}
            <div className="grid grid-cols-2 gap-4">
                {words.map((word, index) => (
                    <div 
                        key={index}
                        onClick={() => handleWordClick(word)}
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        <p className="text-center font-medium">{word}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}