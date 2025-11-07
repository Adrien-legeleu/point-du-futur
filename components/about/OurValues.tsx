'use client';

import { motion } from 'framer-motion';
import { Heart, Users, Target, Lightbulb, Shield, Smile } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Solidarité',
    description:
      "Nous croyons en la force du collectif et de l'entraide pour construire un avenir meilleur.",
  },
  {
    icon: Users,
    title: 'Inclusion',
    description:
      'Chaque personne, quelle que soit son origine, mérite sa place et ses chances de réussir.',
  },
  {
    icon: Target,
    title: 'Excellence',
    description:
      "Nous visons l'excellence dans l'accompagnement pour offrir le meilleur à nos membres.",
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'Nous innovons constamment pour proposer des solutions adaptées aux besoins des jeunes.',
  },
  {
    icon: Shield,
    title: 'Bienveillance',
    description:
      "L'écoute, le respect et la bienveillance sont au cœur de toutes nos actions.",
  },
  {
    icon: Smile,
    title: 'Optimisme',
    description:
      'Nous croyons fermement que chaque jeune peut réussir avec le bon accompagnement.',
  },
];

export default function OurValues() {
  return (
    <section className="py-24 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Nos <span className="gradient-text">Valeurs</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Les principes qui guident chacune de nos actions au quotidien
          </p>
        </motion.div>

        {/* Values grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative p-8 bg-white rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-16 h-16 mb-6 bg-gradient-to-br from-primary-blue/20 to-primary-green/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-primary-blue" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>

                {/* Hover border effect */}
                <div className="absolute inset-0 rounded-[2rem] border-2 border-transparent group-hover:border-primary-blue/20 transition-all duration-300 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
