import { useState } from "react";
import { 
  FolderOpen, 
  Mail, 
  User, 
  FileText, 
  Music, 
  Image, 
  Paintbrush,
  Terminal,
  Play,
  LogOut,
  Power,
  ChevronRight,
  Instagram,
  Github,
  Linkedin,
  Gamepad2
} from "lucide-react";
import userAvatar from "@/assets/user-avatar.png";

interface StartMenuProps {
  onClose: () => void;
  onOpenWindow: (windowId: string) => void;
  onShutdown: () => void;
  isMobile?: boolean;
}

export const StartMenu = ({ onClose, onOpenWindow, onShutdown, isMobile }: StartMenuProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const leftMenuItems = [
    { id: "projects", label: "My Projects", subtitle: "View my work", icon: FolderOpen, color: "text-blue-500" },
    { id: "contact", label: "Contact Me", subtitle: "Send me a message", icon: Mail, color: "text-yellow-500" },
    { id: "about", label: "About Me", subtitle: "", icon: User, color: "text-orange-500" },
    { id: "media", label: "Media Player", subtitle: "", icon: Play, color: "text-green-500" },
    { id: "paint", label: "Paint", subtitle: "", icon: Paintbrush, color: "text-purple-500" },
    { id: "music", label: "Music Player", subtitle: "", icon: Music, color: "text-blue-400" },
    { id: "minesweeper", label: "Minesweeper", subtitle: "Play a game", icon: Gamepad2, color: "text-red-500" },
  ];

  const rightMenuItems = [
    { id: "instagram", label: "Instagram", icon: Instagram, color: "text-pink-500", url: "https://instagram.com" },
    { id: "github", label: "Github", icon: Github, color: "text-gray-700", url: "https://github.com/heerr2005" },
    { id: "linkedin", label: "LinkedIn", icon: Linkedin, color: "text-blue-600", url: "https://www.linkedin.com/in/heerchotaliya" },
    { id: "cmd", label: "Command Prompt", icon: Terminal, color: "text-gray-800" },
    { id: "imageviewer", label: "Pictures", icon: Image, color: "text-green-600" },
    { id: "resume", label: "My Resume", icon: FileText, color: "text-red-500" },
  ];

  const handleItemClick = (item: typeof leftMenuItems[0] | typeof rightMenuItems[0]) => {
    if ('url' in item && item.url) {
      window.open(item.url, '_blank');
    } else if (item.id !== "recent") {
      onOpenWindow(item.id);
    }
    onClose();
  };

  if (isMobile) {
    return (
      <div className="absolute bottom-12 left-0 right-0 max-h-[70vh] bg-gradient-to-b from-xp-blue to-xp-blue-dark shadow-2xl overflow-hidden z-[100] animate-scale-in origin-bottom-left">
        {/* Header with user */}
        <div className="h-12 bg-gradient-to-r from-xp-blue-dark to-xp-blue px-3 flex items-center gap-3 border-b-2 border-xp-blue-light">
          <div className="w-8 h-8 rounded-sm overflow-hidden border-2 border-white/50 shadow-md">
            <img src={userAvatar} alt="Heer" className="w-full h-full object-cover" />
          </div>
          <span className="text-white font-bold text-sm drop-shadow-lg">Heer Chotaliya</span>
        </div>

        {/* Scrollable Content */}
        <div className="bg-white max-h-[50vh] overflow-y-auto">
          {/* Programs */}
          <div className="py-1">
            <div className="px-3 py-1 text-xs text-gray-500 font-semibold border-b border-gray-200">Programs</div>
            {leftMenuItems.map((item) => (
              <button
                key={item.id}
                className="w-full px-3 py-2.5 flex items-center gap-3 active:bg-xp-blue active:text-white transition-colors text-foreground"
                onClick={() => handleItemClick(item)}
              >
                <item.icon className={`w-6 h-6 ${item.color}`} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Social & Tools */}
          <div className="py-1 bg-card border-t border-gray-200">
            <div className="px-3 py-1 text-xs text-gray-500 font-semibold">Social & Tools</div>
            {rightMenuItems.map((item) => (
              <button
                key={item.id}
                className="w-full px-3 py-2.5 flex items-center gap-3 active:bg-xp-blue active:text-white transition-colors text-foreground"
                onClick={() => handleItemClick(item)}
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="h-12 bg-gradient-to-r from-xp-blue-dark to-xp-blue px-2 flex items-center justify-between border-t-2 border-xp-blue-light">
          <button 
            className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded transition-colors"
            onClick={onShutdown}
          >
            <LogOut className="w-4 h-4 text-white" />
            <span className="text-white text-xs font-medium">Log Off</span>
          </button>
          <button 
            className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded transition-colors"
            onClick={onShutdown}
          >
            <Power className="w-4 h-4 text-red-400" />
            <span className="text-white text-xs font-medium">Shut Down</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute bottom-10 left-0 w-[400px] bg-gradient-to-b from-xp-blue to-xp-blue-dark rounded-tr-lg shadow-2xl overflow-hidden z-[100] animate-scale-in origin-bottom-left">
      {/* Header with user */}
      <div className="h-14 bg-gradient-to-r from-xp-blue-dark to-xp-blue px-3 flex items-center gap-3 border-b-2 border-xp-blue-light">
        <div className="w-10 h-10 rounded-sm overflow-hidden border-2 border-white/50 shadow-md">
          <img src={userAvatar} alt="Heer" className="w-full h-full object-cover" />
        </div>
        <span className="text-white font-bold text-base drop-shadow-lg">Heer Chotaliya</span>
      </div>

      {/* Main Content */}
      <div className="flex bg-white">
        {/* Left Panel - Programs */}
        <div className="w-1/2 bg-white py-1">
          {leftMenuItems.map((item) => (
            <button
              key={item.id}
              className={`w-full px-3 py-2 flex items-center gap-3 hover:bg-xp-blue hover:text-white transition-colors group ${
                hoveredItem === item.id ? 'bg-xp-blue text-white' : 'text-foreground'
              }`}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleItemClick(item)}
            >
              <item.icon className={`w-8 h-8 ${hoveredItem === item.id ? 'text-white' : item.color}`} />
              <div className="text-left">
                <span className="text-sm font-semibold block">{item.label}</span>
                {item.subtitle && (
                  <span className={`text-xs ${hoveredItem === item.id ? 'text-white/80' : 'text-muted-foreground'}`}>
                    {item.subtitle}
                  </span>
                )}
              </div>
            </button>
          ))}
          
          {/* All Programs */}
          <div className="mt-2 pt-2 border-t border-gray-200">
            <button className="w-full px-3 py-2 flex items-center justify-between hover:bg-xp-blue hover:text-white transition-colors">
              <span className="text-sm font-semibold">All Programs</span>
              <ChevronRight className="w-4 h-4 text-xp-green" />
            </button>
          </div>
        </div>

        {/* Right Panel - Places */}
        <div className="w-1/2 bg-card py-1 border-l border-gray-300">
          {rightMenuItems.map((item) => (
            <button
              key={item.id}
              className={`w-full px-3 py-2 flex items-center gap-3 hover:bg-xp-blue hover:text-white transition-colors group ${
                hoveredItem === item.id ? 'bg-xp-blue text-white' : 'text-foreground'
              }`}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleItemClick(item)}
            >
              <item.icon className={`w-5 h-5 ${hoveredItem === item.id ? 'text-white' : item.color}`} />
              <span className="text-sm font-medium">{item.label}</span>
              {'hasSubmenu' in item && item.hasSubmenu && (
                <ChevronRight className="w-4 h-4 ml-auto" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="h-12 bg-gradient-to-r from-xp-blue-dark to-xp-blue px-3 flex items-center justify-end gap-2 border-t-2 border-xp-blue-light">
        <button 
          className="flex items-center gap-2 px-4 py-1.5 hover:bg-white/10 rounded transition-colors"
          onClick={onShutdown}
        >
          <LogOut className="w-4 h-4 text-white" />
          <span className="text-white text-sm font-medium">Log Off</span>
        </button>
        <button 
          className="flex items-center gap-2 px-4 py-1.5 hover:bg-white/10 rounded transition-colors"
          onClick={onShutdown}
        >
          <Power className="w-4 h-4 text-red-400" />
          <span className="text-white text-sm font-medium">Shut Down</span>
        </button>
      </div>
    </div>
  );
};