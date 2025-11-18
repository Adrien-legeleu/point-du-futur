'use client';

import { motion } from 'framer-motion';
import { TextDisperse } from '../ui/text-disperse';

type Membre = {
  id: string;
  prenom: string;
  nom: string;
};

export default function MembresList({ membres }: { membres: Membre[] }) {
  return (
    <section className="bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-zinc-900 px-6 py-16">
      <div className="max-w-7xl mx-auto">
        {membres.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Aucun membre pour le moment
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-8 items-center justify-center md:gap-10 lg:gap-16">
            {membres.map((membre, index) => {
              const prenom_nom = `${membre.prenom} ${membre.nom}`;

              return (
                <motion.div
                  key={membre.id}
                  initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.5,
                    ease: 'easeOut',
                  }}
                  className=" text-lg font-semibold  text-zinc-900 "
                >
                  <TextDisperse className="sm:text-sm text-xs tracking-[0.2rem] ">
                    {prenom_nom}
                  </TextDisperse>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
