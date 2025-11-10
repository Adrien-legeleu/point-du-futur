'use client';

import { motion } from 'framer-motion';
import { Users, Compass, Lightbulb, Calendar, Network } from 'lucide-react';

export default function ActionsHero() {
  return (
    <section className="relative min-h-[100vh] flex items-start justify-center overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white pt-24">
      {/* Pattern léger (comme About) */}
      <div className="absolute inset-0 bg-pattern-light opacity-80" />

      <div className="max-w-7xl mx-auto px-6 pt-10 relative z-10">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 glass-subtle border border-accent-100 mb-8"
          >
            <Compass className="w-4 h-4 text-accent-500" />
            <span className="text-sm font-medium text-gray-700">
              Nos programmes
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Découvre nos
            <br />
            <span className="text-primary-900">Actions</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Séminaires, mentorat, colloques, orientation... Des programmes
            variés pour t&apos;accompagner dans ton parcours académique et
            professionnel.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { icon: Users, value: '6', label: 'Programmes' },
              { icon: Calendar, value: '25+', label: 'Événements/an' },
              { icon: Network, value: '124+', label: 'Participants' },
              { icon: Lightbulb, value: '95%', label: 'Satisfaction' },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
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
