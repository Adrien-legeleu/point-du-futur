'use client';

import { motion } from 'framer-motion';
import { Calendar, CheckCircle } from 'lucide-react';
import { PixelImage } from '../ui/pixel-image';

const seminairesBenefits = [
  'Rencontrer des professionnelles et professionnels inspirants.',
  'Découvrir de nouveaux métiers et secteurs en profondeur.',
  'Échanger avec d’autres jeunes motivés et engagés.',
  'Poser tes questions directement aux intervenants.',
  'Élargir ton réseau et créer des premiers contacts.',
  'Repartir avec des ressources et des pistes concrètes.',
];

export default function Seminaires() {
  return (
    <section id="seminaires" className="py-24 md:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-20 items-start">
          {/* ===== Left - Image (séminaires → image à gauche) ===== */}
          <motion.div
            initial={{ opacity: 0, y: 150 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative h-full w-full"
          >
            <PixelImage
              src="/actions/group-male-friends-enjoying-restaurant (1).jpg"
              grid="6x4"
            />
          </motion.div>

          {/* ===== Right - Content ===== */}
          <motion.div
            initial={{ y: 150 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-1 text-primary-500">
              Séminaires
            </h2>

            <p className="text-sm text-gray-600 mb-5 leading-relaxed">
              Tous les deux mois, nous organisons des séminaires thématiques
              ouverts, animés par des intervenants engagés. L’objectif :
              t’informer, t’inspirer et t’aider à prendre des décisions
              éclairées pour ton avenir.
            </p>

            {/* Benefits list */}
            <div className="space-y-4 mb-8">
              {seminairesBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="flex items-center py-7 px-3 border-b-2 border-zinc-100 hover:border-primary-200 duration-300 gap-3"
                >
                  <CheckCircle className="w-4 h-4 text-primary-600" />
                  <span className="text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="/evenements"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 text-primary-600 border-b-2 border-primary-200 hover:border-primary-300 duration-300 py-2 px-4 font-semibold hover:brightness-105 transition-all"
            >
              <Calendar className="w-5 h-5" />
              Voir tous les événements
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
