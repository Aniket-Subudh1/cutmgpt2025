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
    <div className="h-full flex flex-col bg-gradient-to-br from-yellow-50 via-orange-50 to-white relative overflow-hidden">
      
      {/* Subtle background effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-200/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-200/10 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
      
      {/* Header */}
      <div className="backdrop-blur-xl bg-white/60 border-b border-white/30 shadow-sm px-4 md:px-6 py-4 sticky top-0 z-10 relative">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image src="./logo.svg" width={40} height={40} alt="logo" className="filter drop-shadow-sm" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <h2 className="text-sm font-bold text-yellow-700">CUTM-GPT</h2>
              <p className="text-xs text-yellow-600">Powered by CUTM AI</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {messages.length > 0 && (
              <button 
                onClick={startNewChat} 
                className="p-2.5 rounded-xl hover:bg-white/50 backdrop-blur-sm transition-all duration-200 group border border-white/20"
                title="New Chat"
              >
                <RefreshCw className="w-4 h-4 text-yellow-600 group-hover:rotate-180 transition-transform duration-300" />
              </button>
            )}
            <button 
              className="p-2.5 rounded-xl hover:bg-white/50 backdrop-blur-sm transition-all duration-200 border border-white/20"
              title="Options"
            >
              <MoreHorizontal className="w-4 h-4 text-yellow-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 custom-scrollbar">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {showWelcome && messages.length === 0 && (
            <div className="text-center mb-8 animate-fade-in-up">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 backdrop-blur-md bg-white/40 border border-white/50 rounded-2xl flex items-center justify-center shadow-lg">
                    <Image src="./logo.svg" width={40} height={40} alt="logo" className="filter drop-shadow-sm" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 backdrop-blur-md bg-white/30 border border-yellow-300/50 rounded-full flex items-center justify-center shadow-lg animate-float">
                    <Sparkles className="w-4 h-4 text-yellow-600" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-yellow-700 mb-2">Welcome to CUTM-GPT</h3>
              <p className="text-yellow-600 mb-8 max-w-md mx-auto leading-relaxed">Your intelligent AI assistant for programs, admissions, facilities, and campus life at Centurion University.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {quickPrompts.map((prompt, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleQuickPrompt(prompt)} 
                    className="group p-4 text-left backdrop-blur-xl bg-white/40 border border-white/50 rounded-2xl hover:bg-white/60 hover:border-white/70 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                  >
                    <p className="text-sm text-yellow-700 font-medium group-hover:text-yellow-800 transition-colors">{prompt}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <MessageBubble key={`${msg.timestamp}-${idx}`} role={msg.role} content={msg.content} timestamp={msg.timestamp} />
          ))}

          {loading && (
            <div className="flex justify-start animate-slide-in-up">
              <div className="backdrop-blur-xl bg-white/50 border border-white/50 rounded-2xl px-5 py-4 shadow-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-7 h-7 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-sm">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-yellow-700">CUTM-GPT</span>
                </div>
                <div className="flex space-x-1.5">
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
      <div className="backdrop-blur-xl bg-white/70 border-t border-white/40 px-4 md:px-6 py-4 relative">
        <div className="max-w-4xl mx-auto flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full px-4 py-3 pr-12 backdrop-blur-xl bg-white/60 border border-white/50 rounded-2xl focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 resize-none placeholder-yellow-500/70 text-yellow-800 transition-all duration-200"
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
            <div className="absolute right-3 bottom-3 text-xs text-yellow-500/70 font-medium">{input.length}/2000</div>
          </div>
          <button 
            onClick={sendMessage} 
            disabled={loading || !input.trim()} 
            className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:hover:scale-100"
          >
            {loading ? 
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 
              <Send className="w-4 h-4" />
            }
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="backdrop-blur-xl bg-white/50 px-4 md:px-6 py-3 border-t border-white/30 text-center text-xs text-yellow-600">
        Crafted with excellence by <span className="font-semibold text-yellow-700">DevSomeware</span>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(-5px) rotate(-1deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
        .animate-slide-in-up {
          animation: slideInUp 0.4s ease-out;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}