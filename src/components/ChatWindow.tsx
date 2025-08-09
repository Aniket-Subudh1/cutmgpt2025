"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, MoreHorizontal, RefreshCw } from "lucide-react";
import MessageBubble from "./MessageBubble";
import Image from "next/image";

export default function ChatWindow() {
  const [messages, setMessages] = useState<{ role: string; content: string; timestamp: number }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [messages]);
  useEffect(() => { if (window.innerWidth >= 768) inputRef.current?.focus(); }, []);

  const sanitizeInput = (text: string) => text.replace(/<[^>]*>/g, '').replace(/javascript:/gi, '').replace(/on\w+\s*=/gi, '').trim().slice(0, 2000);

  async function sendMessage() {
    const sanitizedInput = sanitizeInput(input);
    if (!sanitizedInput.trim()) return;
    const userMessage = { role: "user", content: sanitizedInput, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInput(""); setLoading(true); setShowWelcome(false);

    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: sanitizedInput }) });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const assistantContent = data.choices?.[0]?.message?.content || data.reply || "I couldn't process your request right now.";
      setMessages(prev => [...prev, { role: "assistant", content: assistantContent, timestamp: Date.now() }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Technical issue, please try again shortly.", timestamp: Date.now() }]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } };
  const startNewChat = () => { setMessages([]); setShowWelcome(true); setInput(""); };
  const quickPrompts = ["Tell me about CUTM programs and courses", "What are the campus facilities available?", "How do I apply for admission?", "Research opportunities at CUTM"];
  const handleQuickPrompt = (prompt: string) => { setInput(prompt); inputRef.current?.focus(); };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-yellow-50 to-white">
      
      {/* Header */}
      <div className="backdrop-blur-xl bg-white/60 border-b border-yellow-200 shadow-sm px-4 md:px-6 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image src="./logo.svg" width={40} height={40} alt="logo" />
            <div>
              <h2 className="text-sm font-bold text-yellow-700">CUTM-GPT</h2>
              <p className="text-xs text-yellow-500">Powered by CUTM AI</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {messages.length > 0 && (
              <button onClick={startNewChat} className="p-2 rounded-lg hover:bg-yellow-100 transition">
                <RefreshCw className="w-4 h-4 text-yellow-600" />
              </button>
            )}
            <button className="p-2 rounded-lg hover:bg-yellow-100 transition">
              <MoreHorizontal className="w-4 h-4 text-yellow-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {showWelcome && messages.length === 0 && (
            <div className="text-center mb-8 animate-fade-in">
              <div className="flex justify-center mb-4">
                <Image src="./logo.svg" width={80} height={40} alt="logo" />
              </div>
              <h3 className="text-xl font-semibold text-yellow-700">Welcome to CUTM-GPT</h3>
              <p className="text-yellow-600 mb-6 max-w-md mx-auto">Ask me anything about programs, admissions, facilities, or campus life.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                {quickPrompts.map((prompt, i) => (
                  <button key={i} onClick={() => handleQuickPrompt(prompt)} className="p-4 text-left bg-white/50 backdrop-blur-xl border border-yellow-200 rounded-xl hover:border-yellow-400 hover:bg-yellow-50 transition-all">
                    <p className="text-sm text-yellow-700">{prompt}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <MessageBubble key={`${msg.timestamp}-${idx}`} role={msg.role} content={msg.content} timestamp={msg.timestamp} />
          ))}

          {loading && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-white/50 backdrop-blur-xl border border-yellow-200 rounded-2xl px-4 py-3 shadow">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-medium text-yellow-700">CUTM-GPT</span>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="backdrop-blur-xl bg-white/70 border-t border-yellow-200 px-4 md:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full px-4 py-3 pr-12 bg-white/50 backdrop-blur-xl border border-yellow-200 rounded-xl focus:ring-2 focus:ring-yellow-400 resize-none"
              placeholder="Ask me anything..."
              disabled={loading}
              maxLength={2000}
              rows={1}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = '48px';
                target.style.height = Math.min(target.scrollHeight, 120) + 'px';
              }}
            />
            <div className="absolute right-3 bottom-3 text-xs text-yellow-500">{input.length}/2000</div>
          </div>
          <button onClick={sendMessage} disabled={loading || !input.trim()} className="w-12 h-12 bg-yellow-400 hover:bg-yellow-500 text-white rounded-xl flex items-center justify-center">
            {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-yellow-50 px-4 md:px-6 py-3 border-t border-yellow-200 text-center text-xs text-yellow-600">
        Crafted with excellence by <span className="font-semibold">DevSomeware</span>
      </div>
    </div>
  );
}
