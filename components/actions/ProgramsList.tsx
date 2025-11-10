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

type ProgramColor = 'primary' | 'accent' | 'energy';

const programs: {
  id: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  duration: string;
  participants: string;
  color: ProgramColor;
}[] = [
  {
    id: 'mentorat',
    icon: Users,
    title: 'Mentorat',
    description:
      'Programme de mentorat individuel avec des professionnels engagés pour un accompagnement personnalisé.',
    duration: 'Sur 6 mois',
    participants: '50+ binômes',
    color: 'primary',
  },
  {
    id: 'orientation',
    icon: Compass,
    title: 'Orientation',
    description:
      "Ateliers d'orientation et de découverte des métiers pour t'aider à construire ton projet professionnel.",
    duration: 'Mensuel',
    participants: '30+ jeunes',
    color: 'accent',
  },
  {
    id: 'sensibilisation',
    icon: Lightbulb,
    title: 'Sensibilisation',
    description:
      "Sessions de sensibilisation sur l'égalité des chances et l'intégration sociale.",
    duration: 'Trimestriel',
    participants: '60+ participants',
    color: 'energy',
  },
  {
    id: 'seminaires',
    icon: Calendar,
    title: 'Séminaires',
    description:
      'Séminaires thématiques et conférences inspirantes avec des intervenants de qualité.',
    duration: 'Bimestriel',
    participants: '80+ participants',
    color: 'primary',
  },
  {
    id: 'colloques',
    icon: MessageCircle,
    title: 'Colloques',
    description:
      "Organisation de colloques sur l'intégration, la réussite et les enjeux sociétaux.",
    duration: 'Annuel',
    participants: '150+ participants',
    color: 'accent',
  },
  {
    id: 'reseau',
    icon: Network,
    title: "Réseau d'entraide",
    description:
      'Mise en relation entre étudiants, mentors et partenaires pour créer une communauté soudée.',
    duration: 'Permanent',
    participants: '200+ membres',
    color: 'energy',
  },
];

export default function ProgramsList() {
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
            Tous nos <span className="text-primary-400">Programmes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des actions concrètes et variées pour répondre à tous tes besoins.
          </p>
        </motion.div>

        {/* === Mobile / Tablet grid === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-8">
          {programs.map((program, index) => {
            const Icon = program.icon;
            const bgClass =
              program.color === 'primary'
                ? 'bg-gradient-to-br from-primary-100/70 to-primary-50/70'
                : program.color === 'accent'
                ? 'bg-gradient-to-br from-accent-100/70 to-accent-50/70'
                : 'bg-gradient-to-br from-energy-100/70 to-energy-50/70';
            const iconColorClass =
              program.color === 'primary'
                ? 'text-primary-500'
                : program.color === 'accent'
                ? 'text-accent-500'
                : 'text-energy-500';

            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`group relative p-8 rounded-[2rem] ${bgClass} shadow-2xl shadow-black/8 transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Icone */}
                <div className="w-14 h-14 mb-6 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <Icon className={`w-7 h-7 ${iconColorClass}`} />
                </div>

                {/* Texte */}
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  {program.title}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {program.description}
                </p>

                {/* Badges infos */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/70 text-gray-700 border border-gray-100">
                    {program.duration}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/70 text-gray-700 border border-gray-100">
                    {program.participants}
                  </span>
                </div>

                {/* CTA */}
                <Link
                  href={`#${program.id}`}
                  className="inline-flex items-center gap-2 font-semibold text-gray-800 hover:opacity-80 transition-opacity"
                >
                  En savoir plus
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* === Desktop grid === */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {programs.map((program, index) => {
            const Icon = program.icon;
            const bgClass =
              program.color === 'primary'
                ? 'bg-gradient-to-br from-primary-100/70 to-primary-50/70'
                : program.color === 'accent'
                ? 'bg-gradient-to-br from-accent-100/70 to-accent-50/70'
                : 'bg-gradient-to-br from-energy-100/70 to-energy-50/70';
            const iconColorClass =
              program.color === 'primary'
                ? 'text-primary-500'
                : program.color === 'accent'
                ? 'text-accent-500'
                : 'text-energy-500';

            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`group relative p-8 rounded-[2rem] ${bgClass} shadow-2xl shadow-black/8 transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Icone */}
                <div className="w-14 h-14 mb-6 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <Icon className={`w-7 h-7 ${iconColorClass}`} />
                </div>

                {/* Texte */}
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  {program.title}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {program.description}
                </p>

                {/* Badges infos */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/70 text-gray-700 border border-gray-100">
                    {program.duration}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/70 text-gray-700 border border-gray-100">
                    {program.participants}
                  </span>
                </div>

                {/* CTA */}
                <Link
                  href={`#${program.id}`}
                  className="inline-flex items-center gap-2 font-semibold text-gray-800 hover:opacity-80 transition-opacity"
                >
                  En savoir plus
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
