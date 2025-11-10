'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Heart, Mail } from 'lucide-react';
import Link from 'next/link';

export default function CTA() {
  return (
    <section className="relative py-24  md:py-32 bg-gradient-to-b from-white via-primary-100/60 to-primary-50/60">
      {/* Pattern léger */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-40 bg-pattern-light" />
      </div>

      {/* Blobs très soft */}
      <div className="absolute inset-0  pointer-events-none">
        <motion.div
          className="absolute -top-32 -left-32 w-80 h-80 bg-accent-200/40 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 25, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-32 -right-24 w-72 h-72 bg-accent-200/40  rounded-full blur-3xl"
          animate={{
            scale: [1.05, 0.95, 1.05],
            x: [0, -20, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-primary-100 mb-8 shadow-sm"
          >
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse-subtle" />
            <span className="text-sm font-medium text-primary-700">
              Rejoins la communauté Pont du Futur
            </span>
          </motion.div>

          {/* Main title */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-primary-800">
            Et si on construisait
            <br />
            <span className="text-primary-500">
              ton avenir, ensemble&nbsp;?
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Tu peux être accompagné·e, devenir mentor, ou soutenir
            l’association. Quelle que soit ta place, tu peux participer à
            changer des trajectoires.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Être accompagné */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all hover-lift"
              >
                <Mail className="w-5 h-5" />
                Être accompagné·e
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            {/* Devenir mentor / bénévole */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 border border-primary-200 rounded-2xl font-semibold shadow-sm hover:shadow-md hover:bg-primary-50 transition-all hover-lift"
              >
                <Heart className="w-5 h-5 text-accent-500" />
                Devenir mentor / bénévole
              </Link>
            </motion.div>
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { value: '124+', label: 'Jeunes accompagnés' },
              { value: '45+', label: 'Mentors engagés' },
              { value: '89%', label: 'Taux de réussite' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-1 text-primary-700">
                  {stat.value}
                </div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
