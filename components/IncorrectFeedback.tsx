import { useEffect, useRef } from "react";

export const IncorrectFeedback = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Failed to play audio:", error);
      });
    }
  }, []);

  return (
    <div className="sketch-border p-6 mb-8 text-center animate-float-delayed bg-red-100 border-red-400">
      <p className="text-2xl font-sketch text-red-700">
        ✗ Incorrect!
      </p>
      <audio ref={audioRef} src="/incorrect_feedback.mp3" />
    </div>
  );
};
