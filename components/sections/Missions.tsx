'use client';

import { motion } from 'framer-motion';
import { Users, BookOpen, TrendingUp } from 'lucide-react';

const missions = [
  {
    icon: Users,
    title: 'Accompagnement',
    description:
      'Soutenir les jeunes dans leur parcours académique et professionnel avec un réseau de mentors engagés',
    color: 'accent-600',
    bgColor: 'bg-accent-600/5',
  },
  {
    icon: BookOpen,
    title: 'Égalité des chances',
    description:
      "Promouvoir l'égalité des chances et favoriser l'intégration sociale de tous",
    color: 'success',
    bgColor: 'bg-success/5',
  },
  {
    icon: TrendingUp,
    title: "Réseau d'entraide",
    description:
      "Créer un réseau durable de mentorat et de partage d'expériences entre générations",
    color: 'warning',
    bgColor: 'bg-warning/5',
  },
];

export default function Mission() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Notre <span className="text-accent-600">Mission</span>
          </h2>
          <div className="w-24 h-1 bg-accent-600 mx-auto rounded-full" />
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {missions.map((mission, index) => {
            const Icon = mission.icon;
            return (
              <motion.div
                key={mission.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative p-8 rounded-[3rem] ${mission.bgColor} border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 hover-lift`}
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 bg-${mission.color} rounded-2xl flex items-center justify-center mb-6 shadow-md`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
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
