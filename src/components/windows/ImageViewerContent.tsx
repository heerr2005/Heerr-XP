import { useState } from "react";
import { ZoomIn, ZoomOut, RotateCw, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import blissWallpaper from "@/assets/bliss-wallpaper.jpg";
import userAvatar from "@/assets/user-avatar.png";

export const ImageViewerContent = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  const images = [
    { src: blissWallpaper, name: "Bliss.jpg", size: "1920x1200" },
    { src: userAvatar, name: "User Avatar.png", size: "512x512" },
  ];

  const handleZoomIn = () => setZoom(Math.min(zoom + 25, 300));
  const handleZoomOut = () => setZoom(Math.max(zoom - 25, 25));
  const handleRotate = () => setRotation((rotation + 90) % 360);
  const handlePrev = () => setCurrentImage((currentImage - 1 + images.length) % images.length);
  const handleNext = () => setCurrentImage((currentImage + 1) % images.length);

  return (
    <div className="bg-secondary flex flex-col h-full min-h-[350px]">
      {/* Toolbar */}
      <div className="bg-card border-b border-border p-2 flex items-center gap-2">
        <button
          onClick={handlePrev}
          className="p-2 hover:bg-muted rounded"
          title="Previous"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={handleNext}
          className="p-2 hover:bg-muted rounded"
          title="Next"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        
        <div className="w-px h-6 bg-border mx-2" />
        
        <button
          onClick={handleZoomOut}
          className="p-2 hover:bg-muted rounded"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="text-xs w-12 text-center">{zoom}%</span>
        <button
          onClick={handleZoomIn}
          className="p-2 hover:bg-muted rounded"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        
        <div className="w-px h-6 bg-border mx-2" />
        
        <button
          onClick={handleRotate}
          className="p-2 hover:bg-muted rounded"
          title="Rotate"
        >
          <RotateCw className="w-4 h-4" />
        </button>
        
        <button
          onClick={() => { setZoom(100); setRotation(0); }}
          className="p-2 hover:bg-muted rounded"
          title="Reset View"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Image Display */}
      <div className="flex-1 overflow-auto bg-[#404040] flex items-center justify-center p-4">
        <img
          src={images[currentImage].src}
          alt={images[currentImage].name}
          className="max-w-full transition-transform duration-200"
          style={{
            transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
          }}
        />
      </div>

      {/* Thumbnails */}
      <div className="bg-card border-t border-border p-2 flex gap-2 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-16 h-12 rounded overflow-hidden border-2 flex-shrink-0 ${
              currentImage === index ? "border-xp-blue" : "border-transparent hover:border-muted-foreground"
            }`}
          >
            <img src={image.src} alt={image.name} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Status Bar */}
      <div className="bg-card border-t border-border px-2 py-1 text-xs text-muted-foreground flex justify-between">
        <span>{images[currentImage].name}</span>
        <span>{images[currentImage].size} | {zoom}%</span>
      </div>
    </div>
  );
};
