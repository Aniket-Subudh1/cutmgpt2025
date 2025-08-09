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

  // Sanitize and format content
  const sanitizeContent = (text: string) => {
    return text
      .replace(/<[^>]*>/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .trim();
  };

  // Format content with bullet points and sections
  const formatContent = (text: string) => {
    const sanitized = sanitizeContent(text);
    
    // Split into paragraphs and format
    const lines = sanitized.split('\n').filter(line => line.trim());
    
    return lines.map((line, index) => {
      // Check if it's a header (contains ** or is all caps)
      if (line.includes('**') || (line.length < 50 && line === line.toUpperCase())) {
        return (
          <div key={index} className="font-bold text-yellow-900 mb-3 text-base">
            {line.replace(/\*\*/g, '')}
          </div>
        );
      }
      
      // Check if it's a bullet point
      if (line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*')) {
        return (
          <div key={index} className="flex items-start space-x-3 mb-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-sm text-yellow-800 leading-relaxed">
              {line.replace(/^[•\-*]\s*/, '')}
            </span>
          </div>
        );
      }
      
      // Regular paragraph
      return (
        <p key={index} className="text-sm text-yellow-800 leading-relaxed mb-3">
          {line}
        </p>
      );
    });
  };

  return (
    <div
      className={`mb-6 transition-all duration-500 message-appear ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${
        isUser ? 'flex justify-end' : 'flex justify-start'
      }`}
    >
      <div
        className={`max-w-md lg:max-w-2xl rounded-3xl shadow-lg transition-all duration-300 transform-gpu ${
          isUser
            ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-white px-6 py-4 rounded-br-lg hover:shadow-xl'
            : 'glass-subtle text-yellow-900 px-6 py-4 rounded-bl-lg border border-white/30 hover:glass-yellow'
        }`}
      >
        {!isUser && (
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mr-3 shadow-md">
              <span className="text-xs font-bold text-white">AI</span>
            </div>
            <div className="flex-1">
              <span className="text-sm font-semibold text-yellow-900">CutMGPT Assistant</span>
              <div className="text-xs text-yellow-700 font-medium">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        )}
        
        <div className={`${isUser ? 'text-white' : 'text-yellow-900'}`}>
          {isUser ? (
            <p className="text-sm leading-relaxed font-medium">{displayedContent}</p>
          ) : (
            <div className="space-y-2">
              {typeof displayedContent === 'string' && displayedContent.includes('\n') ? (
                formatContent(displayedContent)
              ) : (
                <p className="text-sm text-yellow-800 leading-relaxed">{displayedContent}</p>
              )}
              {!isUser && isTyping && (
                <span className="inline-block w-2 h-5 bg-yellow-500 ml-1 animate-pulse"></span>
              )}
            </div>
          )}
        </div>

        {isUser && (
          <div className="mt-3 text-right">
            <span className="text-xs text-yellow-100 opacity-80 font-medium">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}