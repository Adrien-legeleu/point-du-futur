'use client';

import { motion } from 'framer-motion';
import {
  Compass,
  Briefcase,
  GraduationCap,
  Users,
  MapPin,
  Sparkles,
} from 'lucide-react';

const workshops = [
  {
    icon: Briefcase,
    title: 'Découverte des métiers',
    description: 'Rencontres avec des professionnels de différents secteurs.',
    frequency: 'Mensuel',
  },
  {
    icon: GraduationCap,
    title: 'Orientation académique',
    description: 'Aide au choix de formations et établissements.',
    frequency: 'Mensuel',
  },
  {
    icon: Users,
    title: 'Ateliers CV & Lettre',
    description: 'Optimisation de tes candidatures.',
    frequency: 'Bimensuel',
  },
  {
    icon: MapPin,
    title: "Visites d'entreprises",
    description: 'Découverte du monde professionnel sur le terrain.',
    frequency: 'Trimestriel',
  },
];

const testimonial = {
  text: "Les ateliers d'orientation m'ont aidée à clarifier mon projet professionnel. J'ai découvert des métiers que je ne connaissais pas et j'ai maintenant une vision claire de mon avenir.",
  author: 'Leïla M.',
  role: 'Étudiante en économie',
  avatar: '👩‍🎓',
};

export default function Orientation() {
  return (
    <section id="orientation" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left - Workshops grid + témoignage */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Grid d’ateliers */}
            <div className="grid grid-cols-2 gap-4">
              {workshops.map((workshop, index) => {
                const Icon = workshop.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="relative p-6 rounded-2xl bg-gradient-to-br from-accent-100/70 to-accent-50/70 shadow-2xl shadow-black/8 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                      <Icon className="w-6 h-6 text-accent-500" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2 text-sm">
                      {workshop.title}
                    </h4>
                    <p className="text-xs text-gray-700 mb-3 leading-relaxed">
                      {workshop.description}
                    </p>
                    <span className="inline-block px-2 py-1 bg-white/80 border border-accent-100 text-accent-600 rounded-full text-xs font-medium">
                      {workshop.frequency}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Testimonial card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 rounded-2xl p-6 bg-gradient-to-br from-accent-50/80 to-white border border-accent-100 shadow-2xl shadow-black/8"
            >
              <div className="flex items-start gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-accent-500 flex-shrink-0 mt-1" />
                <p className="text-gray-700 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>
              <div className="flex items-center gap-3 ml-8">
                <div className="w-10 h-10 rounded-full bg-accent-50 flex items-center justify-center text-xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">
                    {testimonial.author}
                  </div>
                  <div className="text-xs text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-50 border border-accent-100 text-accent-700 font-medium mb-6">
              <Compass className="w-4 h-4" />
              Trouve ta voie
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Ateliers d&apos;
              <span className="text-accent-600">Orientation</span>
            </h2>

            {/* Description */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Nos ateliers d&apos;orientation t&apos;aident à construire ton
              projet professionnel en découvrant les métiers, les formations et
              en développant tes compétences de recherche.
            </p>

            {/* Objectifs + format */}
            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  🎯 Objectifs
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-accent-500 mt-1">•</span>
                    <span>Clarifier ton projet professionnel.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-500 mt-1">•</span>
                    <span>
                      Découvrir des métiers et secteurs d&apos;activité.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-500 mt-1">•</span>
                    <span>
                      Optimiser tes candidatures (CV, lettre de motivation).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-500 mt-1">•</span>
                    <span>Préparer tes entretiens et simulations.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  📅 Format
                </h3>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-accent-50 text-accent-700 rounded-full text-sm font-medium border border-accent-100">
                    Ateliers mensuels
                  </span>
                  <span className="px-4 py-2 bg-accent-50 text-accent-700 rounded-full text-sm font-medium border border-accent-100">
                    Groupes de 15–20 pers.
                  </span>
                  <span className="px-4 py-2 bg-accent-50 text-accent-700 rounded-full text-sm font-medium border border-accent-100">
                    2h par session
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent-500 text-white rounded-full font-semibold shadow-lg shadow-black/10 hover:brightness-105 transition-all"
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
