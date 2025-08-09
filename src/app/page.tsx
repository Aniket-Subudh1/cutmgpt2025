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
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showPreloader && <Preloader />}
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute top-32 right-20 w-96 h-96 bg-yellow-300/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-32 w-80 h-80 bg-white/15 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
          <div className="absolute bottom-32 right-10 w-64 h-64 bg-yellow-400/25 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        </div>

        {/* Header */}
        <header className="relative z-10 glass-strong border-b border-white/30 sticky top-0">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <div className="flex items-center space-x-4 animate-fade-in-up">
                <div className="relative">
                 <Image
                  src = "./logo.svg"
                  width={40}
                  height={50}
                  alt="none"
                 />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gradient">CUTM-GPT</h1>
                  <p className="text-sm text-yellow-700 font-medium">Centurion University AI</p>
                </div>
              </div>
              
              {/* Status */}
              <div className="flex items-center space-x-3 text-yellow-800 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                <div className="flex items-center space-x-2 glass-subtle px-4 py-2 rounded-full">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Online</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 flex-1 flex items-center justify-center p-6 lg:p-8">
          <div className="w-full max-w-6xl mx-auto">
            {/* Welcome Section */}
            <div className="text-center mb-8 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <h2 className="text-4xl lg:text-6xl font-bold text-gradient mb-4">
                Welcome to CUTM-GPT
              </h2>
              <p className="text-xl lg:text-2xl text-yellow-800 font-medium mb-2">
                Your Intelligent AI Assistant
              </p>
              <p className="text-lg text-yellow-700 max-w-2xl mx-auto">
                Powered by Centurion University of Technology and Management
              </p>
            </div>

            {/* Chat Interface */}
            <div className="animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <ChatWindow />
            </div>

            


            {/* Developer Credit */}
            <div className="text-center mt-12 animate-fade-in-up" style={{animationDelay: '1s'}}>
              <div className="glass-subtle rounded-2xl p-6 inline-block">
                <p className="text-yellow-800 font-medium">
                  Crafted with excellence by DevSomeware 
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}