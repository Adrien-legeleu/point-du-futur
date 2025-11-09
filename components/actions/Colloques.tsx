'use client';

import { motion } from 'framer-motion';
import {
  MessageCircle,
  Users,
  Award,
  BookOpen,
  TrendingUp,
  Globe,
} from 'lucide-react';

const nextColloque = {
  title: 'Intégration et Réussite : Les défis de demain',
  date: 'Mars 2025',
  duration: 'Journée complète',
  participants: '200 personnes attendues',
  themes: [
    "Politiques d'intégration en France",
    'Réussite scolaire et égalité des chances',
    'Entrepreneuriat et diversité',
    'Témoignages de parcours inspirants',
  ],
  speakers: [
    'Sociologues et chercheurs',
    'Responsables politiques',
    'Entrepreneurs engagés',
    'Acteurs associatifs',
  ],
};

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

const objectives = [
  {
    icon: Globe,
    title: 'Débattre',
    description:
      "Échanger sur les enjeux d'intégration et d'égalité des chances",
  },
  {
    icon: BookOpen,
    title: 'Informer',
    description: 'Partager des études, recherches et bonnes pratiques',
  },
  {
    icon: Users,
    title: 'Rassembler',
    description:
      'Réunir acteurs associatifs, politiques, académiques et citoyens',
  },
  {
    icon: TrendingUp,
    title: 'Agir',
    description: 'Formuler des recommandations concrètes pour avancer ensemble',
  },
];

export default function Colloques() {
  return (
    <section id="colloques" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-green/10 text-primary-green font-medium mb-6"
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
            <span className="text-primary-green">Colloques</span> et conférences
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Des événements d'envergure pour débattre des enjeux d'intégration,
            de réussite et d'égalité des chances avec experts et décideurs.
          </motion.p>
        </div>

        {/* Objectives grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {objectives.map((objective, index) => {
            const Icon = objective.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-white rounded-2xl p-6 shadow-md hover-lift"
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-success/10 rounded-xl flex items-center justify-center shadow-md">
                  <Icon className="w-7 h-7 text-success" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  {objective.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {objective.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Next colloque - Featured */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-success/5 rounded-[3rem] p-10 md:p-12 border border-success/20 shadow-lg mb-16"
        >
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left - Info */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/20 text-success font-bold text-sm mb-6">
                <Award className="w-4 h-4" />
                PROCHAIN COLLOQUE
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {nextColloque.title}
              </h3>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="font-semibold">{nextColloque.date}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span>{nextColloque.duration}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span>{nextColloque.participants}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-success text-white rounded-full font-semibold shadow-md hover-lift"
              >
                Réserver ma place
              </motion.button>
            </div>

            {/* Right - Program */}
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-6">
                🎤 Intervenants
              </h4>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {nextColloque.speakers.map((speaker, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 bg-white rounded-xl text-sm font-medium text-gray-700 text-center shadow-sm"
                  >
                    {speaker}
                  </div>
                ))}
              </div>

              <h4 className="text-xl font-bold text-gray-900 mb-6">
                📋 Thématiques
              </h4>
              <ul className="space-y-3">
                {nextColloque.themes.map((theme, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1.5 w-1.5 h-1.5 bg-success rounded-full flex-shrink-0" />
                    <span className="text-gray-700">{theme}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Past colloques */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="md:col-span-3">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Colloques précédents
            </h3>
          </div>
          {pastColloques.map((colloque, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-success/10 rounded-full flex items-center justify-center shadow-md">
                <span className="text-2xl font-bold text-success">
                  {colloque.year}
                </span>
              </div>
              <h4 className="font-bold text-gray-900 mb-3">{colloque.title}</h4>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-success/10 text-success rounded-full text-sm font-medium">
                <Users className="w-4 h-4" />
                {colloque.participants} participants
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-success rounded-[2rem] p-10 text-white text-center shadow-lg"
        >
          <MessageCircle className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Participe à nos colloques
          </h3>
          <p className="text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
            Les colloques sont ouverts à tous : étudiants, professionnels,
            chercheurs, citoyens engagés. Viens échanger et contribuer au débat
            !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-success rounded-full font-semibold shadow-md hover-lift"
            >
              Être informé(e)
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 text-white rounded-full font-semibold border-2 border-white/30 shadow-md hover-lift"
            >
              Voir les archives
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
