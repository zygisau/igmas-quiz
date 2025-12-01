import { useState } from "react";
import { QuizCard } from "@/components/QuizCard";
import { QuizResults } from "@/components/QuizResults";

// Sample quiz data
const quizQuestions = [
  {
    id: 1,
    question: "What's the capital of the Moon?",
    options: ["Cheese City", "Crater Town", "Luna Landing", "Moon Base Alpha"],
    correctAnswer: 0,
  },
  {
    id: 2,
    question: "How many fingers does a cartoon character usually have?",
    options: ["Three", "Four", "Five", "It depends on the artist's mood"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "What do you call a bear with no teeth?",
    options: ["A teddy bear", "A gummy bear", "A grumpy bear", "A confused bear"],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: "If you could only eat one food forever, which would make you regret it fastest?",
    options: ["Pizza", "Ice cream", "Brussels sprouts", "Ghost peppers"],
    correctAnswer: 3,
  },
  {
    id: 5,
    question: "What's the best way to study for a test?",
    options: [
      "Actually study",
      "Hope for a miracle",
      "Panic at 3 AM",
      "All of the above",
    ],
    correctAnswer: 3,
  },
];

const Index = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
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
      return answer === quizQuestions[index].correctAnswer ? score + 1 : score;
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
};

export default Index;
