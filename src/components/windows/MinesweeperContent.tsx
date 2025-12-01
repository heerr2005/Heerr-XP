import { useState, useEffect, useCallback } from "react";
import { Flag, Bomb, Smile, Frown, Trophy } from "lucide-react";

type CellState = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
};

export const MinesweeperContent = () => {
  const ROWS = 9;
  const COLS = 9;
  const MINES = 10;

  const [board, setBoard] = useState<CellState[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [flagCount, setFlagCount] = useState(MINES);
  const [time, setTime] = useState(0);
  const [started, setStarted] = useState(false);

  const initBoard = useCallback(() => {
    const newBoard: CellState[][] = Array(ROWS).fill(null).map(() =>
      Array(COLS).fill(null).map(() => ({
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        neighborMines: 0,
      }))
    );

    // Place mines
    let minesPlaced = 0;
    while (minesPlaced < MINES) {
      const row = Math.floor(Math.random() * ROWS);
      const col = Math.floor(Math.random() * COLS);
      if (!newBoard[row][col].isMine) {
        newBoard[row][col].isMine = true;
        minesPlaced++;
      }
    }

    // Calculate neighbor mines
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (!newBoard[r][c].isMine) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr;
              const nc = c + dc;
              if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && newBoard[nr][nc].isMine) {
                count++;
              }
            }
          }
          newBoard[r][c].neighborMines = count;
        }
      }
    }

    setBoard(newBoard);
    setGameOver(false);
    setWon(false);
    setFlagCount(MINES);
    setTime(0);
    setStarted(false);
  }, []);

  useEffect(() => {
    initBoard();
  }, [initBoard]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (started && !gameOver && !won) {
      interval = setInterval(() => setTime(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [started, gameOver, won]);

  const revealCell = (row: number, col: number) => {
    if (gameOver || won || board[row][col].isFlagged || board[row][col].isRevealed) return;
    
    if (!started) setStarted(true);

    const newBoard = board.map(r => r.map(c => ({ ...c })));

    if (newBoard[row][col].isMine) {
      // Game over - reveal all mines
      newBoard.forEach(r => r.forEach(c => {
        if (c.isMine) c.isRevealed = true;
      }));
      setBoard(newBoard);
      setGameOver(true);
      return;
    }

    // Flood fill reveal
    const reveal = (r: number, c: number) => {
      if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
      if (newBoard[r][c].isRevealed || newBoard[r][c].isFlagged || newBoard[r][c].isMine) return;
      
      newBoard[r][c].isRevealed = true;
      
      if (newBoard[r][c].neighborMines === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            reveal(r + dr, c + dc);
          }
        }
      }
    };

    reveal(row, col);
    setBoard(newBoard);

    // Check win
    const unrevealed = newBoard.flat().filter(c => !c.isRevealed && !c.isMine).length;
    if (unrevealed === 0) {
      setWon(true);
    }
  };

  const toggleFlag = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    if (gameOver || won || board[row][col].isRevealed) return;
    
    if (!started) setStarted(true);

    const newBoard = board.map(r => r.map(c => ({ ...c })));
    newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
    setBoard(newBoard);
    setFlagCount(flagCount + (newBoard[row][col].isFlagged ? -1 : 1));
  };

  const getCellColor = (count: number) => {
    const colors = ["", "text-blue-600", "text-green-600", "text-red-600", "text-purple-800", "text-red-800", "text-cyan-600", "text-black", "text-gray-600"];
    return colors[count] || "";
  };

  return (
    <div className="bg-[#c0c0c0] p-2 select-none">
      {/* Header */}
      <div className="bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] p-2 mb-2 flex justify-between items-center">
        <div className="bg-black text-red-500 font-mono text-xl px-2 py-1 min-w-[50px] text-center">
          {flagCount.toString().padStart(3, '0')}
        </div>
        
        <button
          onClick={initBoard}
          className="w-8 h-8 bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] flex items-center justify-center hover:bg-[#d0d0d0] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white"
        >
          {gameOver ? <Frown className="w-5 h-5 text-yellow-500" /> : won ? <Trophy className="w-5 h-5 text-yellow-500" /> : <Smile className="w-5 h-5 text-yellow-500" />}
        </button>
        
        <div className="bg-black text-red-500 font-mono text-xl px-2 py-1 min-w-[50px] text-center">
          {time.toString().padStart(3, '0')}
        </div>
      </div>

      {/* Board */}
      <div className="bg-[#c0c0c0] border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white p-1 inline-block">
        {board.map((row, r) => (
          <div key={r} className="flex">
            {row.map((cell, c) => (
              <button
                key={`${r}-${c}`}
                onClick={() => revealCell(r, c)}
                onContextMenu={(e) => toggleFlag(e, r, c)}
                disabled={gameOver || won}
                className={`w-6 h-6 text-xs font-bold flex items-center justify-center ${
                  cell.isRevealed
                    ? "bg-[#c0c0c0] border border-[#808080]"
                    : "bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] hover:bg-[#d4d4d4]"
                } ${getCellColor(cell.neighborMines)}`}
              >
                {cell.isRevealed ? (
                  cell.isMine ? (
                    <Bomb className="w-4 h-4 text-black" />
                  ) : cell.neighborMines > 0 ? (
                    cell.neighborMines
                  ) : null
                ) : cell.isFlagged ? (
                  <Flag className="w-3 h-3 text-red-600" />
                ) : null}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Status */}
      <div className="mt-2 text-center text-sm">
        {gameOver && <span className="text-red-600 font-bold">Game Over! Click 😊 to restart</span>}
        {won && <span className="text-green-600 font-bold">You Won! 🎉</span>}
        {!gameOver && !won && <span className="text-gray-600">Left click to reveal, Right click to flag</span>}
      </div>
    </div>
  );
};
