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
    href: '/rejoindre/membre',
    color: 'blue',
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
    href: '/rejoindre/mentor',
    color: 'green',
  },
  {
    icon: Briefcase,
    title: 'Devenir Bénévole',
    description:
      'Tu veux contribuer à nos actions (événements, communication, admin) ?',
    benefits: ['Flexibilité horaires', 'Missions variées', 'Équipe passionnée'],
    cta: 'Nous aider',
    href: '#contact',
    color: 'orange',
  },
  {
    icon: Handshake,
    title: 'Devenir Partenaire',
    description:
      "Votre entreprise ou institution veut soutenir l'égalité des chances ?",
    benefits: ['Mécénat & sponsoring', 'Actions conjointes', 'Impact social'],
    cta: 'Collaborer',
    href: '#contact',
    color: 'blue',
  },
];

export default function JoinUs() {
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
            Comment nous <span className="text-primary-900">rejoindre ?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Plusieurs façons de participer à l'aventure Pont du Futur
          </p>
        </motion.div>

        {/* Roles grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white rounded-[2rem] p-8 shadow-md hover:shadow-lg hover-lift transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 mb-6 ${
                    role.color === 'blue'
                      ? 'bg-accent-600/10'
                      : role.color === 'green'
                      ? 'bg-success/10'
                      : 'bg-warning/10'
                  } rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <Icon
                    className={`w-8 h-8 ${
                      role.color === 'blue'
                        ? 'text-accent-600'
                        : role.color === 'green'
                        ? 'text-success'
                        : 'text-warning'
                    }`}
                  />
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
                        className={`w-1.5 h-1.5 rounded-full ${
                          role.color === 'blue'
                            ? 'bg-accent-600'
                            : role.color === 'green'
                            ? 'bg-success'
                            : 'bg-warning'
                        }`}
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={role.href}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                    role.color === 'blue'
                      ? 'bg-accent-600 text-white hover:brightness-110'
                      : role.color === 'green'
                      ? 'bg-success text-white hover:brightness-110'
                      : 'bg-warning text-white hover:brightness-110'
                  }`}
                >
                  {role.cta}
                  <ArrowRight className="w-5 h-5" />
                </Link>

                {/* Hover border effect */}
                <div
                  className={`absolute inset-0 rounded-[2rem] border-2 border-transparent ${
                    role.color === 'blue'
                      ? 'group-hover:border-accent-600/20'
                      : role.color === 'green'
                      ? 'group-hover:border-success/20'
                      : 'group-hover:border-warning/20'
                  } transition-all duration-300 pointer-events-none`}
                />
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
            Une question ? Besoin de plus d'informations ?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-900 text-white rounded-full font-semibold shadow-md hover:shadow-lg transition-all"
          >
            Contactez-nous
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
