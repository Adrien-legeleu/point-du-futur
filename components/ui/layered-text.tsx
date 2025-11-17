'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import type React from 'react';

interface LayeredTextProps {
  fontSize?: string; // taille pour lg (ex: '72px')
  fontSizeMd?: string; // taille pour md (ex: '48px')
  lineHeight?: number; // hauteur de ligne pour lg (ex: 60)
  lineHeightMd?: number; // hauteur de ligne pour md (ex: 40)
  className?: string;
  lines: {
    top: string;
    bottom: string;
  }[];
}

// 🔎 Breakpoints Tailwind-like : sm < 640, md < 1024, sinon lg
function useBreakpoint() {
  const [bp, setBp] = useState<'sm' | 'md' | 'lg'>('lg');

  useEffect(() => {
    const check = () => {
      if (typeof window === 'undefined') return;
      const w = window.innerWidth;
      if (w < 640) setBp('sm');
      else if (w < 1024) setBp('md');
      else setBp('lg');
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return bp;
}

export function LayeredText({
  fontSize = '72px',
  fontSizeMd = '48px',
  lineHeight = 60,
  lineHeightMd = 42,
  className = '',
  lines,
}: LayeredTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const breakpoint = useBreakpoint();

  const parsePx = (value: string) =>
    Number.parseFloat(value.toString().replace('px', '') || '0');

  // 📏 Calcul des valeurs actuelles selon le breakpoint
  const getCurrentMetrics = () => {
    const fontLg = parsePx(fontSize);
    const fontMd = parsePx(fontSizeMd);

    if (breakpoint === 'lg') {
      return {
        fontSizePx: fontLg,
        lineHeightPx: lineHeight,
        hoverYOffset: -lineHeight,
      };
    }

    if (breakpoint === 'md') {
      return {
        fontSizePx: fontMd,
        lineHeightPx: lineHeightMd,
        hoverYOffset: -lineHeightMd * 0.9,
      };
    }

    // sm : un cran en dessous encore, proportionnel
    const fontSm = fontMd * 0.85;
    const lineSm = lineHeightMd * 0.85;

    return {
      fontSizePx: fontSm,
      lineHeightPx: lineSm,
      hoverYOffset: -lineSm * 0.8,
    };
  };

  const { fontSizePx, lineHeightPx, hoverYOffset } = getCurrentMetrics();

  const calculateTranslateX = (index: number) => {
    const baseOffsetLg = 35;
    const baseOffsetMd = 26;
    const baseOffsetSm = 18;

    const centerIndex = Math.floor(lines.length / 2);

    const baseOffset =
      breakpoint === 'lg'
        ? baseOffsetLg
        : breakpoint === 'md'
        ? baseOffsetMd
        : baseOffsetSm;

    return (index - centerIndex) * baseOffset;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const paragraphs = container.querySelectorAll('p');

    // on kill l'ancienne timeline si le breakpoint change
    timelineRef.current?.kill();

    const tl = gsap.timeline({ paused: true });

    tl.to(paragraphs, {
      y: hoverYOffset,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.08,
    });

    timelineRef.current = tl;

    const handleEnter = () => tl.play();
    const handleLeave = () => tl.reverse();

    container.addEventListener('mouseenter', handleEnter);
    container.addEventListener('mouseleave', handleLeave);

    return () => {
      container.removeEventListener('mouseenter', handleEnter);
      container.removeEventListener('mouseleave', handleLeave);
      tl.kill();
    };
  }, [hoverYOffset, breakpoint]);

  return (
    <div
      ref={containerRef}
      className={`mx-auto pb-10 font-sans font-black tracking-[-2px] uppercase antialiased cursor-pointer ${className}`}
      style={{ fontSize: `${fontSizePx}px` } as React.CSSProperties}
    >
      <ul className="list-none p-0 m-0 flex flex-col items-center text-primary-600/80">
        {lines.map((line, index) => {
          const translateX = calculateTranslateX(index);

          return (
            <li
              key={index}
              className={`
                overflow-hidden relative
                ${
                  index % 2 === 0
                    ? '[transform:skew(60deg,-30deg)_scaleY(0.66667)]'
                    : '[transform:skew(0deg,-30deg)_scaleY(1.33333)]'
                }
              `}
              style={{
                height: `${lineHeightPx}px`,
                transform: `translateX(${translateX}px) skew(${
                  index % 2 === 0 ? '60deg, -30deg' : '0deg, -30deg'
                }) scaleY(${index % 2 === 0 ? '0.66667' : '1.33333'})`,
              }}
            >
              <p
                style={{
                  height: `${lineHeightPx}px`,
                  lineHeight: `${lineHeightPx - 5}px`,
                }}
              >
                {line.top}
              </p>
              <p
                style={{
                  height: `${lineHeightPx}px`,
                  lineHeight: `${lineHeightPx - 5}px`,
                }}
              >
                {line.bottom}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
