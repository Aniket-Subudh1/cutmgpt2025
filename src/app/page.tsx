"use client";

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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        {/* Clean Header */}
        <header className="bg-white/70 backdrop-blur-xl border-b border-white/20 sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">CU</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">CutMGPT Assistant</h1>
                  <p className="text-xs text-gray-500">Centurion University Assistant</p>
                </div>
              </div>
              
              {/* Status */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Online</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-8">
          {/* Chat Interface */}
          <div className="mb-8">
            <ChatWindow />
          </div>
        </main>

        {/* Clean Footer */}
        <footer className="mt-auto">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="text-center p-4 bg-white/40 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Lightning Fast</h3>
                <p className="text-sm text-gray-600">Get instant responses to your queries with our advanced AI technology.</p>
              </div>

              {/* Feature 2 */}
              <div className="text-center p-4 bg-white/40 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Reliable & Secure</h3>
                <p className="text-sm text-gray-600">Your conversations are secure and private with enterprise-grade protection.</p>
              </div>

              {/* Feature 3 */}
              <div className="text-center p-4 bg-white/40 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Academic Support</h3>
                <p className="text-sm text-gray-600">Get help with your studies, research, and academic projects.</p>
              </div>
            </div>

            {/* Developer Credit */}
            <div className="text-center mt-6 pt-4 border-t border-gray-200/50">
              <p className="text-sm text-gray-500">
                Developed By: <span className="text-blue-600 font-medium">Abhi Mitra</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}