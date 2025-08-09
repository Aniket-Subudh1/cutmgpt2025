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
      setProgress(prev => Math.min(prev + Math.random() * 4 + 2, 100));
    }, 60);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-yellow-50 via-orange-50 to-white">
      
      {/* Subtle animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.1),transparent_70%)] animate-pulse"></div>
      
      {/* Floating background elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-200/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-orange-200/20 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>

      <div className="relative z-10 max-w-sm w-full px-6 text-center">
        
        {/* Main glassmorphic container */}
        <div className="backdrop-blur-xl bg-white/40 border border-white/50 rounded-3xl p-8 shadow-2xl shadow-yellow-500/10">
          
          {/* Logo container */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 border-2 border-yellow-300/40 rounded-full"></div>
            <div className="absolute inset-0 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin-slow"></div>
            
            {/* Logo */}
            <div className="absolute inset-2 flex items-center justify-center">
              <Image src="./logo.svg" width={32} height={32} alt="CUTM" className="filter drop-shadow-sm" />
            </div>
            
            {/* Floating icon */}
            <div className="absolute -top-2 -right-2 w-8 h-8 backdrop-blur-md bg-white/30 border border-yellow-300/50 rounded-full flex items-center justify-center shadow-lg animate-float">
              <CurrentIcon className="w-4 h-4 text-yellow-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-yellow-700 mb-1 tracking-wide">CUTM-GPT</h1>
          <p className="text-yellow-600 text-sm mb-1">AI Assistant</p>
          <p className="text-yellow-500 text-xs mb-6">Centurion University</p>

          {/* Progress Bar */}
          <div className="w-full bg-yellow-100/60 backdrop-blur-sm rounded-full h-2 overflow-hidden mb-4 border border-yellow-200/50">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center space-x-2 text-yellow-600 text-sm mb-4">
            <CurrentIcon className="w-4 h-4 text-yellow-500 animate-pulse" />
            <span className="font-medium">{loadingSteps[currentStep]?.text || "Initializing..."}</span>
          </div>

          {/* Animated dots */}
          <div className="flex justify-center space-x-1.5 mb-4">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce"></span>
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
          </div>

          {/* Version info */}
          <p className="text-xs text-yellow-500/80">Powered by Advanced AI</p>
        </div>
      </div>
    </div>
  );
}