import { ClientTrueFalseQuestion } from "@/types/quiz";
import { QuestionRendererProps } from "./QuestionRenderer";

export const TrueFalseQuestion = ({
  selectedAnswer,
  onSelectAnswer,
}: QuestionRendererProps<ClientTrueFalseQuestion>) => {
  const options = [
    { label: "True", value: true },
    { label: "False", value: false },
  ];

  return (
    <div className="space-y-4">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onSelectAnswer(option.value)}
          className={`
            w-full sketch-border p-6 text-center font-handwriting text-xl
            transition-all duration-200 animate-float-delayed-2
            hover:bg-secondary hover:scale-105
            ${
              selectedAnswer === option.value
                ? "bg-primary text-primary-foreground scale-105"
                : "bg-card text-foreground"
            }
          `}
          style={{
            animationDelay: `${index * 0.2}s`,
          }}
        >
          <div className="flex items-center justify-center gap-4">
            {/* Custom checkbox */}
            <div
              className={`
                w-10 h-10 flex-shrink-0 sketch-border flex items-center justify-center
                ${
                  selectedAnswer === option.value
                    ? "bg-primary-foreground"
                    : "bg-background"
                }
              `}
            >
              {selectedAnswer === option.value && (
                <span className="text-2xl font-sketch text-primary animate-wobble">
                  ✓
                </span>
              )}
            </div>
            <span className="flex-1 text-2xl font-sketch">{option.label}</span>
          </div>
        </button>
      ))}
    </div>
  );
};
