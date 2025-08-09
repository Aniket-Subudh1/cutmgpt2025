"use client";

import { useEffect, useState } from "react";
import { Sparkles, User, Copy, Check } from "lucide-react";

interface MessageBubbleProps {
  role: string;
  content: string;
  timestamp: number;
  isTyping?: boolean;
}

export default function MessageBubble({ role, content, timestamp, isTyping = false }: MessageBubbleProps) {
  const [displayedContent, setDisplayedContent] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showFullTime, setShowFullTime] = useState(false);

  const isUser = role === "user";

  useEffect(() => {
    setIsVisible(true);

    if (!isUser && !isTyping) {
      let index = 0;
      const timer = setInterval(() => {
        if (index < content.length) {
          let nextIndex = index + 1;
          let currentSlice = content.slice(0, nextIndex);
          const incompleteMarkdown = currentSlice.match(/\*\*[^*]*$/);
          if (incompleteMarkdown) {
            const restOfContent = content.slice(nextIndex);
            const closingMatch = restOfContent.match(/^[^*]*\*\*/);
            if (closingMatch) {
              nextIndex += closingMatch[0].length;
              currentSlice = content.slice(0, nextIndex);
            }
          }
          setDisplayedContent(currentSlice);
          index = nextIndex;
        } else {
          clearInterval(timer);
        }
      }, 15);

      return () => clearInterval(timer);
    } else {
      setDisplayedContent(content);
    }
  }, [content, isUser, isTyping]);

  const sanitizeContent = (text: string) =>
    text.replace(/<[^>]*>/g, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "").trim();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(displayedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const parseMarkdown = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) =>
      part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
        <strong key={index} className="font-semibold text-yellow-800">
          {part.slice(2, -2)}
        </strong>
      ) : (
        part
      )
    );
  };

  const formatContent = (text: string) => {
    const sanitized = sanitizeContent(text);
    const sections = sanitized.split(/\n\s*\n/);
    return sections.map((section, sectionIndex) => {
      const lines = section.split("\n").filter((line) => line.trim());
      return (
        <div key={sectionIndex} className={sectionIndex > 0 ? "mt-4" : ""}>
          {lines.map((line, lineIndex) => {
            const trimmedLine = line.trim();
            if (!trimmedLine) return null;

            if (trimmedLine.startsWith("###") || (lineIndex + 1 < lines.length && lines[lineIndex + 1].includes("====="))) {
              const headingText = trimmedLine.replace(/^###\s*/, "").replace(/#+$/, "");
              return (
                <h3
                  key={lineIndex}
                  className="text-lg font-bold text-yellow-800 mb-3 mt-4 first:mt-0 border-b border-yellow-200/50 pb-2"
                >
                  {parseMarkdown(headingText)}
                </h3>
              );
            }

            if (trimmedLine.match(/^=+$/)) return null;

            if (trimmedLine.startsWith("##") || trimmedLine.match(/^[A-Z][a-zA-Z\s]*:$/)) {
              const headingText = trimmedLine.replace(/^##\s*/, "");
              return (
                <h4 key={lineIndex} className="text-base font-semibold text-yellow-700 mb-3 mt-4 first:mt-0">
                  {parseMarkdown(headingText)}
                </h4>
              );
            }

            if (trimmedLine.match(/^\d+\.\s/)) {
              const number = trimmedLine.match(/^(\d+)\./)?.[1];
              const listText = trimmedLine.replace(/^\d+\.\s*/, "");
              return (
                <div key={lineIndex} className="mb-3">
                  <div className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-yellow-100/80 backdrop-blur-sm text-yellow-800 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5 border border-yellow-200/50">
                      {number}
                    </span>
                    <p className="text-sm text-gray-700 leading-relaxed">{parseMarkdown(listText.trim())}</p>
                  </div>
                </div>
              );
            }

            if (trimmedLine.match(/^[\*\-•]\s/)) {
              const bulletText = trimmedLine.replace(/^[\*\-•]\s*/, "");
              return (
                <div key={lineIndex} className="mb-2">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2"></div>
                    <p className="text-sm text-gray-700 leading-relaxed flex-1">{parseMarkdown(bulletText.trim())}</p>
                  </div>
                </div>
              );
            }

            if (trimmedLine.toLowerCase().startsWith("overview:") || trimmedLine.toLowerCase().startsWith("introduction:")) {
              const [label, ...content] = trimmedLine.split(":");
              return (
                <div
                  key={lineIndex}
                  className="mb-4 p-4 backdrop-blur-md bg-yellow-50/60 rounded-xl border border-yellow-200/50 shadow-sm"
                >
                  <p className="text-sm">
                    <span className="font-semibold text-yellow-900">{label.trim()}:</span>
                    <span className="text-yellow-800 ml-1">{parseMarkdown(content.join(":").trim())}</span>
                  </p>
                </div>
              );
            }

            return (
              <p key={lineIndex} className="text-sm text-gray-700 leading-relaxed mb-3 last:mb-0">
                {parseMarkdown(trimmedLine)}
              </p>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div
      className={`transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${isUser ? "flex justify-end" : "flex justify-start"}`}
    >
      <div
        className={`max-w-[90%] md:max-w-2xl lg:max-w-4xl group ${
          isUser
            ? "bg-gradient-to-br from-yellow-400 to-orange-400 text-white rounded-2xl rounded-br-md px-4 py-3 shadow-lg"
            : "backdrop-blur-xl bg-white/60 border border-white/50 rounded-2xl rounded-bl-md px-5 py-4 shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-white/70"
        }`}
      >
        {!isUser && (
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-sm">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-sm font-semibold text-yellow-800">CUTM-GPT</span>
                <p className="text-xs text-yellow-600">AI Assistant</p>
              </div>
            </div>
            <button
              onClick={copyToClipboard}
              className="opacity-0 group-hover:opacity-100 transition-all duration-200 p-1.5 hover:bg-white/50 rounded-lg text-yellow-500 hover:text-yellow-700 backdrop-blur-sm"
              title="Copy message"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        )}

        <div className="space-y-1">
          {isUser ? (
            <div className="flex items-start space-x-3">
              <div className="flex-1">
                <p className="text-sm leading-relaxed">{displayedContent}</p>
              </div>
              <div className="w-7 h-7 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none">
              {displayedContent ? <div>{formatContent(displayedContent)}</div> : <p className="text-sm text-gray-700">Loading...</p>}
              {isTyping && <span className="inline-block w-2 h-4 bg-yellow-500 ml-1 animate-pulse"></span>}
            </div>
          )}
        </div>

        <div className="mt-3 flex justify-end">
          <button
            onClick={() => setShowFullTime(!showFullTime)}
            className={`text-xs transition-colors duration-200 ${
              isUser ? "text-yellow-100 hover:text-white" : "text-yellow-500 hover:text-yellow-700"
            }`}
          >
            {showFullTime ? new Date(timestamp).toLocaleString() : formatTime(timestamp)}
          </button>
        </div>
      </div>
    </div>
  );
}