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

  const cleanText = (text: string): string => {
    return text
      .replace(/<[^>]*>/g, "")
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  };

  const fetchNews = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(`/api/news?query=경제`);
      if (!response.ok) throw new Error("뉴스를 불러오는데 실패했습니다");
      
      const data = await response.json();
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
      console.log('=== 뉴스 클릭 ===');
      console.log('뉴스 URL:', newsUrl);
      
      // 저장된 토큰 가져오기
      const token = localStorage.getItem('idToken') || sessionStorage.getItem('idToken');
      
      if (!token) {
        console.warn('토큰이 없습니다 - 뉴스만 열기');
        window.open(newsUrl, '_blank');
        return;
      }
      
      // 백엔드 API 호출
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({}),
        credentials: 'include',
      });

      console.log('Response Status:', response.status);
      const data = await response.json();
      console.log('Response Data:', data);

      // 성공 여부와 관계없이 뉴스 열기
      window.open(newsUrl, '_blank');
      
    } catch (error) {
      console.error('뉴스 처리 오류:', error);
      // 에러 발생해도 뉴스는 열기
      window.open(newsUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-4 mt-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-[140px] bg-gray-100 rounded-lg animate-pulse" />
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
      {news.map((item, i) => (
        <div
          key={i}
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