'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Calendar, CheckCircle } from 'lucide-react';
import { PixelImage } from '../ui/pixel-image';

const colloquesBenefits = [
  'Débattre des grands enjeux d’intégration, de diversité et d’égalité des chances.',
  'Croiser les regards de chercheurs, d’associations, d’institutions et d’entreprises.',
  'Mettre en lumière des initiatives de terrain et des bonnes pratiques.',
  'Formuler des pistes d’action concrètes à partir des échanges.',
  'Donner la parole aux jeunes et aux publics concernés.',
  'Créer un espace de débat ouvert, exigeant et bienveillant.',
];

export default function Colloques() {
  return (
    <section id="colloques" className="py-24 md:py-32 bg-zinc-50 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-20 items-start">
          {/* ===== Left - Content ===== */}
          <motion.div
            initial={{ y: 150 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-1 text-accent-500">
              Colloques
            </h2>

            <p className="text-sm text-gray-600 mb-5 leading-relaxed">
              Les colloques Pont du Futur sont des rendez-vous d’ampleur où se
              rencontrent chercheuses, chercheurs, associations, institutions,
              entreprises et citoyen·ne·s pour penser ensemble les solutions de
              demain.
            </p>

            {/* Benefits list */}
            <div className="space-y-4 mb-8">
              {colloquesBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="flex items-center py-7 px-3 border-b-2 border-zinc-100 hover:border-accent-200 duration-300 gap-3"
                >
                  <CheckCircle className="w-4 h-4 text-accent-500" />
                  <span className="text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="/evenements"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 text-accent-600 border-b-2 border-accent-200 hover:border-accent-300 duration-300 py-2 px-4 font-semibold hover:brightness-105 transition-all"
            >
              <Calendar className="w-5 h-5" />
              Voir nos événements
            </motion.a>
          </motion.div>

          {/* ===== Right - Image (colloques → image à droite) ===== */}
          <motion.div
            initial={{ opacity: 0, y: 150 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative h-full w-full"
          >
            <PixelImage
              src="/actions/people-meeting-support-group.jpg"
              grid="8x3"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
