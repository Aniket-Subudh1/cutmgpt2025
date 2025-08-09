"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import ChatWindow from "@/components/ChatWindow";
import Preloader from "@/components/Preloader";

export default function HomePage() {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showPreloader && <Preloader />}
      <div className="h-screen w-full bg-gray-50 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <ChatWindow />
        </div>
      </div>
    </>
  );
}