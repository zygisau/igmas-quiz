import { MultipleChoiceQuestion as MultipleChoiceQuestionType } from "@/types/quiz";
import { QuestionRendererProps } from "./QuestionRenderer";

export const MultipleChoiceQuestion = ({
  question,
  selectedAnswer,
  onSelectAnswer,
}: QuestionRendererProps<MultipleChoiceQuestionType>) => {
  return (
    <div className="space-y-4">
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
  );
};
