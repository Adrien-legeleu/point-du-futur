'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function JoinCTA() {
  const benefits = [
    'Rejoindre une communauté engagée',
    'Accéder à des événements exclusifs',
    'Participer à des projets à impact',
    'Développer votre réseau professionnel',
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-trust-50 via-white to-future-50">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Rejoignez-nous !
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Devenez membre de Pont du Futur et participez à la construction
              d'un avenir meilleur
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-future-100 flex items-center justify-center mt-0.5">
                  <CheckCircle className="w-4 h-4 text-future-600" />
                </div>
                <span className="text-gray-700 font-medium">{benefit}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-to-r from-trust-500 to-trust-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                Devenir membre
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            <Link href="/about">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white border-2 border-trust-200 text-trust-700 rounded-xl font-semibold hover:bg-trust-50 transition-all"
              >
                En savoir plus
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
