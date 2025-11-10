'use client';

import { motion } from 'framer-motion';
import { Users, Heart, Calendar, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ActionsCTA() {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-white via-primary-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* ==== LEFT : Texte & CTA ==== */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 font-medium mb-6">
              <Heart className="w-4 h-4" />
              Rejoins l’aventure
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-snug">
              Prêt(e) à t’engager
              <br />
              <span className="text-primary-600">dans nos actions ?</span>
            </h2>

            {/* Subtitle */}
            <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-md">
              Mentorat, séminaires, ateliers, colloques… Choisis ton rôle et
              participe à la construction d’un avenir plus solidaire.
            </p>

            {/* CTA */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 text-white rounded-full font-semibold shadow-lg shadow-black/10 hover:brightness-105 transition-all"
              >
                <ArrowRight className="w-5 h-5" />
                Contacte-nous
              </Link>
            </motion.div>
          </motion.div>

          {/* ==== RIGHT : Cartes d’actions ==== */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {[
              {
                icon: Users,
                title: 'Devenir membre',
                desc: 'Rejoins notre réseau et participe aux programmes.',
                color: 'primary',
              },
              {
                icon: Heart,
                title: 'Devenir mentor',
                desc: 'Aide un jeune à avancer grâce à ton expérience.',
                color: 'accent',
              },
              {
                icon: Calendar,
                title: 'Participer à un événement',
                desc: 'Séminaires, ateliers et colloques ouverts à tous.',
                color: 'primary',
              },
              {
                icon: Mail,
                title: 'Nous contacter',
                desc: 'Des questions ? Notre équipe te répond.',
                color: 'energy',
              },
            ].map((card, index) => {
              const Icon = card.icon;
              const gradientClass =
                card.color === 'primary'
                  ? 'from-primary-100/70 to-white'
                  : card.color === 'accent'
                  ? 'from-accent-100/70 to-white'
                  : 'from-energy-100/70 to-white';
              const iconColor =
                card.color === 'primary'
                  ? 'text-primary-600'
                  : card.color === 'accent'
                  ? 'text-accent-600'
                  : 'text-energy-600';

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className={`p-8 rounded-[2rem] bg-gradient-to-br ${gradientClass} border border-gray-100 shadow-2xl shadow-black/8 hover:-translate-y-1 transition-transform`}
                >
                  <div className="w-14 h-14 mb-5 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                    <Icon className={`w-7 h-7 ${iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    {card.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ==== Stats row ==== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 border-t border-gray-100 pt-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto text-center">
            {[
              { value: '6', label: 'Programmes actifs' },
              { value: '124+', label: 'Jeunes accompagnés' },
              { value: '25+', label: 'Événements par an' },
              { value: '95%', label: 'Satisfaction' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * index }}
              >
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
