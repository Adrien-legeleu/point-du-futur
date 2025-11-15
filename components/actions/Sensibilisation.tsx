'use client';

import { motion } from 'framer-motion';
import { Lightbulb, CheckCircle } from 'lucide-react';
import { PixelImage } from '../ui/pixel-image';

const sensibilisationBenefits = [
  'Éveiller les consciences sur l’égalité des chances et les inégalités.',
  'Donner des clés de compréhension des enjeux sociaux actuels.',
  'Encourager le dialogue, l’écoute et le débat constructif.',
  'Mettre en avant des parcours inspirants et des modèles de réussite.',
  'Favoriser l’engagement citoyen et la participation des jeunes.',
  'Créer des espaces sécurisés pour échanger et poser des questions.',
];

export default function Sensibilisation() {
  return (
    <section
      id="sensibilisation"
      className="py-24 md:py-32 bg-zinc-50 relative"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-20 items-start">
          {/* ===== Left - Content ===== */}
          <motion.div
            initial={{ y: 150 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-1 text-energy-500">
              Sensibilisation
            </h2>

            <p className="text-sm text-gray-600 mb-5 leading-relaxed">
              Nos sessions de sensibilisation ouvrent des espaces de parole pour
              parler d’égalité des chances, d’intégration et de réussite
              éducative. Des moments forts pour comprendre, débattre et
              s’engager.
            </p>

            <p className="text-xs uppercase tracking-wide text-energy-500 mb-6">
              Sessions interactives · Intervenants engagés · Format adaptable
              aux publics
            </p>

            {/* Benefits list */}
            <div className="space-y-4 mb-8">
              {sensibilisationBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="flex items-center py-7 px-3 border-b-2 border-zinc-100 hover:border-energy-200 duration-300 gap-3"
                >
                  <CheckCircle className="w-4 h-4 text-energy-500" />
                  <span className="text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 text-energy-600 border-b-2 border-energy-200 hover:border-energy-300 duration-300 py-2 px-4 font-semibold hover:brightness-105 transition-all"
            >
              <Lightbulb className="w-5 h-5" />
              Organiser une session
            </motion.a>
          </motion.div>

          {/* ===== Right - Image (sensibilisation → image à droite) ===== */}
          <motion.div
            initial={{ opacity: 0, y: 150 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative h-full w-full"
          >
            <PixelImage
              src="/actions/smiling-guy-turning-pages-textbook.jpg"
              grid="8x3"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
