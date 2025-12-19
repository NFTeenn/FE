"use client";

import { useEffect, useState } from "react";

interface NewsItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
}

export default function MainNewsList() {
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

  // 날짜 포맷 함수
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 60) {
      return `${diffMinutes}분 전`;
    } else if (diffHours < 24) {
      return `${diffHours}시간 전`;
    } else {
      return date.toLocaleDateString("ko-KR", {
        month: "long",
        day: "numeric",
      });
    }
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
        <a
          key={index}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="h-[140px] border border-black/10 rounded-lg p-4 hover:border-black/30 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <h3 className="font-semibold text-sm line-clamp-2 mb-2">
              {item.title}
            </h3>
            <p className="text-xs text-gray-600 line-clamp-2">
              {item.description}
            </p>
          </div>
          <time className="text-xs text-gray-400 mt-2">
            {formatDate(item.pubDate)}
          </time>
        </a>
      ))}
    </div>
  );
}