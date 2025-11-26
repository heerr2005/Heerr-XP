import { useState } from "react";
import blissWallpaper from "@/assets/bliss-wallpaper.jpg";
import { Taskbar } from "./Taskbar";
import { DesktopIcon } from "./DesktopIcon";
import { Window } from "./Window";
import { User, FileText, FolderOpen, Mail } from "lucide-react";

export const Desktop = () => {
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

  const getWindowContent = (windowId: string) => {
    switch (windowId) {
      case "about":
        return (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">About Me</h2>
            <p className="text-muted-foreground">
              Welcome to my portfolio! I'm Heer, and this is my Windows XP-inspired portfolio experience.
            </p>
          </div>
        );
      case "resume":
        return (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">My Resume</h2>
            <p className="text-muted-foreground">
              Professional experience and skills will be displayed here.
            </p>
          </div>
        );
      case "projects":
        return (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">My Projects</h2>
            <p className="text-muted-foreground">
              Showcase of my work and projects.
            </p>
          </div>
        );
      case "contact":
        return (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Contact Me</h2>
            <p className="text-muted-foreground">
              Get in touch with me through various channels.
            </p>
          </div>
        );
      default:
        return null;
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
        return (
          <Window
            key={windowId}
            title={icon?.label || "Window"}
            isActive={activeWindow === windowId}
            onClose={() => handleCloseWindow(windowId)}
            onFocus={() => setActiveWindow(windowId)}
            initialX={200 + index * 40}
            initialY={100 + index * 40}
          >
            {getWindowContent(windowId)}
          </Window>
        );
      })}

      {/* Taskbar */}
      <Taskbar openWindows={openWindows.map(id => {
        const icon = icons.find(i => i.id === id);
        return { id, label: icon?.label || "Window" };
      })} />
    </div>
  );
};
