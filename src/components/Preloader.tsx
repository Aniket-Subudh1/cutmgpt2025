"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-gray-50 backdrop-blur-sm">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative mb-6">
          <div className="w-24 h-24 mx-auto mb-4 relative">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            {/* Inner pulsing circle */}
            <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center animate-pulse shadow-lg">
              <div className="text-lg font-bold text-blue-600">
                CU
                <div className="text-xs font-medium text-gray-600">AI</div>
              </div>
            </div>
          </div>
        </div>

        {/* University Name */}
        <div className="space-y-2">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">
            Centurion University
          </h1>
          <p className="text-md text-gray-600 mb-3">
            of Technology and Management
          </p>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
}