'use client';

import { motion } from 'framer-motion';
import { Users, BookOpen, TrendingUp } from 'lucide-react';

const missions = [
  {
    icon: Users,
    title: 'Accompagnement humain',
    description:
      'Offrir à chaque jeune un suivi personnalisé, des conseils concrets et un mentor à l’écoute pour l’aider à tracer sa voie.',
    color: 'bg-primary-400/80',
    bgColor: 'bg-primary-500/5',
  },
  {
    icon: BookOpen,
    title: 'Égalité des chances',
    description:
      'Rendre l’éducation et la réussite accessibles à tous, quelle que soit l’origine, le parcours ou la situation sociale.',
    color: 'bg-accent-400/80',
    bgColor: 'bg-accent-600/5',
  },
  {
    icon: TrendingUp,
    title: "Réseau d'entraide durable",
    description:
      'Créer une communauté solidaire où étudiants, mentors et partenaires grandissent ensemble vers l’avenir.',
    color: 'bg-energy-400/80',
    bgColor: 'bg-energy-500/5',
  },
];

export default function Mission() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-primary-700">
            Notre <span className="text-primary-500">Mission</span>
          </h2>

          {/* Underline deco */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-6 h-1.5 bg-future-300 rounded-full" />
            <div className="w-10 h-1.5 bg-future-500 rounded-full" />
            <div className="w-6 h-1.5 bg-future-300 rounded-full" />
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {missions.map((mission, index) => {
            const Icon = mission.icon;
            return (
              <motion.div
                key={mission.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative p-8 rounded-3xl ${mission.bgColor} border border-gray-100 shadow-2xl shadow-black/[0.08] transition-all duration-300 hover-lift`}
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 flex items-center justify-center rounded-2xl ${mission.color} shadow-md mb-6`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  {mission.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {mission.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
