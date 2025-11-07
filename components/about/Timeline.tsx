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
      'Signature de partenariats avec des entreprises et institutions.',
  },
  {
    year: '2024',
    title: 'Extension nationale',
    description: 'Lancement de programmes dans 5 nouvelles villes en France.',
  },
];

export default function Timeline() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(90deg, #2563eb 1px, transparent 1px), linear-gradient(#2563eb 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Notre <span className="gradient-text">Parcours</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            3 ans d'engagement, d'innovation et d'impact
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-blue via-primary-green to-primary-blue transform -translate-x-1/2" />

          {/* Milestones */}
          <div className="space-y-16">
            {milestones.map((milestone, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`relative flex items-center ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                      <div className="text-sm font-semibold text-primary-blue mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-6 bg-white border-4 border-primary-blue rounded-full shadow-lg" />
                  </div>

                  {/* Empty space (for alternating layout) */}
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
