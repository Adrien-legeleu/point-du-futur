'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const milestones = [
  {
    year: '2021',
    title: "Création de l'association",
    description:
      'Mamadou Niang fonde Pont du Futur avec une poignée de bénévoles motivés.',
  },
  {
    year: '2022',
    title: 'Premier programme de mentorat',
    description: '25 jeunes accompagnés par des mentors professionnels.',
  },
  {
    year: '2023',
    title: 'Partenariats stratégiques',
    description:
      'Signature de partenariats avec des entreprises et institutions engagées.',
  },
  {
    year: '2024',
    title: 'Extension nationale',
    description: 'Lancement de programmes dans 5 nouvelles villes en France.',
  },
];

export default function Timeline() {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-t from-accent-50 via-white to-white overflow-hidden">
      {/* Déco douce en fond */}
      <div className="pointer-events-none absolute top-10 left-0 w-80 h-80 bg-accent-100/40 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 bg-primary-100/30 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Notre <span className="text-primary-400">Parcours</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            3 ans d&apos;engagement, de collaboration et d&apos;impact positif.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Ligne centrale */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-accent-200 transform -translate-x-1/2" />

          <div className="space-y-16">
            {milestones.map((milestone, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row md:items-center ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content card */}
                  <div className={`flex-1 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-3xl p-6 md:p-8 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_70px_-14px_rgba(0,0,0,0.1)] transition-all duration-300">
                      <div className="text-sm font-semibold text-accent-600 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-6 bg-white border-[5px] border-accent-400 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.08)]" />
                  </div>

                  {/* Empty space (layout alterné) */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
