// words를 배열로 받아서 2열 3행 그리드로 표시
export default function MiniDictionaryList({ words }: { words: string[] }) {
    return (
        <div className="w-full mt-4">
            {/* 2열 그리드 레이아웃 (가로 2개) */}
            <div className="grid grid-cols-2 gap-4">
                {words.map((word, index) => (
                    <div 
                        key={index}
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-colors"
                    >
                        <p className="text-center font-medium">{word}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}