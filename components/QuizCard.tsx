import { Button } from "@/components/ui/button";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer?: number;
  onSelectAnswer: (index: number) => void;
  onNext: () => void;
}

export const QuizCard = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onNext,
}: QuizCardProps) => {
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

      {/* Options */}
      <div className="space-y-4 mb-8">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelectAnswer(index)}
            className={`
              w-full sketch-border p-4 text-left font-handwriting text-lg
              transition-all duration-200 animate-float-delayed-2
              hover:bg-secondary hover:scale-105
              ${
                selectedAnswer === index
                  ? "bg-primary text-primary-foreground scale-105"
                  : "bg-card text-foreground"
              }
            `}
            style={{
              animationDelay: `${index * 0.2}s`,
            }}
          >
            <div className="flex items-start gap-4">
              {/* Custom checkbox */}
              <div
                className={`
                  w-8 h-8 flex-shrink-0 sketch-border flex items-center justify-center
                  ${
                    selectedAnswer === index
                      ? "bg-primary-foreground"
                      : "bg-background"
                  }
                `}
              >
                {selectedAnswer === index && (
                  <span className="text-2xl font-sketch text-primary animate-wobble">
                    ✓
                  </span>
                )}
              </div>
              <span className="flex-1 pt-1">{option}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Next button */}
      <div className="flex justify-center">
        <Button
          onClick={onNext}
          disabled={selectedAnswer === undefined}
          className="sketch-border bg-accent hover:bg-accent/80 text-accent-foreground font-sketch text-xl px-8 py-6 animate-wobble disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {questionNumber === totalQuestions ? "See Results!" : "Next →"}
        </Button>
      </div>
    </div>
  );
};
