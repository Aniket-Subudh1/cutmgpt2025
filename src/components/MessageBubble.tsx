"use client";

import { useEffect, useState } from "react";

interface MessageBubbleProps {
  role: string;
  content: string;
  isTyping?: boolean;
}

export default function MessageBubble({ role, content, isTyping = false }: MessageBubbleProps) {
  const [displayedContent, setDisplayedContent] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const isUser = role === "user";

  useEffect(() => {
    setIsVisible(true);
    
    if (!isUser && !isTyping) {
      // Typing effect for AI responses
      let index = 0;
      const timer = setInterval(() => {
        if (index < content.length) {
          setDisplayedContent(content.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 20);

      return () => clearInterval(timer);
    } else {
      setDisplayedContent(content);
    }
  }, [content, isUser, isTyping]);

  // Sanitize content - remove any HTML tags and dangerous content
  const sanitizeContent = (text: string) => {
    return text
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: links
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .trim();
  };

  const sanitizedContent = sanitizeContent(displayedContent);

  return (
    <div
      className={`mb-4 animate-slide-in-up ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } transition-all duration-300 ${
        isUser ? 'flex justify-end' : 'flex justify-start'
      }`}
    >
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl p-4 rounded-2xl shadow-lg backdrop-blur-sm border border-opacity-20 transform hover:scale-105 transition-all duration-200 ${
          isUser
            ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 border-yellow-300 rounded-br-sm'
            : 'bg-white/80 text-gray-800 border-gray-200 rounded-bl-sm'
        }`}
      >
        {!isUser && (
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mr-2">
              <span className="text-xs font-bold text-white">AI</span>
            </div>
            <span className="text-xs font-medium text-gray-600">CutMGPT Assistant</span>
          </div>
        )}
        
        <div className="whitespace-pre-wrap break-words leading-relaxed">
          {sanitizedContent}
          {!isUser && isTyping && (
            <span className="inline-block w-2 h-5 bg-yellow-500 ml-1 animate-pulse"></span>
          )}
        </div>

        {!isUser && !isTyping && (
          <div className="mt-2 flex items-center justify-between">
            <div className="flex space-x-1">
              <button className="text-gray-400 hover:text-yellow-500 transition-colors duration-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            <span className="text-xs text-gray-400">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}