import Image from "next/image";
import { Button } from "@/components/ui/button";

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export const QuizResults = ({ score, totalQuestions, onRestart }: QuizResultsProps) => {
  const isPerfect = score === 9 && totalQuestions === 9;

  return (
    <div className="sketch-border bg-card p-8 animate-float text-center">
      <div className="mb-8 animate-wobble">
        <h1 className="text-4xl md:text-5xl font-sketch text-primary mb-4">
          Quiz Complete!
        </h1>
      </div>

      <div className="sketch-border bg-secondary p-8 mb-8 animate-float-delayed">
        <div className="text-6xl md:text-7xl font-sketch text-primary mb-2 animate-sway">
          {score}/{totalQuestions}
        </div>
        <div className="text-xl font-handwriting text-muted-foreground">
          Correct Answers
        </div>
      </div>

      {isPerfect ? (
        <>
          <div className="mb-6 animate-float-delayed-2">
            <Image
              src="/jolanta.jpg"
              alt="Jolanta"
              width={400}
              height={400}
              className="w-full max-w-md mx-auto rounded-lg sketch-border"
            />
          </div>
          <div className="sketch-border bg-accent/10 p-6 mb-8 animate-float-delayed-2">
            <p className="text-lg font-handwriting text-foreground mb-4">
              Ignai, tavo superinės žinios privertė pakeisti mano neteisingą pirminę nuomonę apie tave - nuo šiol aš noriu būti tavo cukraus mamyte. Štai dovanėlė tau {'<3'} :
            </p>
            <a
              href="https://drive.google.com/file/d/1PD6K2fSVuPiX8P4F6caDt6Gsl-EaBYH7/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 underline font-sketch text-lg break-all"
            >
              https://drive.google.com/file/d/1PD6K2fSVuPiX8P4F6caDt6Gsl-EaBYH7/view?usp=drivesdk
            </a>
          </div>
        </>
      ) : (
        <>
          <div className="mb-6 animate-float-delayed-2">
            <Image
              src="/Audrone.jpg"
              alt="Audrone"
              width={400}
              height={400}
              className="w-full max-w-md mx-auto rounded-lg sketch-border"
            />
          </div>
          <div className="sketch-border bg-accent/10 p-6 mb-8 animate-float-delayed-2">
            <p className="text-lg font-handwriting text-foreground">
              O ne, tu neatsakei visų klausimų taigi neesi didžiausias Igno fanas - savo gyvenimą baigsi prirakintas prie Lupeikienės radijatoriaus - bandyk vėl
            </p>
          </div>
        </>
      )}

      <Button
        onClick={onRestart}
        className="sketch-border bg-accent hover:bg-accent/80 text-accent-foreground font-sketch text-xl px-8 py-6 animate-wobble"
      >
        Try Again! 🔄
      </Button>
    </div>
  );
};
