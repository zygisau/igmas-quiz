import { Button } from "@/components/ui/button";

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export const QuizResults = ({ score, totalQuestions, onRestart }: QuizResultsProps) => {
  const percentage = (score / totalQuestions) * 100;
  
  const getMessage = () => {
    if (percentage === 100) return "🎉 PERFECT! You're a genius!";
    if (percentage >= 80) return "🌟 Great job! Almost there!";
    if (percentage >= 60) return "👍 Not bad! Keep practicing!";
    if (percentage >= 40) return "😅 You tried! Practice makes perfect!";
    return "🤔 Hmm... Maybe try again?";
  };

  return (
    <div className="sketch-border bg-card p-8 animate-float text-center">
      <div className="mb-8 animate-wobble">
        <h1 className="text-4xl md:text-5xl font-sketch text-primary mb-4">
          Quiz Complete!
        </h1>
        <p className="text-2xl font-handwriting text-foreground">
          {getMessage()}
        </p>
      </div>

      <div className="sketch-border bg-secondary p-8 mb-8 animate-float-delayed">
        <div className="text-6xl md:text-7xl font-sketch text-primary mb-2 animate-sway">
          {score}/{totalQuestions}
        </div>
        <div className="text-xl font-handwriting text-muted-foreground">
          Correct Answers
        </div>
      </div>

      <div className="sketch-border bg-accent/10 p-6 mb-8 animate-float-delayed-2">
        <div className="text-3xl font-sketch text-accent mb-2">
          {percentage.toFixed(0)}%
        </div>
        <div className="text-lg font-handwriting text-foreground">
          Score Percentage
        </div>
      </div>

      <Button
        onClick={onRestart}
        className="sketch-border bg-accent hover:bg-accent/80 text-accent-foreground font-sketch text-xl px-8 py-6 animate-wobble"
      >
        Try Again! 🔄
      </Button>
    </div>
  );
};
