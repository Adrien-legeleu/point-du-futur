'use client';

import { motion } from 'framer-motion';
import { Users, Heart, TrendingUp } from 'lucide-react';

export default function MembresHero() {
  const stats = [
    { icon: Users, value: '500+', label: 'Membres actifs' },
    { icon: Heart, value: '95%', label: 'Satisfaction' },
    { icon: TrendingUp, value: '+124%', label: 'Croissance 2024' },
  ];

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-light opacity-50" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-block px-5 py-2 mb-6 rounded-full bg-white/80 glass-subtle border border-primary-200"
          >
            <span className="text-sm font-semibold text-primary-700 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Notre Communauté
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Nos{' '}
            <span className="text-primary-600">
              Membres
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Une communauté engagée de personnes passionnées qui construisent
            ensemble un avenir meilleur
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center hover-lift"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary-50 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-primary-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
