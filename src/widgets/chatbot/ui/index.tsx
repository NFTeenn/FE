"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";

export default function ChatBotModal({ onClose }: { onClose: () => void }) {
	const [messages, setMessages] = useState<{ role: string; content: string }[]>(
		[],
	);
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);
	const scrollRef = useRef<HTMLDivElement>(null);

	const handleSend = async () => {
		if (!input.trim() || loading) return;

		const userMsg = input;
		setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
		setInput("");
		setLoading(true);

		try {
			const res = await axios.post("/api/chat", {
				message: userMsg,
				history: messages.slice(-6),
			});
			const botMsg = res.data.bot || "응답 없음";
			setMessages((prev) => [...prev, { role: "bot", content: botMsg }]);
		} catch (err) {
			setMessages((prev) => [
				...prev,
				{ role: "bot", content: "죄송합니다. 응답 중 오류가 발생했습니다." },
			]);
		} finally {
			setLoading(false);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.nativeEvent.isComposing) return;
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

	return (
		<div className="fixed top-0 right-0 h-full w-[400px] bg-white shadow-lg border-l border-gray-300 flex flex-col z-50">
			<div className="flex items-center justify-between p-4 border-b border-gray-200">
				<span className="font-semibold text-lg">AI 챗봇</span>
				<button
					onClick={onClose}
					className="text-gray-600 hover:text-gray-900 cursor-pointer"
				>
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
				{loading && (
					<div className="flex justify-start">
						<div className="bg-gray-100 p-3 rounded-lg">
							<div className="flex space-x-1">
								<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
								<div
									className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
									style={{ animationDelay: "0.1s" }}
								></div>
								<div
									className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
									style={{ animationDelay: "0.2s" }}
								></div>
							</div>
						</div>
					</div>
				)}
			</div>

			<div className="p-4 border-t border-gray-200 flex gap-2">
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={handleKeyPress}
					className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					placeholder="메시지를 입력하세요"
					disabled={loading}
				/>
				<button
					onClick={handleSend}
					className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 disabled:bg-blue-300 transition"
					disabled={loading}
				>
					전송
				</button>
			</div>
		</div>
	);
}
