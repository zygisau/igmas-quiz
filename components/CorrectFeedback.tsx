import { useEffect, useRef } from "react";

export const CorrectFeedback = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Failed to play audio:", error);
      });
    }
  }, []);

  return (
    <div className="sketch-border p-6 mb-8 text-center animate-float-delayed bg-green-100 border-green-400">
      <p className="text-2xl font-sketch text-green-700">
        ✓ Correct!
      </p>
      <audio ref={audioRef} src="/correct_feedback.mp3" />
    </div>
  );
};
