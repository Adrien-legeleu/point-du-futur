'use client';

import { motion } from 'framer-motion';
import { Calendar, Users, MapPin, CheckCircle, Star } from 'lucide-react';

const benefits = [
  'Rencontrer des professionnels inspirants',
  'Découvrir de nouveaux métiers et secteurs',
  'Échanger avec d’autres jeunes motivés',
  'Poser tes questions directement aux intervenants',
  'Élargir ton réseau professionnel',
  'Repartir avec des ressources et contacts utiles',
];

const pastThemes = [
  'Intelligence artificielle et emplois de demain',
  'Leadership et développement personnel',
  'Finance et inclusion économique',
  'Métiers de la santé et du social',
  'Transition écologique et nouveaux métiers',
  'Diversité et inclusion en entreprise',
];

const stats = [
  { value: '24+', label: 'Séminaires organisés' },
  { value: '1200+', label: 'Participants' },
  { value: '60+', label: 'Intervenants experts' },
  { value: '4.8/5', label: 'Satisfaction moyenne' },
];

export default function Seminaires() {
  return (
    <section id="seminaires" className="py-24 md:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* ===== Left - Content ===== */}

          {/* ===== Right - Thèmes + Stats ===== */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main card */}
            <div className="bg-gradient-to-br from-primary-100/70 to-white rounded-[3rem] p-8 border border-primary-100 shadow-2xl shadow-black/8">
              <h3 className="text-2xl font-bold mb-8 text-gray-900">
                Thématiques abordées
              </h3>

              <div className="flex flex-wrap gap-3 mb-10">
                {pastThemes.map((theme, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-100 shadow-sm hover:shadow-md transition-all"
                  >
                    {theme}
                  </motion.span>
                ))}
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-2xl bg-white/80 border border-primary-50 p-4 text-center"
                  >
                    <div className="text-xl font-bold text-primary-600">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating badge */}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 font-medium mb-6">
              <Calendar className="w-4 h-4" />
              Rendez-vous inspirants
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Nos <span className="text-primary-500">Séminaires</span>{' '}
              thématiques
            </h2>

            {/* Description */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Tous les deux mois, des séminaires ouverts à tous, animés par des
              intervenants passionnés, pour t’informer, t’inspirer et t’aider à
              construire ton avenir professionnel.
            </p>

            {/* Benefits list */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1 w-6 h-6 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-primary-600" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="/evenements"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 text-white rounded-full font-semibold shadow-lg shadow-black/10 hover:brightness-105 transition-all"
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
