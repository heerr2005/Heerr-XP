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
  height = 400
}: WindowProps) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [preMaximizeState, setPreMaximizeState] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [currentWidth, setCurrentWidth] = useState(width);
  const [currentHeight, setCurrentHeight] = useState(height);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return;
    if (isMaximized) return;
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    onFocus();
  };

  const handleMaximize = () => {
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

  return (
    <div
      className={`fixed bg-card rounded-sm shadow-2xl animate-window-open ${isActive ? 'z-50' : 'z-40'}`}
      style={{
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        width: isMaximized ? '100vw' : `${currentWidth}px`,
        height: isMaximized ? 'calc(100vh - 40px)' : undefined,
        maxWidth: isMaximized ? '100vw' : 'calc(100vw - 40px)',
        maxHeight: isMaximized ? 'calc(100vh - 40px)' : 'calc(100vh - 80px)',
      }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className={`h-8 px-2 flex items-center justify-between select-none rounded-t-sm ${
          isMaximized ? 'cursor-default' : 'cursor-move'
        } ${
          isActive 
            ? 'bg-gradient-to-r from-window-title-start to-window-title-end' 
            : 'bg-gradient-to-r from-gray-400 to-gray-500'
        }`}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleMaximize}
      >
        <span className="text-white text-sm font-semibold">{title}</span>
        
        {/* Window Controls */}
        <div className="window-controls flex gap-0.5">
          <button 
            className="w-[21px] h-[21px] bg-gradient-to-b from-[#3b82f6] to-[#1e40af] hover:from-[#60a5fa] hover:to-[#2563eb] flex items-center justify-center rounded-sm border border-white/20"
            onClick={onMinimize}
            title="Minimize"
          >
            <Minus className="w-3 h-3 text-white" />
          </button>
          <button 
            className="w-[21px] h-[21px] bg-gradient-to-b from-[#3b82f6] to-[#1e40af] hover:from-[#60a5fa] hover:to-[#2563eb] flex items-center justify-center rounded-sm border border-white/20"
            onClick={handleMaximize}
            title={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? <Copy className="w-3 h-3 text-white" /> : <Square className="w-3 h-3 text-white" />}
          </button>
          <button 
            className="w-[21px] h-[21px] bg-gradient-to-b from-[#ef4444] to-[#b91c1c] hover:from-[#f87171] hover:to-[#dc2626] flex items-center justify-center rounded-sm border border-white/20"
            onClick={onClose}
            title="Close"
          >
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>

      {/* Menu Bar */}
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

      {/* Content */}
      <div 
        className="overflow-auto" 
        style={{ 
          height: isMaximized ? 'calc(100vh - 40px - 56px)' : `${currentHeight - 56}px`,
          maxHeight: isMaximized ? undefined : `${currentHeight - 56}px`
        }}
      >
        {children}
      </div>
    </div>
  );
};
