"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import MissionListComponent from "@/widgets/home/mission";
import ProcessComponent from "@/widgets/home/process";
import MiniDictionaryList from "@/widgets/home/dictionary";
import MainNewsList from "@/widgets/home/news";
import QuizComponent from "@/widgets/home/quiz";
import { FiMessageSquare, FiX } from "react-icons/fi";
import type { HomeData } from "@/types/home";

const titles = ["돈돈 출석체크 하기", "오늘의 단어 퀴즈 풀기", "돈돈 경제 뉴스 보기", "돈돈 경제 단어 검색하기"];

export default function Main() {
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/home");
        setHomeData(response.data);
        setError(null);
      } catch (err: any) {
        setError("데이터를 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || chatLoading) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setChatLoading(true);

    try {
      const res = await axios.post("/api/chat", { 
        message: userMsg,
        history: messages.slice(-6)
      });
      const botMsg = res.data.bot || "응답 없음";
      setMessages(prev => [...prev, { role: "bot", content: botMsg }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "bot", content: "죄송합니다. 응답 중 오류가 발생했습니다." }]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (error || !homeData) {
    return (
      <div className="w-screen min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-red-500">{error || "데이터를 불러올 수 없습니다."}</div>
      </div>
    );
  }

  return (
    <>
      <div className="w-screen min-h-screen bg-gray-50 flex flex-row gap-[5vw] py-[4vh]">
        <div className="w-[920px] h-auto flex flex-col ml-20 gap-4">
          <div className="w-full h-[250px] rounded-2xl border border-black/20 bg-brand-b3">
            <ProcessComponent sequenceDays={homeData.day} level={homeData.level} />
          </div>

          <div className="w-full h-auto px-[3rem] pt-[1rem] rounded-2xl border border-black/20 bg-white pb-8">
            <h2 className="text-xl font-semibold">경제 사전</h2>
            <input
              className="w-full h-[3rem] rounded-[18px] border border-black/20 pl-4 mt-4"
              placeholder="경제 단어 검색하기"
            />
            <MiniDictionaryList words={homeData.words ?? []} />
          </div>

          <div className="w-full h-auto pb-4 rounded-2xl border border-black/20 bg-white p-6">
            <h2 className="text-xl font-semibold mb-4">경제 뉴스</h2>
            <div className="text-sm text-gray-700 whitespace-pre-wrap">
              <MainNewsList />
            </div>
          </div>
        </div>

        <div className="w-[360px] h-auto gap-10 flex flex-col">
          <div className="w-full h-[20rem] bg-white rounded-[1.125rem] border border-black/20 flex flex-col pt-[1.75rem] pl-[2rem]">
            <span className="text-[1rem] font-semibold">Daily 미션</span>
            <hr className="w-[calc(100%+2rem)] border-t border-black/20 ml-[-2rem] mt-4" />
            <div className="flex flex-col w-[80%] items-center mt-4">
              {titles.map((title, index) => (
                <MissionListComponent key={index} title={title} cleared={homeData.mission?.[index] ?? "0"} />
              ))}
            </div>
          </div>

          <div className="w-full h-auto bg-white rounded-[1.125rem] border border-black/20 flex flex-col p-6">
            <QuizComponent />
          </div>

          <div className="flex justify-end mt-4">
            <button
              className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition"
              onClick={() => setChatOpen(true)}
            >
              <FiMessageSquare size={24} />
            </button>
          </div>
        </div>
      </div>

      {chatOpen && (
        <div className="fixed top-0 right-0 h-full w-[400px] bg-white shadow-lg border-l border-gray-300 flex flex-col z-50">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <span className="font-semibold text-lg">AI 챗봇</span>
            <button onClick={() => setChatOpen(false)} className="text-gray-600 hover:text-gray-900">
              <FiX size={24} />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3" ref={scrollRef}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[85%] ${
                    msg.role === "user" 
                      ? "bg-blue-500 text-white" 
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: "0.1s"}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="메시지를 입력하세요"
              disabled={chatLoading}
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition"
              disabled={chatLoading}
            >
              전송
            </button>
          </div>
        </div>
      )}
    </>
  );
}