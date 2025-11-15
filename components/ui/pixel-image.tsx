'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Grid = {
  rows: number;
  cols: number;
};

const DEFAULT_GRIDS: Record<string, Grid> = {
  '6x4': { rows: 4, cols: 6 },
  '8x8': { rows: 8, cols: 8 },
  '8x3': { rows: 3, cols: 8 },
  '4x6': { rows: 6, cols: 4 },
  '3x8': { rows: 8, cols: 3 },
};

type PredefinedGridKey = keyof typeof DEFAULT_GRIDS;

interface PixelImageProps {
  src: string;
  grid?: PredefinedGridKey;
  customGrid?: Grid;
  grayscaleAnimation?: boolean;
  pixelFadeInDuration?: number;
  maxAnimationDelay?: number;
  colorRevealDelay?: number;
}

export const PixelImage = ({
  src,
  grid = '6x4',
  grayscaleAnimation = true,
  pixelFadeInDuration = 1000,
  maxAnimationDelay = 1200,
  colorRevealDelay = 1300,
  customGrid,
}: PixelImageProps) => {
  const [startAnimation, setStartAnimation] = useState(false);
  const [showColor, setShowColor] = useState(false);

  const MIN_GRID = 1;
  const MAX_GRID = 16;

  const { rows, cols } = useMemo(() => {
    const isValidGrid = (grid?: Grid) => {
      if (!grid) return false;
      const { rows, cols } = grid;
      return (
        Number.isInteger(rows) &&
        Number.isInteger(cols) &&
        rows >= MIN_GRID &&
        cols >= MIN_GRID &&
        rows <= MAX_GRID &&
        cols <= MAX_GRID
      );
    };

    return isValidGrid(customGrid) ? customGrid! : DEFAULT_GRIDS[grid];
  }, [customGrid, grid]);

  // déclenchement progressif de la couleur après reveal
  useEffect(() => {
    if (!startAnimation) return;
    const timeout = setTimeout(() => setShowColor(true), colorRevealDelay);
    return () => clearTimeout(timeout);
  }, [startAnimation, colorRevealDelay]);

  const pieces = useMemo(() => {
    const total = rows * cols;
    return Array.from({ length: total }, (_, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;

      const clipPath = `polygon(
        ${col * (100 / cols)}% ${row * (100 / rows)}%,
        ${(col + 1) * (100 / cols)}% ${row * (100 / rows)}%,
        ${(col + 1) * (100 / cols)}% ${(row + 1) * (100 / rows)}%,
        ${col * (100 / cols)}% ${(row + 1) * (100 / rows)}%
      )`;

      const delay = Math.random() * maxAnimationDelay;
      return { clipPath, delay };
    });
  }, [rows, cols, maxAnimationDelay]);

  return (
    <motion.div
      onViewportEnter={() => setStartAnimation(true)}
      viewport={{ once: true, amount: 0.3 }}
      className="relative h-full w-full min-h-96  overflow-hidden bg-zinc-50"
    >
      {pieces.map((piece, index) => (
        <div
          key={index}
          className={cn(
            'absolute inset-0 transition-all ease-out',
            startAnimation ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            clipPath: piece.clipPath,
            transitionDelay: `${piece.delay}ms`,
            transitionDuration: `${pixelFadeInDuration}ms`,
          }}
        >
          <Image
            width={1000}
            height={1500}
            src={src}
            alt={`Pixel image piece pont du futur ${index + 1}`}
            className={cn(
              'w-full h-full object-cover will-change-transform',
              grayscaleAnimation && (showColor ? 'grayscale-0' : 'grayscale')
            )}
            style={{
              transform: 'scale(1.02)', // enlève totalement les micro-espaces
              transformOrigin: 'center',
              transition: grayscaleAnimation
                ? `filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
                : 'none',
            }}
            draggable={false}
          />
        </div>
      ))}
    </motion.div>
  );
};
