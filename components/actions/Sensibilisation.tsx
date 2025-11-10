'use client';

import { motion } from 'framer-motion';
import {
  Lightbulb,
  Users,
  BookOpen,
  Heart,
  TrendingUp,
  Award,
} from 'lucide-react';

const benefits = [
  "Éveiller les consciences sur l'égalité des chances et les inégalités.",
  'Donner des clés de compréhension des enjeux sociaux actuels.',
  "Encourager le dialogue, l'écoute et le débat constructif.",
  'Mettre en avant des parcours inspirants et des modèles de réussite.',
  "Favoriser l'engagement citoyen et la participation des jeunes.",
  'Créer des espaces sécurisés pour échanger et poser des questions.',
];

const themes = [
  {
    icon: Users,
    title: "L'égalité des chances",
    description:
      'Comprendre les inégalités et agir pour plus de justice sociale.',
  },
  {
    icon: BookOpen,
    title: 'L’intégration sociale',
    description: 'Favoriser l’inclusion et le vivre-ensemble.',
  },
  {
    icon: Heart,
    title: 'Le mentorat et l’entraide',
    description: 'Cultiver la solidarité et le partage d’expériences.',
  },
  {
    icon: TrendingUp,
    title: 'La réussite éducative',
    description: 'Promouvoir l’accès à l’éducation pour tous.',
  },
];

const impacts = [
  { value: '15+', label: 'Sessions organisées' },
  { value: '300+', label: 'Participants sensibilisés' },
  { value: '20+', label: 'Intervenants experts' },
  { value: '8', label: 'Partenaires engagés' },
];

export default function Sensibilisation() {
  return (
    <section id="sensibilisation" className="py-24 md:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* ===== Left - Content ===== */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-energy-50 border border-energy-100 text-energy-700 font-medium mb-6">
              <Lightbulb className="w-4 h-4" />
              Agir ensemble
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Sessions de{' '}
              <span className="text-energy-500">Sensibilisation</span>
            </h2>

            {/* Description */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Des temps d&apos;échange pour parler d&apos;égalité des chances,
              d&apos;intégration sociale et de réussite éducative, à travers des
              interventions interactives et inspirantes.
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
                  <div className="mt-1 w-6 h-6 rounded-full bg-energy-50 flex items-center justify-center flex-shrink-0">
                    <span className="w-2 h-2 rounded-full bg-energy-500" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-energy-500 text-white rounded-full font-semibold shadow-lg shadow-black/10 hover:brightness-105 transition-all"
            >
              <Lightbulb className="w-5 h-5" />
              Organiser une session
            </motion.a>
          </motion.div>

          {/* ===== Right - Thèmes & impact (comme les steps) ===== */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-energy-100/70 to-energy-50/50 rounded-[3rem] p-8 border border-energy-100 shadow-2xl shadow-black/8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">
                Ce que nous abordons
              </h3>

              <div className="space-y-6 mb-8">
                {themes.map((theme, index) => {
                  const Icon = theme.icon;
                  return (
                    <motion.div
                      key={theme.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 }}
                      className="flex gap-4"
                    >
                      {/* Number + Icon */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="w-14 h-14 bg-white border border-energy-100 rounded-2xl flex items-center justify-center shadow-sm">
                            <Icon className="w-7 h-7 text-energy-500" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full border-2 border-accent-500 flex items-center justify-center text-xs font-bold text-accent-600">
                            {index + 1}
                          </div>
                        </div>
                        {index < themes.length - 1 && (
                          <div className="w-1 h-12 bg-energy-100 mx-auto mt-2 rounded-full" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-2">
                        <h4 className="text-lg font-bold text-gray-900 mb-1">
                          {theme.title}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {theme.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Impact résumé dans la carte */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                {impacts.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl bg-white/80 border border-energy-50 p-3 text-center"
                  >
                    <div className="text-xl font-bold text-energy-600">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="absolute -top-6 -right-2 px-6 py-3 bg-white rounded-full shadow-lg shadow-black/10 border border-energy-100"
            >
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-energy-500" />
                <span className="font-bold text-gray-900">
                  300+ participants
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
