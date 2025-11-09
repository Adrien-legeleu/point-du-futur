'use client';

import { motion } from 'framer-motion';
import {
  Users,
  Compass,
  Lightbulb,
  Calendar,
  MessageCircle,
  Network,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

const programs = [
  {
    id: 'mentorat',
    icon: Users,
    title: 'Mentorat',
    description:
      'Programme de mentorat individuel avec des professionnels engagés pour un accompagnement personnalisé',
    duration: 'Sur 6 mois',
    participants: '50+ binômes',
    color: 'primary-900',
  },
  {
    id: 'orientation',
    icon: Compass,
    title: 'Orientation',
    description:
      "Ateliers d'orientation et de découverte des métiers pour t'aider à construire ton projet professionnel",
    duration: 'Mensuel',
    participants: '30+ jeunes',
    color: 'accent-600',
  },
  {
    id: 'sensibilisation',
    icon: Lightbulb,
    title: 'Sensibilisation',
    description:
      "Sessions de sensibilisation sur l'égalité des chances et l'intégration sociale",
    duration: 'Trimestriel',
    participants: '60+ participants',
    color: 'warning',
  },
  {
    id: 'seminaires',
    icon: Calendar,
    title: 'Séminaires',
    description:
      'Séminaires thématiques et conférences inspirantes avec des intervenants de qualité',
    duration: 'Bimestriel',
    participants: '80+ participants',
    color: 'primary-900',
  },
  {
    id: 'colloques',
    icon: MessageCircle,
    title: 'Colloques',
    description:
      "Organisation de colloques sur l'intégration, la réussite et les enjeux sociétaux",
    duration: 'Annuel',
    participants: '150+ participants',
    color: 'success',
  },
  {
    id: 'reseau',
    icon: Network,
    title: "Réseau d'entraide",
    description:
      'Mise en relation entre étudiants, mentors et partenaires pour créer une communauté soudée',
    duration: 'Permanent',
    participants: '200+ membres',
    color: 'accent-600',
  },
];

export default function ProgramsList() {
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
            Tous nos <span className="text-primary-900">Programmes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des actions concrètes et variées pour répondre à tous tes besoins
          </p>
        </motion.div>

        {/* Programs grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white rounded-[2rem] overflow-hidden shadow-md hover-lift"
              >
                {/* Content */}
                <div className="relative z-10 p-8">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 mb-6 bg-${program.color} rounded-2xl flex items-center justify-center shadow-md`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">
                    {program.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {program.description}
                  </p>

                  {/* Info badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium bg-${program.color}/10 text-${program.color}`}
                    >
                      {program.duration}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                      {program.participants}
                    </span>
                  </div>

                  {/* Learn more link */}
                  <a
                    href={`#${program.id}`}
                    className={`inline-flex items-center gap-2 font-semibold text-${program.color} hover:opacity-80 transition-opacity`}
                  >
                    En savoir plus
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
