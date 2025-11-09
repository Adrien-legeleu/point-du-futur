'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function OurStory() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-[3rem] overflow-hidden shadow-lg">
              {/* Image placeholder */}
              <div className="aspect-[4/3] bg-gray-100" />

              {/* Badge flottant */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-accent-600 shadow-md"
              >
                Depuis 2021
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary-orange" />
              <span className="text-sm font-semibold text-primary-orange uppercase tracking-wider">
                Notre Histoire
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Tout a commencé par une{' '}
              <span className="text-accent-600">rencontre</span>
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">Pont du Futur</strong> est née
                en 2021 de la volonté de Mamadou Niang, étudiant en science
                politique, qui a vécu les difficultés de l'intégration et le
                manque d'accompagnement.
              </p>

              <p>
                Conscient que de nombreux jeunes issus de l'immigration et des
                classes populaires font face aux mêmes obstacles, il décide de
                créer un pont entre ces jeunes et les opportunités qui s'offrent
                à eux.
              </p>

              <p>
                Aujourd'hui,{' '}
                <strong className="text-gray-900">Pont du Futur</strong> est
                devenue une communauté de plus de 120 membres, avec des mentors
                bénévoles, des partenaires engagés, et surtout, des jeunes qui
                réalisent leurs rêves.
              </p>

              <div className="mt-8 p-6 bg-accent-600/5 rounded-2xl border border-accent-600/10">
                <p className="text-lg font-medium text-gray-900 italic">
                  "Notre mission est simple : faire en sorte que chaque jeune,
                  peu importe son origine, puisse construire son avenir avec
                  confiance."
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  — Mamadou Niang, Fondateur
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
