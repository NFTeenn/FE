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
      // 쿠키에서 토큰 가져오기
      const getTokenFromCookie = () => {
        const cookies = document.cookie.split(';');
        const tokenCookie = cookies.find(c => c.trim().startsWith('idToken='));
        return tokenCookie ? tokenCookie.split('=')[1] : null;
      };

      const token = getTokenFromCookie();
      
      if (!token) {
        console.warn('토큰이 없습니다 - 뉴스만 열기');
        window.open(newsUrl, '_blank');
        return;
      }
      
      // 백엔드 API 호출 (body 없이 header만)
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });

      console.log('Response Status:', response.status);
      
      // text/plain으로 응답이 오므로 text()로 파싱
      const data = await response.text();
      console.log('Response Body:', data);

      if (response.ok && data === '1') {
        console.log('미션 완료 - 뉴스 열기');
      }
      
      window.open(newsUrl, '_blank');
      
    } catch (error) {
      console.error('뉴스 처리 오류:', error);
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