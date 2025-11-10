'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Rencontre',
    description:
      'Premier échange pour comprendre ton parcours, tes aspirations et tes besoins.',
  },
  {
    number: '02',
    title: 'Mentorat',
    description:
      'Mise en relation avec un mentor adapté à ton profil et à tes objectifs.',
  },
  {
    number: '03',
    title: 'Formation',
    description:
      'Accès à nos ateliers, séminaires et ressources pour développer tes compétences.',
  },
  {
    number: '04',
    title: 'Réussite',
    description:
      'Suivi personnalisé jusqu’à l’atteinte de tes objectifs académiques et professionnels.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Background decoration (on garde la grid) */}
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
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-primary-700">
            Comment ça{' '}
            <span className="text-primary-500">fonctionne&nbsp;?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Un parcours en 4 étapes claires pour t’accompagner sereinement vers
            la réussite.
          </p>
        </motion.div>

        {/* Timeline - Desktop */}
        <div className="hidden md:block relative">
          {/* Timeline line (vert plus pâle) */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-accent-300 transform -translate-y-1/2 rounded-full" />

          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                {/* Number badge */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative z-10 w-20 h-20 mx-auto mb-6 bg-white rounded-full border-4 border-accent-300 flex items-center justify-center shadow-md hover-lift"
                >
                  <span className="text-2xl font-bold text-accent-500">
                    {step.number}
                  </span>
                </motion.div>

                {/* Content card */}
                <div className="bg-white p-6 rounded-2xl shadow-2xl shadow-black/8 border border-gray-100">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline - Mobile */}
        <div className="md:hidden space-y-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-6"
            >
              {/* Number badge */}
              <div className="flex-shrink-0">
                <div className="relative z-10 w-16 h-16 mx-auto  bg-white rounded-full border-4 border-accent-300 flex items-center justify-center shadow-md hover-lift">
                  <span className="text-2xl font-bold text-accent-500">
                    {step.number}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-1 h-20 bg-accent-300 mx-auto mt-2 rounded-full" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-8">
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
