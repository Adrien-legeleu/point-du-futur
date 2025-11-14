'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const stats = [
  {
    value: 124,
    suffix: '+',
    label:
      'Jeunes accompagnés dans leur parcours scolaire et professionnel grâce à des programmes de mentorat personnalisés et un suivi humain régulier.',
  },
  {
    value: 89,
    suffix: '%',
    label:
      'Taux de réussite observé parmi les jeunes ayant bénéficié de nos dispositifs d’accompagnement et d’ateliers d’orientation tout au long de l’année.',
  },
  {
    value: 45,
    suffix: '+',
    label:
      'Mentors engagés issus de différents horizons professionnels, formés pour transmettre leur expérience et soutenir la jeunesse dans ses projets.',
  },
  {
    value: 95,
    suffix: '%',
    label:
      'Taux de satisfaction des bénéficiaires, mesuré à travers nos enquêtes internes et témoignages recueillis lors des bilans de fin de programme.',
  },
];

function Counter({
  value,
  duration = 2,
}: {
  value: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return; // ne démarre que quand visible
    let start = 0;
    const end = value;
    const increment = end / (duration * 60);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function Impact() {
  return (
    <section className="py-12 min-h-screen relative overflow-hidden bg-gradient-to-tl from-primary-100 via-zinc-50 to-zinc-50">
      <div className="grid grid-cols-2 items-center justify-center h-full gap-10 px-10">
        <motion.div
          initial={{ opacity: 0.5, scale: 0.8, transform: 'translateY(50%)' }}
          whileInView={{ opacity: 1, scale: 1, transform: 'translateY(0)' }}
          viewport={{ once: true }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 12,
          }}
          className="w-full h-full relative"
        >
          <Image
            src="/group-teenagers-posing-together.jpg"
            alt="And example of a space launch"
            width={1920}
            height={1080}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>

        <div>
          <h2 className="text-4xl md:text-6xl font-bold mb-16 text-primary-500">
            Notre <span className="text-primary-500">Impact</span>
          </h2>

          <div>
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ y: 10 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                className="text-center group grid-cols-2 py-8 border-t duration-300 hover:border-gray-300 border-gray-200 grid"
              >
                <motion.div
                  initial={{ transform: 'translateY(20px)' }}
                  whileInView={{ transform: 'translateY(0)' }}
                  transition={{ delay: index * 0.1, duration: 0.2 }}
                  className="text-3xl md:text-4xl space-x-6 font-bold mb-2 font-display text-primary-500"
                >
                  <Counter value={stat.value} />
                  <span className="ml-1">{stat.suffix}</span>
                </motion.div>

                <motion.p
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    transform: 'translateY(20px)',
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    transform: 'translateY(0)',
                  }}
                  transition={{ delay: index * 0.1, duration: 0.2 }}
                  className="text-sm md:text-md text-left leading-relaxed font-[400] font-display text-neutral-700"
                >
                  {stat.label}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 max-w-3xl px-5 w-full bottom-2 left-0 mx-auto text-center"
      >
        <blockquote className="text-2xl md:text-3xl font-light italic text-gray-800 leading-relaxed">
          " Relier les parcours, construire demain. "
        </blockquote>
        <div className="mt-6 text-gray-500">— L’équipe Pont du Futur</div>
      </motion.div>
    </section>
  );
}
