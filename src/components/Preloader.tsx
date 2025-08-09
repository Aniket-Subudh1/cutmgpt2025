"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-yellow-400 via-yellow-300 to-white">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto mb-4 relative">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
            {/* Inner pulsing circle */}
            <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center animate-pulse">
              <div className="text-2xl font-bold text-yellow-600">
                CUT
                <div className="text-sm font-medium text-gray-600">MGP</div>
              </div>
            </div>
          </div>
        </div>

        {/* University Name */}
        <div className="space-y-2 animate-fade-in-up">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Centurion University
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            of Management and Technology
          </p>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
}