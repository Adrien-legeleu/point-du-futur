'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Heart, Users } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary-50 via-primary-100 to-white">
      {/* === Animated background blobs === */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-24 left-24 w-[28rem] h-[28rem] bg-primary-300/25 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-24 right-24 w-[26rem] h-[26rem] bg-accent-300/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      {/* === Floating particles === */}
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary-400/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* === Main content === */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/80 backdrop-blur-sm border border-primary-300/30 mb-8 shadow-sm"
            whileHover={{ scale: 1.05 }}
          >
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse-subtle" />
            <span className="text-sm font-medium text-gray-700">
              Ensemble, on t’aide à bâtir ton avenir.
            </span>
          </motion.div>

          {/* Main title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-gray-900">
            <span className="text-primary-600">Construisons</span>
            <br />
            <span className="text-gray-900">ton avenir,</span>
            <br />
            <span className="text-primary-500">ensemble.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Pont du Futur accompagne les jeunes issus des classes populaires et
            les étudiants étrangers dans leur parcours académique et
            professionnel — pour que chacun puisse trouver sa voie, sans
            barrière.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 text-white rounded-2xl font-semibold shadow-md hover:shadow-lg hover-lift transition-all"
              >
                <Users className="w-5 h-5" />
                Rejoindre l’association
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#mentor"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-400 text-white rounded-2xl font-semibold shadow-md hover:shadow-lg hover-lift transition-all"
              >
                <Heart className="w-5 h-5" />
                Devenir mentor
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
