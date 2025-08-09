"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Sparkles, MoreHorizontal, RefreshCw } from "lucide-react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import Image from "next/image";

// Add the interface for props
interface ChatWindowProps {
  showInput?: boolean;
}

export default function ChatWindow({ showInput = true }: ChatWindowProps) {
  const [messages, setMessages] = useState<{ role: string; content: string; timestamp: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Improved scroll to bottom function with better timing
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ 
        behavior: "smooth",
        block: "end",
        inline: "nearest"
      });
    }, 100);
  }, []);

  // Auto-scroll when messages change or loading state changes
  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  // Sanitize input function
  const sanitizeInput = (text: string) => 
    text.replace(/<[^>]*>/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .trim()
        .slice(0, 2000);

  // Handle sending messages
  const handleSendMessage = async (inputText: string) => {
    const sanitizedInput = sanitizeInput(inputText);
    if (!sanitizedInput.trim()) return;
    
    const userMessage = { role: "user", content: sanitizedInput, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setShowWelcome(false);

    // Scroll after adding user message
    scrollToBottom();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: sanitizedInput })
      });
      
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const assistantContent = data.choices?.[0]?.message?.content || data.reply || "I couldn't process your request right now.";
      setMessages(prev => [...prev, { role: "assistant", content: assistantContent, timestamp: Date.now() }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I'm experiencing technical difficulties. Please try again in a moment.", 
        timestamp: Date.now() 
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Start new chat
  const startNewChat = () => {
    setMessages([]);
    setShowWelcome(true);
  };

  // Quick prompts
  const quickPrompts = [
    "Tell me about CUTM programs and courses",
    "What are the campus facilities available?", 
    "How do I apply for admission?",
    "Research opportunities at CUTM"
  ];

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-yellow-50 via-orange-50 to-white">
      
      {/* Background effects - hidden on mobile for performance */}
      <div className="absolute top-0 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-yellow-200/10 rounded-full blur-3xl animate-float hidden md:block"></div>
      <div className="absolute bottom-0 right-1/4 w-48 h-48 md:w-80 md:h-80 bg-orange-200/10 rounded-full blur-3xl animate-float hidden md:block" style={{animationDelay: '3s'}}></div>
      
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-xl border-b border-white/30 shadow-sm px-4 py-3 z-10 flex-shrink-0">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image src="./logo.svg" width={36} height={36} alt="CUTM Logo" className="filter drop-shadow-sm" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white animate-pulse"></div>
            </div>
            <div>
              <h2 className="text-sm font-bold text-yellow-700">CUTM-GPT</h2>
              <p className="text-xs text-yellow-600 hidden sm:block">Powered by CUTM AI</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {messages.length > 0 && (
              <button 
                onClick={startNewChat} 
                className="p-2 rounded-xl hover:bg-white/50 backdrop-blur-sm transition-all duration-200 group border border-white/20"
                title="New Chat"
              >
                <RefreshCw className="w-4 h-4 text-yellow-600 group-hover:rotate-180 transition-transform duration-300" />
              </button>
            )}
            <button 
              className="p-2 rounded-xl hover:bg-white/50 backdrop-blur-sm transition-all duration-200 border border-white/20"
              title="Options"
            >
              <MoreHorizontal className="w-4 h-4 text-yellow-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area - Scrollable with proper bottom padding */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4 custom-scrollbar"
        style={{ 
          paddingBottom: showInput ? '140px' : '20px', // Dynamic padding based on input visibility
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div className="max-w-4xl mx-auto space-y-4">
          
          {/* Welcome Screen */}
          {showWelcome && messages.length === 0 && (
            <div className="text-center mb-8 animate-fade-in-up">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20flex items-center justify-center">
                    <Image src="./logo.svg" width={60} height={40} alt="CUTM Logo" className="filter drop-shadow-sm" />
                  </div>
                 
                 
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-yellow-700 mb-3">Welcome to CUTM-GPT</h3>
              <p className="text-base text-yellow-600 mb-8 max-w-md mx-auto leading-relaxed px-4">
                Your intelligent AI assistant for programs, admissions, facilities, and campus life at Centurion University.
              </p>
              
              {/* Quick Action Buttons - Only show if input is visible */}
              {showInput && (
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 max-w-lg md:max-w-2xl mx-auto px-4">
                  {quickPrompts.map((prompt, i) => (
                    <button 
                      key={i} 
                      onClick={() => handleQuickPrompt(prompt)} 
                      className="group p-4 text-left bg-white/50 backdrop-blur-sm border border-white/60 rounded-2xl hover:bg-white/70 hover:border-white/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-95 shadow-sm"
                    >
                      <p className="text-sm text-yellow-700 font-medium group-hover:text-yellow-800 transition-colors leading-relaxed">
                        {prompt}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Messages */}
          {messages.map((msg, idx) => (
            <MessageBubble 
              key={`${msg.timestamp}-${idx}`} 
              role={msg.role} 
              content={msg.content} 
              timestamp={msg.timestamp} 
            />
          ))}

          {/* Loading Indicator */}
          {loading && (
            <div className="flex justify-start animate-slide-in-up">
              <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl px-5 py-4 shadow-lg">
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
          
          {/* Scroll anchor */}
          <div ref={messagesEndRef} className="h-1" />
        </div>
      </div>

      {/* Fixed Input Component - Only show when not in preloader */}
      {showInput && (
        <ChatInput 
          onSendMessage={handleSendMessage}
          loading={loading}
        />
      )}
    </div>
  );
}