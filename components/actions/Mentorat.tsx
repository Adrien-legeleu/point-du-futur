'use client';

import { motion } from 'framer-motion';
import {
  Users,
  CheckCircle,
  Clock,
  Target,
  Heart,
  TrendingUp,
} from 'lucide-react';
import Image from 'next/image';
import { PixelImage } from '../ui/pixel-image';

const benefits = [
  'Accompagnement personnalisé sur 6 mois',
  'Mentor adapté à ton profil et tes objectifs',
  'Suivi régulier et bienveillant',
  'Développement de ton réseau professionnel',
  'Conseils concrets et pratiques',
  'Confiance et motivation renforcées',
];

const steps = [
  {
    icon: Users,
    title: 'Inscription',
    description:
      'Tu remplis le formulaire en ligne avec ton profil et tes objectifs.',
  },
  {
    icon: Target,
    title: 'Matching',
    description:
      'Nous te mettons en relation avec un mentor qui correspond à tes besoins.',
  },
  {
    icon: Heart,
    title: 'Première rencontre',
    description:
      'Vous faites connaissance et définissez ensemble les objectifs du mentorat.',
  },
  {
    icon: TrendingUp,
    title: 'Accompagnement',
    description:
      'Échanges réguliers pendant 6 mois pour atteindre tes objectifs.',
  },
];

export default function Mentorat() {
  return (
    <section
      id="mentorat"
      className="py-24 md:py-32 bg-gradient-to-b from-zinc-50 to-white relative"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-20 items-start">
          {/* ===== Left - Content ===== */}
          <motion.div
            initial={{ y: 150 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-1 text-primary-500">
              Mentorat
            </h2>

            <p className="text-sm text-gray-600 mb-5 leading-relaxed">
              Notre programme de mentorat te met en relation avec un
              professionnel expérimenté qui t’accompagne pendant 6 mois dans ton
              parcours académique et professionnel.
            </p>

            {/* Benefits list */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50 }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center py-7 px-3 border-b-2 border-zinc-100 hover:border-zinc-200 duration-300 gap-3"
                >
                  <CheckCircle className="w-4 h-4 text-primary-600/80" />
                  <span className="text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2   text-primary-600/80 border-b-2 border-primary-200 hover:border-primary-300 duration-300 py-2 px-4  font-semibold  hover:brightness-105 transition-all"
            >
              <Users className="w-5 h-5" />
              Devenir mentoré
            </motion.a>
          </motion.div>

          {/* ===== Right - Process ===== */}
          <motion.div
            initial={{ opacity: 0, y: 150 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative  h-full w-full"
          >
            <PixelImage
              src="/actions/sign-language-being-used-by-women-communicate-with-each-other.jpg"
              grid="8x8"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
