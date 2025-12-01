import { useState, useRef, useEffect } from "react";
import { Pencil, Eraser, Square, Circle, Trash2, Download } from "lucide-react";

type Tool = "pencil" | "eraser" | "rectangle" | "circle";

export const PaintContent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<Tool>("pencil");
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(3);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const colors = [
    "#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF", 
    "#FFFF00", "#FF00FF", "#00FFFF", "#808080", "#800000",
    "#008000", "#000080", "#808000", "#800080", "#008080",
    "#C0C0C0", "#FF8000", "#8000FF", "#0080FF", "#FF0080"
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  const getPos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getPos(e);
    setIsDrawing(true);
    setLastPos(pos);
    setStartPos(pos);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    const pos = getPos(e);

    if (tool === "pencil" || tool === "eraser") {
      ctx.beginPath();
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = tool === "eraser" ? "#FFFFFF" : color;
      ctx.lineWidth = tool === "eraser" ? brushSize * 3 : brushSize;
      ctx.lineCap = "round";
      ctx.stroke();
      setLastPos(pos);
    }
  };

  const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    const pos = getPos(e);

    if (tool === "rectangle") {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.strokeRect(startPos.x, startPos.y, pos.x - startPos.x, pos.y - startPos.y);
    } else if (tool === "circle") {
      const radius = Math.sqrt(Math.pow(pos.x - startPos.x, 2) + Math.pow(pos.y - startPos.y, 2));
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.arc(startPos.x, startPos.y, radius, 0, Math.PI * 2);
      ctx.stroke();
    }

    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx && canvas) {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement("a");
      link.download = "paint-drawing.png";
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="bg-secondary flex flex-col h-full">
      {/* Toolbar */}
      <div className="bg-card border-b border-border p-2 flex items-center gap-2 flex-wrap">
        <div className="flex gap-1 border-r border-border pr-2">
          <button
            onClick={() => setTool("pencil")}
            className={`p-2 rounded ${tool === "pencil" ? "bg-xp-blue text-white" : "hover:bg-muted"}`}
            title="Pencil"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTool("eraser")}
            className={`p-2 rounded ${tool === "eraser" ? "bg-xp-blue text-white" : "hover:bg-muted"}`}
            title="Eraser"
          >
            <Eraser className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTool("rectangle")}
            className={`p-2 rounded ${tool === "rectangle" ? "bg-xp-blue text-white" : "hover:bg-muted"}`}
            title="Rectangle"
          >
            <Square className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTool("circle")}
            className={`p-2 rounded ${tool === "circle" ? "bg-xp-blue text-white" : "hover:bg-muted"}`}
            title="Circle"
          >
            <Circle className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-1 border-r border-border pr-2">
          <button onClick={clearCanvas} className="p-2 hover:bg-muted rounded" title="Clear">
            <Trash2 className="w-4 h-4" />
          </button>
          <button onClick={downloadCanvas} className="p-2 hover:bg-muted rounded" title="Save">
            <Download className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 border-r border-border pr-2">
          <span className="text-xs">Size:</span>
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="w-16"
          />
        </div>
      </div>

      {/* Color Palette */}
      <div className="bg-card border-b border-border p-2 flex items-center gap-1">
        <div
          className="w-8 h-8 border-2 border-border rounded mr-2"
          style={{ backgroundColor: color }}
        />
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className={`w-5 h-5 border ${color === c ? "border-foreground" : "border-border"}`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>

      {/* Canvas */}
      <div className="flex-1 overflow-auto p-2 bg-muted">
        <canvas
          ref={canvasRef}
          width={550}
          height={350}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="bg-white border border-border cursor-crosshair"
        />
      </div>

      {/* Status Bar */}
      <div className="bg-card border-t border-border px-2 py-1 text-xs text-muted-foreground">
        Tool: {tool.charAt(0).toUpperCase() + tool.slice(1)} | Brush: {brushSize}px
      </div>
    </div>
  );
};
