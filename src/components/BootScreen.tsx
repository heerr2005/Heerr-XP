import { useEffect, useState } from "react";

interface BootScreenProps {
  onBootComplete: () => void;
}

export const BootScreen = ({ onBootComplete }: BootScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onBootComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onBootComplete]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center animate-xp-fade-in">
      {/* Windows Logo */}
      <div className="mb-12">
        <div className="flex gap-2 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded"></div>
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded"></div>
        </div>
        <div className="flex gap-2">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded"></div>
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded"></div>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-white mb-2">
          Heer<span className="text-xp-green">XP</span>
        </h1>
        <p className="text-white/80 text-sm">Portfolio Experience</p>
      </div>

      {/* Loading Bar */}
      <div className="w-64 h-4 bg-gray-800 rounded-full overflow-hidden border border-gray-600">
        <div 
          className="h-full bg-gradient-to-r from-xp-blue to-xp-blue-light transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        >
          <div className="w-full h-full animate-xp-loading bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>
      </div>

      {/* Loading Text */}
      <p className="text-white/60 text-xs mt-4">Loading your experience...</p>
    </div>
  );
};
