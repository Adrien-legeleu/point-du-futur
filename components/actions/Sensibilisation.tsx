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

const themes = [
  {
    icon: Users,
    title: "L'égalité des chances",
    description:
      'Comprendre les inégalités et agir pour plus de justice sociale',
  },
  {
    icon: BookOpen,
    title: "L'intégration sociale",
    description: "Favoriser l'inclusion et le vivre-ensemble",
  },
  {
    icon: Heart,
    title: "Le mentorat et l'entraide",
    description: "Cultiver la solidarité et le partage d'expériences",
  },
  {
    icon: TrendingUp,
    title: 'La réussite éducative',
    description: "Promouvoir l'accès à l'éducation pour tous",
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
    <section
      id="sensibilisation"
      className="py-24 md:py-32 bg-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, #f97316 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-orange/10 text-primary-orange font-medium mb-6"
          >
            <Lightbulb className="w-4 h-4" />
            Agir ensemble
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
          >
            Sessions de{' '}
            <span className="text-primary-orange">Sensibilisation</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Des sessions de sensibilisation pour éveiller les consciences sur
            l'égalité des chances, l'intégration sociale et les enjeux de
            société.
          </motion.p>
        </div>

        {/* Themes grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {themes.map((theme, index) => {
            const Icon = theme.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-warning/20 shadow-md hover-lift"
              >
                <div className="w-12 h-12 bg-warning rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{theme.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {theme.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Content sections */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Left - What we do */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-[2rem] p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              🎤 Nos interventions
            </h3>
            <ul className="space-y-4">
              {[
                'Conférences dans les écoles et universités',
                'Débats et tables rondes sur les enjeux sociétaux',
                'Témoignages de jeunes ayant réussi leur parcours',
                'Ateliers participatifs et interactifs',
                'Projections de films et documentaires engagés',
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1 w-2 h-2 rounded-full bg-primary-orange flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right - Who we target */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2rem] p-8 border border-warning/20 shadow-md"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              👥 Publics cibles
            </h3>
            <div className="space-y-4">
              {[
                {
                  title: 'Établissements scolaires',
                  desc: 'Collèges, lycées et universités',
                },
                {
                  title: 'Associations',
                  desc: "Structures d'accompagnement social",
                },
                {
                  title: 'Entreprises',
                  desc: 'Sensibilisation RSE et diversité',
                },
                {
                  title: 'Grand public',
                  desc: 'Événements ouverts à tous',
                },
              ].map((target, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-4 shadow-sm"
                >
                  <div className="font-bold text-gray-900 mb-1">
                    {target.title}
                  </div>
                  <div className="text-sm text-gray-600">{target.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Impact stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-warning rounded-[2rem] p-12 text-white shadow-lg"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            Notre impact en chiffres
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impacts.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-white/90 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-600 mb-6">
            Vous souhaitez organiser une session de sensibilisation ?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-warning text-white rounded-full font-semibold shadow-md hover-lift"
          >
            <Lightbulb className="w-5 h-5" />
            Nous contacter
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
