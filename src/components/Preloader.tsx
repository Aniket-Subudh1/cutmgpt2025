"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Sparkles, Zap, Brain, Database, Shield, Cpu } from "lucide-react";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const loadingSteps = [
    { icon: Database, text: "Initializing System", duration: 400 },
    { icon: Brain, text: "Loading AI Models", duration: 500 },
    { icon: Cpu, text: "Connecting Services", duration: 450 },
    { icon: Shield, text: "Securing Connection", duration: 400 },
    { icon: Zap, text: "Optimizing Performance", duration: 350 },
    { icon: Sparkles, text: "Ready to Assist", duration: 300 }
  ];

  useEffect(() => {
    let stepTimeout: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    // Smooth progress animation
    progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + Math.random() * 6 + 1, 100));
    }, 80);

    // Step progression
    const progressSteps = () => {
      if (currentStep < loadingSteps.length - 1) {
        stepTimeout = setTimeout(() => {
          setCurrentStep(prev => prev + 1);
          progressSteps();
        }, loadingSteps[currentStep].duration);
      }
    };

    progressSteps();

    // Hide preloader
    const hideTimer = setTimeout(() => setIsVisible(false), 2500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stepTimeout);
      clearTimeout(hideTimer);
    };
  }, [currentStep]);

  if (!isVisible) return null;

  const CurrentIcon = loadingSteps[currentStep]?.icon || Sparkles;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,200,0.1),transparent_70%)] animate-pulse"></div>

      <div className="relative z-10 max-w-sm w-full px-6 text-center">
        
        {/* Glassmorphic container */}
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
          
          {/* Animated Logo */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-teal-400/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-teal-500 border-t-transparent rounded-full animate-spin-slow"></div>
            <div className="absolute inset-3 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center shadow-lg">
              <Image src="./logo.svg" width={30} height={30} alt="CUTM" />
            </div>
            <div className="absolute -top-3 -right-3 w-10 h-10 bg-gray-900 border border-teal-500 rounded-full flex items-center justify-center shadow-lg animate-float">
              <CurrentIcon className="w-5 h-5 text-teal-400" />
            </div>
          </div>

          {/* Title & Info */}
          <h1 className="text-2xl font-bold text-white mb-1 tracking-wide">CUTM-GPT</h1>
          <p className="text-gray-300 text-sm mb-1">AI Assistant</p>
          <p className="text-gray-500 text-xs mb-6">Centurion University of Technology and Management</p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-700/40 rounded-full h-2 overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-teal-400 to-teal-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Step text */}
          <div className="flex items-center justify-center space-x-2 text-gray-300 text-sm mb-4">
            <CurrentIcon className="w-4 h-4 text-teal-400 animate-pulse" />
            <span>{loadingSteps[currentStep]?.text || "Initializing..."}</span>
          </div>

          {/* Animated dots */}
          <div className="flex justify-center space-x-1 mb-4">
            <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce delay-100"></span>
            <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce delay-200"></span>
          </div>

          {/* Version info */}
          <p className="text-xs text-gray-500">Version 2.0 • Powered by Advanced AI</p>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .animate-float {
          animation: float 2s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin 4s linear infinite;
        }
      `}</style>
    </div>
  );
}
