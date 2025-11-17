'use client';
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';

import { Users, BookOpen, Network, LucideIcon } from 'lucide-react';

export const SmoothScrollHero = () => {
  return (
    <div className="bg-zinc-50">
      <h1 className="absolute top-0 z-20 left-1/2 -translate-x-1/2 translate-y-1/2 text-center  text-8xl md:text-9xl font-extrabold uppercase text-primary-600/80  ">
        Pont du Futur
      </h1>
      <Hero />
      <Schedule />
    </div>
  );
};

const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />

      <ParallaxImages />

      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-50" />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ['170%', '100%']
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <>
      <motion.div
        className="sticky top-0  h-screen w-full"
        style={{
          clipPath,
          backgroundSize,
          opacity,
          // ✅ il faut une vraie URL CSS ici
          backgroundImage: "url('/brown-building-cloudy-sky.jpg')",
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
    </>
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src="/hero-2.jpg"
        alt="And example of a space launch"
        start={-200}
        end={200}
        className="w-1/3"
      />
      <ParallaxImg
        src="/happy-university-students-using-laptop-while-sitting-hallway.jpg"
        alt="An example of a space launch"
        start={200}
        end={-250}
        className="mx-auto w-2/3"
      />
      <ParallaxImg
        src="/young-adults-meeting-up-study (1).jpg"
        alt="Orbiting satellite"
        start={-200}
        end={200}
        className="ml-auto w-1/3"
      />
      <ParallaxImg
        src="/colleagues-studying-together-front-their-college.jpg"
        alt="Orbiting satellite"
        start={0}
        end={-500}
        className="ml-24 w-5/12"
      />
    </div>
  );
};

// ✅ typage propre des props
type ParallaxImgProps = {
  className?: string;
  alt: string;
  src: string;
  start: number;
  end: number;
};

const ParallaxImg = ({ className, alt, src, start, end }: ParallaxImgProps) => {
  const ref = useRef<HTMLImageElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

/* ----------- SECTION MISSION, STYLE SOBRE TYPE "LAUNCH" ----------- */

const Schedule = () => {
  return (
    <section
      id="launch-schedule"
      className="mx-auto max-w-5xl px-4 pb-48 pt-20 text-zinc-900"
    >
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: 'easeInOut', duration: 0.75 }}
        className="mb-8 text-4xl font-black uppercase text-primary-500"
      >
        Notre mission
      </motion.h1>

      <motion.p
        initial={{ y: 32, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: 'easeInOut', duration: 0.75, delay: 0.1 }}
        className="mb-16 max-w-2xl text-sm text-zinc-500"
      >
        Pont du Futur accompagne les jeunes dans leurs études, leurs projets et
        leur entrée dans la vie professionnelle, en créant des ponts entre
        écoles, entreprises et mentors engagés.
      </motion.p>

      <ScheduleItem
        title="Accompagnement humain"
        subtitle="Un mentor, un réseau, une écoute"
        detail="Des rencontres, du suivi et des temps d’échange pour ne plus avancer seul."
        Icon={Users}
      />
      <ScheduleItem
        title="Égalité des chances"
        subtitle="Rendre l’orientation et la réussite accessibles"
        detail="Ateliers, évènements et ressources pour tous, quel que soit le parcours."
        Icon={BookOpen}
      />
      <ScheduleItem
        title="Réseau d’entraide durable"
        subtitle="Créer une communauté qui grandit ensemble"
        detail="Un cercle de jeunes, d’anciens, de pros et de bénévoles qui se soutiennent."
        Icon={Network}
      />
    </section>
  );
};

type ScheduleItemProps = {
  title: string;
  subtitle: string;
  detail: string;
  Icon: LucideIcon;
};

const ScheduleItem = ({ title, subtitle, detail, Icon }: ScheduleItemProps) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.75 }}
      className="mb-9 flex md:items-center max-md:flex-col max-md:gap-4 justify-between border-b-2 border-zinc-100 px-3 pb-9"
    >
      <div>
        <div className="mb-1.5 flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary-500" />
          <p className="text-xl text-primary-500">{title}</p>
        </div>
        <p className="text-xs uppercase tracking-wide text-zinc-500">
          {subtitle}
        </p>
      </div>
      <div className="max-w-sm md:text-right text-sm text-zinc-400">
        {detail}
      </div>
    </motion.div>
  );
};
