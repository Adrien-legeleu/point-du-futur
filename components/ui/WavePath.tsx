'use client';
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

type WWavePathProps = React.ComponentProps<'div'>;

export function WavePath({ className, ...props }: WWavePathProps) {
  const path = useRef<SVGPathElement>(null);
  let progress = 0;
  let x = 0.2;
  let time = Math.PI / 2;
  let reqId: number | null = null;

  useEffect(() => {
    setPath(progress);
    // cleanup raf on unmount
    return () => {
      if (reqId) cancelAnimationFrame(reqId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setPath = (p: number) => {
    const width = Math.min(window.innerWidth * 0.9, 1100); // stable width
    if (path.current) {
      path.current.setAttributeNS(
        null,
        'd',
        `M0 100 Q${width * x} ${100 + p * 0.6}, ${width} 100`
      );
    }
  };

  const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;

  const manageMouseEnter = () => {
    if (reqId) {
      cancelAnimationFrame(reqId);
      resetAnimation();
    }
  };

  const manageMouseMove = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLDivElement;
    const rect = target.getBoundingClientRect();
    const eventOffsetX = e.clientX - rect.left;
    x = Math.max(0.02, Math.min(0.98, eventOffsetX / rect.width));
    progress += e.movementY;
    setPath(progress);
  };

  const manageMouseLeave = () => {
    animateOut();
  };

  const animateOut = () => {
    const newProgress = progress * Math.sin(time);
    progress = lerp(progress, 0, 0.025);
    time += 0.2;
    setPath(newProgress);
    if (Math.abs(progress) > 0.75) {
      reqId = requestAnimationFrame(animateOut);
    } else {
      resetAnimation();
    }
  };

  const resetAnimation = () => {
    time = Math.PI / 2;
    progress = 0;
  };

  return (
    <div
      className={cn('relative h-px w-full max-w-[1100px]', className)}
      {...props}
    >
      <div
        onMouseEnter={manageMouseEnter}
        onMouseMove={manageMouseMove}
        onMouseLeave={manageMouseLeave}
        className="relative -top-5 z-10 h-10 w-full hover:-top-[150px] hover:h-[300px]"
        aria-hidden
      />
      <svg className="absolute -top-[100px] h-[300px] w-full">
        <path
          ref={path}
          className="fill-none stroke-primary-300"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
