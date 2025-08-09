"use client";
import { useState, useEffect } from "react";
import ChatWindow from "@/components/ChatWindow";
import Preloader from "@/components/Preloader";

export default function HomePage() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 2500);
    
    // Mobile keyboard detection
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        const windowHeight = window.visualViewport?.height || window.innerHeight;
        const documentHeight = document.documentElement.clientHeight;
        setIsKeyboardOpen(windowHeight < documentHeight * 0.8);
      }
    };

    // Listen for viewport changes (keyboard open/close)
    if (typeof window !== 'undefined' && window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    } else {
      window.addEventListener('resize', handleResize);
    }
    
    return () => {
      clearTimeout(timer);
      if (typeof window !== 'undefined' && window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      } else {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return (
    <>
      {showPreloader && <Preloader />}
      <div className={`mobile-full-height w-full bg-gray-50 flex flex-col overflow-hidden ${isKeyboardOpen ? 'mobile-keyboard-adjust' : ''}`}>
        <div className="flex-1 overflow-hidden min-h-0">
          <ChatWindow />
        </div>
      </div>
    </>
  );
}