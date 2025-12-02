import { LucideIcon } from "lucide-react";
import { useState } from "react";

interface DesktopIconProps {
  label: string;
  icon: LucideIcon;
  iconColor?: string;
  x: number;
  y: number;
  onDoubleClick: () => void;
  isMobile?: boolean;
}

export const DesktopIcon = ({ label, icon: Icon, iconColor = "text-white", x, y, onDoubleClick, isMobile }: DesktopIconProps) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      className={`absolute cursor-pointer select-none group ${isMobile ? 'w-[65px]' : ''}`}
      style={{ left: x, top: y }}
      onClick={() => setIsSelected(!isSelected)}
      onDoubleClick={onDoubleClick}
    >
      <div className={`flex flex-col items-center ${isMobile ? 'p-1' : 'p-2'} rounded ${isSelected ? 'bg-xp-blue/30' : 'hover:bg-xp-blue/20'}`}>
        <div className={`${isMobile ? 'w-9 h-9' : 'w-12 h-12'} mb-1 flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <Icon className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} ${iconColor} drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`} strokeWidth={1.5} />
        </div>
        <span className={`text-white ${isMobile ? 'text-[10px]' : 'text-xs'} font-medium text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] ${isMobile ? 'max-w-[60px]' : 'max-w-[80px]'} leading-tight ${isSelected ? 'bg-xp-blue px-1' : ''}`}>
          {label}
        </span>
      </div>
    </div>
  );
};