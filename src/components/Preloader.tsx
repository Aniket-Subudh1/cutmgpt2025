"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress animation
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Hide preloader
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 backdrop-blur-sm">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-yellow-300/30 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-40 w-40 h-40 bg-white/15 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-yellow-400/25 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className="relative z-10 text-center">
        {/* Main Logo Container */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto mb-6 relative">
            {/* Outer rotating rings */}
            <div className="absolute inset-0 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-3 border-yellow-500 border-r-transparent rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
            
            {/* Inner glowing circle */}
            <div className="absolute inset-6 bg-white rounded-full flex items-center justify-center shadow-2xl animate-pulse-custom glass-strong">
              <div className="text-center">
               <Image
                                 src = "./logo.svg"
                                 width={40}
                                 height={50}
                                 alt="none"
                                />
              </div>
            </div>

            {/* Floating particles */}
            <div className="absolute -top-2 -left-2 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
            <div className="absolute -top-2 -right-2 w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
            <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-yellow-500 rounded-full animate-bounce" style={{animationDelay: '0.6s'}}></div>
          </div>
        </div>

        {/* University Name */}
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient animate-fade-in-up">
            Centurion University
          </h1>
          <p className="text-lg md:text-xl text-yellow-800 font-medium animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            of Technology and Management
          </p>
          <p className="text-sm text-yellow-700 font-medium animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            AI Assistant • CutmGPT
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto mb-6 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <div className="glass-subtle rounded-full p-1">
            <div className="relative h-3 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-300 ease-out"
                style={{width: `${progress}%`}}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </div>
          </div>
          <p className="text-xs text-yellow-700 mt-2 font-medium">{progress}% Loading...</p>
        </div>

        {/* Loading Dots */}
        <div className="flex items-center justify-center space-x-3 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-3 h-3 bg-yellow-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>

        {/* Status Text */}
        <p className="text-sm text-yellow-700 mt-6 font-medium animate-fade-in-up" style={{animationDelay: '1s'}}>
          Initializing AI Assistant...
        </p>
      </div>
    </div>
  );
}