"use client";

import { useState, useRef, useEffect } from "react";
import { FiX } from "react-icons/fi";
import axios from "axios";

export default function ChatBotModal({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("/api/chat", { message: userMsg });
      const botMsg = res.data.bot || "응답 없음";
      setMessages(prev => [...prev, { role: "bot", content: botMsg }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "bot", content: "챗봇 응답 실패" }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed top-0 right-0 h-full w-[400px] bg-white shadow-lg border-l border-gray-300 flex flex-col z-50">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <span className="font-semibold text-lg">AI 챗봇</span>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
          <FiX size={24} />
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-2" ref={scrollRef}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-[80%] ${
              msg.role === "user" ? "bg-blue-100 self-end" : "bg-gray-100 self-start"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2"
          placeholder="메시지를 입력하세요"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
          disabled={loading}
        >
          전송
        </button>
      </div>
    </div>
  );
}
