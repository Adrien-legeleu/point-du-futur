'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Users, Award, Heart, TrendingUp } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: 124,
    label: 'Jeunes accompagnés',
    suffix: '+',
  },
  {
    icon: Award,
    value: 89,
    label: 'Taux de réussite',
    suffix: '%',
  },
  {
    icon: Heart,
    value: 45,
    label: 'Mentors engagés',
    suffix: '+',
  },
  {
    icon: TrendingUp,
    value: 95,
    label: 'Taux de satisfaction',
    suffix: '%',
  },
];

function Counter({
  value,
  duration = 2,
}: {
  value: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const increment = end / (duration * 60);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}</span>;
}

export default function Impact() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-t from-primary-50 via-primary-100/70 to-white">
      {/* Background pattern léger */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-40 bg-pattern-light" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-primary-700">
            Notre <span className="text-primary-500">Impact</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des chiffres concrets qui montrent ce que nous construisons déjà,
            avec et pour les jeunes.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.03, translateY: -4 }}
                  className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/80 border border-primary-100 shadow-md flex items-center justify-center hover-lift group-hover:bg-primary-500 group-hover:border-primary-300 transition-all duration-300"
                >
                  <Icon className="w-10 h-10 text-primary-500 group-hover:text-white transition-colors duration-300" />
                </motion.div>

                <div className="text-4xl md:text-5xl font-bold mb-2 font-display text-primary-700">
                  <Counter value={stat.value} />
                  {stat.suffix}
                </div>

                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 max-w-3xl mx-auto text-center"
        >
          <blockquote className="text-2xl md:text-3xl font-light italic text-gray-800 leading-relaxed">
            « Chaque jeune accompagné est une victoire pour l’égalité des
            chances et un pas concret vers un avenir plus juste. »
          </blockquote>
          <div className="mt-6 text-gray-500">— L’équipe Pont du Futur</div>
        </motion.div>
      </div>
    </section>
  );
}
