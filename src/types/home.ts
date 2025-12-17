export interface HomeData {
    day: number;
    level: number;
    mission: string[];
    quizCount: number;
    quiz: string;
    a: string[] | null; // OX 퀴즈일 경우 null
    words: string[];
    result: number; // 정답 인덱스 (OX: 0=O, 1=X 또는 다른 값)
    content: string;
}

