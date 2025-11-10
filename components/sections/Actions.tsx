'use client';

import { motion } from 'framer-motion';
import {
  Users,
  Compass,
  Lightbulb,
  Calendar,
  MessageCircle,
  Network,
} from 'lucide-react';
import Image from 'next/image';

const actions = [
  {
    icon: Users,
    title: 'Mentorat',
    description:
      'Programme de mentorat individuel avec des professionnelles et professionnels engagés, proches des réalités du terrain.',
    image: '/actions/mentorat.jpg',
  },
  {
    icon: Compass,
    title: 'Orientation',
    description:
      'Ateliers d’orientation, de découverte des filières et des métiers pour aider chaque jeune à trouver sa voie.',
    image: '/actions/orientation.jpg',
  },
  {
    icon: Lightbulb,
    title: 'Sensibilisation',
    description:
      'Sessions de sensibilisation sur l’égalité des chances, les discriminations et les enjeux sociaux actuels.',
    image: '/actions/sensibilisation.jpg',
  },
  {
    icon: Calendar,
    title: 'Séminaires',
    description:
      'Séminaires thématiques, rencontres inspirantes et temps d’échanges avec des intervenants variés.',
    image: '/actions/seminaires.jpg',
  },
  {
    icon: MessageCircle,
    title: 'Colloques',
    description:
      'Organisation de colloques sur l’intégration, la réussite académique et l’inclusion.',
    image: '/actions/colloques.jpg',
  },
  {
    icon: Network,
    title: 'Réseau',
    description:
      'Mise en relation entre étudiants, mentors, anciens et partenaires pour créer un réseau solide et durable.',
    image: '/actions/reseau.jpg',
  },
];

export default function Actions() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-primary-50 via-white to-white relative overflow-hidden">
      {/* Pattern léger */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-40 bg-pattern-light" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-primary-700">
            Nos <span className="text-primary-500">Actions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Mentorat, ateliers, séminaires, colloques… Découvrez comment nous
            agissons concrètement pour accompagner les jeunes à chaque étape de
            leur parcours.
          </p>
        </motion.div>

        {/* Actions grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-2xl shadow-black/[0.08] hover:shadow-lg transition-all duration-300 hover-lift border border-gray-100"
              >
                {/* Image background with soft blue gradient */}
                <div className="relative h-48 overflow-hidden">
                  {action.image && (
                    <Image
                      src={action.image}
                      alt={action.title}
                      fill
                      className="object-cover"
                    />
                  )}

                  {/* Dégradé bleu subtil par-dessus */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-700/60 via-primary-500/35 to-primary-200/10" />

                  {/* Icon */}
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <motion.div className="w-20 h-20 bg-white/80 group-hover:scale-105 group-hover:rotate-3  transition-all duration-500 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-primary-100 shadow-md">
                      <Icon className="w-10 h-10 group-hover:animate-bounce group-hover:text-accent-500 text-primary-600" />
                    </motion.div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-accent-600 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {action.description}
                  </p>
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 rounded-[2rem] border-2 border-transparent group-hover:border-accent-500/50 transition-all duration-300 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
