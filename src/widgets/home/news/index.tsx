"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface NewsItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
}

export default function MainNewsList() {
  const router = useRouter();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  // HTML 태그 및 엔티티 제거 함수
  const cleanText = (text: string): string => {
    return text
      .replace(/<[^>]*>/g, "")
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  };



  // 뉴스 데이터 가져오기
  const fetchNews = async (): Promise<void> => {
    setLoading(true);

    try {
      const response = await fetch(`/api/news?query=경제`);

      if (!response.ok) {
        throw new Error("뉴스를 불러오는데 실패했습니다");
      }

      const data = await response.json();

      // 데이터 정제 및 6개만 가져오기
      const cleanedNews: NewsItem[] = (data.items || [])
        .slice(0, 6)
        .map((item: any) => ({
          ...item,
          title: cleanText(item.title),
          description: cleanText(item.description),
        }));

      setNews(cleanedNews);
    } catch (err) {
      console.error("뉴스 로딩 오류:", err);
      // 에러 발생 시 빈 배열
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleNewsClick = async (newsUrl: string) => {
    try {
      // /api/news/redirect로 POST 요청
      const response = await fetch('/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: newsUrl
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // 응답에서 받은 URL로 이동 (또는 /news 페이지로)
        router.push(`/news?articleUrl=${encodeURIComponent(newsUrl)}`);
      }
    } catch (error) {
      console.error('뉴스 리다이렉트 오류:', error);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-4 mt-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="h-[140px] bg-gray-100 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-500">
        뉴스를 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {news.map((item, index) => (
        <div
          key={index}
          onClick={() => handleNewsClick(item.link)}
          className="h-[140px] border border-black/10 rounded-lg p-4 hover:border-black/30 hover:shadow-md transition-all cursor-pointer"
        >
          <h3 className="font-semibold text-sm line-clamp-2 mb-2">
            {item.title}
          </h3>
          <p className="text-xs text-gray-600 line-clamp-3">
            {item.description}
          </p>
        </div>
      ))}
      <div></div>
      <div className="w-full flex justify-center cursor-pointer">
        <a href="/news">더보기</a>
      </div>
    </div>
  );
}