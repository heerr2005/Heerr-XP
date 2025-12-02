import { useState, useEffect } from "react";
import { Volume2, Wifi, Shield } from "lucide-react";
import { StartMenu } from "./StartMenu";

interface TaskbarProps {
  openWindows: { id: string; label: string; isMinimized?: boolean }[];
  activeWindow: string | null;
  onOpenWindow: (windowId: string) => void;
  onShutdown?: () => void;
  onWindowClick: (windowId: string) => void;
  isMobile?: boolean;
}

export const Taskbar = ({ openWindows, activeWindow, onOpenWindow, onShutdown, onWindowClick, isMobile }: TaskbarProps) => {
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

      <div className={`fixed bottom-0 left-0 right-0 ${isMobile ? 'h-[40px]' : 'h-[30px]'} bg-gradient-to-b from-[#245edb] via-[#3f8cf3] to-[#245edb] border-t border-[#0c59d0] shadow-lg z-50`}>
        <div className="h-full flex items-center px-0.5 gap-0.5">
          {/* Start Button */}
          <button
            className={`h-full ${isMobile ? 'px-3' : 'px-2'} bg-gradient-to-b from-[#5cb85c] via-[#3c943c] to-[#2d7b2d] hover:from-[#6fcf6f] hover:via-[#4fa94f] hover:to-[#3c943c] flex items-center gap-1.5 rounded-r-lg border-r border-[#2d7b2d] transition-all ${showStartMenu ? 'from-[#4fa94f] via-[#3c943c] to-[#2d7b2d]' : ''}`}
            onClick={() => setShowStartMenu(!showStartMenu)}
          >
            <div className="flex gap-0.5">
              <div className={`${isMobile ? 'w-3 h-3' : 'w-2.5 h-2.5'} bg-gradient-to-br from-red-400 to-red-600 rounded-sm`}></div>
              <div className={`${isMobile ? 'w-3 h-3' : 'w-2.5 h-2.5'} bg-gradient-to-br from-green-400 to-green-600 rounded-sm`}></div>
              <div className={`${isMobile ? 'w-3 h-3' : 'w-2.5 h-2.5'} bg-gradient-to-br from-blue-400 to-blue-600 rounded-sm`}></div>
              <div className={`${isMobile ? 'w-3 h-3' : 'w-2.5 h-2.5'} bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-sm`}></div>
            </div>
            <span className={`text-white font-bold ${isMobile ? 'text-base' : 'text-sm'} italic drop-shadow-md`}>start</span>
          </button>

          {/* Quick Launch Divider */}
          <div className="w-px h-5 bg-white/30 mx-1"></div>

          {/* Open Windows */}
          <div className="flex gap-0.5 flex-1 overflow-x-auto px-1">
            {openWindows.map((window) => (
              <button
                key={window.id}
                className={`h-[22px] ${isMobile ? 'h-[30px] px-1.5 min-w-[80px] max-w-[100px]' : 'px-2 min-w-[140px] max-w-[180px]'} text-white text-xs font-medium rounded-sm truncate flex items-center gap-1 transition-all ${
                  activeWindow === window.id && !window.isMinimized
                    ? 'bg-gradient-to-b from-[#1c4eb5] to-[#2d66d4] shadow-inner border border-[#0a3a9c]'
                    : 'bg-gradient-to-b from-[#3d7bf7] to-[#2b5fd9] hover:from-[#5a92ff] hover:to-[#3d7bf7] border border-transparent'
                }`}
                onClick={() => onWindowClick(window.id)}
              >
                <span className="truncate text-[10px] md:text-xs">{isMobile ? window.label.split(' ')[0] : window.label}</span>
              </button>
            ))}
          </div>

          {/* System Tray */}
          <div className={`flex items-center h-full ${isMobile ? 'px-1' : 'px-2'} bg-gradient-to-b from-[#0f7ad9] to-[#1665b8] border-l border-[#0a4d8c]`}>
            {!isMobile && (
              <div className="flex items-center gap-2 mr-2">
                <button className="p-0.5 hover:bg-white/10 rounded">
                  <Wifi className="w-4 h-4 text-white" />
                </button>
                <button className="p-0.5 hover:bg-white/10 rounded">
                  <Shield className="w-4 h-4 text-green-400" />
                </button>
                <button className="p-0.5 hover:bg-white/10 rounded">
                  <Volume2 className="w-4 h-4 text-white" />
                </button>
              </div>
            )}
            <div className={`${!isMobile ? 'border-l border-white/20 pl-2' : ''}`}>
              <span className={`text-white ${isMobile ? 'text-[10px]' : 'text-xs'} font-medium`}>
                {formatTime(time)}
              </span>
            </div>
          </div>
        </div>

        {/* Start Menu */}
        {showStartMenu && (
          <StartMenu 
            onClose={() => setShowStartMenu(false)}
            onOpenWindow={onOpenWindow}
            onShutdown={handleShutdown}
            isMobile={isMobile}
          />
        )}
      </div>
    </>
  );
};