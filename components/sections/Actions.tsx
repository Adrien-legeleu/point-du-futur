'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { LinkPreview } from '../ui/link-preview';

type Action = {
  title: string;
  description: string;
  image: string; // chemin depuis /public
};

const actions: Action[] = [
  {
    title: 'Mentorat',
    description:
      'Accompagnement individuel par des professionnelles et professionnels engagés, avec un suivi concret et humain.',
    image: '/hero-1.jpg',
  },
  {
    title: 'Orientation',
    description:
      'Ateliers pour explorer les filières et métiers, clarifier ses choix et construire son cap.',
    image: '/hero-1.jpg',
  },
  {
    title: 'Sensibilisation',
    description:
      'Interventions sur l’égalité des chances, la lutte contre les discriminations et les enjeux sociaux.',
    image: '/hero-1.jpg',
  },
  {
    title: 'Séminaires',
    description:
      'Rencontres thématiques et échanges avec des intervenants inspirants.',
    image: '/hero-1.jpg',
  },
  {
    title: 'Colloques',
    description:
      'Événements autour de l’intégration, de la réussite académique et de l’inclusion.',
    image: '/hero-1.jpg',
  },
  {
    title: 'Réseau',
    description:
      'Mise en relation entre étudiants, mentors, alumni et partenaires pour créer des trajectoires durables.',
    image: '/hero-1.jpg',
  },
];

export default function ActionsBentoClean() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-bl from-primary-100 via-zinc-50 to-zinc-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 md:mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-primary-500">
            Nos <span className="text-primary-500">Actions</span>
          </h2>
          <p className="text-sm text-neutral-600 mt-3 max-w-2xl">
            Un aperçu clair et concret de nos initiatives au service des jeunes.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 gap-4">
          {actions.map((a, i) => (
            <motion.article
              key={a.title}
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.01, duration: 0.35 }}
              className="group relative isolate border-t border-neutral-200 bg-transparent duration-300 hover:border-neutral-300"
            >
              {/* ⬇️ mode statique pour afficher l'image locale */}
              <LinkPreview
                isStatic
                imageSrc={a.image}
                url="#"
                className="grid grid-cols-2 md:grid-cols-3 items-start gap-4 py-10"
              >
                <span className="sm:text-2xl text-xl text-primary-500">
                  {a.title}
                </span>

                <span className="sm:text-sm text-xs max-w-lg text-left text-neutral-600">
                  {a.description}
                </span>

                {/* Arrow animée quand on hover TOUT l’article */}
                <div className="flex items-center max-md:hidden cursor-pointer justify-end translate-y-3 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowRight className="w-8 h-8 text-black" />
                </div>
              </LinkPreview>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
