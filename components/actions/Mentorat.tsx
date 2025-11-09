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
      'Tu remplis le formulaire en ligne avec ton profil et tes objectifs',
  },
  {
    icon: Target,
    title: 'Matching',
    description:
      'Nous te mettons en relation avec un mentor qui correspond à tes besoins',
  },
  {
    icon: Heart,
    title: 'Première rencontre',
    description:
      'Vous faites connaissance et définissez ensemble les objectifs du mentorat',
  },
  {
    icon: TrendingUp,
    title: 'Accompagnement',
    description:
      'Échanges réguliers pendant 6 mois pour atteindre tes objectifs',
  },
];

export default function Mentorat() {
  return (
    <section id="mentorat" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-blue/10 text-primary-blue font-medium mb-6">
              <Users className="w-4 h-4" />
              Programme phare
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Programme de <span className="text-primary-900">Mentorat</span>
            </h2>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Notre programme de mentorat te met en relation avec un
              professionnel expérimenté qui t'accompagne pendant 6 mois dans ton
              parcours académique et professionnel.
            </p>

            {/* Benefits list */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1 w-6 h-6 rounded-full bg-primary-blue/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-primary-blue" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-900 text-white rounded-full font-semibold shadow-md hover-lift"
            >
              <Users className="w-5 h-5" />
              Devenir mentoré
            </motion.a>
          </motion.div>

          {/* Right - Process */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gray-50 rounded-[3rem] p-8 border border-gray-200 shadow-md">
              <h3 className="text-2xl font-bold mb-8 text-gray-900">
                Comment ça marche ?
              </h3>

              <div className="space-y-6">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 }}
                      className="flex gap-4"
                    >
                      {/* Number + Icon */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="w-14 h-14 bg-primary-900 rounded-2xl flex items-center justify-center shadow-md">
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full border-2 border-accent-600 flex items-center justify-center text-xs font-bold text-accent-600">
                            {index + 1}
                          </div>
                        </div>
                        {index < steps.length - 1 && (
                          <div className="w-1 h-12 bg-primary-900 mx-auto mt-2 rounded-full" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-2">
                        <h4 className="text-lg font-bold text-gray-900 mb-1">
                          {step.title}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="absolute -top-6 -right-6 px-6 py-3 bg-white rounded-full shadow-lg border border-accent-600/20"
            >
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent-600" />
                <span className="font-bold text-gray-900">6 mois</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
