'use client';

import { useEffect } from 'react';
import { motion, stagger, useAnimate } from 'motion/react';

import Floating, { FloatingElement } from '@/components/ui/parallax-floating';

const stories = [
  `/about/front-view-friends-spending-quality-time-together.jpg`,
  `/about/front-view-friends-spending-quality-time-together.jpg`,
  `/about/front-view-friends-spending-quality-time-together.jpg`,
  `/about/front-view-friends-spending-quality-time-together.jpg`,
  `/about/front-view-friends-spending-quality-time-together.jpg`,
  `/about/front-view-friends-spending-quality-time-together.jpg`,
  `/about/front-view-friends-spending-quality-time-together.jpg`,
  `/about/front-view-friends-spending-quality-time-together.jpg`,
];

function HeroCards({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      className="story-card max-w-xs md:max-w-[200px]"
    >
      <div className="rounded-md  bg-gradient-to-br from-primary-50/60 to-white backdrop-blur-xl shadow-[0_8px_48px_-12px_rgba(0,0,0,0.15)]">
        <div className="p-4 md:p-6">
          <p className="italic text-[13.5px] md:text-[15px] leading-relaxed text-neutral-900">
            {text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

const AboutHero = () => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      '.story-card',
      { opacity: [0, 1], y: [8, 0], scale: [0.98, 1] },
      { duration: 0.5, delay: stagger(0.12) }
    );
  }, [animate]);

  return (
    <div
      ref={scope}
      className="relative flex w-full z-20 h-full overflow-hidden min-h-screen items-center justify-center bg-gradient-to-b bg-zinc-50 via-primary-50 to-wzinc-50 "
    >
      {/* Titre + sous-titre */}
      <motion.div
        className="z-30 text-center space-y-2 flex flex-col"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-8xl font-bold tracking-tight text-primary-500">
          A propos de nous
        </h2>
        <p className="text-sm md:text-base text-neutral-600">blabla</p>
      </motion.div>

      {/* Nuage de cards flottantes (pas d’images) */}
      <Floating sensitivity={-1} className="overflow-visible">
        <FloatingElement depth={0.6} className="top-[10%] left-[8%]">
          <HeroCards text={stories[0]} />
        </FloatingElement>

        <FloatingElement depth={1} className="top-[12%] left-[36%]">
          <HeroCards text={stories[1]} />
        </FloatingElement>

        <FloatingElement depth={1.8} className="top-[6%] left-[64%]">
          <HeroCards text={stories[2]} />
        </FloatingElement>

        <FloatingElement depth={0.8} className="top-[14%] left-[82%]">
          <HeroCards text={stories[3]} />
        </FloatingElement>

        <FloatingElement depth={1} className="top-[44%] left-[6%]">
          <HeroCards text={stories[4]} />
        </FloatingElement>

        <FloatingElement depth={2.2} className="top-[68%] left-[76%]">
          <HeroCards text={stories[5]} />
        </FloatingElement>

        <FloatingElement depth={3} className="top-[74%] left-[18%]">
          <HeroCards text={stories[6]} />
        </FloatingElement>

        <FloatingElement depth={1.2} className="top-[82%] left-[48%]">
          <HeroCards text={stories[7]} />
        </FloatingElement>
      </Floating>
    </div>
  );
};

export { AboutHero };
