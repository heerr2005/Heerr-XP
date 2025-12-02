import { ReactNode, useState, useEffect, useRef } from "react";
import { X, Minus, Square, Copy } from "lucide-react";

interface WindowProps {
  title: string;
  children: ReactNode;
  isActive: boolean;
  isMinimized?: boolean;
  onClose: () => void;
  onFocus: () => void;
  onMinimize?: () => void;
  initialX: number;
  initialY: number;
  width?: number;
  height?: number;
  isMobile?: boolean;
}

interface MenuItem {
  label: string;
  action?: () => void;
  separator?: boolean;
  disabled?: boolean;
}

export const Window = ({ 
  title, 
  children, 
  isActive, 
  isMinimized = false,
  onClose, 
  onFocus, 
  onMinimize,
  initialX, 
  initialY,
  width = 600,
  height = 400,
  isMobile = false
}: WindowProps) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(isMobile);
  const [preMaximizeState, setPreMaximizeState] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [currentWidth, setCurrentWidth] = useState(width);
  const [currentHeight, setCurrentHeight] = useState(height);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile) {
      setIsMaximized(true);
      setPosition({ x: 0, y: 0 });
    }
  }, [isMobile]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return;
    if (isMaximized || isMobile) return;
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    onFocus();
  };

  const handleMaximize = () => {
    if (isMobile) return;
    
    if (isMaximized) {
      setPosition({ x: preMaximizeState.x, y: preMaximizeState.y });
      setCurrentWidth(preMaximizeState.width);
      setCurrentHeight(preMaximizeState.height);
      setIsMaximized(false);
    } else {
      setPreMaximizeState({ x: position.x, y: position.y, width: currentWidth, height: currentHeight });
      setPosition({ x: 0, y: 0 });
      setCurrentWidth(window.innerWidth);
      setCurrentHeight(window.innerHeight - 40);
      setIsMaximized(true);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isMinimized) return null;

  const menuItems: Record<string, MenuItem[]> = {
    File: [
      { label: "New", action: () => {} },
      { label: "Open...", action: () => {} },
      { label: "Save", action: () => {} },
      { label: "Save As...", action: () => {} },
      { separator: true, label: "" },
      { label: "Print...", disabled: true },
      { separator: true, label: "" },
      { label: "Exit", action: onClose },
    ],
    Edit: [
      { label: "Undo", disabled: true },
      { separator: true, label: "" },
      { label: "Cut", action: () => {} },
      { label: "Copy", action: () => {} },
      { label: "Paste", action: () => {} },
      { label: "Delete", action: () => {} },
      { separator: true, label: "" },
      { label: "Select All", action: () => {} },
    ],
    View: [
      { label: "Toolbar", action: () => {} },
      { label: "Status Bar", action: () => {} },
      { separator: true, label: "" },
      { label: "Refresh", action: () => window.location.reload() },
    ],
    Help: [
      { label: "Help Topics", action: () => {} },
      { separator: true, label: "" },
      { label: "About " + title, action: () => alert(`${title}\n\nHeer's Portfolio - Windows XP Experience\nVersion 1.0`) },
    ],
  };

  const effectiveWidth = isMobile || isMaximized ? '100vw' : `${currentWidth}px`;
  const effectiveHeight = isMobile || isMaximized ? 'calc(100vh - 40px)' : undefined;

  return (
    <div
      className={`fixed bg-card rounded-sm shadow-2xl animate-window-open ${isActive ? 'z-50' : 'z-40'}`}
      style={{
        left: isMobile || isMaximized ? 0 : position.x,
        top: isMobile || isMaximized ? 0 : position.y,
        width: effectiveWidth,
        height: effectiveHeight,
        maxWidth: isMobile || isMaximized ? '100vw' : 'calc(100vw - 40px)',
        maxHeight: isMobile || isMaximized ? 'calc(100vh - 40px)' : 'calc(100vh - 80px)',
      }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className={`${isMobile ? 'h-10' : 'h-8'} px-2 flex items-center justify-between select-none rounded-t-sm ${
          isMaximized || isMobile ? 'cursor-default' : 'cursor-move'
        } ${
          isActive 
            ? 'bg-gradient-to-r from-window-title-start to-window-title-end' 
            : 'bg-gradient-to-r from-gray-400 to-gray-500'
        }`}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleMaximize}
      >
        <span className={`text-white ${isMobile ? 'text-xs' : 'text-sm'} font-semibold truncate max-w-[60%]`}>{title}</span>
        
        {/* Window Controls */}
        <div className="window-controls flex gap-0.5">
          <button 
            className={`${isMobile ? 'w-7 h-7' : 'w-[21px] h-[21px]'} bg-gradient-to-b from-[#3b82f6] to-[#1e40af] hover:from-[#60a5fa] hover:to-[#2563eb] flex items-center justify-center rounded-sm border border-white/20`}
            onClick={onMinimize}
            title="Minimize"
          >
            <Minus className={`${isMobile ? 'w-4 h-4' : 'w-3 h-3'} text-white`} />
          </button>
          {!isMobile && (
            <button 
              className="w-[21px] h-[21px] bg-gradient-to-b from-[#3b82f6] to-[#1e40af] hover:from-[#60a5fa] hover:to-[#2563eb] flex items-center justify-center rounded-sm border border-white/20"
              onClick={handleMaximize}
              title={isMaximized ? "Restore" : "Maximize"}
            >
              {isMaximized ? <Copy className="w-3 h-3 text-white" /> : <Square className="w-3 h-3 text-white" />}
            </button>
          )}
          <button 
            className={`${isMobile ? 'w-7 h-7' : 'w-[21px] h-[21px]'} bg-gradient-to-b from-[#ef4444] to-[#b91c1c] hover:from-[#f87171] hover:to-[#dc2626] flex items-center justify-center rounded-sm border border-white/20`}
            onClick={onClose}
            title="Close"
          >
            <X className={`${isMobile ? 'w-4 h-4' : 'w-3 h-3'} text-white`} />
          </button>
        </div>
      </div>

      {/* Menu Bar - Hidden on mobile */}
      {!isMobile && (
        <div className="h-6 px-1 bg-secondary border-b border-border flex items-center gap-0 relative" ref={menuRef}>
          {Object.keys(menuItems).map((menu) => (
            <div key={menu} className="relative">
              <button
                className={`px-2 py-0.5 text-xs hover:bg-xp-blue hover:text-white ${activeMenu === menu ? 'bg-xp-blue text-white' : ''}`}
                onClick={() => setActiveMenu(activeMenu === menu ? null : menu)}
              >
                {menu}
              </button>
              {activeMenu === menu && (
                <div className="absolute top-full left-0 bg-card border border-border shadow-lg py-1 min-w-[150px] z-[100]">
                  {menuItems[menu].map((item, i) => (
                    item.separator ? (
                      <div key={i} className="border-t border-border my-1" />
                    ) : (
                      <button
                        key={i}
                        className={`w-full px-4 py-1 text-left text-xs hover:bg-xp-blue hover:text-white ${item.disabled ? 'text-muted-foreground cursor-default' : ''}`}
                        onClick={() => {
                          if (!item.disabled && item.action) {
                            item.action();
                            setActiveMenu(null);
                          }
                        }}
                        disabled={item.disabled}
                      >
                        {item.label}
                      </button>
                    )
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <div 
        className="overflow-auto" 
        style={{ 
          height: isMobile || isMaximized ? `calc(100vh - 40px - ${isMobile ? '40px' : '56px'})` : `${currentHeight - 56}px`,
          maxHeight: isMobile || isMaximized ? undefined : `${currentHeight - 56}px`
        }}
      >
        {children}
      </div>
    </div>
  );
};