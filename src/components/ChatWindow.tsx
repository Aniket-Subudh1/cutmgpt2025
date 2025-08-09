"use client";

import { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatWindow() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    {
      role: "assistant",
      content: "Hello! Welcome to Centurion University of Technology and Management (CUTM). I'm your AI assistant, ready to help you explore our programs, facilities, and achievements. What would you like to know about CUTM today?"
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
    <div className="max-w-5xl mx-auto">
      {/* Chat Container */}
      <div className="glass-strong rounded-3xl shadow-2xl overflow-hidden border border-white/40 transform-gpu">
        
        {/* Chat Header */}
        <div className="glass-yellow border-b border-white/30 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-yellow-900">CutMGPT Assistant</h3>
                <p className="text-sm text-yellow-700">Always here to help</p>
              </div>
            </div>
            <div className="text-sm text-yellow-800 glass-subtle px-3 py-1 rounded-full">
              Active now
            </div>
          </div>
        </div>
        
        {/* Chat Messages Area */}
        <div className="h-[60vh] lg:h-[65vh] p-8 overflow-y-auto custom-scrollbar bg-gradient-to-b from-white/30 to-white/10">
          <div className="space-y-6">
            {messages.map((msg, idx) => (
              <MessageBubble 
                key={idx} 
                role={msg.role} 
                content={msg.content}
              />
            ))}
            {loading && (
              <div className="flex justify-start animate-fade-in">
                <div className="glass-subtle rounded-3xl rounded-bl-lg px-6 py-4 max-w-sm border border-white/30">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">AI</span>
                    </div>
                    <span className="text-sm font-semibold text-yellow-800">CutMGPT</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-3 h-3 bg-yellow-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="glass-yellow border-t border-white/30 p-8">
          <div className="flex items-end space-x-4">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full px-6 py-4 glass-strong border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300 placeholder-yellow-600/60 text-yellow-900 font-medium resize-none"
                placeholder="Ask me anything about Centurion University..."
                disabled={loading}
                maxLength={1000}
              />
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                <span className="text-xs text-yellow-600/70 font-medium">{input.length}/1000</span>
              </div>
            </div>
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-semibold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl hover:shadow-2xl btn-hover flex items-center space-x-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span className="hidden sm:block">Send</span>
                </>
              )}
            </button>
          </div>
          
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 mt-4">
            {[
              "Tell me about CUTM programs",
              "Campus facilities",
              "Admission process",
              "Research opportunities"
            ].map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => setInput(suggestion)}
                className="glass-subtle px-4 py-2 rounded-full text-sm text-yellow-800 hover:glass-yellow transition-all duration-200 transform hover:scale-105 border border-white/30"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}