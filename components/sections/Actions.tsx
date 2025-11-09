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
      'Programme de mentorat individuel avec des professionnels engagés',
    image: '/images/mentorat.jpg', // À remplacer par tes images
  },
  {
    icon: Compass,
    title: 'Orientation',
    description: "Ateliers d'orientation et de découverte des métiers",
    image: '/images/orientation.jpg',
  },
  {
    icon: Lightbulb,
    title: 'Sensibilisation',
    description: "Sessions de sensibilisation sur l'égalité des chances",
    image: '/images/sensibilisation.jpg',
  },
  {
    icon: Calendar,
    title: 'Séminaires',
    description: 'Séminaires thématiques et conférences inspirantes',
    image: '/images/seminaires.jpg',
  },
  {
    icon: MessageCircle,
    title: 'Colloques',
    description: "Organisation de colloques sur l'intégration et la réussite",
    image: '/images/colloques.jpg',
  },
  {
    icon: Network,
    title: 'Réseau',
    description: 'Mise en relation entre étudiants, mentors et partenaires',
    image: '/images/reseau.jpg',
  },
];

export default function Actions() {
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
            Nos <span className="text-accent-600">Actions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Séminaires, mentorat, colloques... Découvrez nos programmes pour
            accompagner les jeunes
          </p>
        </motion.div>

        {/* Actions grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-[2rem] bg-white shadow-md hover:shadow-lg transition-all duration-300 hover-lift"
              >
                {/* Image background with overlay */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-accent-600/90 z-10" />
                  <div className="absolute inset-0 bg-gray-200 z-0">
                    {/* Placeholder si pas d'image */}
                    <div className="w-full h-full bg-gray-300" />
                  </div>

                  {/* Icon */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.02, rotate: 10 }}
                      className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30"
                    >
                      <Icon className="w-10 h-10 text-white" />
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
                <div className="absolute inset-0 rounded-[2rem] border-2 border-transparent group-hover:border-accent-600/50 transition-all duration-300 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
