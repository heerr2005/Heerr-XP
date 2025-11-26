import { ReactNode, useState } from "react";
import { X, Minus, Square } from "lucide-react";

interface WindowProps {
  title: string;
  children: ReactNode;
  isActive: boolean;
  onClose: () => void;
  onFocus: () => void;
  initialX: number;
  initialY: number;
}

export const Window = ({ title, children, isActive, onClose, onFocus, initialX, initialY }: WindowProps) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return;
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    onFocus();
  };

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

  // Add event listeners for dragging
  if (isDragging) {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }

  return (
    <div
      className={`fixed bg-card rounded-sm shadow-2xl animate-window-open ${isActive ? 'z-50' : 'z-40'}`}
      style={{
        left: position.x,
        top: position.y,
        width: '600px',
        maxWidth: 'calc(100vw - 40px)',
        maxHeight: 'calc(100vh - 80px)',
      }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className={`h-8 px-2 flex items-center justify-between cursor-move select-none ${
          isActive 
            ? 'bg-gradient-to-r from-window-title-start to-window-title-end' 
            : 'bg-gradient-to-r from-gray-400 to-gray-500'
        }`}
        onMouseDown={handleMouseDown}
      >
        <span className="text-white text-sm font-semibold">{title}</span>
        
        {/* Window Controls */}
        <div className="window-controls flex gap-1">
          <button className="w-6 h-6 bg-xp-blue hover:bg-xp-blue-dark flex items-center justify-center rounded-sm">
            <Minus className="w-3 h-3 text-white" />
          </button>
          <button className="w-6 h-6 bg-xp-blue hover:bg-xp-blue-dark flex items-center justify-center rounded-sm">
            <Square className="w-3 h-3 text-white" />
          </button>
          <button 
            className="w-6 h-6 bg-red-500 hover:bg-red-600 flex items-center justify-center rounded-sm"
            onClick={onClose}
          >
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="h-6 px-2 bg-secondary border-b border-border flex items-center gap-4">
        <span className="text-xs">File</span>
        <span className="text-xs">Edit</span>
        <span className="text-xs">View</span>
        <span className="text-xs">Help</span>
      </div>

      {/* Content */}
      <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {children}
      </div>
    </div>
  );
};
