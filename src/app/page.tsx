"use client";
import { useState, useEffect } from "react";
import ChatWindow from "@/components/ChatWindow";
import Preloader from "@/components/Preloader";

export default function HomePage() {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 2500);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {showPreloader && <Preloader />}
      <div 
        className="w-full h-full bg-gray-50" 
        style={{ 
          height: '100dvh',
          maxHeight: '100dvh'
        }}
      >
        <ChatWindow showInput={!showPreloader} />
      </div>
    </>
  );
}