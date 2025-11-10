
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Animal, Language, PuzzlePiece } from '../types';
import CompletionModal from './CompletionModal';

interface GameScreenProps {
  animal: Animal;
  difficulty: 2 | 3 | 4;
  onBack: () => void;
  onMenu: () => void;
  t: { [key: string]: string };
}

const PuzzlePieceComponent: React.FC<{
  piece: PuzzlePiece;
  animalImage: string;
  size: number;
  gridSize: number;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, pieceId: number) => void;
}> = ({ piece, animalImage, size, gridSize, onDragStart }) => {
  const row = Math.floor(piece.correctIndex / gridSize);
  const col = piece.correctIndex % gridSize;
  
  const bgPosX = -col * size;
  const bgPosY = -row * size;

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, piece.id)}
      className="cursor-grab active:cursor-grabbing rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundImage: `url(${animalImage})`,
        backgroundSize: `${size * gridSize}px ${size * gridSize}px`,
        backgroundPosition: `${bgPosX}px ${bgPosY}px`,
      }}
    />
  );
};

const GameScreen: React.FC<GameScreenProps> = ({ animal, difficulty, onBack, onMenu, t }) => {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [placedPieces, setPlacedPieces] = useState<(PuzzlePiece | null)[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  
  const gridSize = difficulty;
  const numPieces = gridSize * gridSize;
  const boardSize = 500;
  const pieceSize = boardSize / gridSize;

  const shuffle = useCallback(<T,>(array: T[]): T[] => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }, []);

  useEffect(() => {
    const initialPieces = Array.from({ length: numPieces }, (_, i) => ({
      id: i,
      correctIndex: i,
      shuffledIndex: 0,
      isPlaced: false,
    }));
    
    const shuffled = shuffle([...initialPieces]);
    
    shuffled.forEach((p, i) => p.shuffledIndex = i);

    setPieces(shuffled);
    setPlacedPieces(Array(numPieces).fill(null));
    setIsComplete(false);
  }, [animal, difficulty, numPieces, shuffle]);
  
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, pieceId: number) => {
    e.dataTransfer.setData('pieceId', String(pieceId));
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, slotIndex: number) => {
    e.preventDefault();
    const pieceId = Number(e.dataTransfer.getData('pieceId'));
    const piece = pieces.find(p => p.id === pieceId);
    
    if (piece && piece.correctIndex === slotIndex && !placedPieces[slotIndex]) {
      const newPieces = pieces.map(p => p.id === pieceId ? { ...p, isPlaced: true } : p);
      setPieces(newPieces);
      
      const newPlacedPieces = [...placedPieces];
      newPlacedPieces[slotIndex] = piece;
      setPlacedPieces(newPlacedPieces);
    } else {
        // Add a little shake animation for wrong placement
        e.currentTarget.classList.add('animate-shake');
        setTimeout(() => e.currentTarget.classList.remove('animate-shake'), 500);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    const unplaced = pieces.filter(p => !p.isPlaced);
    if (pieces.length > 0 && unplaced.length === 0) {
      setTimeout(() => setIsComplete(true), 500); // short delay for visual satisfaction
    }
  }, [pieces]);
  
  const unplacedPieces = useMemo(() => pieces.filter(p => !p.isPlaced), [pieces]);
  const lang = Object.keys(t).includes('play') && t.play === 'Play' ? Language.EN : Language.ES;

  return (
    <div className="flex flex-col items-center p-4 animate-fade-in">
        {isComplete && (
            <CompletionModal 
                animal={animal} 
                t={t} 
                onMenu={onMenu} 
                onPlayAgain={onBack} 
                lang={lang}
            />
        )}
      <div className="w-full flex justify-between items-center mb-4">
        <button onClick={onBack} className="bg-orange-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-orange-600">
          ← {t.selectAPuzzle}
        </button>
        <h1 className="text-4xl font-bold text-green-700">
          {animal.name[lang]}
        </h1>
        <div className="w-36"></div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div 
          className="grid gap-1 bg-green-200 p-2 rounded-xl shadow-inner" 
          style={{ 
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`, 
            width: boardSize, 
            height: boardSize 
          }}
        >
          {Array.from({ length: numPieces }).map((_, i) => (
            <div
              key={i}
              onDrop={(e) => handleDrop(e, i)}
              onDragOver={handleDragOver}
              className="bg-white/50 rounded-md flex items-center justify-center relative overflow-hidden"
              style={{
                 width: pieceSize,
                 height: pieceSize,
              }}
            >
              {placedPieces[i] && (
                 <PuzzlePieceComponent 
                    piece={placedPieces[i]!}
                    animalImage={animal.image}
                    size={pieceSize}
                    gridSize={gridSize}
                    onDragStart={()=>{}} // Placed pieces are not draggable
                 />
              )}
            </div>
          ))}
        </div>
        <div className="bg-yellow-100 p-4 rounded-xl shadow-lg w-full md:w-64">
            <h2 className="text-2xl font-bold text-yellow-800 mb-4 text-center">Piezas</h2>
            <div className="grid grid-cols-4 md:grid-cols-2 gap-2">
                {unplacedPieces.map(piece => (
                <PuzzlePieceComponent 
                    key={piece.id}
                    piece={piece}
                    animalImage={animal.image}
                    size={pieceSize}
                    gridSize={gridSize}
                    onDragStart={handleDragStart}
                />
                ))}
            </div>
        </div>
      </div>
      <style>{`
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  );
};

export default GameScreen;
