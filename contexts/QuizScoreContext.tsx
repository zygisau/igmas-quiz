"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface QuizScoreContextType {
  score: number | null;
  totalQuestions: number | null;
  setScore: (score: number, totalQuestions: number) => void;
  resetScore: () => void;
}

const QuizScoreContext = createContext<QuizScoreContextType | undefined>(undefined);

export function QuizScoreProvider({ children }: { children: ReactNode }) {
  const [score, setScoreState] = useState<number | null>(null);
  const [totalQuestions, setTotalQuestions] = useState<number | null>(null);

  const setScore = (newScore: number, newTotalQuestions: number) => {
    setScoreState(newScore);
    setTotalQuestions(newTotalQuestions);
  };

  const resetScore = () => {
    setScoreState(null);
    setTotalQuestions(null);
  };

  return (
    <QuizScoreContext.Provider value={{ score, totalQuestions, setScore, resetScore }}>
      {children}
    </QuizScoreContext.Provider>
  );
}

export function useQuizScore() {
  const context = useContext(QuizScoreContext);
  if (context === undefined) {
    return { score: null, totalQuestions: null, setScore: () => {}, resetScore: () => {} };
  }
  return context;
}

