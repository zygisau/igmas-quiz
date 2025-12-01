"use client";

import { useState } from "react";
import { QuizCard } from "@/components/QuizCard";
import { QuizResults } from "@/components/QuizResults";
import { Question } from "@/types/quiz";
import quizData from "@/data/quiz-questions.json";

type Answer = number | boolean;

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);

  const quizQuestions = quizData.questions as Question[];

  const handleAnswer = (answer: Answer) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      const question = quizQuestions[index];

      if (question.type === 'multiple-choice' && typeof answer === 'number') {
        return answer === question.correctAnswer ? score + 1 : score;
      } else if (question.type === 'true-false' && typeof answer === 'boolean') {
        return answer === question.correctAnswer ? score + 1 : score;
      }

      return score;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 overflow-hidden relative">
      {/* Floating background elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-4 border-primary/30 rounded-full animate-float" />
      <div className="absolute top-40 right-20 w-16 h-16 border-4 border-accent/30 animate-float-delayed transform rotate-45" />
      <div className="absolute bottom-20 left-1/4 w-24 h-24 border-4 border-muted-foreground/20 rounded-full animate-float-delayed-2" />
      <div className="absolute bottom-40 right-1/3 w-12 h-12 border-4 border-primary/20 animate-wobble transform rotate-12" />

      {/* Main content */}
      <div className="w-full max-w-2xl animate-sway">
        {!showResults ? (
          <QuizCard
            question={quizQuestions[currentQuestion]}
            questionNumber={currentQuestion + 1}
            totalQuestions={quizQuestions.length}
            selectedAnswer={selectedAnswers[currentQuestion]}
            onSelectAnswer={handleAnswer}
            onNext={handleNext}
          />
        ) : (
          <QuizResults
            score={calculateScore()}
            totalQuestions={quizQuestions.length}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
}
