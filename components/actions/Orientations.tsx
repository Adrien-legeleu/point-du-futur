'use client';

import { motion } from 'framer-motion';
import { Compass, CheckCircle } from 'lucide-react';
import { PixelImage } from '../ui/pixel-image';

const orientationBenefits = [
  'Clarifier ton projet d’orientation et tes envies.',
  'Découvrir des métiers et secteurs que tu ne connais pas encore.',
  'Comprendre les différentes filières et formations possibles.',
  'Optimiser ton CV et tes lettres de motivation pour te démarquer.',
  'Te préparer aux entretiens et aux candidatures d’écoles ou de stages.',
  'Te projeter dans un parcours réaliste, adapté à ton profil.',
];

export default function Orientation() {
  return (
    <section
      id="orientation"
      className="py-24 md:py-32 bg-gradient-to-b to-zinc-50 from-white relative"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="md:grid flex flex-col-reverse md:grid-cols-2 gap-20 items-start">
          {/* ===== Left - Image (orientation → image à gauche) ===== */}
          <motion.div className="relative h-full w-full">
            <PixelImage
              src="/actions/call-center-onboarding-specialist-providing-training-new-agent-recruit.jpg"
              grid="6x4"
            />
          </motion.div>

          {/* ===== Right - Content ===== */}
          <motion.div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-1 text-accent-500">
              Orientation
            </h2>

            <p className="text-sm text-gray-600 mb-5 leading-relaxed">
              Nos ateliers d’orientation t’aident à mieux te connaître, à
              découvrir des métiers et à choisir les études qui te ressemblent.
              L’objectif : t’accompagner dans des choix clairs, assumés, et
              alignés avec tes envies.
            </p>

            {/* Benefits list */}
            <div className="space-y-4 mb-8">
              {orientationBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-center py-7 px-3 border-b-2 border-zinc-100 hover:border-accent-200 duration-300 gap-3"
                >
                  <CheckCircle className="w-4 h-4 text-accent-500" />
                  <span className="text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 text-accent-600 border-b-2 border-accent-200 hover:border-accent-300 duration-300 py-2 px-4 font-semibold hover:brightness-105 transition-all"
            >
              <Compass className="w-5 h-5" />
              Participer aux ateliers
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
