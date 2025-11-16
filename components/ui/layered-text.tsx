'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type React from 'react';

interface LayeredTextProps {
  fontSize?: string;
  fontSizeMd?: string;
  lineHeight?: number;
  lineHeightMd?: number;
  className?: string;
}

export function LayeredText({
  fontSize = '72px',
  fontSizeMd = '36px',
  lineHeight = 60,
  lineHeightMd = 35,
  className = '',
}: LayeredTextProps) {
  // Nouveau titre Pont du Futur
  const lines = [
    { top: '\u00A0', bottom: 'Toute' },
    { top: 'Toute', bottom: "l'actualité" },
    { top: "l'actualité", bottom: 'de' },
    { top: 'de', bottom: 'Pont' },
    { top: 'Pont', bottom: 'du' },
    { top: 'du', bottom: 'Futur' },
    { top: 'Futur', bottom: '\u00A0' },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const calculateTranslateX = (index: number) => {
    const baseOffset = 35;
    const baseOffsetMd = 20;
    const centerIndex = Math.floor(lines.length / 2);
    return {
      desktop: (index - centerIndex) * baseOffset,
      mobile: (index - centerIndex) * baseOffsetMd,
    };
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const paragraphs = container.querySelectorAll('p');

    timelineRef.current = gsap.timeline({ paused: true });

    timelineRef.current.to(paragraphs, {
      y: window.innerWidth >= 768 ? -60 : -35,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.08,
    });

    container.addEventListener('mouseenter', () => timelineRef.current?.play());
    container.addEventListener('mouseleave', () =>
      timelineRef.current?.reverse()
    );

    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`mx-auto pb-10 font-sans font-black tracking-[-2px] uppercase antialiased cursor-pointer ${className}`}
      style={{ fontSize, '--md-font-size': fontSizeMd } as React.CSSProperties}
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
                height: `${lineHeight}px`,
                transform: `translateX(${translateX.desktop}px) skew(${
                  index % 2 === 0 ? '60deg, -30deg' : '0deg, -30deg'
                }) scaleY(${index % 2 === 0 ? '0.66667' : '1.33333'})`,
              }}
            >
              <p
                style={{
                  height: `${lineHeight}px`,
                  lineHeight: `${lineHeight - 5}px`,
                }}
              >
                {line.top}
              </p>
              <p
                style={{
                  height: `${lineHeight}px`,
                  lineHeight: `${lineHeight - 5}px`,
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
