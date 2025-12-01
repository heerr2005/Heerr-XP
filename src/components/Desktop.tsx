import { useState } from "react";
import blissWallpaper from "@/assets/bliss-wallpaper.jpg";
import { Taskbar } from "./Taskbar";
import { DesktopIcon } from "./DesktopIcon";
import { Window } from "./Window";
import { 
  User, FileText, FolderOpen, Mail, Play, Paintbrush, 
  Music, Image, Terminal, Gamepad2, Globe, Trash2, HardDrive
} from "lucide-react";
import { AboutMeContent } from "./windows/AboutMeContent";
import { ResumeContent } from "./windows/ResumeContent";
import { ProjectsContent } from "./windows/ProjectsContent";
import { ContactContent } from "./windows/ContactContent";
import { MediaPlayerContent } from "./windows/MediaPlayerContent";
import { PaintContent } from "./windows/PaintContent";
import { MusicPlayerContent } from "./windows/MusicPlayerContent";
import { ImageViewerContent } from "./windows/ImageViewerContent";
import { CommandPromptContent } from "./windows/CommandPromptContent";
import { MinesweeperContent } from "./windows/MinesweeperContent";

interface DesktopProps {
  onShutdown?: () => void;
}

interface WindowState {
  id: string;
  isMinimized: boolean;
}

export const Desktop = ({ onShutdown }: DesktopProps) => {
  const [openWindows, setOpenWindows] = useState<WindowState[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  const icons = [
    { id: "about", label: "About Me", icon: User, iconColor: "text-orange-400", x: 20, y: 20 },
    { id: "resume", label: "My Resume", icon: FileText, iconColor: "text-red-400", x: 20, y: 110 },
    { id: "projects", label: "My Projects", icon: FolderOpen, iconColor: "text-yellow-400", x: 20, y: 200 },
    { id: "contact", label: "Contact Me", icon: Mail, iconColor: "text-yellow-300", x: 20, y: 290 },
    { id: "media", label: "Media Player", icon: Play, iconColor: "text-blue-400", x: 20, y: 380 },
    { id: "paint", label: "Paint", icon: Paintbrush, iconColor: "text-purple-400", x: 110, y: 20 },
    { id: "music", label: "Music", icon: Music, iconColor: "text-green-400", x: 110, y: 110 },
    { id: "imageviewer", label: "Pictures", icon: Image, iconColor: "text-green-300", x: 110, y: 200 },
    { id: "cmd", label: "CMD", icon: Terminal, iconColor: "text-gray-300", x: 110, y: 290 },
    { id: "minesweeper", label: "Minesweeper", icon: Gamepad2, iconColor: "text-red-500", x: 110, y: 380 },
    { id: "internet", label: "Internet", icon: Globe, iconColor: "text-blue-500", x: 200, y: 20, url: "https://heer-chotaliya.vercel.app/" },
    { id: "mycomputer", label: "My Computer", icon: HardDrive, iconColor: "text-gray-400", x: 200, y: 110 },
    { id: "recyclebin", label: "Recycle Bin", icon: Trash2, iconColor: "text-gray-400", x: 200, y: 200 },
  ];

  const handleIconDoubleClick = (iconId: string) => {
    const icon = icons.find(i => i.id === iconId);
    if (icon && 'url' in icon && icon.url) {
      window.open(icon.url, '_blank');
      return;
    }
    
    const existing = openWindows.find(w => w.id === iconId);
    if (existing) {
      if (existing.isMinimized) {
        setOpenWindows(openWindows.map(w => 
          w.id === iconId ? { ...w, isMinimized: false } : w
        ));
      }
      setActiveWindow(iconId);
    } else {
      setOpenWindows([...openWindows, { id: iconId, isMinimized: false }]);
      setActiveWindow(iconId);
    }
  };

  const handleCloseWindow = (windowId: string) => {
    setOpenWindows(openWindows.filter(w => w.id !== windowId));
    if (activeWindow === windowId) {
      const remaining = openWindows.filter(w => w.id !== windowId);
      setActiveWindow(remaining.length > 0 ? remaining[remaining.length - 1].id : null);
    }
  };

  const handleMinimizeWindow = (windowId: string) => {
    setOpenWindows(openWindows.map(w => 
      w.id === windowId ? { ...w, isMinimized: true } : w
    ));
    const nonMinimized = openWindows.filter(w => w.id !== windowId && !w.isMinimized);
    setActiveWindow(nonMinimized.length > 0 ? nonMinimized[nonMinimized.length - 1].id : null);
  };

  const handleOpenWindow = (windowId: string) => {
    const existing = openWindows.find(w => w.id === windowId);
    if (existing) {
      if (existing.isMinimized) {
        setOpenWindows(openWindows.map(w => 
          w.id === windowId ? { ...w, isMinimized: false } : w
        ));
      }
      setActiveWindow(windowId);
    } else {
      setOpenWindows([...openWindows, { id: windowId, isMinimized: false }]);
      setActiveWindow(windowId);
    }
  };

  const handleWindowClick = (windowId: string) => {
    const window = openWindows.find(w => w.id === windowId);
    if (window?.isMinimized) {
      setOpenWindows(openWindows.map(w => 
        w.id === windowId ? { ...w, isMinimized: false } : w
      ));
    }
    setActiveWindow(windowId);
  };

  const getWindowContent = (windowId: string) => {
    switch (windowId) {
      case "about": return <AboutMeContent />;
      case "resume": return <ResumeContent />;
      case "projects": return <ProjectsContent />;
      case "contact": return <ContactContent />;
      case "media": return <MediaPlayerContent />;
      case "paint": return <PaintContent />;
      case "music": return <MusicPlayerContent />;
      case "imageviewer": return <ImageViewerContent />;
      case "cmd": return <CommandPromptContent />;
      case "minesweeper": return <MinesweeperContent />;
      case "mycomputer": 
        return (
          <div className="p-4 bg-card">
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col items-center p-4 hover:bg-muted rounded cursor-pointer">
                <HardDrive className="w-12 h-12 text-gray-500" />
                <span className="text-sm mt-2">Local Disk (C:)</span>
                <div className="w-32 h-2 bg-gray-200 rounded mt-1">
                  <div className="w-3/4 h-full bg-xp-blue rounded" />
                </div>
                <span className="text-xs text-muted-foreground">42.0 GB free of 100 GB</span>
              </div>
              <div className="flex flex-col items-center p-4 hover:bg-muted rounded cursor-pointer">
                <FolderOpen className="w-12 h-12 text-yellow-500" />
                <span className="text-sm mt-2">Documents</span>
              </div>
            </div>
          </div>
        );
      case "recyclebin":
        return (
          <div className="p-8 text-center bg-card">
            <Trash2 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-muted-foreground">Recycle Bin is empty</p>
          </div>
        );
      default: return null;
    }
  };

  const getWindowTitle = (windowId: string) => {
    const titles: Record<string, string> = {
      about: "About Me - Heer Chotaliya",
      resume: "My Resume",
      projects: "My Projects",
      contact: "Contact Me",
      media: "Windows Media Player",
      paint: "Paint",
      music: "Music Player",
      imageviewer: "Windows Picture Viewer",
      cmd: "Command Prompt",
      minesweeper: "Minesweeper",
      mycomputer: "My Computer",
      recyclebin: "Recycle Bin",
    };
    return titles[windowId] || "Window";
  };

  const getWindowSize = (windowId: string) => {
    const sizes: Record<string, { width: number; height: number }> = {
      about: { width: 750, height: 500 },
      resume: { width: 650, height: 550 },
      projects: { width: 700, height: 550 },
      contact: { width: 700, height: 550 },
      media: { width: 500, height: 450 },
      paint: { width: 620, height: 520 },
      music: { width: 750, height: 500 },
      imageviewer: { width: 650, height: 500 },
      cmd: { width: 680, height: 450 },
      minesweeper: { width: 280, height: 380 },
      mycomputer: { width: 600, height: 400 },
      recyclebin: { width: 400, height: 300 },
    };
    return sizes[windowId] || { width: 600, height: 400 };
  };

  return (
    <div 
      className="fixed inset-0 animate-xp-fade-in"
      style={{
        backgroundImage: `url(${blissWallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Desktop Icons */}
      {icons.map((icon) => (
        <DesktopIcon
          key={icon.id}
          label={icon.label}
          icon={icon.icon}
          iconColor={icon.iconColor}
          x={icon.x}
          y={icon.y}
          onDoubleClick={() => handleIconDoubleClick(icon.id)}
        />
      ))}

      {/* Windows */}
      {openWindows.map((windowState, index) => {
        const size = getWindowSize(windowState.id);
        return (
          <Window
            key={windowState.id}
            title={getWindowTitle(windowState.id)}
            isActive={activeWindow === windowState.id}
            isMinimized={windowState.isMinimized}
            onClose={() => handleCloseWindow(windowState.id)}
            onFocus={() => setActiveWindow(windowState.id)}
            onMinimize={() => handleMinimizeWindow(windowState.id)}
            initialX={150 + index * 30}
            initialY={50 + index * 30}
            width={size.width}
            height={size.height}
          >
            {getWindowContent(windowState.id)}
          </Window>
        );
      })}

      {/* Taskbar */}
      <Taskbar 
        openWindows={openWindows.map(w => ({
          id: w.id, 
          label: getWindowTitle(w.id),
          isMinimized: w.isMinimized
        }))}
        activeWindow={activeWindow}
        onOpenWindow={handleOpenWindow}
        onShutdown={onShutdown}
        onWindowClick={handleWindowClick}
      />
    </div>
  );
};
