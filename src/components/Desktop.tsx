import { useState } from "react";
import blissWallpaper from "@/assets/bliss-wallpaper.jpg";
import { Taskbar } from "./Taskbar";
import { DesktopIcon } from "./DesktopIcon";
import { Window } from "./Window";
import { User, FileText, FolderOpen, Mail } from "lucide-react";
import { AboutMeContent } from "./windows/AboutMeContent";
import { ResumeContent } from "./windows/ResumeContent";
import { ProjectsContent } from "./windows/ProjectsContent";
import { ContactContent } from "./windows/ContactContent";

interface DesktopProps {
  onShutdown?: () => void;
}

export const Desktop = ({ onShutdown }: DesktopProps) => {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  const icons = [
    { id: "about", label: "About Me", icon: User, x: 20, y: 20 },
    { id: "resume", label: "My Resume", icon: FileText, x: 20, y: 120 },
    { id: "projects", label: "My Projects", icon: FolderOpen, x: 20, y: 220 },
    { id: "contact", label: "Contact Me", icon: Mail, x: 20, y: 320 },
  ];

  const handleIconDoubleClick = (iconId: string) => {
    if (!openWindows.includes(iconId)) {
      setOpenWindows([...openWindows, iconId]);
    }
    setActiveWindow(iconId);
  };

  const handleCloseWindow = (windowId: string) => {
    setOpenWindows(openWindows.filter(id => id !== windowId));
    if (activeWindow === windowId) {
      setActiveWindow(openWindows.filter(id => id !== windowId)[0] || null);
    }
  };

  const handleOpenWindow = (windowId: string) => {
    if (!openWindows.includes(windowId)) {
      setOpenWindows([...openWindows, windowId]);
    }
    setActiveWindow(windowId);
  };

  const getWindowContent = (windowId: string) => {
    switch (windowId) {
      case "about":
        return <AboutMeContent />;
      case "resume":
        return <ResumeContent />;
      case "projects":
        return <ProjectsContent />;
      case "contact":
        return <ContactContent />;
      default:
        return null;
    }
  };

  const getWindowSize = (windowId: string) => {
    switch (windowId) {
      case "about":
        return { width: 750, height: 500 };
      case "resume":
        return { width: 650, height: 550 };
      case "projects":
        return { width: 700, height: 550 };
      case "contact":
        return { width: 700, height: 550 };
      default:
        return { width: 600, height: 400 };
    }
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
          x={icon.x}
          y={icon.y}
          onDoubleClick={() => handleIconDoubleClick(icon.id)}
        />
      ))}

      {/* Windows */}
      {openWindows.map((windowId, index) => {
        const icon = icons.find(i => i.id === windowId);
        const size = getWindowSize(windowId);
        return (
          <Window
            key={windowId}
            title={icon?.label || "Window"}
            isActive={activeWindow === windowId}
            onClose={() => handleCloseWindow(windowId)}
            onFocus={() => setActiveWindow(windowId)}
            initialX={150 + index * 40}
            initialY={50 + index * 40}
            width={size.width}
            height={size.height}
          >
            {getWindowContent(windowId)}
          </Window>
        );
      })}

      {/* Taskbar */}
      <Taskbar 
        openWindows={openWindows.map(id => {
          const icon = icons.find(i => i.id === id);
          return { id, label: icon?.label || "Window" };
        })}
        onOpenWindow={handleOpenWindow}
        onShutdown={onShutdown}
        onWindowClick={(id) => setActiveWindow(id)}
      />
    </div>
  );
};
