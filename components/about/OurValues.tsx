'use client';

import { motion } from 'framer-motion';
import { Heart, Users, Target, Lightbulb, Shield, Smile } from 'lucide-react';

type ValueColor = 'primary' | 'accent' | 'energy';

const values: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  color: ValueColor;
}[] = [
  // 2 BLEUES (primary)
  {
    icon: Heart,
    title: 'Solidarité',
    description:
      "Nous croyons en la force du collectif et de l'entraide pour construire un avenir meilleur.",
    color: 'primary',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'Nous innovons constamment pour proposer des solutions adaptées aux besoins des jeunes.',
    color: 'primary',
  },

  // 2 VERTES (accent)
  {
    icon: Users,
    title: 'Inclusion',
    description:
      'Chaque personne, quelle que soit son origine, mérite sa place et ses chances de réussir.',
    color: 'accent',
  },
  {
    icon: Shield,
    title: 'Bienveillance',
    description:
      "L'écoute, le respect et la bienveillance sont au cœur de toutes nos actions.",
    color: 'accent',
  },

  // 2 ORANGES (energy)
  {
    icon: Target,
    title: 'Excellence',
    description:
      "Nous visons l'excellence dans l'accompagnement pour offrir le meilleur à nos membres.",
    color: 'energy',
  },
  {
    icon: Smile,
    title: 'Optimisme',
    description:
      'Nous croyons fermement que chaque jeune peut réussir avec le bon accompagnement.',
    color: 'energy',
  },
];
const valuesDesktop: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  color: ValueColor;
}[] = [
  {
    icon: Heart,
    title: 'Solidarité',
    description:
      "Nous croyons en la force du collectif et de l'entraide pour construire un avenir meilleur.",
    color: 'primary',
  },

  {
    icon: Users,
    title: 'Inclusion',
    description:
      'Chaque personne, quelle que soit son origine, mérite sa place et ses chances de réussir.',
    color: 'accent',
  },
  {
    icon: Target,
    title: 'Excellence',
    description:
      "Nous visons l'excellence dans l'accompagnement pour offrir le meilleur à nos membres.",
    color: 'energy',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'Nous innovons constamment pour proposer des solutions adaptées aux besoins des jeunes.',
    color: 'primary',
  },

  {
    icon: Shield,
    title: 'Bienveillance',
    description:
      "L'écoute, le respect et la bienveillance sont au cœur de toutes nos actions.",
    color: 'accent',
  },

  {
    icon: Smile,
    title: 'Optimisme',
    description:
      'Nous croyons fermement que chaque jeune peut réussir avec le bon accompagnement.',
    color: 'energy',
  },
];

export default function OurValues() {
  return (
    <section className="relative py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Titre section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Nos <span className="text-primary-400">Valeurs</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Les principes qui guident chacune de nos actions au quotidien.
          </p>
        </motion.div>

        {/* Grid valeurs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;

            const bgClass =
              value.color === 'primary'
                ? 'bg-gradient-to-br from-primary-100/70 to-primary-50/70'
                : value.color === 'accent'
                ? 'bg-gradient-to-br from-accent-100/70 to-accent-50/70'
                : 'bg-gradient-to-br from-energy-100/70 to-energy-50/70';

            const iconColorClass =
              value.color === 'primary'
                ? 'text-primary-500'
                : value.color === 'accent'
                ? 'text-accent-500'
                : 'text-energy-500';

            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`group relative p-8 rounded-[2rem] ${bgClass} shadow-2xl shadow-black/8  transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Icone */}
                <div className="w-14 h-14 mb-6 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <Icon className={`w-7 h-7 ${iconColorClass}`} />
                </div>

                {/* Texte */}
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  {value.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
        <div className=" hidden lg:grid lg:grid-cols-3 gap-8">
          {valuesDesktop.map((value, index) => {
            const Icon = value.icon;

            const bgClass =
              value.color === 'primary'
                ? 'bg-gradient-to-br from-primary-100/70 to-primary-50/70'
                : value.color === 'accent'
                ? 'bg-gradient-to-br from-accent-100/70 to-accent-50/70'
                : 'bg-gradient-to-br from-energy-100/70 to-energy-50/70';
            const iconColorClass =
              value.color === 'primary'
                ? 'text-primary-500'
                : value.color === 'accent'
                ? 'text-accent-500'
                : 'text-energy-500';

            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`group relative p-8 rounded-[2rem] ${bgClass} shadow-2xl shadow-black/8  transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Icone */}
                <div className="w-14 h-14 mb-6 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <Icon className={`w-7 h-7 ${iconColorClass}`} />
                </div>

                {/* Texte */}
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  {value.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
