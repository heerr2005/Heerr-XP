import { useState } from "react";
import userAvatar from "@/assets/user-avatar.png";

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = () => {
    setIsLoggingIn(true);
    // Play Windows startup sound
    const audio = new Audio('/sounds/windows-startup.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => {
      // Silently fail if autoplay is blocked
    });
    
    setTimeout(() => {
      onLogin();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-xp-blue-dark to-xp-blue flex items-center justify-center animate-xp-fade-in">
      {/* Login Card */}
      <div className="text-center">
        {/* User Avatar */}
        <div 
          className={`mb-6 cursor-pointer transition-transform ${isLoggingIn ? 'scale-110' : 'hover:scale-105'}`}
          onClick={handleLogin}
        >
          <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/50 shadow-2xl">
            <img 
              src={userAvatar} 
              alt="Heer" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* User Name */}
        <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Heer</h2>
        <p className="text-white/90 text-sm mb-8">Click to log in</p>

        {/* Loading Animation */}
        {isLoggingIn && (
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
        )}

        {/* Instructions */}
        {!isLoggingIn && (
          <p className="text-white/70 text-xs mt-8 max-w-xs mx-auto">
            To begin, click on the user icon above
          </p>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/80 text-xs">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
        </svg>
        <span>Press F11 for fullscreen experience</span>
      </div>
    </div>
  );
};
