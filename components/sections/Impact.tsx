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
    label: 'Satisfaction',
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
    <section className="py-24 md:py-32 bg-gradient-to-br from-gray-900 via-primary-blue/90 to-primary-green/90 text-white relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Notre <span className="text-primary-green">Impact</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Des chiffres qui témoignent de notre engagement quotidien
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-20 h-20 mx-auto mb-4 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-all duration-300"
                >
                  <Icon className="w-10 h-10" />
                </motion.div>

                <div className="text-5xl md:text-6xl font-bold mb-2 font-display">
                  <Counter value={stat.value} />
                  {stat.suffix}
                </div>

                <div className="text-white/70 font-medium">{stat.label}</div>
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
          <blockquote className="text-2xl md:text-3xl font-light italic text-white/90 leading-relaxed">
            "Chaque jeune accompagné est une victoire pour l'égalité des chances
            et un pas vers un avenir meilleur."
          </blockquote>
          <div className="mt-6 text-white/60">— L'équipe Pont du Futur</div>
        </motion.div>
      </div>
    </section>
  );
}
