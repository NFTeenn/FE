"use client";
import { useEffect, useState } from "react";

interface NewsItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
}

const EconomicNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("경제");

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
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 뉴스 데이터 가져오기
  const fetchNews = async (searchQuery: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const encodedQuery = encodeURIComponent(searchQuery);
      const response = await fetch(`/api/news?query=${encodedQuery}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "뉴스를 불러오는데 실패했습니다");
      }

      const data = await response.json();

      // 데이터 정제
      const cleanedNews: NewsItem[] = (data.items || []).map((item: any) => ({
        ...item,
        title: cleanText(item.title),
        description: cleanText(item.description),
      }));

      setNews(cleanedNews);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "뉴스를 불러오는데 실패했습니다";
      setError(errorMessage);
      // 데모용 샘플 데이터
      setNews([
        {
          title: "한국은행, 기준금리 동결 결정",
          description:
            "한국은행이 기준금리를 3.5%로 유지하기로 결정했습니다. 물가 안정과 경제 성장을 고려한 결정입니다.",
          link: "#",
          pubDate: new Date().toISOString(),
        },
        {
          title: "코스피 2500선 돌파, 증시 상승세",
          description:
            "코스피 지수가 2500선을 돌파하며 강한 상승세를 보이고 있습니다.",
          link: "#",
          pubDate: new Date().toISOString(),
        },
        {
          title: "부동산 시장 안정화 조짐",
          description:
            "수도권 부동산 시장이 안정화 조짐을 보이면서 거래량이 증가하고 있습니다.",
          link: "#",
          pubDate: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(query);
  }, []);

  const handleSearch = () => {
    fetchNews(query);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">경제 뉴스</h1>

      {/* 검색 입력 */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            placeholder="검색어를 입력하세요 (예: 경제, 증시, 부동산)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            검색
          </button>
        </div>
      </div>

      {/* 빠른 검색 버튼 */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["경제", "증시", "금융", "부동산", "금리"].map((keyword) => (
          <button
            key={keyword}
            onClick={() => {
              setQuery(keyword);
              fetchNews(keyword);
            }}
            className="px-4 py-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors text-sm"
          >
            {keyword}
          </button>
        ))}
      </div>

      {/* 로딩 상태 */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">뉴스를 불러오는 중...</p>
        </div>
      )}

      {/* 에러 메시지 */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800">
            ⚠️ {error}
            <br />
            <span className="text-sm">
              샘플 데이터를 표시합니다. 실제 사용 시 백엔드 서버를 통해 API를
              호출하세요.
            </span>
          </p>
        </div>
      )}

      {/* 뉴스 목록 */}
      {!loading && (
        <div className="space-y-4">
          {news.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              검색 결과가 없습니다.
            </p>
          ) : (
            news.map((item, index) => (
              <article
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
              >
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <time className="text-sm text-gray-400">
                    {formatDate(item.pubDate)}
                  </time>
                </a>
              </article>
            ))
          )}
        </div>
      )}

      {/* 총 개수 표시 */}
      {!loading && news.length > 0 && (
        <p className="text-center text-gray-500 mt-6 text-sm">
          총 {news.length}개의 뉴스
        </p>
      )}
    </div>
  );
};

export default EconomicNews;
