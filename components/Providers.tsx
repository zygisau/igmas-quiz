"use client";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QuizScoreProvider } from "@/contexts/QuizScoreContext";
import { BackgroundMusic } from "@/components/BackgroundMusic";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QuizScoreProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {children}
        <BackgroundMusic />
      </TooltipProvider>
    </QuizScoreProvider>
  );
}
