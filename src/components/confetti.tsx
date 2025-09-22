'use client'

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  delay: number;
}

interface ConfettiProps {
  trigger: boolean;
  onComplete?: () => void;
}

const colors = [
  "#AA87FA", // vangardPurple
  "#1E468C", // deepBlue
  "#BED7F5", // lightBlue
];

export const Confetti = ({ trigger, onComplete }: ConfettiProps) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (trigger && !isActive) {
      setIsActive(true);
      
      // Generate confetti pieces
      const newPieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        delay: Math.random() * 0.5,
      }));

      setPieces(newPieces);

      // Clean up after animation
      const timer = setTimeout(() => {
        setIsActive(false);
        setPieces([]);
        onComplete?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [trigger, isActive, onComplete]);

  if (!isActive || pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute rounded-sm"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            backgroundColor: piece.color,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
          }}
          initial={{ 
            y: -10, 
            opacity: 0,
            rotate: 0,
            scale: 0
          }}
          animate={{ 
            y: window.innerHeight + 100,
            opacity: [0, 1, 1, 0],
            rotate: piece.rotation + 720,
            scale: [0, 1, 1, 0],
            x: [0, Math.random() * 100 - 50]
          }}
          transition={{
            duration: 3,
            delay: piece.delay,
            ease: "easeOut",
            opacity: {
              times: [0, 0.1, 0.9, 1],
              duration: 3,
            },
            scale: {
              times: [0, 0.1, 0.9, 1],
              duration: 3,
            }
          }}
        />
      ))}
    </div>
  );
};
