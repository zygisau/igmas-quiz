import { ClientImageMultipleChoiceQuestion } from "@/types/quiz";
import { QuestionRendererProps } from "./QuestionRenderer";
import Image from "next/image";

export const ImageMultipleChoiceQuestion = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  isDisabled = false,
}: QuestionRendererProps<ClientImageMultipleChoiceQuestion>) => {
  return (
    <div className="space-y-6">
      {/* Image Section */}
      <div className="sketch-border bg-background p-4 animate-float-delayed">
        <div className="relative w-full h-64 md:h-96">
          <Image
            src={question.imageUrl}
            alt={question.question}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Options Section */}
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !isDisabled && onSelectAnswer(index)}
            disabled={isDisabled}
            className={`
              w-full sketch-border p-4 text-left font-handwriting text-lg
              transition-all duration-200 animate-float-delayed-2
              ${!isDisabled && "hover:bg-secondary hover:scale-105"}
              ${
                selectedAnswer === index
                  ? "bg-primary text-primary-foreground scale-105"
                  : "bg-card text-foreground"
              }
              ${isDisabled && "opacity-60 cursor-not-allowed"}
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
    </div>
  );
};
