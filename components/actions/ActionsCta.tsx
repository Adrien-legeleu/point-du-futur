'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Heart, Mail, Users, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function ActionsCTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-primary-900">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-white"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 mb-8 shadow-md"
          >
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-sm font-medium">Rejoins l'aventure</span>
          </motion.div>

          {/* Main title */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Prêt(e) à participer
            <br />
            <span className="text-white/90">à nos actions ?</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
            Mentorat, séminaires, ateliers... Choisis le programme qui te
            correspond et lance-toi !
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-900 rounded-full font-semibold shadow-lg hover-lift"
              >
                <Users className="w-5 h-5" />
                Devenir membre
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 text-white rounded-full font-semibold border-2 border-white/30 shadow-md hover-lift"
              >
                <Heart className="w-5 h-5" />
                Devenir mentor
              </Link>
            </motion.div>
          </div>

          {/* Quick access cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              {
                icon: Users,
                title: 'Mentorat',
                description: 'Trouve ton mentor',
                href: '#mentorat',
                color: 'blue',
              },
              {
                icon: Calendar,
                title: 'Séminaires',
                description: 'Inscris-toi aux événements',
                href: '#seminaires',
                color: 'green',
              },
              {
                icon: Mail,
                title: 'Contact',
                description: 'Pose tes questions',
                href: '#contact',
                color: 'orange',
              },
            ].map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.a
                  key={index}
                  href={card.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-white/10 rounded-2xl p-6 border border-white/20 shadow-md hover-lift group"
                >
                  <Icon className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold mb-1">{card.title}</h3>
                  <p className="text-sm text-white/70">{card.description}</p>
                </motion.a>
              );
            })}
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-16 pt-12 border-t border-white/20"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {[
                { value: '6', label: 'Programmes actifs' },
                { value: '124+', label: 'Jeunes accompagnés' },
                { value: '25+', label: 'Événements par an' },
                { value: '95%', label: 'Satisfaction' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
