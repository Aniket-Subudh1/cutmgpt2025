"use client";

import { useState } from "react";
import ChatWindow from "@/components/ChatWindow";
import Preloader from "@/components/Preloader";

export default function HomePage() {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <>
      <Preloader />
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-gray-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo and Brand */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200">
                  <span className="text-white font-bold text-sm">CUT</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">CutMGPT</h1>
                  <p className="text-sm text-gray-600">AI Assistant</p>
                </div>
              </div>

              {/* University Logo Area */}
              <div className="hidden md:flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-800">Centurion University</div>
                  <div className="text-sm text-gray-600">of Management and Technology</div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xs">CU</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="text-center mb-8 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">CutMGPT</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Your intelligent AI assistant powered by advanced technology. Get instant help with your queries, 
              academic support, and much more. Experience the future of digital assistance.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>24/7 Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Instant Responses</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Secure & Private</span>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="relative">
            {/* Background decorative elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-300/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl"></div>
            
            <ChatWindow />
          </div>

          {/* Features Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Get instant responses to your queries with our advanced AI technology.</p>
            </div>

            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Reliable & Secure</h3>
              <p className="text-gray-600">Your conversations are secure and private with enterprise-grade protection.</p>
            </div>

            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Academic Support</h3>
              <p className="text-gray-600">Get help with your studies, research, and academic projects.</p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Brand Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">CUT</span>
                  </div>
                  <div>
                    <div className="text-xl font-bold">CutMGPT</div>
                    <div className="text-sm text-gray-400">AI Assistant</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  Empowering education through advanced AI technology at Centurion University.
                </p>
              </div>

              {/* University Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">University</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div>Centurion University of Management and Technology</div>
                  <div>Excellence in Education</div>
                  <div>Innovation & Technology</div>
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Connect</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div>AI Support Available 24/7</div>
                  <div>Secure & Private</div>
                  <div>Academic Excellence</div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-400">
                © 2025 Centurion University. All rights reserved.
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-2 text-sm text-gray-400">
                <span>Crafted with excellence by</span>
                <span className="text-yellow-400 font-semibold hover:text-yellow-300 transition-colors duration-200 cursor-pointer">
                  Devsomeware
                </span>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}