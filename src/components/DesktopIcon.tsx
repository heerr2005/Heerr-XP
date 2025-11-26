import { LucideIcon } from "lucide-react";
import { useState } from "react";

interface DesktopIconProps {
  label: string;
  icon: LucideIcon;
  x: number;
  y: number;
  onDoubleClick: () => void;
}

export const DesktopIcon = ({ label, icon: Icon, x, y, onDoubleClick }: DesktopIconProps) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      className={`absolute cursor-pointer select-none group`}
      style={{ left: x, top: y }}
      onClick={() => setIsSelected(!isSelected)}
      onDoubleClick={onDoubleClick}
    >
      <div className={`flex flex-col items-center p-2 rounded ${isSelected ? 'bg-xp-blue/30' : ''}`}>
        <div className="w-12 h-12 mb-1 flex items-center justify-center">
          <div className="relative">
            <Icon className="w-10 h-10 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" strokeWidth={1.5} />
          </div>
        </div>
        <span className="text-white text-xs font-medium text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] max-w-[80px] leading-tight">
          {label}
        </span>
      </div>
    </div>
  );
};
