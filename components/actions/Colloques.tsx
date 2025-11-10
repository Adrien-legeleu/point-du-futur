'use client';

import { motion } from 'framer-motion';
import {
  MessageCircle,
  Users,
  Award,
  BookOpen,
  TrendingUp,
  Globe,
  Calendar,
} from 'lucide-react';

const objectives = [
  {
    icon: Globe,
    title: 'Débattre',
    description:
      "Échanger sur les enjeux d'intégration, de diversité et d'égalité des chances.",
  },
  {
    icon: BookOpen,
    title: 'Informer',
    description: 'Partager études, recherches et bonnes pratiques de terrain.',
  },
  {
    icon: Users,
    title: 'Rassembler',
    description:
      'Réunir associations, institutions, chercheurs, entreprises et citoyens.',
  },
  {
    icon: TrendingUp,
    title: 'Agir',
    description:
      'Formuler des pistes d’action concrètes pour faire avancer les choses.',
  },
];

const pastColloques = [
  {
    year: '2023',
    title: 'Migrations et intégration sociale',
    participants: '150',
  },
  {
    year: '2022',
    title: 'Jeunesse et égalité des chances',
    participants: '120',
  },
  {
    year: '2021',
    title: 'Éducation et inclusion',
    participants: '100',
  },
];

const stats = [
  { value: '3+', label: 'Colloques organisés' },
  { value: '370+', label: 'Participants' },
  { value: '30+', label: 'Intervenants invités' },
];

export default function Colloques() {
  return (
    <section id="colloques" className="py-24 md:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-50 border border-accent-100 text-accent-700 font-medium mb-6"
          >
            <MessageCircle className="w-4 h-4" />
            Grands rendez-vous
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
          >
            Colloques &{' '}
            <span className="text-accent-600">grandes conférences</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Des événements d&apos;envergure pour débattre des enjeux
            d&apos;intégration, de réussite et d&apos;égalité des chances avec
            des experts, décideurs et acteurs de terrain.
          </motion.p>
        </div>

        {/* 2 colonnes */}
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* ===== Colonne gauche : objectifs / description ===== */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Pourquoi organiser des colloques ?
            </h3>

            <p className="text-gray-700 mb-8 leading-relaxed">
              Les colloques Pont du Futur sont des moments forts où se
              rencontrent chercheurs, associations, institutions, étudiants et
              citoyens pour réfléchir ensemble aux solutions de demain.
            </p>

            <div className="space-y-5 mb-10">
              {objectives.map((objective, index) => {
                const Icon = objective.icon;
                return (
                  <motion.div
                    key={objective.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-accent-50 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Icon className="w-6 h-6 text-accent-600" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-gray-900 mb-1">
                        {objective.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {objective.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA simple et discret */}
            <motion.a
              href="/evenements"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent-500 text-white rounded-full font-semibold shadow-lg shadow-black/10 hover:brightness-105 transition-all"
            >
              <Calendar className="w-5 h-5" />
              Voir nos événements
            </motion.a>
          </motion.div>

          {/* ===== Colonne droite : carte colloques passés / stats ===== */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-accent-100/70 to-white rounded-[3rem] p-8 border border-accent-100 shadow-2xl shadow-black/8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Quelques colloques organisés
              </h3>

              <div className="space-y-4 mb-8">
                {pastColloques.map((colloque, index) => (
                  <motion.div
                    key={colloque.year}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 rounded-2xl bg-white/80 border border-accent-50 p-4"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-accent-50 flex items-center justify-center">
                      <span className="text-lg font-bold text-accent-700">
                        {colloque.year}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">
                        {colloque.title}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                        <Users className="w-3 h-3 text-accent-600" />
                        {colloque.participants} participant·e·s
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className="rounded-2xl bg-white/80 border border-accent-50 p-3 text-center"
                  >
                    <div className="text-base font-bold text-accent-700">
                      {stat.value}
                    </div>
                    <div className="text-[11px] text-gray-600">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Petit badge flottant */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="absolute -top-6 -right-2 px-6 py-3 bg-white rounded-full shadow-lg shadow-black/10 border border-accent-100"
            >
              <div className="flex items-center gap-2">
                <Award className="w-4  h-4 text-accent-600" />
                <span className="font-bold text-gray-900 text-xs">
                  Un espace de débat ouvert
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
