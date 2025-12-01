import { Button } from "@/components/ui/button";
import { ClientQuestion } from "@/types/quiz";
import { getQuestionRenderer } from "@/components/questions/questionFactory";
import { CorrectFeedback } from "@/components/CorrectFeedback";
import { IncorrectFeedback } from "@/components/IncorrectFeedback";

type Answer = number | boolean;

interface QuizCardProps {
  question: ClientQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer?: Answer;
  onSelectAnswer: (answer: Answer) => void;
  onNext: () => void;
  isValidating?: boolean;
  showingFeedback?: boolean;
  isCorrect?: boolean | null;
}

export const QuizCard = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onNext,
  isValidating = false,
  showingFeedback = false,
  isCorrect = null,
}: QuizCardProps) => {
  const renderQuestion = () => {
    const QuestionComponent = getQuestionRenderer(question);
    return (
      <QuestionComponent
        question={question}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={onSelectAnswer}
      />
    );
  };

  return (
    <div className="sketch-border bg-card p-8 animate-float">
      {/* Question counter */}
      <div className="mb-6 text-center">
        <span className="text-primary font-sketch text-xl animate-wobble inline-block">
          Question {questionNumber} of {totalQuestions}
        </span>
      </div>

      {/* Question text */}
      <div className="sketch-border bg-secondary p-6 mb-8 animate-float-delayed">
        <h2 className="text-2xl md:text-3xl font-sketch text-center text-foreground leading-relaxed">
          {question.question}
        </h2>
      </div>

      {/* Question component based on type */}
      <div className="mb-8">
        {renderQuestion()}
      </div>

      {/* Feedback message */}
      {showingFeedback && isCorrect !== null && (
        isCorrect ? <CorrectFeedback /> : <IncorrectFeedback />
      )}

      {/* Next button */}
      <div className="flex justify-center">
        <Button
          onClick={onNext}
          disabled={selectedAnswer === undefined || isValidating}
          className="sketch-border bg-accent hover:bg-accent/80 text-accent-foreground font-sketch text-xl px-8 py-6 animate-wobble disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isValidating
            ? "Checking..."
            : showingFeedback
              ? questionNumber === totalQuestions
                ? "See Results!"
                : "Continue →"
              : "Next →"}
        </Button>
      </div>
    </div>
  );
};
