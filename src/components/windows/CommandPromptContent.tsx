import { useState, useRef, useEffect } from "react";

export const CommandPromptContent = () => {
  const [history, setHistory] = useState<string[]>([
    "Microsoft Windows XP [Version 5.1.2600]",
    "(C) Copyright 1985-2001 Microsoft Corp.",
    "",
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const processCommand = (cmd: string): string[] => {
    const command = cmd.toLowerCase().trim();
    const args = cmd.trim().split(" ").slice(1);

    if (command === "" || command === "cls") {
      if (command === "cls") {
        setHistory([]);
        return [];
      }
      return [];
    }

    switch (command.split(" ")[0]) {
      case "help":
        return [
          "",
          "Available commands:",
          "  HELP     - Display this help message",
          "  CLS      - Clear the screen",
          "  DATE     - Display current date",
          "  TIME     - Display current time",
          "  ECHO     - Display messages",
          "  VER      - Display Windows version",
          "  DIR      - Display directory contents",
          "  CD       - Change directory",
          "  WHOAMI   - Display current user",
          "  COLOR    - Change console colors",
          "  ABOUT    - About this portfolio",
          "  SKILLS   - Show Heer's skills",
          "  CONTACT  - Show contact information",
          "",
        ];
      case "date":
        return ["", `The current date is: ${new Date().toLocaleDateString()}`, ""];
      case "time":
        return ["", `The current time is: ${new Date().toLocaleTimeString()}`, ""];
      case "echo":
        return ["", args.join(" ") || "", ""];
      case "ver":
        return ["", "Microsoft Windows XP [Version 5.1.2600]", ""];
      case "dir":
        return [
          "",
          " Volume in drive C has no label.",
          " Volume Serial Number is 1337-H33R",
          "",
          " Directory of C:\\Users\\Heer\\Portfolio",
          "",
          "12/01/2025  10:30 AM    <DIR>          .",
          "12/01/2025  10:30 AM    <DIR>          ..",
          "12/01/2025  10:30 AM    <DIR>          Projects",
          "12/01/2025  10:30 AM    <DIR>          Skills",
          "12/01/2025  10:30 AM             1,337 resume.pdf",
          "12/01/2025  10:30 AM               420 about.txt",
          "               2 File(s)          1,757 bytes",
          "               4 Dir(s)   42,069,420 bytes free",
          "",
        ];
      case "cd":
        return ["", `C:\\Users\\Heer\\${args[0] || "Portfolio"}>`, ""];
      case "whoami":
        return ["", "HEER-PC\\Heer Chotaliya - Data Analyst & Developer", ""];
      case "about":
        return [
          "",
          "╔════════════════════════════════════════════╗",
          "║           HEER CHOTALIYA                   ║",
          "║           Data Analyst                     ║",
          "╠════════════════════════════════════════════╣",
          "║  Passionate about transforming data into   ║",
          "║  actionable insights. Experienced in       ║",
          "║  Python, SQL, Power BI, and Machine        ║",
          "║  Learning.                                 ║",
          "╚════════════════════════════════════════════╝",
          "",
        ];
      case "skills":
        return [
          "",
          "Technical Skills:",
          "├── Languages: Python, SQL, R",
          "├── Visualization: Power BI, Tableau, Matplotlib",
          "├── ML/AI: Scikit-learn, TensorFlow",
          "├── Databases: MySQL, PostgreSQL, MongoDB",
          "├── Tools: Excel, Git, Jupyter",
          "└── Cloud: AWS, Azure",
          "",
        ];
      case "contact":
        return [
          "",
          "Contact Information:",
          "├── GitHub: github.com/heerr2005",
          "├── LinkedIn: linkedin.com/in/heerchotaliya",
          "└── Email: Available in Contact section",
          "",
        ];
      case "color":
        return ["", "Color changed! (visual effect only)", ""];
      default:
        return [
          "",
          `'${cmd.split(" ")[0]}' is not recognized as an internal or external command,`,
          "operable program or batch file.",
          "",
        ];
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const output = processCommand(input);
    setHistory([...history, `C:\\Users\\Heer>` + input, ...output]);
    setCommandHistory([...commandHistory, input]);
    setHistoryIndex(-1);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div
      className="bg-black text-[#c0c0c0] font-mono text-sm p-2 h-[350px] overflow-auto cursor-text"
      onClick={() => inputRef.current?.focus()}
      ref={containerRef}
    >
      {history.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap">{line}</div>
      ))}
      <form onSubmit={handleSubmit} className="flex">
        <span>C:\Users\Heer&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none ml-1 text-[#c0c0c0]"
          autoFocus
        />
      </form>
    </div>
  );
};
