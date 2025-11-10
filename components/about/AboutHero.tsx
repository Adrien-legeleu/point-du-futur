'use client';

import { motion } from 'framer-motion';
import { Heart, Users, Target } from 'lucide-react';

export default function AboutHero() {
  return (
    <section className="relative min-h-[100vh] flex items-start justify-center overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white pt-24">
      {/* Pattern léger */}
      <div className="absolute inset-0 bg-pattern-light opacity-80" />

      <div className="max-w-7xl mx-auto px-6 pt-10 relative z-10">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 glass-subtle border border-primary-100 mb-8"
          >
            <Heart className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-medium text-gray-700">
              Qui sommes-nous ?
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Une association
            <br />
            <span className="text-primary-900">au service</span>
            <br />
            <span className="text-primary-300">de la jeunesse</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Pont du Futur est née d&apos;une conviction : chaque jeune, quel que
            soit son origine, mérite d&apos;avoir accès aux mêmes opportunités
            d&apos;orientation, de réseau et d&apos;accompagnement.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-3xl mx-auto"
          >
            {[
              { icon: Users, value: '3 ans', label: "d'existence" },
              { icon: Heart, value: '124+', label: 'jeunes accompagnés' },
              { icon: Target, value: '89%', label: 'de réussite' },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center ">
                  <div className="w-16 h-16 mx-auto mb-3 bg-accent-50 rounded-2xl flex items-center justify-center">
                    <Icon className="w-8 h-8 text-accent-500" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
