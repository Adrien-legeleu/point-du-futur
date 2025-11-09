'use client';

import { motion } from 'framer-motion';
import { Newspaper } from 'lucide-react';

export default function ActualitesHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-600/10 border border-accent-600/20 mb-8"
          >
            <Newspaper className="w-4 h-4 text-accent-600" />
            <span className="text-sm font-medium text-gray-700">
              Nos actualités
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Toute l'<span className="text-accent-600">actualité</span>
            <br />
            <span className="text-gray-600">de Pont du Futur</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Découvrez nos événements, témoignages inspirants et toutes nos
            actualités
          </motion.p>
        </div>
      </div>
    </section>
  );
}
