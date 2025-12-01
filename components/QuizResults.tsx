"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export const QuizResults = ({ score, totalQuestions, onRestart }: QuizResultsProps) => {
  const isPerfect = score === 9 && totalQuestions === 9;
  const [redIntensity, setRedIntensity] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isPerfect) {
      return;
    }

    const findAudio = () => {
      const audio = document.querySelector('audio[src="/lupeikiene.mp3"]') as HTMLAudioElement;
      return audio;
    };

    let audio = findAudio();
    if (!audio) {
      const checkInterval = setInterval(() => {
        audio = findAudio();
        if (audio) {
          clearInterval(checkInterval);
          setupAudioTracking(audio);
        }
      }, 100);
      return () => clearInterval(checkInterval);
    } else {
      return setupAudioTracking(audio);
    }

    function setupAudioTracking(audio: HTMLAudioElement) {
      audioRef.current = audio;
      let lastTime = 0;
      
      const updateRedness = () => {
        if (audioRef.current && audioRef.current.duration) {
          const currentTime = audioRef.current.currentTime;
          
          if (currentTime < lastTime && lastTime > 0.5) {
            setRedIntensity(0);
          }
          
          lastTime = currentTime;
          const progress = (currentTime / audioRef.current.duration) * 100;
          setRedIntensity(Math.min(100, Math.max(0, progress)));
        }
      };

      const handleLoop = () => {
        setRedIntensity(0);
      };

      audio.addEventListener('timeupdate', updateRedness);
      audio.addEventListener('ended', handleLoop);
      audio.addEventListener('seeked', updateRedness);

      return () => {
        audio.removeEventListener('timeupdate', updateRedness);
        audio.removeEventListener('ended', handleLoop);
        audio.removeEventListener('seeked', updateRedness);
      };
    }
  }, [isPerfect]);

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

      {isPerfect && typeof document !== 'undefined' && document.body && createPortal(
        <>
          <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="fixed text-2xl md:text-3xl animate-heart-float"
                style={{
                  left: `${2 + (i * 4)}%`,
                  bottom: '-50px',
                  animationDelay: `${i * 0.25}s`,
                  animationDuration: '5s',
                  opacity: 0
                }}
              >
                ❤️
              </div>
            ))}
          </div>
          <style jsx global>{`
            @keyframes heart-float {
              0% {
                transform: translateY(0) scale(0.8);
                opacity: 0;
              }
              10% {
                transform: translateY(-50px) scale(1);
                opacity: 0.6;
              }
              50% {
                transform: translateY(-50vh) scale(1.2);
                opacity: 0.3;
              }
              100% {
                transform: translateY(-50vh) scale(0.8);
                opacity: 0;
              }
            }
            .animate-heart-float {
              animation: heart-float 5s ease-out infinite;
            }
          `}</style>
        </>,
        document.body
      )}

      {isPerfect ? (
        <>
          <div className="mb-6 animate-float-delayed-2 relative">
            <Image
              src="/jolanta.jpg"
              alt="Jolanta"
              width={400}
              height={400}
              className="w-full max-w-md mx-auto rounded-lg sketch-border"
              style={{
                filter: 'brightness(1.05) contrast(1.05)',
                boxShadow: '0 0 30px rgba(255, 255, 255, 0.4), 0 0 60px rgba(255, 255, 255, 0.2)',
                transition: 'filter 0.3s ease, box-shadow 0.3s ease'
              }}
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
              style={{
                filter: `sepia(${redIntensity}%) saturate(${100 + redIntensity * 4}%) hue-rotate(${-redIntensity * 0.4}deg) brightness(${100 - redIntensity * 0.1}%) contrast(${100 + redIntensity * 0.5}%)`,
                boxShadow: `0 0 ${redIntensity * 2}px rgba(255, 0, 0, ${redIntensity / 100})`,
                transition: 'filter 0.05s linear, box-shadow 0.05s linear'
              }}
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
