'use client';

import { motion } from 'framer-motion';
import { Users, Heart, Briefcase, Handshake, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const roles = [
  {
    icon: Users,
    title: 'Devenir Membre',
    description:
      "Tu es étudiant(e) et tu cherches de l'accompagnement pour réussir ton parcours ?",
    benefits: [
      'Mentorat personnalisé',
      "Ateliers d'orientation",
      "Réseau d'entraide",
    ],
    cta: 'Rejoindre',
    href: '/contact',
    color: 'green', // primary
  },
  {
    icon: Heart,
    title: 'Devenir Mentor',
    description:
      "Tu as de l'expérience et tu veux aider un(e) jeune à réussir ?",
    benefits: [
      'Accompagnement gratuit',
      'Formation au mentorat',
      'Impact concret',
    ],
    cta: "S'engager",
    href: '/contact',
    color: 'green', // accent
  },
  {
    icon: Briefcase,
    title: 'Devenir Bénévole',
    description:
      'Tu veux contribuer à nos actions (événements, communication, admin) ?',
    benefits: ['Flexibilité horaires', 'Missions variées', 'Équipe passionnée'],
    cta: 'Nous aider',
    href: '/contact',
    color: 'green', // energy
  },
  {
    icon: Handshake,
    title: 'Devenir Partenaire',
    description:
      "Votre entreprise ou institution veut soutenir l'égalité des chances ?",
    benefits: ['Mécénat & sponsoring', 'Actions conjointes', 'Impact social'],
    cta: 'Collaborer',
    href: '/contact',
    color: 'blue', // primary
  },
];

export default function JoinUs() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-accent-50 via-white to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Comment nous <span className="text-primary-900">rejoindre ?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Plusieurs façons de participer à l&apos;aventure Pont du Futur
          </p>
        </motion.div>

        {/* Roles grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {roles.map((role, index) => {
            const Icon = role.icon;

            const gradientClass =
              role.color === 'blue'
                ? 'from-primary-50 to-white'
                : role.color === 'green'
                ? 'from-accent-50 to-white'
                : 'from-energy-50 to-white';

            const iconRingClass =
              role.color === 'blue'
                ? 'ring-primary-100'
                : role.color === 'green'
                ? 'ring-accent-100'
                : 'ring-energy-100';

            const iconColorClass =
              role.color === 'blue'
                ? 'text-primary-500'
                : role.color === 'green'
                ? 'text-accent-500'
                : 'text-energy-500';

            const bulletColorClass =
              role.color === 'blue'
                ? 'bg-primary-400'
                : role.color === 'green'
                ? 'bg-accent-400'
                : 'bg-energy-400';

            const ctaClass =
              role.color === 'blue'
                ? 'bg-primary-500 hover:bg-primary-600'
                : role.color === 'green'
                ? 'bg-accent-500 hover:bg-accent-600'
                : 'bg-energy-500 hover:bg-energy-600';

            const ctaShadow = 'shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)]';

            return (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative flex flex-col items-start justify-between rounded-[2rem] p-8 bg-gradient-to-br ${gradientClass} shadow-[0_25px_60px_-18px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300`}
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 mb-6 rounded-2xl flex items-center justify-center bg-white/80 ring-1 ${iconRingClass} group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`w-8 h-8 ${iconColorClass}`} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  {role.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  {role.description}
                </p>

                {/* Benefits */}
                <ul className="space-y-2 mb-6">
                  {role.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${bulletColorClass}`}
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={role.href}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-[1.2rem] font-semibold text-white transition-all ${ctaClass} ${ctaShadow}`}
                >
                  {role.cta}
                  <ArrowRight className="w-5 h-5" />
                </Link>

                {/* Hover border effect très léger */}
                <div className="absolute inset-0 rounded-[2rem] border border-white/40 group-hover:border-white/60 transition-all duration-300 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-xl text-gray-600 mb-6">
            Une question ? Besoin de plus d&apos;informations ?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 text-white rounded-2xl font-semibold shadow-[0_25px_60px_-18px_rgba(0,0,0,0.12)] hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.16)] transition-all"
          >
            Contactez-nous
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
