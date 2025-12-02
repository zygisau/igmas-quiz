"use client";

import { createPortal } from "react-dom";
import Image from "next/image";
import { ClientVolumeSliderQuestion } from "@/types/quiz";
import { QuestionRendererProps } from "./QuestionRenderer";
import { useAudioManagement, volumeSchema } from "@/components/BackgroundMusic";

export const VolumeSliderQuestion = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  isDisabled = false,
}: QuestionRendererProps<ClientVolumeSliderQuestion>) => {
  const { volume, handleVolumeChange, shake, showSpook, audioRef, spookAudioRef } =
    useAudioManagement();

  const handleSliderChange = (newVolume: number) => {
    // Validate with Zod schema
    const result = volumeSchema.safeParse({ volume: newVolume });
    if (result.success) {
      handleVolumeChange(newVolume);
      // Update the answer
      if (!isDisabled) {
        if (newVolume === 0) {
          onSelectAnswer(0);
        } else {
          onSelectAnswer(newVolume);
        }
      }
    }
  };

  return (
    <>
      {/* Hidden audio elements for this question */}
      <audio ref={audioRef} src="/background.mp3" style={{ display: 'none' }} />
      <audio ref={spookAudioRef} src="/spook.mp3" style={{ display: 'none' }} />

      <div className="space-y-6">
        <div className="sketch-border bg-card p-8 rounded-lg animate-float">
          <div className="flex flex-col items-center gap-6">
            <span className="text-lg font-sketch text-center">
              Adjust the volume with the slider below
            </span>

            {/* Volume Slider */}
            <div className="w-full max-w-md">
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => handleSliderChange(Number(e.target.value))}
                disabled={isDisabled}
                className="w-full h-3 appearance-none bg-secondary rounded-lg cursor-pointer"
                style={{
                  background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${volume}%, hsl(var(--secondary)) ${volume}%, hsl(var(--secondary)) 100%)`,
                }}
              />
              <div className="flex justify-between mt-2">
                <span className="text-sm font-sketch">0%</span>
                <span className="text-lg font-sketch font-bold">{volume}%</span>
                <span className="text-sm font-sketch">100%</span>
              </div>
            </div>

            {selectedAnswer !== undefined && (
              <div className="text-sm font-sketch text-muted-foreground">
                Your answer: {selectedAnswer}%
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Spook Image Overlay */}
      {showSpook && typeof document !== 'undefined' && document.body && createPortal(
        <div className="fixed inset-0 z-[100] animate-shake" style={{ pointerEvents: 'none' }}>
          <Image
            src="/spook.png"
            alt="Spook"
            fill
            className="object-cover"
            preload
          />
        </div>,
        document.body
      )}

      {/* Shake Animation */}
      {shake && (
        <style jsx global>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
            20%, 40%, 60%, 80% { transform: translateX(10px); }
          }
          body {
            animation: shake 0.5s;
          }
        `}</style>
      )}

      {/* Spook Shake Animation for Image */}
      {showSpook && (
        <style jsx>{`
          @keyframes shake {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            10% { transform: translate(-10px, -10px) rotate(-5deg); }
            20% { transform: translate(10px, 10px) rotate(5deg); }
            30% { transform: translate(-10px, 10px) rotate(-5deg); }
            40% { transform: translate(10px, -10px) rotate(5deg); }
            50% { transform: translate(-10px, -10px) rotate(-5deg); }
            60% { transform: translate(10px, 10px) rotate(5deg); }
            70% { transform: translate(-10px, 10px) rotate(-5deg); }
            80% { transform: translate(10px, -10px) rotate(5deg); }
            90% { transform: translate(-10px, -10px) rotate(-5deg); }
          }
          .animate-shake {
            animation: shake 0.5s infinite;
          }
        `}</style>
      )}
    </>
  );
};
