"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2 } from "lucide-react";
import { AudioDenialPage } from "./AudioDenialPage";

export const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(100);
  const [showSlider, setShowSlider] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [shake, setShake] = useState(false);
  const [audioDenied, setAudioDenied] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.loop = true;
      audioRef.current.play().catch((error) => {
        console.error("Failed to play background music:", error);
        // Check if the error is due to user denying audio
        if (error.name === "NotAllowedError" || error.name === "NotSupportedError") {
          setAudioDenied(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const handleVolumeChange = (newVolume: number) => {
    if (newVolume === 0) {
      // User tried to mute - FUCK YOU!
      setShake(true);
      setShowPopover(true);
      setVolume(100);

      setTimeout(() => {
        setShake(false);
      }, 500);

      setTimeout(() => {
        setShowPopover(false);
      }, 2000);
    } else {
      setVolume(newVolume);
    }
  };

  if (audioDenied) {
    return <AudioDenialPage />;
  }

  return (
    <>
      <audio ref={audioRef} src="/background.mp3" />

      {/* Volume Control Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setShowSlider(!showSlider)}
          className="sketch-border bg-primary hover:bg-primary/80 text-primary-foreground rounded-full p-4 shadow-lg transition-all hover:scale-110"
          aria-label="Volume control"
        >
          <Volume2 size={24} />
        </button>

        {/* Volume Slider Popup */}
        {showSlider && (
          <div className="absolute bottom-20 right-0 sketch-border bg-card p-4 rounded-lg shadow-xl animate-float">
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-sketch">Volume</span>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                className="h-24 w-2 appearance-none bg-secondary rounded-lg cursor-pointer [writing-mode:vertical-lr] [direction:rtl]"
                style={{
                  background: `linear-gradient(to top, hsl(var(--primary)) 0%, hsl(var(--primary)) ${volume}%, hsl(var(--secondary)) ${volume}%, hsl(var(--secondary)) 100%)`
                }}
              />
              <span className="text-xs font-sketch">{volume}%</span>
            </div>
          </div>
        )}

        {/* FUCK YOU Popover */}
        {showPopover && (
          <div className="absolute bottom-20 right-0 sketch-border bg-red-500 text-white p-4 rounded-lg shadow-xl animate-bounce">
            <p className="text-2xl font-sketch font-bold">FUCK YOU</p>
          </div>
        )}
      </div>

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
    </>
  );
};
