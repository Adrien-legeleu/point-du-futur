'use client';

import { useEffect } from 'react';
import { motion, stagger, useAnimate } from 'motion/react';

import Floating, { FloatingElement } from '@/components/ui/parallax-floating';

const stories = [
  `" Pont du Futur est né d'une conviction simple : chaque parcours mérite un pont, pas un plafond. "`,
  `" Au départ, quelques mentors, des cafés, et l'envie de raccrocher des trajectoires aux opportunités. "`,
  `" Notre promesse : du concret, du lien, de la confiance — loin des discours, près des jeunes. "`,
  `" Mentorer, c'est ouvrir une porte… puis rester là, le temps qu'il faut, pour franchir le seuil. "`,
  `" L'égalité des chances n'est pas un slogan : c'est une logistique, une écoute, une présence. "`,
  `" Si un seul regard change, alors l'avenir a déjà bougé d'un degré. "`,
  `" Nous n'empilons pas des actions : nous tissons des relations qui tiennent dans la durée. "`,
  `" Pont du Futur, c'est une méthode : rencontre, cap, étapes, et célébrer chaque mètre franchi. "`,
];

function StoryCard({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      className="story-card max-w-[200px] sm:max-w-xs md:max-w-[200px]"
    >
      <div className="rounded-md bg-gradient-to-br from-primary-50/60 to-white backdrop-blur-xl shadow-[0_8px_48px_-12px_rgba(0,0,0,0.15)]">
        <div className="p-4 md:p-6">
          <p className="italic text-[10px] sm:text-[13.5px] md:text-[15px] leading-relaxed text-neutral-900">
            {text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

const Stories = () => {
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
      className="relative flex w-full z-20 h-full overflow-hidden min-h-screen items-center justify-center bg-gradient-to-b bg-zinc-50 via-primary-50 to-zinc-50"
    >
      <div className="absolute bottom-0 z-10 left-0 w-full h-20 bg-gradient-to-b from-transparent to-zinc-50" />

      {/* Titre + sous-titre */}
      <motion.div
        className="z-30 text-center space-y-2 flex flex-col"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-8xl font-bold tracking-tight text-primary-500">
          Des parcours <br /> qui inspirent
        </h2>
        <p className="text-sm md:text-base text-neutral-600">
          Des jeunes, des mentors, des chemins qui se croisent.
        </p>
      </motion.div>

      {/* Version desktop avec parallax */}
      <Floating sensitivity={-1} className="overflow-visible max-md:hidden">
        <FloatingElement depth={0.6} className="top-[10%] left-[8%]">
          <StoryCard text={stories[0]} />
        </FloatingElement>

        <FloatingElement depth={1} className="top-[12%] left-[36%]">
          <StoryCard text={stories[1]} />
        </FloatingElement>

        <FloatingElement
          depth={1.8}
          className="top-[6%] max-lg:hidden left-[64%]"
        >
          <StoryCard text={stories[2]} />
        </FloatingElement>

        <FloatingElement depth={0.8} className="top-[14%] left-[82%]">
          <StoryCard text={stories[3]} />
        </FloatingElement>

        <FloatingElement depth={1} className="top-[44%] left-[6%]">
          <StoryCard text={stories[4]} />
        </FloatingElement>

        <FloatingElement
          depth={2.2}
          className="top-[68%] max-lg:hidden left-[76%]"
        >
          <StoryCard text={stories[5]} />
        </FloatingElement>

        <FloatingElement depth={3} className="top-[74%] left-[18%]">
          <StoryCard text={stories[6]} />
        </FloatingElement>

        <FloatingElement depth={1.2} className="top-[82%] left-[48%]">
          <StoryCard text={stories[7]} />
        </FloatingElement>
      </Floating>

      {/* Version mobile SANS parallax - mêmes positions */}
      <div className="md:hidden absolute inset-0">
        <div className="absolute top-[12%] left-[2%]">
          <StoryCard text={stories[1]} />
        </div>

        <div className="absolute top-[30%] right-[4%]">
          <StoryCard text={stories[4]} />
        </div>
        <div className="absolute top-[64%] right-[8%]">
          <StoryCard text={stories[6]} />
        </div>
        <div className="absolute top-[80%] left-[8%]">
          <StoryCard text={stories[6]} />
        </div>
      </div>
    </div>
  );
};

export { Stories };
