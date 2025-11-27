import { useState, useEffect } from "react";
import { Volume2 } from "lucide-react";
import { StartMenu } from "./StartMenu";

interface TaskbarProps {
  openWindows: { id: string; label: string }[];
  onOpenWindow: (windowId: string) => void;
  onShutdown?: () => void;
  onWindowClick: (windowId: string) => void;
}

export const Taskbar = ({ openWindows, onOpenWindow, onShutdown, onWindowClick }: TaskbarProps) => {
  const [time, setTime] = useState(new Date());
  const [showStartMenu, setShowStartMenu] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleShutdown = () => {
    setShowStartMenu(false);
    onShutdown?.();
  };

  return (
    <>
      {/* Click outside to close menu */}
      {showStartMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowStartMenu(false)}
        />
      )}

      <div className="fixed bottom-0 left-0 right-0 h-10 bg-gradient-to-b from-taskbar-blue to-taskbar-blue-light border-t-2 border-xp-blue-light shadow-lg z-50">
        <div className="h-full flex items-center px-1 gap-1">
          {/* Start Button */}
          <button
            className={`h-8 px-3 rounded-sm bg-gradient-to-b from-taskbar-start-green-light to-taskbar-start-green hover:brightness-110 flex items-center gap-2 shadow-md transition-all hover:shadow-lg ${showStartMenu ? 'brightness-90' : ''}`}
            onClick={() => setShowStartMenu(!showStartMenu)}
          >
            <div className="flex gap-0.5">
              <div className="w-3 h-3 bg-gradient-to-br from-red-500 to-red-600 rounded-sm"></div>
              <div className="w-3 h-3 bg-gradient-to-br from-green-500 to-green-600 rounded-sm"></div>
              <div className="w-3 h-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-sm"></div>
              <div className="w-3 h-3 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-sm"></div>
            </div>
            <span className="text-white font-bold text-sm drop-shadow">start</span>
          </button>

          {/* Divider */}
          <div className="w-px h-8 bg-xp-blue-light"></div>

          {/* Open Windows */}
          <div className="flex gap-1 flex-1 overflow-x-auto">
            {openWindows.map((window) => (
              <button
                key={window.id}
                className="h-8 px-3 min-w-[120px] max-w-[200px] bg-gradient-to-b from-xp-blue-light to-xp-blue hover:from-xp-blue hover:to-xp-blue-dark text-white text-xs font-medium rounded-sm shadow-md truncate"
                onClick={() => onWindowClick(window.id)}
              >
                {window.label}
              </button>
            ))}
          </div>

          {/* System Tray */}
          <div className="flex items-center gap-2 px-2 h-8 bg-xp-blue/30 rounded-sm">
            <Volume2 className="w-4 h-4 text-white" />
            <div className="w-px h-4 bg-white/30"></div>
            <span className="text-white text-xs font-medium">
              {formatTime(time)}
            </span>
          </div>
        </div>

        {/* Start Menu */}
        {showStartMenu && (
          <StartMenu 
            onClose={() => setShowStartMenu(false)}
            onOpenWindow={onOpenWindow}
            onShutdown={handleShutdown}
          />
        )}
      </div>
    </>
  );
};
