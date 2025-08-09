"use client";

import { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatWindow() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    {
      role: "assistant",
      content: "Hello! Welcome to Centurion University of Technology and Management (CUTM). I'm here to help you explore our various programs, facilities, and achievements. What would you like to know about CUTM?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sanitizeInput = (text: string) => {
    return text
      .replace(/<[^>]*>/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .trim()
      .slice(0, 1000);
  };

  async function sendMessage() {
    const sanitizedInput = sanitizeInput(input);
    if (!sanitizedInput.trim()) return;

    const userMessage = { role: "user", content: sanitizedInput };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: sanitizedInput })
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      const assistantContent = data.choices?.[0]?.message?.content || data.reply || "I apologize, but I couldn't process your request at the moment. Please try again.";
      
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantContent }
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm experiencing some technical difficulties. Please try again in a moment." }
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Chat Container */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Chat Messages Area */}
        <div className="h-[70vh] p-6 overflow-y-auto custom-scrollbar">
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <MessageBubble 
                key={idx} 
                role={msg.role} 
                content={msg.content}
              />
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100/80 backdrop-blur-sm rounded-2xl rounded-bl-sm px-4 py-3 max-w-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">AI</span>
                    </div>
                    <span className="text-xs font-medium text-gray-600">CutMGPT Assistant</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white/40 backdrop-blur-md border-t border-white/20">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full px-6 py-4 bg-white/70 backdrop-blur-sm border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-200 placeholder-gray-500 text-gray-800"
                placeholder="Ask me anything about Centurion University..."
                disabled={loading}
                maxLength={1000}
              />
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                <span className="text-xs text-gray-400">{input.length}/1000</span>
              </div>
            </div>
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}