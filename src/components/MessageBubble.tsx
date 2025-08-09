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
      }, 15);

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
          <div key={index} className="font-semibold text-gray-800 mb-2 text-sm">
            {line.replace(/\*\*/g, '')}
          </div>
        );
      }
      
      // Check if it's a bullet point
      if (line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*')) {
        return (
          <div key={index} className="flex items-start space-x-2 mb-2">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-sm text-gray-700 leading-relaxed">
              {line.replace(/^[•\-*]\s*/, '')}
            </span>
          </div>
        );
      }
      
      // Regular paragraph
      return (
        <p key={index} className="text-sm text-gray-700 leading-relaxed mb-2">
          {line}
        </p>
      );
    });
  };

  return (
    <div
      className={`mb-4 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${
        isUser ? 'flex justify-end' : 'flex justify-start'
      }`}
    >
      <div
        className={`max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl shadow-sm transition-all duration-200 ${
          isUser
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-br-sm'
            : 'bg-gray-100/80 backdrop-blur-sm text-gray-800 px-4 py-3 rounded-bl-sm border border-gray-200/50'
        }`}
      >
        {!isUser && (
          <div className="flex items-center mb-3">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-2">
              <span className="text-xs font-bold text-white">AI</span>
            </div>
            <span className="text-xs font-medium text-gray-600">CutMGPT Assistant</span>
            <div className="ml-auto text-xs text-gray-400">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        )}
        
        <div className={`${isUser ? 'text-white' : 'text-gray-800'}`}>
          {isUser ? (
            <p className="text-sm leading-relaxed">{displayedContent}</p>
          ) : (
            <div className="space-y-1">
              {typeof displayedContent === 'string' && displayedContent.includes('\n') ? (
                formatContent(displayedContent)
              ) : (
                <p className="text-sm text-gray-700 leading-relaxed">{displayedContent}</p>
              )}
              {!isUser && isTyping && (
                <span className="inline-block w-2 h-4 bg-blue-500 ml-1 animate-pulse"></span>
              )}
            </div>
          )}
        </div>

        {isUser && (
          <div className="mt-2 text-right">
            <span className="text-xs text-blue-100 opacity-75">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}