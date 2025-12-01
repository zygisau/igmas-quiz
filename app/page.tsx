"use client";

import { useState, useEffect } from "react";
import { QuizCard } from "@/components/QuizCard";
import { QuizResults } from "@/components/QuizResults";
import { ClientQuestion, QuizMetadata } from "@/types/quiz";

type Answer = number | boolean;

interface AnswerRecord {
  questionId: number;
  answer: Answer;
  isCorrect: boolean;
}

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<ClientQuestion | null>(null);
  const [questionIds, setQuestionIds] = useState<number[]>([]);
  const [answerRecords, setAnswerRecords] = useState<AnswerRecord[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | undefined>(undefined);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [validating, setValidating] = useState(false);
  const [showingFeedback, setShowingFeedback] = useState(false);
  const [lastValidationResult, setLastValidationResult] = useState<boolean | null>(null);

  // Fetch quiz metadata on mount
  useEffect(() => {
    async function fetchQuizMetadata() {
      try {
        const response = await fetch('/api/quiz');
        const metadata: QuizMetadata = await response.json();
        setQuestionIds(metadata.questionIds);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch quiz metadata:', error);
        setLoading(false);
      }
    }
    fetchQuizMetadata();
  }, []);

  // Fetch current question when question index changes
  useEffect(() => {
    if (questionIds.length === 0) return;

    async function fetchQuestion() {
      try {
        const questionId = questionIds[currentQuestionIndex];
        const response = await fetch(`/api/questions/${questionId}`);
        const question: ClientQuestion = await response.json();
        setCurrentQuestion(question);

        // Check if we already have an answer for this question
        const existingRecord = answerRecords.find(r => r.questionId === questionId);
        setSelectedAnswer(existingRecord?.answer);
      } catch (error) {
        console.error('Failed to fetch question:', error);
      }
    }
    fetchQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex, questionIds]);

  const handleAnswer = async (answer: Answer) => {
    if (!currentQuestion || validating) return;

    setSelectedAnswer(answer);
  };

  const handleNext = async () => {
    if (!currentQuestion || selectedAnswer === undefined || validating) return;

    // If we're showing feedback, move to next question
    if (showingFeedback) {
      setShowingFeedback(false);
      setLastValidationResult(null);

      // Move to next question or show results
      if (currentQuestionIndex < questionIds.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(undefined);
      } else {
        setShowResults(true);
      }
      return;
    }

    // First click: validate and show feedback
    setValidating(true);

    try {
      // Validate answer with server
      const response = await fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: currentQuestion.id,
          answer: selectedAnswer,
        }),
      });

      const validation = await response.json();

      // Store the answer record
      const newRecord: AnswerRecord = {
        questionId: currentQuestion.id,
        answer: selectedAnswer,
        isCorrect: validation.isCorrect,
      };

      setAnswerRecords(prev => {
        const filtered = prev.filter(r => r.questionId !== currentQuestion.id);
        return [...filtered, newRecord];
      });

      // Show feedback instead of immediately advancing
      setLastValidationResult(validation.isCorrect);
      setShowingFeedback(true);
    } catch (error) {
      console.error('Failed to validate answer:', error);
    } finally {
      setValidating(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswerRecords([]);
    setSelectedAnswer(undefined);
    setShowResults(false);
  };

  const calculateScore = () => {
    return answerRecords.filter(r => r.isCorrect).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-2xl font-marker">Loading quiz...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 overflow-hidden relative">
      {/* Floating background elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-4 border-primary/30 rounded-full animate-float" />
      <div className="absolute top-40 right-20 w-16 h-16 border-4 border-accent/30 animate-float-delayed transform rotate-45" />
      <div className="absolute bottom-20 left-1/4 w-24 h-24 border-4 border-muted-foreground/20 rounded-full animate-float-delayed-2" />
      <div className="absolute bottom-40 right-1/3 w-12 h-12 border-4 border-primary/20 animate-wobble transform rotate-12" />

      {/* Main content */}
      <div className="w-full max-w-2xl animate-sway">
        {!showResults && currentQuestion ? (
          <QuizCard
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questionIds.length}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={handleAnswer}
            onNext={handleNext}
            isValidating={validating}
            showingFeedback={showingFeedback}
            isCorrect={lastValidationResult}
          />
        ) : showResults ? (
          <QuizResults
            score={calculateScore()}
            totalQuestions={questionIds.length}
            onRestart={handleRestart}
          />
        ) : null}
      </div>
    </div>
  );
}
