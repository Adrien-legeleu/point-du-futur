'use client';

import { motion } from 'framer-motion';
import { Calendar, Users, MapPin } from 'lucide-react';

export default function EvenementsHero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-trust-50 via-white to-energy-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-light opacity-50" />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-block px-5 py-2 mb-6 rounded-full bg-energy-100 border border-energy-200"
        >
          <span className="text-sm font-semibold text-energy-700 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Nos Événements
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
        >
          Rejoignez-nous lors de nos{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-energy-500 to-trust-500">
            événements
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
        >
          Séminaires, colloques, ateliers et rencontres pour construire ensemble
          un avenir meilleur
        </motion.p>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { icon: Calendar, value: '24+', label: 'Événements par an' },
            { icon: Users, value: '1000+', label: 'Participants' },
            { icon: MapPin, value: '5', label: 'Villes' },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-energy-100 to-trust-100 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-energy-600" />
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
    </section>
  );
}
