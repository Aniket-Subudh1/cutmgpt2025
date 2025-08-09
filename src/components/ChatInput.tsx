"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  loading: boolean;
  disabled?: boolean;
}

export default function ChatInput({ onSendMessage, loading, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Focus input on desktop only
  useEffect(() => {
    if (window.innerWidth >= 768) {
      inputRef.current?.focus();
    }
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || loading || disabled) return;
    
    onSendMessage(trimmedInput);
    setInput("");
    
    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = '48px';
    }
    
    // Re-focus on desktop after sending
    setTimeout(() => {
      if (window.innerWidth >= 768) {
        inputRef.current?.focus();
      }
    }, 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    
    // Auto-resize textarea
    const target = e.target;
    target.style.height = '48px'; // Reset to minimum height
    const newHeight = Math.min(target.scrollHeight, 120); // Max 120px
    target.style.height = newHeight + 'px';
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-gray-200/50 shadow-lg safe-area-bottom">
      {/* Main input container */}
      <div className="px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              className="w-full px-4 py-3 pr-16 bg-white border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 resize-none placeholder-gray-500 text-gray-800 text-base leading-relaxed shadow-sm transition-all duration-200"
              placeholder="How can i help ?"
              disabled={loading || disabled}
              maxLength={2000}
              rows={1}
              style={{
                minHeight: '48px',
                maxHeight: '120px',
                fontSize: '16px' // Prevent zoom on iOS
              }}
            />
            
            {/* Character counter */}
            <div className="absolute right-16 bottom-3 text-xs text-gray-400 font-medium">
              {input.length}/2000
            </div>
          </div>
          
          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={loading || !input.trim() || disabled}
            className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:hover:scale-100 flex-shrink-0"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
      
      {/* Footer */}
      <div className="px-4 py-2 border-t border-gray-200/50 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center text-xs text-gray-500">
          Crafted with excellence by <span className="font-semibold text-yellow-700">DevSomeware</span>
        </div>
      </div>
    </div>
  );
}